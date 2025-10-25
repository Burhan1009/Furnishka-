
import { Children } from 'react';
import Slider from 'react-slick';

function SamplePrevArrow(props: {
    className?: any;
    style?: any;
    onClick?: any;
  }) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "flex",
          background: "white",
          height: 36,
          width: 27,
          placeItems: "center",
          top: "25%",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={onClick}
      >
        <img src={"/static/images/arrow-pre.svg"} />
      </div>
    );
  }
  function SampleNextArrow(props: {
    className?: any;
    style?: any;
    onClick?: any;
  }) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "flex",
          background: "white",
          height: 36,
          width: 27,
          placeItems: "center",
          top: "25%",
          justifyContent: "center",
          alignItems: "center",
          right: 0,
        }}
        onClick={onClick}
      >
        <img src={"/static/images/vectorR.svg"} />
      </div>
    );
  }
const CustomSlider = ({ value, onChange, isFetchingNextPage,Children }) => {
  const settings = {
    // Configure your slider settings as needed
    infinite: true,
    speed: 3000,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    afterChange: (currentSlide) => {
      // Check if the user has reached the end of the slider and fetch the next page
      if (currentSlide === value - 1 && !isFetchingNextPage) {
        onChange(currentSlide + 1);
      }
    },
  };

  return (
    <Slider {...settings} >
    {Children}
    </Slider>
  );
};

export default CustomSlider;
