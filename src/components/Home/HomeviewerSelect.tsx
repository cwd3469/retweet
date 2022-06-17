import React from 'react';
import {
  Grid,
  Box,
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
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import CheckIcon from '@mui/icons-material/Check';

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

export default HomeviewerSelect;
