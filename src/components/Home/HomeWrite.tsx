import {
  Grid,
  Box,
  IconButton,
  TextareaAutosize,
  Button,
  styled,
  Menu,
  MenuItem,
  ButtonProps,
  Typography,
  Stack,
  alpha,
  MenuProps,
  BoxProps,
  IconButtonTypeMap,
} from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import LanguageIcon from '@mui/icons-material/Language';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import SentimentVerySatisfiedOutlinedIcon from '@mui/icons-material/SentimentVerySatisfiedOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import HomeProfileImg from './HomeProfileImg';
import CheckIcon from '@mui/icons-material/Check';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Tweet, User } from './type';
import { tweetPosting } from '../../store/tweet';
import { formatDate } from '../../utils/time';

const ViewButton = styled(Button)<ButtonProps>(({}) => ({
  padding: '3px 10px',
  borderRadius: '15px',
  fontSize: '14px',
  textTransform: 'none',
  fontWeight: 'bold',
  color: 'rgb(29, 155, 240)',
  '& .MuiSvgIcon-root': {
    fontSize: '14px',
    marginRight: '5px',
  },
}));

const RoundBox = styled(Box)<BoxProps>(({}) => ({
  borderRadius: '100%',
  width: '30px',
  height: '30px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgb(29, 155, 240)',
}));

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 15,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '20px 0px',
    },
    '& .MuiMenuItem-root': {
      gap: '10px',
      fontSize: '14px',
      padding: '10px 14px',
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: '#fff',
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
}));

function HomeviewerSelect() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const options: { icon: JSX.Element; name: string }[] = [
    { icon: <LanguageIcon />, name: 'Everyone' },
    { icon: <AccountCircleIcon />, name: 'People you follow' },
    { icon: <AlternateEmailIcon />, name: 'Only people you mention' },
  ];
  const txt = [
    'Who can reply?',
    ' Choose who can reply to this Tweet.',
    'Anyone mentioned can always reply.',
  ];
  return (
    <Grid container sx={{ borderBottom: '1px solid #eee', padding: '5px 0' }}>
      <ViewButton
        aria-haspopup="listbox"
        aria-controls="lock-menu"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClickListItem}
      >
        {options[selectedIndex].icon}
        {`${options[selectedIndex].name} can reply`}
      </ViewButton>
      <StyledMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          borderRadius: '20px',
        }}
      >
        <Stack sx={{ padding: '0px 20px 10px' }}>
          {txt.map((item, idx) => {
            return (
              <Typography
                key={idx}
                variant={idx == 0 ? 'subtitle1' : 'subtitle2'}
                gutterBottom={idx == 0 ? true : false}
                component="div"
                sx={{ fontWeight: idx == 0 ? 'bold' : 'normal' }}
              >
                {item}
              </Typography>
            );
          })}
        </Stack>

        {options.map((option, index) => (
          <MenuItem key={index} onClick={(event) => handleMenuItemClick(event, index)}>
            <RoundBox>{option.icon}</RoundBox>
            <span>{option.name}</span>
            {index === selectedIndex ? (
              <CheckIcon sx={{ color: 'rgb(29, 155, 240) !important', marginLeft: 'auto' }} />
            ) : (
              <></>
            )}
          </MenuItem>
        ))}
      </StyledMenu>
    </Grid>
  );
}

const HomeEditOptions = (props: { tweetSummit: () => void }) => {
  const { tweetSummit } = props;
  const editoptions = [
    { icon: <InsertPhotoOutlinedIcon /> },
    { icon: <GifBoxOutlinedIcon /> },
    { icon: <AssessmentOutlinedIcon /> },
    { icon: <SentimentVerySatisfiedOutlinedIcon /> },
    { icon: <CalendarMonthOutlinedIcon /> },
    { icon: <FmdGoodOutlinedIcon /> },
  ];

  const EditButton = styled(IconButton)(({}) => ({
    color: 'rgb(29, 155, 240)',
  }));
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ padding: '10px' }}
    >
      <Grid item>
        {editoptions.map((item, idx) => {
          return (
            <EditButton key={idx} aria-label="fingerprint">
              {item.icon}
            </EditButton>
          );
        })}
      </Grid>
      <Grid item>
        <Button
          color="primary"
          variant="contained"
          sx={{ borderRadius: '30px', backgroundColor: 'rgb(29, 155, 240)' }}
          onClick={tweetSummit}
        >
          Tweet
        </Button>
      </Grid>
    </Grid>
  );
};

const HomeWrite = () => {
  const dispatch = useAppDispatch();
  const authInfo = useAppSelector((state) => state.auth.userInfo);
  const imgWidth = 70;
  const [view, setView] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const tweetChange = (event: ChangeEvent<HTMLTextAreaElement> | undefined): void => {
    if (!event) return;
    const value = (event.target as unknown as HTMLInputElement).value;
    setText(value);
  };
  const tweetSummit = () => {
    const date = new Date();

    const textArr = text.split('\n');
    const tweetInfo: Tweet = {
      userId: authInfo.userId,
      nickName: authInfo.nickName,
      userEmail: authInfo.userEmail,
      profileImg: authInfo.profileImg,
      createDate: formatDate(date),
      contents: {
        text: textArr,
        image: 'https://cdn.pixabay.com/photo/2022/06/02/18/20/knitting-7238657_1280.jpg',
      },
      timestamp: date,
    };
    dispatch(tweetPosting(tweetInfo));
  };
  return (
    <Box sx={{ backgroundColor: '#fff', width: '100%', borderBottom: '1px solid #eee' }}>
      <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">
        <HomeProfileImg imgWidth={imgWidth} profileImg={authInfo.profileImg} />
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{ width: `calc(100% - ${imgWidth}px)` }}
        >
          <Box sx={{ paddingTop: '14px' }}></Box>
          <Box
            onClick={() => {
              setView(true);
            }}
          >
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="What's heppening?"
              className="home_write"
              onChange={tweetChange}
            />
          </Box>

          {view ? (
            <>
              <HomeviewerSelect />
            </>
          ) : (
            <></>
          )}

          <HomeEditOptions tweetSummit={tweetSummit} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomeWrite;
