
import Header from "@/assets/global/Header";
import Discount from "@/assets/global/Discount";
import Bedroom_furniture from "@/assets/bedroom/Bedroom_furniture";
import Essentials from "@/assets/global/Essentials";
import BestSelling from "@/assets/global/BestSelling";
import BedroomFurniture from "@/assets/home/BedroomFurniture";
import DealsOfDay from "@/assets/home/DealsOfDay";
import ClientReview from "@/assets/global/ClientReview";
import MetaContent from "@/assets/global/MetaContent";
import Testimonial from "@/assets/global/Testimonial";
import NewsLetter from "@/assets/global/NewsLetter";
import Footer from "@/assets/global/Footer";
import Disclaimer from "@/assets/global/Disclaimer";
import dynamic from "next/dynamic";

import Slider from "react-slick";
import { Grid, Skeleton } from "@mui/material";

const settings = {
  infinite: true,
  speed: 1000,
  slidesToShow: 6,
  slidesToScroll: 3,
  arrows: false,

  autoplaySpeed: 5000,
  cssEase: "linear",
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2,
        infinite: true,
      },
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 400,
      settings: {
        arrows: false,
        slidesToShow: 2,
        rows: 1,
        slidesToScroll: 2,
      },
    },
  ],
};
const skeletonArray = new Array(6).fill(null);

const SkeletonBlock = () => (
  <>
    <Skeleton
      variant="rectangular"
      width={"100%"}
      height={0}
      style={{ paddingTop: "70%", borderRadius: 4 }}
    />
    <Skeleton />
  </>
);

const Dining_ranges = dynamic(() => import("@/assets/Dining_ranges"), {
  loading: () => (
    <section className=" sec  section-2  row-remove">
      <div className="container2">
        <Grid className=" row  boxes-padding ">
          <Skeleton style={{ height: 50 }} />
          <Skeleton style={{ height: 20, marginBottom: "2%" }} />
          <Slider {...settings}>
            {skeletonArray.map((_, index) => (
              <div className="col-lg-4">
                <SkeletonBlock key={index} />
              </div>
            ))}
          </Slider>
        </Grid>
      </div>
    </section>
  ),
});

const WideRange = dynamic(() => import("@/assets/home/WideRange"), {
  loading: () => (
    <section className=" sec  section-2  row-remove">
      <div className="container2">
        <Grid className=" row  boxes-padding ">
          <Skeleton style={{ height: 50 }} />
          <Skeleton style={{ height: 20, marginBottom: "2%" }} />
          <Slider {...settings}>
            {skeletonArray.map((_, index) => (
              <div className="col-lg-4">
                <SkeletonBlock key={index} />
              </div>
            ))}
          </Slider>
        </Grid>
      </div>
    </section>
  ),
});

function Dining() {
  return (
    <>
{/* Burhan Code Here */}
      <Discount />
      <Header />
      <Bedroom_furniture titleName={"Dining Room Furniture"}
        paragraph=" Create the dining of your dreams with the perfect dining sets" />
      {/* <Dining_ranges /> */}
      <WideRange paramKey={"dining"} isSlider={true} />
      <DealsOfDay />
      <BedroomFurniture />
      <Essentials />
      <BestSelling />
      <ClientReview />
      <MetaContent paramKey={"dining"}  paramField={"page"} />
      <Testimonial />
      <NewsLetter />
      <Footer />
      <Disclaimer />
    </>
  );
}
export default Dining;
