import { useDispatch } from "react-redux";

import { pBelFlowGoToFirstStep } from "../../reduxToolkit/pBel/pBelFlowSlice";
import UserAvatar from "./UserAvatar";

function Header({ bgColor, logo, heightLogo, title }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(pBelFlowGoToFirstStep());
  };

  return (
    <div className={`${bgColor} py-5 px-2`}>
      <div className="flex flex-column md:flex-row justify-content-between">
        <div className="mx-6 text-center m-auto">
          <img
            src={logo}
            alt="bici"
            className={`cursor-pointer ${heightLogo}`}
            onClick={handleClick}
          />
        </div>
        <div className="mx-6 text-center mt-4 md:mt-auto m-auto">
          <UserAvatar />
        </div>
      </div>
      <div className="flex flex-column mt-4 md:mt-0">
        <span className="font-semibold text-white text-5xl text-center m-auto">
          {title}
        </span>
        <span className="h-1rem w-5rem border-top-3 border-white text-center m-auto" />
      </div>
    </div>
  );
}

export default Header;
