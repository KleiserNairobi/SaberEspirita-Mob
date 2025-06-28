import {create} from 'zustand';
import firestore from '@react-native-firebase/firestore';
import {ICategory} from '@models/Categories';

const imageMapping: {[key: string]: any} = {
  CONCEITOS: require('@assets/images/Categories/Concepts.png'),
  PERSONAGENS: require('@assets/images/Categories/Characters.png'),
  LIVROS: require('@assets/images/Categories/Books.png'),
  FILMES: require('@assets/images/Categories/Films.png'),
  ESPIRITOS: require('@assets/images/Categories/Spirits.png'),
  DIVERSOS: require('@assets/images/Categories/Stories.png'),
};

interface CategoriesState {
  categories: ICategory[];
  fetchCategories: () => Promise<void>;
}

const useCategoriesStore = create<CategoriesState>(set => ({
  categories: [],
  fetchCategories: async () => {
    try {
      const getSubcategoriesCount = async (
        categoryId: string,
      ): Promise<number> => {
        const snapshot = await firestore()
          .collection('subcategories')
          .where('idCategory', '==', categoryId)
          .get();
        return snapshot.size;
      };

      const categoriesSnapshot = await firestore()
        .collection('categories')
        .get();
      const categoriesData: ICategory[] = await Promise.all(
        categoriesSnapshot.docs.map(async doc => {
          const data = doc.data() as ICategory;
          const subcategoryCount = await getSubcategoriesCount(doc.id);
          return {
            ...data,
            id: doc.id,
            quizzes: subcategoryCount,
            imageBackground: imageMapping[doc.id] || null,
          };
        }),
      );

      set({categories: categoriesData});
    } catch (error) {
      console.log('Ocorreu um erro ao obter os dados: ', error);
    }
  },
}));

export {useCategoriesStore};
