import "./css/mega.css";
import "./css/index.css";
import "slick-carousel/slick/slick.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { queryClient } from "@/utils/queryClient";
import Router, { useRouter } from "next/router";
import { PersistGate } from "redux-persist/integration/react";
import { Provider as ReduxProvider } from "react-redux";
import { appStore } from "@/service/store";
import { ToastContainer, toast } from "react-toastify";
import createEmotionCache from "@/createEmotionCache";
import { CacheProvider, EmotionCache } from "@emotion/react";
import NextNProgress from "nextjs-progressbar";
import "react-toastify/dist/ReactToastify.css";
import { HoverProvider } from "@/hooks/HoverContext";
import { useEffect, useState } from "react";
import StartScreenLoading from "@/components/StartScreenLoading";

const clientSideEmotionCache = createEmotionCache();

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const currentPage = router.asPath?.slice(1);
  const canonicalUrl = `https://www.jodhpurifurniture.com/${currentPage}`.split(
    "?"
  )[0];
  return (
    <>
      <NextNProgress color="#f15a21" options={{ showSpinner: false }} />

      <CacheProvider value={clientSideEmotionCache}>
        <Head>
          <title>Furnishka</title>

          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta
            name="google-site-verification"
            content="fOrjOdr3Q6p8A0qOeALcb1hqoPRYhCrSUKX64DHsmWI"
          />
          {router?.isReady &&
            <link rel="canonical" href={canonicalUrl} />
          }
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-W96SX5H');
            `,
            }}
          />
        </Head>

        <PersistGate
          persistor={appStore.persistor}
          loading={<StartScreenLoading />}
        >
          <ReduxProvider store={appStore}>
            <QueryClientProvider client={queryClient}>
              <ToastContainer
                position="top-center"
                autoClose={1300}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />
              <link
                rel="stylesheet"
                href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
              />
              {/* Burhan Code Here  */}
              <a
                href="https://wa.me/+919929946848"
                className="float"
                target="_blank"
              >
                <img
                  src={"/static/images/whatsapp_icon.svg"}
                  className="whatsappOnphone"
                />
              </a>

              <iframe
                src="https://www.googletagmanager.com/ns.html?id=GTM-W96SX5H"
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
              ></iframe>

              <HoverProvider>
                <div style={{ background: "#FFFFFF" }}>
                  <Component {...pageProps} key={router.asPath} />;
                </div>
              </HoverProvider>
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </ReduxProvider>
        </PersistGate>
      </CacheProvider>
    </>
  );
}
