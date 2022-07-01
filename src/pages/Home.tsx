import { Box, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import Home from '../components/Home';
import NavigationSub from '../components/Common/NavigationSub';
import PageHead from '../components/Common/PageHead';
import MainBody from '../components/Common/MainBody';
import { useAppDispatch } from '../store/hooks';
import { tweetGetData } from '../store/tweet';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const info = {
    name: 'Home',
    width: '545px',
  };
  useEffect(() => {
    dispatch(tweetGetData());
  }, []);
  return (
    <>
      <PageHead pageName={info.name} />
      <Home />
    </>
  );
};

export default HomePage;
