import { useCallback, useEffect, useState } from 'react';
import { BackHandler, FlatList, View, Text, SafeAreaView } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CardCategory } from '@/components/CardCategory';
import { GradientContainer } from '@/components/GradientContainer';
import { BottomNavigation } from '@/components/BottomNavigation';
import { useAppStore } from '@/hooks/useAppStore';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { ICategory } from '@/models/Categories';
import { IUserCompletedSubcategory } from '@/models/UsersCompletedSubcategories';
import { getCategories, getUserCompletedSubcategories } from '@/services/firestore';
import { getCategoriesStyles } from './styles';

type RootStackParamList = {
  subcategories: {
    idCategory: string;
    titleCategory: string;
    description: string;
  };
};

export function Categories() {
  const styles = useThemedStyles(getCategoriesStyles);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user } = useAppStore();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [completed, setCompleted] = useState<IUserCompletedSubcategory | null>();
  const [categoriesWithCompletion, setCategoriesWithCompletion] = useState<ICategory[]>([]);

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

  // 2 - Buscando categorias
  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    };
    fetchCategories();
  }, []);

  // 3 - Buscando subcategorias completadas
  useFocusEffect(
    useCallback(() => {
      const fetchCompletedSubcategories = async () => {
        if (user?.uid) {
          const data = await getUserCompletedSubcategories(user.uid);
          setCompleted(data);
        }
      };
      fetchCompletedSubcategories();
    }, [user])
  );

  // 4 - Atualizando porcentagem de subcategorias completadas
  useEffect(() => {
    if (categories.length > 0) {
      const updatedCategories = categories.map((category) => {
        const completedCount = completed?.completedSubcategories?.[category.id]?.length || 0;
        const percentage =
          category.subcategoryCount > 0
            ? Math.round((completedCount / category.subcategoryCount) * 100)
            : 0;
        return { ...category, percentage };
      });
      setCategoriesWithCompletion(updatedCategories);
    }
  }, [completed, categories]);

  return (
    <GradientContainer>
      <SafeAreaView style={styles.container}>
        <View style={styles.greetingBox}>
          <Text style={styles.greeting}>Oi, {user?.displayName || 'amigo(a)'}!</Text>
        </View>
        <Text style={styles.title}>Escolha uma categoria para começar</Text>
        <Text style={styles.category}>Categorias</Text>
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
            paddingBottom: 200,
            paddingHorizontal: 24,
          }}
        />
        <BottomNavigation />
      </SafeAreaView>
    </GradientContainer>
  );
}
