import {
  selectAccessToken,
  selectAppliedCoupon,
  selectAuth,
} from "@/service/auth/globalstate";
import {
  selectAddCartLoading,
  selectCartWithoutLogin,
  selectUserAddress,
} from "@/service/cart";
import { clearCart } from "@/service/cart/cart";
import Skeleton from "@mui/material/Skeleton";
import { cartActions } from "@/service/cart/states";

import { useGetHeaderCoupon } from "@/service/home";
import { useAddToWishlist } from "@/service/Profile";
import { RootState } from "@/service/store";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import React from "react";
import { Collapse } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Login from "../global/Login";
import { BillingAddress } from "./BillingAddress";
import { BillShipAddress } from "./BillShipAddress";
import BusinessForm from "./BusinessForm";
import EditAddressform from "./EditAddressForm";
import SaveContinue from "./SaveContinue";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Summary } from "./Summary";
import CouponMobile from "./CouponMobile";
import SaveContinueMobile from "./SaveCountinueMobile";

function Checkout() {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const authData = auth?.length > 0 ? auth[0] : "";
  const cartITem = useSelector(selectCartWithoutLogin);
  const token = useSelector(selectAccessToken);
  const couponAppliedSuccess = useSelector(selectAppliedCoupon);
  const [isOpen, setIsOpen] = React.useState(false);
  const { cartItems } = useSelector((state: RootState) => state.carts);
  const isLoading = useSelector(selectAddCartLoading);
  const { data } = useGetHeaderCoupon();
  const addresses = useSelector(selectUserAddress);
  const { isSuccess, data: message } = useAddToWishlist();

  const handleLoginOpen = () => {
    setIsOpen(!isOpen);
  };

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
    if (authData.user_id) {
      dispatch(cartActions.getUserAddress(authData?.user_id));
    }
  }, [authData.user_id]);

  React.useEffect(() => {
    if (!token) {
      dispatch(cartActions.postCartWithoutLogin(cartItems));
    }
  }, [token, cartItems]);

  React.useEffect(() => {
    if (isSuccess && message?.success) {
      toast.success(message?.message);
    } else {
      toast.error(message?.message);
    }
  }, [isSuccess, message]);

  // React.useEffect(()=>{
  //   if(token && authData?.user_id){
  //     window.location.href = window.location.href
  //   }
  // })

  const [open, setOpen] = React.useState(false);
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
        <>
          <div className="container2 ">
            <div className="row">
              <div className="col-lg-8">
                <Skeleton
                  style={{
                    height: 30,
                    marginBottom: "1%",
                    width: "40%",
                    marginTop: 30,
                  }}
                />
                <Skeleton
                  style={{
                    marginBottom: "1%",
                    width: "100%",
                  }}
                />
                <Skeleton
                  style={{
                    marginBottom: "1%",
                    width: "100%",
                  }}
                />
                <Skeleton
                  style={{
                    marginBottom: "3%",
                    width: "100%",
                  }}
                />
                <Skeleton
                  style={{
                    height: 30,
                    marginBottom: "1%",
                    width: "40%",
                    marginTop: 30,
                  }}
                />
                <Skeleton
                  style={{
                    marginBottom: "1%",
                    width: "100%",
                  }}
                />
                <Skeleton
                  style={{
                    marginBottom: "1%",
                    width: "100%",
                  }}
                />
                <Skeleton
                  style={{
                    marginBottom: "3%",
                    width: "100%",
                  }}
                />
                <Skeleton
                  style={{
                    height: 30,
                    marginBottom: "1%",
                    width: "40%",
                    marginTop: 30,
                  }}
                />
                <Skeleton
                  style={{
                    marginBottom: "1%",
                    width: "100%",
                  }}
                />
                <Skeleton
                  style={{
                    marginBottom: "1%",
                    width: "100%",
                  }}
                />
                <Skeleton
                  style={{
                    marginBottom: "3%",
                    width: "100%",
                  }}
                />
              </div>
              <div className="col-lg-4">
                <Skeleton
                  style={{
                    height: 30,
                    marginBottom: "1%",
                    width: "40%",
                    marginTop: 30,
                  }}
                />
                <div className="row" style={{ marginBottom: "4%" }}>
                  <div className="col-5 col-sm-2 col-lg-5">
                    <Skeleton
                      variant="rectangular"
                      width={110}
                      height={0}
                      style={{ paddingTop: 95, marginRight: 1 }}
                    />
                  </div>
                  <div className="col-7 col-sm-10 col-lg-7">
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
                  <div className="col-5 col-sm-2 col-lg-5">
                    <Skeleton
                      variant="rectangular"
                      width={110}
                      height={0}
                      style={{ paddingTop: 95, marginRight: 1 }}
                    />
                  </div>
                  <div className="col-7 col-sm-10 col-lg-7">
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
                  <div className="col-5 col-sm-2 col-lg-5">
                    <Skeleton
                      variant="rectangular"
                      width={110}
                      height={0}
                      style={{ paddingTop: 95, marginRight: 1 }}
                    />
                  </div>
                  <div className="col-7 col-sm-10 col-lg-7">
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
        </>
      ) : (
        cartITem?.length > 0 && (
          <section
            style={{ marginBottom: 60 }}
            className="Cart cart-margin-top-for-delivery"
          >
            <div className="main-mobile">
              {!token && !authData?.user_id ? (
                <div
                  style={{
                    background: "#F5F5F5",
                    marginTop: -20,
                    height: 162,
                    marginBottom: 13,
                  }}
                >
                  <div style={{ padding: 10 }}>
                    <div style={{ background: "#fff" }}>
                      <div
                        style={{
                          height: 142,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          textAlign: "center",
                        }}
                      >
                        <div>
                          <p className="jost font-18 fw-500 color-22222 logintext">
                            Login or Signup
                          </p>
                          <p
                            className="jost font-16 fw-400 color-22222"
                            style={{ marginBottom: 15 }}
                          >
                            Already have an account?
                          </p>

                          <button
                            onClick={handleLoginOpen}
                            style={{
                              background: "#f15a21",
                              borderRadius: "4px",

                              padding: "10px 48px",
                              fontFamily: "Jost",
                              border: "none",
                              fontSize: "16px",
                              fontWeight: 500,
                              color: "#fff",
                            }}
                          >
                            LOGIN
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="container2">
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
            <div className="container2">
              <div className="row">
                <div className="col-lg-8">
                  <div
                    className="d-flex justify-content-between"
                    style={{ flexWrap: "wrap" }}
                  >
                    {!authData?.user_id && (
                      <p
                        className="jost font-20576 fw-600 color-22222"
                        style={{ marginBottom: 10 }}
                      >
                        Guest User Checkout
                      </p>
                    )}
                  </div>

                  <div className="main-desktop">
                    {couponAppliedSuccess ? (
                      <div className="saved3">
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
                  <div className="items">
                    <>
                      <div className="main-desktop">
                        {!token && !authData?.user_id ? (
                          <div
                            style={{
                              border: "1px solid #E5E5E5",
                              marginTop: 10,
                              marginBottom: 25,
                            }}
                          >
                            <div
                              style={{ padding: 20, flexWrap: "wrap" }}
                              className="d-flex justify-content-between"
                            >
                              <div>
                                <p className="jost font-16 fw-500 color-22222 logintext">
                                  Login or Signup
                                </p>
                                <p className="jost font-14 fw-500 color-22222">
                                  Already have an account?
                                </p>
                              </div>
                              <button
                                onClick={handleLoginOpen}
                                style={{
                                  background: "#f15a21",
                                  borderRadius: "4px",
                                  width: 190,
                                  fontFamily: "Jost",
                                  border: "none",
                                  fontSize: "16px",
                                  fontWeight: 500,
                                  color: "#fff",
                                }}
                              >
                                LOGIN
                              </button>
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>

                      <h1
                        className="jost font-20576 fw-600 color-22222"
                        style={{ marginBottom: 20 }}
                      >
                        Delivery Address
                      </h1>

                      <div
                        className="padding-cart-form"
                        style={{
                          border: "1px solid #E5E5E5",

                          marginTop: 10,
                        }}
                      >
                        <BillShipAddress />
                      </div>

                      <EditAddressform />
                      <BillingAddress />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginTop: 20,
                        }}
                      >
                        <label className="jost font-20576 fw-500 color-22222">
                          Buying For Your Business?
                        </label>

                        <ExpandMoreIcon
                          style={{ cursor: "pointer" }}
                          onClick={() => setOpen(!open)}
                          aria-controls="example-collapse-text"
                          aria-expanded={open}
                        />
                      </div>
                      <Collapse in={open}>
                        <div
                          className="margin-top-cart-billing padding-cart-form"
                          style={{
                            border: "1px solid #E5E5E5",

                            overflow: "hidden",
                          }}
                        >
                          <BusinessForm />
                        </div>
                      </Collapse>
                    </>
                  </div>
                </div>
                <div style={{ overflow: "hidden" }} className="col-lg-4">
                  <Grid sx={{ mt: { xs: 2, md: 0 } }}>
                    <div
                      className="d-flex justify-content-between margin-Order"
                      style={{ flexWrap: "wrap" }}
                    >
                      <Typography className="jost font-20576 fw-500 color-22222 ">
                        Order Summary
                      </Typography>
                    </div>
                  </Grid>
                  <div style={{ marginTop: 18.2 }}>
                    <Summary />
                  </div>
                  <div style={{ marginTop: 20 }} className="main-desktop">
                    <SaveContinue />
                  </div>
                </div>
              </div>
            </div>
            <div className="replace-containe-main2 main-mobile">
              <div className="border-mobile-screen-bold2"></div>
            </div>
            <div className="container2">
              <div className="row">
                <div style={{ overflow: "hidden" }} className="col-lg-4">
                  <div style={{ marginTop: 20 }} className="main-mobile">
                    <SaveContinueMobile />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
      )}
      {/* {cartITem?.length > 0 && (
        <section
          style={{ marginBottom: 60 }}
          className="Cart cart-margin-top-for-delivery"
        >
          <div className="main-mobile">
            {!token && !authData?.user_id ? (
              <div
                style={{
                  background: "#F5F5F5",
                  marginTop: -20,
                  height: 162,
                  marginBottom: 13,
                }}
              >
                <div style={{ padding: 10 }}>
                  <div style={{ background: "#fff" }}>
                    <div
                      style={{
                        height: 142,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                      }}
                    >
                      <div>
                        <p className="jost font-18 fw-500 color-22222 logintext">
                          Login or Signup
                        </p>
                        <p
                          className="jost font-16 fw-400 color-22222"
                          style={{ marginBottom: 15 }}
                        >
                          Already have an account?
                        </p>

                        <button
                          onClick={handleLoginOpen}
                          style={{
                            background: "#f15a21",
                            borderRadius: "4px",

                            padding: "10px 48px",
                            fontFamily: "Jost",
                            border: "none",
                            fontSize: "16px",
                            fontWeight: 500,
                            color: "#fff",
                          }}
                        >
                          LOGIN
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="container2">
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
          <div className="container2">
            <div className="row">
              <div className="col-lg-8">
                <div
                  className="d-flex justify-content-between"
                  style={{ flexWrap: "wrap" }}
                >
                  <h1 className="jost font-20576 fw-600 color-22222">
                    Delivery Address
                  </h1>
                </div>

                <div className="main-desktop">
                  {couponAppliedSuccess ? (
                    <div className="saved3">
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
                <div className="items">
                  <>
                    <div className="main-desktop">
                      {!token && !authData?.user_id ? (
                        <div
                          style={{ border: "1px solid #E5E5E5", marginTop: 10 }}
                        >
                          <div
                            style={{ padding: 20, flexWrap: "wrap" }}
                            className="d-flex justify-content-between"
                          >
                            <div>
                              <p className="jost font-16 fw-500 color-22222 logintext">
                                Login or Signup
                              </p>
                              <p className="jost font-14 fw-500 color-22222">
                                Already have an account?
                              </p>
                            </div>
                            <button
                              onClick={handleLoginOpen}
                              style={{
                                background: "#f15a21",
                                borderRadius: "4px",
                                width: 190,
                                fontFamily: "Jost",
                                border: "none",
                                fontSize: "16px",
                                fontWeight: 500,
                                color: "#fff",
                              }}
                            >
                              LOGIN
                            </button>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div
                      className="padding-cart-form"
                      style={{
                        border: "1px solid #E5E5E5",

                        marginTop: 10,
                      }}
                    >
                      <BillShipAddress />
                    </div>

                    <EditAddressform />
                    <BillingAddress />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: 20,
                      }}
                    >
                      <label className="jost font-20576 fw-500 color-22222">
                        Buying For Your Business?
                      </label>

                      <ExpandMoreIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => setOpen(!open)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}
                      />
                    </div>
                    <Collapse in={open}>
                      <div
                        className="margin-top-cart-billing padding-cart-form"
                        style={{
                          border: "1px solid #E5E5E5",

                          overflow: "hidden",
                        }}
                      >
                        <BusinessForm />
                      </div>
                    </Collapse>
                  </>
                </div>
              </div>
              <div style={{ overflow: "hidden" }} className="col-lg-4">
                <Grid sx={{ mt: { xs: 2, md: 0 } }}>
                  <div
                    className="d-flex justify-content-between margin-Order"
                    style={{ flexWrap: "wrap" }}
                  >
                    <Typography className="jost font-20576 fw-500 color-22222 ">
                      Order Summary
                    </Typography>
                  </div>
                </Grid>
                <div style={{ marginTop: 18.2 }}>
                  <Summary />
                </div>
                <div style={{ marginTop: 20 }} className="main-desktop">
                  <SaveContinue />
                </div>
              </div>
            </div>
          </div>
          <div className="replace-containe-main2 main-mobile">
            <div className="border-mobile-screen-bold2"></div>
          </div>
          <div className="container2">
            <div className="row">
              <div style={{ overflow: "hidden" }} className="col-lg-4">
                <div style={{ marginTop: 20 }} className="main-mobile">
                  <SaveContinueMobile />
                </div>
              </div>
            </div>
          </div>
        </section>
      )} */}
      {!isLoading && cartITem?.length == 0 && cartItems?.length == 0 && (
        <>
          {" "}
          <>
            <div className="container2 ">
              <div className="row">
                <div className="col-lg-8">
                  <Skeleton
                    style={{
                      height: 30,
                      marginBottom: "1%",
                      width: "40%",
                      marginTop: 30,
                    }}
                  />
                  <Skeleton
                    style={{
                      marginBottom: "1%",
                      width: "100%",
                    }}
                  />
                  <Skeleton
                    style={{
                      marginBottom: "1%",
                      width: "100%",
                    }}
                  />
                  <Skeleton
                    style={{
                      marginBottom: "3%",
                      width: "100%",
                    }}
                  />
                  <Skeleton
                    style={{
                      height: 30,
                      marginBottom: "1%",
                      width: "40%",
                      marginTop: 30,
                    }}
                  />
                  <Skeleton
                    style={{
                      marginBottom: "1%",
                      width: "100%",
                    }}
                  />
                  <Skeleton
                    style={{
                      marginBottom: "1%",
                      width: "100%",
                    }}
                  />
                  <Skeleton
                    style={{
                      marginBottom: "3%",
                      width: "100%",
                    }}
                  />
                  <Skeleton
                    style={{
                      height: 30,
                      marginBottom: "1%",
                      width: "40%",
                      marginTop: 30,
                    }}
                  />
                  <Skeleton
                    style={{
                      marginBottom: "1%",
                      width: "100%",
                    }}
                  />
                  <Skeleton
                    style={{
                      marginBottom: "1%",
                      width: "100%",
                    }}
                  />
                  <Skeleton
                    style={{
                      marginBottom: "3%",
                      width: "100%",
                    }}
                  />
                </div>
                <div className="col-lg-4">
                  <Skeleton
                    style={{
                      height: 30,
                      marginBottom: "1%",
                      width: "40%",
                      marginTop: 30,
                    }}
                  />
                  <div className="row" style={{ marginBottom: "4%" }}>
                    <div className="col-5 col-sm-2 col-lg-5">
                      <Skeleton
                        variant="rectangular"
                        width={110}
                        height={0}
                        style={{ paddingTop: 95, marginRight: 1 }}
                      />
                    </div>
                    <div className="col-7 col-sm-10 col-lg-7">
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
                    <div className="col-5 col-sm-2 col-lg-5">
                      <Skeleton
                        variant="rectangular"
                        width={110}
                        height={0}
                        style={{ paddingTop: 95, marginRight: 1 }}
                      />
                    </div>
                    <div className="col-7 col-sm-10 col-lg-7">
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
                    <div className="col-5 col-sm-2 col-lg-5">
                      <Skeleton
                        variant="rectangular"
                        width={110}
                        height={0}
                        style={{ paddingTop: 95, marginRight: 1 }}
                      />
                    </div>
                    <div className="col-7 col-sm-10 col-lg-7">
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
          </>
        </>
      )}

      <Login
        isAddDialogOpened={isOpen}
        handleCloseDialog={() => setIsOpen(false)}
      />
    </>
  );
}
export default Checkout;
