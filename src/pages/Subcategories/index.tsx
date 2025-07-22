import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, ScrollView, Text, SafeAreaView } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { verticalScale } from 'react-native-size-matters';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useFocusEffect } from '@react-navigation/native';
import { useAppStore } from '@/hooks/useAppStore';
import { useTheme } from '@/hooks/useTheme';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { Header } from '@/components/Header';
import { CardSubcategory } from '@/components/CardSubcategory';
import { BottomSheetMessage } from '@/components/BottomSheetMessage';
import { GradientContainer } from '@/components/GradientContainer';
import { SearchInput } from '@/components/SearchInput';
import { MessageType } from '@/models/Utils';
import { PrivateStackParamList } from '@/routes/PrivateStack';
import { getSubcategoriesStyles } from './styles';

import {
  getSubcategories,
  getUserCompletedSubcategories,
  removeUserCompletedSubcategory,
  removeUserHistory,
} from '@/services/firestore';

type SubcategoriesRouteProp = RouteProp<PrivateStackParamList, 'subcategories'>;

export function Subcategories() {
  const theme = useTheme();
  const route = useRoute<SubcategoriesRouteProp>();
  const styles = useThemedStyles(getSubcategoriesStyles);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<PrivateStackParamList>>();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['1%', '36%'], []);
  const { user } = useAppStore();
  const { idCategory, titleCategory, description } = route.params;
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [idSubcategoryState, setIdSubcategoryState] = useState('');
  const [titleSubcategoryState, setTitleSubcategoryState] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();

  const { data: subcategories = [] } = useQuery({
    queryKey: ['subcategories', idCategory],
    queryFn: () => getSubcategories(idCategory),
  });

  const { data: completed } = useQuery({
    queryKey: ['completedSubcategories', user?.uid, idCategory],
    queryFn: () => (user?.uid ? getUserCompletedSubcategories(user.uid, idCategory) : null),
    enabled: !!user?.uid,
  });

  // Memoized values
  const isSubcategoryCompleted = useMemo(
    () =>
      (idSubcategory: string): boolean => {
        if (!completed || !completed.completedSubcategories[idCategory]) {
          return false;
        }
        return completed.completedSubcategories[idCategory].includes(idSubcategory);
      },
    [completed, idCategory]
  );

  const filteredSubcategories = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return subcategories.filter(
      (sub) => sub.title.toLowerCase().includes(term) || sub.subtitle.toLowerCase().includes(term)
    );
  }, [subcategories, searchTerm]);

  // Handlers
  const handleBottomSheetChanges = useCallback((index: number) => {
    setQuizAnswered(index === 1);
  }, []);

  const handleBottomSheetClose = useCallback(() => {
    setQuizAnswered(false);
    bottomSheetRef.current?.close();
  }, []);

  const handleClickCardSubcategory = useCallback(
    (idSubcategory: string, titleSubcategory: string) => {
      if (isSubcategoryCompleted(idSubcategory)) {
        checkAnsweredQuiz(idSubcategory, titleSubcategory);
      } else {
        goToQuizes(idSubcategory, titleSubcategory);
      }
    },
    [isSubcategoryCompleted]
  );

  const handleQuizAnswered = useCallback(() => {
    handleBottomSheetClose();
    if (user?.uid) {
      removeUserCompletedSubcategory(user.uid, idCategory, idSubcategoryState);
      removeUserHistory(user.uid, idSubcategoryState);
      goToQuizes(idSubcategoryState, titleSubcategoryState);
    }
  }, [user?.uid, idCategory, idSubcategoryState, titleSubcategoryState, handleBottomSheetClose]);

  // Navigation
  const goToBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const goToQuizes = useCallback(
    (idSubcategory: string, titleSubcategory: string) => {
      navigation.navigate('quizes', {
        idCategory,
        titleCategory,
        idSubcategory,
        titleSubcategory,
      });
    },
    [navigation, idCategory, titleCategory]
  );

  // Helpers
  const checkAnsweredQuiz = useCallback((idSubcategory: string, titleSubcategory: string) => {
    setIdSubcategoryState(idSubcategory);
    setTitleSubcategoryState(titleSubcategory);
    setQuizAnswered(true);
  }, []);

  useEffect(() => {
    if (quizAnswered) {
      bottomSheetRef.current?.expand();
    }
  }, [quizAnswered]);

  useFocusEffect(
    useCallback(() => {
      if (user?.uid) {
        queryClient.invalidateQueries({
          queryKey: ['completedSubcategories', user.uid, idCategory],
        });
      }
    }, [user?.uid, idCategory])
  );

  return (
    <GradientContainer>
      <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
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
                contentContainerStyle={{ paddingBottom: verticalScale(14) }}
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
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleBottomSheetChanges}
        backgroundStyle={{ backgroundColor: theme.colors.backGradientStart }}
        handleIndicatorStyle={{
          backgroundColor: theme.colors.secondary,
          width: 80,
          height: 8,
        }}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={1}
            pressBehavior="close"
          />
        )}>
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
