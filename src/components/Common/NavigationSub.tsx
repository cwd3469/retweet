import {
  Stack,
  InputBase,
  Box,
  styled,
  BoxProps,
  Grid,
  Typography,
  MenuItem,
  Avatar,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect, useState } from 'react';
import { HeadTxt } from './PageHead';

interface OnColor extends BoxProps {
  on: number;
}

interface SearchBox {
  id: number;
  profile: string;
  nickName: string;
}

const ColorBox = styled(Box)<OnColor>(({ on }) => ({
  backgroundColor: on ? '#fff' : '#ddd',
  width: '100%',
  padding: '10px 16px',
  borderRadius: '50px',
  position: 'relative',
  border: on ? 'solid 1px rgb(29, 155, 240)' : 'solid 1px #ddd',
  '.MuiSvgIcon-root': {
    color: on ? 'rgb(29, 155, 240)' : '#000',
  },
  '.MuiInputBase-input': {
    color: '#000',
  },
}));
ColorBox.defaultProps = {
  on: 0,
};

const PopupBox = styled(Box)<BoxProps>(({}) => ({
  backgroundColor: '#fff',
  boxShadow: '2px 2px 7px #999',
  width: '100%',
  padding: '10px 16px',
  borderRadius: '10px',
  position: 'absolute',
  left: '50%',
  top: '0',
  transform: 'translate(-50%,50px)',
  zIndex: 12,
}));

const Curtain = styled(Box)<BoxProps>(({}) => ({
  width: '100%',
  height: '100%',
  backgroundColor: '#fff',
  position: 'fixed',
  left: '0px',
  top: '0px',
  zIndex: '11',
  opacity: 0,
}));

const ListBox = styled(Box)<BoxProps>(({}) => ({
  backgroundColor: '#eee',
  width: '100%',
  padding: '10px 16px',
  borderRadius: '10px',
}));

const NavigationSub = () => {
  const [on, setOn] = useState<boolean>(false);
  const [width, setBoxWidth] = useState<string>('auto');
  const sreachBox = React.useRef<null | HTMLDivElement>(null);
  const handleClick = () => {
    setOn(true);
  };
  const handleClose = () => {
    setOn(false);
  };
  useEffect(() => {
    if (sreachBox !== null && sreachBox.current?.offsetWidth !== undefined) {
      setBoxWidth(`${sreachBox.current?.offsetWidth + 20}px`);
    }
  }, []);
  const sreachlist: Array<SearchBox> | [] = [
    {
      id: 300,
      profile: 'https://cdn.pixabay.com/photo/2022/06/07/09/33/dance-7247907_960_720.jpg',
      nickName: '이쁜발',
    },
    {
      id: 200,
      profile: 'https://cdn.pixabay.com/photo/2022/06/02/15/01/music-7238254_960_720.jpg',
      nickName: 'DJ Back',
    },
  ];
  return (
    <Stack sx={{ padding: '5px 30px' }} gap="10px">
      <ColorBox on={on ? 1 : 0} ref={sreachBox}>
        <Grid container onClick={handleClick}>
          <SearchIcon />
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Twitter"
            inputProps={{ 'aria-label': 'search google maps' }}
          />
        </Grid>
        {on ? (
          <>
            <PopupBox sx={{ width }}>
              {sreachlist === [] ? (
                <Typography variant="subtitle2" gutterBottom component="div" textAlign={'center'}>
                  Try searching for people, topics, or keywords
                </Typography>
              ) : (
                <>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <HeadTxt variant="h6">Recent</HeadTxt>
                    <Button color="error" size="small">
                      clear add
                    </Button>
                  </Grid>

                  {sreachlist.map((user, index) => {
                    return (
                      <MenuItem key={index} onClick={handleClose} sx={{ gap: '10px' }}>
                        <Avatar src={user.profile} alt={`user ${user.nickName}`} />
                        {user.nickName}
                      </MenuItem>
                    );
                  })}
                </>
              )}
            </PopupBox>
            <Curtain onClick={handleClose} />
          </>
        ) : (
          <></>
        )}
      </ColorBox>

      <ListBox sx={{ height: '200px' }}>NavigationSub</ListBox>
      <ListBox>NavigationSub</ListBox>
      <div>
        Terms of Service Privacy Policy Cookie Policy Accessibility Ads info More © 2022 Twitter,
        Inc.
      </div>
    </Stack>
  );
};

export default NavigationSub;
