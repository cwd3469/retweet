import { Grid, Box, TextareaAutosize } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';

import HomeProfileImg from './HomeProfileImg';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Tweet } from './type';
import { tweetPosting } from '../../store/tweet';
import { formatDate } from '../../utils/time';
import HomeEditOptions from './HomeEditOptions';
import HomeviewerSelect from './HomeviewerSelect';
import { ImgLine } from './HomeStyled';

const HomeWrite = () => {
  const dispatch = useAppDispatch();
  const authInfo = useAppSelector((state) => state.auth.userInfo);
  const imgWidth = 70;
  const [view, setView] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);
  const [url, setUrl] = useState<string>('');
  const handlingUrl = (imageUrl: string) => {
    setDisabled(true);
    setUrl(imageUrl);
  };

  const tweetChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    const value = (event.target as unknown as HTMLInputElement).value;
    console.log(value);

    if (value.length === 0) {
      setDisabled(true);
      setText('');
    } else {
      setDisabled(false);
      setText(value);
    }
  };

  const tweetSummit = () => {
    const date = new Date();
    const textArr = text.split('\n');
    const tweetInfo: Tweet = {
      userId: authInfo.userId,
      nickName: authInfo.nickName,
      userEmail: authInfo.userEmail,
      profileImg: authInfo.profileImg,
      createDate: formatDate(date),
      contents: {
        text: textArr,
        image: url,
      },
      timestamp: date,
    };
    dispatch(tweetPosting(tweetInfo));
    setText('');
    setUrl('');
    setDisabled(true);
  };

  return (
    <Box sx={{ backgroundColor: '#fff', width: '100%', borderBottom: '1px solid #eee' }}>
      <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">
        <HomeProfileImg imgWidth={imgWidth} profileImg={authInfo.profileImg} />
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{ width: `calc(100% - ${imgWidth}px)` }}
        >
          <Box sx={{ paddingTop: '14px' }}></Box>
          <Box
            onClick={() => {
              setView(true);
            }}
          >
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="What's heppening?"
              className="home_write"
              value={text}
              onChange={tweetChange}
            />
            {url ? (
              <ImgLine>
                <img className="contents-img" src={url} alt="" />
              </ImgLine>
            ) : (
              ''
            )}
          </Box>

          {view ? (
            <>
              <HomeviewerSelect />
            </>
          ) : (
            <></>
          )}

          <HomeEditOptions
            tweetSummit={tweetSummit}
            handlingUrl={handlingUrl}
            disabled={disabled}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomeWrite;
