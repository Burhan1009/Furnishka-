import Disclaimer from "@/assets/global/Disclaimer";
import Discount from "@/assets/global/Discount";
import Footer from "@/assets/global/Footer";
import Header from "@/assets/global/Header";
import NewsLetter from "@/assets/global/NewsLetter";
import Testimonial from "@/assets/global/Testimonial";
import { AccountsButton } from "@/components";
import SeoHeader from '@/components/SeoHeader';


const index = () => {
  return (
    <>
          <head>
        <SeoHeader
          title={"Profile | Jodhpuri Furniture"}
         
        />
      </head>
      <Discount />
      <Header />
      <AccountsButton />
      <Testimonial />
      <NewsLetter />
      <Footer />
      <Disclaimer />
    </>
  );
};

export default index;
