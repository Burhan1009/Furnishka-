import Disclaimer from "@/assets/global/Disclaimer";
import Discount from "@/assets/global/Discount";
import Footer from "@/assets/global/Footer";
import Header from "@/assets/global/Header";
import NewsLetter from "@/assets/global/NewsLetter";
import Testimonial from "@/assets/global/Testimonial";
import Support from "@/assets/my-account/Support";
import SeoHeader from "@/components/SeoHeader";

const support = () => {
  return (
    <>
      <head>
        <SeoHeader title={"Support | Jodhpuri Furniture"} />
      </head>
      <Discount />
      <Header />
      <Support />
      <Testimonial />

      <NewsLetter />
      <Footer />
      <Disclaimer />
    </>
  );
};
export default support;
