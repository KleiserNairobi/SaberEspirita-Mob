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
                O aplicativo Saber Espírita” destina-se a fins recreativos e educativos, oferecendo
                um quiz com temática espírita. Não nos responsabilizamos por qualquer uso indevido
                ou interpretação incorreta das informações contidas no aplicativo.
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.subitem}>1.2</Text>
              <Text style={styles.description}>
                Você concorda em utilizar o aplicativo de acordo com todas as leis e regulamentos
                locais, nacionais e internacionais aplicáveis.
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
                escrito de Kleiser Nairobi de Oliveira.
              </Text>
            </View>
          </View>

          <Text style={styles.item}>3. Conteúdo do usuário</Text>
          <View style={styles.containerItem}>
            <View style={styles.row}>
              <Text style={styles.subitem}>3.1</Text>
              <Text style={styles.description}>
                O aplicativo "Saber Espírita" pode permitir que você insira um nome na tela de
                identificação para personalizar a experiência do usuário. No entanto, você concorda
                em não inserir nomes ou qualquer conteúdo que seja ofensivo, difamatório, ilegal ou
                que viole os direitos de terceiros.
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.subitem}>3.2</Text>
              <Text style={styles.description}>
                Você mantém a propriedade do conteúdo que você insere no aplicativo, mas concede a
                Kleiser Nairobi de Oliveira uma licença não exclusiva, global, irrevogável e
                sublicenciável para usar, reproduzir, modificar e exibir esse conteúdo no
                aplicativo.
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
                indiretos, incidentais, especiais ou consequenciais decorrentes do uso ou
                impossibilidade de uso do aplicativo "Saber Espírita".
              </Text>
            </View>
          </View>

          <Text style={styles.item}>5. Alterações nos termos de uso</Text>
          <View style={styles.containerItem2}>
            <Text style={styles.description}>
              Reservamo-nos o direito de modificar ou atualizar estes Termos de Uso a qualquer
              momento. Quaisquer alterações significativas serão notificadas através do aplicativo
              ou em nosso site.
            </Text>
          </View>

          <Text style={styles.item}>6. Contato</Text>
          <View style={styles.containerItem2}>
            <Text style={styles.description}>
              Se você tiver alguma dúvida ou preocupação relacionada a estes Termos de Uso ou ao uso
              do aplicativo "Saber Espírita", por favor, entre em contato conosco pelo seguinte
              endereço de e-mail: quiz.saberespirita@gmail.com
            </Text>
          </View>

          <Text style={styles.update}>Este Termo de Uso foi atualizado em 01/04/2025.</Text>
        </ScrollView>
      </SafeAreaView>
    </GradientContainer>
  );
}
