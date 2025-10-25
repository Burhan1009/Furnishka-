import React from 'react';

function Card1(props: {
  imglink?: any;
  pName?: any;
  dPrice?: any;
  sPrice?: any;
  onClick?:any;
}) {
  const { imglink,onClick, pName, dPrice, sPrice } = props;
  return (
    <>
      <div style={{ overflow: 'hidden' }}>
        <div onClick={onClick} className='card1'>
          <img src={imglink} alt='loading' />
          <h3 className='font-16 jost color-22222'>{pName}</h3>
          <span style={{ color: '#000' }} className='jost font-16 fw-600'>
            ₹{dPrice}
          </span>{' '}
          <strike className='font-14'>₹{sPrice}</strike>
        </div>
      </div>
    </>
  );
}
export default Card1;
