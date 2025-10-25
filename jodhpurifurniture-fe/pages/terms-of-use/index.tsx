import Header from "@/assets/global/Header";
import Discount from "@/assets/global/Discount";

import Footer from "@/assets/global/Footer";
import Disclaimer from "@/assets/global/Disclaimer";

import TermsOfUseFooter from "@/assets/TermsOfUse";
import SeoHeader from "@/components/SeoHeader";

function TermsOfUse() {
  return (
    <>
      <head>
        <SeoHeader title={"Terms Of Use | Jodhpuri Furniture"} />
      </head>
      <Discount />

      <Header />
      <div className="container2">
        <TermsOfUseFooter />
      </div>
      <div className="border2"></div>

      <Footer />

      <Disclaimer />
    </>
  );
}
export default TermsOfUse;
