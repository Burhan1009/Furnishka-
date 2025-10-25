import { useGetEssentialFurniture } from "@/service/home";
import Link from "next/link";
import Slider from "react-slick";
import { Suspense, lazy, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Skeleton } from "@mui/material";
const EssentialCard = lazy(() => import("@/components/EssentialCard"));

function SamplePrevArrow(props: {
  className?: any;
  style?: any;
  onClick?: any;
}) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        background: "white",
        height: 36,
        width: 27,
        opacity: 1,
        placeItems: "center",
        top: "40%",
        left: -9,
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={onClick}
    >
      <img src={"/static/images/arrow-pre.svg"} />
    </div>
  );
}
function SampleNextArrow(props: {
  className?: any;
  style?: any;
  onClick?: any;
}) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        background: "white",
        height: 36,
        width: 27,
        opacity: 1,
        placeItems: "center",
        top: "40%",
        right: 0,
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={onClick}
    >
      <img src={"/static/images/vectorR.svg"} />
    </div>
  );
}
const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="textessential">
      {isReadMore ? text.slice(0, 93) : text}
      <span onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? " Read More" : " Read Less"}
      </span>
    </p>
  );
};

function Essentials() {
  const { ref, inView } = useInView();
  const { data, isLoading } = useGetEssentialFurniture({ enabled: inView });
  const essentialFurniture = data?.data ?? [];

  const settings = {
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 901,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 2,
          arrows: false,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          infinite: false,
          speed: 0,
          autoplay: false,
          rows: 3,
          arrows: false,
        },
      },
    ],
  };
  const skeletonArray = new Array(3).fill(null);

  const SkeletonBlock = () => (
    <>
      <Skeleton
        variant="rectangular"
        width={"100%"}
        height={0}
        style={{ paddingTop: "100%", borderRadius: 4 }}
      />
      <Skeleton />
      <Skeleton width="60%" style={{ marginBottom: "15%" }} />
    </>
  );
  return (
    <>
      <section className="container-fluid section-3" ref={ref}>
        <div className="container">
          <>
            <h1>
              Furnishka: Your One-Stop Store For Wooden Furniture
              Online
            </h1>

            <ReadMore >
              Buy Furniture Online in India, made in Solid Sheesham Wood, craft
              fully Treated and Seasoned.
            </ReadMore>
          </>

          <div className="row">
            {isLoading ? (
              <>
                {skeletonArray.map((_, index) => (
                  <div className="col-lg-4">
                    <div className="bg-sec3">
                      <SkeletonBlock key={index} />
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <Slider {...settings} className="essential">
                {essentialFurniture?.length > 0 &&
                  essentialFurniture?.map((item: any) => (
                    <Suspense
                      fallback={
                        <>
                          <Skeleton
                            variant="rectangular"
                            width={"100%"}
                            height={0}
                            style={{ paddingTop: "100%", borderRadius: 4 }}
                          />
                          <Skeleton />
                          <Skeleton
                            width="60%"
                            style={{ marginBottom: "15%" }}
                          />
                        </>
                      }
                    >
                      <EssentialCard
                        children={
                          <div className="bg-sec3 ">
                            <Link
                              as={`${item.link}`}
                              href={`${item.link}`}
                            >
                              <img
                                src={item.shop_image}
                                alt={item.image_alt_tag}
                                title={item.image_title}
                              />
                            </Link>
                          </div>
                        }
                        title1={item?.title?.split(" ")[0]}
                        title={item.title}
                        starting_price={
                          item.starting_price
                            .toLocaleString("en-IN", {
                              style: "currency",
                              currency: "INR",
                            })
                            .split(".")[0]
                        }
                      />
                    </Suspense>
                  ))}
              </Slider>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
export default Essentials;
