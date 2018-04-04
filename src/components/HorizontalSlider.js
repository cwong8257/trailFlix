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
  fron {
    opacity: 0;
    transform: translateX(10rem);
  }
  to {
    opacity: 1;
    transform: translate(0);
  }
`;

const Wrapper = styled.div`
  background-color: inherit;
  color: #e5e5e5;
  margin-bottom: 3rem;
`;

const Title = styled.div`
  display: inline-block;
  color: #e5e5e5;
  text-decoration: none;
  position: relative;
  margin-bottom: 1rem;

  &:hover {
    color: white;
  }
`;

const Hidden = styled.div`
  position: absolute;
  bottom: 0;
  right: -6rem;
`;

const Tile = styled.div`
  position: relative;
  margin-right: 4px;

  &:hover {
    animation: ${getBig} 0.3s 0.1s both;
    z-index: 1;
  }
`;

const Image = styled.img`
  @media (min-width: 540px) {
    width: 35vw;
  }
  @media (min-width: 720px) {
    width: 30vw;
  }
  @media (min-width: 960px) {
    width: 22vw;
  }
  @media (min-width: 1140px) {
    width: 15vw;
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
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 68%, rgba(0, 0, 0, 1) 100%);
  opacity: 1;
  width: 100%;
`;

class HorizontalSlider extends Component {
  state = {
    titleIsHovered: false
  };

  setButtonHovered(titleIsHovered) {
    this.setState(() => ({ titleIsHovered }));
  }

  render() {
    const { tileData, title, link } = this.props;

    const settings = {
      infinite: true,
      speed: 500,
      variableWidth: true
    };
    return (
      <Wrapper>
        <Link to={`${link}`}>
          <Title onMouseEnter={() => this.setButtonHovered(true)} onMouseLeave={() => this.setButtonHovered(false)}>
            <Typography color="inherit" variant="headline" component="span">
              {title}
            </Typography>
            <Hidden>
              <Typography color="inherit" variant="body1" component="span">
                Explore All &gt;
              </Typography>
            </Hidden>
          </Title>
        </Link>
        <Slider {...settings}>
          {tileData.map(({ id, img, title }) => (
            <Tile key={img}>
              <Link to={`/movie/${id}`}>
                <Image src={img} alt={title} />
                <TextBox>
                  <Typography color="inherit" variant="subheading" component="span">
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
