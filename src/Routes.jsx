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

const RoutesComponent = ({openingStatus}) => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/addons" element={<Addons />} />
      <Route path="/createitem" element={<CreateItem />} />
      <Route path="/createitem/:itemsIdToBeUpdated" element={<CreateItem update={true}/>} />
      <Route path="/currentorders" element={<CurrentOrders openingStatus={openingStatus} />} />
      <Route path="/items" element={<AllItems />} />
      <Route path="/orderhistory" element={<OrdersHistory />} />
      <Route path="/users" element={<Users />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/promocode" element={<PromoCode />} />
    </Routes>
  );
};

export default RoutesComponent;
