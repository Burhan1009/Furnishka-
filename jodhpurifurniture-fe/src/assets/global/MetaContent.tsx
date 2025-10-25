import { useGetPageDescription } from "@/service/home";
import { Box, Skeleton } from "@mui/material";
import SofaMetaContent from "../MetaContents/SofaMetaContent";
function MetaContent({ paramKey, paramField }) {
  const payLoadData = paramKey ? { [paramField]: paramKey } : ""
  const { data, isLoading } = useGetPageDescription(payLoadData)
  const descriptionData = data?.data?.description

  const parseHTML = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const headings = ['h1', 'h2', 'h3', "p", "a"];
    headings.forEach((heading) => {
      const elements = doc.querySelectorAll(heading);
      elements.forEach((element) => {
        switch (heading) {
          case 'h1':
            element.className = "jost font-24 fw-600 color-22222"
            break;
          case 'h2':
            element.className = "jost font-20 fw-600 color-22222"
            break;
          case 'h3':
            element.className = "jost font-18 fw-600 color-22222"
            break;
          case 'p':
            element.className = "font-15 jost color-767676";
            break;
          case 'a':
            element.className = "font-15 jost";
            element.style.color = "#f15a21"
            element.style.fontWeight = 500
            break;

          default:
            break;
        }
      });
    });

    return doc.documentElement.innerHTML;
  };
  const updatedDescriptionData = parseHTML(descriptionData);
  return (
    <>
      {descriptionData && !isLoading &&
        <section className="section-11 container-fluid sm-none">
          <div className="container">

            <Box
              // sx={{ fontSize: 14 }}
              className="jost"

            >
              <span dangerouslySetInnerHTML={{ __html: updatedDescriptionData }}></span>
            </Box>
            <div className="border4"></div>
          </div>
        </section>
      }
      {isLoading &&
        <section className="section-11 container-fluid sm-none">
          <div className="container">
            <>
              {[1, 2, 3, 4]?.map((skl, index) => (
                <>
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    width={"40%"}
                    height={15}
                    style={{ borderRadius: 4, marginTop: 25 }}
                  />
                  <>
                    {[1, 2, 3, 4]?.map((val, i) => (
                      <Skeleton
                        key={i}
                        variant="rectangular"
                        width={"100%"}
                        height={8}
                        style={{ borderRadius: 4, marginTop: 7 }}
                      />
                    ))}
                  </>
                </>
              ))}
            </>
          </div>
        </section>
      }

      {/* <h2 className="jost font-20 fw-600 color-22222">
            Welcome to Jodhpuri Furniture - Elevate Your Living Space with
            Timeless Elegance
          </h2>
          <p className="font-15 jost color-767676">
            Discover a world of exquisite craftsmanship and timeless elegance
            with Jodhpuri Furniture. As a premier destination for fine
            furnishings, we bring you an extensive collection that seamlessly
            marries tradition with contemporary design. Explore our range,
            meticulously curated to transform your living spaces into
            expressions of your unique style and personality.
          </p>
          <p className="font-15 jost color-767676">
            Our Top Collection - Impressive Collection For Your Dream Home.
          </p>

          <h3 className="jost font-18 fw-600 color-22222">
            Unmatched Variety in Jodhpuri Furniture{" "}
          </h3>
          <p className="font-15 jost color-767676">
            Explore a diverse array of options in our collection. From classic
            to modern, we offer an extensive range of Jodhpuri furniture
            designs, each one crafted with precision and passion. Our commitment
            to quality and attention to detail is evident in every piece, making
            it not just furniture, but a testament to exceptional craftsmanship.
          </p>

          <h3 className="jost font-18 fw-600 color-22222">
            The Beauty of Sheesham Wood Furniture
          </h3>
          <p className="font-15 jost color-767676">
            Experience the rich allure of Sheesham wood, renowned for its
            durability and distinctive grain patterns. Our Sheesham wood
            furniture is not just a statement of luxury, but a promise of
            lasting beauty. Whether you're seeking elegant dining sets,
            luxurious sofas, or functional storage solutions, our Sheesham
            collection offers a touch of sophistication to any space.
          </p>

          <h3 className="jost font-18 fw-600 color-22222">
            Crafting Indian Sheesham Wood Furniture
          </h3>
          <p className="font-15 jost color-767676">
            We take pride in crafting Indian Sheesham wood furniture that
            resonates with heritage and finesse. Every item is a labor of love
            and a testament to Jodhpur's craftsmanship's long-standing
            traditions. You not only bring home a work of art from Jodhpuri
            Furniture, but also a piece of history..
          </p>

          <h3 className="jost font-18 fw-600 color-22222">
            Solid Wood Revolution
          </h3>
          <p className="font-15 jost color-767676">
            Solid Wood Creations for Timeless Interior Charm.
          </p>

          <h3 className="jost font-18 fw-600 color-22222">
            Bespoke Designs and Personalized Service
          </h3>
          <p className="font-15 jost color-767676">
            Your home is a reflection of your unique taste. We provide
            customisation services so you may create furniture that matches your
            vision. Select the ideal proportions, upholstery, and finish, then
            let us create the furniture of your dreams.
          </p>

          <h3 className="jost font-18 fw-600 color-22222">
            Experience Jodhpuri Furniture - Visit Our Showrooms Across India
          </h3>
          <p className="font-15 jost color-767676">
            Immerse yourself in the world of Jodhpuri Furniture by visiting our
            showrooms across India. Witness the artistry up close, feel the
            textures, and let our knowledgeable staff guide you to finding the
            perfect pieces for your home.
          </p>

          <h3 className="jost font-18 fw-600 color-22222">
            Best Online Furniture in India - solid sheesham
          </h3>
          <p className="font-15 jost color-767676">
            For those who prefer the ease of online shopping, our website
            provides a seamless and secure browsing and purchasing experience.
            From detailed product descriptions to high-resolution images,
            everything you need is at your fingertips.
          </p>

          <h3 className="jost font-18 fw-600 color-22222">
            Exceptional Customer Support
          </h3>
          <p className="font-15 jost color-767676">
            Your satisfaction is our priority. Our dedicated team is available
            to address your queries, provide guidance, and ensure that your
            experience with Jodhpuri Furniture is nothing short of exceptional.
          </p>

          <h3 className="jost font-18 fw-600 color-22222">
            Their Words, Our Pride
          </h3>
          <p className="font-15 jost color-767676">
            Happy Words of our Happy Customers Reviews with photos Manish
            Chouhan 8696 Best quality solid sheesham wood furniture. Thank you
            jodhpuri furniture Preeti Mathur We purchased some wood furniture
            from this shop. The quality of the sheesham wood furniture is great.
            Riya Garg This sheesham wood furniture bed is a must buy. And the
            quality of this dressing table is good too.
          </p> */}

    </>
  );
}
export default MetaContent;
