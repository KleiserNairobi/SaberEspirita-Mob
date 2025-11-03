import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, ScrollView, Text, BackHandler, SafeAreaView } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import firestore from '@react-native-firebase/firestore';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { PrivateStackParamList } from '@/routes/PrivateStack';
import { GradientContainer } from '@/components/GradientContainer';
import { useTheme } from '@/hooks/useTheme';
import { useAppStore } from '@/hooks/useAppStore';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { Header } from '@/components/Header';
import { ProgressBar } from '@/components/ProgressBar';
import { ButtonAction } from '@/components/ButtonAction';
import { ButtonActionOutilene } from '@/components/ButtonActionOutilene';
import { Question } from '@/components/Question';
import { Loading } from '@/components/Loading';
import { BottomSheetMessage } from '@/components/BottomSheetMessage';
import { IUserHistory } from '@/models/UsersHistory';
import { IUserAnswer } from '@/models/UserAnswer';
import { MessageType } from '@/models/Utils';
import { addUserHistory, getQuiz, saveUserCompletedSubcategories } from '@/services/firestore';
import { getQuizesStyles } from './styles';

type QuizesRouteProp = RouteProp<PrivateStackParamList, 'quizes'>;

export function Quizes() {
  const theme = useTheme();
  const route = useRoute<QuizesRouteProp>();
  const styles = useThemedStyles(getQuizesStyles);
  const navigation = useNavigation<NativeStackNavigationProp<PrivateStackParamList>>();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['1%', '36%'], []);
  const { user, isSoundOn } = useAppStore();
  const { soundsLoaded, loadSounds, unloadSounds, playCorrect, playWrong } = useAppStore();
  const { idSubcategory, titleCategory, titleSubcategory } = route.params;
  const [stop, setStop] = useState(false);
  const [next, setNext] = useState(false);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<IUserAnswer[]>([]);
  const [alternativeSelected, setAlternativeSelected] = useState<null | number>(null);
  const [isFinishing, setIsFinishing] = useState(false);

  const { data: quiz } = useQuery({
    queryKey: ['quiz', idSubcategory],
    queryFn: () => getQuiz(idSubcategory),
  });

  const handleSheetChanges = useCallback((index: number) => {
    setBottomSheetOpen(index === 1);
  }, []);

  function calculatePercentage(correctAnswers: number, totalQuestions: number) {
    return Math.floor((correctAnswers / totalQuestions) * 100);
  }

  function getLevel(percentage: number): string {
    if (percentage >= 90) {
      return 'Ótimo';
    }
    if (percentage >= 70) {
      return 'Bom';
    }
    if (percentage >= 50) {
      return 'Regular';
    }
    return 'Fraco';
  }

  function goToBack() {
    if (currentQuestion !== 0) {
      handleStop();
    } else {
      navigation.goBack();
    }
  }

  function handleConfirm() {
    if (alternativeSelected === null) {
      return handleSkipConfirm();
    }

    // 1. Cria a resposta atual ANTES de atualizar o estado
    const question = quiz!.questions[currentQuestion];
    const currentAnswer: IUserAnswer = {
      question: question.title,
      alternatives: question.alternatives,
      correctAnswerIndex: question.correct,
      selectedAnswerIndex: alternativeSelected,
      explanation: question.explanation,
    };

    // 2. Atualiza o estado (mas não depende dele)
    setUserAnswers((prev) => [...prev, currentAnswer]);
    setAlternativeSelected(null);

    // 3. Se for a última pergunta, passa TODAS as respostas (incluindo a atual)
    if (quiz && currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      handleFinished([...userAnswers, currentAnswer]); // Resposta atual já inclusa!
    }
  }

  function handleSkipConfirm() {
    setNext(true);
    setBottomSheetOpen(true);
    bottomSheetRef.current?.expand();
  }

  function handleNextQuestion() {
    // 1. Cria a resposta atual ANTES de atualizar o estado
    const question = quiz!.questions[currentQuestion];
    const currentAnswer: IUserAnswer = {
      question: question.title,
      alternatives: question.alternatives,
      correctAnswerIndex: question.correct,
      selectedAnswerIndex: null,
      explanation: question.explanation,
    };

    // 2. Atualiza o estado (mas não depende dele)
    setUserAnswers((prev) => [...prev, currentAnswer]);
    setStop(false);
    setNext(false);
    setBottomSheetOpen(false);
    bottomSheetRef.current?.close();

    // 3. Se for a última pergunta, passa TODAS as respostas (incluindo a atual)
    if (quiz && currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      handleFinished([...userAnswers, currentAnswer]); // Resposta atual já inclusa!
    }
  }

  async function handleFinished(allAnswers: IUserAnswer[]) {
    if (!quiz) {
      return;
    }
    setIsFinishing(true);

    try {
      const totalPoints = allAnswers.filter(
        (answer) => answer.selectedAnswerIndex === answer.correctAnswerIndex
      ).length;

      const totalQuestions = quiz.questions.length;
      const percentage = calculatePercentage(totalPoints, totalQuestions);
      const level = getLevel(percentage);
      const score = Math.round(percentage);

      const userHistory: IUserHistory = {
        userId: user?.uid || '',
        categoryId: quiz.idCategory,
        subcategoryId: quiz.idSubcategory,
        quizId: quiz.id,
        title: titleCategory,
        subtitle: titleSubcategory,
        completed: true,
        score,
        totalQuestions,
        correctAnswers: totalPoints,
        percentage,
        level,
        completedAt: firestore.Timestamp.fromDate(new Date()),
      };

      if (user?.uid) {
        await saveUserCompletedSubcategories(user.uid, quiz.idCategory, quiz.idSubcategory);

        // Garante que sempre tenha um nome de usuário, mesmo que displayName esteja vazio
        const userName = user.displayName || user.email?.split('@')[0] || 'Usuário';
        await addUserHistory(userHistory, userName);
      }

      navigation.navigate('finish', {
        titleCategory,
        titleSubcategory,
        points: totalPoints,
        totalQuestions,
        percentage,
        level,
        userAnswers: allAnswers,
      });
    } catch (error) {
      console.error('Erro ao salvar o progresso do usuário:', error);
    } finally {
      setIsFinishing(false);
    }
  }

  const handleStop = useCallback(() => {
    setStop(true);
    setNext(false);
    setBottomSheetOpen(true);
  }, []);

  function handleBottomSheetPressStop() {
    bottomSheetRef.current?.close();
    navigation.navigate('categories');
  }

  function handleBottomSheetClose() {
    setStop(false);
    setNext(false);
    setBottomSheetOpen(false);
    bottomSheetRef.current?.close();
  }

  const playSound = useCallback(
    async (isCorrect: boolean) => {
      if (!isSoundOn || !soundsLoaded) return;

      if (isCorrect) {
        playCorrect();
      } else {
        playWrong();
      }
    },
    [isSoundOn, soundsLoaded, playCorrect, playWrong]
  );

  useEffect(() => {
    loadSounds();
    return () => {
      unloadSounds();
    };
  }, [loadSounds, unloadSounds]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (navigation.isFocused()) {
        if (currentQuestion !== 0) {
          handleStop();
          return true;
        }
      }
      return false;
    });
    return () => {
      backHandler.remove();
    };
  }, [navigation, currentQuestion, handleStop]);

  useEffect(() => {
    if (bottomSheetOpen) {
      bottomSheetRef.current?.expand();
    }
  }, [bottomSheetOpen]);

  return (
    <GradientContainer>
      <SafeAreaView style={styles.container}>
        <Header title={titleCategory} onPress={goToBack} />
        {quiz && (
          <ProgressBar
            current={currentQuestion + 1}
            total={quiz.questions.length}
            title={titleSubcategory}
          />
        )}
        {quiz && quiz.questions.length > 0 && soundsLoaded ? (
          <>
            <Text style={styles.quiz}>{quiz.questions[currentQuestion].title}</Text>
            <ScrollView style={styles.scroll}>
              <Question
                question={quiz.questions[currentQuestion]}
                success={quiz.questions[currentQuestion].correct === alternativeSelected}
                correctIndex={quiz.questions[currentQuestion].correct}
                alternativeSelected={alternativeSelected}
                setAlternativeSelected={setAlternativeSelected}
                playSound={playSound}
              />
              <View style={styles.buttonBox}>
                <View style={styles.boxBackButton}>
                  <ButtonActionOutilene
                    title="Parar"
                    disabled={currentQuestion === 0}
                    onPress={handleStop}
                  />
                </View>
                <View style={styles.boxNextButton}>
                  <ButtonAction disabled={false} title="Próxima" onPress={handleConfirm} />
                </View>
              </View>
            </ScrollView>
          </>
        ) : null}
      </SafeAreaView>
      {(!quiz || quiz.questions.length === 0 || isFinishing) && <Loading />}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
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
        {stop && (
          <BottomSheetView>
            <BottomSheetMessage
              type={MessageType.question}
              title="Deseja parar o quiz?"
              subtitle="Seu progresso não será contabilizado e você poderá recomeçar quando quiser."
              onPressPrimary={handleBottomSheetPressStop}
              onPressSecondary={handleBottomSheetClose}
            />
          </BottomSheetView>
        )}
        {next && (
          <BottomSheetView>
            <BottomSheetMessage
              type={MessageType.question}
              title="Deseja realmente pular a questão?"
              subtitle="Questões não respondidas serão contabilizadas como erros na sua pontuação final."
              onPressPrimary={handleNextQuestion}
              onPressSecondary={handleBottomSheetClose}
            />
          </BottomSheetView>
        )}
      </BottomSheet>
    </GradientContainer>
  );
}
