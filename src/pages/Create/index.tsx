import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Keyboard, View, Text, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import firestore from '@react-native-firebase/firestore';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTheme } from '@/hooks/useTheme';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useAppStore } from '@/hooks/useAppStore';
import { GradientContainer } from '@/components/GradientContainer';
import { Header } from '@/components/Header';
import { Input } from '@/components/Input';
import { ButtonAction } from '@/components/ButtonAction';
import { DropDown } from '@/components/DropDown';
import { BottomSheetMessage } from '@/components/BottomSheetMessage';
import { Loading } from '@/components/Loading';
import { IUserCreatedQuiz } from '@/models/UserCreatedQuiz';
import { MessageType } from '@/models/Utils';
import { addUserCreatedQuiz } from '@/services/firestore';
import { getCreateStyles } from './styles';

const categories = [
  { label: 'Conceitos', value: 'CONCEITOS' },
  { label: 'Personagens', value: 'PERSONAGENS' },
  { label: 'Livros', value: 'LIVROS' },
  { label: 'Filmes', value: 'FILMES' },
  { label: 'Espíritos', value: 'ESPIRITOS' },
  { label: 'Diversos', value: 'DIVERSOS' },
];

export function CreateQuiz() {
  const theme = useTheme();
  const styles = useThemedStyles(getCreateStyles);
  const navigation = useNavigation();
  const { user } = useAppStore();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(categories);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [1, '36%'], []);

  const [inputs, setInputs] = useState({
    categoryId: '',
    question: '',
    correctAnswer: '',
    wrongAnswer1: '',
    wrongAnswer2: '',
    wrongAnswer3: '',
  });

  const [errors, setErrors] = useState({
    categoryId: '',
    question: '',
    correctAnswer: '',
    wrongAnswer1: '',
    wrongAnswer2: '',
    wrongAnswer3: '',
  });

  const handleSheetChanges = useCallback((index: number) => {
    setBottomSheetOpen(index === 1);
  }, []);

  function handleBottomSheetPressPrimaryError() {
    setModalError(false);
    setBottomSheetOpen(false);
    bottomSheetRef.current?.close();
  }

  function handleBottomSheetPressPrimarySuccess() {
    setInputs({
      categoryId: '',
      question: '',
      correctAnswer: '',
      wrongAnswer1: '',
      wrongAnswer2: '',
      wrongAnswer3: '',
    });

    setErrors({
      categoryId: '',
      question: '',
      correctAnswer: '',
      wrongAnswer1: '',
      wrongAnswer2: '',
      wrongAnswer3: '',
    });

    setModalError(false);
    setBottomSheetOpen(false);
    bottomSheetRef.current?.close();
  }

  function validate() {
    let valid = true;
    Keyboard.dismiss();
    if (!inputs.categoryId) {
      handleError('Por favor, informe a categoria do quiz.', 'categoryId');
      valid = false;
    }
    if (!inputs.question) {
      handleError('Por favor, informe a pergunta do quiz.', 'question');
      valid = false;
    } else if (inputs.question.length > 300) {
      handleError('A pergunta deve ter no máximo 300 caracteres.', 'question');
      valid = false;
    }
    if (!inputs.correctAnswer) {
      handleError('Por favor, informe a resposta correta.', 'correctAnswer');
      valid = false;
    } else if (inputs.correctAnswer.length > 150) {
      handleError('A resposta correta deve ter no máximo 150 caracteres.', 'correctAnswer');
      valid = false;
    }
    if (!inputs.wrongAnswer1) {
      handleError('Por favor, informe a resposta incorreta.', 'wrongAnswer1');
      valid = false;
    } else if (inputs.wrongAnswer1.length > 150) {
      handleError('A resposta incorreta deve ter no máximo 150 caracteres.', 'wrongAnswer1');
      valid = false;
    }
    if (!inputs.wrongAnswer2) {
      handleError('Por favor, informe a resposta incorreta.', 'wrongAnswer2');
      valid = false;
    } else if (inputs.wrongAnswer2.length > 150) {
      handleError('A resposta incorreta deve ter no máximo 150 caracteres.', 'wrongAnswer2');
      valid = false;
    }
    if (!inputs.wrongAnswer3) {
      handleError('Por favor, informe a resposta incorreta.', 'wrongAnswer3');
      valid = false;
    } else if (inputs.wrongAnswer3.length > 150) {
      handleError('A resposta incorreta deve ter no máximo 150 caracteres.', 'wrongAnswer3');
      valid = false;
    }
    if (valid) {
      submit();
    }
  }

  async function submit() {
    try {
      setLoading(true);
      const quizData: IUserCreatedQuiz = {
        userId: user?.uid ?? '',
        categoryId: inputs.categoryId,
        question: inputs.question,
        correctAnswer: inputs.correctAnswer,
        wrongAnswer1: inputs.wrongAnswer1,
        wrongAnswer2: inputs.wrongAnswer2,
        wrongAnswer3: inputs.wrongAnswer3,
        createdAt: firestore.Timestamp.fromDate(new Date()),
        isApproved: false,
      };
      await addUserCreatedQuiz(quizData);
      setModalSuccess(true);
      setBottomSheetOpen(true);
    } catch (error) {
      setModalError(true);
      setBottomSheetOpen(true);
    } finally {
      setLoading(false);
    }
  }

  function handleOnChange(text: string, input: string) {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  }

  function handleError(errorMessage: string | null, input: string) {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  }

  useEffect(() => {
    if (bottomSheetOpen) {
      bottomSheetRef.current?.expand();
    }
  }, [bottomSheetOpen]);

  return (
    <GradientContainer>
      <SafeAreaView style={styles.container}>
        <Header title="Criar Quiz" onPress={() => navigation.goBack()} />
        <Text style={styles.subtitle}>
          Contribua com o Saber Espírita! Crie perguntas e respostas exclusivas e compartilhe seu
          conhecimento com a comunidade.
        </Text>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          enableAutomaticScroll={true}
          showsVerticalScrollIndicator={false}
          extraHeight={120}
          style={{ elevation: 0, shadowOpacity: 0 }}>
          <View style={styles.viewDropdown}>
            <DropDown
              open={open}
              value={inputs.categoryId}
              items={items}
              setOpen={setOpen}
              setValue={(callback) => {
                const value =
                  typeof callback === 'function' ? callback(inputs.categoryId) : callback;
                handleOnChange(value, 'categoryId');
              }}
              setItems={setItems}
              listMode="MODAL"
              label="Categoria do quiz"
              placeholder="Selecione a categoria"
              error={errors.categoryId}
              onFocus={() => handleError(null, 'categoryId')}
            />
          </View>
          <Input
            label="Pergunta do quiz"
            placeholder="Digite a pergunta aqui"
            autoCorrect={false}
            keyboardType="default"
            maxLength={300}
            value={inputs.question}
            error={errors.question}
            onFocus={() => handleError(null, 'question')}
            onChangeText={(text) => handleOnChange(text, 'question')}
          />
          <Input
            label="Resposta correta"
            placeholder="Digite a resposta correta"
            autoCorrect={false}
            keyboardType="default"
            maxLength={150}
            value={inputs.correctAnswer}
            error={errors.correctAnswer}
            onFocus={() => handleError(null, 'correctAnswer')}
            onChangeText={(text) => handleOnChange(text, 'correctAnswer')}
          />
          <Input
            label="Resposta incorreta 1"
            placeholder="Digite uma resposta incorreta"
            autoCorrect={false}
            keyboardType="default"
            maxLength={150}
            value={inputs.wrongAnswer1}
            error={errors.wrongAnswer1}
            onFocus={() => handleError(null, 'wrongAnswer1')}
            onChangeText={(text) => handleOnChange(text, 'wrongAnswer1')}
          />
          <Input
            label="Resposta incorreta 2"
            placeholder="Digite outra resposta incorreta"
            autoCorrect={false}
            keyboardType="default"
            maxLength={150}
            value={inputs.wrongAnswer2}
            error={errors.wrongAnswer2}
            onFocus={() => handleError(null, 'wrongAnswer2')}
            onChangeText={(text) => handleOnChange(text, 'wrongAnswer2')}
          />
          <Input
            label="Resposta incorreta 3"
            placeholder="Digite mais uma resposta incorreta"
            autoCorrect={false}
            keyboardType="default"
            maxLength={150}
            value={inputs.wrongAnswer3}
            error={errors.wrongAnswer3}
            onFocus={() => handleError(null, 'wrongAnswer3')}
            onChangeText={(text) => handleOnChange(text, 'wrongAnswer3')}
          />
          <View style={styles.buttonContainer}>
            <ButtonAction title="Enviar" onPress={validate} />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
      {loading && <Loading />}

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
        {modalError && (
          <BottomSheetView>
            <BottomSheetMessage
              type={MessageType.error}
              title="Erro ao Enviar o Quiz"
              subtitle="Ocorreu um problema ao enviar seu quiz. Por favor, verifique sua conexão com a internet e tente novamente."
              titleButtonPrimary="OK"
              onPressPrimary={handleBottomSheetPressPrimaryError}
            />
          </BottomSheetView>
        )}
        {modalSuccess && (
          <BottomSheetView>
            <BottomSheetMessage
              type={MessageType.success}
              title="Quiz Enviado com Sucesso!"
              subtitle="Obrigado por contribuir com o Saber Espírita! Sua pergunta será analisada e, se aprovada, estará disponível para a comunidade."
              titleButtonPrimary="OK"
              onPressPrimary={handleBottomSheetPressPrimarySuccess}
            />
          </BottomSheetView>
        )}
      </BottomSheet>
    </GradientContainer>
  );
}
