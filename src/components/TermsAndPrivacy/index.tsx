import { useState } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { getTermsAndPrivacyStyles } from './styles';

type TermsAndPrivacyProps = {
  termsUrl: string;
  privacyUrl: string;
};

export function TermsAndPrivacy({ termsUrl, privacyUrl }: TermsAndPrivacyProps) {
  const styles = useThemedStyles(getTermsAndPrivacyStyles);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  function openModal(url: string) {
    setCurrentUrl(url);
    setModalVisible(true);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Ao continuar, você concorda com nossos{' '}
        <Text style={styles.link} onPress={() => openModal(termsUrl)}>
          Termos de Uso
        </Text>{' '}
        e nossa{' '}
        <Text style={styles.link} onPress={() => openModal(privacyUrl)}>
          Política de Privacidade
        </Text>
        .
      </Text>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
          <WebView source={{ uri: currentUrl }} style={styles.webview} />
        </View>
      </Modal>
    </View>
  );
}
