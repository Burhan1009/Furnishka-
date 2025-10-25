import Disclaimer from "@/assets/global/Disclaimer";
import Discount from "@/assets/global/Discount";
import Footer from "@/assets/global/Footer";
import Header from "@/assets/global/Header";

import SeoHeader from "@/components/SeoHeader";

import { useRouter } from "next/router";

const Search = () => {
  const router = useRouter();
  const { keyword } = router.query;
  return (
    <>
      <head>
        <SeoHeader title={`Search - ${keyword ?? ""}`} />
      </head>
      <Discount />
      <Header />

      <Footer />
      <Disclaimer />
    </>
  );
};

export default Search;
