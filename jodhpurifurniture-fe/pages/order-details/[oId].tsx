import Disclaimer from "@/assets/global/Disclaimer";
import Discount from "@/assets/global/Discount";
import Footer from "@/assets/global/Footer";
import Header from "@/assets/global/Header";
import { OrderDetails } from "@/assets/my-account/OrderDetails";
import SeoHeader from "@/components/SeoHeader";
const OrderDetail = () => {
  
  return (
    <>
      <head>
        <SeoHeader title={"Order Details | Jodhpuri Furniture"} />
      </head>
      <Discount />
      <Header />
      <OrderDetails />

      <Footer />

      <Disclaimer />
    </>
  );
};

export default OrderDetail;
