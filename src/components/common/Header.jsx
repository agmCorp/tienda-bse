// AGM 05/23
// import UserAvatar from "./UserAvatar";

function Header({ bgColor, logo, heightLogo, title }) {
  return (
    <div className={`${bgColor} py-5 px-2`}>
      <div className="flex flex-column md:flex-row justify-content-between">
        <div className="mx-6 text-center m-auto">
          <img src={logo} alt="logo" className={`${heightLogo}`} />
        </div>
        <div className="mx-6 text-center mt-4 md:mt-auto m-auto">
          {/* <UserAvatar /> */}
        </div>
      </div>
      <div className="flex flex-column mt-4 md:mt-0">
        <span className="font-semibold text-white text-5xl text-center m-auto">
          {title}
        </span>
      </div>
    </div>
  );
}

export default Header;
