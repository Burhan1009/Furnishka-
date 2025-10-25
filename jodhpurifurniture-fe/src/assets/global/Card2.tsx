import { CardMedia } from "@mui/material";


const Card2 = (props: {
  imglink?: any;
  productName?: any;
  startingPrice?: any;
  style?: any;
  handleSlug?: any;
  productName1?: any;
  alt?: string;
  title?:string;
}) => {
  const {
    imglink,
    productName,
    alt,
    startingPrice,
    title,
    handleSlug,
  } = props;
  return (
    <>
      <div>
        <div
          style={{ cursor: "pointer" }}
          onClick={handleSlug}
          className="card2"
        >
          
          <div className="image-box">
            <CardMedia
              component="img"
              style={{ borderRadius: 4 }}
              sx={{
                fontSize:14,
                borderRadius: "inherit",
                position: "relative",
                zIndex: 5,
                transition: "300ms ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
              image={imglink}
              alt={alt}
              title={title}
            />
           
          </div>
          <span
            className="font-1654 jost color-22222 fw-500 "
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "1",
              WebkitBoxOrient: "vertical",
            }}
          >
            {productName}
          </span>
         
          <span className="jost font-1511 color-767676">
            Starting from {startingPrice}
          </span>
         
        </div>
      </div>
    </>
  );
};
export default Card2;
