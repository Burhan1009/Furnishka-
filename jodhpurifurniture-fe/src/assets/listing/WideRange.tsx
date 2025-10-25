import { Breadcrumbs, Skeleton, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import { Grid } from "@mui/material";
import { Suspense, lazy } from "react";
const CardWide = lazy(() => import("../global/cardWide"));
import { useRouter } from "next/router";
import { useSelector } from "@/service/store";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  isProcutHasErr,
  selectLastUrl,
  selectOtherCategory,
  selectOtherCategoryLoading,
  selectallcategory,
} from "@/service/auth/globalstate";
import Link from "next/link";
import Custom404 from "../404_page";

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
        position: "absolute",
        transform: " translateY(-50%)",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        background: "#f4f9fc",
        placeItems: "center",
        top: "40%",
      }}
      onClick={onClick}
    >
      <img width={8} src={"/static/images/arrow-pre.svg"} />
    </div>
  );
}
function SampleNextArrow(props: {
  classNameName?: any;
  style?: any;
  onClick?: any;
  split?: any;
}) {
  const { classNameName, style, onClick } = props;
  return (
    <div
      className={classNameName}
      style={{
        ...style,
        position: "absolute",
        transform: " translateY(-50%)",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        background: "#f4f9fc",
        placeItems: "center",
        top: "40%",
      }}
      onClick={onClick}
    >
      <img width={8} src={"/static/images/vectorR.svg"} />
    </div>
  );
}
const WideRange = () => {
  const router = useRouter();
  const path = router.asPath;
  const path1 = path.split("/")[1];
  console.log({ path1 });
  const { keyword, isParent, search } = router.query;
  // const category_name = id?.length > 1 ? id[1] : "";
  // const parent_name = id?.length > 1 ? id[2] : "";
  const otherCategoriesLoading = useSelector(selectOtherCategoryLoading);
  const otherCategories = useSelector(selectOtherCategory);
  const otherAllCategory = useSelector(selectallcategory);
  const isProductError = useSelector(isProcutHasErr)
  const prevUrl = useSelector(selectLastUrl);

  const settings = {
    infinite: true,
    speed: 1000,
    arrows: true,
    slidesToShow: otherCategories?.length > 5 ? 5 : otherCategories?.length,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    nextArrow: <SampleNextArrow classNameName="next-arrow-click " />,
    prevArrow: <SamplePrevArrow className="pre-arrow-click" />,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow:
            otherCategories?.length > 4 ? 4 : otherCategories?.length,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow:
            otherCategories?.length > 3 ? 3 : otherCategories?.length,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 636,
        settings: {
          arrows: false,
          slidesToShow:
            otherCategories?.length > 2.5 ? 2.5 : otherCategories?.length,
          rows: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },

      {
        breakpoint: 400,
        settings: {
          arrows: false,
          slidesToShow:
            otherCategories?.length > 2.5 ? 2.5 : otherCategories?.length,
          rows: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };

  const str: string = otherAllCategory[0]?.parent_category_name;
  const toStr = str?.toLowerCase();

  const searchKeywordstr = keyword?.toString() ?? "";
  const searchKeyword = searchKeywordstr.split("-").join(" ");

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
  ];

  if (otherAllCategory[0]?.parent_category_name) {
    prevBredcrumb.push(
      <Link
        key="2"
        color="inherit"
        href={`/${toStr ?? ""}`}
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
      </Link>
    );
  }
  if (otherAllCategory[0]?.sub_category_name) {
    prevBredcrumb.push(
      <Link
        key="3"
        href={`/${path1}/${path.split("/")[2]}`}
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
      </Link>
    );
  }
  if (otherAllCategory[0]?.category_name) {
    prevBredcrumb.push(
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
        href={`/${path1}/${path.split("/")[2]}/${prevUrl}`}
      >
        {otherAllCategory[0]?.category_name ?? ""}
      </Link>
    );
  }
  const searchBreadcrumb = [
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
      key="3"
      style={{
        color: "#767676",
        marginTop: 4,
        textTransform: "capitalize",
        fontSize: 14,
        fontWeight: 400,
        fontFamily: "Jost",
      }}
    >
      {searchKeyword}
    </Typography>,
  ];
  const searchCatBreadcrumb = [
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
      key="3"
      style={{
        color: "#767676",
        marginTop: 4,
        textTransform: "capitalize",
        fontSize: 14,
        fontWeight: 400,
        fontFamily: "Jost",
      }}
    >
      {search}
    </Typography>,
  ];

  return (
    <>
      {isProductError ? <></> :
        <section className="listing-section1 ">
          <div className="container2">
            <Breadcrumbs
              className="breadcrumbs  "
              sx={{
                background: "#f4f9fc",
                p: 1.5,
                mb: { sm: 6, md: 7 },
              }}
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              {keyword
                ? searchBreadcrumb
                : search
                  ? searchCatBreadcrumb
                  : // : parent_name && category_name
                  // ? subCatBredcrumb
                  prevBredcrumb}
            </Breadcrumbs>

            <div className="container-fluid">
              {otherCategoriesLoading ? (
                <>
                  <h1
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: 54,
                    }}
                  >
                    <Skeleton width="20%" />
                  </h1>
                  <p className="font-1678 jost color-767676 text-center">
                    Buy Furniture Online in India, made in Solid Sheesham Wood,
                    craft fully Treated and Seasoned.
                  </p>
                  <div className="row justify-content-center m-v-t padding-d-b">
                    <Skeleton width="60%" />
                    <Skeleton width="60%" />
                  </div>
                </>
              ) : otherCategories?.length > 0 ? (
                <>
                  <h1
                    className="jost fw-600 font-2443 text-center color-22222"
                    style={{ marginTop: 50 }}
                  >
                    {otherCategoriesLoading ? (
                      <h1 style={{ display: "flex", justifyContent: "center" }}>
                        <Skeleton width="20%" />
                      </h1>
                    ) : isParent ? (
                      "Explore Our Wide Range "
                    ) : (
                      otherAllCategory[0]?.category_name ||
                      otherAllCategory[0]?.sub_category_name
                    )}
                  </h1>
                  <p className="font-1678 jost color-767676 text-center">
                    Buy Furniture Online in India, made in Solid Sheesham Wood,
                    craft fully Treated and Seasoned.
                  </p>
                  <div className="row justify-content-center m-v-t padding-d-b">
                    {otherCategories?.length > 1 ? (
                      <Grid sx={{ display: { xs: "none", md: "inline" } }}>
                        <Slider {...settings}>
                          {otherCategories?.length > 0 &&
                            otherCategories?.map((item: any) => (
                              <Suspense
                                fallback={
                                  <Skeleton
                                    width={"100%"}
                                    height={0}
                                    style={{
                                      paddingTop: "100%",
                                      borderRadius: 4,
                                    }}
                                  />
                                }
                              >
                                <CardWide
                                  onClick={() =>
                                    router.push(
                                      `/${path1}/${path.split("/")[2]}/${item.slug_key
                                      }`
                                    )
                                  }
                                  imglink={item.image}
                                  title={item.image_title}
                                  alt={item.image_alt_tag}
                                  pName={item.category_name}
                                />
                              </Suspense>
                            ))}
                        </Slider>
                      </Grid>
                    ) : (
                      <Grid
                        className="col-md-3 "
                        sx={{
                          display: { xs: "none", md: "flex" },
                          justifyContent: "center",
                        }}
                      >
                        {otherCategories?.length > 0 &&
                          otherCategories?.map((item: any) => (
                            <Suspense
                              fallback={
                                <Skeleton
                                  width={"100%"}
                                  style={{
                                    paddingTop: "100%",
                                    borderRadius: 4,
                                  }}
                                />
                              }
                            >
                              <CardWide
                                onClick={() =>
                                  router.push(
                                    `/${path1}/${path.split("/")[2]}/${item.slug_key
                                    }`
                                  )
                                }
                                title={item.image_title}
                                imglink={item.image}
                                alt={item.image_alt_tag}
                                pName={item.category_name}
                              />
                            </Suspense>
                          ))}
                      </Grid>
                    )}

                    {otherCategories?.length > 1 ? (
                      <Grid
                        sx={{ display: { xs: "none", sm: "inline", md: "none" } }}
                      >
                        <Slider {...settings}>
                          {otherCategories?.length > 0 &&
                            otherCategories?.map((item: any) => (
                              <Suspense
                                fallback={
                                  <Skeleton
                                    width={"100%"}
                                    style={{
                                      paddingTop: "100%",
                                      borderRadius: 4,
                                    }}
                                  />
                                }
                              >
                                <CardWide
                                  className="col-sm-4"
                                  onClick={() =>
                                    router.push(
                                      `/${path1}/${path.split("/")[2]}/${item.slug_key
                                      }`
                                    )
                                  }
                                  title={item.image_title}
                                  imglink={item.image}
                                  alt={item.image_alt_tag}
                                  pName={item.category_name}
                                />
                              </Suspense>
                            ))}
                        </Slider>
                      </Grid>
                    ) : (
                      <Grid
                        className="col-5 "
                        sx={{
                          display: { xs: "none", sm: "flex", md: "none" },
                          justifyContent: "center",
                        }}
                      >
                        {otherCategories?.length > 0 &&
                          otherCategories?.map((item: any) => (
                            <Suspense
                              fallback={
                                <Skeleton
                                  width={"100%"}
                                  style={{
                                    paddingTop: "100%",
                                    borderRadius: 4,
                                  }}
                                />
                              }
                            >
                              <CardWide
                                className="col-sm-4"
                                onClick={() =>
                                  router.push(
                                    `/${path1}/${path.split("/")[2]}/${item.slug_key
                                    }`
                                  )
                                }
                                title={item.image_title}
                                imglink={item.image}
                                alt={item.image_alt_tag}
                                pName={item.category_name}
                              />
                            </Suspense>
                          ))}
                      </Grid>
                    )}

                    {otherCategories?.length > 1 ? (
                      <Grid sx={{ display: { xs: "inline", sm: "none" } }}>
                        <Slider {...settings}>
                          {otherCategories?.length > 0 &&
                            otherCategories?.map((item: any) => (
                              <Suspense
                                fallback={
                                  <Skeleton
                                    width={"100%"}
                                    style={{
                                      paddingTop: "100%",
                                      borderRadius: 4,
                                    }}
                                  />
                                }
                              >
                                <CardWide
                                  onClick={() =>
                                    router.push(
                                      `/${path1}/${path.split("/")[2]}/${item.slug_key
                                      }`
                                    )
                                  }
                                  title={item.image_title}
                                  imglink={item.image}
                                  alt={item.image_alt_tag}
                                  pName={item.category_name}
                                />
                              </Suspense>
                            ))}
                        </Slider>
                      </Grid>
                    ) : (
                      <Grid
                        className="col-7"
                        sx={{
                          display: { xs: "flex", sm: "none" },
                          justifyContent: "center",
                        }}
                      >
                        {otherCategories?.length > 0 &&
                          otherCategories?.map((item: any) => (
                            <Suspense
                              fallback={
                                <Skeleton
                                  width={"100%"}
                                  style={{
                                    paddingTop: "100%",
                                    borderRadius: 4,
                                  }}
                                />
                              }
                            >
                              <CardWide
                                onClick={() =>
                                  router.push(
                                    `/${path1}/${path.split("/")[2]}/${item.slug_key
                                    }`
                                  )
                                }
                                title={item.image_title}
                                imglink={item.image}
                                alt={item.image_alt_tag}
                                pName={item.category_name}
                              />
                            </Suspense>
                          ))}
                      </Grid>
                    )}
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </section>
      }
    </>
  );
};

export default WideRange;
