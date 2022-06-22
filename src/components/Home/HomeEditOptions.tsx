import { Grid, IconButton, Button, styled, Stack } from '@mui/material';

import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import SentimentVerySatisfiedOutlinedIcon from '@mui/icons-material/SentimentVerySatisfiedOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import { getStorage, ref, uploadBytes, getDownloadURL, StorageReference } from 'firebase/storage';
import React from 'react';

const Input = styled('input')({
  display: 'none',
});

const EditButton = styled(IconButton)(({}) => ({
  color: 'rgb(29, 155, 240)',
}));
interface Props {
  handlingUrl: (imageUrl: string) => void;
  tweetSummit: () => void;
  disabled: boolean;
}

const HomeEditOptions = (props: Props) => {
  const { tweetSummit, handlingUrl, disabled } = props;
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event?.target?.files !== null ? event.target.files[0] : null;
    const storage = getStorage();
    const storageRef = ref(storage, file?.name);
    if (!file) return;
    uploadBytes(storageRef, file);
    console.log(storageRef);

    getUrl(storageRef);
  }

  const getUrl = (ref: StorageReference) => {
    getDownloadURL(ref)
      .then((url: string) => {
        handlingUrl(url);
      })
      .catch((error) => {
        console.log(error);
        if (error.code === 'storage/object-not-found') {
          getUrl(ref);
        }
      });
  };
  // const saveRoute = storageRef.child(`image/${}`);
  // const upload = saveRoute,put(file)
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ padding: '10px' }}
    >
      <Grid item>
        <label htmlFor="icon-button-file">
          <Input accept="image/*" id="icon-button-file" type="file" onChange={handleChange} />
          <EditButton aria-label="upload picture" component="span">
            <InsertPhotoOutlinedIcon />
          </EditButton>
        </label>
        <EditButton aria-label="fingerprint">
          <GifBoxOutlinedIcon />
        </EditButton>
        <EditButton aria-label="fingerprint">
          <AssessmentOutlinedIcon />
        </EditButton>
        <EditButton aria-label="fingerprint">
          <SentimentVerySatisfiedOutlinedIcon />
        </EditButton>
        <EditButton aria-label="fingerprint">
          <CalendarMonthOutlinedIcon />
        </EditButton>
        <EditButton aria-label="fingerprint">
          <FmdGoodOutlinedIcon />
        </EditButton>
      </Grid>

      <Grid item>
        <Button
          disabled={disabled}
          color="primary"
          variant="contained"
          sx={{ borderRadius: '30px', backgroundColor: 'rgb(29, 155, 240)' }}
          onClick={tweetSummit}
        >
          Tweet
        </Button>
      </Grid>
    </Grid>
  );
};

export default HomeEditOptions;
