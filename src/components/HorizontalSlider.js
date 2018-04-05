import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import Typography from 'material-ui/Typography';
import styled, { keyframes } from 'styled-components';
import { withStyles } from 'material-ui/styles';

const getBig = keyframes`
  from {
    transform: scale(1, 1);
  }
  to {
    transform: scale(1.1, 1.1);
  }
`;

const unhide = keyframes`
  from {
    opacity: 0;
    transform: translateX(-1rem);
  }
  to {
    opacity: 1;
    transform: translate(0);
  }
`;

const Wrapper = styled.div`
  background-color: inherit;
  color: #e5e5e5;
  margin-bottom: 3.6rem;
`;

const Title = styled.div`
  color: #e5e5e5;
  text-decoration: none;
  margin-bottom: 0.5rem;
  display: inline-block;
  position: relative;

  &:hover {
    color: white;

    & div {
      animation: ${unhide} 1s both;
    }
  }
`;

const Image = styled.img`
  width: 40.15vw;

  @media (min-width: 500px) {
    width: 30vw;
  }
  @media (min-width: 900px) {
    width: 23.2vw;
  }
  @media (min-width: 1100px) {
    width: 18.7vw;
  }
  @media (min-width: 1400px) {
    width: 16.1vw;
  }
  @media (min-width: 1800px) {
    width: 13.7vw;
  }
`;

const Hidden = styled.div`
  position: absolute;
  bottom: 0.1rem;
  right: -4.5rem;
  opacity: 0;
`;

const Tile = styled.div`
  margin-right: 0.3rem;
  display: inline-block;

  &:hover {
    animation: ${getBig} 0.3s 0.1s both;
    z-index: 1;
  }
`;

class HorizontalSlider extends Component {
  render() {
    const { tileData, title, link } = this.props;

    const settings = {
      infinite: true,
      slidesToScroll: 1,
      variableWidth: true
    };
    return (
      <Wrapper>
        <Link to={`${link}`}>
          <Title>
            <Typography color="inherit" variant="title" component="span">
              {title}
            </Typography>
            <Hidden>
              <Typography color="inherit" variant="caption" component="span">
                Explore All &gt;
              </Typography>
            </Hidden>
          </Title>
        </Link>
        <Slider class {...settings}>
          {tileData.map(({ id, img, title }) => (
            <Tile key={img}>
              <Link to={`/movie/${id}`}>
                <Image src={img} alt={title} />
              </Link>
            </Tile>
          ))}
        </Slider>
      </Wrapper>
    );
  }
}

export default HorizontalSlider;
