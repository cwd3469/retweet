import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: 'AIzaSyBailC46Hep8r3I8yQRZxkHeihyaxE9btg',
  authDomain: 'tweet-35283.firebaseapp.com',
  projectId: 'tweet-35283',
  storageBucket: 'tweet-35283.appspot.com',
  messagingSenderId: '309099016438',
  appId: '1:309099016438:web:36f92912a4d9c72ae27cd7',
  measurementId: 'G-KJ4HE6L43G',
};
initializeApp(firebaseConfig);

const db = getFirestore();

export { db };
