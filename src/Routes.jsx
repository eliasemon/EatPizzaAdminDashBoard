import { Routes, Route } from "react-router-dom";

import {
  Addons,
  AllItems,
  Categories,
  CreateItem,
  CurrentOrders,
  Dashboard,
  OrdersHistory,
  Settings,
  Users,
  PromoCode,
} from "./components/routesComponent";

const RoutesComponent = () => {
  return (
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
      <Route path="/promocode" element={<PromoCode />} />
    </Routes>
  );
};

export default RoutesComponent;
