import { phoneNum } from "@/common/validations/constants";
import { Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

const icons = {
  logo2: "/static/images/logo 3.svg",
  img1: "/static/images/active-cart.svg",
  img2: "/static/images/map-pin.svg",
  imgcolor: "/static/images/map-pin2.svg",
  img3: "/static/images/payment.svg",
  img3Color: "/static/images/payment2.svg",
};

function Header2() {
  const router = useRouter();
  const path = router.asPath;

  return (
    <>
      <div className="main-mobile">
        <div className="header-2 ">
          <div className="container2">
            <div
              style={{
                marginTop: -7,
                marginBottom: -3,
              }}
            >
              <div className="progress-bar-cart ">
                <div>
                  {path == "/cart" ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div className="d-flex ">
                        <Link href="/">
                          <img
                            src={"/static/images/arrow-left-cart.svg"}
                            style={{ marginTop: -7, marginRight: 6 }}
                          />
                        </Link>
                        <p className="jost font-18 fw-500 color-22222 carttext">
                          Cart
                        </p>
                      </div>
                      <div>
                        {" "}
                        {path == "/cart" ? (
                          <div style={{ color: "#484848", fontFamily: "Jost" }}>
                            {" "}
                            step 1/3
                          </div>
                        ) : (
                          <></>
                        )}{" "}
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                {path == "/cart/payments" ? (
                  <></>
                ) : (
                  <>
                    <div>
                      {path == "/cart/address" ? (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div className="d-flex ">
                            <Link href="/cart">
                              <img
                                src={"/static/images/arrow-left-cart.svg"}
                                style={{ marginTop: -7, marginRight: 6 }}
                              />
                            </Link>
                            <p className="jost font-18 fw-500 color-22222 carttext">
                              Address
                            </p>
                          </div>
                          <div>
                            {" "}
                            {path == "/cart/address" ? (
                              <div
                                style={{ color: "#484848", fontFamily: "Jost" }}
                              >
                                step 2/3
                              </div>
                            ) : (
                              <></>
                            )}{" "}
                          </div>
                        </div>
                      ) : (
                        <p
                          className="jost font-18 fw-500 color-22222 carttext"
                          style={{ display: "none" }}
                        >
                          Address
                        </p>
                      )}
                    </div>
                  </>
                )}

                <div>
                  {path == "/cart/payments" ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div className="d-flex ">
                        <Link href="/cart/address">
                          <img
                            src={"/static/images/arrow-left-cart.svg"}
                            style={{ marginTop: -7, marginRight: 6 }}
                          />
                        </Link>
                        <p className="jost font-18 fw-500 color-22222 carttext">
                          Payments
                        </p>
                      </div>
                      <div>
                        {" "}
                        {path == "/cart/payments" ? (
                          <div style={{ color: "#484848", fontFamily: "Jost" }}>
                            step 3/3
                          </div>
                        ) : (
                          <></>
                        )}{" "}
                      </div>
                    </div>
                  ) : (
                    <p
                      className="jost font-18 fw-500 color-22222 carttext"
                      style={{ display: "none" }}
                    >
                      Payments
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-desktop">
        <div className="header-2 ">
          <div className="container2">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
              className="d-flex "
            >
              <Link href="/">
                <img src={icons["logo2"]} alt="" className="img1 logo2" />
              </Link>
              <div className="progress-bar-cart d-flex">
                <div className="d-flex small-image-cart">
                  <img src={icons["img1"]} alt="" />
                  <p className="jost font-169074 fw-normal color-6 carttext">
                    Cart
                  </p>
                </div>
                {path == "/cart/payments" ? (
                  <>
                    <div
                      style={{
                        border:
                          path == "/cart/payments"
                            ? "1px dashed #f15a21"
                            : "1px dashed #767676",
                      }}
                      className="border3"
                    ></div>
                    <div className="d-flex small-image-cart">
                      <img
                        src={
                          path == "/cart/payments"
                            ? icons["imgcolor"]
                            : icons["img2"]
                        }
                        alt=""
                      />
                      {path == "/cart/payments" ? (
                        <p className="jost font-169074 fw-normal color-6 carttext">
                          Address
                        </p>
                      ) : (
                        <p className="jost font-169074 fw-normal color-4848 carttext">
                          Address
                        </p>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      style={{
                        border:
                          path == "/cart/address"
                            ? "1px dashed #f15a21"
                            : "1px dashed #767676",
                      }}
                      className="border3"
                    ></div>
                    <div className="d-flex small-image-cart">
                      <img
                        src={
                          path == "/cart/address"
                            ? icons["imgcolor"]
                            : icons["img2"]
                        }
                        alt=""
                      />
                      {path == "/cart/address" ? (
                        <p className="jost font-169074 fw-normal color-6 carttext">
                          Address
                        </p>
                      ) : (
                        <p className="jost font-169074 fw-normal color-4848 carttext">
                          Address
                        </p>
                      )}
                    </div>
                  </>
                )}

                <div
                  style={{
                    border:
                      path == "/cart/payments"
                        ? "1px dashed #f15a21"
                        : "1px dashed #767676",
                  }}
                  className="border3"
                ></div>
                <div className="d-flex small-image-cart">
                  <img
                    src={
                      path == "/cart/payments"
                        ? icons["img3Color"]
                        : icons["img3"]
                    }
                    alt=""
                  />
                  {path == "/cart/payments" ? (
                    <p className="jost font-169074 fw-normal color-6 carttext">
                      Payments
                    </p>
                  ) : (
                    <p className="jost font-169074 fw-normal color-4848 carttext">
                      Payments
                    </p>
                  )}
                </div>
              </div>
              <div className=" mt-2">
                <Typography
                  className="jost font-1512316 fw-500 color-4848 wrapping-word "
                  style={{ flexWrap: "wrap", marginBottom: 6 }}
                >
                  Have Questions? We're here to help
                </Typography>
                <p className="jost font-1887 wrapping-word2 text-end fw-500">
                  <a href={`tel:${phoneNum}`} className="color-22222">
                    Call : {phoneNum}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Header2;
