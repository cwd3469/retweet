import React from 'react';
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
import { useHistory } from 'react-router-dom';

interface ItemTxt extends TypographyProps {
  isname?: number;
}

const Item = styled(Box)<BoxProps>(({}) => ({
  backgroundColor: '#fff',
  width: '100%',
  height: '100%',
  padding: '8px 16px',
  borderBottom: '1px solid #eee',
  transition: 'esea-out 0.2s',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#eee',
  },
}));

const ItemTxt = styled(Typography)<ItemTxt>(({ isname }) => ({
  fontWeight: isname ? 'bold' : '500',
  color: isname ? '#000' : '#777',
  fontSize: isname ? '15px' : '14px',
}));
ItemTxt.defaultProps = {
  isname: 0,
};
const TxtLine = styled('div')(({}) => ({
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

const EditBtx = styled(Grid)(({}) => ({
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
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
      fontSize: '14px',
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
  const textArr = contents.text;
  const imgWidth = 70;
  const bottom = [
    {
      icon: <ChatBubbleOutlineIcon />,
      number: 180,
      class: 'home-comment',
    },
    {
      icon: <AutorenewIcon />,
      number: 180,
      class: 'home-retweet',
    },
    {
      icon: <FavoriteBorderIcon />,
      number: 180,
      class: 'home-like',
    },
    {
      icon: <GetAppIcon />,
      number: 180,
      class: 'home-down',
    },
  ];
  return (
    <Item onClick={tweetRouter}>
      <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">
        <ItemProfileImg imgWidth={imgWidth} profileImg={profileImg} />
        <Stack sx={{ width: `calc(100% - ${imgWidth}px)` }}>
          <Grid container gap="10px">
            <ItemTxt isname={1}>{nickName}</ItemTxt>
            <ItemTxt>{userEmail}</ItemTxt>
            <ItemTxt>{createDate}</ItemTxt>
            <IconButton sx={{ padding: 0, marginLeft: 'auto' }} onClick={tweetDelete}>
              <MoreHorizIcon />
            </IconButton>
          </Grid>
          <Stack paddingBottom={'16px'}>
            {textArr.map((obj, idx) => {
              return <TxtLine key={idx}>{obj}</TxtLine>;
            })}

            <ImgLine>
              <img
                className="contents-img"
                src="https://cdn.pixabay.com/photo/2019/04/23/09/08/animal-4148904_960_720.jpg"
                alt=""
              />
            </ImgLine>
          </Stack>
          <Grid container direction="row" justifyContent="space-between" alignItems="center">
            {bottom.map((boo, idx) => {
              return (
                <EditBtx key={idx} className={boo.class}>
                  <Box>{boo.icon}</Box>
                  <ItemTxt>{boo.number}</ItemTxt>
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
