import { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { View, Text, Share, Alert, SafeAreaView, Switch, Platform } from 'react-native';
import * as MailComposer from 'expo-mail-composer';
import Icon from 'react-native-remix-icon';
import auth from '@react-native-firebase/auth';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '@/hooks/useTheme';
import { useAppStore } from '@/hooks/useAppStore';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { Header } from '@/components/Header';
import { GradientContainer } from '@/components/GradientContainer';
import { BottomNavigation } from '@/components/BottomNavigation';
import { MenuMore } from '@/components/MenuMore';
import { BottomSheetMessage } from '@/components/BottomSheetMessage';
import { MessageType, ThemeType } from '@/models/Utils';
import { getMenuStyles } from './styles';
import { PrivateStackParamList } from '@/routes/PrivateStack';

const TITLE = 'Saber Espírita';
const MESSAGE = `Desafie sua mente e aprofunde seus conhecimentos sobre espiritismo! ${'\n'}
O app Saber Espírita traz quizzes incríveis para você. ${'\n'}
Baixe agora e compartilhe com seus amigos: ${'\n'}
https://play.google.com/store/apps/details?id=app.saberespirita`;

export function Menu() {
  const styles = useThemedStyles(getMenuStyles);
  const navigation = useNavigation<NativeStackNavigationProp<PrivateStackParamList>>();
  const [onError, setOnError] = useState(false);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [error, setError] = useState('');
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['1%', '36%'], []);

  const {
    theme: themeContext,
    toggleTheme,
    isSoundOn,
    toggleSound,
    setUser,
    isLoading,
  } = useAppStore();

  const theme = useTheme();
  const isDarkTheme = themeContext === ThemeType.dark;

  const handleSheetChanges = useCallback((index: number) => {
    setBottomSheetOpen(index === 1);
  }, []);

  async function handleShared() {
    try {
      await Share.share({
        message: MESSAGE,
        title: TITLE,
      });
    } catch (error) {
      setError('Erro ao compartilhar aplicativo com amigos.');
      setOnError(true);
      setBottomSheetOpen(true);
    }
  }

  function handleCloseError() {
    setError('');
    setOnError(false);
    setBottomSheetOpen(false);
    bottomSheetRef.current?.close();
  }

  async function handleLogout() {
    try {
      await auth().signOut();
      setUser(null);
    } catch (_error) {
      setError('Erro ao fazer logout');
    }
  }

  async function sendEmail() {
    const isAvailable = await MailComposer.isAvailableAsync();

    if (isAvailable) {
      const options = {
        recipients: ['quiz.saberespirita@gmail.com'],
        subject: 'Contato Saber Espírita',
        isHtml: false,
      };
      try {
        const result = await MailComposer.composeAsync(options);
        if (result.status === MailComposer.MailComposerStatus.SENT) {
          setOnError(false);
        } else if (result.status === MailComposer.MailComposerStatus.CANCELLED) {
          setOnError(false);
        }
      } catch (error) {
        setError(
          'Ocorreu um erro ao tentar enviar o e-mail. Por favor, tente novamente mais tarde.'
        );
        setOnError(true);
        setBottomSheetOpen(true);
      }
    } else {
      setError('Seu dispositivo não possui um aplicativo de e-mail configurado.');
      setOnError(true);
      setBottomSheetOpen(true);
    }
  }

  useEffect(() => {
    if (bottomSheetOpen) {
      bottomSheetRef.current?.expand();
    }
  }, [bottomSheetOpen]);

  if (isLoading) {
    return null;
  }

  return (
    <GradientContainer>
      <SafeAreaView style={styles.container}>
        <Header onPress={() => navigation.goBack()} title="Mais opções" />
        <View style={styles.wrapper}>
          <MenuMore iconName="mail-send-line" title="Fale conosco" onPress={sendEmail} />
          <MenuMore
            iconName="question-line"
            title="Perguntas frequentes"
            onPress={() => navigation.navigate('help')}
          />
          <MenuMore
            iconName="file-paper-2-line"
            title="Termo de uso"
            onPress={() => navigation.navigate('terms')}
          />
          <MenuMore
            iconName="lock-2-line"
            title="Política de privacidade"
            onPress={() => navigation.navigate('privacy')}
          />
          <MenuMore
            iconName="survey-line"
            title="Criar quiz"
            onPress={() => navigation.navigate('create')}
          />
          <MenuMore iconName="share-line" title="Compartilhar com amigos" onPress={handleShared} />
          <MenuMore iconName="logout-box-r-line" title="Sair" onPress={handleLogout} />
        </View>

        <View style={styles.boxItems}>
          <View style={styles.row}>
            <Text style={styles.rowTitle}>Emitir som</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon
                name="volume-mute-line"
                size={18}
                color={!isSoundOn ? theme.colors.titleNormal : theme.colors.cardQuizBorder}
                style={{ marginRight: 6 }}
              />
              <View style={Platform.OS === 'android' ? { transform: [{ scale: 1.2 }] } : null}>
                <Switch
                  value={isSoundOn}
                  onValueChange={toggleSound}
                  thumbColor={theme.colors.primary}
                  trackColor={{
                    false: theme.colors.bottonNavigationBack,
                    true: theme.colors.bottonNavigationBack,
                  }}
                />
              </View>
              <Icon
                name="volume-down-line"
                size={18}
                color={isSoundOn ? theme.colors.titleNormal : theme.colors.cardQuizBorder}
                style={{ marginLeft: 6 }}
              />
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.rowTitle}>Alterar tema</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon
                name="sun-line"
                size={18}
                color={!isDarkTheme ? theme.colors.titleNormal : theme.colors.cardQuizBorder}
                style={{ marginRight: 6 }}
              />
              <View style={Platform.OS === 'android' ? { transform: [{ scale: 1.2 }] } : null}>
                <Switch
                  value={isDarkTheme}
                  onValueChange={toggleTheme}
                  thumbColor={theme.colors.primary}
                  trackColor={{
                    false: theme.colors.bottonNavigationBack,
                    true: theme.colors.bottonNavigationBack,
                  }}
                />
              </View>
              <Icon
                name="contrast-2-fill"
                size={18}
                color={isDarkTheme ? theme.colors.titleNormal : theme.colors.cardQuizBorder}
                style={{ marginLeft: 6 }}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>

      <BottomNavigation />

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
        {onError && (
          <BottomSheetView>
            <BottomSheetMessage
              type={MessageType.error}
              title="Houve um problema"
              subtitle={error}
              titleButtonPrimary="OK"
              onPressPrimary={handleCloseError}
            />
          </BottomSheetView>
        )}
      </BottomSheet>
    </GradientContainer>
  );
}
