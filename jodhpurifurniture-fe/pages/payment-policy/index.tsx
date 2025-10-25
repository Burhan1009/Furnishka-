import Header from '@/assets/global/Header';
import Discount from '@/assets/global/Discount';
import Footer from '@/assets/global/Footer';
import Disclaimer from '@/assets/global/Disclaimer';
import PaymentPolicyFooter from '@/assets/Payment&Policy';
import SeoHeader from '@/components/SeoHeader';

function PaymentPolicy() {
  return (
    <>
      {' '}
      <head>
        <SeoHeader title={'Payment Policy | Jodhpuri Furniture'} />
      </head>
      <Discount />
      <Header />
      <div className='container2'>
        <PaymentPolicyFooter />
      </div>
      <div className='border2'></div>
     
      <Footer />
      
      <Disclaimer />
    </>
  );
}
export default PaymentPolicy;
