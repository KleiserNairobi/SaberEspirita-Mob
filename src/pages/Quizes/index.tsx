import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, ScrollView, Text, BackHandler, SafeAreaView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BottomSheet from '@gorhom/bottom-sheet';
import { PrivateStackParamList } from '@/routes/PrivateStack';
import { GradientContainer } from '@/components/GradientContainer';
import { useTheme } from '@/hooks/useTheme';
import { useAppStore } from '@/hooks/useAppStore';
import { Header } from '@/components/Header';
import { ProgressBar } from '@/components/ProgressBar';
import { ButtonAction } from '@/components/ButtonAction';
import { ButtonActionOutilene } from '@/components/ButtonActionOutilene';
import { Question } from '@/components/Question';
import { Loading } from '@/components/Loading';
import { BottomSheetMessage } from '@/components/BottomSheetMessage';
import { IQuizes } from '@/models/Quizes';
import { IUserProgress } from '@/models/UsersProgress';
import { IUserAnswer } from '@/models/UserAnswer';
import { MessageType } from '@/models/Utils';
import { addUserProgress, getQuiz, saveUserCompletedSubcategories } from '@/services/firestore';
import { styles } from './styles';

type QuizesRouteProp = RouteProp<PrivateStackParamList, 'quizes'>;

export function Quizes() {
  const theme = useTheme();
  const route = useRoute<QuizesRouteProp>();
  const navigation = useNavigation<NativeStackNavigationProp<PrivateStackParamList>>();
  const { user } = useAppStore();
  const { idSubcategory, titleCategory, titleSubcategory } = route.params;
  const [stop, setStop] = useState(false);
  const [next, setNext] = useState(false);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [points, setPoints] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quiz, setQuiz] = useState<IQuizes | null>(null);
  const [userAnswers, setUserAnswers] = useState<IUserAnswer[]>([]);
  const [alternativeSelected, setAlternativeSelected] = useState<null | number>(null);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [1, '36%'], []);

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

  function saveAnswer(selectedIndex: number | null) {
    if (!quiz) {
      return;
    }
    const question = quiz.questions[currentQuestion];
    const newAnswer: IUserAnswer = {
      question: question.title,
      alternatives: question.alternatives,
      correctAnswerIndex: question.correct,
      selectedAnswerIndex: selectedIndex,
      explanation: question.explanation,
    };
    setUserAnswers((prev) => [...prev, newAnswer]);
    if (selectedIndex !== null && selectedIndex === question.correct) {
      setPoints((prev) => prev + 1);
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

    if (alternativeSelected === question.correct) {
      setPoints((prev) => prev + 1);
    }

    // 3. Se for a última pergunta, passa TODAS as respostas (incluindo a atual)
    if (quiz && currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      handleFinished([...userAnswers, currentAnswer]); // Resposta atual já inclusa!
    }
  }

  function handleSkipConfirm() {
    saveAnswer(null);
    setNext(true);
    setBottomSheetOpen(true);
    bottomSheetRef.current?.expand();
  }

  function handleNextQuestion() {
    setStop(false);
    setNext(false);
    setBottomSheetOpen(false);
    bottomSheetRef.current?.close();

    if (quiz && currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      handleFinished(userAnswers);
    }
  }

  async function handleFinished(allAnswers: IUserAnswer[]) {
    if (!quiz) {
      return;
    }

    const totalPoints = allAnswers.filter(
      (answer) => answer.selectedAnswerIndex === answer.correctAnswerIndex
    ).length;

    const totalQuestions = quiz.questions.length;
    const percentage = calculatePercentage(totalPoints, totalQuestions);
    const level = getLevel(percentage);
    const score = Math.round(percentage);

    const userProgress: IUserProgress = {
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

    try {
      if (user?.uid) {
        await saveUserCompletedSubcategories(user.uid, quiz.idCategory, quiz.idSubcategory);
        await addUserProgress(userProgress);
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
    }
  }

  const handleStop = useCallback(() => {
    setStop(true);
    setNext(false);
    setBottomSheetOpen(true);
    bottomSheetRef.current?.expand();
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

  async function fetchQuiz(idSubcategory: string) {
    const quiz = await getQuiz(idSubcategory);
    setQuiz(quiz);
  }

  useEffect(() => {
    fetchQuiz(idSubcategory);
  }, [idSubcategory]);

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
        {quiz && quiz.questions.length > 0 ? (
          <>
            <Text style={styles.quiz}>{quiz.questions[currentQuestion].title}</Text>
            <ScrollView style={styles.scroll}>
              <Question
                question={quiz.questions[currentQuestion]}
                success={quiz.questions[currentQuestion].correct === alternativeSelected}
                alternativeSelected={alternativeSelected}
                setAlternativeSelected={setAlternativeSelected}
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
      {(!quiz || quiz.questions.length === 0) && <Loading />}
      {bottomSheetOpen && <View style={styles.containerModal} />}
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: theme.colors.backGradientStart }}
        handleIndicatorStyle={{
          backgroundColor: theme.colors.secondary,
          width: 80,
          height: 8,
        }}
        onChange={handleSheetChanges}>
        {stop && (
          <BottomSheetMessage
            type={MessageType.question}
            title="Deseja parar o quiz?"
            subtitle="Seu progresso não será contabilizado e você poderá recomeçar quando quiser."
            onPressPrimary={handleBottomSheetPressStop}
            onPressSecondary={handleBottomSheetClose}
          />
        )}
        {next && (
          <BottomSheetMessage
            type={MessageType.question}
            title="Deseja realmente pular a questão?"
            subtitle="Questões não respondidas serão contabilizadas como erros na sua pontuação final."
            onPressPrimary={handleNextQuestion}
            onPressSecondary={handleBottomSheetClose}
          />
        )}
      </BottomSheet>
    </GradientContainer>
  );
}
