const icons = {
  img1: "/static/images/play-btn.svg",
  img2: "/static/images/icon1.svg",
  img3: "/static/images/icon1.svg",
  img4: "/static/images/icon1.svg",
};

function Achivements() {
  return (
    <>
      <section className="about-us-3">
        <div style={{ overflow: "hidden" }} className="container2">
          <div className="row">
            <div className="col-lg-5">
              <div className="about-us-3-box text ">
                <label className="font-32897 jost  color-2 fw-500 mb-2">
                  Jodhpuri Furniture Archivements
                </label>
                <p className="font-16907 jost color-2 fw-normal">
                  Jodhpuri endeavors to build an online furniture destination in
                  India by giving customers more of what they want – low prices,
                  vast selection, fast and reliable delivery and a trusted and
                  convenient experience.
                </p>
              </div>
            </div>

            <div className=" col-sm-4 col-md-4 col-lg-2">
              <div className="d-grid ">
                <div className="count-img ">
                  <img src={"/static/images/Group 366 (1).svg"} />
                </div>

                <label className="font-32897 fw-500 jost color-2 text-center">
                  15 K+
                </label>
                <label
                  className="font-16907 jost color-2 fw-normal text-center"
                  style={{ marginBottom: " 0.5rem" }}
                >
                  In Stock Products
                </label>
              </div>
            </div>
            <div className=" col-sm-4 col-md-4 col-lg-2">
              <div className="d-grid ">
                <div className="count-img">
                  <img src={"/static/images/Group 364 (1).svg"} />{" "}
                </div>
                <label className="font-32897 fw-500 jost color-2 text-center">
                  2 Lakh+
                </label>
                <label
                  className="font-16907 jost color-2 fw-normal text-center"
                  style={{ marginBottom: " 0.5rem" }}
                >
                  Satisfied Customers{" "}
                </label>
              </div>
            </div>
            <div className=" col-sm-4 col-md-4 col-lg-2">
              <div className="d-grid ">
                <div className="count-img">
                  <img src={"/static/images/Group 365.svg"} />
                </div>
                <label className="font-32897 fw-500 jost color-2 text-center">
                  30+
                </label>
                <label
                  className="font-16907 jost color-2 fw-normal text-center"
                  style={{ marginBottom: " 0.5rem" }}
                >
                  Delivery Centers
                </label>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <div className="video-about d-grid  ">
                <img
                  src={"/static/images/aboutusBedImage.png"}
                  className="responsive"
                  alt="A bedroom with a wooden bed and bedside tables"
                  title="Wooden King Size Bed"
                />
                <img
                  src={icons["img1"]}
                  alt=""
                  className="responsive3"
                  style={{ position: "absolute" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Achivements;
