import { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { GradientContainer } from '@/components/GradientContainer';
import { BottomNavigation } from '@/components/BottomNavigation';
import { SimpleProgressBar } from '@/components/SimpleProgressBar';
import { useTheme } from '@/hooks/useTheme';
import { useAppStore } from '@/hooks/useAppStore';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { PrivateStackParamList } from '@/routes/PrivateStack';
import { getHomeStyles } from './styles';

type CourseType = {
  id: string;
  title: string;
  subtitle: string;
  progress: number;
  color: string;
  image: any; // ImageSourcePropType
};

type LibraryItemType = {
  id: string;
  icon: string;
  title: string;
  badge?: string;
};

export function Home() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useThemedStyles(getHomeStyles);
  const navigation = useNavigation<NativeStackNavigationProp<PrivateStackParamList>>();
  const { user } = useAppStore();
  const backPressTimestamp = useRef(0);

  // Dados mockados para demonstração
  const [coursesInProgress] = useState<CourseType[]>([
    {
      id: '1',
      title: 'Curso Básico',
      subtitle: 'Fundamentos do Espiritismo',
      progress: 70,
      color: theme.colors.cardProgressPrimary,
      image: require('@/assets/images/Kardec/Kardec.png'), // Imagem existente
    },
    {
      id: '2',
      title: 'O Evangelho',
      subtitle: 'Segundo o Espiritismo',
      progress: 30,
      color: theme.colors.cardProgressSecondary,
      image: require('@/assets/images/Categories/Books.png'), // Usando Books.png como placeholder
    },
  ]);

  const [currentLesson] = useState({
    id: '1',
    title: 'Aula 4: Reencarnação',
    subtitle: 'Curso Básico',
  });

  const [libraryItems] = useState<LibraryItemType[]>([
    {
      id: '1',
      icon: '📚',
      title: 'Cursos',
    },
    {
      id: '2',
      icon: '📖',
      title: 'Conceitos',
    },
    {
      id: '3',
      icon: '🤔',
      title: 'Verdade ou Mentira?',
    },
    {
      id: '4',
      icon: '👨‍🏫',
      title: 'Pergunte ao Sr. Allan',
      badge: 'EM BREVE',
    },
  ]);

  function handleContinueCourse(courseId: string) {
    // Navegar para a tela do curso
    console.log('Continuar curso:', courseId);
  }

  function handleResumeLesson() {
    // Navegar para a aula atual
    console.log('Retomar aula:', currentLesson.id);
  }

  function handleLibraryItem(item: LibraryItemType) {
    if (item.id === '4') {
      // Item com badge "EM BREVE" - não faz nada
      return;
    }

    // Navegar para a funcionalidade correspondente
    console.log('Abrir:', item.title);
  }

  function handleSearch() {
    // Navegar para tela de busca
    navigation.navigate('categories'); // Placeholder
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

  useFocusEffect(
    useCallback(() => {
      // Recarregar dados quando a tela ganhar foco
      console.log('Home screen focused');
    }, [])
  );

  const renderCourseCard = ({ item }: { item: CourseType }) => (
    <View style={styles.courseCard}>
      <View style={styles.courseImageContainer}>
        <Image source={item.image} style={styles.courseImage} resizeMode="cover" />
      </View>
      <View style={styles.courseContent}>
        <Text style={styles.courseTitle}>{item.title}</Text>
        <Text style={styles.courseSubtitle}>{item.subtitle}</Text>
        <View style={styles.progressContainer}>
          <SimpleProgressBar
            progress={item.progress}
            color={item.color}
            backgroundColor={theme.colors.cardProgressBackground}
          />
          <Text style={styles.progressText}>{item.progress}% completo</Text>
        </View>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => handleContinueCourse(item.id)}>
          <Text style={styles.continueButtonText}>CONTINUAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderLibraryItem = ({ item }: { item: LibraryItemType }) => (
    <TouchableOpacity
      style={styles.libraryItem}
      onPress={() => handleLibraryItem(item)}
      disabled={item.badge === 'EM BREVE'}>
      <View style={styles.libraryIconContainer}>
        <Text style={styles.libraryIcon}>{item.icon}</Text>
      </View>
      <Text style={styles.libraryTitle}>{item.title}</Text>
      {item.badge && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.badge}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <GradientContainer>
      <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          {/* Cabeçalho */}
          <View style={styles.header}>
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Olá, {user?.displayName || 'Nairobi'}! 🌟</Text>
            </View>
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
              <Ionicons name="search" size={24} color={theme.colors.titleNormal} />
            </TouchableOpacity>
          </View>

          {/* Seção 1: EM ANDAMENTO */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Seus Cursos em Andamento</Text>
            <FlatList
              data={coursesInProgress}
              renderItem={renderCourseCard}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.coursesList}
            />
          </View>

          {/* Seção 2: CONTINUE DE ONDE PAROU */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Continue de Onde Parou</Text>
            <View style={styles.resumeCard}>
              <View style={styles.resumeContent}>
                <Text style={styles.resumeTitle}>{currentLesson.title}</Text>
                <Text style={styles.resumeSubtitle}>{currentLesson.subtitle}</Text>
              </View>
              <TouchableOpacity style={styles.resumeButton} onPress={handleResumeLesson}>
                <Text style={styles.resumeButtonText}>RETOMAR</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Seção 3: BIBLIOTECA */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Explore a Biblioteca</Text>
            <View style={styles.libraryGrid}>
              {libraryItems.map((item) => (
                <View key={item.id} style={styles.libraryItemWrapper}>
                  {renderLibraryItem({ item })}
                </View>
              ))}
            </View>
          </View>

          {/* Espaço extra para scroll */}
          <View style={styles.bottomSpacer} />
        </ScrollView>

        <BottomNavigation />
      </SafeAreaView>
    </GradientContainer>
  );
}
