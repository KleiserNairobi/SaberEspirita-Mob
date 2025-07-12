import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GradientContainer } from '@/components/GradientContainer';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { IUserAnswer } from '@/models/UserAnswer';
import { getFinishStyles } from './styles';

import FourStars from '@/assets/images/Stars/FourStars.png';
import ThreeStars from '@/assets/images/Stars/ThreeStars.png';
import TwoStars from '@/assets/images/Stars/TwoStars.png';
import OneStar from '@/assets/images/Stars/OneStar.png';

type RouteParams = {
  titleCategory: string;
  titleSubcategory: string;
  points: number;
  totalQuestions: number;
  percentage: number;
  level: string;
  userAnswers: IUserAnswer[];
};

type RootStackParamList = {
  answers: {
    titleCategory: string;
    titleSubcategory: string;
    points: number;
    totalQuestions: number;
    percentage: number;
    level: string;
    userAnswers: IUserAnswer[];
  };
  categories: undefined;
};

export function Finish() {
  const route = useRoute();
  const styles = useThemedStyles(getFinishStyles);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [title, setTitle] = useState('');
  const [pathImage, setPathImage] = useState<any>(null);
  const [message, setMessage] = useState('');
  const {
    titleCategory,
    titleSubcategory,
    points,
    totalQuestions,
    percentage,
    level,
    userAnswers,
  } = route.params as RouteParams;

  function getPerformanceMessage(percentage: number): any {
    if (percentage >= 90) {
      return {
        image: FourStars,
        title: 'Parabéns, querido estudante!',
        message:
          'Seu desempenho foi verdadeiramente notável, refletindo o brilho da luz do conhecimento. Continue aprofundando seus estudos, pois a jornada do entendimento espiritual é infinita e recompensadora.',
      };
    } else if (percentage >= 70) {
      return {
        image: ThreeStars,
        title: 'Muito bem, caro amigo do conhecimento espiritual!',
        message:
          'Seu desempenho foi admirável, demonstrando dedicação e empenho. Continue seguindo adiante, pois cada passo no aprendizado espiritual nos aproxima da verdade.',
      };
    } else if (percentage >= 50) {
      return {
        image: TwoStars,
        title: 'Seu esforço é louvável, nobre buscador da verdade!',
        message:
          'Seu desempenho foi razoável, e como diria, "Perseverança é a chave". Continue estudando e refletindo, pois a jornada espiritual é trilhada com paciência e determinação.',
      };
    } else {
      return {
        image: OneStar,
        title: 'Não se deixe abater, querido aprendiz!',
        message:
          'O conhecimento espiritual é como um rio que flui constantemente. Seu desempenho pode não ter sido o desejado, mas lembre-se de que cada passo em direção à luz é valioso. Continue estudando e buscando a compreensão.',
      };
    }
  }

  function goToFeedback() {
    navigation.navigate('answers', {
      titleCategory,
      titleSubcategory,
      points,
      totalQuestions,
      percentage,
      level,
      userAnswers,
    });
  }

  useEffect(() => {
    const { title, image, message } = getPerformanceMessage(percentage);
    setPathImage(image);
    setMessage(message);
    setTitle(title);
  }, [percentage]);

  return (
    <GradientContainer>
      <View style={styles.container}>
        {pathImage && (
          <Image source={pathImage} style={styles.starsAndBooks} resizeMode="stretch" />
        )}
        <Text style={styles.subcategory}>{titleSubcategory}</Text>
        <Text style={styles.category}>{titleCategory}</Text>
        <View style={styles.boxRow}>
          <View style={styles.boxColumn}>
            <Text style={styles.points}>
              {points} / {totalQuestions}
            </Text>
            <Text style={styles.titlePoints}>Questões corretas</Text>
          </View>
          <View style={styles.boxColumn}>
            <Text style={styles.points}>{percentage}%</Text>
            <Text style={styles.titlePoints}>Percentual de acertos</Text>
          </View>
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.boxButton}>
          <TouchableOpacity
            style={styles.buttonSecondary}
            onPress={() => navigation.navigate('categories')}>
            <Text style={styles.titleButtonSecondary}>Continuar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonPrimary} onPress={goToFeedback}>
            <Text style={styles.titleButtonPrimary}>Respostas</Text>
          </TouchableOpacity>
        </View>
      </View>
    </GradientContainer>
  );
}
