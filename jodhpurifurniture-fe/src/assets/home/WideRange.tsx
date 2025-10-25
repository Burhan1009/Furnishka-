import Offcanvas from "react-bootstrap/Offcanvas";
import Link from "next/link";
import { useState } from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import { selectAccessToken } from "@/service/auth/globalstate";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import SidebarContent from "../global/SidebarContent";
import Login from "../global/Login";
import Slider from "react-slick";
import { useGetWideRange } from "@/service/home";

function WideRange({ paramKey,isSlider }) {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const tokenA = useSelector(selectAccessToken);
  const [isOpen, setIsOpen] = useState(false);
  const payLoadData = paramKey ? { page: paramKey } : ""
  const { data } = useGetWideRange(payLoadData)
  const wideRangeData = data?.data?.data?.length ? data?.data?.data : []

  const handleOpen = () => {
    setShow(false);
    setIsOpen(!isOpen);
  };
  const handleClose = () => setShow(false);

  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: wideRangeData?.length > 5 ? 6 : wideRangeData?.length,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: wideRangeData?.length > 3 ? 4 : wideRangeData?.length,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: wideRangeData?.length > 2 ? 3 : wideRangeData?.length,
          slidesToScroll: 3,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: wideRangeData?.length > 2 ? 3.1 : wideRangeData?.length,
          rows: 1,
          slidesToScroll: 3,
          autoplay: false,
        },
      },
    ],
  };
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
      {!!wideRangeData?.length &&
        <div className=" sec container-fluid ">
          <div className="container ">
            <Typography className="wideH1">Explore Our Wide Range</Typography>
            <p className="">
              Visit our shop to see amazing creations from our designers.
            </p>
            <Grid sx={{ display: { xs: 'none', md: 'contents' } }}>
              {isSlider ?

                <Grid className=" row  boxes-padding ">
                  <Slider {...settings}>
                    {wideRangeData?.map((range, i) => (
                      <div key={i} style={{ marginBottom: 30 }} className="col-4 col-lg-2 boxes-padding h6 text-hover-image">
                        <Link
                          href={range?.url}
                          as={range?.url}
                        >
                          <div className="image-box ">
                            <img
                              src={range?.cat_image}
                              style={{ fontSize: 14 }}
                              alt={`${range?.parent_cat_slug_key} | ${range?.cat_slug_key}`}
                              title={range?.cat_name}
                            />
                          </div>
                          <Typography className="widetext">{range?.cat_name}</Typography>
                        </Link>
                      </div>
                    ))}
                  </Slider>
                </Grid>
                :
                <Grid className=" row  boxes-padding ">
                  {/* <Slider {...settings}> */}
                  {wideRangeData?.map((range, i) => (
                    <div key={i} style={{ marginBottom: 30 }} className="col-4 col-lg-2 boxes-padding h6 text-hover-image">
                      <Link
                        href={range?.url}
                        as={range?.url}
                      >
                        <div className="image-box ">
                          <img
                            src={range?.cat_image}
                            style={{ fontSize: 14 }}
                            alt={`${range?.parent_cat_slug_key} | ${range?.cat_slug_key}`}
                            title={range?.cat_name}
                          />
                        </div>
                        <Typography className="widetext">{range?.cat_name}</Typography>
                      </Link>
                    </div>
                  ))}

                </Grid>
              }
            </Grid>
            <Grid sx={{ display: { xs: 'contents', md: 'none' } }}>
              <Grid className=" row  boxes-padding ">
                <Slider {...settings}>
                  {wideRangeData?.map((range, i) => (
                    <div key={i} className="col-4 col-lg-2 boxes-padding h6 text-hover-image">
                      <Link
                        href={range?.url}
                        as={range?.url}
                      >
                        <div className="image-box ">
                          <img
                            src={range?.cat_image}
                            style={{ fontSize: 14 }}
                            alt={`${range?.parent_cat_slug_key} | ${range?.cat_slug_key}`}
                            title={range?.cat_name}
                          />
                        </div>
                        <Typography className="widetext">{range?.cat_name}</Typography>
                      </Link>
                    </div>
                  ))}
                </Slider>
              </Grid>
            </Grid>
          </div>
        </div>
      }

      <Login
        isAddDialogOpened={isOpen}
        handleCloseDialog={() => setIsOpen(false)}
      />
    </>
  );
}
export default WideRange;
