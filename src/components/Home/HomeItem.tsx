import React, { useEffect } from 'react';
import {
  Grid,
  Stack,
  Box,
  styled,
  BoxProps,
  Typography,
  TypographyProps,
  IconButton,
} from '@mui/material';
import ItemProfileImg from './HomeProfileImg';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import GetAppIcon from '@mui/icons-material/GetApp';
import { TweetList } from './type';
import { useAppDispatch } from '../../store/hooks';
import { tweetDeleteData } from '../../store/tweet';
import { useHistory, useLocation, useParams } from 'react-router-dom';

interface ItemTxt extends TypographyProps {
  isname?: number;
  path: number;
}

interface BoxItem extends BoxProps {
  path?: number;
}

const Item = styled(Box)<BoxItem>(({ path }) => ({
  backgroundColor: '#fff',
  width: '100%',
  height: '100%',
  padding: '12px 16px',
  borderBottom: '1px solid #eee',
  transition: 'esea-out 0.2s',
  cursor: path ? 'auto' : 'pointer',
  '&:hover': {
    backgroundColor: path ? '#fff' : '#eee',
  },
}));

const ItemTxt = styled(Typography)<ItemTxt>(({ isname, path }) => ({
  fontWeight: isname ? 'bold' : '500',
  color: path ? (isname ? '#000' : '#444') : isname ? '#000' : '#777',
  fontSize: isname ? '15px' : '14px',
  lineHeight: '1',
}));
ItemTxt.defaultProps = {
  isname: 0,
};

const TxtLine = styled('div')(({ theme }) => ({
  ...theme.typography.body1,
  minHeight: '18px',
  lineHeight: '1.5',
}));

const ImgLine = styled('div')(({}) => ({
  width: '100%',
  overflow: 'hidden',
  position: 'relative',
  marginTop: '16px',
  borderRadius: '15px',
  '& .contents-img': {
    width: '100%',
  },
}));

const EditBtx = styled(Box)<BoxItem>(({ path }) => ({
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: path ? 'center' : 'flex-start',
  alignItems: 'center',
  width: '24%',
  '& .MuiBox-root': {
    width: '30px',
    height: '30px',
    position: 'relative',
    borderRadius: '100%',
    transition: 'ease-out 0.2s',
    '.MuiSvgIcon-root': {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: path ? '18px' : '14px',
    },
  },
  '.MuiTypography-body1': {
    fontSize: '14px',
  },

  '&.home-comment:hover': {
    '.MuiBox-root': {
      backgroundColor: '#CAEAF0',
      color: '#50C5F0',
    },
    '.MuiTypography-body1': {
      color: '#50C5F0',
    },
  },
  '&.home-retweet:hover': {
    '.MuiBox-root': {
      backgroundColor: '#FEC6B9',
      color: '#FF8465',
    },
    '.MuiTypography-body1': {
      color: '#FF8465',
    },
  },
  '&.home-like:hover': {
    '.MuiBox-root': {
      backgroundColor: '#E0B2EB',
      color: '#BC51EB',
    },
    '.MuiTypography-body1': {
      color: '#BC51EB',
    },
  },
  '&.home-down:hover': {
    '.MuiBox-root': {
      backgroundColor: '#E8FFDB',
      color: '#49D296',
    },
    '.MuiTypography-body1': {
      color: '#49D296',
    },
  },
}));

const HomeItem = (props: TweetList) => {
  const { id, userId, nickName, userEmail, createDate, contents, profileImg } = props;
  const [path, setPath] = React.useState<number>(0);
  const imgWidth = path ? 70 : 65;
  const textArr = contents.text;
  const location = useLocation().pathname;
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
  const link = location.split('/');
  const history = useHistory();
  const dispatch = useAppDispatch();
  const tweetDelete = () => {
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
        {path ? '' : <ItemProfileImg imgWidth={imgWidth} profileImg={profileImg} />}
        <Stack sx={{ width: path ? '100%' : `calc(100% - ${imgWidth}px)` }}>
          <Grid container gap="10px" alignItems="center" paddingBottom={path ? '16px' : '0px'}>
            {!path ? '' : <ItemProfileImg imgWidth={imgWidth} profileImg={profileImg} />}
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
              <img
                className="contents-img"
                src="https://cdn.pixabay.com/photo/2019/04/23/09/08/animal-4148904_960_720.jpg"
                alt=""
              />
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

          {path ? (
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
          ) : (
            ''
          )}

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
        </Stack>
      </Grid>
    </Item>
  );
};

export default HomeItem;
