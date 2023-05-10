import bike from "../../images/spinner.gif";

function SplashScreen() {
  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
      }}
    >
      <img
        src={bike}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          height: "90px",
          transform: "translate(-50%, -50%)",
        }}
        alt="loading..."
      ></img>
    </div>
  );
}

export default SplashScreen;
