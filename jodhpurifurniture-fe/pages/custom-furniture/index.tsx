import Header from "@/assets/global/Header";
import Discount from "@/assets/global/Discount";

import Footer from "@/assets/global/Footer";
import Disclaimer from "@/assets/global/Disclaimer";
import CustomerFurniture from "@/assets/CustomerFurniture";
import { useGetMetaData } from "@/service/home";
import SeoHeader from "@/components/SeoHeader";

function Bedroom() {
  const { data } = useGetMetaData("custom-furniture");
  const metaData = data?.data ?? [];
  return (
    <>
      <head>
        <SeoHeader
          title={metaData[0]?.title}
          description={metaData[0]?.description}
        />
      </head>
      <Discount />
      <Header />
      <div>
        <CustomerFurniture />
      </div>
      <div className="border2"></div>

      <Footer />

      <Disclaimer />
    </>
  );
}
export default Bedroom;
