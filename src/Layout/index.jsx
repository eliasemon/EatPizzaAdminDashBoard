import Header from "../components/exploratoryElements/header";
import SideBar from "../components/exploratoryElements/sidebar";
import RoutesComponent from "../Routes";
import { LayoutContainer, BodyContainer, RoutesWrapper } from "./Layout.styled";

const Layout = ({openingStatus}) => {
  return (
    <LayoutContainer>
      <Header openingStatus={openingStatus} />
      <BodyContainer>
        <SideBar />
        <RoutesWrapper>
          <RoutesComponent openingStatus={openingStatus} />
        </RoutesWrapper>
      </BodyContainer>
    </LayoutContainer>
  );
};

export default Layout;
