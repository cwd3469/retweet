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
      <MainBody bodyWidth={info.width}>
        <>
          <PageHead pageName={info.name} />
          <Home />
        </>
      </MainBody>
      <Grid item sx={{ width: `calc(100% - ${info.width})` }}>
        <NavigationSub />
      </Grid>
    </>
  );
};

export default HomePage;
