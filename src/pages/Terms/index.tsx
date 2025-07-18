import { View, ScrollView, Text, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GradientContainer } from '@/components/GradientContainer';
import { Header } from '@/components/Header';
import { getTermsStyles } from './styles';
import { useThemedStyles } from '@/hooks/useThemedStyles';

export function Terms() {
  const navigation = useNavigation();
  const styles = useThemedStyles(getTermsStyles);

  return (
    <GradientContainer>
      <SafeAreaView style={styles.container}>
        <Header title="Termo de uso" onPress={() => navigation.goBack()} />
        <Text style={styles.subtitle}>
          Ao utilizar o aplicativo Saber Espírita, você concorda com os termos abaixo. Se você não
          concordar, por favor, não continue a usar o aplicativo.
        </Text>
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 20 }}>
          <Text style={styles.item}>1. Uso do aplicativo</Text>
          <View style={styles.containerItem}>
            <View style={styles.row}>
              <Text style={styles.subitem}>1.1</Text>
              <Text style={styles.description}>
                O aplicativo "Saber Espírita" tem como propósito promover o aprendizado e a
                divulgação da doutrina espírita, por meio de um quiz interativo que incentiva a
                autoavaliação, o estudo e o entretenimento. Seu uso é destinado a fins educativos e
                recreativos.
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.subitem}>1.2</Text>
              <Text style={styles.description}>
                Espera-se que os usuários utilizem o aplicativo de forma ética e responsável,
                respeitando os princípios da doutrina espírita e os termos aqui descritos. O uso
                inadequado, ofensivo ou ilegal não é permitido.
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.subitem}>1.3</Text>
              <Text style={styles.description}>
                Embora o conteúdo tenha sido elaborado com cuidado e dedicação, o aplicativo não se
                responsabiliza por eventuais interpretações incorretas ou aplicações individuais das
                informações fornecidas.
              </Text>
            </View>
          </View>
          <Text style={styles.item}>2. Propriedade intelectual</Text>
          <View style={styles.containerItem}>
            <View style={styles.row}>
              <Text style={styles.subitem}>2.1</Text>
              <Text style={styles.description}>
                Todos os direitos de propriedade intelectual relacionados ao aplicativo "Saber
                Espírita", incluindo mas não se limitando a design, gráficos, texto, imagens e
                código, são de propriedade exclusiva de Kleiser Nairobi de Oliveira.
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.subitem}>2.2</Text>
              <Text style={styles.description}>
                Você não possui o direito de reproduzir, modificar, distribuir ou criar obras
                derivadas com base no aplicativo "Saber Espírita" sem o consentimento expresso por
                escrito do autor.
              </Text>
            </View>
          </View>
          <Text style={styles.item}>3. Conteúdo do usuário</Text>
          <View style={styles.containerItem}>
            <View style={styles.row}>
              <Text style={styles.subitem}>3.1</Text>
              <Text style={styles.description}>
                O aplicativo pode permitir que você insira um nome ou apelido na tela de
                identificação para personalizar sua experiência. No entanto, você concorda em não
                inserir nomes ou conteúdo ofensivo, difamatório, ilegal ou que viole os direitos de
                terceiros.
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.subitem}>3.2</Text>
              <Text style={styles.description}>
                Você mantém a propriedade do conteúdo que insere no aplicativo, mas concede a
                Kleiser Nairobi de Oliveira uma licença não exclusiva, global, irrevogável e
                sublicenciável para usá-lo, reproduzi-lo, modificá-lo e exibi-lo no aplicativo.
              </Text>
            </View>
          </View>
          <Text style={styles.item}>4. Limitação de responsabilidade</Text>
          <View style={styles.containerItem}>
            <View style={styles.row}>
              <Text style={styles.subitem}>4.1</Text>
              <Text style={styles.description}>
                O aplicativo "Saber Espírita" é fornecido "no estado em que se encontra", sem
                garantias de qualquer tipo, expressas ou implícitas. Não garantimos a precisão,
                confiabilidade ou disponibilidade contínua do aplicativo.
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.subitem}>4.2</Text>
              <Text style={styles.description}>
                Kleiser Nairobi de Oliveira não será responsável por quaisquer danos diretos,
                indiretos, incidentais, especiais ou consequenciais decorrentes do uso ou da
                impossibilidade de uso do aplicativo.
              </Text>
            </View>
          </View>
          <Text style={styles.item}>5. Idade Mínima e Consentimento Parental</Text>
          <View style={styles.containerItem2}>
            <Text style={styles.description}>
              O uso do aplicativo está autorizado apenas para pessoas com idade igual ou superior a
              13 anos. Se você for menor de 18 anos, é necessário obter o consentimento de seus pais
              ou responsáveis legais para utilizar o aplicativo.
            </Text>
          </View>

          <Text style={styles.item}>6. Conformidade com Leis de Proteção de Dados</Text>
          <View style={styles.containerItem2}>
            <Text style={styles.description}>
              Ao utilizar o aplicativo, você declara estar ciente de que seus dados serão tratados
              de acordo com as legislações de proteção de dados aplicáveis, incluindo a Lei Geral de
              Proteção de Dados (LGPD) no Brasil, o Regulamento Geral sobre a Proteção de Dados
              (GDPR) na União Europeia e a Children's Online Privacy Protection Act (COPPA), nos
              Estados Unidos, quando aplicável.
            </Text>
          </View>
          <Text style={styles.item}>7. Serviços de Terceiros</Text>
          <View style={styles.containerItem2}>
            <Text style={styles.description}>
              O aplicativo pode integrar serviços de terceiros para funcionalidades como
              autenticação, armazenamento, análise de dados ou notificações. Esses serviços possuem
              suas próprias políticas de privacidade e termos de uso, e podem coletar informações
              conforme suas diretrizes.
            </Text>
          </View>
          <Text style={styles.item}>8. Alterações nos termos de uso</Text>
          <View style={styles.containerItem2}>
            <Text style={styles.description}>
              Reservamo-nos o direito de modificar ou atualizar estes Termos de Uso a qualquer
              momento. Quaisquer alterações significativas serão notificadas através do aplicativo
              ou em nosso site.
            </Text>
          </View>
          <Text style={styles.item}>9. Contato</Text>
          <View style={styles.containerItem2}>
            <Text style={styles.description}>
              Se você tiver alguma dúvida ou preocupação relacionada a estes Termos de Uso ou ao uso
              do aplicativo "Saber Espírita", por favor, entre em contato conosco pelo e-mail:
              quiz.saberespirita@gmail.com
            </Text>
          </View>
          <Text style={styles.update}>Última atualização: 01/07/2025</Text>
        </ScrollView>
      </SafeAreaView>
    </GradientContainer>
  );
}
