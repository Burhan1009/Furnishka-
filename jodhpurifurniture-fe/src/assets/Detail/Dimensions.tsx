import { CardMedia, Grid, Typography } from "@mui/material";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import { selectProductDetail, selectProductLoading } from "@/service/detail";
import { useRouter } from "next/router";

function SamplePrevArrow(props: {
  className?: any;
  style?: any;
  onClick?: any;
}) {
  const { className, style, onClick } = props;
  return (
    <Grid
      className={className}
      sx={{
        ...style,
        display: "flex",
        background: "white",
        height: 36,
        width: 27,
        placeItems: "center",
        top: { xs: 140, md: 200 },
      }}
      onClick={onClick}
    >
      <i className="fa-solid fa-angle-left text-center font-16 ms-2"></i>
    </Grid>
  );
}
function SampleNextArrow(props: {
  className?: any;
  style?: any;
  onClick?: any;
}) {
  const { className, style, onClick } = props;
  return (
    <Grid
      className={className}
      sx={{
        ...style,
        display: "flex",
        background: "white",
        height: 36,
        width: 27,
        placeItems: "center",
        top: { xs: 140, md: 200 },
        right: 0,
      }}
      onClick={onClick}
    >
      <i className="fa-solid fa-angle-right text-center font-16 ms-2"></i>
    </Grid>
  );
}
const Dimensions = () => {
  const productData = useSelector(selectProductDetail);
  console.log({ productData });
  const isLoading = useSelector(selectProductLoading);

  const settings = {
    infinite: true,
    className: "center",
    speed: 500,
    slidesToShow: 2.2,
    slidesToScroll: 2,
    arrows: false,
    centerMode: true,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1.6,
          slidesToScroll: 1,
          infinite: true,
          //dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          centerMode: false,
          slidesToShow: 1.5,
          float: "right",
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          centerMode: false,
          slidesToShow: 1.1,
          rows: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const router = useRouter();
  const { index } = router.query;
  return (
    <>
      {productData?.multiple_image ? (
        <>
          {isLoading ? (
            <></>
          ) : (
            <>
              <div className="container2 ">
                <div className="d-flex justify-content-between">
                  <div>
                    <Typography
                      sx={{
                        mt: { xs: -1.5, md: 1 },
                        fontSize: { xs: 20, sm: 23, md: 22, lg: 24 },
                        textAlign: "left",
                        mb: 0.1,
                        fontFamily: "Jost",
                        fontWeight: 500,
                        color: "#222",
                      }}
                    >
                      Dimensions and Assembly
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "left",
                        fontSize: { xs: 15, sm: 15, md: 15 },
                        fontFamily: "Jost",
                        fontWeight: 400,
                        color: "#222",
                        textTransform: "capitalize",
                      }}
                    >
                      {index?.replace(/-/g, " ") ?? ""}{" "}
                    </Typography>
                  </div>
                </div>
              </div>
              <section
                className="container-fluid section-4 slider-d"
                style={{ marginBottom: 80, marginTop: 0 }}
              >
                <div className="row slikk">
                  <Slider {...settings}>
                    {productData?.multiple_image?.length &&
                      productData?.multiple_image.map((value) => {
                        return (
                          <div>
                            <CardMedia
                              component="img"
                              sx={{
                                borderRadius: "inherit",
                                position: "-webkit-sticky",
                                zIndex: 5,
                                mt: 1,
                              }}
                              image={value.image}
                              alt={value.image_alt_tag}
                              title={productData?.product_name}
                            ></CardMedia>
                          </div>
                        );
                      })}
                  </Slider>
                </div>
              </section>
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Dimensions;
