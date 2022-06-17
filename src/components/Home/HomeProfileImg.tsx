import { Box, IconButton, Avatar } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';

interface Props {
  imgWidth: number;
  profileImg: string;
  userId?: string;
}

const HomeProfileImg = (props: Props) => {
  const { imgWidth, profileImg, userId } = props;
  const history = useHistory();
  const round = `${imgWidth - 15}px`;

  return (
    <Box
      sx={{
        padding: '5px 5px 5px 10px',
      }}
    >
      <IconButton
        sx={{ width: round, height: round }}
        color="primary"
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          event.stopPropagation();
          history.push(`/profile/${userId}`);
        }}
      >
        <Avatar src={profileImg} sx={{ width: round, height: round }} alt="트위터 로고" />
      </IconButton>
    </Box>
  );
};

export default HomeProfileImg;
