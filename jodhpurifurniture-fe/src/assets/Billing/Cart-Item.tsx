import { Typography } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";

const icons = {
  img2: "/static/images/verified.svg",
};

const Cart_Item = (props: {
  imglink?: any;
  productName?: any;
  bedSize?: any;
  finishName?: any;
  productPrice?: any;
  courponCode?: any;
  discountPrice?: any;
  handleDelete?: any;
  savingPrice?: any;
  handleWishList?: any;
  count?: any;
  IncreaseNumber?: any;
  DecreaseNumber?: any;
  slug?: any;
  title?: string;
  alt?: string;
}) => {
  const {
    imglink,
    productName,
    slug,
    handleWishList,
    handleDelete,
    bedSize,
    courponCode,
    finishName,
    productPrice,
    discountPrice,
    savingPrice,
    IncreaseNumber,
    DecreaseNumber,
    count,
    alt,
    title
  } = props;

  return (
    <>
      <div
        className="cart-item d-flex wrap-productName"
        style={{ overflow: "hidden" }}
      >
        <Link href={`/${slug}` ?? `/`}>
          <img style={{ width: 142 }} src={imglink} alt={alt} title={title}/>
        </Link>
        <div className="cart-item-content">
          <div
            className="d-flex justify-content-between"
            style={{ flexWrap: "wrap" }}
          >
            <Link href={`/${slug}` ?? `/`}>
              <div>
                <Typography
                  style={{ marginTop: 1, marginRight: 38 }}
                  className="font-1690746 jost fw-500 color-22222 "
                >
                  {productName}
                </Typography>
                <p
                  style={{ marginBottom: 10 }}
                  className="font-13 color-767676 jost fw-normal de-text"
                >
                  SKU: {finishName}
                </p>
              </div>
            </Link>
            {handleWishList && (
              <div>
                <label
                  onClick={handleWishList}
                  style={{ cursor: "pointer"}}
                  className="font-14 fw-normal jost wi-s"
                >
                  <i className="fa-regular fa-heart"></i> Save For Later
                </label>
              </div>
            )}
          </div>
         
          <div className="d-flex sy-t" style={{ flexWrap: "wrap" }}>
            <div className="cart-rate">
              {productPrice && (
                <strike className="font-14 color-767676 fw-500 jost">
                  ₹{productPrice}
                </strike>
              )}
              <label
                style={{}}
                className="jost font-18872 color-22222 fw-600 discountPrice-tpo"
              >
                {discountPrice}
              </label>
            </div>
            {savingPrice && (
              <div className="d-flex savings">
                <img src={icons["img2"]} alt="" />
                <div>
                  <label className="color-6 jost fw-600 font-14 mb-0">
                    Save {savingPrice}
                  </label>
                  <p className="mb-0 font-13 color-767676 jost">
                    After applying coupon "{courponCode}"
                  </p>
                </div>
              </div>
            )}

            <div className="qty ">
              <button
                className="qty-btn-minus"
                onClick={DecreaseNumber}
                type="button"
                disabled={count == 1 ? true : false}
              >
                <i className="fa fa-minus"></i>
              </button>
              <label className="input-qty">{count}</label>
              <button
                className="qty-btn-plus"
                onClick={IncreaseNumber}
                type="button"
              >
                <i className="fa fa-plus"></i>
              </button>
            </div>

            <button onClick={handleDelete} className="delete">
              <i className="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Cart_Item;
