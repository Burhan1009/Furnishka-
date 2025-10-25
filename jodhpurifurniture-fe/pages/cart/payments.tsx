import Header2 from "@/assets/Billing/Header2";
import Footer2 from "@/assets/Billing/Footer2";
import Payments from "@/assets/Billing/Payments";
import SeoHeader from "@/components/SeoHeader";

function Billing() {
  return (
    <>
      <head>
        <SeoHeader title={"Payments"} />
      </head>
      <Header2 />

      <Payments />

      <Footer2 />
    </>
  );
}
export default Billing;
