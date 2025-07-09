// import { initializeApp } from '@react-native-firebase/app';
// import { getAuth } from '@react-native-firebase/auth';
// import { getFirestore } from '@react-native-firebase/firestore';
// import type { Auth } from '@firebase/auth';

// // Configurações da conta no Firebase
// const firebaseConfig = {
//   apiKey: 'AIzaSyCnoAUmWP2Hhu3yHCv7rm2pILsFUinGdWI',
//   authDomain: 'saber-espirita.firebaseapp.com',
//   projectId: 'saber-espirita',
//   storageBucket: 'saber-espirita.firebasestorage.app',
//   messagingSenderId: '280205524209',
//   appId: '1:280205524209:web:889baa34bb3004389f3d50',
// };

// let appInstance: any = null;
// export let auth: Auth | null = null;
// export let firestore: ReturnType<typeof getFirestore> | null = null;

// export const initializeFirebaseApp = async () => {
//   if (appInstance) {
//     console.warn(
//       'Firebase já foi inicializado. Evite chamar initializeFirebaseApp múltiplas vezes.'
//     );
//     return { auth, firestore };
//   }
//   try {
//     appInstance = await initializeApp(firebaseConfig);
//     auth = getAuth(appInstance) as Auth;
//     firestore = getFirestore(appInstance);

//     console.log('Firebase inicializado com sucesso!');
//     return { auth, firestore };
//   } catch (error) {
//     console.error('Erro ao inicializar o Firebase:', error);
//     throw error;
//   }
// };
