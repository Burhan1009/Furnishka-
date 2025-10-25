
function CardWide(props: {
  imglink?: any;
  pName?: any;
  dPrice?: any;
  sPrice?: any;
  onClick?: any;
  className?: any;
  imageStyle?: any;
  alt?: string;
  p2Name?: any;
  title?: string; 
  onhandlecolorClick?: any;
}) {
  const {
    imglink,
    alt,
    pName,
    onClick,
    imageStyle,
    title,
  } = props;
  return (
    <>
      <div className="items-slider d-flex">
        <div onClick={onClick} className="li-sec1-box">
          <div className="box-list image-box ">
            <img
              width="100%"
              style={{ cursor: "pointer", ...imageStyle }}
              src={imglink}
              alt={alt}
              title={title}
              className=""
            />
          </div>
          <p
            className="jost font-1635 color-22222 text-center card-range"
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "1",
              WebkitBoxOrient: "vertical",
            }}
          >
            {pName}
          </p>
        </div>
      </div>
    </>
  );
}
export default CardWide;
