import { Grid } from '@mui/material';
import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import React from 'react';
import { MenusProps } from './Header';
import { useHistory } from 'react-router-dom';

interface MunuButton extends ButtonProps {
  active?: number;
}

const MunuButton = styled(Button)<MunuButton>(({ active }) => ({
  color: '#000',
  borderRadius: '50px',
  padding: '10px 30px 10px 14px',
  fontSize: '18px',
  fontWeight: active ? 'bold' : '400',
  '&:hover': {
    backgroundColor: '#eee',
  },
}));

interface MenusIconProps extends MenusProps {
  index: number;
  handleActive: (num: number) => void;
}

const HeaderMenu = (props: MenusIconProps) => {
  const { icon, text, path, handleActive, index, active } = props;
  const history = useHistory();
  return (
    <Grid>
      <MunuButton
        active={active ? 1 : 0}
        onClick={() => {
          handleActive(index);
          if (path !== null) {
            history.push(path);
          }
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap="20px"
        >
          {icon}
          <div>{text}</div>
        </Grid>
      </MunuButton>
    </Grid>
  );
};
HeaderMenu.defaultProps = {
  active: false,
};

export default HeaderMenu;
