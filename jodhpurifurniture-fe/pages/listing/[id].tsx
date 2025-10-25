import Header from "@/assets/global/Header";
import Discount from "@/assets/global/Discount";
import Testimonial from "@/assets/global/Testimonial";
import NewsLetter from "@/assets/global/NewsLetter";
import Footer from "@/assets/global/Footer";
import Disclaimer from "@/assets/global/Disclaimer";
import { Lists } from "@/assets/listing/list";
import SeoHeader from "@/components/SeoHeader";
import { useRouter } from "next/router";
import { useGetMetaDetailBySlug } from "@/service/listing";
import dynamic from "next/dynamic";
import { Skeleton } from "@mui/material";
import MetaCommonFooter from "@/components/MetaCommonFooter";
import MetaContent from "@/assets/global/MetaContent";

const ExploreWideRange = dynamic(() => import("@/assets/listing/WideRange"), {
  loading: () => (
    <section className="listing-section1 ">
      <div className="container2 ">
        <div
          className="breadcrumbs  "
          style={{
            paddingTop: 9.5,
            marginBottom: 54,
          }}
        >
          <Skeleton width="40%" />
        </div>
        <div className="container-fluid">
          <h1 style={{ display: "flex", justifyContent: "center" }}>
            <Skeleton width="20%" />
          </h1>
          <p className="font-1678 jost color-767676 text-center">
            Buy Furniture Online in India, made in Solid Sheesham Wood, craft
            fully Treated and Seasoned.
          </p>
          <div className="row justify-content-center m-v-t padding-d-b">
            <Skeleton width="60%" />
            <Skeleton width="60%" />
          </div>
        </div>
      </div>
    </section>
  ),
});

function Listing({ product }) {
  const router = useRouter();
  const { id, } = router.query;
  if (id) {
    var { data: metaData } = useGetMetaDetailBySlug(id);
  }

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
      <Lists />
      {/* <MetaCommonFooter /> */}
      <MetaContent paramField={"slug"} paramKey={id} />
      <Testimonial />
      <NewsLetter />
      <Footer />
      <Disclaimer />
    </>
  );
}

export async function getServerSideProps(context) {
  try {

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/getAllProducts?category_slug=${context?.params?.id}&parent_slug=${context?.query?.search ? undefined : "listing"}`)

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