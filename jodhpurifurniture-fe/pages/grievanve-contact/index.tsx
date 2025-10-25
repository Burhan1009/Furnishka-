import Header from "@/assets/global/Header";
import Discount from "@/assets/global/Discount";
import Footer from "@/assets/global/Footer";
import Disclaimer from "@/assets/global/Disclaimer";
import GrievanceContactTab from "@/assets/GrievanceContactTab";
import SeoHeader from "@/components/SeoHeader";

function GrievanceContact() {
  return (
    <>
      <head>
        <SeoHeader title={"Grievance Contact | Jodhpuri Furniture"} />
      </head>
      <Discount />
      <Header />

      <GrievanceContactTab />

      <div className="border2"></div>

      <Footer />

      <Disclaimer />
    </>
  );
}
export default GrievanceContact;
