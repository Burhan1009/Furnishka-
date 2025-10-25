import Header from "@/assets/global/Header";
import Discount from "@/assets/global/Discount";
import Testimonial from "@/assets/global/Testimonial";
import NewsLetter from "@/assets/global/NewsLetter";
import Footer from "@/assets/global/Footer";
import Disclaimer from "@/assets/global/Disclaimer";
import ExploreWideRange from "@/assets/listing/WideRange";
import { Lists } from "@/assets/listing/list";
import ThemeProviderWrapper from "@/utils/ThemeProvider";
import SeoHeader from "@/components/SeoHeader";
import { useRouter } from "next/router";
import { useGetMetaDetailBySlug } from "@/service/listing";
import MetaCommonFooter from "@/components/MetaCommonFooter";



function Listing({ product }) {
  const router = useRouter();
  const { id } = router.query;
  if (id) {
    var { data: metaData } = useGetMetaDetailBySlug(id);
  }
  console.log({ id })
  return (
    <>
      {" "}
      <head>
        <SeoHeader
          title={metaData?.meta_title}
          description={metaData?.meta_description}
        />
      </head>
      <Discount />
      <Header key="search" />

      <ExploreWideRange />

      <ThemeProviderWrapper>
        <Lists />
      </ThemeProviderWrapper>

      {/* <MetaCommonFooter/> */}
      <Testimonial />
      <NewsLetter />
      <Footer />
      <Disclaimer />
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/getAllProducts?search=${context?.query?.keyword ?? "doremon i love you"}`)

    if (!res.ok) {
      throw new Error(`Error fetching categories: ${res.statusText}`);
    }

    const result = await res.json()

    if (res.status === 200) {
      return {
        props: {
          product: result
        }
      }
    } else {
      return {
        notFound: true
      }
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return {
      notFound: true
    };
  }
}
export default Listing;
