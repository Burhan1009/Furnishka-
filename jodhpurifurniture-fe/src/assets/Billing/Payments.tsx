import { useGetSingleAddress, useGetSingleBilling } from "@/service/address";
import {
  selectAccessToken,
  selectAppliedCoupon,
  selectAuth,
} from "@/service/auth/globalstate";
import {
  selectAddressID,
  selectBillId,
  selectCartWithoutLogin,
  selectUserAddress,
  selectUserCart,
  useApplyCoupon,
  useCreateOrder,
  useGetUserCart,
  useSavePayementOrder,
} from "@/service/cart";
import useRazorpay from "react-razorpay";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { orange } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Login from "../global/Login";
import { Summary } from "./Summary";
import { OtherCatActions } from "@/service/listing/states";
import { LoadingButton } from "@mui/lab";
import CouponMobile from "./CouponMobile";
import { useGetHeaderCoupon } from "@/service/home";
import RazorpayWidgetMobile from "../Detail/MobileWidgets";
import RazorpayWidget from "../Detail/Widgets";

function Payments() {
  const dispatch = useDispatch();
  const Razorpay = useRazorpay();
  const auth = useSelector(selectAuth);
  const authData = auth?.length > 0 ? auth[0] : "";
  const getUserCart = useSelector(selectUserCart);
  const token = useSelector(selectAccessToken);
  const router = useRouter();
  const couponAppliedSuccess = useSelector(selectAppliedCoupon);
  const cartITem = useSelector(selectCartWithoutLogin);
  const [pinValue, setPinValue] = React.useState("");
  const [pinError, setPinError] = React.useState("");
  const shipAddress = useSelector(selectAddressID);
  const billAddress = useSelector(selectBillId);
  const { data: couponData } = useGetHeaderCoupon();
  const headerDiscount = couponData?.data ?? {};
  const addresses = useSelector(selectUserAddress);
  console.log({ getUserCart, cartITem });
  const {
    mutate: createOrder,
    isLoading: ConfirmLoading,
    data: paymentData,
    isSuccess: crateOrderSuccess,
  } = useCreateOrder();
  const orderData = paymentData?.data ?? {};
  console.log({ orderData });
  const {
    mutate: savePayement,
    isLoading: savePayementLoading,
    data: paymentSuccess,
  } = useSavePayementOrder();

  // const { data: usergetData } = useGetUserCart({
  //   atribute_id: null,
  // });
  const { data: shiping } = useGetSingleAddress({
    addressId: shipAddress,
    userId: addresses[0]?.user_id,
  });

  const { data: billing } = useGetSingleBilling({
    addressId: billAddress,
    userId: addresses[0]?.user_id,
  });

  const shippingAddress = shiping?.data ?? {};
  const billingAddress = billing?.data ?? {};
  console.log({ billingAddress });
  const shippingBillingSame =
    shippingAddress?.address_id == billingAddress?.address_id;

  const grandTotal =
    cartITem?.length && cartITem?.map((item) => item.sale_price * item.qty);
  let sum = 0;

  // grandTotal?.length > 0 &&
  grandTotal?.forEach((a) => {
    if (typeof a === "number") {
      sum += a;
    }
  });

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

  const retailDiscount = offerPrize?.reduce((acc, b) => {
    if (typeof b === "number") {
      return acc + b;
    }
    return acc;
  }, 0);

  const { mutate, data } = useApplyCoupon();
  const discountRate = data?.data ?? "";
  const handleApplyCoupon = () => {
    const body = {
      coupon_code: pinValue,
    };
    mutate(body);
  };

  React.useEffect(() => {
    if (data?.response == 0) {
      setPinError(
        `Warning: Coupon is either invalid, expired or reached it's usagelimit!`
      );
    } else if (data?.response == 1) {
      setPinError("Coupon Code applied successfully!");
      let discount = (sum * discountRate?.rate) / 100;
      dispatch(
        OtherCatActions.copounApplied({ dis: discount, copon: discountRate })
      );
    }
  }, [data]);

  const [isOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    if (paymentData?.success && crateOrderSuccess) {
      const options = {
        key: process.env.RAZOR_PAY_KEY,
        amount: orderData?.amount,
        currency: "INR",
        name: "Jodhpuri Furniture",
        description: "Transaction",
        image: "/static/small-logo.png",
        order_id: orderData?.id,
        handler: function (response) {
          if (response.razorpay_signature && response.razorpay_payment_id) {
            savePayement({ ...response, cart: getUserCart });
          }
        },
        prefill: {
          name: billingAddress?.full_name,
          email: authData?.email,
          contact: billingAddress?.phone ?? "",
        },
        notes: {
          address: "Business",
        },
        theme: {
          color: "#f15a21",
        },
      };

      const rzp1 = new Razorpay(options);

      rzp1.on("payment.failed", function (response) {
        savePayement(response);
      });

      rzp1.open();
    }
  }, [paymentData?.success, crateOrderSuccess]);

  const handleConfirmPayment = async (params) => {
    const obj = {
      // user_id: authData?.user_id,
      // email: authData?.email,
      user_id: billingAddress?.user_id,
      "full name": billingAddress?.full_name,
      email: billingAddress?.email,
      "shipping address": shippingAddress,
      "billing address": billingAddress,
      "product detail": cartITem,
      coupon_id: couponAppliedSuccess?.copon?.coupon_id ?? "",
      coupon_code: couponAppliedSuccess?.copon?.coupon_code ?? "",
    };
    if (cartITem && billingAddress && shippingAddress) {
      await createOrder(obj);
    }
  };

  useEffect(() => {
    if (paymentSuccess?.payment_success) router.push("/cart/order-success");
  }, [paymentSuccess?.payment_success]);
  const totalPayableAmount = sum - retailDiscount;

  useEffect(() => {
    if (crateOrderSuccess && paymentData?.response == 1) {
      toast.success(paymentData?.paymentData);
    }
  }, [crateOrderSuccess, paymentData]);
  const deviceWidth = window.innerWidth < 500 ? true : false
  const deviceWidthDesktop = window.innerWidth > 500 ? true : false
  return (
    <>
      {cartITem?.length > 0 ? (
        <section
          style={{ marginBottom: 60 }}
          className="Cart margin-top-payment"
        >
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
          <div className="main-mobile">
            <div
              style={{ marginTop: 5, marginBottom: 5 }}
              className="border-cart-mobile"
            ></div>
          </div>
          <div className="container2">
            <div className="row">
              <div className="col-lg-8">
                <div
                  className="d-flex justify-content-between"
                  style={{ flexWrap: "wrap" }}
                >
                  <Typography className="jost font-20576 fw-600 color-22222 visible-confirm-order ">
                    Confirm Order
                  </Typography>
                </div>
                <div className="main-desktop">
                  {couponAppliedSuccess ? (
                    <div className="saved3 ">
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
                  <div
                    className="payment-border"
                    style={{
                      marginTop: 10,
                    }}
                  >
                    <Typography className="jost font-1690746 fw-500 color-22222">
                      Shipping Address
                    </Typography>
                    <Typography
                      style={{
                        marginTop: 13,
                        marginBottom: 3,
                        textTransform: "capitalize",
                      }}
                      className="jost font-1555 fw-500 color-22222"
                    >
                      {shippingAddress?.full_name}
                    </Typography>
                    <Typography
                      className="jost font-14 fw-500 color-22222"
                      style={{ marginBottom: 5 }}
                    >
                      Address:{" "}
                      <span
                        style={{ fontWeight: 400 }}
                        className="jost font-14 fw-400 color-22222"
                      >
                        {shippingAddress.house_number}, {shippingAddress.street}
                        , {shippingAddress.street_address},{" "}
                        {shippingAddress.city}, {shippingAddress.post_code}
                      </span>
                    </Typography>
                    <Typography className="jost font-14 fw-500 color-22222">
                      Mobile:{" "}
                      <span
                        style={{ fontWeight: 400 }}
                        className="jost font-14 fw-400 color-22222"
                      >
                        {shippingAddress.phone}
                      </span>
                    </Typography>
                  </div>

                  <div className="replace-containe-main2 main-mobile"></div>

                  {!shippingBillingSame ? (
                    <div style={{ marginTop: 20 }} className="items">
                      <div
                        style={{ marginTop: 18, marginBottom: 14 }}
                        className="border-cart-mobile"
                      ></div>
                      <div className="payment-border">
                        <Typography className="jost font-1690746 fw-500 color-22222">
                          Billing Address
                        </Typography>
                        <Typography
                          style={{
                            marginTop: 13,
                            marginBottom: 3,
                            textTransform: "capitalize",
                          }}
                          className="jost font-1555 fw-500 color-22222"
                        >
                          {billingAddress?.full_name}
                        </Typography>
                        <Typography
                          className="jost font-14 fw-500 color-22222"
                          style={{ marginBottom: 5 }}
                        >
                          Address:{" "}
                          <span
                            style={{ fontWeight: 400 }}
                            className="jost font-14 fw-400 color-22222"
                          >
                            {billingAddress.house_number},{" "}
                            {billingAddress.street},{" "}
                            {billingAddress.street_address},{" "}
                            {billingAddress.city}, {billingAddress.post_code}
                          </span>
                        </Typography>
                        <Typography className="jost font-14 fw-500 color-22222">
                          Mobile:{" "}
                          <span
                            style={{ fontWeight: 400 }}
                            className="jost font-14 fw-400 color-22222"
                          >
                            {billingAddress.phone}
                          </span>
                        </Typography>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                  {shippingBillingSame ? (
                    <>
                      <div
                        style={{ marginTop: 18, marginBottom: 14 }}
                        className="border-cart-mobile"
                      ></div>
                      <FormGroup>
                        <FormControlLabel
                          sx={{}}
                          control={
                            <Checkbox
                              checked={shippingBillingSame}
                              sx={{
                                color: "default",
                                "&.Mui-checked": {
                                  color: "#f15a21",
                                },
                              }}
                            />
                          }
                          label="Billing address is same as the Shipping addres"
                        />
                      </FormGroup>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              <div className="main-mobile">
                <div
                  style={{ marginTop: 14 }}
                  className="border-mobile-screen-bold2"
                ></div>
              </div>

              <div style={{ overflow: "hidden" }} className="col-lg-4">
                <Grid>
                  <div
                    className="d-flex justify-content-between payment-order-top"
                    style={{ flexWrap: "wrap" }}
                  >
                    <Typography
                      className="jost font-20576 fw-500 color-22222 "
                      style={{ marginBottom: 10 }}
                    >
                      Order Summary
                    </Typography>
                  </div>
                </Grid>
                <div style={{ marginTop: -10, marginBottom: -10 }}>
                  <Summary />
                </div>

                <div style={{ marginTop: 20 }} className="main-desktop">
                  <div className="billing-box">
                    <label className="jost font-14 fw-normal color-22222 co-co">
                      Have a Coupon Code ?
                    </label>
                    <div className="input-coupon2">
                      <input
                        onChange={(e) => {
                          setPinValue(e.target.value);
                          setPinError("");
                        }}
                        value={
                          couponAppliedSuccess
                            ? couponAppliedSuccess?.copon?.coupon_code
                            : pinValue
                        }
                        type="text"
                        placeholder="Apply Coupon"
                      />
                      <button
                        disabled={!pinValue}
                        onClick={handleApplyCoupon}
                        className="coupon-apply"
                      >
                        <span className="jost fw-500">APPLY</span>
                      </button>
                    </div>
                    <p
                      style={{
                        color:
                          pinError ===
                            `Warning: Coupon is either invalid, expired or reached it's usagelimit!`
                            ? "red"
                            : "green",
                      }}
                    >
                      {pinError}
                    </p>
                    {!pinError && couponAppliedSuccess?.dis ? (
                      <Grid
                        sx={{
                          display: "flex",
                          gap: 2,
                          justifyContent: "space-between",
                          mt: -1,
                        }}
                      >
                        <p
                          className="font-145678"
                          style={{
                            color: "green",
                          }}
                        >
                          Coupon Code applied successfully!
                        </p>
                        <p
                          className="font-15"
                          onClick={() => {
                            dispatch(OtherCatActions.copounApplied(undefined));
                            setPinValue("");
                          }}
                          style={{
                            marginTop: -3,
                            color: "red",
                            cursor: "pointer",
                          }}
                        >
                          Remove
                        </p>
                      </Grid>
                    ) : (
                      <></>
                    )}
                    <div className="border-apply"></div>
                    <div className="d-flex justify-content-between mb-3">
                      <label className="jost fw-500 font-18872 mb-0">
                        Price Details
                      </label>
                      <label className="jost fw-500 font-1690746 mb-0">
                        Item({itemQty})
                      </label>
                    </div>
                    <div className="d-flex justify-content-between">
                      <label className="jost fw-normal font-1555">
                        Cart Value
                      </label>
                      <label className="jost fw-normal font-1555">
                        {
                          sum
                            .toLocaleString("en-IN", {
                              style: "currency",
                              currency: "INR",
                            })
                            .split(".")[0]
                        }
                      </label>
                    </div>
                    <div className="border-apply2"></div>
                    {couponAppliedSuccess?.dis ? (
                      <div className="d-flex justify-content-between discount-price">
                        <label className="jost fw-normal font-1555 mb-0">
                          Retail Discount
                        </label>
                        <label className="jost fw-500 font-1555 mb-0">
                          (-){" "}
                          {
                            retailDiscount
                              .toLocaleString("en-IN", {
                                style: "currency",
                                currency: "INR",
                              })
                              .split(".")[0]
                          }
                        </label>
                      </div>
                    ) : (
                      <></>
                    )}
                    <div className="border-apply2"></div>
                    <div className="d-flex justify-content-between">
                      <div>
                        <p className="jost fw-500 color-22222 font-18872 mb-0">
                          Total Payable Amount
                        </p>
                        <span className="color-767676 jost fw-500 font-13">
                          (Incl. of all taxes)
                        </span>
                      </div>
                      {couponAppliedSuccess?.dis ? (
                        <label className="jost fw-500 font-1555 mb-0">
                          {
                            totalPayableAmount
                              .toLocaleString("en-IN", {
                                style: "currency",
                                currency: "INR",
                              })
                              .split(".")[0]
                          }
                        </label>
                      ) : (
                        <label className="jost fw-500 font-1555 mb-0">
                          {
                            sum
                              .toLocaleString("en-IN", {
                                style: "currency",
                                currency: "INR",
                              })
                              .split(".")[0]
                          }
                        </label>
                      )}
                    </div>
                    {deviceWidthDesktop &&
                      <RazorpayWidget  amount={couponAppliedSuccess?.dis ? totalPayableAmount?.toFixed() * 100 : sum?.toFixed() * 100} />
                    }
                    <LoadingButton
                      loading={ConfirmLoading || savePayementLoading}
                      // disabled={!token}
                      onClick={handleConfirmPayment}
                      style={{
                        fontWeight: "500",
                        fontFamily: "Jost",
                        boxShadow: "none",
                      }}
                      sx={{
                        background: "#f15a21",
                        borderRadius: "4px",
                        height: {
                          xs: "35px",
                          sm: "40px",
                          md: "45px",
                          lg: "50px",
                        },
                        color: "#ffffff",
                        marginTop: "17px",
                        fontSize: { xs: 14, sm: 15, md: 15, lg: 16 },

                        "&:hover": {
                          backgroundColor: "#f15a21",
                        },
                      }}
                      variant="contained"
                      fullWidth
                    >
                      CONFIRM ORDER
                    </LoadingButton>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="main-mobile">
            <div className="border-mobile-screen-bold2"></div>
          </div>
          <div className="container2">
            <div className="row">
              <div className="main-mobile">
                <div className="billing-box margin-top-save-countinue ">
                  <div className="d-flex justify-content-between mb-3">
                    <label className="jost fw-500 font-18 mb-0">
                      Price Details
                    </label>
                    <label className="jost fw-500 font-16 mb-0">
                      {itemQty} Item
                    </label>
                  </div>
                  <div className="d-flex justify-content-between">
                    <label className="jost fw-normal color-22222 font-15">
                      Cart Value
                    </label>
                    <label className="jost fw-500 font-15">
                      {
                        sum
                          .toLocaleString("en-IN", {
                            style: "currency",
                            currency: "INR",
                          })
                          .split(".")[0]
                      }
                    </label>
                  </div>
                  <div className="border-apply2"></div>
                  {couponAppliedSuccess?.dis ? (
                    <div className="d-flex justify-content-between discount-price">
                      <label className="jost fw-normal font-15 mb-0">
                        Retail Discount
                      </label>
                      <label className="jost fw-500 font-15 mb-0">
                        (-){" "}
                        {
                          retailDiscount
                            .toLocaleString("en-IN", {
                              style: "currency",
                              currency: "INR",
                            })
                            .split(".")[0]
                        }
                      </label>
                    </div>
                  ) : (
                    <></>
                  )}
                  <div className="border-apply2"></div>
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="jost fw-500 color-22222 font-18 mb-0">
                        Total Payable Amount
                      </p>
                      <span className="color-767676 jost fw-500 font-13">
                        (Incl. of all taxes)
                      </span>
                    </div>
                    {couponAppliedSuccess?.dis ? (
                      <label className="jost fw-500 font-15 mb-0">
                        {
                          totalPayableAmount
                            .toLocaleString("en-IN", {
                              style: "currency",
                              currency: "INR",
                            })
                            .split(".")[0]
                        }
                      </label>
                    ) : (
                      <label className="jost fw-500 font-1555 mb-0">
                        {
                          sum
                            .toLocaleString("en-IN", {
                              style: "currency",
                              currency: "INR",
                            })
                            .split(".")[0]
                        }
                      </label>
                    )}{" "}
                  </div>
                  {deviceWidth &&
                    <RazorpayWidgetMobile amount={couponAppliedSuccess?.dis ? totalPayableAmount?.toFixed() * 100 : sum?.toFixed() * 100} />
                  }
                  <div className="border-apply2"></div>
                  <LoadingButton
                    loading={ConfirmLoading || savePayementLoading}
                    // disabled={!token}
                    onClick={handleConfirmPayment}
                    style={{
                      fontWeight: "500",
                      fontFamily: "Jost",
                      boxShadow: "none",
                    }}
                    sx={{
                      background: "#f15a21",
                      borderRadius: "4px",
                      height: { xs: "58px", md: "45px", lg: "50px" },
                      color: "#ffffff",
                      marginTop: "17px",
                      fontSize: { xs: 18, md: 15, lg: 16 },

                      "&:hover": {
                        backgroundColor: "#f15a21",
                      },
                    }}
                    variant="contained"
                    fullWidth
                  >
                    CONFIRM ORDER
                  </LoadingButton>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <>
          {" "}
          <Grid mt={10} mb={40}>
            <Typography variant="h5" align="center" className=" jost">
              Your cart is currently empty.{" "}
            </Typography>
            <Link href="/">
              {" "}
              <Typography mt={5} align="center">
                <button className="back-to-home jost">Return to shop</button>
              </Typography>
            </Link>
          </Grid>
        </>
      )}
      <Login
        isAddDialogOpened={isOpen}
        handleCloseDialog={() => setIsOpen(false)}
      />
    </>
  );
}
export default Payments;
