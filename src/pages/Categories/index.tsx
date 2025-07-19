import { useEffect, useState } from 'react';
import { BackHandler, FlatList, View, Text, SafeAreaView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CardCategory } from '@/components/CardCategory';
import { GradientContainer } from '@/components/GradientContainer';
import { BottomNavigation } from '@/components/BottomNavigation';
import { useTheme } from '@/hooks/useTheme';
import { useAppStore } from '@/hooks/useAppStore';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { ICategory } from '@/models/Categories';
import { getCategories, getUserCompletedSubcategories } from '@/services/firestore';
import { PrivateStackParamList } from '@/routes/PrivateStack';
import { getCategoriesStyles } from './styles';

export function Categories() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useThemedStyles(getCategoriesStyles);
  const navigation = useNavigation<NativeStackNavigationProp<PrivateStackParamList>>();
  const { user } = useAppStore();
  const [categoriesWithCompletion, setCategoriesWithCompletion] = useState<ICategory[]>([]);

  const { data: categories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const { data: completed, isLoading: isLoadingCompleted } = useQuery({
    queryKey: ['completedSubcategories', user?.uid],
    queryFn: () => getUserCompletedSubcategories(user!.uid),
    enabled: !!user?.uid,
  });

  function goToSubcategories(id: string, title: string, description: string) {
    navigation.navigate('subcategories', {
      idCategory: id,
      titleCategory: title,
      description: description,
    });
  }

  // 1 - Adicionando subscrição
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (navigation.isFocused()) {
        return true;
      }
      return false;
    });
    return () => {
      backHandler.remove();
    };
  }, [navigation]);

  // 2 - Atualizando porcentagem de subcategorias completadas
  useEffect(() => {
    if (categories.length > 0 && completed) {
      const updated = categories.map((category) => {
        const completedCount = completed.completedSubcategories?.[category.id]?.length || 0;
        const percentage =
          category.subcategoryCount > 0
            ? Math.round((completedCount / category.subcategoryCount) * 100)
            : 0;
        return { ...category, percentage };
      });
      setCategoriesWithCompletion(updated);
    }
  }, [categories, completed]);

  return (
    <GradientContainer>
      <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
        <View style={styles.greetingBox}>
          <Text style={styles.greeting}>Oi, {user?.displayName || 'amigo(a)'}!</Text>
        </View>
        <Text style={styles.title}>Escolha uma categoria para começar</Text>
        <Text style={styles.category}>Categorias</Text>

        {isLoadingCategories || isLoadingCompleted ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={styles.titleLoading}>Carregando...</Text>
          </View>
        ) : (
          <FlatList
            data={categoriesWithCompletion}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <CardCategory
                title={item.title}
                subtitle={`${item.quizCount.toString()} questões`}
                percentage={item.percentage}
                imageBackground={item.imageBackground}
                onPress={() => goToSubcategories(item.id, item.title ?? '', item.description ?? '')}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingTop: 10,
              paddingBottom: 200 + insets.bottom,
              paddingHorizontal: 24,
            }}
          />
        )}
        <BottomNavigation />
      </SafeAreaView>
    </GradientContainer>
  );
}
