import { Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Home from "../pages/Home";
import PlayerStatus from "../components/PlayerStatus";
import PlayerItemStatus from "../components/PlayerItemStatus"
import ItemGacha from "../components/ItemGacha"

const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "player-status",
        element: <PlayerStatus />,
      },
      {
        path: "playerItem-status",
        element: <PlayerItemStatus />,
      },
      {
        path: "itemGacha",
        element: <ItemGacha />,
      }
    ],
  },
  {
    path: "/",
    element: <Navigate to="/" />,
  },
];
export default routes;
