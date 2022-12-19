import { toast } from "react-toastify";
import infocardArray from "./../../../constants/dashboardInfoArray";
import InfoBox from "../../UI/InfoBox";
import {
  DashboardContainer,
  LeftContainer,
  RightContainer,
} from "./Dashboard.styled";

const Dashboard = () => {
  toast.dismiss("LoadingScreen");
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
      <RightContainer />
    </DashboardContainer>
  );
};
export default Dashboard;
