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
import { isProcutHasErr, selectallcategory } from "@/service/auth/globalstate";
import { useSelector } from "react-redux";
import Head from "next/head";
import MetaContent from "@/assets/global/MetaContent";
import { useEffect, useState } from "react";
import axios from "axios";
import Custom404 from "@/assets/404_page";
import { AppStore } from '../store';
import { appStore } from "@/service/store";

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
  const otherAllCategory = useSelector(selectallcategory);
  const router = useRouter();
  const { id, parent, index } = router.query;
  if (id) {
    var { data: metaData } = useGetMetaDetailBySlug(id);
  }
  // Example: const { data: metaData } = useGetMetaDetailBySlug(id);

  const jsonLd1 = JSON.stringify({
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${window.location.origin}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: `${otherAllCategory[0]?.parent_category_name ?? ""}`,
        item: `${window.location.origin}/${otherAllCategory[0]?.parent_category_name}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${otherAllCategory[0]?.sub_category_name ?? ""}`,
        item: `${window.location.origin}/${otherAllCategory[0]?.parent_category_name}/${otherAllCategory[0]?.sub_slug_key}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: `${otherAllCategory[0]?.category_name ?? ""}`,
        item: `${window.location.origin}/${otherAllCategory[0]?.parent_category_name}/${otherAllCategory[0]?.sub_slug_key}/${otherAllCategory[0]?.slug_key}`,
      },
    ],
  });

  return (
    <>
      <Head>
        <script type="application/ld+json">{jsonLd1}</script>
      </Head>
      <SeoHeader title={metaData?.meta_title} description={metaData?.meta_description} />
      <Discount />
      <Header key="search" />
      <ExploreWideRange />
      <Lists />
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

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/getAllCatywithSubCaty`)

    const result = await res.json()
    console.log({ result })
    if (res.status === 200) {
      const findSelectedCat = !!result?.data?.length && result?.data?.find((cat) => cat?.category_name === context?.params?.index)
      console.log({ result, findSelectedCat })

      if (findSelectedCat) {
        const res1 = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/getAllProducts?category_slug=${context?.params?.id}&sub_category_slug=${context?.params?.parent}&parent_slug=${findSelectedCat?.slug_key}`)
        const results = await res1.json()
        console.log({ results })
        if (res1.status === 200) {
          return {
            props: {
              product: results
            }
          }
        } else {
          return {
            notFound: true
          }
        }
      } else {
        return {
          notFound: true
        }
      }

    } else {
      return {
        notFound: true
      }
    }

  }
  catch (error) {
    console.error("An error occurred:", error);
    return {
      notFound: true
    };
  }
}

export default Listing