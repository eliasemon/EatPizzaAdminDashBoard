import Header from "../components/exploratoryElements/header";
import SideBar from "../components/exploratoryElements/sidebar";
import RoutesComponent from "../Routes";
import {
  LayoutContainer,
  BodyContainer,
  RoutesWrapper,
  ContentBackground,
} from "./Layout.styled";

const Layout = () => {
  return (
    <LayoutContainer>
      <Header />
      <BodyContainer>
        <SideBar />
        <RoutesWrapper>
          <ContentBackground>
            <RoutesComponent />
          </ContentBackground>
        </RoutesWrapper>
      </BodyContainer>
    </LayoutContainer>
  );
};

export default Layout;
