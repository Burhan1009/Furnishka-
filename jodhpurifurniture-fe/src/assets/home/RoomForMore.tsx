import { useGetBigBanner } from "@/service/home";
import { Skeleton, Typography } from "@mui/material";
import Link from "next/link";

function RoomForMore() {
  const { data, isLoading } = useGetBigBanner()
  const bannerdata = data?.data?.length ? data?.data : []

  return (
    <>
      {!!bannerdata?.length && !isLoading &&
        bannerdata?.map((banner, i) => (
          <section key={i} className="container-fluid section-5">
            <div style={{ overflow: "hidden", }} className="container">
              <div
                className="banner-position desktop-image-visible"
              // style={{ backgroundImage: ` url('/static/images/desktop12.jpg')` }}
              >
                <Link
                  as={banner?.link}
                  href={banner?.link}
                >
                  <img
                    src={banner?.image_url}
                    alt={banner?.alt_text}
                    style={{ width: " 100%" }}
                    title={banner?.alt_text}
                  />
                </Link>
                {/* <div className="sec5-bg">
                <span className="fw-700 jost ">{bannerdata?.sub_heading ?? ""}</span>
                <Typography className="jost color-22222 fw-700 room-text">
                  {bannerdata?.heading ?? ""}
                </Typography>
                <p className="font-18 jost">{bannerdata?.description ?? ""} </p>
                <Link
                  as={bannerdata?.button_link}
                  href={bannerdata?.button_link}
                >
                  <button>
                    {bannerdata?.button_text ?? "Buy Now"} <i className="fa-solid fa-angle-right"></i>
                  </button>
                </Link>
              </div> */}
              </div>

              <div
                className="banner-position mobile-imade-visible"
                style={{marginTop:10}}
              // style={{ backgroundImage: ` url('/static/images/mobile1.jpg')` }}
              >
                <Link
                  as={banner?.link}
                  href={banner?.link}
                >
                  <img
                    src={banner?.image_url}
                    alt={banner?.alt_text}
                    style={{ width: " 100%" }}
                    title={banner?.alt_text}
                  />
                </Link>
                {/* <div className="sec5-bg">
                <span className="fw-700 jost ">{bannerdata?.sub_heading ?? ""}</span>
                <label className="jost color-22222 fw-700 rm">
                  {bannerdata?.heading ?? ""}
                </label>
                <p className="font-18 jost">{bannerdata?.description ?? ""} </p>
                <Link
                  as={bannerdata?.button_link}
                  href={bannerdata?.button_link}
                >
                  <button>
                    {bannerdata?.button_text ?? "Buy Now"}<i className="fa-solid fa-angle-right"></i>
                  </button>
                </Link>
              </div> */}
              </div>
            </div>
          </section>
        ))
      }
      {isLoading && <section className="container-fluid section-5">
        <div className="container">
          <Skeleton
            variant="rectangular"
            width={"100%"}
            height={500}
            style={{ borderRadius: 4 }}
          />
        </div>
      </section>}
    </>
  );
}
export default RoomForMore;
