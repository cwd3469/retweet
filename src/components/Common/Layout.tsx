import { Box, Container, CssBaseline, Grid } from '@mui/material';
import React from 'react';
import Header from './Header';
import NavigationSub from './NavigationSub';
import MainBody from './MainBody';

interface Props {
  children: JSX.Element;
}
const Layout = (props: Props) => {
  const { children } = props;
  const headerWidth = '260px';
  const mainWidth = '545px';
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
          <Box
            sx={{
              backgroundColor: '#fff',
              width: `calc(100% - ${headerWidth})`,
            }}
          >
            <Grid
              container
              width={'100%'}
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <MainBody bodyWidth={mainWidth}>{children}</MainBody>
              <Grid item sx={{ width: `calc(100% - ${mainWidth})` }}>
                <NavigationSub />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Container>
    </>
  );
};

export default Layout;
