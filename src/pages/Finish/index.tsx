import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ImageStyle } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GradientContainer } from '@/components/GradientContainer';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { getFinishStyles } from './styles';
import FourStars from '@/assets/images/Stars/FourStars.png';
import ThreeStars from '@/assets/images/Stars/ThreeStars.png';
import TwoStars from '@/assets/images/Stars/TwoStars.png';
import OneStar from '@/assets/images/Stars/OneStar.png';
import { PrivateStackParamList } from '@/routes/PrivateStack';

type FinishRouteProp = RouteProp<PrivateStackParamList, 'finish'>;

export function Finish() {
  const route = useRoute<FinishRouteProp>();
  const styles = useThemedStyles(getFinishStyles);
  const navigation = useNavigation<NativeStackNavigationProp<PrivateStackParamList>>();
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
  } = route.params;

  function getPerformanceMessage(percentage: number): any {
    // Parabéns, querido estudante!
    let title = `O verdadeiro prêmio\n é o conhecimento.`;
    let message = `Revise as explicações para\n consolidar seu aprendizado.`;
    if (percentage >= 90) {
      return {
        image: FourStars,
        title: title,
        message: message,
        // "Seu entendimento é brilhante! Revisite as explicações para solidificar ainda mais este conhecimento e adicioná-lo à sua biblioteca."
      };
    } else if (percentage >= 70) {
      return {
        image: ThreeStars,
        title: title,
        message: message,
        // "Bom trabalho! Aproveite para revisar os detalhes e salvar os conceitos mais importantes na sua biblioteca para estudo futuro."
      };
    } else if (percentage >= 50) {
      return {
        image: TwoStars,
        title: title,
        message: message,
        // Ótimo exercício de aprendizado! Esta é uma oportunidade perfeita para estudar as explicações e enriquecer sua biblioteca pessoal."
      };
    } else {
      return {
        image: OneStar,
        title: title,
        message: message,
        // "A jornada do conhecimento começa com um passo. Explore as explicações doutrinárias - cada uma que você salvar é um tesouro para sua evolução."
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
          <Image
            source={pathImage}
            style={styles.starsAndBooks as ImageStyle}
            resizeMode="stretch"
          />
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
        <Text style={styles.titleExplanation}>
          Você desbloqueou {totalQuestions} explicações doutrinárias
        </Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>

        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => navigation.navigate('categories')}>
          <Text style={styles.titleButtonSecondary}>Continuar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonPrimary} onPress={goToFeedback}>
          <Text style={styles.titleButtonPrimary}>Revisar e Aprender</Text>
        </TouchableOpacity>
      </View>
    </GradientContainer>
  );
}
