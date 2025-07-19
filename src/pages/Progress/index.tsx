import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FlatList, ScrollView, View, Text, Image, SafeAreaView } from 'react-native';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import { Header } from '@/components/Header';
import { GradientContainer } from '@/components/GradientContainer';
import { BottomNavigation } from '@/components/BottomNavigation';
import { ProgressListItem } from '@/components/ProgressListItem';
import { ButtonFilterProgress } from '@/components/ButtonFilterProgress';
import { ButtonAction } from '@/components/ButtonAction';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { getProgressStyles } from './styles';
import { IUserProgress } from '@/models/UsersProgress';
import { getUserProgress } from '@/services/firestore';
import { useAppStore } from '@/hooks/useAppStore';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PrivateStackParamList } from '@/routes/PrivateStack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function Progress() {
  const styles = useThemedStyles(getProgressStyles);
  const insets = useSafeAreaInsets();
  const { user } = useAppStore();
  const navigation = useNavigation<NativeStackNavigationProp<PrivateStackParamList>>();
  const [filterData, setFilterData] = useState<IUserProgress[]>([]);
  const [filterTitle, setFilterTitle] = useState('Todos');

  const categories = [
    { id: 0, title: 'Todos' },
    { id: 1, title: 'Conceitos' },
    { id: 2, title: 'Personagens' },
    { id: 3, title: 'Livros' },
    { id: 4, title: 'Filmes' },
    { id: 5, title: 'Espíritos' },
    { id: 6, title: 'Diversos' },
  ];

  const {
    data: userProgress,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['userProgress', user?.uid],
    queryFn: () => getUserProgress(user?.uid || ''),
    enabled: !!user?.uid,
  });

  function getFormatedDateTime(dateTime: FirebaseFirestoreTypes.Timestamp): string {
    const dataHora = dateTime.toDate();
    return format(dataHora, 'dd/MM/yyyy HH:mm');
  }

  function filterDataByTitle(title: string) {
    const filtered = userProgress?.filter((item) => item.title === title) || [];
    setFilterData(filtered);
    setFilterTitle(title);
  }

  function flatListEmpty() {
    return (
      <View style={styles.boxFlatListEmpty}>
        <Image source={require('@/assets/images/Search/Search.png')} style={styles.imageSearch} />
        <Text style={styles.titleFlatListEmpty}>
          Você ainda não testou seus conhecimentos nesta categoria!
        </Text>
        <Text style={styles.subtitleFlatListEmpty}>Que tal começar agora?</Text>
        <ButtonAction
          title="Acessar quizes"
          onPress={() => navigation.navigate('categories')}
          disabled={false}
        />
      </View>
    );
  }

  return (
    <GradientContainer>
      <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
        <View style={styles.wrapper}>
          <Header onPress={() => navigation.goBack()} title="Progresso" />
          <Text style={styles.subtitle}>
            Selecione uma categoria para conferir o seu progresso nos quizes
          </Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={{ height: 40, marginBottom: 25 }}>
                <ButtonFilterProgress
                  active={filterTitle === item.title}
                  title={item.title}
                  onPress={() => filterDataByTitle(item.title)}
                />
              </View>
            )}
          />
          {!isLoading &&
          !error &&
          userProgress &&
          userProgress.length > 0 &&
          filterTitle === 'Todos' ? (
            <>
              <Text style={styles.completedQuizes}>Quizes concluídos</Text>
              <View style={{ height: 500, overflow: 'hidden', paddingBottom: 50 }}>
                <ScrollView showsVerticalScrollIndicator={false} style={{ flexGrow: 1 }}>
                  {userProgress.map((item) => (
                    <ProgressListItem
                      key={item.subcategoryId}
                      title={item.subtitle}
                      dateTime={getFormatedDateTime(item.completedAt)}
                      level={item.level}
                      percentage={item.percentage.toString() + '%'}
                    />
                  ))}
                </ScrollView>
              </View>
            </>
          ) : !isLoading &&
            !error &&
            (!userProgress || userProgress.length === 0) &&
            filterTitle === 'Todos' ? (
            flatListEmpty()
          ) : filterData.length > 0 && filterTitle !== 'Todos' ? (
            <>
              <Text style={styles.completedQuizes}>Quizes concluídos</Text>
              <View style={{ height: 500, overflow: 'hidden', paddingBottom: 50 }}>
                <ScrollView showsVerticalScrollIndicator={false} style={{ flexGrow: 1 }}>
                  {filterData.map((item) => (
                    <ProgressListItem
                      key={item.subcategoryId}
                      title={item.subtitle}
                      dateTime={getFormatedDateTime(item.completedAt)}
                      level={item.level}
                      percentage={item.percentage.toString() + '%'}
                    />
                  ))}
                </ScrollView>
              </View>
            </>
          ) : (
            flatListEmpty()
          )}
        </View>
        <BottomNavigation />
      </SafeAreaView>
    </GradientContainer>
  );
}
