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
          protege as informações dos usuários. Ao utilizar o aplicativo, você concorda com os termos
          desta política. Se você não concordar, por favor, não continue a usar o aplicativo.
        </Text>
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 20 }}>
          <Text style={styles.item}>1. Coleta de informações</Text>
          <View style={styles.containerItem}>
            <Text style={styles.description}>
              Ao se cadastrar no aplicativo Saber Espírita, coletamos as seguintes informações:
            </Text>
            <Text style={styles.description}>
              - Apelido/Nome (obrigatório): Usado para sua identificação dentro do aplicativo,
              placares e para personalizar sua experiência.
            </Text>
            <Text style={styles.description}>
              - Endereço de e-mail (obrigatório): Usado para login, recuperação de senha e,
              opcionalmente, para comunicações importantes do aplicativo, como notícias,
              atualizações ou informações sobre sua conta.
            </Text>
            <Text style={styles.description}>
              - Senha (obrigatória): Armazenada de forma criptografada para proteger o acesso à sua
              conta.
            </Text>
          </View>
          <Text style={styles.item}>2. Uso das Informações</Text>
          <View style={styles.containerItem}>
            <Text style={styles.description}>
              As informações coletadas são utilizadas exclusivamente para os seguintes propósitos:
            </Text>

            <Text style={styles.description}>
              - Gerenciamento da Conta: Para permitir que você faça login, acesse seu perfil e
              recupere sua senha.
            </Text>
            <Text style={styles.description}>
              - Personalização da Experiência: O apelido é usado para personalizar a interface do
              quiz e exibido em placares de pontuação.
            </Text>
            <Text style={styles.description}>
              - Comunicações: Seu e-mail poderá ser usado para enviar informações relacionadas ao
              aplicativo (como avisos de serviço, novidades ou recuperação de conta), caso você não
              desative essa opção. O nome, se fornecido, pode ser usado para personalizar essas
              comunicações.
            </Text>
            <Text style={styles.description}>
              - Melhoria do Serviço: As informações agregadas e anônimas (não identificáveis
              pessoalmente) sobre o uso geral do aplicativo podem ser analisadas para entender
              padrões de uso e melhorar a experiência do usuário.
            </Text>
          </View>
          <Text style={styles.item}>3. Compartilhamento de Informações</Text>
          <View style={styles.containerItem}>
            <Text style={styles.description}>
              O aplicativo Saber Espírita não compartilha suas informações pessoais (apelido,
              e-mail, senha, nome) com terceiros, incluindo empresas, organizações ou indivíduos,
              exceto quando exigido por lei.
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
              A segurança das suas informações é muito importante para nós. Embora nenhuma
              transmissão de dados pela internet seja 100% segura, tomamos medidas razoáveis para
              proteger as informações que coletamos, como a criptografia da sua senha.
            </Text>
          </View>
          <Text style={styles.item}>6. Menores de Idade</Text>
          <View style={styles.containerItem}>
            <Text style={styles.description}>
              O aplicativo Saber Espírita aborda a doutrina espírita e é destinado principalmente a
              adolescentes (a partir de 13 anos) e adultos. Embora não contenha material impróprio
              para outras idades, seu conteúdo pode ser mais bem compreendido por um público mais
              maduro.
            </Text>
            <Text style={styles.description}>
              - Caso você seja menor de 18 anos, certifique-se de ter a permissão de seus pais ou
              responsáveis antes de se cadastrar, usar o aplicativo e fornecer qualquer informação
              pessoal, incluindo o e-mail e o nome. Não coletamos intencionalmente informações de
              menores de 13 anos. Se tomarmos conhecimento de que coletamos informações de um menor
              de 13 anos sem o consentimento dos pais, tomaremos medidas para remover essas
              informações de nossos servidores.
            </Text>
          </View>
          <Text style={styles.item}>7. Alterações na Política de Privacidade</Text>
          <View style={styles.containerItem}>
            <Text style={styles.description}>
              Reservamo-nos o direito de atualizar ou modificar esta Política de Privacidade a
              qualquer momento. Quaisquer alterações significativas serão notificadas através de uma
              atualização no aplicativo ou em nosso site, e a data da "Última Atualização" será
              revisada.
            </Text>
          </View>
          <Text style={styles.item}>8. Contato</Text>
          <View style={styles.containerItem}>
            <Text style={styles.description}>
              Se você tiver alguma dúvida ou preocupação relacionada a esta Política de Privacidade
              ou ao uso do aplicativo Saber Espírita, por favor, entre em contato conosco pelo
              seguinte endereço de e-mail: quiz.saberespirita@gmail.com
            </Text>
          </View>
          <Text style={styles.update}>Última Atualização: 01/07/2025.</Text>
        </ScrollView>
      </SafeAreaView>
    </GradientContainer>
  );
}
