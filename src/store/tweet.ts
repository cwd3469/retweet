import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TweetList, Tweet } from '../components/Home/type';
import type { AppThunk } from './index';
import { db } from '../utils/firebase';
import {
  collection,
  DocumentData,
  getDocs,
  addDoc,
  query,
  orderBy,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
} from 'firebase/firestore';

interface TweetState {
  tweet: TweetList[] | DocumentData[] | [];
}

// Define the initial state using that type
const initialState: TweetState = {
  tweet: [],
};
const board = collection(db, 'tweet');

//트윗 추가
export const tweetPosting =
  (tweet: Tweet): AppThunk =>
  async (dispatch) => {
    const docRef = await addDoc(board, tweet);
    dispatch(tweetPostingSlice({ id: docRef.id, ...tweet }));
  };

//트윗 가져오기
export const tweetGetData = (): AppThunk => async (dispatch) => {
  const result = await getDocs(query(board, orderBy('timestamp', 'desc')));
  const tweetList = result.docs.map((el) => {
    return { ...el.data(), id: el.id };
  });
  dispatch(tweetGetSlice(tweetList));
};

//트윗 detail 가져오기
export const tweetDetailGetData = (): AppThunk => async (dispatch) => {
  const ref = doc(board, id);
};

// 트위 수정
export const tweetPutData =
  (tweet: TweetList): AppThunk =>
  async (dispatch) => {
    const id = tweet.id;
    const docRef = doc(board, id);
    delete tweet.id;
    await updateDoc(docRef, { ...tweet });
    tweet.id = id;
    dispatch(tweetPutSlice(tweet));
  };

//트윗 삭제
export const tweetDeleteData =
  (tweetId: string): AppThunk =>
  async (dispatch, getState) => {
    const docRef = doc(db, 'tweet', tweetId);
    await deleteDoc(docRef);
    const _tweetList = getState().tweet.tweet;
    const tweetIndex = _tweetList.findIndex((i) => {
      return i.id === tweetId;
    });
    dispatch(tweetDeleteSlice(tweetIndex));
  };

export const tweetSlice = createSlice({
  name: 'tweet',
  initialState,
  reducers: {
    tweetDeleteSlice: (state, action: PayloadAction<number>) => {
      const newLists = state.tweet.filter((item, index) => {
        return index !== action.payload ? item : null;
      });
      console.log(newLists);

      state.tweet = newLists;
    },
    tweetPutSlice: (state, action: PayloadAction<TweetList>) => {
      const tweet = action.payload;
      const newLists = state.tweet.map((item) => {
        return item.id !== tweet.id ? item : tweet;
      });
      state.tweet = newLists;
    },
    tweetGetSlice: (state, action: PayloadAction<DocumentData[]>) => {
      state.tweet = action.payload;
    },
    tweetPostingSlice: (state, action: PayloadAction<TweetList>) => {
      const newArr = [action.payload, ...state.tweet];
      console.log(newArr);
      state.tweet = newArr;
    },
  },
});

export const { tweetPostingSlice, tweetGetSlice, tweetDeleteSlice, tweetPutSlice } =
  tweetSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default tweetSlice.reducer;
