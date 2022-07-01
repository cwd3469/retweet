import { Box, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import Home from '../components/Home';
import NavigationSub from '../components/Common/NavigationSub';
import PageHead from '../components/Common/PageHead';
import MainBody from '../components/Common/MainBody';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { tweetDetailGetData } from '../store/tweet';
import { useParams } from 'react-router-dom';
import HomeItem from '../components/Home/HomeItem';
import { Tweet } from '../components/Home/type';
import { DocumentData } from 'firebase/firestore';

const TweetPage = () => {
  const dispatch = useAppDispatch();
  const info = {
    name: 'Tweet',
    width: '545px',
  };
  const tweetid = useParams<{ tweetid: string }>().tweetid;
  useEffect(() => {
    dispatch(tweetDetailGetData(tweetid));
  }, []);

  const items: Array<DocumentData> | [] = useAppSelector((state) => state.tweet.tweet);
  const item = items[0];
  console.log(item);

  return (
    <>
      <PageHead pageName={info.name} />
      <Box sx={{ borderRight: '1px solid #eee' }}>
        {item !== undefined ? (
          <HomeItem
            id={item.id}
            userId={item.userId}
            profileImg={item.profileImg}
            nickName={item.nickName}
            userEmail={item.userEmail}
            createDate={item.createDate}
            contents={item.contents}
          />
        ) : (
          <></>
        )}
      </Box>
    </>
  );
};

export default TweetPage;
