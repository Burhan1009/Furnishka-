

function NewsLetter() {
  return (
    <>
      <section className="section-15  px-0">
        <div className="container2">
          <div className="row">
            <div className="col-md-6">
              <div className="sec15-box">
                <p className="jost fw-600 font-18 news-text">
                  Join our newsletter for 55% off
                </p>
                <p className="jost fw-700 color-22222 font-322 news-text1">
                  Get our emails for info on new items,
                  <br /> sales and more.
                </p>
                <p className="font-189 fw-500 jost color-767676 news-text2">
                  Stay up to date with the latest trends, exclusive offers, and
                  new product launches by subscribing to our newsletter.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="sec15-box2">
                <form action="">
                  <div className="floating-label ">
                    <input
                      className="floating-input "
                      type="text"
                      placeholder=" "
                    />
                    <span className="highlight"></span>

                    <label className="color-767676 font-16">
                      Enter your email address
                      {/* <i class="fa-light fa-arrow-right"></i> */}
                    </label>
                    {/* <i class="fa-solid fa-arrow-right-long"></i> */}
                    {/* <i class="fa-light fa-arrow-right position"></i> */}
                    {/* <div
                      style={{
                        display: "flex",
                        justifyContent: 'flex-end'
                      }}
                    >
                      <img src={"/static/images/arrow-left.svg"} />
                    </div> */}
                  </div>
                </form>
                <p
                  className="font-13 jost fw-500 color-767676 news-text3"
                  style={{ paddingTop: 5 }}
                >
                  By subscribing you agree to our{" "}
                  <b>Terms & Conditions and Privacy & Cookies Policy</b>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default NewsLetter;
