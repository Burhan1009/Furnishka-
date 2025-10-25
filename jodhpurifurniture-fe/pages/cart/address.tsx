
import Header2 from '@/assets/Billing/Header2';
import Footer2 from '@/assets/Billing/Footer2';
import Checkout from '@/assets/Billing/Checkout';
import SeoHeader from '@/components/SeoHeader';


function Billing() {

  return (
    <>
       <head>
        <SeoHeader
          title={"Shipping Addresses"}
        />
      </head>
      <Header2 />
      
      <Checkout />
     
      <Footer2 />
    </>
  );
}
export default Billing;
