import { selectAccessToken } from "@/service/auth/globalstate";
import { useGetBedroomFurniture } from "@/service/home";
import { IconButton, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { Suspense, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import Card2 from "../global/Card2";
import Login from "../global/Login";
import Skeleton from "@mui/material/Skeleton";
import SidebarContent from "../global/SidebarContent";
import { useInView } from "react-intersection-observer";
const icons = {
  img1: "/static/images/chevron-right.svg",
};

function SamplePrevArrow(props: {
  className?: any;
  style?: any;
  onClick?: any;
}) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        background: "white",
        height: 36,
        width: 27,
        placeItems: "center",
        top: "40%",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={onClick}
    >
      <img src={"/static/images/arrow-pre.svg"} />
    </div>
  );
}
function SampleNextArrow(props: {
  className?: any;
  style?: any;
  onClick?: any;
}) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        background: "white",
        height: 36,
        width: 27,
        placeItems: "center",
        top: "40%",
        justifyContent: "center",
        alignItems: "center",
        right: 0,
      }}
      onClick={onClick}
    >
      <img src={"/static/images/vectorR.svg"} />
    </div>
  );
}

function BedroomFurniture() {
  const router = useRouter();
  const { ref, inView } = useInView();
  const { data, isLoading } = useGetBedroomFurniture({ enabled: inView });
  const bedRoomFurniture = data?.data ?? [];

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          slidesToShow: 2.03,
          rows: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  const [show, setShow] = useState(false);
  const tokenA = useSelector(selectAccessToken);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
    setShow(false);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const skeletonArray = new Array(4).fill(null);

  const SkeletonBlock = () => (
    <>
      <Skeleton
        variant="rectangular"
        width={"100%"}
        height={0}
        style={{ paddingTop: "80%", borderRadius: 4 }}
      />
      <Skeleton />
      <Skeleton width="60%" style={{ marginBottom: "15%" }} />
    </>
  );
  return (
    <>
      <Offcanvas show={show} onHide={handleClose}>
        <Typography
          p={2}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          {" "}
          <Offcanvas.Title>
            {" "}
            <img onClick={handleClose} src="/static/media/backdrop.svg" />
            <Link href="/">
              <img
                style={{ marginLeft: 12 }}
                src={"/static/images/logo.svg"}
                width={100}
                alt=""
                className="logo"
              />
            </Link>
          </Offcanvas.Title>
          {tokenA ? (
            <>
              <Typography sx={{ display: { md: "none" } }}>
                <IconButton sx={{ mt: { xs: 0.7, md: 0.4 } }} aria-label="cart">
                  <img
                    onClick={() => router.push("/my-account")}
                    src={"/static/icon/Profile.svg"}
                  />
                </IconButton>
              </Typography>
            </>
          ) : (
            <Typography mt={1}>
              <button onClick={handleOpen} className="login-sm">
                Register / Login
              </button>
            </Typography>
          )}
        </Typography>

        <SidebarContent />
      </Offcanvas>
      <section className="container-fluid section-6" ref={ref}>
        <div className="container">
          <div className="d-flex  center-section">
            <div>
              <Typography className="wideH1">Bedroom Furniture</Typography>
              <p
                className="font-16 fw-400 jost color-767676"
                style={{ marginBottom: ".5rem" }}
              >
                Explore beds online and find the one that's perfect for you
              </p>
            </div>

            <div className="sm-none fw-500 jost d-flexs font-1689 icon-viewall">
              <Link href={`/bedroom`} className="view-all">
                View All
              </Link>
              <img />
            </div>
          </div>

          <div style={{ marginTop: 20 }} className="row">
            {isLoading ? (
              <>
                {skeletonArray.map((_, index) => (
                  <div className="col-6 col-lg col-sm col-md">
                    <SkeletonBlock key={index} />
                  </div>
                ))}
              </>
            ) : (
              <>
                <Slider {...settings}>
                  {bedRoomFurniture?.length > 0 &&
                    bedRoomFurniture?.map((val: any) => (
                      <Suspense
                        fallback={
                          <>
                            <Skeleton
                              variant="rectangular"
                              width={"100%"}
                              height={0}
                              style={{ paddingTop: "80%", borderRadius: 4 }}
                            />
                            <Skeleton />
                            <Skeleton
                              width="60%"
                              style={{ marginBottom: "15%" }}
                            />
                          </>
                        }
                      >
                        <Link
                          href={`/${val.main_parent_category_name}/${val.parent}/${val.slug_key}`}
                        >
                          <Card2
                            style={{ height: 500 }}
                            key={val.product_id}
                            imglink={val.image}
                            title={val.image_title}
                            alt={val.image_alt_tag}
                            productName={val.category_name}
                            startingPrice={
                              val.starting_price
                                .toLocaleString("en-IN", {
                                  style: "currency",
                                  currency: "INR",
                                })
                                .split(".")[0]
                            }
                          />
                        </Link>
                      </Suspense>
                    ))}
                </Slider>

                <div className="d-flex justify-content-center">
                  <button onClick={handleShow} className="view-all-btn">
                    View More <img src={icons["img1"]} alt="arrow" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
      <Login
        isAddDialogOpened={isOpen}
        handleCloseDialog={() => setIsOpen(false)}
      />
    </>
  );
}
export default BedroomFurniture;
