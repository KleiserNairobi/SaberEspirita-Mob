import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, ScrollView, View } from 'react-native';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import { Header } from '@/components/Header';
import { GradientContainer } from '@/components/GradientContainer';
import { BottomNavigation } from '@/components/BottomNavigation';
import { ProgressListItem } from '@/components/ProgressListItem';
import { ButtonFilterProgress } from '@/components/ButtonFilterProgress';
import { ButtonAction } from '@/components/ButtonAction';

import {
  BoxFlatListEmpty,
  CompletedQuizes,
  Container,
  ImageSearch,
  Subtitle,
  SubtitleFlatListEmpty,
  TitleFlatListEmpty,
  Wrapper,
} from './styles';
import { verticalScale } from 'react-native-size-matters';
import { IUserProgress } from '@/models/UsersProgress';
import { getUserProgress } from '@/services/firestore';
import { useAppStore } from '@/stores/useAppStore';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export function Progress() {
  const navigation = useNavigation();
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
      <BoxFlatListEmpty>
        <ImageSearch source={require('@/assets/images/Search/Search.png')} />
        <TitleFlatListEmpty>
          Você ainda não testou seus conhecimentos nesta categoria!
        </TitleFlatListEmpty>
        <SubtitleFlatListEmpty>Que tal começar agora?</SubtitleFlatListEmpty>
        <ButtonAction
          title="Acessar quizes"
          onPress={() => navigation.navigate('categories')}
          disabled={false}
        />
      </BoxFlatListEmpty>
    );
  }

  return (
    <GradientContainer>
      <Container>
        <Wrapper>
          <Header onPress={() => navigation.goBack()} title="Progresso" />
          {/* <Title>Progresso</Title> */}
          <Subtitle>Selecione uma categoria para conferir o seu progresso nos quizes</Subtitle>
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
              <CompletedQuizes>Quizes concluídos</CompletedQuizes>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ height: height - verticalScale(320) }}>
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
              <CompletedQuizes>Quizes concluídos</CompletedQuizes>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ height: height - verticalScale(320) }}>
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
        </Wrapper>
        <BottomNavigation />
      </Container>
    </GradientContainer>
  );
}
