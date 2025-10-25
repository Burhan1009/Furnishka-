import { phoneNum } from "@/common/validations/constants";
import { useGetStoreAvailable } from "@/service/home";
import Link from "next/link";

const icons = {
  img7: "/static/images/Logo-4-1.png",
};

function Footer() {
  const { data } = useGetStoreAvailable();
  const storeAddress = data?.data ?? [];

  return (
    <>
      <footer style={{ overflow: "hidden" }} className="container2">
        <div className="footer-1">
          <div className="">
            <div className="row">
              <div className="col-md-4">
                <div className="footer-1-1">
                  <a href="/">
                    <img src={icons["img7"]} alt="Jodhpuri Furniture Logo" />
                  </a>
                  <p className="jost font-1678 fw-400 color-767676 footertext">
                    Buy all solid sheesham wood furniture online in Bangalore at
                    best price only on Jodhpuri furniture store.
                  </p>
                  <div>
                    <a
                      href="mailto:info@jodhpurifurniture.com"
                      className="jost font-1678 fw-500 color-767676"
                    >
                      {" "}
                      info@Furnishka.com
                    </a>{" "}
                  </div>
                  <a
                    href={`tel:${phoneNum}`}
                    className="jost font-1678 fw-500 color-767676"
                  >
                    {" "}
                    {phoneNum}
                  </a>

                  <div className="social-media">
                    <a
                      href="https://www.facebook.com/jodhpurifurniture/"
                      target="_blank"
                      className="link-hover"
                    >
                      <i className="fa-brands fa-square-facebook"></i>
                    </a>
                    <a
                      href="https://www.instagram.com/jodhpuri.furniture/?hl=en"
                      target="_blank"
                    >
                      <i className="fa-brands fa-square-instagram"></i>
                    </a>
                    <a
                      href="https://in.pinterest.com/riyajodhpurifurniture/"
                      target="_blank"
                    >
                      <i className="fa-brands fa-pinterest"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="sm-none col-6 col-sm-4 col-md-2">
                <div className="footer1-2">
                  <p className="font-202 fw-600 jost color-22222 footertext2">
                    Top Categories
                  </p>
                  <ul style={{ marginTop: -16 }} className="p-0">
                    <li>
                      <Link href="/sofa">Sofas </Link>
                    </li>
                    <li>
                      <Link href="/living">Living</Link>
                    </li>
                    <li>
                      <Link href="/bedroom">Bedroom</Link>
                    </li>
                    <li>
                      <Link href="/dining">Dining & Kitchen</Link>
                    </li>
                    <li>
                      <Link href="/storage">Storage</Link>
                    </li>
                    <li>
                      <Link href="/study">Study</Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-6 col-sm-4 col-md-3">
                <div className="footer1-3">
                  <p className="font-202 fw-600 jost color-22222 footertext14">
                    Customer Services
                  </p>
                  <ul className="p-0">
                    <li>
                      <Link href="/security-privacy">Security & Privacy</Link>
                    </li>
                    <li>
                      <Link href="/return-refund">Return & Refund</Link>{" "}
                    </li>
                    <li>
                      {" "}
                      <Link href="/payment-policy">Payment Policy</Link>{" "}
                    </li>
                    <li>
                      <Link href="/track-order">Track Order</Link>{" "}
                    </li>
                    <li>
                      <Link href="/customer-stories">Customer Stories</Link>{" "}
                    </li>
                    <li>
                      <Link href="/grievanve-contact">Grievance Contact</Link>{" "}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-6 col-sm-4 col-md-3">
                <div className="footer1-4">
                  <p className="font-202 fw-600 jost color-22222 footertext3">
                    Our Company
                  </p>
                  <ul className="p-0">
                    <li>
                      <Link href="/about">About Us </Link>{" "}
                    </li>

                    <li>
                      <Link href="/custom-furniture">Custom Furniture</Link>{" "}
                    </li>
                    <li>
                      <Link href="/coupon-partner">Coupon Partners</Link>{" "}
                    </li>

                    <li>
                      <Link href="/terms-of-use">Terms Of Use</Link>{" "}
                    </li>
                    <li>
                      <Link href="/contact-us">Contact Us</Link>{" "}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border2" style={{ marginTop: 40 }}></div>

            <div className="loctaion row  flex-wrap ">
              {storeAddress?.length > 0 &&
                storeAddress?.map((item: any) => (
                  <div className="container2 col-md-4">
                    <div className="location-box  d-flex  icon">
                      <img style={{ marginLeft: 10 }} />

                      <a href={item.store_map} target="_blank">
                        <p
                          className="jost color-767676 font-1600 mb-0 "
                          style={{ marginTop: -4 }}
                        >
                          {item.store_address}
                        </p>
                      </a>
                    </div>
                  </div>
                ))}
            </div>

            <div className="border234"></div>
          </div>
        </div>
      </footer>
    </>
  );
}
export default Footer;
