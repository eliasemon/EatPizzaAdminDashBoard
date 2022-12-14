import {
  DashboardContainer,
  LeftContainer,
  RightContainer,
} from "./Dashboard.styled";

import PeopleIcon from "@material-ui/icons/People";
import { Box } from "@mui/system";
import ContentCarrier from "../../UI/ContentCarrier";
import { Typography } from "@material-ui/core";

import infocardArray from "./../../../constants/dashboardInfoArray";
import { toast } from "react-toastify";

const Dashboard = () => {
  toast.dismiss("LoadingScreen");
  return (
    <DashboardContainer>
      <LeftContainer>
        <Box
          sx={{
            display: "grid",
            justifyContent: "space-between",
            gridTemplateColumns: "48% 48%",
          }}
        >
          {infocardArray.map((value, index) => (
            <Box sx={{ marginBottom: "2", width: "100%" }} key={index}>
              <ContentCarrier bgColor="red" flexDirection={"column"}>
                {value.icon}
                <Typography>{value.number}</Typography>
                <Typography>{value.text}</Typography>
              </ContentCarrier>
            </Box>
          ))}
        </Box>
        <ContentCarrier bgColor="red" flexDirection={"column"}>
          <PeopleIcon />
          <Typography>450000</Typography>
          <Typography>Monthly Sell</Typography>
        </ContentCarrier>
        <Box mt={2}></Box>
        <ContentCarrier bgColor="red" flexDirection={"column"}>
          <PeopleIcon />
          <Typography>450000</Typography>
          <Typography>Total Sell</Typography>
        </ContentCarrier>
      </LeftContainer>
      <RightContainer />
    </DashboardContainer>
  );
};
export default Dashboard;
