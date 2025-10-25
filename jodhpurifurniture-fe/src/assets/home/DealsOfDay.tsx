import Slider from "react-slick";
import { styled, Box, CardMedia, useTheme, Typography } from "@mui/material";
import { useGetDealOfDay } from "@/service/home";
import Links from "@/Link";
import { useDispatch } from "react-redux";
import { OtherCatActions } from "@/service/listing/states";
import Skeleton from "@mui/material/Skeleton";
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
        alignItems: "center",
        justifyContent: "center",
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
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClick}
    >
      <img src={"/static/images/vectorR.svg"} />
    </div>
  );
}
const skeletonArray = new Array(8).fill(null);

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
function DealsOfDay() {
  const { ref, inView } = useInView();
  const theme = useTheme();
  const { data, isLoading } = useGetDealOfDay({
    enabled: inView,
  });
  const dispatch = useDispatch();
  const dealOfday = data?.Deals ?? [];

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
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
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
        breakpoint: 480,
        settings: {
          slidesToShow: 2.03,

          rows: 2,

          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <>
      <section className="section-9 container-fluid margin-section-9" ref={ref}>
        <div className="container">
          <>
            <Typography className="wideH1">Deals Of The Day</Typography>
            <p>Explore the latest deal of the day</p>
          </>

          <div style={{ overflow: "hidden" }} className="row">
            {isLoading ? (
              <Slider {...settings}>
                {skeletonArray.map((_, index) => (
                  <div style={{ marginTop: 25 }} className="col-lg-4">
                    <SkeletonBlock key={index} />
                  </div>
                ))}
              </Slider>
            ) : (
              <Slider {...settings}>
                {dealOfday?.length > 0 &&
                  dealOfday.map(function pCard(item, index) {
                    return (
                      <>
                        <Links
                          onClick={() =>
                            dispatch(OtherCatActions.lastUrlClear())
                          }
                          as={`/${item.slug_key}`}
                          href={`/${item.slug_key}`}
                        >
                          <Box
                            key={index}
                            sx={{
                              textAlign: "center",
                              position: "relative",
                              borderRadius: 0.5,
                            }}
                          >
                            <div
                              style={{ cursor: "pointer" }}
                              className="image-box"
                            >
                              <CardMedia
                                component="img"
                                style={{ borderRadius: 4 }}
                                sx={{
                                  fontSize: 14,
                                  borderRadius: "inherit",
                                  position: "relative",
                                  zIndex: 5,
                                  transition: "300ms ease",
                                  "&:hover": {
                                    transform: "scale(1.05)",
                                  },
                                }}
                                title={item.product_name}
                                image={item.base_image}
                                alt={item.image_alt_tag}
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
                                    xs: "4px",
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
                                {`${item.discount_percentage}% off`}
                              </Label>
                            </CardActions>
                          </Box>
{/* Burhan code Here  */}
                          <div className="card2 ">
                            <span
                              className="font-1623 jost color-22222 "
                              style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: "1",
                                WebkitBoxOrient: "vertical",
                              }}
                            >
                              {item.product_name}
                            </span>
                            <div className="bottom-span">
                              <span
                                style={{ color: "#000" }}
                                className="jost font-162 fw-600"
                              >
                                {
                                  item.discount_price
                                    .toLocaleString("en-IN", {
                                      style: "currency",
                                      currency: "INR",
                                    })
                                    .split(".")[0]
                                }
                              </span>{" "}
                              <strike className="font-142">
                                {
                                  item.regular_price
                                    .toLocaleString("en-IN", {
                                      style: "currency",
                                      currency: "INR",
                                    })
                                    .split(".")[0]
                                }
                              </strike>
                            </div>
                          </div>
                        </Links>
                      </>
                    );
                  })}
              </Slider>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
export default DealsOfDay;
