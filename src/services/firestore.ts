import firestore from '@react-native-firebase/firestore';
import { ICategory } from '@/models/Categories';
import { ISubcategory } from '@/models/Subcategories';
import { IQuizes } from '@/models/Quizes';
import { IUserHistory } from '@/models/UsersHistory';
import { IUserCompletedSubcategory } from '@/models/UsersCompletedSubcategories';
import { IUserCreatedQuiz } from '@/models/UserCreatedQuiz';
import { IUserScore } from '@/models/UsersScores';
import { ILeaderboardUser } from '@/models/UsersLeaderboard';
import { TimeFilterEnum, TimeFilter } from '@/models/Filters';

const imageMapping: { [key: string]: any } = {
  CONCEITOS: require('@/assets/images/Categories/Concepts.png'),
  PERSONAGENS: require('@/assets/images/Categories/Characters.png'),
  LIVROS: require('@/assets/images/Categories/Books.png'),
  FILMES: require('@/assets/images/Categories/Films.png'),
  ESPÍRITOS: require('@/assets/images/Categories/Spirits.png'),
  DIVERSOS: require('@/assets/images/Categories/Stories.png'),
};

export async function getCategories(): Promise<ICategory[]> {
  try {
    const categoriesSnapshot = await firestore().collection('categories').get();
    const categoriesData: ICategory[] = categoriesSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        description: data.description,
        subcategoryCount: data.subcategoryCount,
        quizCount: data.quizCount,
        percentage: data.percentage || 0,
        imageBackground: imageMapping[data.title.toUpperCase()] || null,
      };
    });
    return categoriesData;
  } catch (error) {
    console.log('Ocorreu um erro ao obter os dados:', error);
    return [];
  }
}

export async function getSubcategories(idCategory: string): Promise<ISubcategory[]> {
  try {
    const subcategoriesSnapshot = await firestore()
      .collection('subcategories')
      .where('idCategory', '==', idCategory)
      .get();
    const subcategoriesData: ISubcategory[] = subcategoriesSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        idCategory: data.idCategory,
        title: data.title,
        subtitle: data.subtitle,
        quizCount: data.quizCount,
      };
    });
    return subcategoriesData;
  } catch (error) {
    console.log('Ocorreu um erro ao obter os dados:', error);
    return [];
  }
}

export async function getQuiz(idSubcategory: string): Promise<IQuizes | null> {
  try {
    const quizDoc = await firestore().collection('quizes').doc(`QUIZ-${idSubcategory}`).get();
    if (quizDoc.exists()) {
      const quizData = quizDoc.data() as IQuizes;
      return quizData;
    } else {
      console.log(`Quiz não encontrado para a subcategoria ID: ${idSubcategory}`);
      return null;
    }
  } catch (error) {
    console.log(
      `Ocorreu um erro ao obter os dados do quiz para a subcategoria ID: ${idSubcategory}`,
      error
    );
    return null;
  }
}

export async function getUserCompletedSubcategories(
  userId: string,
  categoryId?: string
): Promise<IUserCompletedSubcategory> {
  try {
    const userDoc = await firestore().collection('users_completed_subcategories').doc(userId).get();

    const defaultResponse = {
      userId,
      completedSubcategories: {},
    };

    if (!userDoc.exists) {
      return defaultResponse;
    }

    const userData = userDoc.data();
    if (!userData) {
      return defaultResponse;
    }

    const allData = {
      userId,
      completedSubcategories: userData.completedSubcategories || {},
      totalCompleted: userData.totalCompleted || 0,
    };

    if (categoryId) {
      return {
        userId,
        completedSubcategories: {
          [categoryId]: allData.completedSubcategories[categoryId] || [],
        },
        totalCompleted: allData.completedSubcategories[categoryId]?.length || 0,
      };
    }

    return allData;
  } catch (error) {
    console.error('Error getting user subcategories:', error);
    return {
      userId,
      completedSubcategories: {},
      totalCompleted: 0,
    };
  }
}

export async function saveUserCompletedSubcategories(
  userId: string,
  categoryId: string,
  subcategoryId: string
): Promise<void> {
  try {
    const userDocRef = firestore().collection('users_completed_subcategories').doc(userId);
    const userDoc = await userDocRef.get();
    const data = userDoc.data();

    if (data?.completedSubcategories) {
      // Se a categoria já existir no 'completedSubcategories', adiciona a nova subcategoria
      if (data.completedSubcategories[categoryId]) {
        await userDocRef.update({
          [`completedSubcategories.${categoryId}`]: firestore.FieldValue.arrayUnion(subcategoryId),
        });
      } else {
        // Se a categoria não existir, cria um novo array de subcategorias
        await userDocRef.update({
          [`completedSubcategories.${categoryId}`]: [subcategoryId],
        });
      }
    } else {
      // Se o campo 'completedSubcategories' não existir, cria o campo com a subcategoria
      await userDocRef.set({
        completedSubcategories: {
          [categoryId]: [subcategoryId],
        },
      });
    }
  } catch (error) {
    console.log('Ocorreu um erro ao salvar a subcategoria concluída:', error);
  }
}

export async function removeUserCompletedSubcategory(
  userId: string,
  categoryId: string,
  subcategoryId: string
): Promise<void> {
  try {
    const userDocRef = firestore().collection('users_completed_subcategories').doc(userId);
    const userDoc = await userDocRef.get();
    const data = userDoc.data();

    if (data?.completedSubcategories?.[categoryId]) {
      const updatedSubcategories = data.completedSubcategories[categoryId].filter(
        (id: string) => id !== subcategoryId
      );

      if (updatedSubcategories.length > 0) {
        // Atualiza a categoria removendo a subcategoria
        await userDocRef.update({
          [`completedSubcategories.${categoryId}`]: updatedSubcategories,
        });
      } else {
        // Se a categoria ficar vazia, remove-a completamente
        await userDocRef.update({
          [`completedSubcategories.${categoryId}`]: firestore.FieldValue.delete(),
        });
      }
    }
  } catch (error) {
    console.log('Ocorreu um erro ao remover a subcategoria concluída:', error);
  }
}

export async function getUserHistory(userId: string): Promise<IUserHistory[]> {
  try {
    const historySnapshot = await firestore()
      .collection('users_history')
      .doc(userId)
      .collection('history')
      .orderBy('completedAt', 'desc')
      .get();
    const userHistory: IUserHistory[] = historySnapshot.docs.map((doc) => ({
      userId,
      ...doc.data(),
    })) as IUserHistory[];
    return userHistory;
  } catch (error) {
    console.log('Ocorreu um erro ao buscar o histórico do usuário:', error);
    throw error;
  }
}

export async function addUserHistory(userHistory: IUserHistory, userName: string): Promise<void> {
  try {
    const userHistoryRef = firestore()
      .collection('users_history')
      .doc(userHistory.userId)
      .collection('history')
      .doc(userHistory.subcategoryId);
    await userHistoryRef.set(userHistory);
    await updateUserScore(userHistory.userId, userName);
    console.log('Adicionado histórico e computado score do usuário com sucesso!');
  } catch (error) {
    console.log('Ocorreu um erro ao adicionar o histórico do usuário:', error);
  }
}

export async function removeUserHistory(
  userId: string,
  userName: string,
  subcategoryId: string
): Promise<void> {
  try {
    const userHistoryRef = firestore()
      .collection('users_history')
      .doc(userId)
      .collection('history')
      .doc(subcategoryId);
    await userHistoryRef.delete();
    await updateUserScore(userId, userName);
    console.log('Removido histórico e computado score do usuário com sucesso!');
  } catch (error) {
    console.log('Ocorreu um erro ao remover o histórico do usuário:', error);
  }
}

export async function updateUserScore(userId: string, userName: string): Promise<void> {
  try {
    const historySnapshot = await firestore()
      .collection('users_history')
      .doc(userId)
      .collection('history')
      .get();

    const histories = historySnapshot.docs.map((doc) => doc.data() as IUserHistory);
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfWeek = new Date(now);

    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    let totalAllTime = 0;
    let totalThisMonth = 0;
    let totalThisWeek = 0;

    histories.forEach((history) => {
      const completedDate = history.completedAt.toDate();
      const score = history.score;

      totalAllTime += score;

      if (completedDate >= startOfMonth) {
        totalThisMonth += score;
      }

      if (completedDate >= startOfWeek) {
        totalThisWeek += score;
      }
    });

    const userScoreRef = firestore().collection('leaderboard_scores').doc(userId);

    const summary: IUserScore = {
      userId,
      userName,
      totalAllTime,
      totalThisMonth,
      totalThisWeek,
      lastUpdated: firestore.FieldValue.serverTimestamp() as any,
    };

    await userScoreRef.set(summary);
    console.log('Resumo de score atualizado com sucesso!');
  } catch (error) {
    console.error('Erro ao atualizar resumo de score do usuário:', error);
  }
}

export async function getLeaderboard(period: TimeFilter): Promise<ILeaderboardUser[]> {
  const fieldMap: Record<TimeFilterEnum, string> = {
    [TimeFilterEnum.WEEK]: 'totalThisWeek',
    [TimeFilterEnum.MONTH]: 'totalThisMonth',
    [TimeFilterEnum.ALL]: 'totalAllTime',
  };

  const field = fieldMap[period];

  const snapshot = await firestore()
    .collection('leaderboard_scores')
    .orderBy(field, 'desc')
    .limit(100)
    .get();

  return snapshot.docs.map((doc, index) => {
    const data = doc.data();
    return {
      userId: data.userId,
      userName: data.userName,
      avatarUrl: undefined,
      score: data[field],
      position: index + 1,
    };
  });
}

export async function addUserCreatedQuiz(userCreatedQuiz: IUserCreatedQuiz): Promise<void> {
  try {
    const userCreatedQuizRef = firestore()
      .collection('users_created_quizzes')
      .doc(userCreatedQuiz.userId)
      .collection('quizzes')
      .doc(); // Gera um ID único para o quiz criado
    await userCreatedQuizRef.set(userCreatedQuiz);
    console.log('Quiz criado pelo usuário adicionado com sucesso!');
  } catch (error) {
    console.log('Ocorreu um erro ao adicionar o quiz criado pelo usuário:', error);
  }
}
