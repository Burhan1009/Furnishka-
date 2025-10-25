import Header from "@/assets/global/Header";
import Discount from "@/assets/global/Discount";
import Security from "@/assets/SecurityPrivacy";
import Footer from "@/assets/global/Footer";
import Disclaimer from "@/assets/global/Disclaimer";
import SeoHeader from "@/components/SeoHeader";

function SecurityPrivacy() {
  return (
    <>
      <head>
        <SeoHeader title={"Security & Privacy | Jodhpuri Furniture"} />
      </head>
      <Discount />

      <Header />
      <div className="container2">
        <Security />
      </div>
      <div className="border2"></div>

      <Footer />

      <Disclaimer />
    </>
  );
}
export default SecurityPrivacy;
