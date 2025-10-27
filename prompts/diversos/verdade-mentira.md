# Prompt Otimizado – Geração de Questões "Verdade ou Mentira"

## Objetivo

Criar questões no formato "Verdade ou Mentira" para um aplicativo quiz sobre Doutrina Espírita, gerando dados estruturados em JavaScript/TypeScript com explicações e referências.

## Estrutura JavaScript/TypeScript

```javascript
[
  {
    id: 'identificador-único',
    topic: 'tema',
    question: 'Texto da questão aqui (pergunta que DEVE terminar com ?)',
    correct: true,
    explanation: 'Explicação detalhada baseada nas obras básicas',
    reference: 'Obra de referência (ex: O Livro dos Espíritos, q. XXX)',
    difficulty: 'Fácil|Médio|Difícil',
  },
];
```

### Regras e limites de texto:

- question → mínimo 90 e máximo de 180 caracteres
- explanation → mínimo 120 e máximo de 260 caracteres
- reference → mínimo 40 e máximo de 100 caracteres

Dica:
Utilize abreviações padronizadas para as obras básicas, a fim de economizar espaço:

| Obra Completa                     | Abreviação sugerida | Exemplo de uso        |
| --------------------------------- | ------------------- | --------------------- |
| O Livro dos Espíritos             | **LE**              | LE, q. 166–167        |
| O Livro dos Médiuns               | **LM**              | LM, cap. XXIX         |
| O Evangelho Segundo o Espiritismo | **ESE**             | ESE, cap. V, item 6   |
| A Gênese                          | **AG**              | AG, cap. XI           |
| O Céu e o Inferno                 | **CI**              | CI, 2ª parte, cap. II |
| A Revista Espírita                | **RE**              | RE, jan. 1862         |

### Dicas de estilo:

- Use frases curtas, claras e diretas.
- Evite citações literais longas; resuma o sentido da obra.
- Prefira verbos ativos e afirmativos (“Kardec observou”, “O Espírito ensina”).
- Divida ideias com pontuação leve (vírgulas e pontos).
- Mantenha linguagem natural e fiel ao conteúdo doutrinário espírita.
- Todas as perguntas devem terminar com “?”.

## Características das Questões

- **Abordar pontos doutrinários** que causam confusão ou geram dúvidas frequentes
- **Incluir temas de obras kodificadas** (O Livro dos Espíritos, A Gênese, O Evangelho Segundo o Espiritismo, Obras de Allan Kardec)
- **Explorar conceitos avançados** de forma acessível
- **Misturar níveis de dificuldade**: fácil, médio e difícil
- **Fornecer explicações claras e educativas**, com referências precisas
- **Formato Verdadeiro ou Falso**, mas entregue em JavaScript/TypeScript com `correct: true|false`

## Tópicos Prioritários

### Reencarnação e Leis Morais

- Reencarnação e leis morais
- Provas e expiações
- Livre-arbítrio e consequências morais
- Impacto da educação e ambiente
- Reencarnação coletiva

### Mediunidade e Suas Nuances

- Tipos de mediunidade: psicografia, psicofonia, clarividência, cura
- Ética e cuidados espirituais
- Influência de espíritos desencarnados
- Obsessão vs mediunidade elevada

### Evolução Espiritual

- Graus de progresso moral e intelectual
- Influência de hábitos e pensamentos
- Virtudes e vícios
- Caridade como aceleradora de evolução

### Fluidos e Perispírito

- Natureza e função do perispírito
- Interação com pensamentos e emoções
- Transmissão de energias
- Limpeza e proteção espiritual

### Relação Ciência-Religião-Filosofia

- Convergência entre ciência e Doutrina Espírita
- Fenômenos espirituais sob explicações racionais
- Filosofia moral do Espiritismo

### Interpretação Espírita da Bíblia

- Passagens de Jesus com interpretação espiritual
- Significados simbólicos e morais
- Lições aplicáveis à vida cotidiana

### Aspectos Científicos e Práticos

- Experimentos históricos e observações
- Vida após a morte e efeitos da mente sobre o corpo
- Importância de registro e estudo cuidadoso

### Aplicação na Vida Cotidiana

- Ética e moral no dia a dia
- Desenvolvimento de paciência, tolerância e resignação
- Influência da espiritualidade na saúde emocional
- Incentivo à prática de boas ações

### Diversos (Aspectos Específicos e Curiosidades)

- Água fluidificada e passe espírita
- Alma gêmea e relações afetivas
- Casamento, divórcio e família
- Aborto, suicídio e decisões morais
- Dízimo, rituais e práticas não espíritas
- Curiosidades doutrinárias e mitos comuns

## Distribuição de Dificuldade Sugerida

**Por Lote (20 questões):**

- **8 questões difíceis**
- **7 questões médias**
- **5 questões fáceis**

## 💡 Sugestão de Abordagem

Mesclar temas em cada questão para aumentar a reflexão.

**Exemplo:** "Questão sobre reencarnação e evolução espiritual mostrando consequências práticas do livre-arbítrio."

## Exemplo de Questão

```javascript
[
  {
    id: '0001',
    topic: 'Reencarnação',
    question: 'A reencarnação é um processo de punição por erros passados?',
    correct: false,
    explanation:
      'A reencarnação é principalmente um processo de aprendizado e evolução espiritual, não apenas de punição.',
    reference: 'LE, q. 166-167',
    difficulty: 'Fácil',
  },
];
```

## Diretrizes de Qualidade

1. **Precisão Doutrinária**: Todas as questões devem estar alinhadas com as obras básicas do Espiritismo
2. **Clareza**: As questões devem ser compreensíveis para iniciantes e avançados
3. **Referências**: Incluir sempre a fonte específica das informações
4. **Educação**: As explicações devem ser instrutivas e promover reflexão
5. **Variedade**: Abordar diferentes aspectos da doutrina em cada lote de questões
