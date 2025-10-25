const StartScreenLoading = () => {
  return (
    <div
      style={{
        display:'flex',
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <img src={"/static/images/Logo-4-1.png"} alt="Jodhpuri Furniture Logo" />
      <div className="bouncing-loader" style={{marginTop:25}}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
export default StartScreenLoading;
