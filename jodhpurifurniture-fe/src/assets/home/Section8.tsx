
import { useGetDoubleBanner } from "@/service/home";
import { Skeleton } from "@mui/material";
import Link from "next/link";

function Section8() {
  const { data, isLoading } = useGetDoubleBanner()
  const bannerdata = data?.data ?? null

  return (
    <>
      {(bannerdata?.left_banner_image || bannerdata?.right_banner_image) && !isLoading &&
        <section className="section-8 container-fluid">
          <div className="container">
            <div className="row">

              <div className="col-md-6 section-8-img">
                <Link
                  as={bannerdata?.left_link}
                  href={bannerdata?.left_link}
                >
                  <div className="sec8-box3">
                    {/* <div className="sec8-box1">
                      <p className="jost fw-600 sec8text">{bannerdata?.left_heading ?? ""}</p>
                      <p className="jost font-244 fw-500 mb-0 sec8text2">{bannerdata?.left_discount_text ?? ""}</p>
                      <Link
                        as={bannerdata?.left_button_link}
                        href={bannerdata?.left_button_link}
                      >
                        {" "}
                        <button className="btn-sec8">
                          {bannerdata?.left_button_text ?? "Buy Now"}<i className="fa-solid fa-angle-right"></i>
                        </button>
                      </Link>
                    </div> */}
                    <img
                      src={bannerdata?.left_banner_image}
                      width={"100%"} alt={bannerdata?.left_alt_text} title={bannerdata?.left_alt_text}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </Link>
              </div>

              <div className="col-md-6 ">
                <Link
                  as={bannerdata?.right_link}
                  href={bannerdata?.right_link}
                >
                  <div className="sec8-box3">
                    {/* <div className="sec8-box2">
                      <p className="jost fw-600 sec8text">{bannerdata?.right_heading ?? ""}</p>
                      <p className="jost font-244 fw-500 mb-0 sec8text2" >{bannerdata?.right_discount_text ?? ""}</p>
                      <Link
                        as={bannerdata?.right_button_link}
                        href={bannerdata?.right_button_link}
                      >
                        <button className="btn-sec8">
                          {bannerdata?.right_button_text ?? "Buy Now"} <i className="fa-solid fa-angle-right"></i>
                        </button>
                      </Link>
                    </div> */}
                    <img
                      src={bannerdata?.right_banner_image}
                      width={"100%"} title={bannerdata?.right_alt_text} alt={bannerdata?.right_alt_text}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </Link>
              </div>

            </div>
          </div>
        </section>
      }
      {isLoading &&
        <section className="section-8 container-fluid">
          <div className="container">
            <div className="row">
              <div className="col-md-6 section-8-img">
                <Skeleton
                  variant="rectangular"
                  width={"100%"}
                  height={400}
                  style={{ borderRadius: 4 }}
                />
              </div>
              <div className="col-md-6 ">
                <Skeleton
                  variant="rectangular"
                  width={"100%"}
                  height={400}
                  style={{ borderRadius: 4 }}
                />
              </div>
            </div>
          </div>
        </section>
      }
    </>
  );
}
export default Section8;
