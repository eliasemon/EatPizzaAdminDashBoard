import DashboardIcon from "@mui/icons-material/Dashboard";
import ListIcon from "@mui/icons-material/List";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import ReorderIcon from '@mui/icons-material/Reorder';
import AppsIcon from '@mui/icons-material/Apps';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import AddchartIcon from '@mui/icons-material/Addchart';
import PromoCode from './../components/routesComponent/promocode/index';
import BeenhereIcon from '@mui/icons-material/Beenhere';
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
    icon: <ReorderIcon />,
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
    icon: <AppsIcon />,
  },

 // {
  //  id: 5,
   // title: "Create Items",
    // link: "/createitem",
   // icon: <AssignmentTurnedInIcon />,
 // },


  {
    id: 6,
    title: "Total User",
    link: "users",
    icon: <SupervisedUserCircleIcon />,
  },
  {
    id: 7,
    title: "Categories",
    link: "/categories",
    icon: <ListAltIcon />,
  },
  {
    id: 8,
    title: "AddOns",
    link: "/addons",
    icon: <AddchartIcon />,
  },
  {
    id: 9,
    title: "promocode",
    link: "/promocode",
    icon: <BeenhereIcon />,
  },
  {
    id: 10,
    title: "Settings",
    link: "/settings",
    icon: <SettingsIcon />,
  },
];

export default categories;
