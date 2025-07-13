import { View, ViewStyle } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ButtonNavigation } from '@/components/ButtonNavigation';
import { getBottomNavigationStyles } from './styles';
import { useThemedStyles } from '@/hooks/useThemedStyles';

export function BottomNavigation() {
  const route = useRoute();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const screen = route.name;
  const baseStyles = useThemedStyles(getBottomNavigationStyles);

  // Converter altura para número e garantir um valor padrão
  const baseHeight =
    typeof baseStyles.container.height === 'number' ? baseStyles.container.height : 60;

  // Definir os estilos com tipagem explícita
  const styles: { container: ViewStyle } = {
    container: {
      ...baseStyles.container,
      height: baseHeight + insets.bottom,
      paddingBottom: insets.bottom,
    },
  };

  return (
    <View style={styles.container}>
      <ButtonNavigation
        active={screen === 'categories'}
        title="Início"
        iconName={screen === 'categories' ? 'home-3-fill' : 'home-3-line'}
        iconSize={26}
        onPress={() => navigation.navigate('categories')}
      />
      <ButtonNavigation
        active={screen === 'progress'}
        title="Progresso"
        iconName={screen === 'progress' ? 'trophy-fill' : 'trophy-line'}
        iconSize={26}
        onPress={() => navigation.navigate('progress')}
      />
      <ButtonNavigation
        active={screen === 'menu'}
        title="Mais"
        iconName={screen === 'menu' ? 'more-fill' : 'more-line'}
        iconSize={26}
        onPress={() => navigation.navigate('menu')}
      />
    </View>
  );
}
