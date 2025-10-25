import { selectCartWithoutLogin, useApplyCoupon } from "@/service/cart";
import React from "react";
import {Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectAppliedCoupon } from "@/service/auth/globalstate";
import { OtherCatActions } from "@/service/listing/states";


function CouponMobile() {
 
  const dispatch = useDispatch();
  const cartITem = useSelector(selectCartWithoutLogin);
  const [pinValue, setPinValue] = React.useState("");
  const couponAppliedSuccess = useSelector(selectAppliedCoupon);
  const [pinError, setPinError] = React.useState("");
  const grandTotal =
    cartITem?.length && cartITem?.map((item) => item.sale_price * item.qty);
  let sum = 0;

  grandTotal.forEach((a) => {
    if (typeof a === "number") {
      sum += a;
    }
  });

  // const itemQty =
  //   cartITem?.length &&
  //   cartITem?.map((item) => item.qty)?.reduce((a, b) => a + b);

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
  // const totalPayableAmount = sum - couponAppliedSuccess?.dis;
  return (
    <>
     <div className="billing-box extra-billing-box2" style={{border:'none',}}>
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
          <Grid sx={{ display: 'flex', mt:-1 , justifyContent:'space-between',}}>
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
 
      </div>
    </>
  );
}
export default CouponMobile;
