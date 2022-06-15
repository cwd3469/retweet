import * as React from 'react';
import {
  HomeRounded,
  Explore,
  NotificationsNoneRounded,
  BookmarkBorderRounded,
  ListAltOutlined,
  PermIdentityOutlined,
  MoreOutlined,
} from '@mui/icons-material';

import { Box, Stack, IconButton, BoxProps } from '@mui/material';
import HeaderMenu from './HeaderMenu';
import { useHistory } from 'react-router-dom';
import { styled } from '@mui/material/styles';

export interface MenusProps {
  icon: JSX.Element;
  text: string;
  path: string | null;
  active: boolean;
}

interface MenuBoxProps extends BoxProps {
  width: string;
}

interface Props {
  width: string;
}

function LogoIcon() {
  const history = useHistory();
  return (
    <IconButton
      sx={{ width: '50px', height: '50px', padding: '10px' }}
      color="primary"
      onClick={() => {
        history.push('/');
      }}
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Twitter-logo.svg"
        alt="트위터 로고"
      />
    </IconButton>
  );
}

const MenuBox = styled(Box)<MenuBoxProps>(({ width }) => ({
  backgroundColor: '#fff',
  borderRight: '#eee solid 1px',
  height: '100%',
  width: width,
  backfaceVisibility: 'hidden',
  top: '0px',
  position: 'fixed',
}));

const Header = (props: Props) => {
  const { width } = props;
  const booArr = Array(7).fill(false);
  const [active, setActive] = React.useState<boolean[]>(booArr);
  const handleActive = (num: number) => {
    const newArr: boolean[] = active.map((menu, idx) => {
      return idx == num ? (menu = true) : (menu = false);
    });
    setActive(newArr);
  };
  const menus: MenusProps[] = [
    {
      icon: <HomeRounded />,
      text: 'Home',
      path: '/',
      active: active[0],
    },
    {
      icon: <Explore />,
      text: 'Explore',
      path: '/explore',
      active: active[1],
    },
    {
      icon: <NotificationsNoneRounded />,
      text: 'Notifications',
      path: '/notifications',
      active: active[2],
    },
    {
      icon: <BookmarkBorderRounded />,
      text: 'bookmarks',
      path: '/bookmarks',
      active: active[3],
    },
    {
      icon: <ListAltOutlined />,
      text: 'Lists',
      path: '/lists',
      active: active[4],
    },
    {
      icon: <PermIdentityOutlined />,
      text: 'Profile',
      path: '/profile',
      active: active[5],
    },
    {
      icon: <MoreOutlined />,
      text: 'More',
      path: null,
      active: active[6],
    },
  ];

  return (
    <Stack sx={{ width: width, alignItems: 'flex-end', flexGrow: 1 }}>
      <MenuBox width={width}>
        <Stack gap="5px">
          <LogoIcon />
          {menus.map((menu, idx) => {
            return (
              <HeaderMenu
                key={idx}
                icon={menu.icon}
                text={menu.text}
                path={menu.path}
                handleActive={handleActive}
                active={menu.active}
                index={idx}
              />
            );
          })}
        </Stack>
      </MenuBox>
    </Stack>
  );
};

export default Header;
