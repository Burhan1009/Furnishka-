import {
  selectAccessToken,
  selectAppliedCoupon,
  selectAuth,
} from "@/service/auth/globalstate";
import {
  selectAddCartLoading,
  selectCartWithoutLogin,
  selectUserCart,
} from "@/service/cart";
import Skeleton from "@mui/material/Skeleton";
import {
  addToCart,
  clearCart,
  decreaseCart,
  removeFromCart,
} from "@/service/cart/cart";
import { cartActions } from "@/service/cart/states";
import { useGetHeaderCoupon } from "@/service/home";
import { useAddToWishlist } from "@/service/Profile";
import { RootState } from "@/service/store";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Cart_Item from "./Cart-Item";
import PriceDetails from "./PriceDetails";

import Cart_Item2_Mobile from "./Cart_Item2_Mobile";
import PriceDetailsMobile from "./PriceDetailsMobile";
import CouponMobile from "./CouponMobile";
import Login from "../global/Login";

function Main() {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const authData = auth?.length > 0 ? auth[0] : "";
  const cartITem = useSelector(selectCartWithoutLogin);
  const getUserCart = useSelector(selectUserCart);
  const couponAppliedSuccess = useSelector(selectAppliedCoupon);

  const token = useSelector(selectAccessToken);
  const [pinValue, setPinValue] = React.useState("");
  const [pinError, setPinError] = React.useState("");
  const { cartItems } = useSelector((state: RootState) => state.carts);

  const isLoading = useSelector(selectAddCartLoading);

  const { data } = useGetHeaderCoupon();

  const {
    mutate: addTowishlist,
    isSuccess,
    data: message,
  } = useAddToWishlist();

  const headerDiscount = data?.data ?? {};
  React.useEffect(() => {
    if (token && cartItems.length > 0 && authData.user_id) {
      const cartVal = cartItems.map((item) => {
        const val = {
          product_id: item.product_id ?? "",
          qty: item.qty ?? "",
          user_id: authData?.user_id ?? "",
        };

        dispatch(cartActions.addCart(val));
      });
      dispatch(clearCart());
    }
  }, [token, cartItems]);

  React.useEffect(() => {
    if (!token) {
      dispatch(cartActions.postCartWithoutLogin(cartItems));
    }
  }, [token, cartItems]);
  // React.useEffect(() => {
  //   if (authData?.user_id) {
  //     dispatch(cartActions.getUserCart(authData?.user_id));
  //   }
  // }, []);
  React.useEffect(() => {
    if (isSuccess && message?.success) {
      toast.success(message?.message);
    }
  }, [isSuccess, message]);

  const handleApplyPincode = () => {
    if (pinValue?.length == 6 && pinValue.match(/^(?!0{6})[0-9]{6}$/)) {
      setPinError("Shipping is available in this area.");
    } else {
      setPinError("Enter valid pincode");
    }
  };
  const [isOpen, setIsOpen] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
    setShow(false);
  };

  const handleAddWishList = (product_id) => {
    const body = {
      product_id: product_id,
      user_id: authData?.user_id,
    };
    addTowishlist(body);
  };

  const handleUserCartDelete = (product_id) => {
    const body = {
      userId: authData?.user_id,
      productId: product_id,
    };
    dispatch(cartActions.deleteUserCart(body));
  };

  const handleAddQty = (qty, product_id) => {
    const qtyAdd =
      getUserCart?.length &&
      getUserCart?.filter((item) => item.product_id == product_id);

    const addNew = {
      product_id: qtyAdd[0]?.product_id ?? "",
      qty: qtyAdd[0]?.qty + 1 ?? "",
      user_id: authData?.user_id ?? "",
    };
    dispatch(cartActions.addCart(addNew));
  };

  const handleMinusQty = (qty, product_id) => {
    const qtyAdd =
      getUserCart?.length &&
      getUserCart?.filter((item) => item.product_id == product_id);

    const lessNew = {
      product_id: qtyAdd[0]?.product_id ?? "",
      qty: qty <= 1 ? 1 : qtyAdd[0]?.qty - 1 ?? "",
      user_id: authData?.user_id ?? "",
    };
    dispatch(cartActions.addCart(lessNew));
  };
  const handleLocalMinus = (qty, product_id) => {
    const qtyAdd =
      cartItems?.length &&
      cartItems?.filter((item) => item.product_id == product_id);

    const lessNew = {
      product_id: qtyAdd[0]?.product_id ?? "",
      qty: qty,
    };
    dispatch(decreaseCart(lessNew));
  };

  const handleAddLocal = (qty, product_id) => {
    const qtyAdd =
      cartItems?.length &&
      cartItems?.filter((item) => item.product_id == product_id);

    const lessNew = {
      product_id: qtyAdd[0]?.product_id ?? "",
      qty: 1,
    };

    dispatch(addToCart(lessNew));
  };

  const handleDelete = (product_id) => {
    const qtyAdd =
      cartItems?.length &&
      cartItems?.filter((item) => item.product_id == product_id);

    const deleValue = {
      product_id: qtyAdd[0]?.product_id ?? "",
      qty: qtyAdd[0]?.qty ?? "",
    };

    dispatch(removeFromCart(deleValue));
  };
  const itemQty =
    cartITem?.length &&
    cartITem?.map((item) => item.qty)?.reduce((a, b) => a + b);

  const offerPrize =
    cartITem?.length &&
    cartITem?.map(
      (item) =>
        (headerDiscount?.rate
          ? headerDiscount?.coupon_code_type == 2
            ? (item.sale_price * headerDiscount?.rate) / 100
            : item.sale_price - headerDiscount?.rate
          : item.sale_price) * item.qty
    );

  const retailDiscount = Array.isArray(offerPrize)
    ? offerPrize.reduce((acc, b) => {
        if (typeof b === "number") {
          return acc + b;
        }
        return acc;
      }, 0)
    : 0;

  return (
    <>
      {isLoading ? (
        <div className="container2 ">
          <div className="row">
            <div className="col-lg-8">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Skeleton
                  style={{
                    height: 40,
                    marginBottom: "3%",
                    width: "20%",
                    marginTop: 25,
                  }}
                />
                <Skeleton
                  style={{
                    height: 60,
                    marginBottom: "3%",
                    width: "50%",
                    marginTop: 20,
                  }}
                />
              </div>
              <div className="row" style={{ marginBottom: "4%" }}>
                <div className="col-4 col-sm-3 col-md-2 col-lg-2">
                  <Skeleton
                    variant="rectangular"
                    width={"100%"}
                    height={0}
                    style={{ paddingTop: 95, marginRight: 1 }}
                  />
                </div>
                <div className="col-8 col-sm-9 col-md-10 col-lg-10">
                  <Skeleton
                    style={{
                      height: 20,
                      marginBottom: "1%",
                      width: "100%",
                    }}
                  />
                  <Skeleton
                    style={{
                      height: 20,
                      marginBottom: "1%",
                      width: "80%",
                    }}
                  />
                  <Skeleton
                    style={{
                      height: 20,
                      marginBottom: "1%",
                      width: "60%",
                    }}
                  />
                </div>
              </div>
              <div className="row" style={{ marginBottom: "4%" }}>
                <div className="col-4 col-sm-3 col-md-2 col-lg-2">
                  <Skeleton
                    variant="rectangular"
                    width={"100%"}
                    height={0}
                    style={{ paddingTop: 95, marginRight: 1 }}
                  />
                </div>
                <div className="col-8 col-sm-9 col-md-10 col-lg-10">
                  <Skeleton
                    style={{
                      height: 20,
                      marginBottom: "1%",
                      width: "100%",
                    }}
                  />
                  <Skeleton
                    style={{
                      height: 20,
                      marginBottom: "1%",
                      width: "80%",
                    }}
                  />
                  <Skeleton
                    style={{
                      height: 20,
                      marginBottom: "1%",
                      width: "60%",
                    }}
                  />
                </div>
              </div>
              <div className="row" style={{ marginBottom: "4%" }}>
                <div className="col-4 col-sm-3 col-md-2 col-lg-2">
                  <Skeleton
                    variant="rectangular"
                    width={"100%"}
                    height={0}
                    style={{ paddingTop: 95, marginRight: 1 }}
                  />
                </div>
                <div className="col-8 col-sm-9 col-md-10 col-lg-10">
                  <Skeleton
                    style={{
                      height: 20,
                      marginBottom: "1%",
                      width: "100%",
                    }}
                  />
                  <Skeleton
                    style={{
                      height: 20,
                      marginBottom: "1%",
                      width: "80%",
                    }}
                  />
                  <Skeleton
                    style={{
                      height: 20,
                      marginBottom: "1%",
                      width: "60%",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4" style={{ marginTop: 29 }}>
              <Skeleton
                style={{
                  height: 20,
                  marginBottom: "3%",
                  width: "100%",
                }}
              />
              <Skeleton
                style={{
                  height: 20,
                  marginBottom: "3%",
                  width: "80%",
                }}
              />
              <Skeleton
                style={{
                  height: 20,
                  marginBottom: "3%",
                  width: "60%",
                }}
              />
              <Skeleton
                style={{
                  height: 20,
                  marginBottom: "3%",
                  width: "40%",
                }}
              />
            </div>
          </div>
        </div>
      ) : cartITem?.length > 0 ? (
        <section style={{ marginBottom: 60 }} className="Cart ">
          <div className="container2">
            <div className="row">
              <div className="col-lg-8">
                <div
                  className="d-flex justify-content-between"
                  style={{ flexWrap: "wrap" }}
                >
                  <h1
                    style={{ marginRight: 40, marginBottom: 20 }}
                    className="jost font-20576 fw-500 color-22222 main-desktop"
                  >
                    My Cart ({itemQty})
                  </h1>
                  <div
                    className="main-desktop"
                    style={{
                      flexWrap: "wrap",
                      marginRight: 12,
                      display: "flex",
                    }}
                  >
                    <p
                      style={{
                        marginTop: pinError ? 10 : 10,
                        marginBottom: 10,
                      }}
                      className="jost fw-500 color-22222 font-16234 de-text"
                    >
                      Delivery
                    </p>
                    <div>
                      <div className="pincode">
                        <input
                          className="jost"
                          onChange={(e) => {
                            setPinValue(e.target.value);
                            setPinError("");
                          }}
                          type="text"
                          placeholder="Pincode"
                        />
                        <button
                          onClick={handleApplyPincode}
                          type="submit"
                          className="jost font-14 fw-500 color-6"
                        >
                          APPLY
                        </button>
                      </div>
                      <Typography
                        sx={{
                          width: { xs: "auto", md: 300 },
                          fontSize: 12,
                          fontFamily: "Jost",

                          fontWeight: 400,
                          color:
                            pinError == "Shipping is available in this area."
                              ? "green"
                              : "red",
                          mt: 0.8,
                          ml: 0.1,
                        }}
                      >
                        {pinError}
                      </Typography>
                    </div>
                  </div>
                </div>
                <div
                  style={{ flexWrap: "wrap", marginTop: -10 }}
                  className="main-mobile"
                >
                  <div style={{ flexWrap: "wrap" }}>
                    <p
                      style={{
                        marginTop: pinError ? 10 : 10,
                        marginBottom: 10,
                      }}
                      className="jost fw-500 color-22222 font-14 de-text"
                    >
                      Enter your pincode for delivery details
                    </p>
                    <div>
                      <div className="pincode">
                        <input
                          className="jost"
                          onChange={(e) => {
                            setPinValue(e.target.value);
                            setPinError("");
                          }}
                          type="text"
                          placeholder="Pincode"
                        />
                        <button
                          onClick={handleApplyPincode}
                          type="submit"
                          className="jost font-14 fw-500 color-6"
                        >
                          APPLY
                        </button>
                      </div>
                      <Typography
                        sx={{
                          width: { xs: "auto", md: 300 },
                          fontSize: 12,
                          fontFamily: "Jost",

                          fontWeight: 400,
                          color:
                            pinError == "Shipping is available in this area."
                              ? "green"
                              : "red",
                          mt: 0.8,
                          ml: 0.1,
                        }}
                      >
                        {pinError}
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="replace-containe-main2 main-mobile">
            <div className="border-mobile-screen-bold"></div>
          </div>
          <div className=" container2 ">
            <div className="row">
              <div className="col-lg-8">
                <div className="main-mobile ">
                  <CouponMobile />
                  <div
                    className=" d-flex"
                    style={{ marginTop: -30, marginBottom: 17 }}
                  >
                    <Typography
                      sx={{
                        color: "#222",
                        fontFamily: "Jost",
                        fontSize: 14,
                        mr: 0.5,
                      }}
                    >
                      Apply Coupon
                    </Typography>
                    <Typography
                      sx={{
                        color: "#f15a21",
                        fontFamily: "Jost",
                        fontSize: 14,
                        mr: 0.5,
                      }}
                    >
                      {" "}
                      {headerDiscount?.coupon_code}
                    </Typography>
                    <Typography
                      sx={{ color: "#222", fontFamily: "Jost", fontSize: 14 }}
                    >
                      & Get{" "}
                      {headerDiscount?.coupon_code_type == 2
                        ? `${headerDiscount?.rate}% off`
                        : headerDiscount?.rate}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-mobile">
            {couponAppliedSuccess ? (
              <div
                className="saved2 main-mobile d-flex"
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                }}
              >
                <div className="jost font-13 fw-500 text-center">
                  Congratulations! You Saved{" "}
                  {
                    retailDiscount
                      .toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })
                      .split(".")[0]
                  }{" "}
                  On This Order
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className=" container2 ">
            <div className="row">
              <div className="col-lg-8">
                <div className="main-desktop">
                  {couponAppliedSuccess ? (
                    <div className="saved ">
                      <Typography className="jost font-15 fw-500 text-center coupon-text">
                        Congratulations! You Saved{" "}
                        {
                          retailDiscount
                            .toLocaleString("en-IN", {
                              style: "currency",
                              currency: "INR",
                            })
                            .split(".")[0]
                        }{" "}
                        On This Order
                      </Typography>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>

                <div className="items ">
                  <div className="main-desktop col-md-12">
                    {cartITem?.length &&
                      cartITem?.map(function pCart(val, index) {
                        const offerPrize = headerDiscount?.rate
                          ? headerDiscount?.coupon_code_type == 2
                            ? (val.sale_price * headerDiscount?.rate) / 100
                            : val.sale_price - headerDiscount?.rate
                          : val.sale_price;
                        return (
                          <>
                            <Cart_Item
                              handleWishList={
                                token
                                  ? () => handleAddWishList(val.product_id)
                                  : undefined
                              }
                              key={index}
                              count={val.qty}
                              slug={val.slug_key}
                              imglink={val.base_image}
                              productName={val.product_name}
                              bedSize={val.bedSize}
                              finishName={val.sku}
                              alt={val.product_name}
                              title={val.product_name}
                              discountPrice={
                                (val.sale_price * val.qty)
                                  .toLocaleString("en-IN", {
                                    style: "currency",
                                    currency: "INR",
                                  })
                                  .split(".")[0]
                              }
                              savingPrice={
                                (offerPrize * val.qty)
                                  .toLocaleString("en-IN", {
                                    style: "currency",
                                    currency: "INR",
                                  })
                                  .split(".")[0]
                              }
                              IncreaseNumber={
                                token
                                  ? () => handleAddQty(val.qty, val.product_id)
                                  : () =>
                                      handleAddLocal(val.qty, val.product_id)
                              }
                              DecreaseNumber={
                                token
                                  ? () =>
                                      handleMinusQty(val.qty, val.product_id)
                                  : () =>
                                      handleLocalMinus(val.qty, val.product_id)
                              }
                              handleDelete={
                                token
                                  ? () => handleUserCartDelete(val.product_id)
                                  : () => handleDelete(val.product_id)
                              }
                              courponCode={headerDiscount?.coupon_code}
                            />
                          </>
                        );
                      })}
                  </div>
                </div>
                <div className="items main-mobile ">
                  {cartITem?.length &&
                    cartITem?.map(function pCart(val, index) {
                      const offerPrize = headerDiscount?.rate
                        ? headerDiscount?.coupon_code_type == 2
                          ? (val.sale_price * headerDiscount?.rate) / 100
                          : val.sale_price - headerDiscount?.rate
                        : val.sale_price;
                      return (
                        <>
                          <Cart_Item2_Mobile
                            handleWishList={
                              token
                                ? () => handleAddWishList(val.product_id)
                                : handleOpen
                            }
                            key={index}
                            count={val.qty}
                            slug={val.slug_key}
                            imglink={val.base_image}
                            productName={val.product_name}
                            bedSize={val.bedSize}
                            finishName={val.sku}
                            alt={val.product_name}
                            title={val.product_name}
                            discountPrice={
                              (val.sale_price * val.qty)
                                .toLocaleString("en-IN", {
                                  style: "currency",
                                  currency: "INR",
                                })
                                .split(".")[0]
                            }
                            savingPrice={
                              (offerPrize * val.qty)
                                .toLocaleString("en-IN", {
                                  style: "currency",
                                  currency: "INR",
                                })
                                .split(".")[0]
                            }
                            IncreaseNumber={
                              token
                                ? () => handleAddQty(val.qty, val.product_id)
                                : () => handleAddLocal(val.qty, val.product_id)
                            }
                            DecreaseNumber={
                              token
                                ? () => handleMinusQty(val.qty, val.product_id)
                                : () =>
                                    handleLocalMinus(val.qty, val.product_id)
                            }
                            handleDelete={
                              token
                                ? () => handleUserCartDelete(val.product_id)
                                : () => handleDelete(val.product_id)
                            }
                            courponCode={headerDiscount?.coupon_code}
                          />
                        </>
                      );
                    })}
                </div>
              </div>
              <div className="col-lg-4 price-detail-margin-gap ">
                <div className="main-desktop ">
                  <PriceDetails />
                </div>
              </div>

              <div className="col-lg-4 ">
                <div className="main-mobile">
                  <PriceDetailsMobile />
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <>
          {" "}
          <div className="container2">
            <Grid mt={10} mb={40}>
              <Typography variant="h5" align="center" className="jost">
                Your cart is currently empty.{" "}
              </Typography>
              <Link href="/">
                {" "}
                <Typography mt={5} align="center">
                  <button className="back-to-home jost">Return to shop</button>
                </Typography>
              </Link>
            </Grid>
          </div>
        </>
      )}
      <Login
        isAddDialogOpened={isOpen}
        handleCloseDialog={() => setIsOpen(false)}
      />
    </>
  );
}
export default Main;
