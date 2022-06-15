import { Box, IconButton, Avatar } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';

interface Props {
  imgWidth: number;
  profileImg: string;
}

const HomeProfileImg = (props: Props) => {
  const { imgWidth, profileImg } = props;
  const history = useHistory();

  const round = `${imgWidth - 15}px`;

  return (
    <Box
      sx={{
        padding: '5px 5px 5px 10px',
      }}
    >
      <IconButton
        sx={{ width: round, height: round, padding: '2px' }}
        color="primary"
        onClick={() => {
          history.push('/profile');
        }}
      >
        <Avatar src={profileImg} alt="트위터 로고" />
      </IconButton>
    </Box>
  );
};

export default HomeProfileImg;
