import { Typography } from "@mui/material";
const icons = {
  img1: "/static/images/quote.svg",
  img2: "/static/images/3about.jpg",
  img3: "/static/images/aboutus3.png",
};

function About_2() {
  return (
    <>
      <section className="about-us-2">
        <div style={{ overflow: "hidden" }} className="container2">
          <div className="row">
            <div className="col-sm-7">
              <div>
                {" "}
                <img
                  src={icons["img2"]}
                  alt="The interior of a dining furniture store with wooden tables and chairs"
                  title="Dining Furniture Store"
                  width={"100%"}
                  style={{ marginBottom: 20 }}
                />
              </div>
            </div>
            <div className="col-sm-5">
              {/* <div className='about-us-2-box2'> */}
              <div className="container-xyz-img">
                <img src={icons["img3"]} alt="" width={"100%"} />

                <div className="centered-xyz-img">
                  <img
                    src={icons["img1"]}
                    alt=""
                    style={{ marginBottom: 20 }}
                    className="size-im"
                  />
                  <Typography
                    className="font-3289752"
                    sx={{ fontFamily: "Jost", fontWeight: 500 }}
                  >
                    To be Earth’s most customer centric company; to build a
                    place where people can discover virtually all types of
                    furniture.
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default About_2;
