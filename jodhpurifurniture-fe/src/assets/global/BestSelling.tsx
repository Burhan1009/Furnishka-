import { useGetBestSelling } from "@/service/home";

import { CardMedia, IconButton, styled } from "@mui/material";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";
import Link from "next/link";
import { OtherCatActions } from "@/service/listing/states";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { selectAccessToken } from "@/service/auth/globalstate";
import { Offcanvas } from "react-bootstrap";
import SidebarContent from "./SidebarContent";
import Login from "./Login";
import Links from "@/Link";
import { useInView } from "react-intersection-observer";

const Label = styled(Box)(
  ({ theme }) => `
      background: ${theme.palette.success.main};
      color: ${theme.palette.success.contrastText};
      text-transform: uppercase;
      font-size: ${theme.typography.pxToRem(10)};
     
      line-height: 23px;
      
      padding: ${theme.spacing(0, 1.2)};
      border-radius: 50px;
    `
);
const CardActions = styled(Box)(
  ({ theme }) => `
      position: absolute;
      right: ${theme.spacing(2)};
      bottom: ${theme.spacing(2)};
      z-index: 7;
    `
);

function SamplePrevArrow(props: {
  className?: any;
  style?: any;
  onClick?: any;
}) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        background: "white",
        height: 36,
        width: 27,
        placeItems: "center",
        top: "40%",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={onClick}
    >
      <img src={"/static/images/arrow-pre.svg"} />
    </div>
  );
}
function SampleNextArrow(props: {
  className?: any;
  style?: any;
  onClick?: any;
}) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        background: "white",
        height: 36,
        width: 27,
        placeItems: "center",
        top: "40%",
        right: 0,
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={onClick}
    >
      <img src={"/static/images/vectorR.svg"} />
    </div>
  );
}

function BestSelling() {
  const { ref, inView } = useInView();
  const { data, isLoading } = useGetBestSelling({ enabled: inView });
  const betSellingProduct = data?.data ?? [];
  const theme = useTheme();
  const dispatch = useDispatch();
  useEffect(() => {
    OtherCatActions.getOtherCategory(undefined);
  }, []);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          arrows: false,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          slidesToShow: 2.03,
          rows: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  const router = useRouter();
  const [show, setShow] = useState(false);
  const tokenA = useSelector(selectAccessToken);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
    setShow(false);
  };
  const handleClose = () => setShow(false);

  const skeletonArray = new Array(4).fill(null);

  const SkeletonBlock = () => (
    <>
      <Skeleton
        variant="rectangular"
        width={"100%"}
        height={0}
        style={{ paddingTop: "80%", borderRadius: 4 }}
      />
      <Skeleton />
      <Skeleton width="60%" style={{ marginBottom: "15%" }} />
    </>
  );
  return (
    <>
      <Offcanvas show={show} onHide={handleClose}>
        <Typography
          p={2}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          {" "}
          <Offcanvas.Title>
            {" "}
            <img onClick={handleClose} src="/static/media/backdrop.svg" />
            <Link href="/">
              <img
                style={{ marginLeft: 12 }}
                src={"/static/images/logo.svg"}
                width={100}
                alt=""
                className="logo"
              />
            </Link>
          </Offcanvas.Title>
          {tokenA ? (
            <>
              <Typography sx={{ display: { md: "none" } }}>
                <IconButton sx={{ mt: { xs: 0.7, md: 0.4 } }} aria-label="cart">
                  <img
                    onClick={() => router.push("/my-account")}
                    src={"/static/icon/Profile.png"}
                  />
                </IconButton>
              </Typography>
            </>
          ) : (
            <Typography mt={1}>
              <button onClick={handleOpen} className="login-sm">
                Register / Login
              </button>
            </Typography>
          )}
        </Typography>

        <SidebarContent />
      </Offcanvas>
      <section className="container-fluid section-4" ref={ref}>
        <div className="container">
          <>
            <Typography className="wideH1">Best Selling Products</Typography>
            <p>Must have collection</p>
          </>

          <div className="row">
            {isLoading ? (
              <>
                {skeletonArray.map((_, index) => (
                  <div className="col-6 col-lg col-sm col-md">
                    <SkeletonBlock key={index} />
                  </div>
                ))}
              </>
            ) : (
              <Slider {...settings}>
                {betSellingProduct?.length > 0 &&
                  betSellingProduct?.map((item: any) => {
                    const spcp = Math.round(
                      ((item.price - item.discounted_price) / item.price) * 100
                    );

                    return (
                      <Links
                        onClick={() => dispatch(OtherCatActions.lastUrl())}
                        as={`${item.link}`}
                        href={`${item.link}`}
                      >
                        <Box
                          key={item.trendy_id}
                          sx={{
                            textAlign: "center",
                            position: "relative",
                            borderRadius: 0.5,
                          }}
                        >
                          {" "}
                          <div className="card2 image-box ">
                            <CardMedia
                              component="img"
                              style={{ borderRadius: 4 }}
                              sx={{
                                position: "relative",
                                fontSize: 14,
                                zIndex: 5,
                                "&:hover": {
                                  transform: "scale(1.05)",
                                },
                              }}
                              image={item.trendy_image}
                              alt={item.image_alt_tag}
                              title={item.image_title}
                            />
                          </div>
                          <CardActions
                            sx={{
                              bottom: "auto",
                              top: `${theme.spacing(1.3)}`,
                              right: "auto",
                              left: `${theme.spacing(1.2)}`,
                              display: "flex",
                            }}
                          >
                            <Label
                              className="tag-margin"
                              sx={{
                                lineHeight: {
                                  xs: "2px",
                                  sm: "6px",

                                  lg: "8px",
                                },

                                fontSize: { xs: 9, sm: 11, md: 13, lg: 14 },
                                p: { xs: 0.7, md: 0.8, lg: 0.8 },

                                fontWeight: "600",
                                borderRadius: "2px",
                                background: `#F97537`,
                                color: `#fff`,
                                textTransform: "capitalize",
                              }}
                            >
                              {`${spcp}% off`}
                            </Label>
                          </CardActions>
                        </Box>

                        <div className="m-bottom">
                          <span
                            className="font-1623 jost color-22222 "
                            style={{
                              overflow: "hidden",
                              textOverflow: "elliTypographysis",
                              display: "-webkit-box",
                              WebkitLineClamp: "1",
                              WebkitBoxOrient: "vertical",
                            }}
                          >
                            {item.title}
                          </span>
                          <span
                            style={{ color: "#000" }}
                            className="jost font-162 fw-600 "
                          >
                            {
                              item.discounted_price
                                .toLocaleString("en-IN", {
                                  style: "currency",
                                  currency: "INR",
                                })
                                .split(".")[0]
                            }
                          </span>{" "}
                          <strike className="font-142">
                            {
                              item.price
                                .toLocaleString("en-IN", {
                                  style: "currency",
                                  currency: "INR",
                                })
                                .split(".")[0]
                            }
                          </strike>
                        </div>
                      </Links>
                    );
                  })}
              </Slider>
            )}
          </div>
        </div>
      </section>
      <Login
        isAddDialogOpened={isOpen}
        handleCloseDialog={() => setIsOpen(false)}
      />
    </>
  );
}
export default BestSelling;
