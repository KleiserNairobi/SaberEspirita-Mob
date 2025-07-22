import { View, Text, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GradientContainer } from '@/components/GradientContainer';
import { Header } from '@/components/Header';
import { BottomNavigation } from '@/components/BottomNavigation';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { getScoreStyles } from './styles';

export function Score() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const styles = useThemedStyles(getScoreStyles);
  return (
    <GradientContainer>
      <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
        <View style={styles.wrapper}>
          <Header title="Placar" onPress={() => navigation.goBack()} />

          <Text>Score</Text>
        </View>
        <BottomNavigation />
      </SafeAreaView>
    </GradientContainer>
  );
}
