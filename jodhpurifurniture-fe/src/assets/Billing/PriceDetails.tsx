import { selectCartWithoutLogin, useApplyCoupon } from "@/service/cart";
import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { selectAppliedCoupon } from "@/service/auth/globalstate";
import { OtherCatActions } from "@/service/listing/states";
import { useGetHeaderCoupon } from "@/service/home";
import RazorpayWidget from "../Detail/Widgets";

function PriceDetails() {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartITem = useSelector(selectCartWithoutLogin);
  const [pinValue, setPinValue] = React.useState("");
  const couponAppliedSuccess = useSelector(selectAppliedCoupon);

  const { data: couponData } = useGetHeaderCoupon();
  const headerDiscount = couponData?.data ?? {};
  const [pinError, setPinError] = React.useState("");
  const grandTotal =
    cartITem?.length && cartITem?.map((item) => item.sale_price * item.qty);

  let sum = 0;

  grandTotal.forEach((a) => {
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

  const totalPayableAmount = sum - retailDiscount;
  const deviceWidth = window.innerWidth > 500 ? true : false

  return (
    <>
      <div className="billing-box">
        <Typography className="jost font-14 fw-normal color-22222 coupon-head">
          Have a Coupon Code ?
        </Typography>
        <div className="input-coupon">
          <input
            className="jost color-22222"
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
          className="font-145678"
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
          <label className="jost fw-500 font-18872 mb-0">Price Details</label>
          <label className="jost fw-500 font-1690746 mb-0">
            Item({itemQty})
          </label>
        </div>
        <div className="d-flex justify-content-between">
          <label className="jost fw-normal font-1555">Cart Value</label>
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
          )}{" "}
        </div>
        {deviceWidth &&
          <RazorpayWidget amount={couponAppliedSuccess?.dis ? totalPayableAmount?.toFixed() * 100 : sum?.toFixed() * 100} />
        }
        <Button
          onClick={() => router.push("/cart/address")}
          style={{
            fontWeight: "500",
            fontFamily: "Jost",
            boxShadow: "none",
          }}
          sx={{
            background: "#f15a21",
            borderRadius: "4px",
            height: { xs: "35px", sm: "40px", md: "45px", lg: "50px" },
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
          PROCEED TO CHECKOUT
        </Button>
      </div>
    </>
  );
}
export default PriceDetails;
