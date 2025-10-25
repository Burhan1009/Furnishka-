import { useGetHeaderCoupon } from "@/service/home";
import { CardMedia, Grid, styled } from "@mui/material";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";
import Link from "next/link";
import Slider from "react-slick";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import {
  selectProductDetail,
  selectProductLoading,
  selectSimilarProducts,
} from "@/service/detail";
import Links from "@/Link";
import { selectallcategory } from "@/service/auth/globalstate";

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

const icons = {
  img1: "/static/images/chevron-right.svg",
};

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

function SimilarProduct() {
  const similarProduct = useSelector(selectSimilarProducts);
  const otherAllCategory = useSelector(selectallcategory);
  const productData = useSelector(selectProductDetail);
  console.log({ similarProduct, productData, otherAllCategory });
  const theme = useTheme();
  const { data } = useGetHeaderCoupon();
  const headerDiscount = data?.data ?? {};

  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: similarProduct?.length > 3 ? 3 : similarProduct?.length,
    slidesToScroll: 1,
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: similarProduct?.length > 3 ? 3 : similarProduct?.length,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: similarProduct?.length > 3 ? 3 : similarProduct?.length,
          arrows: false,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: similarProduct?.length > 2 ? 2 : similarProduct?.length,
          arrows: false,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          slidesToShow: similarProduct?.length > 2 ? 2 : similarProduct?.length,

          slidesToScroll: 2,
        },
      },
    ],
  };
  const isLoading = useSelector(selectProductLoading);

  return (
    <>
      {similarProduct?.length > 0 ? (
        <>
          {isLoading ? (
            <></>
          ) : (
            <div className="container2">
              <section
                style={{ marginBottom: 20 }}
                className="section-4 slider-d"
              >
                <div>
                  <div className="d-flex justify-content-between">
                    <div>
                      <Typography
                        sx={{
                          mt: { xs: -1.9, md: -0.5 },
                          mb: 0.1,
                          textAlign: "left",
                          fontFamily: "Jost",
                          fontSize: { xs: 20, sm: 23, md: 22, lg: 24 },
                          fontWeight: "500",
                          color: "#222",
                        }}
                      >
                        Similar Products
                      </Typography>
                      <Typography
                        sx={{
                          textAlign: "left",
                          mb: 2,
                          fontFamily: "Jost",
                          fontSize: { xs: 15, sm: 15, md: 16 },
                        }}
                      >
                        Explore{" "}
                        {productData?.cat_slug_key
                          ?.replace(/-/g, " ")
                          .split(",")[0] ?? ""}{" "}
                        online and find the one that's perfect for you
                      </Typography>
                    </div>
                    <div className="sm-none jost d-flexs fw-500 font-1689 icon-viewall">
                      <Link
                        as={`/${otherAllCategory[0]?.parent_category_name}/${
                          productData?.cat_slug_key?.split(",")[0]
                        }`}
                        href={`/${otherAllCategory[0]?.parent_category_name}/${
                          productData?.cat_slug_key?.split(",")[0]
                        }`}
                        className="view-all"
                      >
                        View All
                      </Link>
                      <img />
                    </div>
                  </div>

                  <div className="row">
                    <Slider {...settings}>
                      {similarProduct?.length > 0 &&
                        similarProduct?.map((item: any, index) => {
                          const afterCoupnPrize = headerDiscount?.rate
                            ? headerDiscount?.coupon_code_type == 2
                              ? item.sale_price -
                                (item.sale_price * headerDiscount?.rate) / 100
                              : item.sale_price - headerDiscount?.rate
                            : item.sale_price;

                          const percentDiscount =
                            item.regular_price - afterCoupnPrize;
                          const spcp =
                            (percentDiscount / item.regular_price) * 100;

                          return (
                            <Links
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
                                {" "}
                                <CardMedia
                                  component="img"
                                  sx={{
                                    borderRadius: "4px",
                                    position: "relative",
                                    zIndex: 5,
                                  }}
                                  image={item.base_image}
                                  alt={item.image_alt_tag}
                                  title={item.product_name}
                                />
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
                                        xs: "6px",
                                        sm: "6px",

                                        lg: "8px",
                                      },

                                      fontSize: {
                                        xs: 11,
                                        sm: 11,
                                        md: 13,
                                        lg: 14,
                                      },
                                      p: { xs: 0.7, md: 0.8, lg: 0.8 },
                                      fontFamily: "Jost",
                                      borderRadius: "2px",
                                      background: `#f15a21`,
                                      color: `#fff`,
                                      textTransform: "capitalize",
                                    }}
                                  >
                                    {`${~~spcp}% off`}
                                  </Label>
                                </CardActions>
                              </Box>

                              <Typography
                                sx={{
                                  marginTop: 1.1,
                                  width: "auto",
                                  fontFamily: "JOST",
                                  color: "#222222",
                                  fontWeight: "normal",
                                  mb: { md: 0.3 },
                                  fontSize: { xs: 15, sm: 15, lg: 16 },
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  display: "-webkit-box",
                                  WebkitLineClamp: "1",
                                  WebkitBoxOrient: "vertical",
                                }}
                              >
                                {" "}
                                {item.product_name}
                              </Typography>

                              <Grid
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  mb: 2,
                                }}
                              >
                                <Typography
                                  sx={{
                                    color: "#000",
                                    mr: 1.5,
                                    fontSize: {
                                      xs: 17,
                                      sm: 13,
                                      md: 15,
                                      lg: 16,
                                    },
                                    fontWeight: "600",
                                  }}
                                >
                                  {
                                    afterCoupnPrize
                                      .toLocaleString("en-IN", {
                                        style: "currency",
                                        currency: "INR",
                                      })
                                      .split(".")[0]
                                  }
                                </Typography>{" "}
                                <Typography
                                  sx={{
                                    fontWeight: "500",
                                    color: "#767676",
                                    fontSize: {
                                      xs: 14,
                                      sm: 12,
                                      md: 13,
                                      lg: 14,
                                    },
                                    textDecoration: "line-through",
                                    mt: { xs: 0.2, md: 0.4 },
                                  }}
                                >
                                  ₹{item.regular_price}
                                </Typography>
                              </Grid>
                            </Links>
                          );
                        })}
                    </Slider>
                    <div className="d-flex justify-content-center">
                      <button className="view-all-btn">
                        <Link
                          as={`/${otherAllCategory[0]?.parent_category_name}/${
                            otherAllCategory[0]?.sub_slug_key
                          }/${productData?.cat_slug_key?.split(",")[0]}`}
                          href={`/${
                            otherAllCategory[0]?.parent_category_name
                          }/${otherAllCategory[0]?.sub_slug_key}/${
                            productData?.cat_slug_key?.split(",")[0]
                          }`}
                          style={{ color: "white" }}
                        >
                          View More <img src={icons["img1"]} />
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
}
export default SimilarProduct;
