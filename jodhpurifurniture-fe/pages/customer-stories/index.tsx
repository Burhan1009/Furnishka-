import Header from "@/assets/global/Header";
import Discount from "@/assets/global/Discount";
import Footer from "@/assets/global/Footer";
import Disclaimer from "@/assets/global/Disclaimer";
import CustomerStoriesFooter from "@/assets/CustomerStories";
import SeoHeader from "@/components/SeoHeader";

function CustomerStories() {
  return (
    <>
      <head>
        <SeoHeader title={"Customer Stories | Jodhpuri Furniture"} />
      </head>
      <Discount />

      <Header />
      <div className="container2">
        <CustomerStoriesFooter />
      </div>
      <div className="border2"></div>

      <Footer />

      <Disclaimer />
    </>
  );
}
export default CustomerStories;
