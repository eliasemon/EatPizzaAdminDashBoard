import Header from "../components/exploratoryElements/header";
import SideBar from "../components/exploratoryElements/sidebar";
import RoutesComponent from "../Routes";
import { LayoutContainer, BodyContainer, RoutesWrapper } from "./Layout.styled";

const Layout = () => {
  return (
    <LayoutContainer>
      <Header />
      <BodyContainer>
        <SideBar />
        <RoutesWrapper>
          <RoutesComponent />
        </RoutesWrapper>
      </BodyContainer>
    </LayoutContainer>
  );
};

export default Layout;
