import spinner from "../../images/spinner.svg";

function Spinner({ size }) {
  let sizePx;
  switch (size) {
    case "small":
      sizePx = 40;
      break;
    case "medium":
      sizePx = 60;
      break;
    case "big":
      sizePx = 120;
      break;
    default:
      sizePx = 60;
      break;
  }

  return (
    <div className="text-center m-auto">
      <img
        src={spinner}
        style={{
          height: sizePx,
          width: sizePx,
        }}
        alt="spinner"
      ></img>
    </div>
  );
}

export default Spinner;
