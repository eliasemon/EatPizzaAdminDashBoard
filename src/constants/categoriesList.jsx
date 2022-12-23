import DashboardIcon from "@mui/icons-material/Dashboard";
import ListIcon from "@mui/icons-material/List";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SettingsIcon from "@mui/icons-material/Settings";

const categories = [
  {
    id: 1,
    title: "Dashboard",
    link: "/",
    icon: <DashboardIcon />,
  },
  {
    id: 2,
    title: "Current Orders",
    link: "/currentorders",
    icon: <DashboardIcon />,
  },
  {
    id: 3,
    title: "Orders History",
    link: "/orderhistory",
    icon: <ListIcon />,
  },
  {
    id: 4,
    title: "All Items",
    link: "/items",
    icon: <DashboardIcon />,
  },
  // {
  //   id: 5,
  //   title: "Create Items",
  //   link: "/createitem",
  //   icon: <DashboardIcon />,
  // },
  {
    id: 6,
    title: "Total User",
    link: "users",
    icon: <ListAltIcon />,
  },
  {
    id: 7,
    title: "Create Categories",
    link: "/categories",
    icon: <ListAltIcon />,
  },
  {
    id: 8,
    title: "Create AddOns",
    link: "/addons",
    icon: <SettingsIcon />,
  },
  {
    id: 9,
    title: "Settings",
    link: "/settings",
    icon: <SettingsIcon />,
  },
];

export default categories;
