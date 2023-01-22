import Header from "../components/exploratoryElements/header";
import SideBar from "../components/exploratoryElements/sidebar";
import RoutesComponent from "../Routes";
import { LayoutContainer, BodyContainer, RoutesWrapper } from "./Layout.styled";
import { showDataWithOutPagination } from "../../utils";
import { findTheResturentStatus } from "../../utils/ResturentOpenCloseStatus";
import { useState , useEffect } from "react";

const Layout = () => {
  const [resturentOpenClosedData , setResturentOpenClosedData] = useState("")
  const [openingStatus , setOpeningStatus] = useState("")
  useEffect(() => {
    showDataWithOutPagination(setResturentOpenClosedData, "ResturentOpeningHr")
  }, []);
  useEffect(() => {
    if(resturentOpenClosedData.length > 0)
    setOpeningStatus(findTheResturentStatus(resturentOpenClosedData[0].data()))
  }, [resturentOpenClosedData]);


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
