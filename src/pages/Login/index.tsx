import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Keyboard, View, Text, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-remix-icon';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTheme } from '@/hooks/useTheme';
import { useAppStore } from '@/hooks/useAppStore';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { getErrorFirebase } from '@/utils/Firebase';
import { MessageType } from '@/models/Utils';
import { GradientContainer } from '@/components/GradientContainer';
import { ButtonAction } from '@/components/ButtonAction';
import { Input } from '@/components/Input';
import { BottomSheetMessage } from '@/components/BottomSheetMessage';
import { Loading } from '@/components/Loading';
import { PublicStackParamList } from '@/routes/PublicStack';
import { getLoginStyles } from './styles';
import { TermsAndPrivacy } from '@/components/TermsAndPrivacy';

export function Login() {
  const theme = useTheme();
  const styles = useThemedStyles(getLoginStyles);
  const navigation = useNavigation<NativeStackNavigationProp<PublicStackParamList>>();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['1%', '36%'], []);
  const { setUser } = useAppStore();
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [modalPassword, setModalPassword] = useState(false);
  const [errorAuth, setErrorAuth] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [inputs, setInputs] = useState({ email: '', password: '' });

  const handleSheetChanges = useCallback((index: number) => {
    setBottomSheetOpen(index === 1);
  }, []);

  function handleBottomSheetPressPrimary() {
    setModalError(false);
    setModalPassword(false);
    setBottomSheetOpen(false);
    bottomSheetRef.current?.close();
  }

  function validate() {
    let valid = true;
    Keyboard.dismiss();
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
      login();
    }
  }

  function handleRegister() {
    navigation.navigate('register');
  }

  async function handleRecoverPassword() {
    let valid = true;

    if (!inputs.email) {
      handleError('Por favor, informe o seu e-mail.', 'email');
      valid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Por favor, informe um e-mail válido.', 'email');
      valid = false;
    }

    if (valid) {
      setLoading(true);
      auth()
        .sendPasswordResetEmail(inputs.email.toLowerCase())
        .then(() => {
          setLoading(false);
          setModalPassword(true);
          setBottomSheetOpen(true);
        })
        .catch((error) => {
          setLoading(false);
          setModalError(true);
          setBottomSheetOpen(true);
          setErrorAuth(getErrorFirebase(error.code));
        });
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
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (bottomSheetOpen) {
      bottomSheetRef.current?.expand();
    }
  }, [bottomSheetOpen]);

  return (
    <View style={styles.container}>
      <GradientContainer>
        <View style={styles.header}>
          <View style={styles.columnLogo}>
            {/* <Image source={require('@assets/images/Kardec/Kardec.png')} style={styles.logo} /> */}
            <Text style={styles.titleLogo}>Saber Espírita</Text>
          </View>
        </View>
        <View style={styles.content}>
          <KeyboardAwareScrollView
            enableOnAndroid={true}
            enableAutomaticScroll={true}
            showsVerticalScrollIndicator={false}
            extraHeight={120}
            style={{ elevation: 0, shadowOpacity: 0 }}>
            <View style={styles.containerHeader}>
              <Text style={styles.subtitleHeader}>
                Informe os dados abaixo e autentique-se para testar seus conhecimentos em Doutrina
                Espírita.
              </Text>
            </View>
            <Input
              label="E-Mail"
              placeholder="seu e-mail"
              iconName="mail-line"
              value={inputs.email}
              error={errors.email}
              onFocus={() => handleError(null, 'email')}
              onChangeText={(text) => handleOnChange(text, 'email')}
              autoCorrect={false}
              keyboardType="email-address"
            />
            <Input
              label="Senha"
              placeholder="sua senha"
              iconName="lock-password-line"
              value={inputs.password}
              error={errors.password}
              onFocus={() => handleError(null, 'password')}
              onChangeText={(text) => handleOnChange(text, 'password')}
              autoCorrect={false}
              password={true}
            />
            <View style={styles.spaceButton}>
              <ButtonAction disabled={false} title="Entrar" onPress={validate} />
            </View>
            <View style={styles.boxLine}>
              <TouchableOpacity style={styles.button} onPress={handleRecoverPassword}>
                <View style={styles.line}>
                  <Icon name="lock-unlock-fill" color={theme.colors.accented} size={20} />
                  <Text style={styles.linkLogin}>Recuperar senha</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <View style={styles.line}>
                  <Icon name="account-box-fill" color={theme.colors.accented} size={20} />
                  <Text style={styles.linkLogin}>Criar minha conta</Text>
                </View>
              </TouchableOpacity>
            </View>
            <TermsAndPrivacy
              termsUrl="https://kleisernairobi.github.io/SaberEspirita-Terms/"
              privacyUrl="https://kleisernairobi.github.io/SaberEspirita-Privacy/"
            />
          </KeyboardAwareScrollView>
        </View>
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
                title="Houve um problema"
                subtitle={errorAuth}
                titleButtonPrimary="OK"
                onPressPrimary={handleBottomSheetPressPrimary}
              />
            </BottomSheetView>
          )}
          {modalPassword && (
            <BottomSheetView>
              <BottomSheetMessage
                type={MessageType.success}
                title="Redefinição de Senha"
                subtitle="Verifique seu e-mail para redefinir sua senha com o link que enviamos."
                titleButtonPrimary="OK"
                onPressPrimary={handleBottomSheetPressPrimary}
              />
            </BottomSheetView>
          )}
        </BottomSheet>
      </GradientContainer>
    </View>
  );
}
