import { Link, Outlet } from "react-router-dom";
import Header from "./Header";
import logo from "../../images/bse-logo-negative.png";

import {
  ROUTE_HOME,
  ROUTE_PUBLIC_01,
  ROUTE_PUBLIC_02,
  ROUTE_PRIVATE_01,
  ROUTE_PRIVATE_02,
} from "../../routes/routes";

function Layout() {
  const itemNav = (route, description, icon) => {
    return (
      <>
        <Link to={route} className="text-white no-underline">
          <div className="cursor-pointer px-4 py-3 flex align-items-center hover:shadow-5 hover:bg-orange-400 active:bg-orange-600 transition-colors transition-duration-150 border-round-2xl">
            <i className={`pi ${icon} mr-2`}></i>
            <span className="font-medium">{description}</span>
          </div>
        </Link>
      </>
    );
  };

  return (
    <div>
      <Header
        bgColor="bg-orange-900"
        logo={logo}
        heightLogo="h-3rem"
        title="PRUEBA DE CONCEPTO LOGIN"
      />
      <div className="p-2 bg-orange-500 p-2 m-0 flex flex-column md:flex-row justify-content-between">
        {itemNav(`${ROUTE_HOME}`, "Home", "pi-home", true)}
        {itemNav(`${ROUTE_PUBLIC_01}`, "Página pública 1", "pi-thumbs-up")}
        {itemNav(`${ROUTE_PUBLIC_02}`, "Página pública 2", "pi-thumbs-up")}
        {itemNav(`${ROUTE_PRIVATE_01}`, "Página privada 1", "pi-lock")}
        {itemNav(`${ROUTE_PRIVATE_02}`, "Página privada 2", "pi-lock")}
      </div>
      <Outlet />
    </div>
  );
}

export default Layout;
