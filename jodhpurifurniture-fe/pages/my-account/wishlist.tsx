import Disclaimer from "@/assets/global/Disclaimer";
import Discount from "@/assets/global/Discount";
import Footer from "@/assets/global/Footer";
import Header from "@/assets/global/Header";
import NewsLetter from "@/assets/global/NewsLetter";
import Testimonial from "@/assets/global/Testimonial";
import Wishlist from "@/assets/my-account/Mywishlist";
import SeoHeader from "@/components/SeoHeader";

const wishlist = () => {
  return (
    <>
      <head>
        <SeoHeader title={"WishList | Jodhpuri Furniture"} />
      </head>
      <Discount />
      <Header />
      <Wishlist />
      <Testimonial />
      <NewsLetter />
      <Footer />
      <Disclaimer />
    </>
  );
};
export default wishlist;
