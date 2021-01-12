import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyAi66k2kjhAxH-WfmrTDKqP1GyANpCVhp8',
  authDomain: 'e-commerce-app-db-c2857.firebaseapp.com',
  databaseURL: 'https://e-commerce-app-db-c2857.firebaseio.com',
  projectId: 'e-commerce-app-db-c2857',
  storageBucket: 'e-commerce-app-db-c2857.appspot.com',
  messagingSenderId: '49468049167',
  appId: '1:49468049167:web:3be0f101e799fbf9d2607a',
  measurementId: 'G-7VDZFYJBGH',
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
