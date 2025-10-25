const icons = {
  img1: "/static/images/shipping.svg",
  img2: "/static/images/product.svg",
  img3: "/static/images/help.svg",
  img4: "/static/images/warrenty_icon.svg",
  img5: "/static/images/lowest prise.svg",
};

const qualityData = [
  {
    imageSrc: "/static/icon/NewFrame.svg",
    title: "Free Shipping",
    subTitle: "Apply for all orders over ₹10,000",
    id: 1,
  },
  {
    imageSrc: "/static//icon/PReturns.svg",
    title: "Product Returns",
    subTitle: "You have 30 days to Return",
    id: 2,
  },
  {
    imageSrc: "/static/icon/ReliableSupport.svg",
    title: "Support 24/7",
    subTitle: "Contact us 24 houres a day",
    id: 3,
  },
  {
    imageSrc: "/static/icon/SecuredPayment.svg",
    title: "Secured Payment",
    subTitle: "All your payment information is safe",
    id: 4,
  },
  // {
  //   imageSrc: "/static/icon/Group 376.svg",
  //   title: "Best Prices",
  //   subTitle: "We provide the best prices, guaranteed every time.",
  //   id: 5,
  // },
];

function Quality() {
  const bg = {
    backgroundColor: "#fdf5f1",
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
    marginBottom: "15px",
  };
  return (
    <>
      <section className="section-11 sm-none container-fluid">
        <div className="container">
          <div className="for-display ">
            {qualityData.map((item) => (
              <div
                className="sec11-box d-flex flex-column widht-coulmn"
                key={item.id}
                // style={{ width: "20%" }}
              >
                <div className="me-lg-32 " style={bg}>
                  <img src={item.imageSrc} alt="img" />
                </div>
                <div
                  className="sec11-box-content text-center "
                  style={{ marginRight: "0px", padding: "0px 15px" }}
                >
                  <p className="jost font-188 fw-500 color-22222 qu-text ">
                    {item.title}
                  </p>
                  <p
                    className="jost fw-normal font-155 color-767676 "
                    style={{ lineHeight: 1.2 }}
                  >
                    {item.subTitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
export default Quality;
