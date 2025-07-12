import { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import type { IconName } from 'react-native-remix-icon';
import { View, Text, TouchableOpacity, Share, Alert, SafeAreaView } from 'react-native';
import * as MailComposer from 'expo-mail-composer';
import Toggle from 'react-native-toggle-element';
import Icon from 'react-native-remix-icon';
import auth from '@react-native-firebase/auth';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
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

const TITLE = 'Saber Espírita';
const MESSAGE =
  'Que tal um desafio sobre espiritismo? \n\nTeste seus conhecimentos no Saber Espírita. \nBaixe agora: https://play.google.com/store/apps/details?id=seu.app';

type RootStackParamList = {
  help: undefined;
  terms: undefined;
  privacy: undefined;
  create: undefined;
  menu: undefined;
};

export function Menu() {
  const styles = useThemedStyles(getMenuStyles);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [onError, setOnError] = useState(false);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [error, setError] = useState('');

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [1, '36%'], []);

  const { theme: themeContext, toggleTheme, isSoundOn, toggleSound, setUser } = useAppStore();

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
      bottomSheetRef.current?.expand();
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
          Alert.alert('Sucesso', 'E-mail enviado com sucesso!');
          setOnError(false);
        } else if (result.status === MailComposer.MailComposerStatus.CANCELLED) {
          Alert.alert('Cancelado', 'Envio de e-mail cancelado.');
          setOnError(false);
        }
      } catch (error) {
        setError(
          'Ocorreu um erro ao tentar enviar o e-mail. Por favor, tente novamente mais tarde.'
        );
        setOnError(true);
        bottomSheetRef.current?.expand();
      }
    } else {
      setError('Seu dispositivo não possui um aplicativo de e-mail configurado.');
      setOnError(true);
      bottomSheetRef.current?.expand();
    }
  }

  const renderToggle = (
    value: boolean,
    onPress: () => void,
    leftIconName: IconName,
    rightIconName: IconName,
    leftIconColor: string,
    rightIconColor: string
  ) => (
    <Toggle
      value={value}
      onPress={onPress}
      trackBar={{
        width: 72,
        height: 32,
        borderWidth: 1,
        borderActiveColor: isDarkTheme
          ? theme.colors.toggleBorderActive
          : theme.colors.toggleBorderInActive,
        activeBackgroundColor: isDarkTheme
          ? theme.colors.toggleActiveBackground
          : theme.colors.toggleInActiveBackground,
        inActiveBackgroundColor: isDarkTheme
          ? theme.colors.toggleActiveBackground
          : theme.colors.toggleInActiveBackground,
        borderInActiveColor: isDarkTheme
          ? theme.colors.toggleBorderActive
          : theme.colors.toggleBorderInActive,
        radius: 16,
      }}
      thumbButton={{
        width: 36,
        height: 32,
        radius: 16,
        activeBackgroundColor: theme.colors.primary,
        inActiveBackgroundColor: theme.colors.primary,
      }}
      leftComponent={<Icon name={leftIconName} size={18} color={leftIconColor} />}
      rightComponent={<Icon name={rightIconName} size={18} color={rightIconColor} />}
    />
  );

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
            {renderToggle(
              isSoundOn,
              toggleSound,
              'volume-mute-line',
              'volume-down-line',
              !isDarkTheme && !isSoundOn
                ? theme.colors.secondary
                : !isDarkTheme && isSoundOn
                  ? theme.colors.primary
                  : isDarkTheme && !isSoundOn
                    ? theme.colors.terciary
                    : theme.colors.titleNormal,
              !isDarkTheme && !isSoundOn
                ? theme.colors.primary
                : !isDarkTheme && isSoundOn
                  ? theme.colors.secondary
                  : isDarkTheme && !isSoundOn
                    ? theme.colors.titleNormal
                    : theme.colors.terciary
            )}
          </View>
          <View style={styles.row}>
            <Text style={styles.rowTitle}>Alterar tema</Text>
            {renderToggle(
              isDarkTheme,
              toggleTheme,
              'sun-line',
              'contrast-2-fill',
              isDarkTheme ? theme.colors.titleBold : theme.colors.terciary,
              isDarkTheme ? theme.colors.terciary : theme.colors.primary
            )}
          </View>
        </View>
      </SafeAreaView>
      <BottomNavigation />
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
