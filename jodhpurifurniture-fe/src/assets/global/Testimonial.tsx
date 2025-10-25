import Links from "@/Link";
import Slider from "react-slick";

const icons = [
  {
    img: (
      <Links
        href={
          "https://www.aninews.in/news/business/business/jodhpuri-furniture-redefining-online-furniture-shopping-with-exquisite-craftsmanship20230629175302/"
        }
        as={
          "https://www.aninews.in/news/business/business/jodhpuri-furniture-redefining-online-furniture-shopping-with-exquisite-craftsmanship20230629175302/"
        }
      >
        <img
          src={"/static/images/Frame 228.jpg"}
          className="ip-sum-img"
          alt="ANI Logo" title="ANI"
        />
      </Links>
    ),
  },
  {
    img: (
      <Links
        href={
          "https://www.zee5.com/articles/jodhpuri-furniture-redefining-online-furniture-shopping-with-exquisite-craftsmanship"
        }
        as={
          "https://www.zee5.com/articles/jodhpuri-furniture-redefining-online-furniture-shopping-with-exquisite-craftsmanship"
        }
      >
        <img
          src={"/static/images/Frame 233.jpg"}
          className="ip-sum-img"
          title="ZEE 5" alt="ZEE 5 Logo"
        />
      </Links>
    ),
  },
  {
    img: (
      <Links
        href={
          "https://m.dailyhunt.in/news/india/english/ani+english-epaper-anieng/jodhpuri+furniture+redefining+online+furniture+shopping+with+exquisite+craftsmanship-newsid-n513919208?sm=Y"
        }
        as={
          "https://m.dailyhunt.in/news/india/english/ani+english-epaper-anieng/jodhpuri+furniture+redefining+online+furniture+shopping+with+exquisite+craftsmanship-newsid-n513919208?sm=Y"
        }
      >
        <img
          src={"/static/images/Frame 244.jpg"}
          className="ip-sum-img"
          alt="Daily Hunt Logo" title="Daily Hunt"
        />
      </Links>
    ),
  },
  {
    img: (
      <Links
        href={
          "https://www.lokmattimes.com/business/jodhpuri-furniture-redefining-online-furniture-shopping-with-exquisite-craftsmanship/"
        }
        as={
          "https://www.lokmattimes.com/business/jodhpuri-furniture-redefining-online-furniture-shopping-with-exquisite-craftsmanship/"
        }
      >
        <img
          src={"/static/images/Frame 232.jpg"}
          className="ip-sum-img"
          alt="Lokmat Times Logo" title="Lokmat Times"
        />
      </Links>
    ),
  },
  {
    img: (
      <Links
        href={
          "https://news.google.com/search?q=Jodhpuri%20Furniture&hl=en-IN&gl=IN&ceid=IN%3Aen"
        }
        as={
          "https://news.google.com/search?q=Jodhpuri%20Furniture&hl=en-IN&gl=IN&ceid=IN%3Aen"
        }
      >
        <img
          src={"/static/images/Frame 242.jpg"}
          className="ip-sum-img"
          alt="Google News Logo" title="Google News "
        />
      </Links>
    ),
  },
  {
    img: (
      <Links
        href={
          "https://www.ahmedabadmirror.com/jodhpuri-furniture-redefining-online-furniture-shopping-with-exquisite-craftsmanship/81859211.html"
        }
        as={
          "https://www.ahmedabadmirror.com/jodhpuri-furniture-redefining-online-furniture-shopping-with-exquisite-craftsmanship/81859211.html"
        }
      >
        <img
          src={"/static/images/Frame 230.jpg"}
          className="ip-sum-img"
          alt="Ahmedabad Mirror Logo" title="Ahmedabad Mirror"
        />
      </Links>
    ),
  },
  {
    img: (
      <Links
        href={
          "https://thestartupstory.co.in/index.php/2023/06/30/jodhpuri-furniture-redefining-online-furniture-shopping-with-exquisite-craftsmanship/"
        }
        as={
          "https://thestartupstory.co.in/index.php/2023/06/30/jodhpuri-furniture-redefining-online-furniture-shopping-with-exquisite-craftsmanship/"
        }
      >
        <img
          src={"/static/images/startup_story.jpg"}
          className="ip-sum-img"
          alt="The Startup Story Logo" title="The Startup Story"
        />
      </Links>
    ),
  },
  {
    img: (
      <Links
        href={
          "https://jionews.com/home/article/5/662043126/Jodhpuri-Furniture-redefining-online-furniture-shopping-with-exquisite-craftsmanship"
        }
        as={
          "https://jionews.com/home/article/5/662043126/Jodhpuri-Furniture-redefining-online-furniture-shopping-with-exquisite-craftsmanship"
        }
      >
        <img
          src={"/static/images/Frame 236.jpg"}
          className="ip-sum-img"
          alt="Jio News Logo" title="Jio News"
        />
      </Links>
    ),
  },
  {
    img: (
      <Links
        href={
          "https://theprint.in/ani-press-releases/jodhpuri-furniture-redefining-online-furniture-shopping-with-exquisite-craftsmanship/1647951/"
        }
        as={
          "https://theprint.in/ani-press-releases/jodhpuri-furniture-redefining-online-furniture-shopping-with-exquisite-craftsmanship/1647951/"
        }
      >
        <img
          src={"/static/images/Frame 231.jpg"}
          className="ip-sum-img"
          alt="The Print Logo" title="The Print"
        />
      </Links>
    ),
  },
  {
    img: (
      <Links
        href={
          "https://www.firstindia.co.in/news/press-releases/jodhpuri-furniture-redefining-online-furniture-shopping-with-exquisite-craftsmanship"
        }
        as={
          "https://www.firstindia.co.in/news/press-releases/jodhpuri-furniture-redefining-online-furniture-shopping-with-exquisite-craftsmanship"
        }
      >
        <img
          src={"/static/images/Frame 234.jpg"}
          className="ip-sum-img"
          alt="First India Logo" title="First India"
        />
      </Links>
    ),
  },
  {
    img: (
      <Links
        href={
          "https://www.latestly.com/agency-news/business-news-jodhpuri-furniture-redefining-online-furniture-shopping-with-exquisite-craftsmanship-5233955.html"
        }
        as={
          "https://www.latestly.com/agency-news/business-news-jodhpuri-furniture-redefining-online-furniture-shopping-with-exquisite-craftsmanship-5233955.html"
        }
      >
        <img
          src={"/static/images/Frame 235.jpg"}
          className="ip-sum-img"
          alt="Latest LY Logo" title="Latest LY"
        />
      </Links>
    ),
  },
  {
    img: (
      <Links
        href={
          "https://english.loktej.com/article/3327/jodhpuri-furniture-redefining-online-furniture-shopping-with-exquisite-craftsmanship"
        }
        as={
          "https://english.loktej.com/article/3327/jodhpuri-furniture-redefining-online-furniture-shopping-with-exquisite-craftsmanship"
        }
      >
        <img
          src={"/static/images/Frame 237.jpg"}
          className="ip-sum-img"
          alt="English Loktej Logo" title="English Loktej"
        />
      </Links>
    ),
  },
  {
    img: (
      <Links
        href={
          "https://www.rajasthankikhabar.com/news/jodhpuri-furniture-redefining-online-furniture-shopping-with-exquisite-craftsmanship20230629175300/"
        }
        as={
          "https://www.rajasthankikhabar.com/news/jodhpuri-furniture-redefining-online-furniture-shopping-with-exquisite-craftsmanship20230629175300/"
        }
      >
        <img
          src={"/static/images/rajsthan_khabr.jpg"}
          className="ip-sum-img"
          alt="Rajasthan ki khabar Logo" title="Rajasthan ki khabar"
        />
      </Links>
    ),
  },
  {
    img: (
      <Links
        href={
          "https://www.bignewsnetwork.com/news/273883152/jodhpuri-furniture-redefining-online-furniture-shopping-with-exquisite-craftsmanship"
        }
        as={
          "https://www.bignewsnetwork.com/news/273883152/jodhpuri-furniture-redefining-online-furniture-shopping-with-exquisite-craftsmanship"
        }
      >
        <img
          src={"/static/images/Frame 240.jpg"}
          className="ip-sum-img"
          alt="Big News Network Logo"
          title="Big News Network"
        />
      </Links>
    ),
  },
  {
    img: (
      <Links
        href={
          "https://up18news.com/jodhpuri-furniture-redefining-online-furniture-shopping-with-exquisite-craftsmanship/"
        }
        as={
          "https://up18news.com/jodhpuri-furniture-redefining-online-furniture-shopping-with-exquisite-craftsmanship/"
        }
      >
        <img
          src={"/static/images/Frame 241.jpg"}
          className="ip-sum-img"
          alt="Up 18 News Logo" title="Up 18 News"
        />
      </Links>
    ),
  },
  {
    img: (
      <Links
        href={
          "https://indianbusinessline.com/index.php/2023/06/30/jodhpuri-furniture-redefining-online-furniture-shopping-with-exquisite-craftsmanship/"
        }
        as={
          "https://indianbusinessline.com/index.php/2023/06/30/jodhpuri-furniture-redefining-online-furniture-shopping-with-exquisite-craftsmanship/"
        }
      >
        <img
          src={"/static/images/bussinessLine_logo.jpg"}
          className="ip-sum-img"
          alt="Indian Businessline Logo" title="Indian Businessline"
        />
      </Links>
    ),
  },
  {
    img: (
      <Links
        href={
          "https://www.sangritoday.com/spotlight/jodhpuri-furniture-redefining-online-furniture-shopping-with-exquisite-craftsmanship"
        }
        as={
          "https://www.sangritoday.com/spotlight/jodhpuri-furniture-redefining-online-furniture-shopping-with-exquisite-craftsmanship"
        }
      >
        <img
          src={"/static/images/Frame 245.jpg"}
          className="ip-sum-img"
          title="Sangri Today" alt="Sangri Today Logo"
        />
      </Links>
    ),
  },
  {
    img: (
      <Links
        href={
          "https://asiannews.in/jodhpuri-furniture-redefining-online-furniture-shopping-with-exquisite-craftsmanship/"
        }
        as={
          "https://asiannews.in/jodhpuri-furniture-redefining-online-furniture-shopping-with-exquisite-craftsmanship/"
        }
      >
        <img
          src={"/static/images/Frame 246.jpg"}
          className="ip-sum-img"
          title="Asian News" alt="Asian News Logo"
        />
      </Links>
    ),
  },
  {
    img: (
      <Links
        href={
          "https://theblunttimes.in/jodhpuri-furniture-redefines-online-furniture-purchasing-with-superb-workmanship/33683/"
        }
        as={
          "https://theblunttimes.in/jodhpuri-furniture-redefines-online-furniture-purchasing-with-superb-workmanship/33683/"
        }
      >
        <img
          src={"/static/images/Frame 247.jpg"}
          className="ip-sum-img"
          title="The Blunt Times" alt="The Blunt Times Logo"
        />
      </Links>
    ),
  },
];

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
        placeItems: "center",
        top: 25,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <i className="fa-solid fa-angle-left text-center font-16 ms-2"></i>
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
        placeItems: "center",
        top: 25,
        right: 0,
      }}
      onClick={onClick}
    >
      <i className="fa-solid fa-angle-right text-center font-16 ms-2"></i>
    </div>
  );
}
function Testimonial() {
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 6,
    slidesToScroll: 3,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
        },
      },

      {
        breakpoint: 811,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
        },
      },

      {
        breakpoint: 670,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 430,
        settings: {
          slidesToShow: 2.2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  return (
    <>
      <section className="section-14 ">
        <div className="container">
          <div className="row">
            <Slider {...settings}>
              {icons?.length >= 0 &&
                icons?.map((key: any) => (
                  <div className=" d-flex ">{key.img}</div>
                ))}
            </Slider>
          </div>
        </div>
      </section>
    </>
  );
}
export default Testimonial;
