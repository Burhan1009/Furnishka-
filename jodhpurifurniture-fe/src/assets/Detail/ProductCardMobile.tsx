import { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import StarIcon from "@mui/icons-material/Star";
import Skeleton from "@mui/material/Skeleton";
import {
  Typography,
  Box,
  Grid,
  Divider,
  IconButton,
  Button,
  Rating,
  styled,
  TextField,
  InputAdornment,
  Dialog,
  createTheme,
  ThemeProvider,
  useTheme,
} from "@mui/material";
import StickyBox from "react-sticky-box";
import "swiper/css/zoom";
import { Share } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { Navigation, Thumbs, Zoom, FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import { useRouter } from "next/router";
import {
  selectProductDetail,
  selectProductDetailReview,
  selectProductFetchSuccess,
  selectProductLoading,
  useOfferAvailabe,
} from "@/service/detail";
import { useGetHeaderCoupon } from "@/service/home";
import { ProductActions } from "@/service/detail/states";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import Link from "next/link";

import { selectAccessToken, selectAuth } from "@/service/auth/globalstate";
import { useAddToWishlist } from "@/service/Profile";
import { toast } from "react-toastify";
import { selectUserCart } from "@/service/cart";
import { cartActions } from "@/service/cart/states";
import { addToCart } from "@/service/cart/cart";
import Login from "../global/Login";
import ThemeProviderWrapper from "@/utils/ThemeProvider";
import Dimensions from "./Dimensions";
import MoreInfoMobile from "./MoreInfoMobile";
import Review from "./Reviews";
import SimilarProduct from "./SimilarProducts";
import ResponsiveDialog from "@/components/CommonPopup";
import RazorpayWidget from "./Widgets";
import RazorpayWidgetMobile from "./MobileWidgets";

const SwiperWrapper = styled(Box)(
  ({ theme }) => `
  .swiper-wrapper {
    
    .swiper-slide {
      display: flex;
      
      align-items: center;
      justify-content: center;

      img {
        width: 100%;
        height: auto;
      }
    }
  }

  .swiper-container-thumbs {
    .swiper-wrapper {
      display: flex;
      align-items: center;
    }

    .swiper-slide {
      width: 140px;
      display: flex;
      padding: 3px;

      img {
        width: 100%;
        height: auto;
        border-radius: 2px;
        opacity: .7;
       
        transition: ${theme.transitions.create(["box-shadow", "opacity"])};
      }

      &:hover {
        cursor: pointer;

        img {
          opacity: 1;
        }
      }

      &.swiper-slide-thumb-active {
        img {
          opacity: 1;
          box-shadow: 0 0 0 3px blue;
        }
      }
    }
  }
`
);

const ZoomWrapper = styled(Box)(
  ({ theme }) => `
  .swiper-wrapper {
    .swiper-slide {
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 60%;
        height: auto;
      }
    }
  }

  .swiper-container-thumbs {
    .swiper-wrapper {
      display: flex;
      align-items: center;
    }

    .swiper-slide {
      width: 140px;
      display: flex;
      padding: 3px;

      img {
        width: 100%;
        height: auto;
        border-radius: 2px;
        opacity: .7;
        transition: ${theme.transitions.create(["box-shadow", "opacity"])};
      }

      &:hover {
        cursor: pointer;

        img {
          opacity: 1;
        }
      }

      &.swiper-slide-thumb-active {
        img {
          opacity: 1;
          box-shadow: 0 0 0 3px blue;
        }
      }
    }
  }
`
);

const ProductCardMobile = ({ resultRef }) => {
  const router = useRouter();

  const themes = useTheme();
  const dispatch = useDispatch();

  const { index } = router.query;
  const token = useSelector(selectAccessToken);

  const auth = useSelector(selectAuth);
  const authData = auth?.length > 0 ? auth[0] : "";
  const getUserCart = useSelector(selectUserCart);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [zoomSwiper, setZoomSwiper] = useState(null);
  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [count, Setcount] = useState(1);

  const handleOpen = () => {
    setIsOpen(!isOpen);
    setShow(false);
  };
  const tokenA = useSelector(selectAccessToken);
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);
  const [prevEl1, setPrevEl1] = useState<HTMLElement | null>(null);
  const [nextEl1, setNextEl1] = useState<HTMLElement | null>(null);
  const [zoomDialog, setZoomDialog] = useState(false);

  const IncreaseNumber = () => {
    Setcount(count + 1);
  };
  const DecreaseNumber = () => {
    if (count <= 1) {
      Setcount(1);
    } else Setcount(count - 1);
  };

  React.useEffect(() => {
    if (index) {
      dispatch(ProductActions.getProductDetail(index));
    }
  }, [dispatch, index]);

  const productData = useSelector(selectProductDetail);

  const isLoading = useSelector(selectProductLoading);
  const productReview1 = useSelector(selectProductDetailReview);
  const productReview = productReview1?.reviews;

  const successFetch = useSelector(selectProductFetchSuccess);

  const reviewsCount =
    productReview?.length &&
    productReview?.map((val) => val.rating).reduce((a, b) => a + b);
  const ratingCount = reviewsCount / productReview?.length;

  const { data } = useGetHeaderCoupon();
  const headerDiscount = data?.data ?? {};
  const [pinValue, setPinValue] = useState("");
  const [pinError, setPinError] = useState(
    "Enter Pincode to get Delivery Date, Assembly Information and other details"
  );
  const handleApplyPincode = () => {
    if (pinValue?.length == 6 && pinValue.match(/^(?!0{6})[0-9]{6}$/)) {
      setPinError("Shipping is available in this area.");
    } else {
      setPinError("Enter valid pincode");
    }
  };

  const { mutate: addTowishlist, data: message } = useAddToWishlist();
  const { data: offerData } = useOfferAvailabe();

  const handleAddWishlist = (product_id) => {
    const body = {
      user_id: authData?.user_id,
      product_id: product_id,
    };
    addTowishlist(body);
  };

  const handleScroll = (e) => {
    e.preventDefault();
    resultRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (message?.success) {
      toast.success(message?.message);
    }
  }, [message]);

  const handleCart = (product_id) => {
    const attributeValues =
      getUserCart?.length > 0 &&
      getUserCart?.filter((val) => val.product_id == product_id);

    const qtyAdd =
      getUserCart?.length &&
      getUserCart?.filter((item) => {
        return attributeValues?.find(
          (val) => val.product_id == item.product_id
        );
      });

    const cartLogin = {
      product_id: product_id ?? "",
      qty: count,
      user_id: authData?.user_id ?? "",
    };

    const addNew = {
      product_id: qtyAdd[0]?.product_id ?? "",
      qty: qtyAdd[0]?.qty + count ?? "",
      user_id: authData?.user_id ?? "",
    };

    if (qtyAdd?.length) {
      dispatch(cartActions.addCart(addNew));
    } else {
      dispatch(cartActions.addCart(cartLogin));
    }
    toast.success("Product added to cart");
  };

  const handleAddToCart = (product_id) => {
    const cartValue = {
      product_id: product_id ?? "",
      qty: count,
    };
    if (cartValue.product_id) {
      dispatch(addToCart(cartValue));
      toast.success("Product added to cart");
    }
  };

  const handleBuynow = (product_id) => {
    const attributeValues =
      getUserCart?.length > 0 &&
      getUserCart?.filter((val) => val.product_id == product_id);

    const qtyAdd =
      getUserCart?.length &&
      getUserCart?.filter((item) => {
        return attributeValues?.find(
          (val) => val.product_id == item.product_id
        );
      });

    const cartLogin = {
      product_id: product_id ?? "",
      qty: count,
      user_id: authData?.user_id ?? "",
    };

    const addNew = {
      product_id: qtyAdd[0]?.product_id ?? "",
      qty: qtyAdd[0]?.qty + count ?? "",
      user_id: authData?.user_id ?? "",
    };

    if (qtyAdd?.length) {
      dispatch(cartActions.addCart(addNew));
    } else {
      dispatch(cartActions.addCart(cartLogin));
    }
    router.push("/cart");
  };

  const handleBuyLocal = (product_id) => {
    const cartValue = {
      product_id: product_id ?? "",
      qty: count,
    };
    if (cartValue.product_id) {
      dispatch(addToCart(cartValue));
      router.push("/cart");
    }
  };

  const handleZoom = () => {
    setZoomDialog(true);
  };

  const handleClose = () => {
    setZoomDialog(false);
  };
  const theme = createTheme({
    palette: {
      primary: {
        main: "rgba(0, 0, 0, 0.23)",
        borderWidth: "1px !important",
      },
    },
    overrides: {
      MuiOutlinedInput: {
        root: {
          "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
            borderColor: "rgba(0, 0, 0, 0.23)",
          },
        },
      },
    },
  });

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#E57200",
      fontSize: 21,
    },
  });
  const afterCoupnPrize = headerDiscount?.rate
    ? headerDiscount?.coupon_code_type == 2
      ? productData?.sale_price -
      (productData?.sale_price * headerDiscount?.rate) / 100
      : productData?.sale_price - headerDiscount?.rate
    : productData?.sale_price;

  const disocunt = productData.regular_price - afterCoupnPrize;
  const discountLable = (disocunt / productData.regular_price) * 100;

  const offerPrize = headerDiscount?.rate
    ? headerDiscount?.coupon_code_type == 2
      ? productData?.sale_price -
      (productData?.sale_price * headerDiscount?.rate) / 100
      : productData?.sale_price - headerDiscount?.rate
    : productData?.sale_price;

  const offerPrice = productData?.regular_price - offerPrize;
  const priceForWidget = offerPrize?.toFixed() * 100;
  const deviceWidth = window.innerWidth < 500 ? true : false

  return (
    <>
      <div>
        <ThemeProviderWrapper>
          {isLoading ? (
            <div className="container2 ">
              <Skeleton
                style={{
                  height: 25,
                  marginBottom: "1.5%",
                  width: "100%",
                  marginTop: 10,
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "5%",
                }}
              >
                <Skeleton
                  style={{
                    height: 15,
                    marginBottom: "1.5%",
                    width: "50%",
                  }}
                />
                <Skeleton
                  style={{
                    height: 15,
                    marginBottom: "1.5%",
                    width: "30%",
                  }}
                />
              </div>
              <Skeleton
                variant="rectangular"
                width={"100%"}
                height={0}
                style={{ paddingTop: "83%" }}
              />
              <div
                className="  d-flex"
                style={{ marginTop: 13, marginBottom: "5%" }}
              >
                <Skeleton
                  variant="rectangular"
                  width={"17%"}
                  height={0}
                  style={{ paddingTop: "11%", marginRight: 10 }}
                />
                <Skeleton
                  variant="rectangular"
                  width={"14%"}
                  height={0}
                  style={{ paddingTop: "11%", marginRight: 10 }}
                />
                <Skeleton
                  variant="rectangular"
                  width={"14%"}
                  height={0}
                  style={{ paddingTop: "11%", marginRight: 10 }}
                />
                <Skeleton
                  variant="rectangular"
                  width={"14%"}
                  height={0}
                  style={{ paddingTop: "11%", marginRight: 10 }}
                />
                <Skeleton
                  variant="rectangular"
                  width={"14%"}
                  height={0}
                  style={{ paddingTop: "11%", marginRight: 10 }}
                />
                <Skeleton
                  variant="rectangular"
                  width={"14%"}
                  height={0}
                  style={{ paddingTop: "11%", marginRight: 10 }}
                />
                <Skeleton
                  variant="rectangular"
                  width={"14%"}
                  height={0}
                  style={{ paddingTop: "11%", marginRight: 10 }}
                />
              </div>
              <Skeleton
                style={{
                  width: "25%",
                  marginBottom: "1%",
                }}
              />
              <div className="d-flex" style={{ marginBottom: "6%" }}>
                <Skeleton
                  variant="rectangular"
                  width={"31%"}
                  height={0}
                  style={{ paddingTop: "25%", marginRight: 12 }}
                />
                <Skeleton
                  variant="rectangular"
                  width={"31%"}
                  height={0}
                  style={{ paddingTop: "25%" }}
                />
              </div>
              <Skeleton
                style={{
                  marginBottom: "0.5%",
                  width: "25%",
                }}
              />
              <Skeleton
                style={{
                  height: 40,

                  marginBottom: "2.5%",
                  width: "40%",
                }}
              />
              <Skeleton
                style={{
                  height: 15,
                  width: "55%",
                }}
              />
              <Skeleton
                style={{
                  height: 150,

                  width: "100%",
                }}
              />
              <Skeleton
                style={{
                  width: "40%",
                  marginBottom: "0.3%",
                }}
              />
              <Skeleton
                style={{
                  width: "100%",
                  height: 90,
                  marginBottom: -20,
                }}
              />

              <Skeleton
                style={{
                  width: "100%",
                  height: 90,
                  marginBottom: "1%",
                }}
              />
              <Skeleton
                style={{
                  width: "20%",
                  height: 15,
                  marginBottom: 1,
                }}
              />
              <Skeleton
                style={{
                  width: "100%",
                  height: 50,
                  marginBottom: "1%",
                }}
              />
              <Skeleton
                style={{
                  width: "80%",
                  height: 30,
                  marginBottom: "4%",
                }}
              />
              <Skeleton
                style={{
                  width: "50%",
                  height: 35,
                  marginBottom: "1%",
                }}
              />
              <Skeleton
                style={{
                  width: "60%",

                  marginBottom: "1%",
                }}
              />
              <Skeleton
                style={{
                  width: "60%",

                  marginBottom: "10%",
                }}
              />
            </div>
          ) : (
            <>
              {successFetch ? (
                <>
                  <div className="container2">
                    <h1
                      style={{
                        lineHeight: 1.5,
                        marginBottom: "1rem",
                        marginTop: 13,
                        color: "#222222",
                        marginLeft: -1.5,
                        fontSize: 16,
                        marginBottom: 9,
                        fontFamily: "Jost",
                        fontWeight: 500,
                      }}
                    >
                      {productData?.product_name}
                    </h1>
                    <Grid
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          marginBottom: 5,
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            textAlign: "center",
                            fontWeight: 500,
                            fontFamily: "Jost",
                            // mt: 0.3,
                            background: "#f15a21",
                            color: "white",
                            borderRadius: "4px",
                            p: "2px 6px",
                            fontSize: 14,
                          }}
                        >
                          {ratingCount.toFixed(2)}
                          <img
                            src="/static/icon/Star 10.svg"
                            style={{ marginTop: -4, marginLeft: 4 }}
                          />
                        </Typography>
                        <span
                          onClick={handleScroll}
                          style={{
                            cursor: "pointer",
                            fontSize: 14,
                            marginLeft: 9,
                            fontFamily: "Jost",
                            fontWeight: 500,
                            color: "#484848",
                          }}
                        >
                          {`${productReview?.length} Reviews &  ${reviewsCount} Reviews`}{" "}
                        </span>
                      </div>

                      {/* <span
                        className="text-hover"
                        style={{
                          cursor: "pointer",
                          fontSize: 14,

                          fontWeight: 400,
                          color: "#484848",
                        }}
                        onClick={
                          tokenA
                            ? () => handleAddWishlist(productData?.product_id)
                            : handleOpen
                        }
                      >
                        <i
                          style={{
                            marginRight: 7,
                          }}
                          className="fa-regular fa-heart"
                        >
                          {" "}
                        </i>{" "}
                        Add to wishlist
                      </span> */}
                    </Grid>
                  </div>

                  <Grid item xs={12}>
                    <Grid container spacing={0}>
                      <Grid
                        xs={12}
                        md={6}
                        item
                        sx={{
                          position: "relative",
                        }}
                      >
                        <div className="container2">
                          <Box
                            component="span"
                            sx={{
                              display: { xs: "none", md: "inline-block" },
                            }}
                          ></Box>

                          <StickyBox offsetTop={20} offsetBottom={20}>
                            <Box>
                              <SwiperWrapper>
                                <Box
                                  sx={{
                                    position: "relative",
                                    mt: 2.5,
                                  }}
                                >
                                  <Swiper
                                    thumbs={{
                                      swiper:
                                        thumbsSwiper && !thumbsSwiper.destroyed
                                          ? thumbsSwiper
                                          : null,
                                    }}
                                    spaceBetween={15}
                                    autoplay={true}
                                    slidesPerView={1}
                                    modules={[Navigation, FreeMode, Thumbs]}
                                    navigation={{ prevEl, nextEl }}
                                  >
                                    {productData?.multiple_image?.length &&
                                      productData?.multiple_image?.map(
                                        (value, index) => {
                                          return (
                                            <SwiperSlide
                                              key={index}
                                              style={{ background: "#f4f9fc" }}
                                            >
                                              <LazyLoadImage
                                                effect="blur"
                                                width="100%"
                                                onClick={handleZoom}
                                                style={{
                                                  cursor: "pointer",
                                                  color: "black",
                                                }}
                                                src={value.image}
                                                alt={value.multi_image_alt_tag}
                                                title={
                                                  productData?.product_name
                                                }
                                              />
                                            </SwiperSlide>
                                          );
                                        }
                                      )}
                                  </Swiper>

                                  <span
                                    style={{ position: "absolute" }}
                                    className="swiper-button-next"
                                    ref={(node) => setNextEl(node)}
                                  ></span>
                                  <span
                                    style={{ position: "absolute" }}
                                    className="swiper-button-prev"
                                    ref={(node) => setPrevEl(node)}
                                  ></span>
                                </Box>
                                <Box mt={1.5}>
                                  <Swiper
                                    onSwiper={setThumbsSwiper}
                                    watchSlidesProgress
                                    slidesPerView={8}
                                    modules={[Thumbs, FreeMode]}
                                    freeMode={true}
                                    className="mySwiper"
                                    spaceBetween={6.1}
                                  >
                                    {productData?.multiple_image?.length &&
                                      productData?.multiple_image?.map(
                                        (value, index) => {
                                          return (
                                            <SwiperSlide
                                              key={index}
                                              style={{
                                                flexWrap: "wrap",
                                                width: 88,
                                                background: "#f4f9fc",
                                              }}
                                            >
                                              <Box
                                                sx={{
                                                  border: "1px solid #f4f9fc",
                                                  background: "#f4f9fc",
                                                  // marginBottom: 1,
                                                }}
                                              >
                                                <LazyLoadImage
                                                  effect="blur"
                                                  style={{
                                                    cursor: "pointer",
                                                    color: "black",
                                                  }}
                                                  src={value.image}
                                                  alt={
                                                    value.multi_image_alt_tag
                                                  }
                                                  title={
                                                    productData?.product_name
                                                  }
                                                />
                                              </Box>
                                            </SwiperSlide>
                                          );
                                        }
                                      )}
                                  </Swiper>
                                </Box>
                              </SwiperWrapper>
                            </Box>
                          </StickyBox>
                        </div>
                      </Grid>
                      <Grid item xs={12} md={6} container>
                        <Box
                          sx={{
                            pl: { xs: 0, md: 4 },
                            pt: { md: 3.5 },
                          }}
                          flex={1}
                        >
                          <Grid>
                            {productData?.related_products?.length ? (
                              productData?.related_products?.map((item) => (
                                <Grid mt={2}>
                                  <div className="container2">
                                    <Typography
                                      className="font1688"
                                      style={{
                                        textTransform: "capitalize",
                                        fontFamily: "Jost",
                                        marginBottom: 8,
                                      }}
                                      fontWeight={500}
                                    >
                                      {item.label}
                                    </Typography>

                                    <Grid
                                      sx={{
                                        display: "flex",
                                        gap: 1,
                                        flexWrap: "wrap",
                                      }}
                                    >
                                      {item?.data?.length &&
                                        item.data?.map((val) => (
                                          <Link href={`/${val.slug_key}`}>
                                            <Grid>
                                              {val.display_image == true ? (
                                                <>
                                                  <Box
                                                    sx={{
                                                      width: {
                                                        xs: 125,
                                                      },

                                                      mb: 0.5,

                                                      background: "#F5F5F5",

                                                      border:
                                                        val.slug_key == index
                                                          ? "1px solid #f15a21"
                                                          : "1px solid #E5E5E5",
                                                    }}
                                                    style={{
                                                      paddingLeft: "7px",
                                                      paddingRight: " 7px",
                                                      paddingTop: "6.8px",
                                                      paddingBottom: "6.8px",
                                                    }}
                                                  >
                                                    <LazyLoadImage
                                                      effect="blur"
                                                      width={109}
                                                      height="auto"
                                                      src={val.base_image}
                                                      title={val.child_label}
                                                    />
                                                  </Box>
                                                  <Typography
                                                    sx={{
                                                      textAlign: "center",

                                                      fontSize: {
                                                        xs: 14,
                                                      },
                                                      color: "#222222",
                                                      fontFamily: "Jost",
                                                      fontWeight: "400",
                                                      textTransform:
                                                        "capitalize",
                                                    }}
                                                  >
                                                    {val.child_label}
                                                  </Typography>
                                                </>
                                              ) : (
                                                <Typography
                                                  style={{
                                                    minWidth: 84,
                                                    height: 36,
                                                    padding: 6,
                                                    color: "#222222",
                                                    fontFamily: "Jost",
                                                    fontWeight: 400,
                                                    textTransform: "capitalize",
                                                    fontSize: 14,
                                                    marginBottom: 5,
                                                    backgroundColor:
                                                      val.slug_key == index
                                                        ? "rgba(249, 117, 55, 0.07)"
                                                        : "#FBF8F4",
                                                    border:
                                                      val.slug_key == index
                                                        ? "1px solid #f15a21"
                                                        : "1px solid #E5E5E5",
                                                  }}
                                                  align="center"
                                                >
                                                  {val.child_label}
                                                </Typography>
                                              )}
                                            </Grid>
                                          </Link>
                                        ))}
                                    </Grid>
                                  </div>
                                  <div
                                    className="p-098"
                                    style={{ marginTop: 12 }}
                                  >
                                    <div className="border2"></div>
                                  </div>
                                </Grid>
                              ))
                            ) : (
                              <> </>
                            )}

                            <div className="p-098" style={{ marginTop: 4 }}>
                              <div className="border23"></div>
                            </div>
                            <div className="container2">
                              <p
                                className="fw-500 font1688"
                                style={{
                                  marginTop: 16,
                                  fontFamily: "Jost",
                                  color: "#767676",
                                  textDecorationLine: "line-through",
                                }}
                              >
                                MRP:{" "}
                                {
                                  productData?.regular_price
                                    .toLocaleString("en-IN", {
                                      style: "currency",
                                      currency: "INR",
                                    })
                                    .split(".")[0]
                                }
                              </p>
                              <div style={{ display: "flex" }}>
                                <p
                                  className="font26653"
                                  style={{
                                    fontWeight: 600,
                                    fontFamily: "Jost",
                                    color: "#222222",
                                    marginTop: -16,
                                    marginBottom: 0,
                                  }}
                                >
                                  Offer:{" "}
                                  {
                                    offerPrize
                                      .toLocaleString("en-IN", {
                                        style: "currency",
                                        currency: "INR",
                                      })
                                      .split(".")[0]
                                  }
                                </p>
                                <span
                                  style={{
                                    fontSize: 15,
                                    fontWeight: 500,
                                    fontFamily: "Jost",
                                    color: "#4CAF50",
                                    marginLeft: 6,
                                    marginTop: -6,
                                  }}
                                >
                                  {" "}
                                  {`${~~discountLable}% OFF`}
                                </span>
                              </div>
                              <p
                                style={{
                                  marginBottom: -4,
                                  fontSize: 15,
                                  marginTop: 8,
                                  fontWeight: 500,
                                  fontFamily: "Jost",
                                  color: "#484848",
                                }}
                              >
                                To Get This Price, Apply Coupon: {"  "}
                                <span
                                  style={{
                                    fontSize: 15,
                                    fontWeight: 500,
                                    fontFamily: "Jost",
                                    color: "#f15a21",
                                  }}
                                >
                                  {" "}
                                  {` "${headerDiscount?.coupon_code}" `}
                                </span>
                              </p>
                              {/* <div
                                style={{ padding: 0, marginTop: 15 }}
                                id="razorpay-affordability-widget"
                              ></div> */}
                              {deviceWidth &&
                                <RazorpayWidgetMobile amount={priceForWidget} />
                              }
                              <>
                                <Divider
                                  sx={{
                                    mt: "22px",
                                    border: "1px solid #2222",
                                  }}
                                />
                              </>

                              {!!offerData?.data?.length &&
                                <Box>
                                  <Typography
                                    variant="h6"
                                    sx={{
                                      font: "jost",
                                      fontSize: "16px",
                                      color: "#222222",
                                      pt: 1.5,
                                    }}
                                  >
                                    Available Offers
                                  </Typography>
                                  <Box
                                    mt="12px"
                                    sx={{
                                      borderBottom:
                                        " 1px solid rgb(229, 229,229)",
                                      paddingBottom: "18px",
                                      display: "flex",
                                      flexDirection: "column",
                                      gap: "10px",
                                    }}
                                  >
                                    {offerData?.data?.map((val) => {
                                      return (
                                        <Typography
                                          variant="body1"
                                          sx={{
                                            fontSize: "14px",
                                            fontWeight: "500",
                                            font: "jost",
                                            lineHeight: "2",
                                          }}
                                        >
                                          <img
                                            style={{
                                              width: "14px",
                                              height: "14px",
                                              marginRight: "6px",
                                            }}
                                            src="/static/icon/Frame.svg"
                                            alt=""
                                          />
                                          <strong
                                            style={{
                                              fontSize: "14px",
                                              color: "#222222",
                                              fontFamily: "jost",
                                              fontWeight: "600",
                                            }}
                                          >
                                            {val.offer_type}:
                                          </strong>
                                          <span
                                            style={{
                                              fontSize: "14px",
                                              fontWeight: "400",
                                              font: "jost",
                                              paddingLeft: "5px",
                                              paddingRight: "5px",
                                            }}
                                          >
                                            {val.offer_title}
                                          </span>

                                          <ResponsiveDialog
                                            offerDescription={
                                              val.offer_description
                                            }
                                          />
                                        </Typography>
                                      );
                                    })}
                                  </Box>
                                </Box>
                              }
                              <Grid sx={{ mt: 3, display: "flex" }}>
                                <Typography
                                  fontWeight={500}
                                  sx={{
                                    fontSize: 16,
                                    mt: 0.5,
                                    mr: 2.09,

                                    fontFamily: "Jost",
                                    color: "#222",
                                  }}
                                >
                                  Quantity
                                </Typography>
                                <div className="qty3">
                                  <button
                                    className="qty-btn-minus3"
                                    onClick={DecreaseNumber}
                                    type="button"
                                  >
                                    <img src={"/static/images/minus.svg"} />
                                  </button>
                                  <Typography
                                    sx={{ fontSize: 13, fontWeight: "500" }}
                                    className="input-qty3"
                                  >
                                    {count}
                                  </Typography>
                                  <button
                                    className="qty-btn-plus3"
                                    onClick={IncreaseNumber}
                                    type="button"
                                  >
                                    <img src={"/static/images/plus11.svg"} />
                                  </button>
                                </div>
                              </Grid>
                              <Grid sx={{ mt: 3 }}>
                                <Typography
                                  className="font1688"
                                  fontWeight={600}
                                  mt={1}
                                  sx={{ fontFamily: "Jost", color: "#222" }}
                                >
                                  Delivery
                                </Typography>
                                <Grid>
                                  <ThemeProvider theme={theme}>
                                    <TextField
                                      size="small"
                                      placeholder="Pincode"
                                      fullWidth
                                      sx={{
                                        mt: 1.5,

                                        fontFamily: "Jost",
                                        borderColor: "black",

                                        "& .MuiOutlinedInput-root": {
                                          borderRadius: 0,
                                          "&.Mui-focused fieldset": {
                                            borderColor: "rgba(0, 0, 0, 0.23)",
                                          },
                                          "& label.Mui-focused": {
                                            borderColor:
                                              "0.5px solid rgba(0, 0, 0, 0.23)",
                                          },
                                          "&:hover fieldset": {
                                            borderColor: "rgba(0, 0, 0, 0.23)",
                                          },
                                        },

                                        input: {
                                          color: "#222",

                                          "&::placeholder": {
                                            opacity: 1,
                                            fontFamily: "Jost",
                                          },
                                        },

                                        background: "rgba(248, 248, 248, 0.33)",
                                      }}
                                      onChange={(e) => {
                                        setPinValue(e.target.value);
                                        setPinError("");
                                      }}
                                      InputProps={{
                                        style: { paddingRight: 0 },

                                        endAdornment: (
                                          <InputAdornment position="end">
                                            <IconButton
                                              aria-label="toggle password visibility"
                                              onClick={handleApplyPincode}
                                              // edge="end"
                                              sx={{
                                                background: "#f15a21",
                                                color: "#fff",
                                                borderRadius: "4px",
                                                padding: "8px",

                                                // marginRight: "-5px",
                                                // paddingRight: 0,
                                                // border: "none",
                                                border: "1px solid #f15a21",

                                                zIndex: "999",
                                                outline: "none",
                                                "&:hover": {
                                                  background: "#f15a21",
                                                  color: "#fff",
                                                },
                                              }}
                                            >
                                              <Typography
                                                sx={{
                                                  fontSize: 14,
                                                  color: "#fff",
                                                  fontFamily: "Jost",
                                                  fontWeight: 500,
                                                }}
                                              >
                                                CHECK
                                              </Typography>
                                            </IconButton>
                                          </InputAdornment>
                                        ),
                                      }}
                                    />
                                  </ThemeProvider>

                                  <Typography
                                    sx={{
                                      width: { xs: "auto", md: 328, lg: 348 },
                                      fontSize: 12,
                                      fontFamily: "Jost",
                                      fontWeight: 400,
                                      color:
                                        pinError ==
                                          "Shipping is available in this area."
                                          ? "green"
                                          : "#222222",
                                      mt: 0.8,
                                      ml: 0.1,
                                    }}
                                  >
                                    {pinError}
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 1.2,
                                  mt: 2.5,
                                }}
                              >
                                {" "}
                                <Button
                                  onClick={
                                    token
                                      ? () => handleCart(productData.product_id)
                                      : () =>
                                        handleAddToCart(
                                          productData.product_id
                                        )
                                  }
                                  variant="contained"
                                  fullWidth
                                  startIcon={
                                    <img
                                      src={"/static/icon/Arrow - Right1.svg"}
                                      style={{ marginRight: 5 }}
                                    />
                                  }
                                  style={{
                                    fontFamily: "Jost",
                                    fontWeight: 500,
                                  }}
                                  sx={{
                                    fontSize: { xs: 18, sm: 16, lg: 16 },
                                    height: { sm: 50, lg: 60 },
                                    width: {
                                      xs: "none",
                                      sm: 248,
                                      md: 210,
                                      lg: 248,
                                    },
                                    background: "#f15a21",
                                    borderRadius: "3px",
                                    border: "1px solid #f15a21",
                                    color: "white",
                                    ":hover": {
                                      bgcolor: "#f15a21",
                                      color: "white",
                                    },
                                  }}
                                >
                                  {"       "}ADD TO CART
                                </Button>
                                <Button
                                  onClick={
                                    token
                                      ? () =>
                                        handleBuynow(productData.product_id)
                                      : () =>
                                        handleBuyLocal(productData.product_id)
                                  }
                                  startIcon={
                                    <img
                                      src={"/static/icon/Buy1.svg"}
                                      style={{
                                        marginLeft: -15,
                                        marginRight: 5,
                                      }}
                                    />
                                  }
                                  variant="contained"
                                  fullWidth
                                  style={{
                                    fontFamily: "Jost",
                                    fontWeight: 500,
                                  }}
                                  sx={{
                                    fontSize: { xs: 18, sm: 16, lg: 16 },
                                    height: { sm: 50, lg: 60 },
                                    width: {
                                      xs: "none",
                                      sm: 248,
                                      md: 210,
                                      lg: 248,
                                    },
                                    background: "#f15a21",
                                    borderRadius: "3px",
                                    textTransform: "capitalize",
                                    ":hover": {
                                      bgcolor: "#f15a21",
                                      color: "white",
                                    },
                                  }}
                                >
                                  {"       "}BUY NOW
                                </Button>
                              </Grid>
                            </div>
                          </Grid>
                          <div className="container2">
                            <div
                              className="social-media"
                              style={{
                                display: "flex",
                                marginTop: 30,
                                alignItems: "center",
                              }}
                            >
                              <Share fontSize="small" />

                              <Typography
                                sx={{
                                  fontWeight: "500",
                                  fontFamily: "Jost",
                                  ml: 0.7,
                                  color: "#513015",
                                  mr: 1.4,
                                }}
                              >
                                Share This Product
                              </Typography>
                              <Link
                                as={`https://www.facebook.com/sharer/sharer.php?u=https://wwww.jodhpurifurniture.com/${productData.slug_key}`}
                                href={`https://www.facebook.com/sharer/sharer.php?u=https://wwww.jodhpurifurniture.com/${productData.slug_key}?cat_id=${productData.product_id}`}
                              >
                                <i
                                  className="fa-brands fa-square-facebook"
                                  style={{
                                    color: "#513015",
                                    marginRight: 15,
                                  }}
                                ></i>
                              </Link>

                              <Link
                                as={`https://www.instagram.com/?url=https://wwww.jodhpurifurniture.com/${productData.slug_key}`}
                                href={`https://www.instagram.com/?url=https://wwww.jodhpurifurniture.com/${productData.slug_key}?cat_id=${productData.product_id}`}
                              >
                                <i
                                  className="fa-brands fa-square-instagram"
                                  style={{
                                    color: "#513015",
                                    marginRight: 15,
                                  }}
                                ></i>
                              </Link>
                              <Link
                                as={`http://pinterest.com/pin/create/button/?url=https://wwww.jodhpurifurniture.com/${productData.slug_key}`}
                                href={`http://pinterest.com/pin/create/button/?url=https://wwww.jodhpurifurniture.com/${productData.slug_key}?cat_id=${productData.product_id}`}
                              >
                                <i
                                  className="fa-brands fa-pinterest"
                                  style={{
                                    color: "#513015",
                                    marginRight: 15,
                                  }}
                                ></i>
                              </Link>
                              <Link
                                as={`http://twitter.com/share?text=Louise Cabinet&url=https://wwww.jodhpurifurniture.com/${productData.slug_key}`}
                                href={`http://twitter.com/share?text=Louise Cabinet&url=https://wwww.jodhpurifurniture.com/${productData.slug_key}?cat_id=${productData.product_id}`}
                              >
                                <i
                                  className="fa-brands fa-twitter"
                                  style={{
                                    color: "#513015",
                                    marginRight: 15,
                                  }}
                                ></i>
                              </Link>
                              <Link
                                as={`https://api.whatsapp.com/send?text=https://wwww.jodhpurifurniture.com//${productData.slug_key}`}
                                href={`https://api.whatsapp.com/send?text=https://wwww.jodhpurifurniture.com/${productData.slug_key}?cat_id=${productData.product_id}`}
                              >
                                <i
                                  className="fa-brands fa-square-whatsapp"
                                  style={{
                                    color: "#513015",
                                    marginRight: 15,
                                  }}
                                ></i>
                              </Link>
                            </div>
                            <Grid sx={{ mt: 2.5, mb: { xs: 5, sm: 0 } }}>
                              <Typography
                                sx={{
                                  fontSize: {
                                    xs: "20px",
                                    sm: "20px",
                                    md: "19px",
                                    lg: "20px",
                                  },
                                  color: "#222222",
                                  fontFamily: "Jost",
                                  fontWeight: 500,
                                  textTransform: "capitalize",
                                }}
                              >
                                Product Description
                              </Typography>
                              {productData?.sku && (
                                <Grid container sx={{ mt: 1 }}>
                                  <>
                                    {" "}
                                    <Grid item xs={6}>
                                      <Typography
                                        sx={{
                                          fontSize: { xs: 14, sm: 14 },
                                          fontWeight: 500,
                                          fontFamily: "Jost",
                                          color: "#222",
                                        }}
                                      >
                                        SKU
                                      </Typography>
                                      <Typography
                                        sx={{
                                          fontSize: { xs: 14, sm: 14 },
                                          fontWeight: 500,
                                          fontFamily: "Jost",
                                          color: "#767676",
                                        }}
                                      >
                                        {/* BRF103 */}
                                        {productData?.sku}
                                      </Typography>
                                    </Grid>
                                  </>
                                </Grid>
                              )}
                              {productData?.category_name && (
                                <Grid sx={{ display: "flex", mb: 0.8 }}>
                                  <>
                                    {" "}
                                    <Box>
                                      <Typography
                                        sx={{
                                          fontSize: { xs: 14, sm: 14 },
                                          fontWeight: 500,
                                          fontFamily: "Jost",
                                          color: "#222",
                                        }}
                                      >
                                        Category
                                      </Typography>
                                      <Typography
                                        sx={{
                                          fontSize: { xs: 14, sm: 14 },
                                          fontWeight: 500,
                                          fontFamily: "Jost",
                                          color: "#767676",
                                        }}
                                      >
                                        krishna
                                      </Typography>
                                    </Box>
                                    <Box>
                                      <Typography
                                        sx={{
                                          fontSize: { xs: 14, sm: 14 },
                                          fontWeight: 500,
                                          fontFamily: "Jost",
                                          color: "#222",
                                          ml: { xs: 11.7, sm: 12.5 },
                                        }}
                                      >
                                        {productData?.category_name}
                                      </Typography>
                                      <Typography
                                        sx={{
                                          fontSize: { xs: 14, sm: 14 },
                                          fontWeight: 500,
                                          fontFamily: "Jost",
                                          color: "#767676",
                                          ml: { xs: 11.7, sm: 12.5 },
                                        }}
                                      >
                                        krishna
                                      </Typography>
                                    </Box>
                                  </>
                                </Grid>
                              )}

                              {productData?.product_description?.length && (
                                <>
                                  <Grid
                                    container
                                    sx={{ display: "flex", flexWrap: "wrap" }}
                                  >
                                    {productData?.product_description?.length &&
                                      productData?.product_description?.map(
                                        (item, index) => {
                                          return (
                                            <Grid item xs={6} key={index}>
                                              <Grid
                                                mt={0}
                                                alignItems="center"
                                                container
                                                rowSpacing={1}
                                                columnSpacing={{
                                                  xs: 1,
                                                  sm: 2,
                                                  md: 3,
                                                }}
                                              >
                                                <Grid item xs={6}>
                                                  <Box>
                                                    <Typography
                                                      sx={{
                                                        fontSize: {
                                                          xs: 14,
                                                          sm: 14,
                                                        },
                                                        fontWeight: 500,
                                                        fontFamily: "Jost",
                                                        color: "#222",
                                                      }}
                                                    >
                                                      {item.label}
                                                    </Typography>
                                                    <Typography
                                                      sx={{
                                                        fontSize: {
                                                          xs: 14,
                                                          sm: 14,
                                                        },
                                                        fontWeight: 500,
                                                        fontFamily: "Jost",
                                                        color: "#767676",
                                                      }}
                                                    >
                                                      {item.info}
                                                    </Typography>
                                                  </Box>
                                                </Grid>
                                                <Grid
                                                  sx={{
                                                    mt: 0.8,
                                                    ml: {
                                                      xs: 1.1,
                                                      sm: 1.8,
                                                      md: "43px",
                                                    },
                                                    mb: 0.8,
                                                    flex: "wrap",
                                                  }}
                                                ></Grid>
                                              </Grid>
                                            </Grid>
                                          );
                                        }
                                      )}
                                  </Grid>
                                </>
                              )}
                              <Grid container mt="8px">
                                {productData?.dimension_value?.length && (
                                  <>
                                    <Grid item xs={6} sx={{}}>
                                      {productData?.dimension_value?.length &&
                                        productData?.dimension_value?.map(
                                          (item, index) => {
                                            return (
                                              <Box
                                                key={index}
                                                sx={{
                                                  maxWidth: {
                                                    xs: 200,
                                                    sm: 360,
                                                  },
                                                }}
                                              >
                                                <Grid
                                                  rowSpacing={1}
                                                  columnSpacing={{
                                                    xs: 1,
                                                    sm: 2,
                                                    md: 3,
                                                  }}
                                                >
                                                  <Grid item>
                                                    <Box>
                                                      <Typography
                                                        sx={{
                                                          fontSize: {
                                                            xs: 14,
                                                            sm: 14,
                                                          },
                                                          width: {
                                                            xs: 50,
                                                            sm: 145,
                                                            md: "unset",
                                                          },
                                                          fontWeight: 500,
                                                          fontFamily: "Jost",
                                                          color: "#222",
                                                        }}
                                                      >
                                                        {item.labels}
                                                      </Typography>
                                                      <Box display="flex">
                                                        <Typography
                                                          sx={{
                                                            fontSize: {
                                                              xs: 14,
                                                              sm: 14,
                                                            },
                                                            fontWeight: 500,
                                                            fontFamily: "Jost",
                                                            color: "#767676",
                                                          }}
                                                        >
                                                          {item.lengths} L x
                                                        </Typography>

                                                        <Typography
                                                          sx={{
                                                            fontSize: {
                                                              xs: 14,
                                                              sm: 14,
                                                            },
                                                            fontWeight: 500,
                                                            fontFamily: "Jost",
                                                            color: "#767676",
                                                            ml: 1,
                                                          }}
                                                        >
                                                          {item.widths} W x
                                                        </Typography>
                                                        <Typography
                                                          sx={{
                                                            fontSize: {
                                                              xs: 14,
                                                              sm: 14,
                                                            },
                                                            fontWeight: 500,
                                                            fontFamily: "Jost",
                                                            color: "#767676",
                                                            ml: 1,
                                                          }}
                                                        >
                                                          {item.heights} H
                                                        </Typography>
                                                      </Box>
                                                    </Box>
                                                  </Grid>
                                                </Grid>
                                              </Box>
                                            );
                                          }
                                        )}
                                    </Grid>
                                  </>
                                )}
                                {productData?.est_delivery && (
                                  <Grid item xs={6} sx={{}}>
                                    <>
                                      {" "}
                                      <Box>
                                        <Typography
                                          sx={{
                                            fontSize: { xs: 14, sm: 14 },
                                            fontWeight: 500,
                                            fontFamily: "Jost",
                                            color: "#222",
                                          }}
                                        >
                                          Ships In
                                        </Typography>
                                        <Typography
                                          sx={{
                                            fontSize: { xs: 14, sm: 14 },
                                            fontWeight: 500,
                                            fontFamily: "Jost",
                                            color: "#767676",
                                          }}
                                        >
                                          {/* krishna */}{" "}
                                          {productData?.est_delivery} Days
                                        </Typography>
                                      </Box>
                                    </>
                                  </Grid>
                                )}
                                <Grid
                                  item
                                  xs={6}
                                  sx={{
                                    mt: 0.8,
                                    maxWidth: { xs: 310, sm: "none" },
                                  }}
                                >
                                  <>
                                    {" "}
                                    <Box>
                                      <Typography
                                        sx={{
                                          fontSize: { xs: 14, sm: 14 },
                                          fontWeight: 500,
                                          fontFamily: "Jost",
                                          color: "#222",
                                        }}
                                      >
                                        Caring Instruction
                                      </Typography>
                                      <Typography
                                        sx={{
                                          fontSize: { xs: 14, sm: 14 },
                                          fontWeight: 500,
                                          fontFamily: "Jost",
                                          color: "#767676",
                                        }}
                                      >
                                        Professional cleaning only
                                      </Typography>
                                    </Box>
                                  </>
                                </Grid>
                                <Grid item xs={6} sx={{ mt: 0.8 }}>
                                  <>
                                    {" "}
                                    <Box>
                                      <Typography
                                        sx={{
                                          fontSize: { xs: 14, sm: 14 },
                                          fontWeight: 500,
                                          fontFamily: "Jost",
                                          color: "#222",
                                        }}
                                      >
                                        Delivery Condition
                                      </Typography>
                                      <Typography
                                        sx={{
                                          fontSize: { xs: 14, sm: 14 },
                                          fontWeight: 500,
                                          fontFamily: "Jost",
                                          color: "#767676",
                                        }}
                                      >
                                        Knocked-down
                                      </Typography>
                                    </Box>
                                  </>
                                </Grid>
                              </Grid>
                            </Grid>
                          </div>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid mt={10} mb={15}>
                    <Typography variant="h5" align="center">
                      This product is not available currently
                    </Typography>
                    <Link href="/">
                      {" "}
                      <Typography mt={5} align="center">
                        <button className="back-to-home">Back to Home</button>
                      </Typography>
                    </Link>
                  </Grid>
                </>
              )}
            </>
          )}

          <Dialog
            sx={{ zIndex: themes.zIndex.modal + 1 }}
            fullScreen
            open={zoomDialog}
            onClose={handleClose}
          >
            <Grid sx={{ background: "#F8F8F8" }}>
              <IconButton
                color="inherit"
                onClick={handleClose}
                aria-label="close"
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 0,
                  "&:hover": {
                    background: "transparent",
                  },
                }}
              >
                <CloseIcon />
              </IconButton>
              <div
                className="social-media"
                style={{
                  display: "flex",

                  padding: 10,
                  justifyContent: "end",
                  marginRight: 38,
                  alignItems: "center",
                }}
              >
                <Share fontSize="small" />

                <Typography
                  sx={{
                    fontWeight: "500",
                    fontFamily: "Jost",
                    ml: 0.7,
                    color: "#222",
                    mr: 1.4,
                    fontSize: { xs: 12, sm: 16 },
                  }}
                >
                  Share Product
                </Typography>
                <Link
                  as={`https://www.facebook.com/sharer/sharer.php?u=https://wwww.jodhpurifurniture.com/${productData.slug_key}`}
                  href={`https://www.facebook.com/sharer/sharer.php?u=https://wwww.jodhpurifurniture.com/${productData.slug_key}?cat_id=${productData.product_id}`}
                >
                  <i
                    className="fa-brands fa-square-facebook"
                    style={{ color: "#222", marginRight: 15 }}
                  ></i>
                </Link>

                <Link
                  as={`https://www.instagram.com/?url=https://wwww.jodhpurifurniture.com/${productData.slug_key}`}
                  href={`https://www.instagram.com/?url=https://wwww.jodhpurifurniture.com/${productData.slug_key}?cat_id=${productData.product_id}`}
                >
                  <i
                    className="fa-brands fa-square-instagram"
                    style={{ color: "#222", marginRight: 15 }}
                  ></i>
                </Link>
                <Link
                  as={`http://pinterest.com/pin/create/button/?url=https://wwww.jodhpurifurniture.com/${productData.slug_key}`}
                  href={`http://pinterest.com/pin/create/button/?url=https://wwww.jodhpurifurniture.com/${productData.slug_key}?cat_id=${productData.product_id}`}
                >
                  <i
                    className="fa-brands fa-pinterest"
                    style={{ color: "#222", marginRight: 15 }}
                  ></i>
                </Link>
                <Link
                  as={`http://twitter.com/share?text=Louise Cabinet&url=https://wwww.jodhpurifurniture.com/${productData.slug_key}`}
                  href={`http://twitter.com/share?text=Louise Cabinet&url=https://wwww.jodhpurifurniture.com/${productData.slug_key}?cat_id=${productData.product_id}`}
                >
                  <i
                    className="fa-brands fa-twitter"
                    style={{ color: "#222", marginRight: 15 }}
                  ></i>
                </Link>
                <Link
                  as={`https://api.whatsapp.com/send?text=https://wwww.jodhpurifurniture.com//${productData.slug_key}`}
                  href={`https://api.whatsapp.com/send?text=https://wwww.jodhpurifurniture.com/${productData.slug_key}?cat_id=${productData.product_id}`}
                >
                  <i
                    className="fa-brands fa-square-whatsapp"
                    style={{ color: "#222", marginRight: 15 }}
                  ></i>
                </Link>
              </div>
            </Grid>
            <Grid sx={{ mt: 2.5 }} className="swiper-next234">
              <ZoomWrapper className="swiper-next" sx={{ display: "flex" }}>
                <Swiper
                  thumbs={{
                    swiper:
                      zoomSwiper && !zoomSwiper.destroyed ? zoomSwiper : null,
                  }}
                  zoom={true}
                  autoplay={true}
                  slidesPerView={1}
                  modules={[Zoom, Navigation, FreeMode, Thumbs]}
                  navigation={{ prevEl1, nextEl1 }}
                  className="abc"
                >
                  {productData?.multiple_image?.length &&
                    productData?.multiple_image?.map((value, index) => {
                      return (
                        <SwiperSlide key={index} style={{}}>
                          <div className="swiper-zoom-container">
                            <img
                              className="swiper-zoom-container"
                              width={"100%"}
                              onClick={handleZoom}
                              style={{ cursor: "pointer" }}
                              src={value.image}
                              alt={value.multi_image_alt_tag}
                              title={productData?.product_name}
                            />
                          </div>
                        </SwiperSlide>
                      );
                    })}
                </Swiper>

                <Box sx={{ overflowY: "scroll", height: 600 }}>
                  <Typography
                    className="title-top-margin font-24678"
                    sx={{
                      color: "#222222",
                      mb: 1.3,
                      fontFamily: "Jost",
                      fontWeight: 500,
                    }}
                  >
                    {productData?.product_name}
                  </Typography>
                  <Swiper
                    onSwiper={setZoomSwiper}
                    watchSlidesProgress
                    slidesPerView={5}
                    modules={[Thumbs, FreeMode]}
                    freeMode={true}
                    centeredSlides={false}
                    centerInsufficientSlides={true}
                    className="mySwiper zoom-box-image box-swipper-img swwipp"
                    spaceBetween={8}
                  >
                    {productData?.multiple_image?.length &&
                      productData?.multiple_image?.map((value, index) => {
                        return (
                          <SwiperSlide
                            style={{ display: "flex", flexWrap: "wrap" }}
                            key={index}
                          >
                            <Box
                              sx={{
                                border: "1px solid #E5E5E5",
                                background: "#E5E5E5",
                                mb: 3,
                              }}
                            >
                              <img
                                style={{ cursor: "pointer" }}
                                src={value.image}
                                alt={value.multi_image_alt_tag}
                                title={productData?.product_name}
                              />
                            </Box>
                          </SwiperSlide>
                        );
                      })}
                  </Swiper>
                </Box>
              </ZoomWrapper>
            </Grid>
          </Dialog>
        </ThemeProviderWrapper>
        <div className="dimensions-border"></div>
        <Dimensions />
        <div className="dimensions-border " style={{ marginTop: -71 }}></div>
        <MoreInfoMobile />
        <div className="dimensions-border" style={{ marginBottom: -57 }}></div>
        <Review ref={resultRef} />
        <div
          className="dimensions-border2 border-m-b2"
          style={{ marginTop: 30 }}
        ></div>
        <SimilarProduct />
      </div>
      <Login
        isAddDialogOpened={isOpen}
        handleCloseDialog={() => setIsOpen(false)}
      />
    </>
  );
};

export default ProductCardMobile;
