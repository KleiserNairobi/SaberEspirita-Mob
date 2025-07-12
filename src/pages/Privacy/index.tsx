import { ScrollView, View, Text, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GradientContainer } from '@/components/GradientContainer';
import { Header } from '@/components/Header';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { getPrivacyStyles } from './styles';

export function Privacy() {
  const navigation = useNavigation();
  const styles = useThemedStyles(getPrivacyStyles);

  return (
    <GradientContainer>
      <SafeAreaView style={styles.container}>
        <Header title="Política de privacidade" onPress={() => navigation.goBack()} />
        <Text style={styles.subtitle}>
          Esta Política de Privacidade descreve como o aplicativo Saber Espírita coleta, utiliza e
          protege as informações pessoais dos usuários. Ao utilizar o aplicativo, você concorda com
          os termos desta política. Se você não concordar, por favor, não continue a usar o
          aplicativo.
        </Text>
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 20 }}>
          <Text style={styles.item}>1. Coleta de informações</Text>
          <View style={styles.containerItem}>
            <Text style={styles.description}>
              O aplicativo Saber Espírita” não coleta nenhum dado pessoal identificável dos
              usuários. Embora haja uma tela de identificação onde você pode inserir um nome, saiba
              que essa informação é estritamente opcional e não será utilizada para rastrear,
              identificar ou armazenar informações sobre você.
            </Text>
          </View>
          <Text style={styles.item}>2. Uso das Informações</Text>
          <View style={styles.containerItem}>
            <Text style={styles.description}>
              O aplicativo "Saber Espírita" não utiliza as informações inseridas na tela de
              identificação para nenhum propósito. O nome fornecido pelo usuário não será associado
              a nenhuma atividade ou ação dentro do aplicativo. Ele serve apenas como uma forma de
              personalizar a experiência do usuário durante a utilização do quiz.
            </Text>
          </View>
          <Text style={styles.item}>3. Compartilhamento de Informações</Text>
          <View style={styles.containerItem}>
            <Text style={styles.description}>
              O aplicativo "Saber Espírita" não compartilha nenhuma informação pessoal ou qualquer
              outro dado inserido pelos usuários com terceiros, incluindo empresas, organizações ou
              indivíduos.
            </Text>
          </View>
          <Text style={styles.item}>4. Cookies e Tecnologias Similares</Text>
          <View style={styles.containerItem}>
            <Text style={styles.description}>
              O aplicativo "Saber Espírita" não utiliza cookies, tags de pixel, ou qualquer outra
              tecnologia de rastreamento para coletar informações dos usuários.
            </Text>
          </View>
          <Text style={styles.item}>5. Segurança</Text>
          <View style={styles.containerItem}>
            <Text style={styles.description}>
              A segurança das informações dos usuários é importante para nós. Embora o aplicativo
              "Saber Espírita" não colete informações pessoais, tomamos medidas razoáveis para
              proteger qualquer dado fornecido pelos usuários no aplicativo.
            </Text>
          </View>
          <Text style={styles.item}>6. Menores de Idade</Text>
          <View style={styles.containerItem}>
            <Text style={styles.description}>
              O aplicativo "Saber Espírita" é destinado a todas as idades e não coleta nenhuma
              informação pessoal identificável, tornando-o seguro para uso por menores de idade.
            </Text>
          </View>
          <Text style={styles.item}>7. Alterações na Política de Privacidade</Text>
          <View style={styles.containerItem}>
            <Text style={styles.description}>
              Reservamo-nos o direito de atualizar ou modificar esta Política de Privacidade a
              qualquer momento. Quaisquer alterações significativas serão notificadas através de uma
              atualização no aplicativo ou em nosso site.
            </Text>
          </View>
          <Text style={styles.item}>8. Contato</Text>
          <View style={styles.containerItem}>
            <Text style={styles.description}>
              Se você tiver alguma dúvida ou preocupação relacionada a esta Política de Privacidade
              ou ao uso do aplicativo "Saber Espírita", por favor, entre em contato conosco pelo
              seguinte endereço de e-mail: quiz.saberespirita@gmail.com
            </Text>
          </View>
          <Text style={styles.update}>
            Esta Política de Privacidade foi atualizada em 01/04/2025.
          </Text>
        </ScrollView>
      </SafeAreaView>
    </GradientContainer>
  );
}
