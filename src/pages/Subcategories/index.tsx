import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, View, ScrollView, Text, SafeAreaView } from 'react-native';
import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { useAppStore } from '@/hooks/useAppStore';
import { useTheme } from '@/hooks/useTheme';
import { Header } from '@/components/Header';
import { CardSubcategory } from '@/components/CardSubcategory';
import { BottomSheetMessage } from '@/components/BottomSheetMessage';
import { GradientContainer } from '@/components/GradientContainer';
import { SearchInput } from '@/components/SearchInput';
import { ISubcategory } from '@/models/Subcategories';
import { IUserCompletedSubcategory } from '@/models/UsersCompletedSubcategories';
import { MessageType } from '@/models/Utils';
import { PrivateStackParamList } from '@/routes/PrivateStack';
import { getSubcategoriesStyles } from './styles';
import { useThemedStyles } from '@/hooks/useThemedStyles';

import {
  getSubcategories,
  getUserCompletedSubcategories,
  removeUserCompletedSubcategory,
  removeUserProgress,
} from '@/services/firestore';
import { scale, verticalScale } from 'react-native-size-matters';

type SubcategoriesRouteProp = RouteProp<PrivateStackParamList, 'subcategories'>;

export function Subcategories() {
  const theme = useTheme();
  const route = useRoute<SubcategoriesRouteProp>();
  const styles = useThemedStyles(getSubcategoriesStyles);
  const navigation = useNavigation<NativeStackNavigationProp<PrivateStackParamList>>();
  const { user } = useAppStore();
  const { idCategory, titleCategory, description } = route.params;
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [1, '36%'], []);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [idSubcategoryState, setIdSubcategoryState] = useState('');
  const [titleSubcategoryState, setTitleSubcategoryState] = useState('');
  const [subcategories, setSubcategories] = useState<ISubcategory[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [completed, setCompleted] = useState<IUserCompletedSubcategory | null>();

  function goToBack() {
    navigation.goBack();
  }

  function goToQuizes(idSubcategory: string, titleSubcategory: string) {
    navigation.navigate('quizes', {
      idCategory: idCategory,
      titleCategory: titleCategory,
      idSubcategory: idSubcategory,
      titleSubcategory: titleSubcategory,
    });
  }

  const filteredSubcategories = useMemo(() => {
    return subcategories.filter(
      (sub) =>
        sub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [subcategories, searchTerm]);

  const handleBottomSheetChanges = useCallback((index: number) => {
    setBottomSheetOpen(index === 1);
  }, []);

  function handleBottomSheetClose() {
    bottomSheetRef.current?.close();

    // Delay para permitir que o fechamento finalize antes de resetar o estado
    setTimeout(() => {
      setQuizAnswered(false);
      setBottomSheetOpen(false);
    }, 100);
  }

  function handleClickCardSubcategory(idSubcategory: string, titleSubcategory: string) {
    if (isSubcategoryCompleted(idSubcategory)) {
      checkAnsweredQuiz(idSubcategory, titleSubcategory);
    } else {
      goToQuizes(idSubcategory, titleSubcategory);
    }
  }

  function checkAnsweredQuiz(idSubcategory: string, titleSubcategory: string) {
    setIdSubcategoryState(idSubcategory);
    setTitleSubcategoryState(titleSubcategory);
    setQuizAnswered(true);
    // setBottomSheetOpen(true);
    // bottomSheetRef.current?.expand(); // aqui vai mudar
  }

  function handleQuizAnswered() {
    setBottomSheetOpen(false);
    bottomSheetRef.current?.close();
    if (user?.uid) {
      removeUserCompletedSubcategory(user.uid, idCategory, idSubcategoryState);
      removeUserProgress(user.uid, idSubcategoryState);
      goToQuizes(idSubcategoryState, titleSubcategoryState);
    }
  }

  function isSubcategoryCompleted(idSubcategory: string): boolean {
    if (!completed || !completed.completedSubcategories[idCategory]) {
      return false;
    }
    return completed.completedSubcategories[idCategory].includes(idSubcategory);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSubcategories(idCategory);
        setSubcategories(data);
      } catch (error) {
        console.error('Erro ao obter subcategorias:', error);
      }
    };
    fetchData();
  }, [idCategory]);

  useFocusEffect(
    useCallback(() => {
      const fetchCompletedSubcategories = async () => {
        if (user?.uid) {
          const data = await getUserCompletedSubcategories(user.uid, idCategory);
          setCompleted(data);
        }
      };
      fetchCompletedSubcategories();
    }, [user?.uid, idCategory])
  );

  useEffect(() => {
    if (quizAnswered) {
      setBottomSheetOpen(true);
      bottomSheetRef.current?.expand();
    }
  }, [quizAnswered]);

  return (
    <GradientContainer>
      <SafeAreaView style={styles.container}>
        <Header title={titleCategory} onPress={goToBack} />
        <Text style={styles.description}>{description}</Text>
        <SearchInput
          value={searchTerm}
          onChangeText={setSearchTerm}
          onClear={() => setSearchTerm('')}
        />
        <ScrollView style={styles.scroll}>
          {filteredSubcategories.length > 0 && (
            <>
              <FlatList
                data={filteredSubcategories}
                scrollEnabled={false}
                nestedScrollEnabled={true}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingBottom: verticalScale(10) }}
                renderItem={({ item }) => (
                  <CardSubcategory
                    title={item.title}
                    subtitle={item.subtitle}
                    quizCount={item.quizCount}
                    completed={isSubcategoryCompleted(item.id)}
                    onPress={() => handleClickCardSubcategory(item.id, item.title)}
                  />
                )}
              />
            </>
          )}
        </ScrollView>
      </SafeAreaView>
      {/* {bottomSheetOpen && <View style={styles.containerModal} />} */}
      {/* {bottomSheetOpen && <View style={styles.containerModal} pointerEvents="auto" />} */}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleBottomSheetChanges}
        backgroundStyle={{ backgroundColor: theme.colors.backGradientStart }}
        handleIndicatorStyle={{
          backgroundColor: theme.colors.secondary,
          width: scale(80),
          height: verticalScale(8),
        }}
        // backdropComponent={({ animatedIndex, animatedPosition, style }) => (
        //   <BottomSheetBackdrop
        //     animatedIndex={animatedIndex}
        //     animatedPosition={animatedPosition}
        //     style={style}
        //     disappearsOnIndex={0}
        //     appearsOnIndex={1}
        //     pressBehavior="none"
        //   />
        // )}

        // containerStyle={{ zIndex: 20, elevation: 20 }}
      >
        {quizAnswered && (
          <BottomSheetView>
            <BottomSheetMessage
              type={MessageType.question}
              title="Deseja novamente responder o quiz?"
              subtitle="A pontuação desse quiz será zerada e nova pontuação será contabilizada."
              onPressSecondary={handleBottomSheetClose}
              onPressPrimary={handleQuizAnswered}
            />
          </BottomSheetView>
        )}
      </BottomSheet>
    </GradientContainer>
  );
}
