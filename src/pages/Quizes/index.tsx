import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { GradientContainer } from '@/components/GradientContainer';
import BottomSheet from '@gorhom/bottom-sheet';
import { useTheme } from 'styled-components/native';
import { Header } from '@/components/Header';
import { ProgressBar } from '@/components/ProgressBar';
import { ButtonAction } from '@/components/ButtonAction';
import { ButtonActionOutilene } from '@/components/ButtonActionOutilene';
import { Question } from '@/components/Question';
import { Loading } from '@/components/Loading';
import { BottomSheetMessage } from '@/components/BottomSheetMessage';
import { scale, verticalScale } from 'react-native-size-matters';
import firestore from '@react-native-firebase/firestore';
import { IQuizes } from '@/models/Quizes';
import { IUserProgress } from '@/models/UsersProgress';
import { IUserAnswer } from '@/models/UserAnswer';
import { useAppStore } from '@/stores/useAppStore';
import { MessageType } from '@/models/Utils';
import { addUserProgress, getQuiz, saveUserCompletedSubcategories } from '@/services/firestore';
import {
  BoxBackButton,
  BoxNextButton,
  ButtonBox,
  Container,
  ContainerModal,
  Quiz,
  Scroll,
} from './styles';
import { BackHandler } from 'react-native';

type RouteParams = {
  idCategory: string;
  idSubcategory: string;
  titleCategory: string;
  titleSubcategory: string;
};

export function Quizes() {
  const theme = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const { user } = useAppStore();
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

  const { idSubcategory, titleCategory, titleSubcategory } = route.params as RouteParams;

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

    //const totalPoints = points > 0 ? points + 1 : points;
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
      <Container>
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
            <Quiz>{quiz.questions[currentQuestion].title}</Quiz>
            <Scroll>
              <Question
                question={quiz.questions[currentQuestion]}
                success={quiz.questions[currentQuestion].correct === alternativeSelected}
                alternativeSelected={alternativeSelected}
                setAlternativeSelected={setAlternativeSelected}
              />
              <ButtonBox>
                <BoxBackButton>
                  <ButtonActionOutilene
                    title="Parar"
                    disabled={currentQuestion === 0}
                    onPress={handleStop}
                  />
                </BoxBackButton>
                <BoxNextButton>
                  <ButtonAction disabled={false} title="Próxima" onPress={handleConfirm} />
                </BoxNextButton>
              </ButtonBox>
            </Scroll>
          </>
        ) : null}
      </Container>
      {(!quiz || quiz.questions.length === 0) && <Loading />}
      {bottomSheetOpen && <ContainerModal />}
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: theme.colors.backGradientStart }}
        handleIndicatorStyle={{
          backgroundColor: theme.colors.secondary,
          width: scale(80),
          height: verticalScale(8),
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
