import { Routes, Route } from "react-router-dom";

import {
  Addons,
  AllItems,
  Banner,
  Categories,
  CreateItem,
  CurrentOrders,
  Dashboard,
  OrdersHistory,
  Users,
  PromoCode,
} from "./components/routesComponent";
import Settings from "./components/routesComponent/settings";


const RoutesComponent = ({ openingStatus }) => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/addons" element={<Addons />} />
      <Route path="/banner" element={<Banner />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/createitem" element={<CreateItem />} />
      <Route
        path="/createitem/:itemsIdToBeUpdated"
        element={<CreateItem update={true} />}
      />
      <Route
        path="/currentorders"
        element={<CurrentOrders openingStatus={openingStatus} />}
      />
      <Route path="/items" element={<AllItems />} />
      <Route path="/orderhistory" element={<OrdersHistory />} />
      <Route path="/users" element={<Users />} />
      <Route path="/banner" element={<Banner />} />
      <Route path="/promocode" element={<PromoCode />} />
      <Route path="/Settings" element={<Settings />} />
    </Routes>
  );
};

export default RoutesComponent;
