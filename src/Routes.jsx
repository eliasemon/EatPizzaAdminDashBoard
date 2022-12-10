import { Box } from "@mui/system";
import Addons from "./components/routesComponent/addons";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/routesComponent/dashboard";
import Categories from "./components/routesComponent/categories";
import CreateItem from "./components/routesComponent/createItems";
import CurrentOrders from "./components/routesComponent/currentOrders";
import AllItems from "./components/routesComponent/allItems";
import OrdersHistory from "./components/routesComponent/ordersHistory";
import Users from "./components/routesComponent/users";
import Settings from "./components/routesComponent/settings";

const RoutesComponent = () => {
  return (
    <Box
      sx={{
        pt: "1.5vw",
        pl: "1.5vw",
        boxSizing: "border-box",
        width: "80%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "5px",
        margin: "0 auto",
      }}
    >
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/addons" element={<Addons />} />
        <Route path="/createitem" element={<CreateItem />} />
        <Route path="/currentorders" element={<CurrentOrders />} />
        <Route path="/items" element={<AllItems />} />
        <Route path="/orderhistory" element={<OrdersHistory />} />
        <Route path="/users" element={<Users />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Box>
  );
};

export default RoutesComponent;
