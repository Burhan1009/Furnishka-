import { Typography } from "@mui/material";
import Link from "next/link";

const icons = {
  img2: "/static/images/verified.svg",
};

const Cart_Item2_Mobile = (props: {
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
      <div className="cart-item d-flex " style={{ overflow: "hidden" }}>
        <Link href={`/${slug}` ?? `/`}>
          <img style={{ width: 104, height: 90 }} src={imglink} alt={alt} title={title} />
        </Link>
        <div className="cart-item-content">
          <div
            className="d-flex justify-content-between"
            style={{ flexWrap: "wrap" }}
          >
            <Link href={`/${slug}` ?? `/`}>
              <div>
                <Typography
                  style={{ marginTop: 1, marginRight: 38, flexWrap: "wrap" }}
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
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography
              sx={{
                fontFamily: "Jost",
                fontSize: 13,
                fontWeight: "500",
                mr: 1.2,
              }}
            >
              Quantity
            </Typography>
            <div className="qty2 d-flex">
              <button
                className="qty-btn-minus2"
                onClick={DecreaseNumber}
                type="button"
                disabled={count == 1 ? true : false}
              >
                <i className="fa fa-minus"></i>
              </button>
              <label className="input-qty2" style={{ marginBottom: 0 }}>
                {count}
              </label>
              <button
                className="qty-btn-plus2"
                onClick={IncreaseNumber}
                type="button"
              >
                <i className="fa fa-plus"></i>
              </button>
            </div>
          </div>
          <div className="cart-rate">
            <label
              style={{}}
              className="jost font-16 color-22222 fw-600 discountPrice-tpo"
            >
              {discountPrice}
            </label>
            {productPrice && (
              <strike className="font-14 color-767676 fw-500 jost">
                ₹{productPrice}
              </strike>
            )}
          </div>

        
        </div>
      </div>
      <div className="border-cart-mobile"></div>
      {savingPrice && (
        <div
          className="d-flex savings"
          style={{ marginTop: 12, marginBottom: 7 }}
        >
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
      <div className="border-cart-mobile"></div>
      <div
        className="d-flex "
        style={{
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: 'space-evenly',
          // padding: "0px 37px",
          marginTop: 3,
        }}
      >
        <button
          onClick={handleDelete}
          className="cart-delete"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <i className="fa-regular fa-trash-can"></i>{" "}
            <div
              style={{
                fontFamily: "Jost",
                color: "#484848",
                fontSize: 14,
                marginLeft: 10,
              }}
            >
              Remove
            </div>
          </div>
        </button>
        <div style={{ color: "#EBEBEB" }}>|</div>
        {handleWishList && (
          <label
            onClick={handleWishList}
            style={{ cursor: "pointer" }}
            className="font-14 fw-normal jost wi-s"
          >
            <div
              style={{ marginTop: 12, display: "flex", alignItems: "center" }}
            >
              <i className="fa-regular fa-heart"></i>
              <div
                style={{
                  fontFamily: "Jost",
                  color: "#484848",
                  fontSize: 14,
                  marginLeft: 10,
                }}
              >
                {" "}
                Save For Later
              </div>
            </div>
          </label>
        )}
      </div>
      <div className="replace-containe-main2 main-mobile">
        <div className="border-mobile-screen-bold2"></div>
      </div>
    </>
  );
};
export default Cart_Item2_Mobile;
