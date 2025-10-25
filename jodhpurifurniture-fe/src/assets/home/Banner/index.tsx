import { useGetEmiBanner } from "@/service/home";
import { Skeleton } from "@mui/material";
import Link from "next/link";

const Banner = () => {
  const { data, isLoading } = useGetEmiBanner()

  const bannerdata = data?.data?.length ? data?.data : []
  return (
    <>
      {!!bannerdata?.length && !isLoading &&
        bannerdata?.map((banner, i) => (
          <section key={i} className="container-fluid section-3">
            <Link
              as={banner?.link ?? "/"}
              href={banner?.link ?? "/"}>

              <div className="container">
                <img
                  src={banner?.image_url}
                  width={"100%"}
                  className="banner-none"
                  alt={banner?.alt_text}
                  title={banner?.alt_text}
                />
                <img
                  src={banner?.image_url}
                  width={"100%"}
                  className="banner-none-desktop"
                  style={{ marginTop: -10 }}
                  alt={banner?.alt_text}
                  title={banner?.alt_text}
                />
              </div>
            </Link>
          </section>
        ))
      }
      {isLoading && <section className="container-fluid section-3">
        <div className="container">
          <Skeleton
            variant="rectangular"
            width={"100%"}
            height={100}
            style={{ borderRadius: 4 }}
          />
        </div>
      </section>}
    </>

  );
};
export default Banner;
