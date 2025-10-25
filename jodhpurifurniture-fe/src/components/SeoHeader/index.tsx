import React, { Fragment } from "react";
import Head from "next/head";

const SeoHeader = (props) => {
  const { title, description, image } = props;
  const imgUrl = image;
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Jodhpuri Furniture",
    url: `${window.location.origin}`,
    logo: "https://www.jodhpurifurniture.com/static/images/logo%203.svg",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91- 99299 46846",
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: "Hindi",
      },
    ],
    sameAs: [
      "https://www.facebook.com/jodhpurifurniture/",
      "https://www.instagram.com/jodhpuri.furniture/",
      "https://in.pinterest.com/riyajodhpurifurniture/"
    ],
   
  });

  return (
    <Fragment>
      <Head>
        {/* seo tag of google */}
        <title>{title}</title>
        <meta name="og:locale" content="en_US"></meta>
        <meta name="googlebot" content="index, follow"></meta>
        <meta name="YahooSeeker" content="index, follow"></meta>
        <meta name="msnbot" content="index, follow"></meta>
        <meta name="author" content={window.location.host}></meta>
        <meta name="robots" content="index, follow, noodp"></meta>
        <meta name="fb:app_id" content="666826607519240"></meta>
        <meta name="email" content="info@jodhpurifurniture.com"></meta>
        {/* <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
        <meta name='site_name' content={website} /> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}`} />
        <meta property="og:site_name" content="Jodhpuri Furniture" />
        <meta name="og:title" property="og:title" content={title} />

        <meta property="twitter:title" content={title}></meta>
        <meta name="theme-color" content="#dd982f"></meta>
        <meta
          name="og:description"
          property="og:description"
          content={description}
        />
        <meta name="description" content={description} />
        <meta
          property="og:image"
          content={imgUrl ?? "/static/assets/Beds.jpd"}
        />
        <meta
          property="twitter:image"
          content={imgUrl ?? "/static/assets/Beds.jpd"}
        />
        {/* script for news and drops */}
        <script type="application/ld+json">{jsonLd}</script>
      </Head>
    </Fragment>
  );
};

export default SeoHeader;
