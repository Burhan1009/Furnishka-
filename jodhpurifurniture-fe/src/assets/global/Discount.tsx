import { phoneNum } from "@/common/validations/constants";
import { useGetHeaderCoupon } from "@/service/home";
import { Grid, Typography } from "@mui/material";
import Link from "next/link";
function Discount() {
  const { data } = useGetHeaderCoupon();
  const headerDiscount = data?.data ?? {};
  return (
    <>
      <Grid className=" discount sm-none">
        <div className="container2">
          <Grid className=" d-flex justify-content-between">
            {headerDiscount?.coupon_code ? (
              <p
                className="font-13 fw-400 inter mb-0"
                style={{ color: "#484848" }}
              >
                {/* Burhan code Here  */}
                Special discounts on all products. Use Code{" "}
                <b style={{ color: "#E95B1B" }}>
                  "{headerDiscount?.coupon_code}"
                  {/* Burhan Code Here */}
                </b>{" "}
                To Get Extra{" "}
                {headerDiscount?.coupon_code_type == 2
                  ? `${headerDiscount?.rate}% off`
                  : headerDiscount?.rate}
              </p>
            ) : (
              <></>
            )}
            <div className="contact d-flex">
              <div className="me-3">
                <i className="fa-solid  ">
                  <img src={"/static/images/phone.png"} />
                </i>{" "}
                {/* Burhan Code Here */}
                <a
                  href={`tel:${phoneNum}`}
                  className="font-13 inter"
                  style={{ color: "#484848" }}
                >
                  {phoneNum}
                </a>
              </div>
              <Typography sx={{ color: "#e65e2f", mt: -0.5 }}>|</Typography>

              <div className="ms-3">
                <img
                  src={"/static/icon/newstore.png"}
                  style={{ marginRight: 10 }}
                />

                <Link
                  href="/stores"
                  className="font-13 inter"
                  style={{ color: "#484848" }}
                >
                  Stores
                </Link>
              </div>
            </div>
          </Grid>
        </div>
      </Grid>
      {/* </Grid> */}
    </>
  );
}
export default Discount;
