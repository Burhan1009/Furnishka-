import Disclaimer from '@/assets/global/Disclaimer';
import Discount from '@/assets/global/Discount';
import Footer from '@/assets/global/Footer';
import Header from '@/assets/global/Header';
import NewsLetter from '@/assets/global/NewsLetter';
import Testimonial from '@/assets/global/Testimonial';
import Mypassword from '@/assets/my-account/MyPassword';

const password = () => {
  return (
    <>
      <Discount />
      <Header />
      <Mypassword />
      <Testimonial />
      <NewsLetter />
      <Footer />
      <Disclaimer />
    </>
  );
};
export default password;
