import { useState, useRef, useMemo, useCallback } from 'react';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';
import Toggle from 'react-native-toggle-element';
import Icon from 'react-native-remix-icon';
import auth from '@react-native-firebase/auth';
import BottomSheet from '@gorhom/bottom-sheet';
// import email from 'react-native-email';
import { scale, verticalScale } from 'react-native-size-matters';
// import Share, {ShareSingleOptions, Social} from 'react-native-share';
import { Header } from '@/components/Header';
import { GradientContainer } from '@/components/GradientContainer';
import { BottomNavigation } from '@/components/BottomNavigation';
import { MenuMore } from '@/components/MenuMore';
import { BottomSheetMessage } from '@/components/BottomSheetMessage';
import { useAppStore } from '@/stores/useAppStore';
import { AppInstaled, MessageType, ThemeType } from '@/models/Utils';
import files from '@/assets/images/Base64/FilesBase64';

import {
  Container,
  Row,
  RowTitle,
  //BoxVersion,
  //Version,
  Wrapper,
  BoxItems,
  ContainerModal,
  TitleModal,
  SubtitleModal,
  RowModal,
  ShareButton,
  ButtonPrimary,
  TitleButtonPrimary,
  ViewButton,
} from './styles';

const TITLE = 'Saber Espírita';
const MESSAGE =
  'Que tal um desafio sobre espiritismo? \n\nTeste seus conhecimentos no Saber Espírita. \nJogue agora e compartilhe com amigos para que eles também possam aprender e se divertir! \n\nE lembre-se, divulgar a doutrina espírita também é um ato de caridade.';

export function Menu() {
  const navigation = useNavigation();
  const [onShare, setOnShare] = useState(false);
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

  async function isAppInstalled(app: AppInstaled) {
    let packageNames: string[] = [];
    switch (app) {
      case 'Facebook':
        packageNames =
          Platform.OS === 'android' ? ['com.facebook.katana'] : ['fb://', 'facebook://'];
        break;
      case 'Whatsapp':
        packageNames =
          Platform.OS === 'android' ? ['com.whatsapp'] : ['whatsapp://', 'whatsapp-messenger://'];
        break;
      case 'Twitter':
        packageNames =
          Platform.OS === 'android' ? ['com.twitter.android'] : ['twitter://', 'tweetbot://'];
        break;
      case 'Instagram':
        packageNames =
          Platform.OS === 'android'
            ? ['com.instagram.android', 'com.instagram.lite']
            : ['instagram://', 'instagram-stories://', 'instagram://app?username=test'];
        break;
      default:
        return false;
    }
    // Testa todos os esquemas/pacotes até encontrar um instalado
    for (const pkg of packageNames) {
      try {
        // const {isInstalled} = await Share.isPackageInstalled(pkg);
        // if (isInstalled) {
        // return true;
        // }
      } catch {
        continue;
      }
    }
    return false;
  }

  async function handleShareFacebook() {
    // const shareOptions: ShareSingleOptions = {
    //   title: TITLE,
    //   message: MESSAGE,
    //   social: Social.Facebook,
    //   url: files.imgShareMedia,
    // };
    // try {
    //   const isInstalled = await isAppInstalled(AppInstaled.facebook);
    //   if (isInstalled) {
    //     await Share.shareSingle(shareOptions);
    //   } else {
    //     setOnShare(false);
    //     setOnError(true);
    //     setError(
    //       'Verifique se o Facebook está instalado e conceda permissão de compartilhamento.',
    //     );
    //   }
    // } catch {
    //   setOnShare(false);
    //   setOnError(true);
    //   setError(
    //     'Verifique se o Facebook está instalado e conceda permissão de compartilhamento.',
    //   );
    // }
  }

  async function handleShareWhatsapp() {
    // const shareOptions: ShareSingleOptions = {
    //   title: TITLE,
    //   message: MESSAGE,
    //   social: Social.Whatsapp,
    //   url: files.imgShareMedia,
    // };
    // try {
    //   const isInstalled = await isAppInstalled(AppInstaled.whatsapp);
    //   if (isInstalled) {
    //     await Share.shareSingle(shareOptions);
    //   } else {
    //     setOnShare(false);
    //     setOnError(true);
    //     setError(
    //       'Verifique se o Whatsapp está instalado e conceda permissão de compartilhamento.',
    //     );
    //   }
    // } catch {
    //   setOnShare(false);
    //   setOnError(true);
    //   setError(
    //     'Verifique se o Whatsapp está instalado e conceda permissão de compartilhamento.',
    //   );
    // }
  }

  async function handleShareTwitter() {
    // const shareOptions: ShareSingleOptions = {
    //   title: TITLE,
    //   message: MESSAGE,
    //   social: Social.Twitter,
    //   url: files.imgShareMedia,
    // };
    // try {
    //   const isInstalled = await isAppInstalled(AppInstaled.twitter);
    //   if (isInstalled) {
    //     await Share.shareSingle(shareOptions);
    //   } else {
    //     setOnShare(false);
    //     setOnError(true);
    //     setError(
    //       'Verifique se o Twitter está instalado e conceda permissão de compartilhamento.',
    //     );
    //   }
    // } catch {
    //   setOnShare(false);
    //   setOnError(true);
    //   setError(
    //     'Verifique se o Twitter está instalado e conceda permissão de compartilhamento.',
    //   );
    // }
  }

  async function handleShareInstagram() {
    // try {
    //   const isInstalled = await isAppInstalled(AppInstaled.instagram);
    //   if (!isInstalled) {
    //     setOnShare(false);
    //     setOnError(true);
    //     setError('Instagram não encontrado. Instale o app e tente novamente.');
    //     return;
    //   }
    //   const shareOptions: ShareSingleOptions = {
    //     title: TITLE,
    //     message: MESSAGE,
    //     social: Social.InstagramStories,
    //     filename: files.imgShareMedia,
    //     appId: Platform.OS === 'ios' ? 'xxxx' : '',
    //   };
    //   await Share.shareSingle(shareOptions);
    // } catch {
    //   setOnShare(false);
    //   setOnError(true);
    //   setError('Falha ao compartilhar. Tente novamente ou use outro método.');
    // }
  }

  async function handleShareEmail() {
    // const shareOptions: ShareSingleOptions = {
    //   title: TITLE,
    //   message: MESSAGE,
    //   social: Social.Email,
    //   subject: 'Saber Espírita',
    //   url: files.imgShareMedia,
    // };
    // try {
    //   await Share.shareSingle(shareOptions);
    // } catch {
    //   setOnShare(false);
    //   setOnError(true);
    //   setError(
    //     'Verifique se um Email está instalado e conceda permissão de compartilhamento.',
    //   );
    // }
  }

  function handleBottomSheetPrimary() {
    setOnShare(false);
    setBottomSheetOpen(false);
    bottomSheetRef.current?.close();
  }

  function handleShared() {
    setOnShare(true);
    setBottomSheetOpen(true);
    bottomSheetRef.current?.expand();
  }

  function handleShareError() {
    setOnError(false);
    setOnShare(true);
  }

  async function handleLogout() {
    try {
      await auth().signOut();
      setUser(null);
    } catch (_error) {
      setError('Erro ao fazer logout');
    }
  }

  function sendEmail() {
    // const subject = 'Contato Saber Espírita';
    // const to = ['espirita.quiz@gmail.com'];
    // email(to, {subject: subject, checkCanOpen: false})
    //   .then(() => {
    //     setOnError(false);
    //   })
    //   .catch(error => {
    //     console.error('Houve um erro ao enviar o e-mail:', error);
    //     setError(
    //       'Ocorreu um erro ao tentar enviar o e-mail. Por favor, tente novamente mais tarde.',
    //     );
    //     setOnError(true);
    //     bottomSheetRef.current?.expand();
    //   });
  }

  const renderToggle = (
    value: boolean,
    onPress: () => void,
    leftIconName: string,
    rightIconName: string,
    leftIconColor: string,
    rightIconColor: string
  ) => (
    <Toggle
      value={value}
      onPress={onPress}
      trackBar={{
        width: verticalScale(72),
        height: verticalScale(32),
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
        radius: verticalScale(16),
      }}
      thumbButton={{
        width: verticalScale(36),
        height: verticalScale(32),
        radius: verticalScale(16),
        activeBackgroundColor: theme.colors.primary,
        inActiveBackgroundColor: theme.colors.primary,
      }}
      leftComponent={<Icon name={leftIconName} size={verticalScale(18)} color={leftIconColor} />}
      rightComponent={<Icon name={rightIconName} size={verticalScale(18)} color={rightIconColor} />}
    />
  );

  return (
    <GradientContainer>
      <Container>
        <Header onPress={() => navigation.goBack()} title="Mais opções" />
        <Wrapper>
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
            iconName="ri-lock-2-line"
            title="Política de privacidade"
            onPress={() => navigation.navigate('privacy')}
          />
          <MenuMore
            iconName="ri-survey-line"
            title="Criar quiz"
            onPress={() => navigation.navigate('create')}
          />
          {/* <MenuMore
            iconName='share-line'
            title='Compartilhar com amigos'
            onPress={handleShared}
          /> */}
          <MenuMore iconName="logout-box-r-line" title="Sair" onPress={handleLogout} />
        </Wrapper>
        <BoxItems>
          <Row>
            <RowTitle>Emitir som</RowTitle>
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
          </Row>
          <Row>
            <RowTitle>Alterar tema</RowTitle>
            {renderToggle(
              isDarkTheme,
              toggleTheme,
              'sun-line',
              'contrast-2-fill',
              isDarkTheme ? theme.colors.titleBold : theme.colors.terciary,
              isDarkTheme ? theme.colors.terciary : theme.colors.primary
            )}
          </Row>
        </BoxItems>
        {/* <BoxVersion>
          <Version>Saber Espírita</Version>
          <Version>Versão 1.0.0</Version>
        </BoxVersion> */}
      </Container>
      <BottomNavigation />

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
        {onShare && (
          <>
            <TitleModal>Compartilhar com amigos</TitleModal>
            <SubtitleModal>Selecione a mídia desejada.</SubtitleModal>
            <RowModal>
              <ShareButton onPress={handleShareFacebook}>
                <Icon name="facebook-fill" size={scale(26)} color={theme.colors.buttonBackTitle} />
              </ShareButton>
              <ShareButton onPress={handleShareWhatsapp}>
                <Icon name="whatsapp-fill" size={scale(26)} color={theme.colors.buttonBackTitle} />
              </ShareButton>
              <ShareButton onPress={handleShareTwitter}>
                <Icon name="twitter-fill" size={scale(26)} color={theme.colors.buttonBackTitle} />
              </ShareButton>
              <ShareButton onPress={handleShareInstagram}>
                <Icon name="instagram-fill" size={scale(26)} color={theme.colors.buttonBackTitle} />
              </ShareButton>
              <ShareButton onPress={handleShareEmail}>
                <Icon name="mail-send-fill" size={scale(26)} color={theme.colors.buttonBackTitle} />
              </ShareButton>
            </RowModal>
            <ViewButton>
              <ButtonPrimary onPress={handleBottomSheetPrimary}>
                <TitleButtonPrimary>Fechar</TitleButtonPrimary>
              </ButtonPrimary>
            </ViewButton>
          </>
        )}
        {onError && (
          <BottomSheetMessage
            type={MessageType.error}
            title="Houve um problema"
            subtitle={error}
            titleButtonPrimary="OK"
            onPressPrimary={handleShareError}
          />
        )}
      </BottomSheet>
    </GradientContainer>
  );
}
