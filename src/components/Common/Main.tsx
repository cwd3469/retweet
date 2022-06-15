import { Box, Grid } from '@mui/material';
import React from 'react';

interface Props {
  children: JSX.Element;
  width: string;
}
const Main = (props: Props) => {
  const { children, width } = props;
  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        width: `calc(100% - ${width})`,
      }}
    >
      <Grid
        container
        width={'100%'}
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        {children}
      </Grid>
    </Box>
  );
};

export default Main;
