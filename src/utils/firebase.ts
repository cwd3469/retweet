import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyBailC46Hep8r3I8yQRZxkHeihyaxE9btg',
  authDomain: 'tweet-35283.firebaseapp.com',
  projectId: 'tweet-35283',
  storageBucket: 'tweet-35283.appspot.com',
  messagingSenderId: '309099016438',
  appId: '1:309099016438:web:36f92912a4d9c72ae27cd7',
  measurementId: 'G-KJ4HE6L43G',
};
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// // firebaseConfig 정보로 firebase 시작
initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const db = getFirestore();

// 필요한 곳에서 사용할 수 있도록 내보내기
export { db };
