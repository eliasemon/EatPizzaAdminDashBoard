
import InfoBox from "../../UI/InfoBox";
import PeopleIcon from "@material-ui/icons/People";
import { DashboardContainer, LeftContainer } from "./Dashboard.styled";
import RightContainerMain from "./RightContainerMain";
import { useState } from "react";
import { useEffect } from "react";
import { lengthOfCollection , getDataForTotalSummery} from "../../../../utils";
import ListAltIcon from '@mui/icons-material/ListAlt';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import PaidIcon from '@mui/icons-material/Paid';

const Dashboard = () => {
  const [toatalSummery , setTotalSummery] = useState("")
  const [totalUser, setTotalUser] = useState(0);
  useEffect(()=>{
    getDataForTotalSummery().then((data)=>{
      setTotalSummery(data);
    })
    lengthOfCollection("usersList").then((data)=>{
      setTotalUser(data)
    })
  },[])
 

  const date = new Date().toDateString();
  const dateParseStr = date.split(" ")
  const dateCheckForMonth = `${dateParseStr[1]} ${dateParseStr[3]}`
  return (
    <DashboardContainer>
      <LeftContainer>
        {toatalSummery && (
          <>
            <InfoBox
              title={"Total Registed User"}
              amount={totalUser}
              halfWidth={true}
              key={"TotalRegistedUser"}
            >
              {<PeopleIcon fontSize="large" />}
            </InfoBox>

            <InfoBox
              title={"Total Order"}
              amount={toatalSummery?.totalOrder?.count}
              halfWidth={true}
              key={"TotalOrder"}
            >
              {<ListAltIcon fontSize="large" />}
            </InfoBox>
            <InfoBox
              title={"Total Completed Order"}
              amount={toatalSummery?.compleatedOrder?.count}
              halfWidth={true}
              key={"TotalCompletedOrder"}
            >
              {<FactCheckIcon fontSize="large" />}
            </InfoBox>
            <InfoBox
              title={"Total Sells In Tk"}
              amount={toatalSummery?.TotalSells.count?.toFixed(2)}
              halfWidth={true}
              key={"TotalSellsInTk"}
            >
              {<PaidIcon fontSize="large" />}
            </InfoBox>

            <InfoBox
              title={"Total Others Cost In Tk"}
              amount={toatalSummery?.TotalExtraCost.count?.toFixed(2)}
              halfWidth={true}
              key={"TotalOthersCostInTk"}
            >
              {<PaidIcon fontSize="large" />}
            </InfoBox>

            <InfoBox
              title={"Todays Sells In Tk"}
              amount={
                toatalSummery.todaySell.date === date
                  ? toatalSummery?.todaySell?.count?.toFixed(2)
                  : 0
              }
              halfWidth={true}
              key={"TodaysSellsInTk"}
            >
              {<PaidIcon fontSize="large" />}
            </InfoBox>

            <InfoBox
              title={"Monthly Sells In Tk"}
              amount={
                toatalSummery.monthlYSell.date === dateCheckForMonth
                  ? toatalSummery?.monthlYSell?.count?.toFixed(2)
                  : 0
              }
              halfWidth={true}
              key={"MonthlySellsInTk"}
            >
              {<PaidIcon fontSize="large" />}
            </InfoBox>
          </>
        )}
      </LeftContainer>
      <RightContainerMain />
    </DashboardContainer>
  );
};
export default Dashboard;
