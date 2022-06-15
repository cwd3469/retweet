import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../components/Home/type';
import type { RootState, AppThunk } from './index';

interface AuthState {
  userInfo: User;
}

const initialState: AuthState = {
  userInfo: {
    userId: '3012',
    nickName: '내림가람',
    userEmail: '@userId3342',
    profileImg: 'https://cdn.pixabay.com/photo/2014/04/02/10/42/kitties-304268_960_720.png',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

export const {} = authSlice.actions;

export default authSlice.reducer;
