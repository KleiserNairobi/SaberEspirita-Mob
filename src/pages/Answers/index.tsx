import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-remix-icon';
import { GradientContainer } from '@/components/GradientContainer';
import { IUserAnswer } from '@/models/UserAnswer';
import { Header } from '@/components/Header';
import { ButtonAction } from '@/components/ButtonAction';
import { useTheme } from '@/hooks/useTheme';
import { useThemedStylesProps } from '@/hooks/useThemedStyles';
import { getAnswersStyles } from './styles';

type RootStackParamList = {
  categories: undefined;
  answers: RouteParams;
};

type RouteParams = {
  titleCategory: string;
  titleSubcategory: string;
  points: number;
  totalQuestions: number;
  percentage: number;
  level: string;
  userAnswers: IUserAnswer[];
};

export function Answers() {
  const route = useRoute();
  const theme = useTheme();
  const styles = useThemedStylesProps(getAnswersStyles, { isCorrect: false });
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { titleCategory, titleSubcategory, totalQuestions, percentage, level, userAnswers } =
    route.params as RouteParams;

  let filledCount = 0;

  switch (level) {
    case 'Fraco':
      filledCount = 1;
      break;
    case 'Regular':
      filledCount = 2;
      break;
    case 'Bom':
      filledCount = 3;
      break;
    case 'Ótimo':
      filledCount = 4;
      break;
    default:
      filledCount = 1;
  }

  const renderStars = (filledCount: number) => {
    const stars = [];
    for (let i = 0; i < 4; i++) {
      const filled = i < filledCount;
      stars.push(
        <Icon
          key={i}
          size={16}
          name="star-fill"
          color={filled ? theme.colors.accented : theme.colors.cardQuizBorder}
        />
      );
    }
    return stars;
  };

  return (
    <GradientContainer>
      <SafeAreaView style={styles.container}>
        <Header title="Revisão das respostas" onPress={() => navigation.goBack()} />

        <View style={styles.boxRowHeader}>
          <View style={styles.boxColumnLeft}>
            <Text style={styles.title}>{titleSubcategory}</Text>
            <Text style={styles.subtitle}>{titleCategory}</Text>
            <Text style={styles.quizCount}>{`${totalQuestions} questões`}</Text>
          </View>
          <View style={styles.boxColumnCenter}>
            <Text style={styles.percentage}>{percentage}%</Text>
            <Text style={styles.textPercentage}>de acertos</Text>
            <View style={styles.boxStar}>{renderStars(filledCount)}</View>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 20, paddingBottom: 30 }}>
          {userAnswers.map((answer, index) => {
            const isCorrect = answer.selectedAnswerIndex === answer.correctAnswerIndex;
            const questionStyles = useThemedStylesProps(getAnswersStyles, { isCorrect });
            return (
              <View key={index} style={questionStyles.questionBox}>
                <View style={styles.boxRow}>
                  <Text style={styles.questionIndex}>Questão {index + 1}</Text>
                  <View style={styles.boxTitleResult}>
                    {isCorrect ? (
                      <View style={styles.boxTitleCorrect}>
                        <Icon
                          name="checkbox-circle-line"
                          color={theme.colors.titleNormal}
                          size={16}
                        />
                        <Text style={styles.titleCorrect}>certo</Text>
                      </View>
                    ) : (
                      <View style={styles.boxTitleIncorrect}>
                        <Icon name="close-circle-line" color={theme.colors.titleNormal} size={16} />
                        <Text style={styles.titleIncorrect}>errado</Text>
                      </View>
                    )}
                  </View>
                </View>

                <Text style={styles.questionText}>{answer.question}</Text>

                <View style={styles.answerBlock}>
                  <Text style={styles.label}>Sua resposta:</Text>
                  <Text style={questionStyles.userAnswerText}>
                    {answer.selectedAnswerIndex != null
                      ? answer.alternatives[answer.selectedAnswerIndex]
                      : 'Pulou a questão'}
                  </Text>

                  <Text style={styles.label}>Resposta correta:</Text>
                  <Text style={styles.correctAnswerText}>
                    {answer.alternatives[answer.correctAnswerIndex]}
                  </Text>
                </View>

                {answer.explanation && (
                  <View style={styles.explanation}>
                    <Text style={styles.explanationTitle}>Explicação doutrinária:</Text>
                    <Text style={styles.explanationText}>{answer.explanation}</Text>
                  </View>
                )}
              </View>
            );
          })}
          <ButtonAction
            title="Continuar"
            onPress={() => navigation.navigate('categories')}
            disabled={false}
          />
        </ScrollView>
      </SafeAreaView>
    </GradientContainer>
  );
}
