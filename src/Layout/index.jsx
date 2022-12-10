import Header from "../components/exploratoryElements/header";
import SideBar from "../components/exploratoryElements/sidebar";
import Routes from "../Routes";
import { LayoutContainer, BodyContainer } from "./Layout.styled";

const Layout = () => {
  return (
    <LayoutContainer>
      <Header />
      <BodyContainer>
        <SideBar />
        <Routes />
      </BodyContainer>
    </LayoutContainer>
  );
};

export default Layout;
