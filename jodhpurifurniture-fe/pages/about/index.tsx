
import Header from "@/assets/global/Header";
import Discount from "@/assets/global/Discount";
import Footer from "@/assets/global/Footer";
import Disclaimer from "@/assets/global/Disclaimer";
import About_1 from "@/assets/about/About-1";
import About_2 from "@/assets/about/About-2";
import Achivements from "@/assets/about/Achivements";
import OneShopStop from "@/assets/about/OneStopShop";
import Testimonial from "@/assets/global/Testimonial";
import NewsLetter from "@/assets/global/NewsLetter";
import { useGetMetaData } from "@/service/home";
import SeoHeader from "@/components/SeoHeader";

function About() {
  const { data } = useGetMetaData("about-us");
  const metaData = data?.data ?? [];
  return (
    <>
      <head>
        <SeoHeader
          title={metaData[0]?.title}
          description={metaData[0]?.description}
        />
      </head>
      <Discount />
      <Header />
      <About_1 />
      <About_2 />
      <Achivements />
      <OneShopStop />
      <Testimonial />
      <NewsLetter />
      <Footer />
      <Disclaimer />
    </>
  );
}
export default About;
