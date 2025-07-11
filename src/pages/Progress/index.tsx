import { useEffect, useState } from 'react';
import { Dimensions, FlatList, ScrollView, View, Text, Image, SafeAreaView } from 'react-native';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import { Header } from '@/components/Header';
import { GradientContainer } from '@/components/GradientContainer';
import { BottomNavigation } from '@/components/BottomNavigation';
import { ProgressListItem } from '@/components/ProgressListItem';
import { ButtonFilterProgress } from '@/components/ButtonFilterProgress';
import { ButtonAction } from '@/components/ButtonAction';
// import { useTheme } from '@/hooks/useTheme';
import { styles } from './styles';
import { IUserProgress } from '@/models/UsersProgress';
import { getUserProgress } from '@/services/firestore';
import { useAppStore } from '@/hooks/useAppStore';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export function Progress() {
  const navigation = useNavigation();
  // const theme = useTheme();
  const { user } = useAppStore();
  const [userProgress, setUserProgress] = useState<IUserProgress[]>([]);
  const [filterData, setFilterData] = useState<IUserProgress[]>([]);
  const [filterTitle, setFilterTitle] = useState('Todos');
  const { height } = Dimensions.get('window');

  const categories = [
    { id: 0, title: 'Todos' },
    { id: 1, title: 'Conceitos' },
    { id: 2, title: 'Personagens' },
    { id: 3, title: 'Livros' },
    { id: 4, title: 'Filmes' },
    { id: 5, title: 'Espíritos' },
    { id: 6, title: 'Diversos' },
  ];

  async function fetchUserProgress(userId: string) {
    const response = await getUserProgress(userId);
    setUserProgress(response);
  }

  function getFormatedDateTime(dateTime: FirebaseFirestoreTypes.Timestamp): string {
    const dataHora = dateTime.toDate();
    return format(dataHora, 'dd/MM/yyyy HH:mm');
  }

  function filterDataByTitle(title: string) {
    const filtered = userProgress.filter((item) => item.title === title);
    setFilterData(filtered);
    setFilterTitle(title);
  }

  useEffect(() => {
    if (user?.uid) {
      fetchUserProgress(user.uid);
    }
  }, [user?.uid]);

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
      <SafeAreaView style={styles.container}>
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
              <View style={{ height: 40, marginBottom: 20 }}>
                <ButtonFilterProgress
                  active={filterTitle === item.title}
                  title={item.title}
                  onPress={() => filterDataByTitle(item.title)}
                />
              </View>
            )}
          />
          {userProgress.length > 0 && filterTitle === 'Todos' ? (
            <>
              <Text style={styles.completedQuizes}>Quizes concluídos</Text>
              <ScrollView showsVerticalScrollIndicator={false} style={{ height: height - 320 }}>
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
            </>
          ) : userProgress.length === 0 && filterTitle === 'Todos' ? (
            flatListEmpty()
          ) : filterData.length > 0 && filterTitle !== 'Todos' ? (
            <>
              <Text style={styles.completedQuizes}>Quizes concluídos</Text>
              <ScrollView showsVerticalScrollIndicator={false} style={{ height: height - 320 }}>
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
