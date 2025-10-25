import { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import StarIcon from "@mui/icons-material/Star";
import "swiper/swiper.min.css";
import "swiper/css/zoom";
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
import { Share } from "@mui/icons-material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import CloseIcon from "@mui/icons-material/Close";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
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

import {
  selectAccessToken,
  selectAuth,
  selectLastUrl,
  selectallcategory,
} from "@/service/auth/globalstate";
import { useAddToWishlist } from "@/service/Profile";
import { toast } from "react-toastify";
import { selectCartWithoutLogin, selectUserCart } from "@/service/cart";
import { cartActions } from "@/service/cart/states";
import { addToCart } from "@/service/cart/cart";
import Login from "../global/Login";
import ThemeProviderWrapper from "@/utils/ThemeProvider";
import Custom404 from "../404_page";
import ResponsiveDialog from "@/components/CommonPopup";
import RazorpayAffordabilityWidget from "./Widgets";
import RazorpayWidget from "./Widgets";

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

const productCard = ({ resultRef }) => {
  const router = useRouter();
  const { searchFor } = router?.query;
  const themes = useTheme();
  const dispatch = useDispatch();

  const otherAllCategory = useSelector(selectallcategory);

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
  const prevUrl = useSelector(selectLastUrl);
  const successFetch = useSelector(selectProductFetchSuccess);

  const reviewsCount =
    productReview?.length &&
    productReview?.map((val) => val.rating).reduce((a, b) => a + b);
  const ratingCount = reviewsCount / productReview?.length;

  const { data } = useGetHeaderCoupon();
  const headerDiscount = data?.data ?? {};

  const [pinValue, setPinValue] = useState("");
  const [pinError, setPinError] = useState(
    "Check Delivery availability by are your area"
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
  console.log({ otherAllCategory });
  const prevBredcrumb = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/"
      style={{
        marginTop: -1,
        color: "#767676",
        fontSize: 14,
        fontWeight: 400,
        fontFamily: "Jost",
      }}
    >
      Home
    </Link>,
    <Link
      key="2"
      color="inherit"
      href={`/${otherAllCategory[0]?.parent_category_name ?? ""}`}
      style={{
        color: "#767676",
        marginTop: 4,
        textTransform: "capitalize",
        fontSize: 14,
        fontWeight: 400,
        fontFamily: "Jost",
      }}
    >
      {otherAllCategory[0]?.parent_category_name ?? ""}
    </Link>,
    <Link
      key="3"
      href={`/${otherAllCategory[0]?.parent_category_name}/${otherAllCategory[0]?.sub_slug_key}`}
      style={{
        color: "#767676",
        marginTop: 4,
        textTransform: "capitalize",
        fontSize: 14,
        fontWeight: 400,
        fontFamily: "Jost",
      }}
    >
      {otherAllCategory[0]?.sub_category_name ?? ""}
    </Link>,
    <Link
      underline="hover"
      key="4"
      style={{
        color: "#484848",
        textTransform: "capitalize",
        fontSize: 14,
        fontWeight: 400,
        fontFamily: "Jost",
      }}
      href={`/${otherAllCategory[0]?.parent_category_name}/${otherAllCategory[0]?.sub_slug_key}/${prevUrl}`}
    >
      {otherAllCategory[0]?.category_name ?? ""}
    </Link>,
  ];
  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/"
      style={{
        color: "#767676",
        fontSize: 14,
        fontWeight: 400,
        fontFamily: "Jost",
      }}
    >
      Home
    </Link>,
    <Typography
      component={"span"}
      key="2"
      color="inherit"
      style={{
        color: "#767676",
        marginTop: 4,
        textTransform: "capitalize",
        fontSize: 14,
        fontWeight: 400,
        fontFamily: "Jost",
      }}
    >
      {index?.replace(/-/g, " ")}
    </Typography>,
  ];

  const SearchBreadCrumb = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/"
      style={{
        color: "#767676",
        fontSize: 14,
        fontWeight: 400,
        fontFamily: "Jost",
      }}
    >
      Home
    </Link>,
    <Link
      underline="hover"
      key="4"
      style={{
        color: "#484848",
        textTransform: "capitalize",
        fontSize: 14,
        fontWeight: 400,
        fontFamily: "Jost",
      }}
      href={`/listing?keyword=${searchFor}`}
    >
      {searchFor}
    </Link>,
    <Typography
      component={"span"}
      key="2"
      color="inherit"
      style={{
        color: "#767676",
        marginTop: 4,
        textTransform: "capitalize",
        fontSize: 14,
        fontWeight: 400,
        fontFamily: "Jost",
      }}
    >
      {index?.replace(/-/g, " ")}
    </Typography>,
  ];
  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#f15a21",
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
  const style = {
    borderTop: "1px solid rgb(142 142 142)",
    marginTop: "18px",
    marginBottom: "8px",
  };

  const priceForWidget = offerPrize?.toFixed() * 100;
  const deviceWidth = window.innerWidth > 500 ? true : false

  return (
    <>
      <div>
        <ThemeProviderWrapper>
          {isLoading && !successFetch ? (
            <>
              <div className="container2 ">
                <div className="row">
                  <div className="col-lg-6">
                    <StickyBox offsetTop={20} offsetBottom={20}>
                      <Skeleton
                        style={{
                          height: 20,
                          marginBottom: "3%",
                          width: "40%",
                          marginTop: 10,
                        }}
                      />{" "}
                      <Skeleton
                        variant="rectangular"
                        width={"100%"}
                        height={0}
                        style={{ paddingTop: "83%" }}
                      />
                      <div className="  d-flex" style={{ marginTop: 13 }}>
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
                        <Skeleton
                          variant="rectangular"
                          width={"14%"}
                          height={0}
                          style={{ paddingTop: "11%", marginRight: 10 }}
                        />
                      </div>
                    </StickyBox>
                  </div>
                  <div className="col-lg-6">
                    <Skeleton
                      style={{
                        height: 40,

                        marginBottom: "0.5%",
                        width: "100%",
                        marginTop: "6.5%",
                      }}
                    />
                    <Skeleton
                      style={{
                        height: 40,

                        marginBottom: "2%",
                        width: "40%",
                      }}
                    />
                    <Skeleton
                      style={{
                        marginBottom: "4%",
                        width: "60%",
                      }}
                    />
                    <Skeleton
                      style={{
                        marginBottom: "1%",
                        width: "20%",
                      }}
                    />
                    <Skeleton
                      style={{
                        height: 40,

                        marginBottom: "2.5%",
                        width: "30%",
                      }}
                    />
                    <Skeleton
                      style={{
                        width: "45%",
                      }}
                    />
                    <Skeleton
                      style={{
                        height: 100,

                        marginBottom: "0.5%",
                        width: "100%",
                      }}
                    />
                    <Skeleton
                      style={{
                        width: "20%",
                        marginBottom: "1%",
                      }}
                    />
                    <div className="d-flex" style={{ marginBottom: "2%" }}>
                      <Skeleton
                        variant="rectangular"
                        width={"21%"}
                        height={0}
                        style={{ paddingTop: "17%", marginRight: 12 }}
                      />
                      <Skeleton
                        variant="rectangular"
                        width={"21%"}
                        height={0}
                        style={{ paddingTop: "17%" }}
                      />
                    </div>
                    <Skeleton
                      style={{
                        width: "40%",
                        height: 70,
                        marginBottom: "0.3%",
                      }}
                    />
                    <Skeleton
                      style={{
                        width: "70%",
                        height: 70,
                        marginBottom: "1%",
                      }}
                    />
                    <div className="d-flex" style={{ marginBottom: "1.5%" }}>
                      <Skeleton
                        style={{
                          width: "70%",
                          height: 90,
                          marginBottom: "1%",
                          marginRight: 12,
                        }}
                      />
                      <Skeleton
                        style={{
                          width: "70%",
                          height: 90,
                          marginBottom: "1%",
                          marginRight: 12,
                        }}
                      />
                    </div>
                    <Skeleton
                      style={{
                        width: "80%",
                        height: 30,
                        marginBottom: "1%",
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

                        marginBottom: "1%",
                      }}
                    />
                    <Skeleton
                      style={{
                        width: "60%",

                        marginBottom: "1%",
                      }}
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {successFetch ? (
                <div className="container2">
                  <Grid
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    container
                  >
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
                          <Box
                            component="span"
                            sx={{
                              display: { xs: "none", md: "inline-block" },
                            }}
                          ></Box>
                          <StickyBox offsetTop={20} offsetBottom={20}>
                            <Box>
                              <Breadcrumbs
                                className="breadcrumbs-desk   "
                                sx={{
                                  mt: { sm: 2, md: -0.8 },
                                  mb: { sm: 1, md: 3.2 },
                                  background: "#f4f9fc",
                                }}
                                separator={
                                  <NavigateNextIcon fontSize="small" />
                                }
                                aria-label="breadcrumb"
                              >
                                {prevUrl
                                  ? prevBredcrumb
                                  : searchFor
                                    ? SearchBreadCrumb
                                    : breadcrumbs}
                              </Breadcrumbs>
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
                        </Grid>
                        <Grid item xs={12} md={6} container>
                          <Box
                            sx={{
                              mt: { xs: 3, md: 3 },
                              pl: { xs: 0, md: 4 },
                              pt: { md: 3.5 },
                            }}
                            flex={1}
                          >
                            <h1
                              className="font2665"
                              style={{
                                lineHeight: 1.5,
                                marginBottom: "1rem",
                                color: "#222222",
                                marginLeft: -1.5,

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
                                alignItems: "center",
                                gap: 2,
                                mt: -1,
                              }}
                            >
                              {" "}
                              {ratingCount && (
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
                              )}
                              <span
                                onClick={handleScroll}
                                style={{
                                  cursor: "pointer",
                                  fontSize: 14,

                                  fontFamily: "Jost",
                                  fontWeight: 500,
                                  color: "#484848",
                                }}
                              >
                                {`${productReview?.length} Reviews &  ${reviewsCount} Reviews`}{" "}
                              </span>
                            </Grid>
                            <Grid
                              mt={1.3}
                              sx={{
                                // borderTop: "1px solid #e9e9e9",
                                paddingTop: 1.2,
                              }}
                            >
                              <p
                                className="fw-500 font1688"
                                style={{
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
                                  Offer Price:{" "}
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
                                    marginTop: -8,
                                  }}
                                >
                                  {" "}
                                  {`${~~discountLable}% OFF`}
                                </span>
                              </div>
                              <p
                                style={{
                                  marginBottom: -4,
                                  fontSize: 16,
                                  marginTop: 8,
                                  fontWeight: 500,
                                  fontFamily: "Jost",
                                  color: "#484848",
                                }}
                              >
                                To Get This Price, Apply Coupon: {"  "}
                                <span
                                  style={{
                                    fontSize: 16,
                                    fontWeight: 500,
                                    fontFamily: "Jost",
                                    color: "#f15a21",
                                  }}
                                >
                                  {" "}
                                  {` "${headerDiscount?.coupon_code}" `}
                                </span>
                              </p>
                              {deviceWidth &&
                                <RazorpayWidget amount={priceForWidget} />
                              }

                              {/* <p
                                className="font15576"
                                style={{
                                  marginBottom: -4,

                                  marginTop: 8,
                                  fontWeight: 500,
                                  fontFamily: "Jost",
                                  color: "#222222",
                                }}
                              >
                                You Total Savings: {"  "}
                                {
                                  offerPrice
                                    .toLocaleString("en-IN", {
                                      style: "currency",
                                      currency: "INR",
                                    })
                                    .split(".")[0]
                                }
                                <span
                                  style={{
                                    fontSize: 15,
                                    fontWeight: 500,
                                    fontFamily: "Jost",
                                    color: "#4CAF50",
                                  }}
                                >
                                  {" "}
                                  ({`${~~discountLable}% OFF`})
                                </span>
                              </p> */}
                              {headerDiscount?.coupon_code && (
                                <>
                                  <hr style={style} />
                                  {!!offerData?.data?.length && (
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
                                        mt="10px"
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
                                  )}
                                  <Grid
                                    sx={{
                                      mt: 2,
                                      gap: 3,
                                      borderBottom:
                                        " 1px solid rgb(229, 229,229)",
                                      paddingBottom: "18px",
                                    }}
                                  >
                                    <Typography
                                      className="font1688"
                                      fontWeight={600}
                                      mt="-4px"
                                      mb={0.8}
                                      sx={{ fontFamily: "Jost", color: "#222" }}
                                    >
                                      Delivery
                                    </Typography>
                                    <Grid
                                      sx={{
                                        width: "58%",
                                        marginLeft: "10px",
                                      }}
                                    >
                                      <ThemeProvider theme={theme}>
                                        <TextField
                                          size="small"
                                          placeholder="Enter Pincode"
                                          fullWidth
                                          sx={{
                                            fontFamily: "Jost",
                                            borderColor: "black",

                                            "& .MuiOutlinedInput-root": {
                                              borderRadius: 0,
                                              "&.Mui-focused fieldset": {
                                                borderColor:
                                                  "rgba(0, 0, 0, 0.23)",
                                              },
                                              "& label.Mui-focused": {
                                                borderColor:
                                                  "0.5px solid rgba(0, 0, 0, 0.23)",
                                              },
                                              "&:hover fieldset": {
                                                borderColor:
                                                  "rgba(0, 0, 0, 0.23)",
                                              },
                                            },

                                            input: {
                                              color: "#222",

                                              "&::placeholder": {
                                                opacity: 1,
                                                fontFamily: "Jost",
                                              },
                                            },

                                            ml: -1,
                                            background:
                                              "rgba(248, 248, 248, 0.33)",
                                          }}
                                          onChange={(e) => {
                                            setPinValue(e.target.value);
                                            setPinError("");
                                          }}
                                          InputProps={{
                                            style: { paddingRight: 0 },
                                            endAdornment: (
                                              <InputAdornment
                                                position="end"
                                                style={{ borderRadius: 8 }}
                                              >
                                                <IconButton
                                                  aria-label="toggle password visibility"
                                                  onClick={handleApplyPincode}
                                                  sx={{
                                                    background: "#f15a21",
                                                    color: "#fff",
                                                    borderRadius: "4px",
                                                    padding: "8px",

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
                                          width: {
                                            xs: "auto",
                                            md: 328,
                                            lg: 348,
                                          },
                                          fontSize: 12,
                                          fontFamily: "Jost",
                                          fontWeight: 400,
                                          color:
                                            pinError ==
                                              "Shipping is available in this area."
                                              ? "green"
                                              : "#222222",
                                          mt: 0.8,
                                          ml: -0.7,
                                        }}
                                      >
                                        {pinError}
                                        {/* Check Delivery availabilty by are your
                                        area */}
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                  {/* <hr style={style} /> */}
                                </>
                              )}
                              {productData?.related_products?.length ? (
                                productData?.related_products?.map((item) => (
                                  <Grid
                                    mt={1.2}
                                    // key={index}
                                    className="didvider_bottom"
                                  >
                                    <Typography
                                      className="font1688"
                                      style={{
                                        textTransform: "capitalize",
                                        fontFamily: "Jost",
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
                                          <>
                                            <Link
                                              // key={index}
                                              href={`/${val.slug_key}`}
                                            >
                                              <Grid>
                                                {val.display_image == true ? (
                                                  <>
                                                    <Box
                                                      sx={{
                                                        width: {
                                                          xs: 120,
                                                          sm: 120,
                                                        },
                                                        mt: 1,
                                                        pl: 1,
                                                        pr: 1.3,
                                                        pt: 1.2,
                                                        pb: 1.2,
                                                        background: "#FBF8F4",
                                                        border:
                                                          val.slug_key == index
                                                            ? "1px solid #f15a21"
                                                            : "1px solid #E5E5E5",
                                                      }}
                                                    >
                                                      <LazyLoadImage
                                                        effect="blur"
                                                        width={100}
                                                        height="auto"
                                                        src={val.base_image}
                                                        title={val.child_label}
                                                      />
                                                    </Box>
                                                    <Typography
                                                      sx={{
                                                        textAlign: "center",
                                                        mt: 0.5,
                                                        fontSize: {
                                                          xs: 14,
                                                          sm: 14,
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
                                                      textTransform:
                                                        "capitalize",
                                                      fontSize: 14,
                                                      backgroundColor:
                                                        val.slug_key == index
                                                          ? "rgba(249, 117, 55, 0.07)"
                                                          : "#FBF8F4",
                                                      border:
                                                        val.slug_key == index
                                                          ? "1px solid #f15a21"
                                                          : "1px solid #E5E5E5",
                                                    }}
                                                    mt={0.5}
                                                    align="center"
                                                  >
                                                    {val.child_label}
                                                  </Typography>
                                                )}
                                              </Grid>
                                            </Link>
                                          </>
                                        ))}
                                    </Grid>
                                    <hr style={style} />
                                  </Grid>
                                ))
                              ) : (
                                <></>
                              )}
                              <Grid
                                sx={{
                                  mt: 3,
                                  display: "flex",
                                  alignItems: "center",
                                  background: "#FBF8F4",
                                }}
                              >
                                <form style={{ position: "relative" }}>
                                  <label
                                    for=""
                                    style={{
                                      fontFamily: "jost",
                                      fontSize: "14px",
                                      fontWeight: "500",
                                      color: "#222222",
                                      marginRight: "25px",
                                    }}
                                  >
                                    Quantity
                                  </label>
                                  <select
                                    name=""
                                    id=""
                                    className="cartItem_select"
                                  >
                                    <option value="1">QTY 1</option>
                                    <option value="2">QTY 2</option>
                                    <option value="3">QTY 3</option>
                                    <option value="4">QTY 4</option>
                                    <option value="5">QTY 5</option>
                                    <option value="6">QTY 6</option>
                                  </select>
                                  <span className="select_border"></span>
                                  <br />
                                </form>
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
                                      handleAddToCart(productData.product_id)
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
                                    ? () => handleBuynow(productData.product_id)
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
                              <>
                                <span
                                  style={{
                                    marginTop: -2.5,
                                    color: "#767676",
                                  }}
                                >
                                  |
                                </span>
                                <span
                                  className="text-hover"
                                  style={{
                                    cursor: "pointer",
                                    fontSize: 14,
                                    fontWeight: 400,
                                    color: "#484848",
                                    marginLeft: 13,
                                  }}
                                  onClick={
                                    tokenA
                                      ? () =>
                                        handleAddWishlist(
                                          productData?.product_id
                                        )
                                      : handleOpen
                                  }
                                >
                                  <img
                                    src="/static/icon/heart1.svg"
                                    style={{
                                      marginRight: 7,
                                    }}
                                  />
                                  {/* <i
                                    style={{
                                      marginRight: 7,
                                    }}
                                    className="fa-regular fa-heart"
                                  >
                                    {" "}
                                  </i>{" "} */}
                                  Add to wishlist
                                </span>
                              </>
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
                                  color: "#513015222",
                                  fontFamily: "Jost",
                                  fontWeight: 500,
                                  textTransform: "capitalize",
                                }}
                              >
                                Product Details
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
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              ) : (
                <>
                  <Custom404 />
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
            <Grid className="swiper-next234">
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
                              alt={productData?.image_alt_tag}
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
                    style={{ gap: 28 }}
                    onSwiper={setZoomSwiper}
                    watchSlidesProgress
                    slidesPerView={5}
                    modules={[Thumbs, FreeMode]}
                    freeMode={true}
                    centeredSlides={false}
                    centerInsufficientSlides={true}
                    className="mySwiper zoom-box-image box-swipper-img swwipp"
                    spaceBetween={10}
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
                                mb: 1.2,
                              }}
                            >
                              <img
                                style={{ cursor: "pointer" }}
                                src={value.image}
                                alt={productData?.image_alt_tag}
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
      </div>
      <Login
        isAddDialogOpened={isOpen}
        handleCloseDialog={() => setIsOpen(false)}
      />
    </>
  );
};

export default productCard;
