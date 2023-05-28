import UserAvatar from "./UserAvatar";

function Header({ bgColor, logo, heightLogo, title, init }) {
  return (
    <div className={`${bgColor} py-5 px-2`}>
      <div className="flex flex-column md:flex-row justify-content-between">
        <div className="mx-6 text-center m-auto">
          <img
            src={logo}
            alt="Logo"
            className={`cursor-pointer ${heightLogo}`}
            onClick={init}
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
