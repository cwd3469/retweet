import { Box, Stack } from '@mui/material';
import React, { useState } from 'react';
import HomeWrite from './HomeWrite';
import HomeItem from './HomeItem';
import '../../assets/home.scss';
import { TweetList } from './type';
import { useAppSelector } from '../../store/hooks';

const Home = () => {
  const items: Array<TweetList> | [] = useAppSelector((state) => state.tweet.tweet);
  return (
    <Stack sx={{ borderRight: '1px solid #eee' }}>
      <HomeWrite />
      {items.map((item, index) => {
        return (
          <HomeItem
            key={index}
            id={item.id}
            userId={item.userId}
            profileImg={item.profileImg}
            nickName={item.nickName}
            userEmail={item.userEmail}
            createDate={item.createDate}
            contents={item.contents}
          />
        );
      })}
    </Stack>
  );
};

export default Home;
