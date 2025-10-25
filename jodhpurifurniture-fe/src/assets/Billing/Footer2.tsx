

const icons = {
  payment: "/static/images/upi.svg",
  img1:  '/static/images/upi.svg',
img2:  '/static/images/chevron-right.svg',
};

function Footer2() {
  
  return (
    <>
      <div className="disclaimer container disclaimer2">
        <div className="row ">
          <div className="col-md-6 dis-img1">
            <label className="color-767676 fw-normal jost font-1667" style={{marginTop:10}}>
              Copyright 2023 © Jodhpuri Furniture - All Rights Reserved.
            </label>
          </div>
          <div className="col-md-6 dis-img">
            <img src={icons["img1"]} alt="" className="sm-none" />
          </div>
        </div>
      </div>
      
    </>
  );
}
export default Footer2;
