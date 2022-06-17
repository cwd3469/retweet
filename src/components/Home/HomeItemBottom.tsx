import React from 'react';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import GetAppIcon from '@mui/icons-material/GetApp';
import { Grid, Box } from '@mui/material';
import { EditBtx, ItemTxt } from './HomeStyled';

interface Props {
  path: number;
}

const HomeItemBottom = (props: Props) => {
  const { path } = props;
  const bottom = [
    {
      icon: <ChatBubbleOutlineIcon />,
      number: 180,
      class: 'home-comment',
      name: 'Retweets',
    },
    {
      icon: <AutorenewIcon />,
      number: 180,
      class: 'home-retweet',
      name: 'Quote Tweets',
    },
    {
      icon: <FavoriteBorderIcon />,
      number: 180,
      class: 'home-like',
      name: 'Likes',
    },
    {
      icon: <GetAppIcon />,
      number: 180,
      class: 'home-down',
    },
  ];

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        gap="15px"
        padding={'16px 0'}
        sx={{ borderTop: '1px solid #eee', borderBottom: '1px solid #eee' }}
      >
        {bottom.map((boo, idx) => {
          return idx !== 3 ? (
            <Grid container gap="5px" key={idx} width="auto" alignItems={'center'}>
              <ItemTxt sx={{ color: 'black' }} path={path}>
                {boo.number}
              </ItemTxt>
              <ItemTxt path={path}>{boo.name}</ItemTxt>
            </Grid>
          ) : (
            ''
          );
        })}
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        paddingTop={'16px'}
      >
        {bottom.map((boo, idx) => {
          return (
            <EditBtx key={idx} className={boo.class} path={path}>
              <Box>{boo.icon}</Box>
              {path ? '' : <ItemTxt path={path}>{boo.number}</ItemTxt>}
            </EditBtx>
          );
        })}
      </Grid>
    </>
  );
};

export default HomeItemBottom;
