import { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { getTermsAndPrivacyStyles } from './styles';
import { useTheme } from '@/hooks/useTheme';
import { Header } from '../Header';

type TermsAndPrivacyProps = {
  termsUrl: string;
  privacyUrl: string;
};

export function TermsAndPrivacy({ termsUrl, privacyUrl }: TermsAndPrivacyProps) {
  const theme = useTheme();
  const styles = useThemedStyles(getTermsAndPrivacyStyles);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');

  function openModal(url: string, title: string) {
    setCurrentUrl(url);
    setCurrentTitle(title);
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
  }

  useEffect(() => {
    if (modalVisible) {
      StatusBar.setBarStyle('light-content');
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('transparent');
        StatusBar.setTranslucent(true);
      }
    } else {
      StatusBar.setBarStyle('dark-content');
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('transparent');
        StatusBar.setTranslucent(false);
      }
    }
    return () => {
      StatusBar.setBarStyle('dark-content');
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('transparent');
        StatusBar.setTranslucent(false);
      }
    };
  }, [modalVisible]);

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
        {Platform.OS === 'android' && (
          <StatusBar backgroundColor="transparent" translucent barStyle="light-content" />
        )}

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
              document.body.style.backgroundColor = ${theme.colors.background};
              document.body.style.color = '${theme.colors.titleNormal}';
              true;
            `}
          />
        </View>
      </Modal>
    </View>
  );
}
