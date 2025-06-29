import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTheme } from 'styled-components/native';
import { scale, verticalScale } from 'react-native-size-matters';
import auth from '@react-native-firebase/auth';
import BottomSheet from '@gorhom/bottom-sheet';
import { BottomSheetMessage } from '@/components/BottomSheetMessage';
import { useNavigation } from '@react-navigation/native';
import { GradientContainer } from '@/components/GradientContainer';
import { ButtonAction } from '@/components/ButtonAction';
import { Input } from '@/components/Input';
import { MessageType } from '@/models/Utils';
import { getErrorFirebase } from '@/utils/Firebase';
import { Loading } from '@/components/Loading';
import { useAppStore } from '@/stores/useAppStore';

import {
  Container,
  Header,
  ColumnLogo,
  ContainerHeader,
  // Logo,
  SpaceButton,
  SubtitleHeader,
  TitleLogo,
  Content,
  Login,
  ButtonLogin,
  LinkLogin,
  ContainerModal,
} from './styles';

export function Register() {
  const theme = useTheme();
  const navigation = useNavigation();
  const { setUser } = useAppStore();
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [errorAuth, setErrorAuth] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ fullname: '', email: '', password: '' });
  const [inputs, setInputs] = useState({ fullname: '', email: '', password: '' });

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [1, '36%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    setBottomSheetOpen(index === 1);
  }, []);

  function handleBottomSheetPressPrimary() {
    setModalError(false);
    setBottomSheetOpen(false);
    bottomSheetRef.current?.close();
  }

  function handleLinkLogin() {
    navigation.navigate('login');
  }

  function validate() {
    let valid = true;
    Keyboard.dismiss();
    if (!inputs.fullname) {
      handleError('Por favor, informe o seu apelido ou nome.', 'fullname');
      valid = false;
    } else if (inputs.fullname.length < 3) {
      handleError('O apelido deve ter no mínimo 3 caracteres.', 'fullname');
      valid = false;
    }
    if (!inputs.email) {
      handleError('Por favor, informe o seu e-mail.', 'email');
      valid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Por favor, informe um e-mail válido.', 'email');
      valid = false;
    }
    if (!inputs.password) {
      handleError('Por favor, informe uma senha.', 'password');
      valid = false;
    } else if (inputs.password.length < 6) {
      handleError('A senha deve ter no mínimo 6 caracteres.', 'password');
      valid = false;
    }
    if (valid) {
      register();
    }
  }

  function handleOnChange(text: string, input: string) {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  }

  function handleError(errorMessage: string | null, input: string) {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  }

  async function login() {
    try {
      setLoading(true);
      const result = await auth().signInWithEmailAndPassword(
        inputs.email.toLowerCase(),
        inputs.password
      );
      if (result.user) {
        setUser(result.user);
      }
    } catch (error) {
      setModalError(true);
      setBottomSheetOpen(true);
      if ((error as any).code === 'firestore/resource-exhausted') {
        setErrorAuth('Serviço temporariamente indisponível. Tente novamente mais tarde.');
      } else {
        setErrorAuth(getErrorFirebase((error as any).code));
      }
      bottomSheetRef.current?.expand();
    } finally {
      setLoading(false);
    }
  }

  async function register() {
    setLoading(true);
    try {
      const result = await auth().createUserWithEmailAndPassword(
        inputs.email.trim().toLowerCase(),
        inputs.password.trim()
      );
      if (result.user) {
        await result.user.updateProfile({
          displayName: inputs.fullname.trim(),
          // Há outros dados que podem ser atualizados, como a foto do perfil
        });
        login();
      }
    } catch (error: any) {
      setModalError(true);
      setBottomSheetOpen(true);
      setErrorAuth(getErrorFirebase((error as any).code));
      bottomSheetRef.current?.expand();
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <GradientContainer>
        <Header>
          <ColumnLogo>
            {/* <Logo source={require('@assets/images/Kardec/Kardec.png')} /> */}
            <TitleLogo>Saber Espírita</TitleLogo>
          </ColumnLogo>
        </Header>
        <Content>
          <KeyboardAwareScrollView
            enableOnAndroid={true}
            enableAutomaticScroll={true}
            showsVerticalScrollIndicator={false}
            extraHeight={verticalScale(120)}
            style={{ elevation: 0, shadowOpacity: 0 }}>
            <ContainerHeader>
              <SubtitleHeader>
                Registre-se e embarque em uma jornada divertida de estudo da doutrina espírita.
              </SubtitleHeader>
            </ContainerHeader>
            <Input
              label="Apelido ou Nome *"
              placeholder="Seu apelido ou nome"
              iconName="user-3-line"
              value={inputs.fullname}
              error={errors.fullname}
              onFocus={() => handleError(null, 'fullname')}
              onChangeText={(text) => handleOnChange(text, 'fullname')}
              autoCorrect={false}
              autoCapitalize="words"
            />
            <Input
              label="E-Mail *"
              placeholder="nome@email.com"
              iconName="mail-line"
              value={inputs.email}
              error={errors.email}
              onFocus={() => handleError(null, 'email')}
              onChangeText={(text) => handleOnChange(text, 'email')}
              autoCorrect={false}
              keyboardType="email-address"
            />
            <Input
              label="Senha *"
              placeholder="******"
              iconName="lock-password-line"
              value={inputs.password}
              error={errors.password}
              onFocus={() => handleError(null, 'password')}
              onChangeText={(text) => handleOnChange(text, 'password')}
              autoCorrect={false}
              password={true}
            />
            <SpaceButton>
              <ButtonAction disabled={false} title="Registrar" onPress={validate} />
            </SpaceButton>
            <ButtonLogin onPress={handleLinkLogin}>
              <Login>
                Já tem uma conta? <LinkLogin>Faça o login.</LinkLogin>
              </Login>
            </ButtonLogin>
          </KeyboardAwareScrollView>
        </Content>
        {loading && <Loading />}
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
          {modalError && (
            <BottomSheetMessage
              type={MessageType.error}
              title="Houve um problema"
              subtitle={errorAuth}
              titleButtonPrimary="OK"
              onPressPrimary={handleBottomSheetPressPrimary}
            />
          )}
        </BottomSheet>
      </GradientContainer>
    </Container>
  );
}
