import { View, Text, Button } from 'react-native';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useAppStore } from '@/hooks/useAppStore';
import { getHomeStyles } from './styles';

export const Home = () => {
  const styles = useThemedStyles(getHomeStyles);
  const toggleTheme = useAppStore((state) => state.toggleTheme);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Olá, mundo com tema!</Text>
      <Button title="Alternar Tema" onPress={toggleTheme} />
    </View>
  );
};
