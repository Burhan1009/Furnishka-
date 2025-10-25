import CustomFurnitureForm from "@/components/CustomFurnitureForm";
import { Box, Dialog, IconButton, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: "80%",

  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 3,
};

const CustomerFurniture = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className="container2">
        <div className="head-text">
          <img
            src={"/static/images/Rectangle 15412.jpg"}
            style={{ marginTop: 30 }}
            className="responsive"
            alt="Custom bedroom furniture online in india"
            title="Custom bedroom furniture"
          ></img>
          <Grid
            className="text-on-image"
            sx={{
              textAlign: "center",
              alignContent: "center",
              position: "absolute",
            }}
          >
            <Typography
              className="font-5576"
              sx={{
                fontSize: { xs: 20, sm: 40, md: 55 },
                mt: 4,
                color: "#fff",
                fontWeight: "700",
                fontFamily: "Jost",
                mr: 1,
              }}
            >
              Custom Furniture
            </Typography>
            <Typography
              className="font-3576"
              sx={{
                alignItems: "center",
                fontWeight: "500",
                color: "#fff",
                fontFamily: "Jost",
                mb: { xs: 0, sm: 3 },
              }}
            >
              We custom build your dream furniture
            </Typography>
            <Button
              className="p-button"
              onClick={handleOpen}
              sx={{
                background: "#f15a21",
                color: "#fff",

                "&:hover": {
                  background: "#f15a21",
                  color: "#fff",
                },

                fontWeight: "500",
                fontFamily: "Jost",
                mt: 1,
                fontSize: { xs: 12, md: 16 },

                // height: { xs: 30, md: 50 },
              }}
            >
              START - CUSTOMIZE NOW
            </Button>
          </Grid>
        </div>
        <Grid sx={{ textAlign: "center", mt: 5 }}>
          <Grid sx={{ display: { sm: "flex" }, justifyContent: "center" }}>
            <h1
              className="heading-other"
              style={{
                marginTop: 45,
                fontWeight: "600",
                fontFamily: "Jost",
                marginRight: 9,
              }}
            >
              CUSTOM FURNITURE
            </h1>
            <Typography
              sx={{
                fontSize: { xs: 30, sm: 31, ms: 32, lg: 35 },
                alignItems: "center",
                fontWeight: "600",
                color: "#f15a21",
                fontFamily: "Jost",
                mb: { xs: 2, sm: 3, ms: 4, lg: 5 },
                mt: { sm: 4 },
              }}
            >
              “Made To Order”
            </Typography>
          </Grid>
          <Typography
            sx={{
              fontSize: { xs: 13, sm: 14, md: 15 },
              fontWeight: "500",
              fontFamily: "Jost",
              color: "#767676",
              mb: { xs: 2, sm: 3, ms: 4, lg: 5 },
              lineHeight: 2,
              ml: { xs: "none", sm: 10, md: 25 },
              mr: { xs: "none", sm: 10, md: 25 },
            }}
          >
            We have a huge collection of coupons, promo codes, coupon codes for
            online shopping. We do our best to satisfy our customer by providing
            you an exciting offers and discounts on your favorite furniture. Are
            you ready to save some money?
          </Typography>
        </Grid>
        <Grid sx={{ textAlign: "center", mt: 5 }}>
          <Typography
            sx={{
              fontSize: { xs: 19, sm: 21, ms: 23, lg: 25 },
              mt: { xs: 2, sm: 3, ms: 4, lg: 5 },
              fontWeight: "600",
              fontFamily: "Jost",
              mr: 1,
              mb: { xs: 2, sm: 3, ms: 4, lg: 5 },
            }}
          >
            If you can Imagine it? We can Make it!
          </Typography>
          <Grid
            sx={{ justifyContent: "center" }}
            className="flex-item-furniture"
          >
            <Typography
              className="align-text-custom-r m right-mm"
              sx={{
                fontSize: { xs: 16, sm: 18, md: 20 },
                fontWeight: "500",
                fontFamily: "Jost",
              }}
            >
              Share your Idea
              <Typography
                className="align-text-custom-r"
                sx={{
                  fontSize: { xs: 13, sm: 14, md: 15 },
                  fontWeight: "500",
                  fontFamily: "Jost",
                  color: "#767676",

                  lineHeight: 2,
                }}
              >
                Your ideas help us know better about your expectations. The
                customization we do is entirely based on what goes in our
                customers’ mind.
              </Typography>
            </Typography>
            <Grid sx={{ diplay: { xs: "none" }, justifyContent: "center" }}>
              <img
                src={"/static/images/circle.png"}
                className="responsive mx-auto image-none-circle"
                alt="Custom Made Furniture Logo"
                title="Custom Made Furniture"
              ></img>
            </Grid>
            <Typography
              className="align-text-custom-l left-mm"
              sx={{
                fontSize: { xs: 16, sm: 18, md: 20 },
                fontWeight: "500",
                fontFamily: "Jost",
                // textAlign: { xs: "center", md: "left" },
                mt: { xs: 2, md: 0 },
              }}
            >
              Designing
              <Typography
                className="align-text-custom-l"
                sx={{
                  fontSize: { xs: 13, sm: 14, md: 15 },
                  fontWeight: "500",
                  fontFamily: "Jost",
                  color: "#767676",
                  // maxWidth: { xs: 600, sm: 900, md: 615, lg: 350 },
                  lineHeight: 2,
                }}
              >
                Share the design of your dream furniture through sketch, picture
                or URL and tell us about any additional / specific request for
                modifications you may have, including the size of the area you
                plan to position the furniture in your home.
              </Typography>
            </Typography>
          </Grid>
          <Grid
            sx={{ justifyContent: "space-between" }}
            className="flex-item-furniture"
          >
            <Typography
              className="margin-right-align-r "
              sx={{
                fontSize: { xs: 16, sm: 18, md: 20 },
                fontWeight: "500",
                fontFamily: "Jost",
                // mr: { md: 53, lg: 0 },

                mt: { xs: 2, md: -7, lg: -16 },
                textAlign: { xs: " center", md: " right" },
              }}
            >
              Manufacturing
              <Typography
                className="margin-right-align-rf "
                sx={{
                  fontSize: { xs: 13, sm: 14, md: 15 },
                  fontWeight: "500",
                  fontFamily: "Jost",
                  color: "#767676",

                  lineHeight: 2,
                }}
              >
                The products we sell gets manufactured in Jodhpur Rajasthan. The
                final finishing and polishing are done by the carpenters who
                works for us in Bangalore.
              </Typography>
            </Typography>
            <Typography
              className="margin-right-align-l "
              sx={{
                fontSize: { xs: 16, sm: 18, md: 20 },
                fontWeight: "500",
                fontFamily: "Jost",

                mt: { xs: 2, md: -6.5, lg: -15 },
                textAlign: { xs: "center", md: "left" },
              }}
            >
              Delivery
              <Typography
                className="margin-right-align-lf  "
                sx={{
                  fontSize: { xs: 13, sm: 14, md: 15 },

                  fontWeight: "500",
                  fontFamily: "Jost",
                  color: "#767676",
                  mb: 5,

                  lineHeight: 2,
                }}
              >
                The customized products take 30-40 days to get delivered at your
                doorstep. The readily available products are delivered within 5
                days.
              </Typography>
            </Typography>
          </Grid>

          <img
            src={"/static/images/ban.jpg"}
            style={{ borderRadius: 6 }}
            className="responsive main-desktop"
            alt="whatsApp Banner"
            title="WhatsApp Detail"
          ></img>

          <img
            src={"/static/images/ban_mobi.jpg"}
            style={{ borderRadius: 6 }}
            className="responsive main-mobile"
            alt="whatsApp Banner"
            title="WhatsApp Detail"
          ></img>
          <Typography
            sx={{
              fontSize: { xs: 19, sm: 21, ms: 23, lg: 25 },
              mt: { xs: 5, sm: 6, ms: 7, lg: 8 },
              mb: 5,

              fontWeight: "700",
              fontFamily: "Jost",
              mr: 1,
            }}
          >
            HERE’S WHY WE CUSTOM MAKE
          </Typography>
          <img
            src={"/static/images/kp-2.png"}
            width={"100%"}
            className="img-none-customize"
            alt="Market Model Banner"
            title="Market Model"
          ></img>
          <Grid
            sx={{
              display: { sm: "flex" },
              justifyContent: { xs: "center", md: "left" },
              gap: { xs: 5, sm: 3, md: 5, lg: 12 },
              mb: 2,
              // ml:{lg:-4}
            }}
          >
            <Grid sx={{ mb: 2 }}>
              <img
                src={"/static/images/market-modal.jpg"}
                className="responsive-2 img-none-customize-22"
                alt="Market Model Banner"
                title="Market Model"
              ></img>
            </Grid>
            <Grid>
              <img
                src={"/static/images/market-modal2.jpg"}
                className="responsive-2 img-none-customize-22"
                alt="Market Model Banner"
                title="Market Model"
              ></img>
            </Grid>
          </Grid>
          <Button
            onClick={handleOpen}
            sx={{
              background: "#f15a21",
              color: "#fff",

              "&:hover": {
                background: "#f15a21",
                color: "#fff",
              },
              mb: 5,
              fontWeight: "500",
              fontFamily: "Jost",
              fontSize: { xs: 14, md: 16 },
              height: { xs: 40, md: 50 },
            }}
          >
            START - CUSTOMIZE NOW
          </Button>
          {/* <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={{...style,width:{xs:'80%',lg:'50%'}}}>
              <CustomFurnitureForm/>
            </Box>
          </Modal> */}
          <Grid sx={{ textAlign: "center" }}>
            <Grid sx={{ display: { sm: "flex" }, justifyContent: "center" }}>
              <Typography
                sx={{
                  fontSize: { xs: 20, sm: 21, ms: 22, lg: 25 },
                  mt: 1.2,
                  fontWeight: "600",
                  fontFamily: "Jost",
                  mr: 1,
                }}
              >
                CUSTOM FURNITURE
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 30, sm: 31, ms: 32, lg: 35 },
                  alignItems: "center",
                  fontWeight: "600",
                  color: "#f15a21",
                  fontFamily: "Jost",
                  mb: 5,
                }}
              >
                “Made To Order”
              </Typography>
            </Grid>
          </Grid>
          <img
            src={"/static/images/Group-3312.jpg"}
            width={"100%"}
            className="img-none-customize"
            alt="Custom Furniture Online India"
            title="Custom Furniture Banner"
          ></img>
          <Grid
            sx={{
              display: { sm: "flex" },
              justifyContent: { xs: "center", md: "left" },
            }}
          >
            <Grid sx={{ flexDirection: "column" }}>
              <Grid sx={{ mb: 2, mr: { sm: 2, lg: 2.3 } }}>
                <img
                  src={
                    "/static/images/1685539892816jonas_6_seater_dining_set_with_cushion01_720.jpg"
                  }
                  className="responsive-3 img-none-customize-22"
                  alt="Custom Furniture Online India"
                  title="Dining Furniture"
                ></img>
              </Grid>
              <Grid sx={{ mb: 2, mr: { sm: 2, lg: 2.3 } }}>
                <img
                  src={
                    "/static/images/1684998103248amelia_sheesham_wood_bed_with_storage_brown_finish02_720.jpg"
                  }
                  className="responsive-3 img-none-customize-22"
                  alt="Custom Furniture Online India"
                  title="Bedroom Furniture"
                ></img>
              </Grid>
            </Grid>
            <Grid sx={{ mb: 2, mr: { sm: 2, lg: 3.3 } }}>
              <img
                src={
                  "/static/images/1685002873671elinor_sheesham_wood_bed_without_storage__honey_finish__720.jpg"
                }
                className="responsive-3 img-none-customize-22"
                alt="Custom Furniture Online India"
                title="Bedroom Furniture"
              ></img>
            </Grid>
            <Grid sx={{ flexDirection: "column" }}>
              <Grid sx={{ mb: 2 }}>
                <img
                  src={
                    "/static/images/1685347426447maisha_solid_sheesham_wood_sofa_set02_720.jpg"
                  }
                  className="responsive-3 img-none-customize-22"
                  alt="Custom Furniture Online India"
                  title="Wooden Sofa Set"
                ></img>
              </Grid>
              <Grid sx={{ display: { sm: "flex" } }}>
                <Grid sx={{ mb: 2, mr: { sm: 2, lg: 6 } }}>
                  <img
                    src={
                      "/static/images/1685431268962moviya_sheesham_wood_tv_cabinets02_720.jpg"
                    }
                    className="responsive-5 img-none-customize-22"
                    alt="Custom Furniture Online India"
                    title="Livingroom Furniture"
                  ></img>
                </Grid>
                <Grid sx={{ mb: 2, mr: { sm: 2.5 } }}>
                  <img
                    src={
                      "/static/images/1685444406197max_sheesham_wood_cabinet_and_sideboard__honey_finish__720.jpg"
                    }
                    className="responsive-5 img-none-customize-22"
                    alt="Custom Furniture Online India"
                    title="Cabinets and Sideboards "
                  ></img>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            sx={{
              display: { sm: "flex" },
              mt: { lg: -5.6 },
              justifyContent: { xs: "center", md: "left" },
            }}
          >
            <Grid sx={{ mb: 2.3, mr: { sm: 2, lg: 5.4 } }}>
              <img
                src={
                  "/static/images/1685441534578stela_solid_wood_book_shelf01_720.jpg"
                }
                className="responsive-4 img-none-customize-22"
                alt="Custom Furniture Online India"
                title="BookSelves"
              ></img>
            </Grid>
            <Grid sx={{ mb: 2.3, mr: { sm: 2, lg: 3.4 } }}>
              <img
                src={
                  "/static/images/1685603936749parker_sheesham_wood_study_table01_720.jpg"
                }
                className="responsive-4 img-none-customize-22"
                alt="Custom Furniture Online India"
                title="Study Tables"
              ></img>
            </Grid>
            <Grid sx={{ mb: 2.3, mr: { sm: 2 } }}>
              <img
                src={
                  "/static/images/1685345457249mario_l_shaped_solid_sheesham_wood_sofa_set02_720.jpg"
                }
                className="responsive-4 img-none-customize-22"
                alt="Custom Furniture Online India"
                title="Wooden Sofa Set"
              ></img>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          sx={{
            textAlign: "center",
            background: "#f5f5f5",
            mt: 4,
            justifyContent: "center",
          }}
        >
          <Grid sx={{ justifyContent: "center" }} className="flex-customize">
            <Typography
              className="top0pp-e"
              sx={{
                fontSize: { xs: 13, sm: 15, ms: 22, lg: 25 },
                mt: 5,
                fontWeight: "600",
                fontFamily: "Jost",
                mr: 1,
              }}
            >
              WE CUSTOMIZE TILL YOU FINALIZE
            </Typography>
            <Typography
              className="top0pp"
              sx={{
                fontSize: { xs: 20, sm: 23, ms: 32, lg: 35 },
                alignItems: "center",
                fontWeight: "600",
                color: "#f15a21",
                fontFamily: "Jost",
                mb: 3,
              }}
            >
              “Picture Perfect Furniture“
            </Typography>
          </Grid>
          <Typography
            sx={{
              fontSize: { xs: 13, sm: 14, md: 15 },
              fontWeight: "500",
              fontFamily: "Jost",
              color: "#767676",
              mb: 5,
              lineHeight: 2,
              ml: { xs: "none", sm: 10, md: 25 },
              mr: { xs: "none", sm: 10, md: 25 },
            }}
          >
            Our in-house master craftsmen and design experts work together to
            bring your dream furniture the you have expected, using a selection
            of the finest designs, fabrics, upholstery and finishes.
            Specializing in design, we ensure that your piece stands out from
            others in any way you want it to while clearly representing your
            personality and lifestyle.
          </Typography>

          <img
            src={"/static/images/cards.png"}
            style={{ marginBottom: 30 }}
            className="responsive"
            alt="Perfect Frniture Banner"
            title="Perfect Frniture"
          ></img>
          <Button
            onClick={handleOpen}
            sx={{
              background: "#f15a21",
              color: "#fff",

              "&:hover": {
                background: "#f15a21",
                color: "#fff",
              },
              mb: 5,
              fontWeight: "500",
              fontFamily: "Jost",
              fontSize: { xs: 14, md: 16 },
              height: 40,
            }}
          >
            START - CUSTOMIZE NOW
          </Button>
        </Grid>
        <Grid
          sx={{
            display: { sm: "flex" },
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: 20, sm: 21, ms: 22, lg: 25 },
              mt: 5,
              fontWeight: "600",
              fontFamily: "Jost",
              mr: 1,
            }}
          >
            WE CUSTOMIZE TILL YOU FINALIZE
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 30, sm: 31, ms: 32, lg: 35 },

              fontWeight: "600",
              color: "#f15a21",
              fontFamily: "Jost",
              mb: 3,
              mt: { sm: 4 },
            }}
          >
            “Furniture“
          </Typography>
        </Grid>
        <img
          src={"/static/images/gh-2.png"}
          width={"100%"}
          className="img-none-customize"
          alt="Ready made furniture "
          title="Ready made furniture"
        ></img>
        <Grid
          sx={{
            display: { sm: "flex" },
            justifyContent: { xs: "center", md: "left" },
          }}
        >
          <Grid sx={{ mb: 2.3, mr: { sm: 4, lg: 7 } }}>
            <img
              src={"/static/images/services1.jpg"}
              className="responsive-6 img-none-customize-22"
            ></img>
          </Grid>

          <Grid sx={{ flexDirection: "column" }}>
            <Grid sx={{ mb: 2, mr: { sm: 2 } }}>
              <img
                src={"/static/images/services2.jpg"}
                className="responsive-6 img-none-customize-22"
              ></img>
            </Grid>
            <Grid sx={{ display: { sm: "flex" } }}>
              <Grid sx={{ mb: 2.3, mr: { sm: 4.5, lg: 7.5 } }}>
                <img
                  src={"/static/images/services3.jpg"}
                  className="responsive-7 img-none-customize-22"
                ></img>
              </Grid>
              <Grid sx={{ mb: 2.3, mr: { sm: 2.5 } }}>
                <img
                  src={"/static/images/services4.jpg"}
                  className="responsive-7 img-none-customize-22"
                ></img>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid sx={{ textAlign: { xs: "center", sm: "left" } }}>
          <Typography
            sx={{
              fontSize: { xs: 20, sm: 21, ms: 22, lg: 25 },
              mt: 5,
              fontWeight: "500",
              fontFamily: "Jost",
              mr: 1,
            }}
          >
            BUY CUSTOM MADE FURNITURE ONLINE AND GIVE YOUR HOME A MAKEOVER
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 18, sm: 19, ms: 20, lg: 21 },
              mt: 1,
              color: "#f15a21",
              fontWeight: "600",
              fontFamily: "Jost",
              mr: 1,
            }}
          >
            Custom furniture online to suit your preferences
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 13, sm: 14, md: 15 },
              mt: { xs: 3, sm: 4, md: 5 },
              color: "#767676",
              fontWeight: "400",
              fontFamily: "Jost",
              lineHeight: 2,
            }}
          >
            You might want to consider having your own custom made before trying
            out all the "cookie cutter" furniture. There are several good
            reasons to buy custom-made furniture you will find. One of
            that—Hand-made furniture is always better. The craftsmen who build
            the furniture spend more time putting it together and they also use
            materials of better quality. You imagine, you design your own
            product when it comes down to customization. The build time is more
            but you’ll spend more time visiting furniture stores to find the
            “right” item.
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 13, sm: 14, md: 15 },
              mt: 3,
              color: "#767676",
              fontWeight: "400",
              fontFamily: "Jost",
              lineHeight: 2,
              mb: 10,
            }}
          >
            In the end, your furniture will display uniqueness, creativeness in
            a very different style. Custom made furniture should always and
            always be your top priority because we deliver what you desire at
            your door.
          </Typography>
        </Grid>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: { xs: "80%", lg: "60%" } }}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <CustomFurnitureForm />
        </Box>
      </Modal>
    </>
  );
};

export default CustomerFurniture;
