import Disclaimer from "@/assets/global/Disclaimer";
import Discount from "@/assets/global/Discount";
import Footer from "@/assets/global/Footer";
import Header from "@/assets/global/Header";
import NewsLetter from "@/assets/global/NewsLetter";
import Testimonial from "@/assets/global/Testimonial";
import Myorders from "@/assets/my-account/Myorders";
import SeoHeader from "@/components/SeoHeader";

const myorders = () => {
  return (
    <>
      <head>
        <SeoHeader title={"Orders | Jodhpuri Furniture"} />
      </head>
      <Discount />
      <Header />
      <Myorders />
      <Testimonial />

      <NewsLetter />
      <Footer />
      <Disclaimer />
    </>
  );
};
export default myorders;
