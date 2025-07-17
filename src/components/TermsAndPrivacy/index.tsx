import { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { getTermsAndPrivacyStyles } from './styles';
import { Header } from '../Header';
import { ThemeType } from '@/models/Utils';
import { useAppStore } from '@/hooks/useAppStore';

type TermsAndPrivacyProps = {
  termsUrl: string;
  privacyUrl: string;
};

export function TermsAndPrivacy({ termsUrl, privacyUrl }: TermsAndPrivacyProps) {
  const { theme } = useAppStore();
  const styles = useThemedStyles(getTermsAndPrivacyStyles);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');
  const isDarkTheme = theme === ThemeType.dark;

  function openModal(url: string, title: string) {
    setCurrentUrl(url);
    setCurrentTitle(title);
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Ao continuar, você concorda com nossos{' '}
        <Text style={styles.link} onPress={() => openModal(termsUrl, 'Termos de Uso')}>
          Termos de Uso
        </Text>{' '}
        e nossa{' '}
        <Text style={styles.link} onPress={() => openModal(privacyUrl, 'Política de Privacidade')}>
          Política de Privacidade
        </Text>
        .
      </Text>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        statusBarTranslucent={true}
        onRequestClose={closeModal}>
        <StatusBar
          translucent
          barStyle={isDarkTheme ? 'light-content' : 'dark-content'}
          backgroundColor="transparent"
        />
        <View style={styles.modalContainer}>
          {Platform.OS === 'ios' ? (
            <View style={styles.iosHeader}>
              <Header title={currentTitle} onPress={closeModal} />
            </View>
          ) : (
            <View style={styles.androidHeader}>
              <Header title={currentTitle} onPress={closeModal} />
            </View>
          )}
          <WebView
            source={{ uri: currentUrl }}
            style={styles.webview}
            injectedJavaScript={`
              document.body.style.backgroundColor = '#0C1624';
              document.body.style.color = '#D8DDE5';
              true;
            `}
          />
        </View>
      </Modal>
    </View>
  );
}
