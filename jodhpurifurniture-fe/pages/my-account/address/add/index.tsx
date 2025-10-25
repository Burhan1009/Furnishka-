import Disclaimer from "@/assets/global/Disclaimer";
import Discount from "@/assets/global/Discount";
import Footer from "@/assets/global/Footer";
import Header from "@/assets/global/Header";
import NewsLetter from "@/assets/global/NewsLetter";
import Testimonial from "@/assets/global/Testimonial";
import AddressDetails from "@/assets/my-account/AddressDetails";
import SeoHeader from "@/components/SeoHeader";

const addressdetails = () => {
  return (
    <>
      <head>
        <SeoHeader title={"Add Address | Jodhpuri Furniture"} />
      </head>
      <Discount />
      <Header />
      <AddressDetails />
      <Testimonial />

      <NewsLetter />
      <Footer />
      <Disclaimer />
    </>
  );
};
export default addressdetails;
