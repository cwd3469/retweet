import React from 'react';
import { Box, Grid } from '@mui/material';

interface Props {
  children: JSX.Element;
  bodyWidth: string;
}

const MainBody = (props: Props) => {
  return (
    <Grid item width={props.bodyWidth}>
      <Box
        sx={{
          position: 'relative',
        }}
      >
        {props.children}
      </Box>{' '}
    </Grid>
  );
};

export default MainBody;
