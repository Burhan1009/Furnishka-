import { useGetStoreAvailable } from "@/service/home";

import { useRouter } from "next/router";
import Skeleton from "@mui/material/Skeleton";
import Slider from "react-slick";

import { useInView } from "react-intersection-observer";
import { Typography } from "@mui/material";

const icons = {
  img1: "/static/images/chevron-right.svg",
};

function Location() {
  const { ref, inView } = useInView();
  const router = useRouter();

  const { data, isLoading } = useGetStoreAvailable({ enabled: inView });
  const storeLoacation = data?.data ?? [];

  const handleStores = () => {
    router.push("/stores");
  };

  const settings = {
    infinite: true,
    dots: true,
    speed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
          dots: false,
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
      <section className="section-10 container-fluid" ref={ref}>
        <div className="container">
          <>
            <Typography className="wideH1">#Furnishka</Typography>
            <p className="location-text">Offline Furniture Experience Store</p>
          </>

          <div className="row">
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
                <Slider {...settings}>
                  {storeLoacation?.length > 0 &&
                    storeLoacation?.map((item: any) => (
                      <div>
                        <div key={item.store_id} className="sec10-box">
                          <div className="location-image">
                            <img
                              src={item.store_image}
                              alt={item.image_alt_tag}
                              title={item.image_title}
                            />
                          </div>
                          <p
                            style={{ textTransform: "capitalize" }}
                            className="jost font-24 fw-500 color-22222 location-name"
                          >
                            {item.store_name}
                          </p>
                          <p className="jost font-15 fw-normal color-767676">
                            {item.store_address}
                          </p>
                          <a href={item.store_map} target="_blank">
                            {" "}
                            <button className="btn-1 jost font-15 fw-500">
                              Get Directions
                              <i className="fa-solid fa-angle-right"></i>
                            </button>
                          </a>
                        </div>
                      </div>
                    ))}
                </Slider>
                <div className="d-flex justify-content-center">
                  <button onClick={handleStores} className="view-all-btn">
                    Find More Store
                    <img src={icons["img1"]} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
      <div className="border sm-none"></div>
    </>
  );
}
export default Location;
