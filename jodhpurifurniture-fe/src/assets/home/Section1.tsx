import { useGetHomeSlider, useRightBanner } from "@/service/home";
import { useInView } from "react-intersection-observer";
import { Grid, Typography } from "@mui/material";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from "@mui/material/Skeleton";

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

        height: 36,
        width: 27,
        justifyContent: "center",
        alignItems: "center",
        placeItems: "center",
        top: "50%",
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
    <div className="sec8-box3">
      <div
        className={className}
        style={{
          ...style,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#ffffff99",
          position: "absolute",
          height: 36,
          width: 27,

          placeItems: "center",
          top: "50%",
          right: 0,
        }}
        onClick={onClick}
      >
        <img src={"/static/images/vectorR.svg"} />
      </div>
    </div>
  );
}
function Section1() {
  const { ref, inView } = useInView();
  const { data, isLoading } = useGetHomeSlider({ enabled: inView });
  const homeSliderData = data?.data ?? [];
  const { data: RightBanner, isLoading: RightBannerLoading } = useRightBanner();
  const homeRightBanner = RightBanner?.data ?? [];

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    nextArrow: <SampleNextArrow className="slick-prev" />,
    prevArrow: <SamplePrevArrow className="slick-prev" />,
    responsive: [
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          autoplay: false,
        },
      },
    ],
  };

  return (
    <>
      <section className="container-fluid section-1" ref={ref}>
        <div className="container ">
          <div className="row">
            <div className="col-12  sm-padding-x">
              {isLoading ? (
                <Skeleton
                  variant="rectangular"
                  width={"100%"}
                  height={0}
                  style={{ paddingTop: "57%" }}
                />
              ) : (
                <Slider {...settings}>
                  {homeSliderData?.length > 0 &&
                    homeSliderData?.map((item: any) => (
                      <>
                        <Link
                          as={`${item?.link?.split("/")?.slice(-3)?.join("/")}`}
                          href={`${item?.link
                            ?.split("/")
                            ?.slice(-3)
                            ?.join("/")}`}
                        >
                          <div key={item.slider_id}>
                            <Grid
                              sx={{
                                width: "100%",
                                position: "relative",
                                textTransform: "capitalize",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                              }}
                            >
                              <img
                                src={item.slider_image}
                                width={"100%"}
                                title={item.image_title}
                                alt={item.image_alt_tag}
                              />
                              <div className="imagepixel">
                                <Typography
                                  sx={{
                                    color: "#f15a21",
                                    fontSize: {
                                      xs: 28,
                                      sm: 30,
                                      md: 32,
                                      lg: 48,
                                    },
                                    fontWeight: "600",
                                    fontFamily: "Jost",
                                  }}
                                >
                                  {item.title}
                                </Typography>
                              </div>
                            </Grid>
                          </div>
                        </Link>
                      </>
                    ))}
                </Slider>
              )}
            </div>
            {/* {RightBannerLoading ? (
              <div className=" col-lg-4 image-show">
                {" "}
                <Skeleton
                  variant="rectangular"
                  width={"100%"}
                  height={0}
                  style={{ paddingTop: "117%" }}
                />
              </div>
            ) : (
              <>
                {homeRightBanner?.length > 0 ? (
                  homeRightBanner?.map((item: any) => (
                    <Link
                      className="image-show col-lg-4"
                      as={`${item?.link?.split("/")?.slice(-3)?.join("/")}`}
                      href={`${item?.link?.split("/")?.slice(-3)?.join("/")}`}
                    >
                      <Grid
                        sx={{
                          position: "relative",

                          width: "100%",
                          backgroundSize: "cover",
                          backgroundPosition: "left",
                        }}
                      >
                        <img
                          alt={item.image_alt_tag}
                          src={item?.image}
                          width={"100%"}
                          title={item.image_title}
                        />
                        <div className="imagepixel">
                          <Typography
                            sx={{
                              color: "#f15a21",
                              fontSize: { xs: 28, sm: 25, md: 28, lg: 40 },
                              fontWeight: "600",
                              fontFamily: "Jost",
                              mb: 0.3,
                            }}
                          >
                            {" "}
                            {item.title}
                          </Typography>
                        </div>
                      </Grid>
                    </Link>
                  ))
                ) : (
                  <Link
                    className="image-show col-lg-4"
                    as={`/bedroom/buy-bed-online/wooden-king-size-bed`}
                    href={`/bedroom/buy-bed-online/wooden-king-size-bed`}
                  >
                    <Grid
                      sx={{
                        position: "relative",

                        width: "100%",
                        backgroundSize: "cover",
                        backgroundPosition: "left",
                      }}
                    >
                      <img
                        src={"/static/images/sticky-bed.jpg"}
                        width={"100%"}
                        alt="Bedroom Suite"
                        title="Bedroom Suite"
                      />
                      <div className="imagepixel">
                        <Typography
                          sx={{
                            color: "#f15a21",
                            fontSize: { xs: 28, sm: 25, md: 28, lg: 40 },
                            fontWeight: "600",
                            fontFamily: "Jost",
                            mb: 0.3,
                          }}
                        >
                          {" "}
                          Bedroom Suite
                        </Typography>
                        <Grid sx={{}}>
                          <Typography
                            sx={{
                              color: "#484848",
                              fontSize: { xs: 14, sm: 17, md: 18, lg: 24 },
                              fontWeight: "500",
                              fontFamily: "Jost",
                              padding: { md: 0.2, lg: 0 },
                              mt: 1,
                            }}
                          >
                            <span
                              style={{
                                background: "rgb(255 255 255 / 43%)",
                                padding: "4px 17px",
                              }}
                            >
                              Up To 55% Off
                            </span>
                          </Typography>
                        </Grid>

                        <Link
                          as={`/bedroom/buy-bed-online/wooden-king-size-bed`}
                          href={`/bedroom/buy-bed-online/wooden-king-size-bed`}
                        >
                          <button className="btn-1 jost font-16 fw-500">
                            Buy Now
                          </button>
                        </Link>
                      </div>
                    </Grid>
                  </Link>
                )}
              </>
            )} */}
          </div>
        </div>
      </section>
    </>
  );
}
export default Section1;
