import React from 'react';
import { View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ButtonNavigation } from '@/components/ButtonNavigation';
import { getBottomNavigationStyles } from './styles';
import { useThemedStyles } from '@/hooks/useThemedStyles';

export function BottomNavigation() {
  const route = useRoute();
  const navigation = useNavigation();
  const screen = route.name;
  const styles = useThemedStyles(getBottomNavigationStyles);

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
