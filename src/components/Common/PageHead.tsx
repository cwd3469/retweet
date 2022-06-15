import { Box, BoxProps, styled, Grid, IconButton } from '@mui/material';
import StarPurple500Icon from '@mui/icons-material/StarPurple500';
import Typography, { TypographyProps } from '@mui/material/Typography';

const HeadBox = styled(Box)<BoxProps>(({}) => ({
  position: 'sticky',
  top: '0px',
  left: '0px',
  backgroundColor: 'rgba( 255, 255, 255, 0.97 )',
  width: '100%',
  padding: '8px 16px',
  zIndex: 10,
  borderRight: '1px solid #eee',
}));

interface Props {
  pageName: string;
}

export const HeadTxt = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 'bold',
}));

const PageHead = (props: Props) => {
  const { pageName } = props;

  return (
    <HeadBox>
      <Grid container direction="row" justifyContent="space-between" alignItems="center">
        <HeadTxt variant="h6">{pageName}</HeadTxt>
        <IconButton>
          <StarPurple500Icon />
        </IconButton>
      </Grid>
    </HeadBox>
  );
};

export default PageHead;
