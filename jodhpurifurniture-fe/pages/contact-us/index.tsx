import Header from "@/assets/global/Header";
import Discount from "@/assets/global/Discount";
import Footer from "@/assets/global/Footer";
import Disclaimer from "@/assets/global/Disclaimer";
import ContactUsForm from "@/components/ContactUsForm";
import { useGetMetaData } from "@/service/home";
import SeoHeader from "@/components/SeoHeader";

function ContactUs() {
  const { data } = useGetMetaData("contact-us");
  const metaData = data?.data ?? [];
  console.log({ metaData });
  return (
    <>
      <head>
        <SeoHeader title={metaData[0]?.title} 
          description={metaData[0]?.description}/>
      </head>
      <Discount />

      <Header />

      <div className="container2">
        <ContactUsForm />
      </div>
      <div className="border2"></div>

      <Footer />

      <Disclaimer />
    </>
  );
}
export default ContactUs;
