import React from "react";

const icons = {
  img1: "/static/images/5aboutus.jpg",
  img2: "/static/images/Vector (4) aboutus.svg",
  img3: "/static/images/Icon (1)aboutIcon.svg",
  img4: "/static/images/icon (1)aboutus.svg",
  img5: "/static/images/icon (2)aboutus.svg",
  img6: "/static/images/icon (3)aboutus.svg",
};

function OneShopStop() {
  return (
    <>
      <section className=" about-us-4">
        <div style={{ overflow: "hidden" }} className="container2">
          <label
            className="jost font-32897 color-2 fw-500 text-center m-lg-auto"
            style={{ display: "flex", alignItems: "center" }}
          >
            Jodhpurifurniture.com is a one stop shop for all your furniture and
            household needs.
          </label>
          <p className="jost font-16907 color-2 text-center m-lg-auto">
            Jodhpuri Handicrafts is an exporter from Jodhpur (India) which is
            the hub for handicraft and furniture industry and mainly deals in
            Sheesham and Mango wood furniture items. Our dedicated team of
            skilled craftsmen use the latest technology to provide a complete
            range of innovative bedroom, dining rooms, living rooms, kitchen and
            storage furniture to provide clients all over the world with finest
            quality furniture. Jodhpuri Handicrafts has its own unique
            reputation in the world of wooden, industrial and reclaimed
            furniture and handicraft items. We operate in the industry with the
            mission of providing uncompromising quality products.
          </p>
        </div>
      </section>
      <section className="about-us-5">
        <div className="container2">
          <div className="row " style={{ alignItems: "center" }}>
            <div className="col-md-6">
              <label className="font-2 font-24765 jost fw-500 .color-22222">
                Our cutting edge E-commerce platform, highly experienced buying
                team, agile warehouse systems and customer care center provides
                customer with:
              </label>
              <ul style={{ marginBottom: 0, paddingLeft: 0 }}>
                <li
                  className="list-unstyled font-20657 color-2 fw-500 jost"
                  style={{}}
                >
                  <img src={icons["img2"]} style={{ marginRight: 5 }} /> Broader
                  selection of products
                </li>
                <li className="list-unstyled font-20657 color-2 fw-500 jost">
                  <img src={icons["img2"]} style={{ marginRight: 5 }} />{" "}
                  Superior buying experience
                </li>
                <li className="list-unstyled font-20657 color-2 fw-500 jost">
                  <img src={icons["img2"]} style={{ marginRight: 5 }} /> On-time
                  delivery of products
                </li>
                <li className="list-unstyled font-20657 color-2 fw-500 jost">
                  <img src={icons["img2"]} style={{ marginRight: 5 }} /> Quick
                  resolution of any concerns
                </li>
              </ul>
            </div>
            <div className="col-md-6">
              <img
                src={icons["img1"]}
                alt="The interior of a wooden furniture store with wooden tables and chairs"
                className="pt-3 responsive"
                title="Wooden Furniture Store"
              />
            </div>
          </div>
          <div
            style={{
              justifyContent: "space-between",
              marginTop: 60,
              flexWrap: "wrap",
            }}
            className="aboutus-none"
          >
            <div
              className="fontsize-aboutus-button"
              style={{
                color: "#222222",
                border: "1px solid #EBEBEB",

                borderRadius: 8,

                fontFamily: "Jost",
                alignItems: "center",
                fontWeight: "500",
                display: "flex",

                padding: 10,
              }}
            >
              <img
                src={icons["img3"]}
                style={{ marginRight: 19 }}
                className="icon-size-aboutus"
              />{" "}
              Highest Quality
            </div>
            <div
              className="fontsize-aboutus-button"
              style={{
                color: "#222222",
                border: "1px solid #EBEBEB",

                borderRadius: 8,

                fontFamily: "Jost",
                alignItems: "center",
                fontWeight: "500",
                display: "flex",
                // justifyContent: "flex-end",
                padding: 10,
              }}
            >
              <img
                src={icons["img4"]}
                style={{ marginRight: 19 }}
                className="icon-size-aboutus"
              />{" "}
              Expansive Selection
            </div>
            <div
              className="fontsize-aboutus-button"
              style={{
                color: "#222222",
                border: "1px solid #EBEBEB",

                borderRadius: 8,

                fontFamily: "Jost",
                alignItems: "center",
                fontWeight: "500",
                display: "flex",
                // justifyContent: "flex-end",
                padding: 10,
              }}
            >
              <img
                src={icons["img5"]}
                style={{ marginRight: 19 }}
                className="icon-size-aboutus"
              />{" "}
              Affordable Prices
            </div>
            <div
              className="fontsize-aboutus-button"
              style={{
                color: "#222222",
                border: "1px solid #EBEBEB",

                borderRadius: 8,

                fontFamily: "Jost",
                alignItems: "center",
                fontWeight: "500",
                display: "flex",
                // justifyContent: "flex-end",
                padding: 10,
              }}
            >
              <img
                src={icons["img6"]}
                style={{ marginRight: 19 }}
                className="icon-size-aboutus"
              />{" "}
              Fast Delivery
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default OneShopStop;
