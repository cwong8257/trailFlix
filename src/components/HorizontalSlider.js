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
  margin-bottom: 2rem;
`;

const Title = styled.div`
  color: #e5e5e5;
  text-decoration: none;
  margin-bottom: 0.2rem;
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
  @media (min-width: 1200px) {
    width: 16.1vw;
  }
`;

const Hidden = styled.div`
  position: absolute;
  bottom: 0.1rem;
  right: -4.5rem;
  opacity: 0;
`;

const Tile = styled.div`
  position: relative;
  margin-right: 0.2rem;
  display: inline-block;

  &:hover {
    animation: ${getBig} 0.3s 0.1s both;
    z-index: 1;
  }
`;

const TextBox = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0.8rem;
  margin: 0;
  color: #fff;
  text-decoration: none;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 1) 100%);
  opacity: 1;
  width: 100%;
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
            <Typography color="inherit" variant="subheading" component="span">
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
                <TextBox>
                  <Typography color="inherit" variant="caption" component="span">
                    {title}
                  </Typography>
                </TextBox>
              </Link>
            </Tile>
          ))}
        </Slider>
      </Wrapper>
    );
  }
}

export default HorizontalSlider;
