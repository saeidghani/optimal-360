import React from 'react';
import { Carousel } from 'antd';
import PropTypes from 'prop-types';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const _Carousel = ({ children }) => {
  const carouselRef = React.createRef();

  const onPrevious = () => {
    carouselRef.current.innerSlider.slickPrev();
  };

  const onNext = () => {
    carouselRef.current.innerSlider.slickNext();
  };
  const settings = {
    dots: true,
    infinite: true,
    slidesToScroll: 1,
    speed: 500,
    cssEase: 'linear',
    dotsClass: 'relative top-0 pt-20 mt-20',
    appendDots: (dots) => (
      <div
        style={{
          width: 150,
          margin: '0 auto',
          position: 'relative',
          top: 40,
        }}
      >
        <ul style={{ margin: '0px' }}> {dots} </ul>
      </div>
    ),
  };

  return (
    <div className="relative w-full h-full">
      <Carousel
        {...settings}
        ref={carouselRef}
        draggable
        className="c-carousel"
        style={{ height: 115 }}
      >
        {children}
      </Carousel>
      <LeftOutlined
        className="text-xs absolute left-0 pl-40"
        onClick={onPrevious}
        style={{ color: '#666ee8', bottom: 22 }}
      />
      <RightOutlined
        className="text-xs absolute right-0 pr-40"
        onClick={onNext}
        style={{ color: '#666ee8', bottom: 22 }}
      />
    </div>
  );
};

_Carousel.propTypes = {
  children: PropTypes.node.isRequired,
};

_Carousel.defaultProps = {};

export default _Carousel;
