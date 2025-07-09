import { View, Text, TouchableOpacity } from 'react-native';
import Icon, { IconName } from 'react-native-remix-icon';
import { scale } from 'react-native-size-matters';
import { MessageType } from '@/models/Utils';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useTheme } from '@/hooks/useTheme';
import { getBottomSheetMessageStyles } from './styles';

type Props = {
  type: MessageType;
  title: string;
  subtitle: string;
  titleButtonPrimary?: string;
  titleButtonSecondary?: string;
  onPressPrimary: () => void;
  onPressSecondary?: () => void;
};

export function BottomSheetMessage({
  type,
  title,
  subtitle,
  titleButtonPrimary,
  titleButtonSecondary,
  onPressPrimary,
  onPressSecondary,
}: Props) {
  const theme = useTheme();
  const styles = useThemedStyles(getBottomSheetMessageStyles);

  const getIconProps = () => {
    switch (type) {
      case 'error':
        return { name: 'close-circle-fill' as IconName, color: theme.colors.primary };
      case 'success':
        return { name: 'checkbox-circle-fill' as IconName, color: theme.colors.primary };
      case 'information':
        return { name: 'error-warning-fill' as IconName, color: theme.colors.primary };
      case 'question':
        return { name: 'question-fill' as IconName, color: theme.colors.primary };
      default:
        return { name: 'information-fill' as IconName, color: theme.colors.primary };
    }
  };

  const iconProps = getIconProps();

  return (
    <View style={styles.container}>
      {type && <Icon name={iconProps.name} size={scale(40)} color={iconProps.color} />}

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>

      <View style={styles.boxButton}>
        {onPressSecondary && (
          <TouchableOpacity style={styles.buttonSecondary} onPress={onPressSecondary}>
            <Text style={styles.titleButtonSecondary}>
              {titleButtonSecondary ? titleButtonSecondary : 'Não'}
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.buttonPrimary} onPress={onPressPrimary}>
          <Text style={styles.titleButtonPrimary}>
            {titleButtonPrimary ? titleButtonPrimary : 'Sim'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
