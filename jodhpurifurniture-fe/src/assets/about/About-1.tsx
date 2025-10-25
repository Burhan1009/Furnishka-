import { Typography } from "@mui/material";

const icons = {
  img1: "/static/images/2about.jpg",
};

function About_1() {
  return (
    <>
      <section className="about-us-1">
        <div style={{ overflow: "hidden" }} className="container2">
          <h1
            className="font-3628  fw-600 color-22222"
            style={{ fontFamily: "Jost" }}
          >
            About Us
          </h1>
          <label
            className="font-16907  fw-normal color-2"
            style={{ fontFamily: "Jost" }}
          >
            Create the bedroom of your dreams with the perfect bed
          </label>
          <div className="row">
            <div className="col-lg-6">
              <div className="about-content">
                <Typography
                  className="color-6 fw-normal font-16907 pp-23 mb-2"
                  style={{ fontFamily: "Jost" }}
                >
                  WELCOME TO OUR COMPANY
                </Typography>
                <label
                  className="font-32897 about-content2 fw-500 color-2"
                  style={{ fontFamily: "Jost" }}
                >
                  Jodhpurifurniture.com is a one stop shop for all your
                  furniture and household needs.
                </label>
                <Typography
                  className="fw-normal color-2 font-16907 "
                  style={{ fontFamily: "Jost" }}
                >
                  We aim at providing a hassle free and enjoyable shopping
                  experience to shoppers across the country. Founded by Aayush
                  Agarwal in 2015, Jodhpuri endeavors to build an online
                  furniture destination in India by giving customers more of
                  what they want – low prices, vast selection, fast and reliable
                  delivery and a trusted and convenient experience. We strive to
                  achieve the highest level of “Customer Satisfaction” possible.
                </Typography>
              </div>
            </div>
            <div className="col-lg-6 container2">
              <img
                src={icons["img1"]}
                alt="An indian furniture store with a lot of wooden furniture items"
                className="responsive"
                title="Wooden Furniture Store"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default About_1;
