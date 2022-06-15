import { Box, Container, CssBaseline, Grid } from '@mui/material';
import React from 'react';
import Main from './Main';
import Header from './Header';

interface Props {
  children: JSX.Element;
}
const Layout = (props: Props) => {
  const { children } = props;
  const headerWidth = '260px';
  return (
    <>
      <CssBaseline />
      <Container sx={{ maxWidth: '1200px' }}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          width={'100%'}
        >
          <Header width={headerWidth} />
          <Main width={headerWidth}>{children}</Main>
        </Grid>
      </Container>
    </>
  );
};

export default Layout;
