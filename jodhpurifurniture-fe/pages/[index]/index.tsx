import { useRef } from "react";
import Header from "@/assets/global/Header";
import Discount from "@/assets/global/Discount";
import NewsLetter from "@/assets/global/NewsLetter";
import Footer from "@/assets/global/Footer";
import Disclaimer from "@/assets/global/Disclaimer";
import SimilarProduct from "@/assets/Detail/SimilarProducts";
import Dimensions from "@/assets/Detail/Dimensions";
import Review from "@/assets/Detail/Reviews";
import { useRouter } from "next/router";
import { useGetMetaDetailBySlug } from "@/service/listing";
import SeoHeader from "@/components/SeoHeader";
import Testmonial from "@/assets/Detail/Testmonial";
import dynamic from "next/dynamic";
import { Skeleton } from "@mui/material";
import StickyBox from "react-sticky-box";
import Schema from "@/components/Schema";
import Head from "next/head";
import { useSelector } from "react-redux";
import {
  selectProductDetail,
  selectProductDetailReview,
} from "@/service/detail";
// import { Lists } from "@/assets/listing/list";
// import MetaCommonFooter from "@/components/MetaCommonFooter";
const ProductCards = dynamic(() => import("@/assets/Detail/ProductCard"), {
  loading: () => (
    <>
      <div className="container2 ">
        <div className="row">
          <div className="col-lg-6">
            <StickyBox offsetTop={20} offsetBottom={20}>
              <Skeleton
                style={{
                  height: 20,
                  marginBottom: "3%",
                  width: "40%",
                  marginTop: 10,
                }}
              />{" "}
              <Skeleton
                variant="rectangular"
                width={"100%"}
                height={0}
                style={{ paddingTop: "83%" }}
              />
              <div className="  d-flex" style={{ marginTop: 13 }}>
                <Skeleton
                  variant="rectangular"
                  width={"14%"}
                  height={0}
                  style={{ paddingTop: "11%", marginRight: 10 }}
                />
                <Skeleton
                  variant="rectangular"
                  width={"14%"}
                  height={0}
                  style={{ paddingTop: "11%", marginRight: 10 }}
                />
                <Skeleton
                  variant="rectangular"
                  width={"14%"}
                  height={0}
                  style={{ paddingTop: "11%", marginRight: 10 }}
                />
                <Skeleton
                  variant="rectangular"
                  width={"14%"}
                  height={0}
                  style={{ paddingTop: "11%", marginRight: 10 }}
                />
                <Skeleton
                  variant="rectangular"
                  width={"14%"}
                  height={0}
                  style={{ paddingTop: "11%", marginRight: 10 }}
                />
                <Skeleton
                  variant="rectangular"
                  width={"14%"}
                  height={0}
                  style={{ paddingTop: "11%", marginRight: 10 }}
                />
                <Skeleton
                  variant="rectangular"
                  width={"14%"}
                  height={0}
                  style={{ paddingTop: "11%", marginRight: 10 }}
                />
              </div>
            </StickyBox>
          </div>
          <div className="col-lg-6">
            <Skeleton
              style={{
                height: 40,

                marginBottom: "0.5%",
                width: "100%",
                marginTop: "6.5%",
              }}
            />
            <Skeleton
              style={{
                height: 40,

                marginBottom: "2%",
                width: "40%",
              }}
            />
            <Skeleton
              style={{
                marginBottom: "4%",
                width: "60%",
              }}
            />
            <Skeleton
              style={{
                marginBottom: "1%",
                width: "20%",
              }}
            />
            <Skeleton
              style={{
                height: 40,

                marginBottom: "2.5%",
                width: "30%",
              }}
            />
            <Skeleton
              style={{
                width: "45%",
              }}
            />
            <Skeleton
              style={{
                height: 100,

                marginBottom: "0.5%",
                width: "100%",
              }}
            />
            <Skeleton
              style={{
                width: "20%",
                marginBottom: "1%",
              }}
            />
            <div className="d-flex" style={{ marginBottom: "2%" }}>
              <Skeleton
                variant="rectangular"
                width={"21%"}
                height={0}
                style={{ paddingTop: "17%", marginRight: 12 }}
              />
              <Skeleton
                variant="rectangular"
                width={"21%"}
                height={0}
                style={{ paddingTop: "17%" }}
              />
            </div>
            <Skeleton
              style={{
                width: "40%",
                height: 70,
                marginBottom: "0.3%",
              }}
            />
            <Skeleton
              style={{
                width: "70%",
                height: 70,
                marginBottom: "1%",
              }}
            />
            <div className="d-flex" style={{ marginBottom: "1.5%" }}>
              <Skeleton
                style={{
                  width: "70%",
                  height: 90,
                  marginBottom: "1%",
                  marginRight: 12,
                }}
              />
              <Skeleton
                style={{
                  width: "70%",
                  height: 90,
                  marginBottom: "1%",
                  marginRight: 12,
                }}
              />
            </div>
            <Skeleton
              style={{
                width: "80%",
                height: 30,
                marginBottom: "1%",
              }}
            />
            <Skeleton
              style={{
                width: "50%",
                height: 35,
                marginBottom: "1%",
              }}
            />
            <Skeleton
              style={{
                width: "60%",

                marginBottom: "1%",
              }}
            />
            <Skeleton
              style={{
                width: "60%",

                marginBottom: "1%",
              }}
            />
            <Skeleton
              style={{
                width: "60%",

                marginBottom: "1%",
              }}
            />
            <Skeleton
              style={{
                width: "60%",

                marginBottom: "1%",
              }}
            />
            <Skeleton
              style={{
                width: "60%",

                marginBottom: "1%",
              }}
            />
          </div>
        </div>
      </div>
    </>
  ),
});
const ProductCardMobile = dynamic(
  () => import("@/assets/Detail/ProductCardMobile"),
  {
    loading: () => (
      <div className="container2 ">
        <Skeleton
          style={{
            height: 25,
            marginBottom: "1.5%",
            width: "100%",
            marginTop: 10,
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "5%",
          }}
        >
          <Skeleton
            style={{
              height: 15,
              marginBottom: "1.5%",
              width: "50%",
            }}
          />
          <Skeleton
            style={{
              height: 15,
              marginBottom: "1.5%",
              width: "30%",
            }}
          />
        </div>
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={0}
          style={{ paddingTop: "83%" }}
        />
        <div className="  d-flex" style={{ marginTop: 13, marginBottom: "5%" }}>
          <Skeleton
            variant="rectangular"
            width={"17%"}
            height={0}
            style={{ paddingTop: "11%", marginRight: 10 }}
          />
          <Skeleton
            variant="rectangular"
            width={"14%"}
            height={0}
            style={{ paddingTop: "11%", marginRight: 10 }}
          />
          <Skeleton
            variant="rectangular"
            width={"14%"}
            height={0}
            style={{ paddingTop: "11%", marginRight: 10 }}
          />
          <Skeleton
            variant="rectangular"
            width={"14%"}
            height={0}
            style={{ paddingTop: "11%", marginRight: 10 }}
          />
          <Skeleton
            variant="rectangular"
            width={"14%"}
            height={0}
            style={{ paddingTop: "11%", marginRight: 10 }}
          />
          <Skeleton
            variant="rectangular"
            width={"14%"}
            height={0}
            style={{ paddingTop: "11%", marginRight: 10 }}
          />
          <Skeleton
            variant="rectangular"
            width={"14%"}
            height={0}
            style={{ paddingTop: "11%", marginRight: 10 }}
          />
        </div>
        <Skeleton
          style={{
            width: "25%",
            marginBottom: "1%",
          }}
        />
        <div className="d-flex" style={{ marginBottom: "6%" }}>
          <Skeleton
            variant="rectangular"
            width={"31%"}
            height={0}
            style={{ paddingTop: "25%", marginRight: 12 }}
          />
          <Skeleton
            variant="rectangular"
            width={"31%"}
            height={0}
            style={{ paddingTop: "25%" }}
          />
        </div>
        <Skeleton
          style={{
            marginBottom: "0.5%",
            width: "25%",
          }}
        />
        <Skeleton
          style={{
            height: 40,

            marginBottom: "2.5%",
            width: "40%",
          }}
        />
        <Skeleton
          style={{
            height: 15,
            width: "55%",
          }}
        />
        <Skeleton
          style={{
            height: 150,

            width: "100%",
          }}
        />
        <Skeleton
          style={{
            width: "40%",
            marginBottom: "0.3%",
          }}
        />
        <Skeleton
          style={{
            width: "100%",
            height: 90,
            marginBottom: -20,
          }}
        />

        <Skeleton
          style={{
            width: "100%",
            height: 90,
            marginBottom: "1%",
          }}
        />
        <Skeleton
          style={{
            width: "20%",
            height: 15,
            marginBottom: 1,
          }}
        />
        <Skeleton
          style={{
            width: "100%",
            height: 50,
            marginBottom: "1%",
          }}
        />
        <Skeleton
          style={{
            width: "80%",
            height: 30,
            marginBottom: "4%",
          }}
        />
        <Skeleton
          style={{
            width: "50%",
            height: 35,
            marginBottom: "1%",
          }}
        />
        <Skeleton
          style={{
            width: "60%",

            marginBottom: "1%",
          }}
        />
        <Skeleton
          style={{
            width: "60%",

            marginBottom: "10%",
          }}
        />
      </div>
    ),
  }
);
const MoreInfo = dynamic(() => import("@/assets/Detail/MoreInfo"), {
  loading: () => (
    <div className="container2">
      <section className="section-4" style={{ marginBottom: 80 }}>
        <Skeleton
          style={{
            height: 40,

            marginBottom: "0.5%",
            width: "20%",
          }}
        />
        <Skeleton
          style={{
            marginBottom: "1%",
            width: "23%",
          }}
        />
        <Skeleton
          style={{
            height: 60,

            marginBottom: "0.5%",
            width: "100%",
          }}
        />
        <Skeleton
          style={{
            marginBottom: "0.5%",
            width: "45%",
          }}
        />
        <Skeleton
          style={{
            marginBottom: "0.5%",
            width: "45%",
          }}
        />
        <Skeleton
          style={{
            marginBottom: "0.5%",
            width: "45%",
          }}
        />
        <Skeleton
          style={{
            marginBottom: "0.5%",
            width: "45%",
          }}
        />
      </section>
    </div>
  ),
});

const Home = ({ product }) => {
  const productData = useSelector(selectProductDetail);
  const productReview = useSelector(selectProductDetailReview);
  console.log({ productReview });
  const resultRef = useRef(null);
  const router = useRouter();
  console.log({ router });
  const { index } = router.query;

  var { data: metaData } = useGetMetaDetailBySlug(index, { enabled: !!index });
  const jsonLd1 = JSON.stringify({
    "@context": "https://schema.org/",
    "@type": "Product",
    name: productData?.product_name,
    image: productData?.base_image,
    description: metaData?.meta_description,
    brand: [
      {
        "@type": "Brand",
        name: "Jodhpuri Furniture",
      },
    ],
    sku: productData?.sku,
    offers: [
      {
        "@type": "Offer",
        url: productData?.slug_key,
        priceCurrency: "INR",
        price: `${productData?.sale_price}`,
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
      },
    ],
    aggregateRating: [
      {
        "@type": "AggregateRating",
        ratingValue: "5",
        bestRating: "5",
        worstRating: "1",
        ratingCount: `${productReview?.reviews?.length}`,
      },
    ],
  });
  return (
    <>
      <Head>
        <script type="application/ld+json">{jsonLd1}</script>
      </Head>
      <Discount />
      <Header />

      <>
        {" "}
        <head>
          <SeoHeader
            title={metaData?.meta_title}
            description={metaData?.meta_description}
            image={metaData?.product_img}
          />
        </head>
        <>
          <div className="productcard-desktop-display">
            <ProductCards resultRef={resultRef} />
          </div>
          <div className="productcard-desktop-mobile">
            <ProductCardMobile resultRef={resultRef} />
          </div>

          <div className="productcard-desktop-display">
            <MoreInfo />

            <Dimensions />
            <SimilarProduct />

            <Review ref={resultRef} />
          </div>
        </>
      </>

      <Testmonial />
      <NewsLetter />
      <Footer />
      <Disclaimer />
    </>
  );
};
export async function getServerSideProps(context) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/AllRelatedProducts/${context?.params?.index}`);

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
export default Home;
