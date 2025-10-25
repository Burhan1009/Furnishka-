import React, { useState, useEffect, lazy, Suspense } from "react";
import Discount from "@/assets/global/Discount";
import MetaContent from "@/assets/global/MetaContent";
import Testimonial from "@/assets/global/Testimonial";
import NewsLetter from "@/assets/global/NewsLetter";
import Footer from "@/assets/global/Footer";
import Disclaimer from "@/assets/global/Disclaimer";
import { useDispatch,} from "react-redux";
import { OtherCatActions } from "@/service/listing/states";
import dynamic from "next/dynamic";
import { useGetMetaData } from "@/service/home";
import SeoHeader from "@/components/SeoHeader";
import Quality from "@/assets/home/Quality";
import Login from "@/assets/global/Login";

import { Skeleton } from "@mui/material";
import Slider from "react-slick";

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
const settings1 = {
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
      breakpoint: 480,
      settings: {
        slidesToShow: 2.06,
        rows: 2,
        arrows: false,
        initialSlide: 2,
        slidesToScroll: 2,
      },
    },
  ],
};

import Header from "@/assets/global/Header";
import { useRouter } from "next/router";
// import { Lists } from "@/assets/listing/list";
// import MetaCommonFooter from "@/components/MetaCommonFooter";

const Banner = dynamic(() => import("@/assets/home/Banner"), {
  loading: () => (
    <div className="container">
      <Skeleton style={{ height: 150 }} />
    </div>
  ),
});
const Section1 = dynamic(() => import("@/assets/home/Section1"), {
  loading: () => (
    <section className="container-fluid section-1">
      <div className="container ">
        <div className="row">
          <div className="col-12 col-lg-8 sm-padding-x">
            <Skeleton
              variant="rectangular"
              width={"100%"}
              height={0}
              style={{ paddingTop: "57%" }}
            />
          </div>
          <div className=" col-lg-4 image-show">
            {" "}
            <Skeleton
              variant="rectangular"
              width={"100%"}
              height={0}
              style={{ paddingTop: "117%" }}
            />
          </div>
        </div>
      </div>
    </section>
  ),
});
const WideRange = dynamic(() => import("@/assets/home/WideRange"), {
  loading: () => (
    <section className="container-fluid section-4">
      <div className="container">
        <Skeleton style={{ height: 150 }} />
      </div>
    </section>
  ),
});
const WideRange2 = dynamic(() => import("@/assets/home/WideRange2"), {
  loading: () => (
    <section className="container-fluid section-4">
      <div className="container">
        <Skeleton style={{ height: 150 }} />
      </div>
    </section>
  ),
});
const Essentials = dynamic(() => import("@/assets/global/Essentials"), {
  loading: () => (
    <section className="container-fluid section-4">
      <div className="container">
        <Skeleton style={{ height: 50 }} />
        <Skeleton style={{ height: 20, marginBottom: "2%" }} />
        <Slider {...settings1} className="small-sliderscreen">
          {skeletonArray.map((_, index) => (
            <div className="col-lg-4">
              <div className="bg-sec3">
                <SkeletonBlock key={index} />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  ),
});

const BestSelling = dynamic(() => import("@/assets/global/BestSelling"), {
  loading: () => (
    <section className="container-fluid section-4">
      <div className="container">
        <Skeleton style={{ height: 50 }} />
        <Skeleton style={{ height: 20, marginBottom: "2%" }} />
        <Slider {...settings1}>
          {skeletonArray.map((_, index) => (
            <div className="col-lg-4">
              <SkeletonBlock key={index} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  ),
});

const BedroomFurniture = dynamic(
  () => import("@/assets/home/BedroomFurniture"),
  {
    loading: () => (
      <section className="container-fluid section-4">
        <div className="container">
          <Skeleton style={{ height: 50, width: "30%" }} />
          <Skeleton style={{ height: 20, marginBottom: "2%", width: "40%" }} />
          <Slider {...settings1}>
            {skeletonArray.map((_, index) => (
              <div className="col-lg-4">
                <SkeletonBlock key={index} />
              </div>
            ))}
          </Slider>
        </div>
      </section>
    ),
  }
);

const DinningRoom = dynamic(() => import("@/assets/home/DinningRoom"), {
  loading: () => (
    <section className="container-fluid section-7 ">
      <div className="container">
        <Skeleton style={{ height: 50, width: "30%" }} />
        <Skeleton style={{ height: 20, marginBottom: "2%", width: "40%" }} />
        <Slider {...settings1}>
          {skeletonArray.map((_, index) => (
            <div className="col-lg-4">
              <SkeletonBlock key={index} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  ),
});

const LivingRoom = dynamic(() => import("@/assets/home/LivingRoom"), {
  loading: () => (
    <section className="container-fluid section-6 for-margin">
      <div className="container">
        <Skeleton style={{ height: 50, width: "30%" }} />
        <Skeleton style={{ height: 20, marginBottom: "2%", width: "40%" }} />
        <Slider {...settings1}>
          {skeletonArray.map((_, index) => (
            <div>
              <SkeletonBlock key={index} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  ),
});

const Section8 = dynamic(() => import("@/assets/home/Section8"), {
  loading: () => (
    <section className="section-8 container-fluid">
      <div className="container">
        <div className="row">
          <div className="col-md-6 section-8-img">
            <Skeleton
              variant="rectangular"
              width={"100%"}
              height={0}
              style={{ paddingTop: "65%" }}
            />
          </div>
          <div className="col-md-6 ">
            <Skeleton
              variant="rectangular"
              width={"100%"}
              height={0}
              style={{ paddingTop: "65%" }}
            />
          </div>
        </div>
      </div>
    </section>
  ),
});

const DealsOfDay = dynamic(() => import("@/assets/home/DealsOfDay"), {
  loading: () => (
    <section className="section-9 container-fluid margin-section-9">
      <div className="container">
        <>
          {" "}
          <Skeleton style={{ height: 50 }} />
          <Skeleton style={{ height: 20, marginBottom: "2%" }} />
        </>
        <Slider {...settings1}>
          {skeletonArray.map((_, index) => (
            <div className="col-lg-4">
              <SkeletonBlock key={index} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  ),
});

const Location = dynamic(() => import("@/assets/home/Location"), {
  loading: () => (
    <section className="section-10 container-fluid">
      <div className="container">
        <>
          {" "}
          <Skeleton style={{ height: 50 }} />
          <Skeleton style={{ height: 20, marginBottom: "2%" }} />
        </>
        <Slider {...settings}>
          {skeletonArray.map((_, index) => (
            <div className="col-lg-4">
              <SkeletonBlock key={index} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  ),
});

const RoomForMore = dynamic(() => import("@/assets/home/RoomForMore"), {
  loading: () => (
    <section className="container-fluid section-5">
      <div style={{ overflow: "hidden" }} className="container">
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={0}
          style={{ paddingTop: "45%", marginTop: 30 }}
        />
      </div>
    </section>
  ),
});
const ClientReview = dynamic(() => import("@/assets/global/ClientReview"), {
  loading: () => (
    <section className="section-12 container-fluid margin-b-section-12">
      <div className="container">
        <>
          {" "}
          <Skeleton style={{ height: 50 }} />
          <Skeleton style={{ height: 20, marginBottom: "2%" }} />
        </>
        <Slider {...settings1}>
          {skeletonArray.map((_, index) => (
            <div className="col-lg-4">
              <SkeletonBlock key={index} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  ),
});
// const ExploreWideRange = dynamic(() => import("@/assets/listing/WideRange"), {
//   loading: () => (
//     <section className="listing-section1 ">
//       <div className="container2 ">
//         <div
//           className="breadcrumbs  "
//           style={{
//             paddingTop: 9.5,
//             marginBottom: 54,
//           }}
//         >
//           <Skeleton width="40%" />
//         </div>
//         <div className="container-fluid">
//           <h1 style={{ display: "flex", justifyContent: "center" }}>
//             <Skeleton width="20%" />
//           </h1>
//           <p className="font-1678 jost color-767676 text-center">
//             Buy Furniture Online in India, made in Solid Sheesham Wood, craft
//             fully Treated and Seasoned.
//           </p>
//           <div className="row justify-content-center m-v-t padding-d-b">
//             <Skeleton width="60%" />
//             <Skeleton width="60%" />
//           </div>
//         </div>
//       </div>
//     </section>
//   ),
// });
function Home() {
  const router = useRouter();
  const { keyword } = router.query;
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(OtherCatActions.lastUrlClear());
  }, []);
  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const [isOpen, setIsOpen] = React.useState(false);
  const { data } = useGetMetaData("home-page");
  const metaData = data?.data ?? [];
  //const tokenA = useSelector(selectAccessToken);
  // React.useEffect(() => {
  //   if (!tokenA) {
  //     const timer = setTimeout(() => {
  //       setIsOpen(true);
  //     }, 10000);

  //     return () => {
  //       clearTimeout(timer);
  //     };
  //   }
  // }, [tokenA]);
  return (
    <>
      <Discount />
      <Header key="search" />
      {/* {!keyword ? ( */}
        <>
          <head>
            <SeoHeader
              title={metaData[0]?.title}
              description={metaData[0]?.description}
            />
          </head>

          <Section1 />
          <WideRange />
          {/* <WideRange2 /> */}
          <Banner />
          <Essentials />
          <BestSelling />
          <RoomForMore />
          <BedroomFurniture />
          <DinningRoom />
          <LivingRoom />
          <Section8 />
          <DealsOfDay />
          <Location />
          <Quality />
          <ClientReview />
          <MetaContent />
          <Login
            isAddDialogOpened={isOpen}
            handleCloseDialog={() => setIsOpen(false)}
          />
          {showButton && (
            <button onClick={scrollToTop} className="back-to-top">
              &#8679;
            </button>
          )}
        </>
      {/* ) : (
        <>
          <ExploreWideRange />
          <Lists />
          <MetaCommonFooter />
        </>
      )} */}
      <Testimonial />
      <NewsLetter />
      <Footer />
      <Disclaimer />
    </>
  );
}
export default Home;
