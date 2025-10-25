import Header from "@/assets/global/Header";
import Discount from "@/assets/global/Discount";
import MetaContent from "@/assets/global/MetaContent";
import Testimonial from "@/assets/global/Testimonial";
import NewsLetter from "@/assets/global/NewsLetter";
import Footer from "@/assets/global/Footer";
import Disclaimer from "@/assets/global/Disclaimer";
import Content from "@/assets/stores/content";
import SeoHeader from "@/components/SeoHeader";

function Home() {
  return (
    <>
      <head>
        <SeoHeader title={"Stores| Jodhpuri Furniture"} />
      </head>
      <Discount />
      <Header />
      <Content />
      <div className="container">
        <MetaContent />
      </div>
      <Testimonial />

      <NewsLetter />
      <Footer />

      <Disclaimer />
    </>
  );
}
export default Home;
