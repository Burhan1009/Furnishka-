import Disclaimer from '@/assets/global/Disclaimer';
import Discount from '@/assets/global/Discount';
import Footer from '@/assets/global/Footer';
import Header from '@/assets/global/Header';
import NewsLetter from '@/assets/global/NewsLetter';
import Testimonial from '@/assets/global/Testimonial';
import Myreviews from '@/assets/my-account/MyReviews';

const myreviews = () => {
  return (
    <>
      <Discount />
      <Header />
      <Myreviews />
      <Testimonial />
      <NewsLetter />
      <Footer />
      <Disclaimer />
    </>
  );
};
export default myreviews;
