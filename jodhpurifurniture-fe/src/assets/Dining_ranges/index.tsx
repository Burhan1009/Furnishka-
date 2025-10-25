
import Link from "next/link";
import Slider from "react-slick";
import { useGetAllCategory } from "@/service/home";
import { Skeleton, Typography } from "@mui/material";
import SeoHeader from "@/components/SeoHeader";

const Dining_ranges = () => {
  const { data: finalgetCetegory, isLoading } = useGetAllCategory();
  const getCetegory = finalgetCetegory?.data ?? [];
  console.log({ getCetegory, isLoading });
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    arrows: false,
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
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 400,
        settings: {
          arrows: false,
          slidesToShow: 2,
          rows: 1,
          slidesToScroll: 2,
        },
      },
    ],
  };
  const skeletonArray = new Array(6).fill(null);

  const SkeletonBlock = () => (
    <>
      <Skeleton
        variant="rectangular"
        width={"100%"}
        height={0}
        style={{ paddingTop: "70%", borderRadius: 4 }}
      />
      <Skeleton />
    </>
  );
  return (
    <>
    <head>
        <SeoHeader
          title={getCetegory[3]?.meta_title}
          description={getCetegory[3]?.meta_description}
        />
      </head>
      <section className="sec  section-2  row-remove">
        <div className="container2">
          <label className="top-xy range-other">Dining Furniture </label>
          <p>Visit our shop to see amazing creations from our designers.</p>
          <div className="row  boxes-padding margin-bottom-xy ">
            {isLoading ? (
              <>
                <Slider {...settings}>
                  {skeletonArray.map((_, index) => (
                    <div className="col-lg-4">
                      <SkeletonBlock key={index} />
                    </div>
                  ))}
                </Slider>
              </>
            ) : (
              ""
            )}
            <Slider {...settings}>
              {getCetegory &&
                getCetegory[3]?.child_categories &&
                getCetegory[3]?.child_categories.map((item) => {
                  return item.child_categories?.map((val) => {
                    return (
                      <div className="col-4 col-lg-2 boxes-padding h6 text-hover-image">
                        <Link
                          href={`/${getCetegory[3]?.slug_key}/${item.slug_key}/${val.slug_key}`}
                          as={`/${getCetegory[3]?.slug_key}/${item.slug_key}/${val.slug_key}`}
                        >
                          <div className="image-box ">
                            <img
                              src={val.image_url}
                              alt={val.image_alt_tag}
                              title={val.image_title}
                            />
                          </div>
                          <Typography className="widetext">
                            {val.category_name}
                          </Typography>
                        </Link>
                      </div>
                    );
                  });
                })}
            </Slider>
          </div>
          <div className="border3 " style={{ marginTop: 45 }}></div>
        </div>
      </section>
    </>
  );
};

export default Dining_ranges;
