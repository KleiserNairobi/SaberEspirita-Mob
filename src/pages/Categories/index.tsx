import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BackHandler, FlatList, View, Text } from 'react-native';
import { SafeAreaView, ActivityIndicator, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CardCategory } from '@/components/CardCategory';
import { GradientContainer } from '@/components/GradientContainer';
import { BottomNavigation } from '@/components/BottomNavigation';
import { useTheme } from '@/hooks/useTheme';
import { useAppStore } from '@/hooks/useAppStore';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { ICategory } from '@/models/Categories';
import { getCategories, getUserCompletedSubcategories } from '@/services/firestore';
import { PrivateStackParamList } from '@/routes/PrivateStack';
import { getCategoriesStyles } from './styles';
import { IUserCompletedSubcategory } from '@/models/UsersCompletedSubcategories';
import { messages } from '@/assets/messages';
import { DailyMessage } from '@/components/DailyMessage';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { BottomSheetTruthOrFalse } from '@/components/BottomSheetTruthOrFalse';
import { TruthOrFalseManager } from '@/utils/TruthOrFalseManager';
import { ITruthOrFalseQuestion } from '@/models/TruthOrFalseQuestion';
import { truthOrFalseQuestions } from '@/data/truthOrFalseQuestions';

function getDailyIndex(): number {
  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 0);
  const diff = today.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  return dayOfYear;
}

function getDailyMessage() {
  const idx = getDailyIndex() % messages.length;
  return messages[idx];
}

function getTodayQuestion(): ITruthOrFalseQuestion {
  const idx = getDailyIndex() % truthOrFalseQuestions.length;
  return truthOrFalseQuestions[idx];
}

export function Categories() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useThemedStyles(getCategoriesStyles);
  const queryClient = useQueryClient();
  const navigation = useNavigation<NativeStackNavigationProp<PrivateStackParamList>>();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['1%', '54%'], []);
  const { user } = useAppStore();
  const [categoriesWithCompletion, setCategoriesWithCompletion] = useState<ICategory[]>([]);
  const [showTruthOrFalse, setShowTruthOrFalse] = useState(false);
  const [userAnswer, setUserAnswer] = useState<boolean | null>(null);
  const backPressTimestamp = useRef(0);
  const message = getDailyMessage();
  const questionToday = getTodayQuestion();

  const { data: categories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const {
    data: completed = {
      userId: user?.uid || '',
      completedSubcategories: {},
      totalCompleted: 0,
    },
    isLoading: isLoadingCompleted,
  } = useQuery<IUserCompletedSubcategory>({
    queryKey: ['completedSubcategories', user?.uid],
    queryFn: () => {
      if (!user?.uid) {
        return Promise.resolve({
          userId: '',
          completedSubcategories: {},
          totalCompleted: 0,
        });
      }
      return getUserCompletedSubcategories(user.uid);
    },
    enabled: !!user?.uid,
  });

  function goToSubcategories(id: string, title: string, description: string) {
    navigation.navigate('subcategories', {
      idCategory: id,
      titleCategory: title,
      description: description,
    });
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (!navigation.isFocused()) return false;
      const currentTime = new Date().getTime();
      const timeDiff = currentTime - backPressTimestamp.current;
      const DOUBLE_PRESS_DELAY = 2000;
      if (timeDiff < DOUBLE_PRESS_DELAY) {
        BackHandler.exitApp();
        return true;
      } else {
        backPressTimestamp.current = currentTime;
        ToastAndroid.show('Pressione novamente para sair', ToastAndroid.SHORT);
        return true;
      }
    });
    return () => {
      backHandler.remove();
    };
  }, [navigation]);

  useEffect(() => {
    if (categories.length > 0 && completed && completed.completedSubcategories) {
      const updated = categories.map((category) => {
        const completedCount = completed.completedSubcategories[category.id]?.length || 0;
        const percentage =
          category.subcategoryCount > 0
            ? Math.round((completedCount / category.subcategoryCount) * 100)
            : 0;
        return { ...category, percentage };
      });
      setCategoriesWithCompletion(updated);
    }
  }, [categories, completed]);

  useFocusEffect(
    useCallback(() => {
      if (user?.uid) {
        queryClient.invalidateQueries({
          queryKey: ['completedSubcategories', user.uid],
        });
      }
    }, [user?.uid])
  );

  function handleAnswer(userAnswer: boolean) {
    const correct = questionToday.correct;
    const isCorrect = userAnswer === correct;
    setUserAnswer(userAnswer);

    // Salvar resposta no TruthOrFalseManager
    if (user?.uid) {
      TruthOrFalseManager.saveResponse({
        id: `${user.uid}_${new Date().toISOString().split('T')[0]}`,
        userId: user.uid,
        questionId: questionToday.id,
        userAnswer,
        isCorrect,
        timeSpent: 0, // TODO: implementar contador de tempo
        respondedAt: { seconds: Date.now() / 1000, nanoseconds: 0 } as any,
        savedToLibrary: false,
      });
    }
  }

  function handleCloseExplanation() {
    setUserAnswer(null);
    setShowTruthOrFalse(false);
    bottomSheetRef.current?.close();
  }

  useFocusEffect(
    useCallback(() => {
      const hasResponded = TruthOrFalseManager.hasRespondedToday();
      if (!hasResponded) {
        setShowTruthOrFalse(true);
      } else {
        setShowTruthOrFalse(false);
        // Garantir que o bottom sheet esteja fechado
        bottomSheetRef.current?.close();
      }
      // Cleanup: quando a tela perde foco, garantir que o bottom sheet esteja fechado
      return () => {
        bottomSheetRef.current?.close();
      };
    }, [])
  );

  useEffect(() => {
    if (showTruthOrFalse) {
      setTimeout(() => {
        bottomSheetRef.current?.snapToIndex(1);
      }, 80);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [showTruthOrFalse]);

  return (
    <GradientContainer>
      <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
        <View style={styles.greetingBox}>
          <Text style={styles.greeting}>Oi, {user?.displayName || 'amigo(a)'}!</Text>
        </View>

        <DailyMessage title="✨ Mensagem do Dia" content={message} />
        <Text style={styles.category}>Categorias</Text>

        {isLoadingCategories || isLoadingCompleted ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={styles.titleLoading}>Carregando...</Text>
          </View>
        ) : (
          <FlatList
            data={categoriesWithCompletion}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <CardCategory
                title={item.title}
                subtitle={`${item.quizCount.toString()} questões`}
                percentage={item.percentage}
                imageBackground={item.imageBackground}
                onPress={() => goToSubcategories(item.id, item.title ?? '', item.description ?? '')}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingTop: 10,
              paddingBottom: 200 + insets.bottom,
              paddingHorizontal: 24,
            }}
          />
        )}
        <BottomNavigation />
      </SafeAreaView>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        enablePanDownToClose={false} // impede fechar arrastando pra baixo
        enableOverDrag={false} // impede "puxar demais" além dos limites
        enableHandlePanningGesture={false} // desativa gesto no "handle" (parte superior)
        enableContentPanningGesture={false} // desativa gesto no conteúdo interno
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
            appearsOnIndex={1} // só aparece quando o bottom sheet está aberto (índice 1)
            pressBehavior="none" // impede fechar ao clicar fora
          />
        )}>
        {showTruthOrFalse && (
          <BottomSheetView>
            <BottomSheetTruthOrFalse
              title="Verdade ou Mentira?"
              topic={questionToday.topic}
              question={questionToday.question}
              correct={questionToday.correct}
              explanation={questionToday.explanation}
              difficulty={questionToday.difficulty}
              reference={questionToday.reference}
              userAnswer={userAnswer}
              onAnswer={handleAnswer}
              onClose={handleCloseExplanation}
            />
          </BottomSheetView>
        )}
      </BottomSheet>
    </GradientContainer>
  );
}
