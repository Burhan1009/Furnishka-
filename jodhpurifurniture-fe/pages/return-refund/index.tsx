import Header from "@/assets/global/Header";
import Discount from "@/assets/global/Discount";
import Footer from "@/assets/global/Footer";
import Disclaimer from "@/assets/global/Disclaimer";
import ReturnRefundFooter from "@/assets/Return&Refund";
import SeoHeader from "@/components/SeoHeader";


function ReturnRefund() {
  return (
    <>
      <head>
        <SeoHeader title={"Return Refunds | Jodhpuri Furniture"} />
      </head>
      <Discount />
      <Header />
      <div className="container2">
        <ReturnRefundFooter />
      </div>
      <div className="border2"></div>

      <Footer />

      <Disclaimer />
    </>
  );
}
export default ReturnRefund;
