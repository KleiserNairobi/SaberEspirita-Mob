import { useCallback, useEffect, useRef, useState } from 'react';
import {
  BackHandler,
  FlatList,
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useFocusEffect } from '@react-navigation/native';
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
import { IUserCompletedSubcategory } from '@/models/UsersCompletedSubcategories';
import { messages } from '@/assets/messages';
import { DailyMessage } from '@/components/DailyMessage';

function getDailyMessage() {
  const today = new Date();
  const idx = today.getDate() % messages.length;
  return messages[idx];
}

export function Categories() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useThemedStyles(getCategoriesStyles);
  const queryClient = useQueryClient();
  const navigation = useNavigation<NativeStackNavigationProp<PrivateStackParamList>>();
  const { user } = useAppStore();
  const [categoriesWithCompletion, setCategoriesWithCompletion] = useState<ICategory[]>([]);
  const backPressTimestamp = useRef(0);
  const message = getDailyMessage();

  const { data: categories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const {
    data: completed = {
      userId: user?.uid || '',
      completedSubcategories: {},
      totalCompleted: 0,
    },
    isLoading: isLoadingCompleted,
  } = useQuery<IUserCompletedSubcategory>({
    queryKey: ['completedSubcategories', user?.uid],
    queryFn: () => {
      if (!user?.uid) {
        return Promise.resolve({
          userId: '',
          completedSubcategories: {},
          totalCompleted: 0,
        });
      }
      return getUserCompletedSubcategories(user.uid);
    },
    enabled: !!user?.uid,
  });

  function goToSubcategories(id: string, title: string, description: string) {
    navigation.navigate('subcategories', {
      idCategory: id,
      titleCategory: title,
      description: description,
    });
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (!navigation.isFocused()) return false;
      const currentTime = new Date().getTime();
      const timeDiff = currentTime - backPressTimestamp.current;
      const DOUBLE_PRESS_DELAY = 2000;
      if (timeDiff < DOUBLE_PRESS_DELAY) {
        BackHandler.exitApp();
        return true;
      } else {
        backPressTimestamp.current = currentTime;
        ToastAndroid.show('Pressione novamente para sair', ToastAndroid.SHORT);
        return true;
      }
    });
    return () => {
      backHandler.remove();
    };
  }, [navigation]);

  useEffect(() => {
    if (categories.length > 0 && completed && completed.completedSubcategories) {
      const updated = categories.map((category) => {
        const completedCount = completed.completedSubcategories[category.id]?.length || 0;
        const percentage =
          category.subcategoryCount > 0
            ? Math.round((completedCount / category.subcategoryCount) * 100)
            : 0;
        return { ...category, percentage };
      });
      setCategoriesWithCompletion(updated);
    }
  }, [categories, completed]);

  useFocusEffect(
    useCallback(() => {
      if (user?.uid) {
        queryClient.invalidateQueries({
          queryKey: ['completedSubcategories', user.uid],
        });
      }
    }, [user?.uid])
  );

  return (
    <GradientContainer>
      <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
        <View style={styles.greetingBox}>
          <Text style={styles.greeting}>Oi, {user?.displayName || 'amigo(a)'}!</Text>
        </View>
        {/* <Text style={styles.title}>Escolha uma categoria para começar</Text> */}

        <DailyMessage title="✨ Mensagem do Dia" content={message} />

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
