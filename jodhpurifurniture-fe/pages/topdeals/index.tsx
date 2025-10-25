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
import SeoHeader from "@/components/SeoHeader";

function SofaSet() {
  return (
    <>
      <head>
        <SeoHeader
          title={"Top Deals | Jodhprui Furniture"}
          description={
            "Create the home of your dreams with the perfect top deals"
          }
        />
      </head>
      <Discount />
      <Header />
      <Bedroom_furniture
        titleName={"Top Deals"}
        paragraph=" Create the home of your dreams with the perfect top deals"
      />
      <DealsOfDay />
      <BedroomFurniture />
      <Essentials />
      <BestSelling />
      <ClientReview />
      {/* <MetaContent /> */}
      <Testimonial />
      <NewsLetter />
      <Footer />
      <Disclaimer />
    </>
  );
}
export default SofaSet;
