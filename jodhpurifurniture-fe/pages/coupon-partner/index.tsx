import Header from "@/assets/global/Header";
import Discount from "@/assets/global/Discount";
import Footer from "@/assets/global/Footer";
import Disclaimer from "@/assets/global/Disclaimer";
import CouponPartnerFooter from "@/assets/CouponPartner";
import { useGetMetaData } from "@/service/home";
import SeoHeader from "@/components/SeoHeader";

function CouponPartner() {
  const { data } = useGetMetaData("coupon-partners");
  const metaData = data?.data ?? [];
  return (
    <>
      {" "}
      <head>
        <SeoHeader
          title={metaData[0]?.title}
          description={metaData[0]?.description}
        />
      </head>
      <Discount />
      <Header />
      <div className="container2">
        <CouponPartnerFooter />
      </div>
      <div className="border2"></div>
      <Footer />
      <Disclaimer />
    </>
  );
}
export default CouponPartner;
