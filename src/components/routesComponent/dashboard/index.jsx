import { toast } from "react-toastify";
import infocardArray from "./../../../constants/dashboardInfoArray";
import InfoBox from "../../UI/InfoBox";
import PeopleIcon from "@material-ui/icons/People";
import { DashboardContainer, LeftContainer } from "./Dashboard.styled";
import RightContainerMain from "./RightContainerMain";
import { useState } from "react";
import { useEffect } from "react";
import { lengthOfCollection , getDataForTotalSummery} from "../../../../utils";

const Dashboard = () => {
  // toast.dismiss("LoadingScreen");
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
          {(<PeopleIcon />)}
        </InfoBox>

          <InfoBox
          title={"Total Order"}
          amount={toatalSummery.totalOrder.count}
          halfWidth={true}
          key={"TotalOrder"}
        >
          {(<PeopleIcon />)}
        </InfoBox>
        <InfoBox
          title={"Total Completed Order"}
          amount={toatalSummery.compleatedOrder.count}
          halfWidth={true}
          key={"TotalCompletedOrder"}
        >
          {(<PeopleIcon />)}
        </InfoBox>
        <InfoBox
          title={"Total Sells In Tk"}
          amount={toatalSummery.TotalSells.count}
          halfWidth={true}
          key={"TotalSellsInTk"}
        >
          {(<PeopleIcon />)}
        </InfoBox>
        
        <InfoBox
          title={"Total Others Cost In Tk"}
          amount={toatalSummery.TotalExtraCost.count}
          halfWidth={true}
          key={"TotalOthersCostInTk"}
        >
          {(<PeopleIcon />)}
        </InfoBox>

        <InfoBox
          title={"Todays Sells In Tk"}
          amount={(toatalSummery.todaySell.date ===  date) ? toatalSummery.todaySell.count : 0}
          halfWidth={true}
          key={"TodaysSellsInTk"}
        >
          {(<PeopleIcon />)}
        </InfoBox>
        
        <InfoBox
          title={"Monthly Sells In Tk"}
          amount={(toatalSummery.monthlYSell.date ===  dateCheckForMonth) ? toatalSummery.monthlYSell.count : 0}
          halfWidth={true}
          key={"MonthlySellsInTk"}
        >
          {(<PeopleIcon />)}
        </InfoBox>
        </>
       )}
      </LeftContainer>
      <RightContainerMain />
    </DashboardContainer>
  );
};
export default Dashboard;
