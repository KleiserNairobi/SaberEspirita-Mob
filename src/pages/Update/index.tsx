import { View, Text, Modal, TouchableOpacity, Linking, Platform } from 'react-native';
import { styles } from './styles';

type UpdateModalProps = {
  visible: boolean;
  critical?: boolean;
  message?:
    | {
        title?: string;
        body?: string;
        button_text?: string;
      }
    | string;
  updateUrl?: string;
  onClose: () => void;
  maintenance?: boolean;
};

export function Update({
  visible,
  critical,
  message,
  updateUrl,
  onClose,
  maintenance,
}: UpdateModalProps) {
  const handleUpdate = () => {
    if (updateUrl) {
      // Para iOS, usar schema itms-apps:// para melhor experiência
      // No Android, manter https://play.google.com/
      let urlToOpen = updateUrl;

      if (Platform.OS === 'ios') {
        // Converter URL da App Store para schema itms-apps://
        urlToOpen = updateUrl.replace('https://apps.apple.com/', 'itms-apps://apps.apple.com/');
      }

      Linking.openURL(urlToOpen).catch(() => {
        // Fallback para URL original se o schema personalizado falhar
        if (urlToOpen !== updateUrl) {
          Linking.openURL(updateUrl);
        }
      });
    }
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={critical ? undefined : onClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>
            {maintenance
              ? 'Manutenção em Andamento'
              : typeof message === 'object' && message !== null
                ? message.title || 'Atualização Disponível'
                : 'Atualização Disponível'}
          </Text>
          <Text style={styles.body}>
            {maintenance
              ? typeof message === 'string'
                ? message
                : ''
              : typeof message === 'object' && message !== null
                ? message.body || 'Uma nova versão do aplicativo está disponível.'
                : 'Uma nova versão do aplicativo está disponível.'}
          </Text>
          <View style={styles.buttonsContainer}>
            {!critical && !maintenance && (
              <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={onClose}>
                <Text style={styles.secondaryButtonText}>Depois</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
              <Text style={styles.buttonText}>
                {maintenance
                  ? 'Entendido'
                  : typeof message === 'object' && message !== null
                    ? message.button_text || 'Atualizar Agora'
                    : 'Atualizar Agora'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
