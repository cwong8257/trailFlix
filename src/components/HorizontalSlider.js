import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import Typography from 'material-ui/Typography';
import styled, { keyframes } from 'styled-components';
import { withStyles } from 'material-ui/styles';

import Poster from './Poster';

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

const Hidden = styled.div`
  position: absolute;
  bottom: 0.1rem;
  right: -4.5rem;
  opacity: 0;
`;

const Slide = styled.div`
  padding-right: 4px;
`;

class HorizontalSlider extends Component {
  render() {
    const { tileData, title, link } = this.props;

    const settings = {
      infinite: true,
      slidesToScroll: 6,
      slidesToShow: 6,
      responsive: [
        {
          breakpoint: 1400,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 5
          }
        },
        {
          breakpoint: 1100,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4
          }
        },
        {
          breakpoint: 700,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 400,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }
      ]
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
        <Slider {...settings}>
          {tileData.map((tile, index) => (
            <Slide key={index}>
              <Poster {...tile} />
            </Slide>
          ))}
        </Slider>
      </Wrapper>
    );
  }
}

export default HorizontalSlider;
