const icons = {
  img1: "/static/images/upi.svg",
  img2: "/static/images/chevron-right.svg",
};

function Disclaimer() {
  const getYear = new Date()?.getFullYear()
  return (
    <>
    {/* Burhan code Here */}
      <div
        className="disclaimer container2"
        style={{ background: "#f4f9fc", padding: 18 }}
      >
        <div className="row ">
          <div className="col-md-6 dis-img1">
            <p className="color-767676 fw-normal jost font-1667 dec-1">
              Copyright 2015 - {getYear} © Jodhpuri Furniture - All Rights Reserved.
            </p>
          </div>
          <div className="col-md-6 dis-img">
            <img src={icons["img1"]} alt="" className="sm-none" />
          </div>
        </div>
      </div>
    </>
  );
}
export default Disclaimer;
