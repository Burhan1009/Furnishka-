import React from 'react';
import Slider from 'react-slick';

const icons = {
  img1: '/static/images/star.svg',
};

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
        display: 'flex',
        background: 'white',
        height: 36,
        width: 27,
        placeItems: 'center',
        top: 25,
        cursor:"pointer"
      }}
      onClick={onClick}>
      <i className='fa-solid fa-angle-left text-center font-16 ms-2'></i>
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
        display: 'flex',
        background: 'white',
        height: 36,
        width: 27,
        placeItems: 'center',
        top: 25,
        right: 0,
      }}
      onClick={onClick}>
      <i className='fa-solid fa-angle-right text-center font-16 ms-2'></i>
    </div>
  );
}
function TestimonialMobile() {
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows:false,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: 'linear',
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          //dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
    
      <section className='section-14 '  >
        <div className='container'>
          <div className='row'>
            <Slider {...settings}>
              <div>
                <div className='star d-flex'>
                  <img src={icons['img1']} alt='' />
                  <h1 className='jost fw-700'>Lorem ipsum</h1>
                </div>
              </div>
              <div>
                <div className='star d-flex'>
                  <img src={icons['img1']} alt='' />
                  <h1 className='jost fw-700'>Lorem ipsum</h1>
                </div>
              </div>
              <div>
                <div className='star d-flex'>
                  <img src={icons['img1']} alt='' />
                  <h1 className='jost fw-700'>Lorem ipsum</h1>
                </div>
              </div>
              <div>
                <div className='star d-flex'>
                  <img src={icons['img1']} alt='' />
                  <h1 className='jost fw-700'>Lorem ipsum</h1>
                </div>
              </div>
              <div>
                <div className='star d-flex'>
                  <img src={icons['img1']} alt='' />
                  <h1 className='jost fw-700'>Lorem ipsum</h1>
                </div>
              </div>
              <div>
                <div className='star d-flex'>
                  <img src={icons['img1']} alt='' />
                  <h1 className='jost fw-700'>Lorem ipsum</h1>
                </div>
              </div>
              <div>
                <div className='star d-flex'>
                  <img src={icons['img1']} alt='' />
                  <h1 className='jost fw-700'>Lorem ipsum</h1>
                </div>
              </div>
              <div>
                <div className='star d-flex'>
                  <img src={icons['img1']} alt='' />
                  <h1 className='jost fw-700'>Lorem ipsum</h1>
                </div>
              </div>
              <div>
                <div className='star d-flex'>
                  <img src={icons['img1']} alt='' />
                  <h1 className='jost fw-700'>Lorem ipsum</h1>
                </div>
              </div>
              <div>
                <div className='star d-flex'>
                  <img src={icons['img1']} alt='' />
                  <h1 className='jost fw-700'>Lorem ipsum</h1>
                </div>
              </div>
              <div>
                <div className='star d-flex'>
                  <img src={icons['img1']} alt='' />
                  <h1 className='jost fw-700'>Lorem ipsum</h1>
                </div>
              </div>
              <div>
                <div className='star d-flex'>
                  <img src={icons['img1']} alt='' />
                  <h1 className='jost fw-700'>Lorem ipsum</h1>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </section>
    </>
  );
}
export default TestimonialMobile;
