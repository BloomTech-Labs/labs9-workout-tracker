import React from "react";
import imgUrls from './CarouselPics'

import styled from "styled-components";

// const CarouselStyle = styled.div``;

// const Carousel = () => {
//   return <CarouselStyle>Carousel</CarouselStyle>;
// };

class Carousel extends React.Component {
	constructor (props) {
		super(props);
		
		this.state = {
			currentImageIndex: 0
		};
		
		this.nextSlide = this.nextSlide.bind(this);
		this.previousSlide = this.previousSlide.bind(this);
  }
  
  previousSlide () {
    const lastIndex = imgUrls.length - 1;
    const { currentImageIndex } = this.state;
    const shouldResetIndex = currentImageIndex === 0;
    const index =  shouldResetIndex ? lastIndex : currentImageIndex - 1;
    
    this.setState({
      currentImageIndex: index
    });
  }
  
  nextSlide () {
    const lastIndex = imgUrls.length - 1;
    const { currentImageIndex } = this.state;
    const shouldResetIndex = currentImageIndex === lastIndex;
    const index =  shouldResetIndex ? 0 : currentImageIndex + 1;
  
    this.setState({
      currentImageIndex: index
    });
  }
  
  render () {

    const Arrow = ({ direction, clickFunction, glyph }) => (
      <div 
        className={ `slide-arrow ${direction}` } 
        onClick={ clickFunction }>
        { glyph } 
      </div>
      );
      
      const ImageSlide = ({ url }) => {
      const styles = {
        backgroundImage: `url(${url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      };
      
      return (
        <div className="image-slide" style={styles}></div>
      );
      }
    return (
      <div className="carousel">
        <Arrow direction="left" clickFunction={ this.previousSlide } glyph="&#9664;" />
        <ImageSlide url={ imgUrls[this.state.currentImageIndex] } />
        <Arrow direction="right" clickFunction={ this.nextSlide } glyph="&#9654;" />
      </div>
    );
  }
}

export default Carousel;
