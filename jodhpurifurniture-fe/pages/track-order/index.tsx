import Header from "@/assets/global/Header";
import Discount from "@/assets/global/Discount";
import Footer from "@/assets/global/Footer";
import Disclaimer from "@/assets/global/Disclaimer";
import TrackOrderFooter from "@/assets/TrackOrder";
import SeoHeader from "@/components/SeoHeader";

function TrackOrder() {
  return (
    <>
      <head>
        <SeoHeader title={"Track Order | Jodhpuri Furniture"} />
      </head>
      <Discount />
      <Header />
      <div className="container2">
        <TrackOrderFooter />
      </div>
      <div className="border2"></div>
     
        <Footer />
      
      <Disclaimer />
    </>
  );
}
export default TrackOrder;
