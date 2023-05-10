import { Route, Routes } from "react-router-dom";

import Layout from "../common/Layout";
import Home from "../../routes/Home";
import Private01 from "../../routes/Private01";
import Private02 from "../../routes/Private02";
import Public01 from "../../routes/Public01";
import Public02 from "../../routes/Public02";
import {
  ROUTE_HOME,
  ROUTE_PUBLIC_01,
  ROUTE_PUBLIC_02,
  ROUTE_PRIVATE_01,
  ROUTE_PRIVATE_02,
  ROUTE_NOT_FOUND,
} from "../../routes/routes";
import Protected from "../../utils/Protected";

function Main() {
  return (
    <Routes>
      <Route path={`${ROUTE_HOME}`} element={<Layout />}>
        <Route index element={<Home />} />

        <Route path={`${ROUTE_PUBLIC_01}`} element={<Public01 />} />
        <Route path={`${ROUTE_PUBLIC_02}`} element={<Public02 />} />

        <Route
          path={`${ROUTE_PRIVATE_01}`}
          element={
            <Protected>
              <Private01 />
            </Protected>
          }
        />
        <Route
          path={`${ROUTE_PRIVATE_02}`}
          element={
            <Protected>
              <Private02 />
            </Protected>
          }
        />

        <Route path={`${ROUTE_NOT_FOUND}`} element={<Home />} />
      </Route>
    </Routes>
  );
}

export default Main;
