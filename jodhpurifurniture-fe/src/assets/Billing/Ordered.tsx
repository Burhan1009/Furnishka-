import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Avatar, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "@/service/cart/states";
import { selectAuth } from "@/service/auth/globalstate";

const icons = {
  logo: "/static/images/logo.svg",
  img1: "/static/images/active-cart.svg",
  orderSuccess: "/static/images/Ordersuccess.png",
  cartWhite: "/static/images/cart-white.svg",
  img2: "/static/images/map-pin.svg",
  imgcolor: "/static/images/map-pin2.svg",
  img3: "/static/images/payment.svg",
  img3Color: "/static/images/payment2.svg",
};

function Ordered() {
  const auth = useSelector(selectAuth);
  const authData = auth?.length > 0 ? auth[0] : "";
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cartActions.getUserCart(authData?.user_id));
  }, [authData]);

  return (
    <>
      <div className="header-2 container-fluid">
        <div className="container2">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 25,
              marginBottom: 25,
            }}
          >
            <Box
              sx={{
                border: "1px solid #E5E5E5",
                width: { xs: "auto", md: 480 },
                p: 5,
                background: "#f4f9fc",
              }}
            >
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Avatar
                  sx={{ width: 101, height: 101 }}
                  src={icons["orderSuccess"]}
                />
              </div>
              <Typography
                sx={{
                  fontSize: 32,
                  fontWeight: 500,
                  fontFamily: "Jost",
                  textAlign: "center",
                  mt: 2,
                }}
              >
                Successfully Ordered!
              </Typography>
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 400,
                  fontFamily: "Jost",
                  mt: 2,
                  textAlign: "center",
                }}
              >
                Thank you for your order, you should receive and e-mail
                confirmation very soon :)
              </Typography>
              <Typography sx={{ mt: 5, textAlign: "center" }}>
                <Link href={"/"}>
                  <button className="back-to-home jost">Back to Home</button>
                </Link>
              </Typography>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}
export default Ordered;
