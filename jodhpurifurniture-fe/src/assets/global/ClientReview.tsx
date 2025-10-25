import { useCallback, Suspense, lazy } from "react";
import Slider from "react-slick";
const Client_Card = lazy(() => import("./Client-Card"));
import { useInView } from "react-intersection-observer";
import Skeleton from "@mui/material/Skeleton";
import { useInfiniteQuery } from "react-query";
import Link from "next/link";
import { Typography } from "@mui/material";

function ClientReview() {
  const { ref, inView } = useInView();
  const fetchUsers = async ({ pageParam = 1 }) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/getreviews?page=${pageParam}`
    );
    return res.json();
  };

  const limit = 10;
  const { data, fetchNextPage, isLoading, hasNextPage } = useInfiniteQuery(
    ["home-reviews"],
    fetchUsers,
    {
      enabled: inView,
      keepPreviousData: true,
      getNextPageParam: (lastPage, pages) => {
        if (pages.length * limit <= lastPage.count) {
          return pages.length + 1;
        }
        return undefined;
      },
    }
  );

  const allReviews =
    data?.pages?.reduce((acc, page) => acc.concat(page), []) || [];

  console.log("dataggg", { data, allReviews });

  const handleNextPageClick = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage]);

  const settings = {
    infinite: true,
    speed: 2000,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,

    initialSlide: 4,

    cssEase: "linear",
    rows: 1,
    onSwipe: handleNextPageClick,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },

      {
        breakpoint: 700,
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
          slidesToShow: 1.3,
          slidesToScroll: 2,
        },
      },
    ],
  };
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

  return (
    <>
      <section
        className="section-12 container-fluid margin-b-section-12"
        ref={ref}
      >
        {/* Burhan code Here Rating Star Page */}
        <div className="container">
          <>
            <Typography className="wideH1">What Our Happy Client Say</Typography>
            <p className="review-text">our customers love us. see what they have to say</p>
          </>

          <div className="row ">
            {isLoading ? (
              <Slider {...settings}>
                {skeletonArray.map((_, index) => (
                  <div style={{ marginTop: 25 }} className="col-lg-4">
                    <SkeletonBlock key={index} />
                  </div>
                ))}
              </Slider>
            ) : (
              <>
                <Slider {...settings} className="margin-top-section-12">
                  {allReviews &&
                    allReviews.length > 0 &&
                    allReviews?.map((val) => {
                      return val?.reviews?.map((temp) => {
                        return (
                          temp.base_image != null &&
                          temp.email != null && (
                            <>
                              <Link href={`/${temp.slug_key}`}>
                                {" "}
                                <Suspense
                                  fallback={
                                    <div style={{ marginTop: 25 }}>
                                      <Skeleton
                                        variant="rectangular"
                                        width={"100%"}
                                        height={0}
                                        style={{
                                          paddingTop: "80%",
                                          borderRadius: 4,
                                        }}
                                      />
                                      <Skeleton />
                                      <Skeleton
                                        width="60%"
                                        style={{ marginBottom: "15%" }}
                                      />
                                    </div>
                                  }
                                >
                                  <Client_Card
                                    key={temp.review_rating_id}
                                    imglink={temp.base_image}
                                    alt={temp.image_alt_tag}
                                    productName={temp.product_name}
                                    review={temp.review}
                                    title={temp.product_name}
                                    customerName={temp.full_name}
                                    customerLocation={temp.email}
                                    rating={temp.rating}
                                  />
                                </Suspense>
                              </Link>
                            </>
                          )
                        );
                      });
                    })}
                </Slider>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
export default ClientReview;
