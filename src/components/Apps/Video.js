import React from 'react';
import YouTube from 'react-youtube';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 56.25vw;
  max-height: 50rem;
`;

const opts = {
  width: '100%',
  height: '100%',
  playerVars: {
    autoplay: 1,
    iv_load_policy: 3,
    modestbranding: 1,
    rel: 0,
    showinfo: 0
  }
};

export default ({ videoId }) => (
  <Wrapper>
    <YouTube videoId={videoId} opts={opts} />
  </Wrapper>
);
