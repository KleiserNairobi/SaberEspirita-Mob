import firestore from '@react-native-firebase/firestore';
import { ICategory } from '@/models/Categories';
import { ISubcategory } from '@/models/Subcategories';
import { IQuizes } from '@/models/Quizes';
import { IUserProgress } from '@/models/UsersProgress';
import { IUserCompletedSubcategory } from '@/models/UsersCompletedSubcategories';
import { IUserCreatedQuiz } from '@/models/UserCreatedQuiz';

const imageMapping: { [key: string]: any } = {
  CONCEITOS: require('@assets/images/Categories/Concepts.png'),
  PERSONAGENS: require('@assets/images/Categories/Characters.png'),
  LIVROS: require('@assets/images/Categories/Books.png'),
  FILMES: require('@assets/images/Categories/Films.png'),
  ESPÍRITOS: require('@assets/images/Categories/Spirits.png'),
  DIVERSOS: require('@assets/images/Categories/Stories.png'),
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
    if (quizDoc.exists) {
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
): Promise<IUserCompletedSubcategory | null> {
  try {
    const userDoc = await firestore().collection('users_completed_subcategories').doc(userId).get();

    if (!userDoc.exists) {
      return null;
    }

    if (!categoryId) {
      return userDoc.data() as IUserCompletedSubcategory;
    }

    const subcategories = userDoc.data()?.completedSubcategories?.[categoryId];

    if (!subcategories) {
      return null;
    }

    return {
      userId,
      completedSubcategories: { [categoryId]: subcategories },
    };
  } catch (error) {
    console.log('Ocorreu um erro ao obter o histórico do usuário:', error);
    return null;
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

export async function getUserProgress(userId: string): Promise<IUserProgress[]> {
  try {
    const progressSnapshot = await firestore()
      .collection('users_progress')
      .doc(userId)
      .collection('progress')
      .orderBy('completedAt', 'desc')
      .get();
    const userProgress: IUserProgress[] = progressSnapshot.docs.map((doc) => ({
      userId,
      ...doc.data(),
    })) as IUserProgress[];
    return userProgress;
  } catch (error) {
    console.log('Ocorreu um erro ao buscar o progresso do usuário:', error);
    throw error;
  }
}

export async function addUserProgress(userProgress: IUserProgress): Promise<void> {
  try {
    const userProgressRef = firestore()
      .collection('users_progress')
      .doc(userProgress.userId)
      .collection('progress')
      .doc(userProgress.subcategoryId);
    await userProgressRef.set(userProgress);
    console.log('Progresso do usuário adicionado com sucesso!');
  } catch (error) {
    console.log('Ocorreu um erro ao adicionar o progresso do usuário:', error);
  }
}

export async function removeUserProgress(userId: string, subcategoryId: string): Promise<void> {
  try {
    const userProgressRef = firestore()
      .collection('users_progress')
      .doc(userId)
      .collection('progress')
      .doc(subcategoryId);
    await userProgressRef.delete();
    console.log('Progresso do usuário removido com sucesso!');
  } catch (error) {
    console.log('Ocorreu um erro ao remover o progresso do usuário:', error);
  }
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
