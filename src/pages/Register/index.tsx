import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import auth from '@react-native-firebase/auth';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '@/hooks/useTheme';
import { useAppStore } from '@/hooks/useAppStore';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { PublicStackParamList } from '@/routes/PublicStack';
import { BottomSheetMessage } from '@/components/BottomSheetMessage';
import { GradientContainer } from '@/components/GradientContainer';
import { ButtonAction } from '@/components/ButtonAction';
import { Input } from '@/components/Input';
import { Loading } from '@/components/Loading';
import { MessageType } from '@/models/Utils';
import { getErrorFirebase } from '@/utils/Firebase';
import { getRegisterStyles } from './styles';

export function Register() {
  const theme = useTheme();
  const styles = useThemedStyles(getRegisterStyles);
  const navigation = useNavigation<NativeStackNavigationProp<PublicStackParamList>>();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['1%', '36%'], []);
  const { setUser } = useAppStore();
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [errorAuth, setErrorAuth] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ fullname: '', email: '', password: '' });
  const [inputs, setInputs] = useState({ fullname: '', email: '', password: '' });

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
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
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (bottomSheetOpen) {
      bottomSheetRef.current?.snapToIndex(1);
    }
  }, [bottomSheetOpen]);

  return (
    <View style={styles.container}>
      <GradientContainer>
        <View style={styles.header}>
          <View style={styles.columnLogo}>
            {/* <Image 
              source={require('@assets/images/Kardec/Kardec.png')} 
              style={styles.logo}
            /> */}
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
                Registre-se e embarque em uma jornada divertida de estudo da doutrina espírita.
              </Text>
            </View>
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
              placeholder="Seu e-mail"
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
              placeholder="Sua senha"
              iconName="lock-password-line"
              value={inputs.password}
              error={errors.password}
              onFocus={() => handleError(null, 'password')}
              onChangeText={(text) => handleOnChange(text, 'password')}
              autoCorrect={false}
              password={true}
            />
            <View style={styles.spaceButton}>
              <ButtonAction disabled={false} title="Registrar" onPress={validate} />
            </View>
            <TouchableOpacity style={styles.buttonLogin} onPress={handleLinkLogin}>
              <Text style={styles.login}>
                Já tem uma conta? <Text style={styles.linkLogin}>Faça o login.</Text>
              </Text>
            </TouchableOpacity>
          </KeyboardAwareScrollView>
        </View>
        {loading && <Loading />}
        {/* {bottomSheetOpen && <View style={styles.containerModal} />} */}
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
        </BottomSheet>
      </GradientContainer>
    </View>
  );
}
