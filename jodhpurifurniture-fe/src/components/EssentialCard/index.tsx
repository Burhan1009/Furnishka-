

interface FormProp {
  title1?: any;
  title?: any;
  starting_price?: any;
  children?: any;
}
function EssentialCard(prop: FormProp) {
  const { title1, title, starting_price, children } = prop;
  return (
    <div>
      {children}

      <div className="sec3-box">
        <span className="jost font-301 ">#{title1}</span>
        <h3 className="jost font-302 ">{title}</h3>
        <p className="font-303 jost  ">Starting From {starting_price}</p>
      </div>
    </div>
  );
}
export default EssentialCard;
