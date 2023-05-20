import { useRef } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { Menu } from "primereact/menu";
import { Avatar } from "primereact/avatar";
import { useKeycloak } from "@react-keycloak/web";

import { getAllPBelFlowStepsConfig } from "../../utils/pBel/pBelFlowStepsConfig";
import { getFirstRoute } from "../../utils/stepsHelper";
import IdleMonitor from "../../utils/IdleMonitor";

function UserAvatar() {
  const { keycloak } = useKeycloak();
  const menu = useRef(null);
  const op = useRef(null);

  const items = [
    {
      label: "Opciones",
      items: [
        {
          label: "Salir",
          icon: "pi pi-sign-out",
          command: () => {
            handleLogout();
          },
        },
      ],
    },
  ];

  const handleLogout = () => {
    let currentUrl = window.location.href;
    const searchString = process.env.PUBLIC_URL;
    const index = currentUrl.indexOf(searchString);
    const home =
      currentUrl.substring(0, index + searchString.length) +
      getFirstRoute(getAllPBelFlowStepsConfig());
    keycloak.logout({ redirectUri: home });
  };

  const handleOnMouseOver = (e) => {
    op.current.show(e);
  };

  const handleOnMouseOut = (e) => {
    op.current.hide(e);
  };

  return (
    <>
      {keycloak.authenticated && (
        <div className="flex flex-column md:flex-row">
          <IdleMonitor timesUp={handleLogout} />

          <Menu model={items} popup ref={menu} id="popup_menu" />
          <OverlayPanel ref={op}>{keycloak.tokenParsed?.email}</OverlayPanel>

          <div
            onClick={(event) => menu.current.toggle(event)}
            aria-controls="popup_menu"
            aria-haspopup
          >
            <Avatar
              icon="pi pi-user"
              className="p-mr-2 bg-primary text-white cursor-pointer"
              size="large"
              shape="circle"
            />
          </div>

          <div
            className="mt-2 md:m-auto"
            onMouseOver={handleOnMouseOver}
            onMouseOut={handleOnMouseOut}
          >
            <span className="md:ml-2 font-semibold text-white text-lg uppercase">
              {keycloak.tokenParsed?.name}
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export default UserAvatar;
