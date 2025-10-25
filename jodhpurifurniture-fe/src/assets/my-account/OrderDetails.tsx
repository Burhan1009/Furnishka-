import Grid from "@mui/material/Grid";
import { Typography, Box, Skeleton } from "@mui/material";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useUpdateOrder } from "@/service/order";
import { useSelector } from "react-redux";
import { selectAuth } from "@/service/auth/globalstate";
import Testimonial from "../global/Testimonial";
import NewsLetter from "../global/NewsLetter";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const OrderDetails = () => {
  const router = useRouter();
  const { oId } = router.query;

  const auth = useSelector(selectAuth);
  const authData = auth?.length > 0 ? auth[0] : "";
  const { mutate: updateOrder, data, isLoading } = useUpdateOrder();

  const pdfRef = React.useRef();
  useEffect(() => {
    if (oId) {
      updateOrder({ orderId: oId, userId: authData.user_id });
    }
  }, [authData.user_id]);

  const option: any = { year: "numeric", month: "short", day: "numeric" };
  const event = new Date(data?.data?.placed_date).toLocaleDateString(
    undefined,
    option
  );
  const myShippingDetails = data?.data?.shipping_address
    ? JSON.parse(data?.data?.shipping_address)
    : "";

  const slugKeyHandle = (slug_key) => {
    window.open("/" + slug_key);
  };

  const onButtonClick = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("OrderDetail.pdf");
    });
  };

  return (
    <>
      {isLoading ? (
        <div className="container2 ">
          <div>
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
        </div>
      ) : (
        <>
          <div ref={pdfRef}>
            <div className="container2">
              <h1
                className="order-font"
                style={{
                  marginTop: 15,
                  color: "#222222",
                  fontWeight: "500",
                  fontFamily: "jost",
                }}
              >
                Order Details
              </h1>

              <Grid sx={{ mt: 1 }}>
                <Grid sx={{ display: "flex" }}>
                  <Typography
                    sx={{
                      fontFamily: "Jost",
                      mr: 0.5,
                      fontWeight: "500",
                      color: "#484848",
                      fontSize: 14,
                    }}
                  >
                    Transaction Status :{" "}
                  </Typography>
                  <Typography>
                    {data?.data?.payment_status == "created" ? (
                      <Typography
                        sx={{
                          color: "red",
                          fontWeight: "500",
                          fontFamily: "Jost",
                        }}
                      >
                        FAILURE
                      </Typography>
                    ) : (
                      <Typography
                        sx={{
                          color: "Green",
                          fontWeight: "500",
                          fontFamily: "Jost",
                        }}
                      >
                        {data?.data?.payment_status}
                      </Typography>
                    )}
                  </Typography>
                </Grid>
                <Grid mt={1} display={"flex"} flexWrap={"wrap"} mb={3}>
                  <Typography
                    sx={{
                      fontFamily: "Jost",
                      fontWeight: "500",
                      color: "#484848",
                      mr: 3,
                      fontSize: 14,
                      mb: { xs: 0.5, sm: 0 },
                    }}
                  >
                    Order Id : {data?.data?.order_id}({" "}
                    {data?.data?.product_details.length} items ){"  "}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Jost",
                      fontWeight: "500",
                      color: "#666",
                      fontSize: 14,
                      ml: 0.3,
                      mr: 3,
                      display: { xs: "none", sm: "flex" },
                    }}
                  >
                    |
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Jost",
                      fontWeight: "500",
                      color: "#666",
                      fontSize: 14,
                    }}
                  >
                    Ordered On {event}
                  </Typography>
                </Grid>

                <Grid className="row">
                  <Grid className="col-lg-8">
                    <Box
                      sx={{
                        fontFamily: "Jost",
                        p: 2.5,
                        border: "1px solid #E5E5E5",
                        mt: 0.5,
                        mb: 1.5,
                        display: "flex",
                        flexWrap: "wrap",
                      }}
                    >
                      <Grid sx={{ mb: 3, width: "350px" }}>
                        <Typography
                          sx={{
                            fontFamily: "Jost",
                            fontWeight: "500",
                            mb: 1.1,
                          }}
                        >
                          Shipping Address
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: "Jost",
                            fontWeight: "500",
                            fontSize: 15,
                            mb: 0.5,
                          }}
                        >
                          Email: {data?.data?.email}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: "Jost",
                            fontWeight: "500",
                            fontSize: 14,
                            color: "#767676",
                            maxWidth: 203,
                            mb: 1.1,
                          }}
                        >
                          {myShippingDetails.house_number},
                          {myShippingDetails.street_address} ,{" "}
                          {myShippingDetails.street} ,{myShippingDetails.city},{" "}
                          {myShippingDetails.post_code}
                        </Typography>

                        <Typography
                          sx={{
                            fontFamily: "Jost",
                            fontWeight: "500",
                            fontSize: 15,
                            mb: 0.5,
                          }}
                        >
                          Phone number
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: "Jost",
                            fontWeight: "500",
                            fontSize: 14,
                            color: "#767676",
                            maxWidth: 203,
                            mb: 1.1,
                          }}
                        >
                          +91 {myShippingDetails.phone}
                        </Typography>
                      </Grid>
                      <Grid>
                        <Typography
                          sx={{
                            fontFamily: "Jost",
                            fontWeight: "500",
                            mb: 1.1,
                          }}
                        >
                          Payment Method
                        </Typography>

                        <Typography
                          sx={{
                            fontFamily: "Jost",
                            fontWeight: "500",
                            fontSize: 14,
                            color: "#767676",
                            mb: 1.1,

                            maxWidth: "264px",
                          }}
                        >
                          {data?.data?.payment_method} acceptance subject to
                          device availability.
                        </Typography>

                        <Typography
                          sx={{
                            fontFamily: "Jost",
                            fontWeight: "500",
                            mt: 2.5,
                          }}
                        >
                          Download Invoice
                        </Typography>
                        {/* <a href="./yourfile.pdf" download> */}
                        <button
                          onClick={onButtonClick}
                          className="dowload-button"
                          style={{
                            background: "#f15a21",
                            display: "flex",

                            border: "1px solid #f15a21",
                            padding: "10px 10px 10px 10px",
                            borderRadius: 4,
                            textTransform: "uppercase",
                            marginTop: 14,
                          }}
                        >
                          <img
                            src={"/static/images/download.svg"}
                            style={{ marginRight: 7 }}
                          />
                          <Typography
                            sx={{
                              fontFamily: "Jost",
                              fontWeight: "500",
                              mt: 0.2,
                              fontSize: 13,
                              color: "#fff",
                            }}
                          >
                            Invoice
                          </Typography>
                        </button>
                        {/* </a> */}
                      </Grid>
                    </Box>
                  </Grid>
                  <Grid className=" col-lg-4">
                    <Box
                      sx={{
                        fontFamily: "Jost",
                        p: 2.5,
                        border: "1px solid #E5E5E5",
                        mt: 0.5,
                        mb: 1.5,
                      }}
                    >
                      <Typography
                        sx={{ fontFamily: "Jost", fontWeight: "500", mb: 1.5 }}
                      >
                        Order Summary
                      </Typography>
                      <div className="d-flex justify-content-between ">
                        <Grid
                          sx={{
                            fontFamily: "Jost",
                            fontWeight: "400",
                            fontSize: 15,
                          }}
                        >
                          Cart Value
                        </Grid>
                        <Grid
                          sx={{
                            fontFamily: "Jost",
                            fontWeight: "500",
                            fontSize: 15,
                          }}
                        >
                          {
                            (data?.data?.sub_total ?? "0")
                              .toLocaleString("en-IN", {
                                style: "currency",
                                currency: "INR",
                              })
                              .split(".")[0]
                          }
                        </Grid>
                      </div>
                      <div className="border98"></div>
                      <div className="d-flex justify-content-between ">
                        <Grid
                          sx={{
                            fontFamily: "Jost",
                            fontWeight: "400",
                            fontSize: 15,
                            color: "#4CAF50",
                          }}
                        >
                          Retail Discount
                        </Grid>
                        <Grid
                          sx={{
                            fontFamily: "Jost",
                            fontWeight: "500",
                            fontSize: 15,
                            color: "#4CAF50",
                          }}
                        >
                          (-){" "}
                          {
                            (data?.data?.discount_amount ?? "0")
                              .toLocaleString("en-IN", {
                                style: "currency",
                                currency: "INR",
                              })
                              .split(".")[0]
                          }
                        </Grid>
                      </div>
                      <div className="border98"></div>
                      <div className="d-flex justify-content-between ">
                        <Grid
                          sx={{
                            fontFamily: "Jost",
                            fontWeight: "500",
                            fontSize: 18,
                          }}
                        >
                          Total Payable Amount
                          <Typography
                            sx={{
                              fontFamily: "Jost",
                              fontWeight: "500",
                              fontSize: 12,
                              color: "#767676",
                            }}
                          >
                            (Incl. of all taxes)
                          </Typography>
                        </Grid>
                        <Grid
                          sx={{
                            fontFamily: "Jost",
                            fontWeight: "500",
                            fontSize: 16,
                          }}
                        >
                          {
                            (data?.data?.grand_total ?? "0")
                              .toLocaleString("en-IN", {
                                style: "currency",
                                currency: "INR",
                              })
                              .split(".")[0]
                          }
                        </Grid>
                      </div>
                      <div className="border98"></div>
                    </Box>
                  </Grid>
                </Grid>

                {data?.data?.product_details.length > 0 &&
                  data?.data?.product_details?.map((item: any) => {
                    return (
                      <Box
                        sx={{
                          fontFamily: "Jost",
                          pl: 2.5,
                          pr: 1.5,
                          pt: 1.5,
                          pb: 2.8,
                          border: "1px solid #E5E5E5",
                          mt: 0.5,
                          mb: 1.5,
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "Jost",
                            fontWeight: "500",
                            mb: 1.5,
                          }}
                        >
                          Delivered : {JSON.parse(item.est_delivery)} Days
                        </Typography>
                        <Grid
                          className="rate-review-top"
                          sx={{
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                          }}
                        >
                          <Grid sx={{ display: "flex", marginRight: 5 }}>
                            <img
                              width={112}
                              height={78}
                              alt={item.image_alt_tag}
                              title={item.product_name}
                              src={item.base_image}
                              style={{ marginRight: 10, cursor: "pointer" }}
                              onClick={() => slugKeyHandle(item.slug_key)}
                            />
                            <Grid
                              sx={{
                                fontFamily: "Jost",
                                fontWeight: "500",
                                fontSize: 15,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {item.product_name}
                              <Grid
                                sx={{
                                  fontFamily: "Jost",
                                  fontWeight: "600",
                                  fontSize: 13,
                                  mt: 0.2,
                                  color: "#767676",
                                }}
                              >
                                Order Placed : {event}{" "}
                              </Grid>
                              <Typography
                                sx={{
                                  fontFamily: "Jost",
                                  fontWeight: "600",
                                  fontSize: 17,
                                  mt: 0.2,
                                }}
                              >
                                {
                                  item.sale_price
                                    .toLocaleString("en-IN", {
                                      style: "currency",
                                      currency: "INR",
                                    })
                                    .split(".")[0]
                                }
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid>
                            <button
                              className="rating-top"
                              onClick={() => slugKeyHandle(item.slug_key)}
                              style={{
                                flexWrap: "wrap",
                                background: "#fff",
                                display: "flex",
                                color: "#f15a21",
                                border: "1px solid #f15a21",
                                padding: "7px 10px ",
                                borderRadius: 4,
                                fontSize: 13,
                                fontWeight: "500",
                                textTransform: "uppercase",
                                marginTop: 8,
                              }}
                            >
                              Rate & Review Product
                            </button>
                          </Grid>
                        </Grid>
                      </Box>
                    );
                  })}
              </Grid>
            </div>
          </div>
          <Testimonial />
          <NewsLetter />
        </>
      )}
    </>
  );
};
