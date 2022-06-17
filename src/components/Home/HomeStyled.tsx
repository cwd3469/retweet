import { TypographyProps, Box, styled, BoxProps, Typography } from '@mui/material';

interface ItemTxt extends TypographyProps {
  isname?: number;
  path: number;
}

interface BoxItem extends BoxProps {
  path?: number;
}

export const Item = styled(Box)<BoxItem>(({ path }) => ({
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

export const ItemTxt = styled(Typography)<ItemTxt>(({ isname, path }) => ({
  fontWeight: isname ? 'bold' : '500',
  color: path ? (isname ? '#000' : '#444') : isname ? '#000' : '#777',
  fontSize: isname ? '15px' : '14px',
  lineHeight: '1',
}));
ItemTxt.defaultProps = {
  isname: 0,
};

export const TxtLine = styled('div')(({ theme }) => ({
  ...theme.typography.body1,
  minHeight: '18px',
  lineHeight: '1.5',
}));

export const ImgLine = styled('div')(({}) => ({
  width: '100%',
  overflow: 'hidden',
  position: 'relative',
  marginTop: '16px',
  borderRadius: '15px',

  border: '1px solid #eee',
  '& .contents-img': {
    width: '100%',
  },
}));

export const EditBtx = styled(Box)<BoxItem>(({ path }) => ({
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
