import { toast } from "react-toastify";
import infocardArray from "./../../../constants/dashboardInfoArray";
import InfoBox from "../../UI/InfoBox";

import { DashboardContainer, LeftContainer } from "./Dashboard.styled";
import RightContainerMain from "./RightContainerMain";



import  RightContainerMain  from "./RightContainerMain";


const Dashboard = () => {
  // toast.dismiss("LoadingScreen");
  return (
    <DashboardContainer>
      <LeftContainer>
        {infocardArray.map((item) => (
          <InfoBox
            title={item.title}
            amount={item.amount}
            halfWidth={item.halfWidth}
            key={item.id}
          >
            {item.icon}
          </InfoBox>
        ))}
      </LeftContainer>
      <RightContainerMain />
    </DashboardContainer>
  );
};
export default Dashboard;
