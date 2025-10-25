import { useGetHomeSlider } from "@/service/home";
import { Grid, Typography } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Link from "next/link";
import Slider from "react-slick";

function SamplePrevArrow(props) {
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
function SampleNextArrow(props) {
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

const Bedroom_furniture = (props) => {
  const { titleName, paragraph } = props;
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
        },
      },
    ],
  };

  const { data, isLoading } = useGetHomeSlider();
  const homeSliderData = data?.data ?? [];

  return (
    <div className="bedroom-category ">
      <div className="container2">
        <h2 className="font-3624 fw-600 jost for-heading">{titleName}</h2>
        <p className="font-16789 jost fw-normal">{paragraph}</p>
        <section className=" section-1 padding-zero">
          <div className=" px-sm-0">
            <div className="row">
              <div className="col-12 col-lg-12 sm-padding-x">
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
                        <div key={item.slider_id}>
                          <Link
                            as={`${item?.link
                              ?.split("/")
                              ?.slice(-3)
                              ?.join("/")}`}
                            href={`${item?.link
                              ?.split("/")
                              ?.slice(-3)
                              ?.join("/")}`}
                          >
                            <Grid
                              sx={{
                                backgroundImage: `url('${item.slider_image}')`,
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
                                style={{ visibility: "hidden" }}
                                title={item.image_title}
                                alt={item.image_alt_tag}
                              />
                              <div className="imagepixel">
                                <Typography
                                  sx={{
                                    color: "#f15a21",
                                    fontSize: {
                                      xs: 27,
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
                          </Link>
                        </div>
                      ))}
                  </Slider>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Bedroom_furniture;
