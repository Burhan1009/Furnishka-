import Offcanvas from "react-bootstrap/Offcanvas";
import Link from "next/link";
import Slider from "react-slick";
import { useState } from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import { selectAccessToken } from "@/service/auth/globalstate";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import SidebarContent from "../global/SidebarContent";
import Login from "../global/Login";

const icons = {
  img1: "/static/images/sofa.png",
  img2: "/static/images/beds.png",
  img3: "/static/images/dinning.png",
  img4: "/static/images/chevron-right.svg",
};

function WideRange2() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const tokenA = useSelector(selectAccessToken);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setShow(false);
    setIsOpen(!isOpen);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 6,
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
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3.1,
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

      <div className=" sec container-fluid widerange-b">
        <div className="container">
          <Grid className=" row  m-b31  boxes-padding  ">
            <Slider {...settings}>
              <div className="col-4 col-lg-2 boxes-padding text-hover-image">
                <Link
                  href={`/living/living-storage-2/shoe-racks-in-bangalore`}
                  as={`/living/living-storage-2/shoe-racks-in-bangalore`}
                >
                  <div>
                    <div className="box image-box">
                      <img
                        src="/static/images/p.jpg"
                        style={{ fontSize: 14 }}
                        alt="wooden shoe ranks"
                        title="Wooden Cabinet"
                      />
                    </div>
                    <Typography className="widetext">Shoe Racks</Typography>
                  </div>
                </Link>
              </div>
              <div className="col-4 col-lg-2 boxes-padding text-hover-image">
                <Link
                  href={`/living/buy-table-online/console-tables`}
                  as={`/living/buy-table-online/console-tables`}
                >
                  <div>
                    <div className="box2 image-box">
                      <img
                        src="/static/images/o.jpg"
                        style={{ fontSize: 14 }}
                        alt="wooden console table | Console unit online"
                        title="Wooden Sideboard"
                      />
                    </div>
                    <Typography className="widetext">Console Tables</Typography>
                  </div>
                </Link>
              </div>
              <div className="col-4 col-lg-2 boxes-padding text-hover-image">
                <Link
                  href={`/sofa/sofa-cum-bed/wooden-sofa-cum-beds-in-bangalore`}
                  as={`/sofa/sofa-cum-bed/wooden-sofa-cum-beds-in-bangalore`}
                >
                  <div>
                    <div className="box3 image-box">
                      <img
                        src="/static/images/n.jpg"
                        style={{ fontSize: 14 }}
                        alt="Wooden Sofa cum Bed | Sofa cum bed design"
                        title=" Wooden Sofa Cum Bed"
                      />
                    </div>
                    <Typography className="widetext">Sofa Cum Beds</Typography>
                  </div>
                </Link>
              </div>
              <div className="col-4 col-lg-2 boxes-padding text-hover-image">
                <Link
                  href={`/living/living-storage/chest-of-drawers`}
                  as={`/living/living-storage/chest-of-drawers`}
                >
                  <div>
                    <div className="image-box">
                      <img
                        src="/static/images/m.jpg"
                        style={{ fontSize: 14 }}
                        alt="Wooden chest of Drawers"
                        title="Wooden Chest of Drawers"
                      />
                    </div>
                    <Typography className="widetext">Chest Of Drawers</Typography>
                  </div>
                </Link>
              </div>
              <div className="col-4 col-lg-2 boxes-padding text-hover-image">
                <Link
                  href={`/living/living-storage/cabinets-and-sideboards-1`}
                  as={`/living/living-storage/cabinets-and-sideboards-1`}
                >
                  <div>
                    <div className="box5 image-box">
                      <img
                        src="/static/images/r.jpg"
                        style={{ fontSize: 14 }}
                        alt="Wooden Cabinet & Sideboard"
                        title="Wooden Sideboard"
                      />
                    </div>
                    <Typography className="widetext">Cabinets & Sideboards</Typography>
                  </div>
                </Link>
              </div>
              <div className="col-4 col-lg-2 boxes-padding text-hover-image">
                <Link
                  href={`/dining/bar-furniture/bar-cabinets`}
                  as={`/dining/bar-furniture/bar-cabinets`}
                >
                  <div>
                    <div className="box4 image-box">
                      <img
                        src="/static/images/q.jpg"
                        style={{ fontSize: 14 }}
                        alt="bar cabinet furniture | wooden bar furniture"
                        title="Wooden Bar Cabinet"
                      />
                    </div>
                    <Typography className="widetext">Bar Cabinets</Typography>
                  </div>
                </Link>
              </div>
            </Slider>
          </Grid>

          <div className="d-flex justify-content-center">
            <button onClick={handleShow} className="view-all-btn">
              Explore All Categories <img src={icons["img4"]} alt="Arrow" />
            </button>
          </div>
          <div className="border3 sm-none" style={{ marginTop: 45 }}></div>
        </div>
      </div>

      <Login
        isAddDialogOpened={isOpen}
        handleCloseDialog={() => setIsOpen(false)}
      />
    </>
  );
}
export default WideRange2;
