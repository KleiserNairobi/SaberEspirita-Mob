import React, {useCallback, useEffect, useState} from 'react';
import {BackHandler, FlatList} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {verticalScale} from 'react-native-size-matters';
import {CardCategory} from '@components/CardCategory';
import {GradientContainer} from '@components/GradientContainer';
import {BottomNavigation} from '@components/BottomNavigation';
import {Category, Container, GreetingBox, Greeting, Title} from './styles';
import {useAppStore} from '@stores/useAppStore';
import {ICategory} from '@models/Categories';
import {IUserCompletedSubcategory} from '@models/UsersCompletedSubcategories';
import {
  getCategories,
  getUserCompletedSubcategories,
} from '@services/firestore';

export function Categories() {
  const navigation = useNavigation();
  const {user} = useAppStore();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [completed, setCompleted] =
    useState<IUserCompletedSubcategory | null>();
  const [categoriesWithCompletion, setCategoriesWithCompletion] = useState<
    ICategory[]
  >([]);

  function goToSubcategories(id: string, title: string, description: string) {
    navigation.navigate('subcategories', {
      idCategory: id,
      titleCategory: title,
      description: description,
    });
  }

  // 1 - Adicionando subscrição
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (navigation.isFocused()) {
          return true;
        }
        return false;
      },
    );
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
    }, [user]),
  );

  // 4 - Atualizando porcentagem de subcategorias completadas
  useEffect(() => {
    if (categories.length > 0) {
      const updatedCategories = categories.map(category => {
        const completedCount =
          completed?.completedSubcategories?.[category.id]?.length || 0;
        const percentage =
          category.subcategoryCount > 0
            ? Math.round((completedCount / category.subcategoryCount) * 100)
            : 0;
        return {...category, percentage};
      });
      setCategoriesWithCompletion(updatedCategories);
    }
  }, [completed, categories]);

  return (
    <GradientContainer>
      <Container>
        <GreetingBox>
          <Greeting>Oi, {user?.displayName || 'amigo(a)'}!</Greeting>
        </GreetingBox>
        <Title>Escolha uma categoria para começar</Title>
        <Category>Categorias</Category>
        <FlatList
          data={categoriesWithCompletion}
          numColumns={2}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <CardCategory
              title={item.title}
              subtitle={`${item.quizCount.toString()} questões`}
              percentage={item.percentage}
              imageBackground={item.imageBackground}
              onPress={() =>
                goToSubcategories(
                  item.id,
                  item.title ?? '',
                  item.description ?? '',
                )
              }
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: verticalScale(10),
            paddingBottom: verticalScale(200),
            paddingHorizontal: 24,
          }}
        />
        <BottomNavigation />
      </Container>
    </GradientContainer>
  );
}
