import { selectAccessToken } from "@/service/auth/globalstate";
import { useGetlivingStorage } from "@/service/home";
import { CardMedia, IconButton, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { useSelector } from "react-redux";
import Slider from "react-slick";
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
        alignItems: "center",
        justifyContent: "center",
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
        alignItems: "center",
        justifyContent: "center",
        right: 0,
      }}
      onClick={onClick}
    >
      <img src={"/static/images/vectorR.svg"} />
    </div>
  );
}

function LivingRoom() {
  const { ref, inView } = useInView();
  const { data: livingStorage, isLoading } = useGetlivingStorage("9", {
    enabled: inView,
  });
  const livingStorageData = livingStorage?.data ?? [];

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
          slidesToShow: 2.03,
          rows: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  const router = useRouter();
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
      <section className="container-fluid section-6 for-margin" ref={ref}>
        <div className="container">
          <div className="d-flex  center-section ">
            <div>
              <Typography className="wideH1">Living Room Furniture</Typography>
              <p
                className="font-1689  fw-400 jost color-767676"
                style={{ marginBottom: 0 }}
              >
                Explore a variety of sofa set designs and bring something extra
                special to your living area
              </p>
            </div>
            <div className="sm-none jost d-flexs fw-500 font-1689 icon-viewall">
              <Link as={`/living`} href={`/living`} className="view-all">
                View All
              </Link>
              <img />
            </div>
          </div>

          <div style={{ marginTop: 25 }} className="row">
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
                  {livingStorageData?.length > 0 &&
                    livingStorageData?.map((val: any) => {
                      return (
                        <>
                          <div>
                            <Link
                              href={`/${val.main_parent_category_name}/${val.parent_slug}/${val.slug_key}`}
                            >
                              <div
                                style={{ cursor: "pointer" }}
                                className="image-box"
                              >
                                <CardMedia
                                  component="img"
                                  sx={{
                                    borderRadius: "inherit",
                                    position: "relative",
                                    zIndex: 5,
                                    fontSize: 14,
                                    transition: "300ms ease",
                                    "&:hover": {
                                      transform: "scale(1.05)",
                                    },
                                  }}
                                  title={val.image_title}
                                  image={val.image}
                                  alt={val.image_alt_tag}
                                />
                              </div>
                              <div className="card2">
                                <label
                                  className="font-1654 jost color-22222 fw-500"
                                  style={{
                                    marginTop: 7,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    display: "-webkit-box",
                                    WebkitLineClamp: "1",
                                    WebkitBoxOrient: "vertical",
                                  }}
                                >
                                  {val.category_name}
                                </label>

                                <span className="jost font-1511 color-767676">
                                  Starting from{" "}
                                  {
                                    val.starting_price
                                      .toLocaleString("en-IN", {
                                        style: "currency",
                                        currency: "INR",
                                      })
                                      .split(".")[0]
                                  }
                                </span>
                              </div>
                            </Link>
                          </div>
                        </>
                      );
                    })}
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
export default LivingRoom;
