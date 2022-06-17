import React, { useEffect } from 'react';
import { Grid, Stack, Box, IconButton } from '@mui/material';
import ItemProfileImg from './HomeProfileImg';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { Tweet } from './type';
import { useAppDispatch } from '../../store/hooks';
import { tweetDeleteData } from '../../store/tweet';
import { useHistory, useLocation } from 'react-router-dom';
import { ImgLine, ItemTxt, TxtLine, Item } from './HomeStyled';
import HomeItemBottom from './HomeItemBottom';

const HomeItem = (props: Tweet) => {
  const { id, userId, nickName, userEmail, createDate, contents, profileImg } = props;
  const [path, setPath] = React.useState<number>(0);
  const imgWidth = path ? 70 : 65;
  const textArr = contents.text;
  const imageArr = contents.image;
  const location = useLocation().pathname;

  const link = location.split('/');
  const history = useHistory();
  const dispatch = useAppDispatch();
  const tweetDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (id !== undefined) {
      dispatch(tweetDeleteData(id));
    }
  };
  const tweetRouter = () => {
    history.push(`/tweet/${id}`);
  };

  useEffect(() => {
    if (link[1] === 'tweet') {
      setPath(1);
    }
  }, [link]);

  return (
    <Item onClick={!path ? tweetRouter : () => {}} path={path}>
      <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">
        {path ? '' : <ItemProfileImg imgWidth={imgWidth} profileImg={profileImg} userId={userId} />}
        <Stack sx={{ width: path ? '100%' : `calc(100% - ${imgWidth}px)` }}>
          <Grid container gap="10px" alignItems="center" paddingBottom={path ? '16px' : '0px'}>
            {!path ? (
              ''
            ) : (
              <ItemProfileImg imgWidth={imgWidth} profileImg={profileImg} userId={userId} />
            )}
            <Grid
              container
              direction={path ? 'column' : 'row'}
              justifyContent={path ? 'center' : 'flex-start'}
              alignItems={path ? 'self-start' : 'center'}
              width={'auto'}
              gap={path ? '5px' : '10px'}
            >
              <ItemTxt isname={1} path={path}>
                {nickName}
              </ItemTxt>
              <ItemTxt path={path}>{userEmail}</ItemTxt>
            </Grid>
            {path ? '' : <ItemTxt path={path}>{createDate}</ItemTxt>}
            <IconButton sx={{ padding: 0, marginLeft: 'auto' }} onClick={tweetDelete}>
              <MoreHorizIcon />
            </IconButton>
          </Grid>
          <Stack paddingBottom={'16px'}>
            {textArr.map((obj, idx) => {
              return (
                <TxtLine key={idx} sx={{ fontSize: path ? '21px' : '16px' }}>
                  {obj}
                </TxtLine>
              );
            })}
            <ImgLine>
              <img className="contents-img" src={imageArr} alt="" />
            </ImgLine>
          </Stack>
          {!path ? (
            ''
          ) : (
            <Grid container paddingBottom={'16px'}>
              <ItemTxt path={path} sx={{ fontSize: '18px' }}>
                {createDate}
              </ItemTxt>
            </Grid>
          )}
          <HomeItemBottom path={path} />
        </Stack>
      </Grid>
    </Item>
  );
};

export default HomeItem;
