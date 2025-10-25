import Header2 from "@/assets/Billing/Header2";
import Main from "@/assets/Billing/Main";
import Footer2 from "@/assets/Billing/Footer2";
import SeoHeader from "@/components/SeoHeader";
import Head from "next/head";

function Billing() {
  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '2098173020559927');
fbq('track', 'PageView');
fbq('track', 'AddToCart');`,
          }}
        />
      </Head>
      <head>
        <SeoHeader title={"Shopping Cart"} />
      </head>
      <Header2 />

      <Main />

      <Footer2 />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=2098173020559927&ev=PageView&noscript=1"
        />
      </noscript>
    </>
  );
}
export default Billing;
