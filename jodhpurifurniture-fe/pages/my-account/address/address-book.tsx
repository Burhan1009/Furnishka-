import Disclaimer from "@/assets/global/Disclaimer";
import Discount from "@/assets/global/Discount";
import Footer from "@/assets/global/Footer";
import Header from "@/assets/global/Header";
import NewsLetter from "@/assets/global/NewsLetter";
import Testimonial from "@/assets/global/Testimonial";
import MyAddress from "@/assets/my-account/MyAdresses";
import SeoHeader from "@/components/SeoHeader";

const addressbook = () => {
  return (
    <>
      <head>
        <SeoHeader title={"Addresses | Jodhpuri Furniture"} />
      </head>
      <Discount />
      <Header />
      <MyAddress />
      <Testimonial />
      <NewsLetter />
      <Footer />
      <Disclaimer />
    </>
  );
};
export default addressbook;
