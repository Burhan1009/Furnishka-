import { title } from "process";

const Client_Card = (props: {
  imglink?: any;
  productName?: any;
  review?: any;
  customerName?: any;
  customerLocation?: any;
  rating?: any;
  onClicks?: any;
  alt?: string;
  title?: string;
}) => {
  const {
    imglink,
    productName,
    review,
    alt,
    customerName,
    customerLocation,
    rating,
    onClicks,
    title,
  } = props;

  return (
    <>
      <div>
        <div
          style={{ cursor: "pointer" }}
          onClick={onClicks}
          className="section-12"
        >
          <img src={imglink} width={"100%"} alt={alt} title={title} />
          <p className="jost fontSize-20 fw-500 color-22222 r-text">
            {productName}
          </p>
          <p className="font-1654 jost fw-400 color-767676 bottom-margin-class scrollable-div ">
            {review}
          </p>
          <div className="customer-name d-flex justify-content-between">
            <div>
              <p className="jost font-161112 fw-600 color-22222 mb-01 ">
                {customerName}
              </p>
              <p className="jost font-1654 color-767676 fw-normal">
                {customerLocation}
              </p>
            </div>
            <div className="d-flex rating ">
              <div className="font-14223 fw-500 jost">{rating}</div>
              <img width={15} height={15} src={"/static/icon/Star1.svg"} />
              {/* Burhan Code Here */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Client_Card;
