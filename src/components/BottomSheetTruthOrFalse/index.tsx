import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-remix-icon';
import { scale } from 'react-native-size-matters';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useTheme } from '@/hooks/useTheme';
import { getBottomSheetMessageStyles } from './styles';

type Props = {
  topic: string;
  title: string;
  question: string;
  correct: boolean;
  explanation: string;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  reference: string;
  userAnswer: boolean | null;
  onAnswer?: (userAnswer: boolean) => void;
  onClose?: () => void;
};

export function BottomSheetTruthOrFalse({
  topic,
  title,
  question,
  correct,
  explanation,
  difficulty,
  reference,
  userAnswer,
  onAnswer,
  onClose,
}: Props) {
  const theme = useTheme();
  const styles = useThemedStyles(getBottomSheetMessageStyles);

  function handlePress(isTruth: boolean) {
    onAnswer?.(isTruth);
  }

  function getAnswerText(answer: boolean) {
    return answer ? 'Verdade' : 'Mentira';
  }

  function getAnswerColor(answer: boolean) {
    return answer ? theme.colors.optionSuccessBorder : theme.colors.optionErrorBorder;
  }

  return (
    <View style={styles.container}>
      {userAnswer === null ? (
        // Mostra a pergunta (usuário ainda não respondeu)
        <>
          <View style={[styles.row, { marginTop: 10 }]}>
            <Icon name="question-fill" size={scale(46)} color={theme.colors.primary} />
            <View style={styles.column}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.topic}>{topic}</Text>
            </View>
          </View>
          <Text style={styles.question}>{question}</Text>
          <View style={styles.boxButton}>
            <TouchableOpacity style={styles.button} onPress={() => handlePress(true)}>
              <Text style={styles.titleButton}>Verdade</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handlePress(false)}>
              <Text style={styles.titleButton}>Mentira</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        // Mostra o resultado (usuário já respondeu)
        <>
          <View style={[styles.row, { marginTop: 10 }]}>
            {userAnswer === correct ? (
              <Icon
                name="checkbox-circle-line"
                color={theme.colors.optionSuccessBorder}
                size={scale(42)}
              />
            ) : (
              <Icon
                name="close-circle-line"
                color={theme.colors.optionErrorBorder}
                size={scale(42)}
              />
            )}
            <View style={styles.column}>
              <View style={styles.answerSummary}>
                <Text style={styles.response}>
                  Você escolheu:{' '}
                  <Text style={[styles.response, { color: getAnswerColor(userAnswer) }]}>
                    {getAnswerText(userAnswer)}
                  </Text>
                </Text>
                <Text style={styles.response}>
                  Resposta correta:{' '}
                  <Text style={[styles.response, { color: getAnswerColor(correct) }]}>
                    {getAnswerText(correct)}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
          <Text style={styles.explanation}>{explanation}</Text>

          <View style={styles.boxReference}>
            <Icon
              name="git-repository-line"
              color={theme.colors.cardSubcategorySubtitle}
              size={scale(20)}
            />
            <Text style={styles.reference}>{reference}</Text>
          </View>
          <View style={styles.boxButton}>
            <View style={styles.btnDifficulty}>
              <Text style={styles.txtDifficulty}>Nível | {difficulty}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.titleButton}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}
