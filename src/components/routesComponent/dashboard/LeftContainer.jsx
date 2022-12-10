
import { Box,Grid } from "@material-ui/core";

import PeopleIcon from '@material-ui/icons/People';
import ContentCarrier from "../../UI/ContentCarrier";
import Typography from '@material-ui/core/Typography';
const InfoCardArray = [
  {
    icon : <PeopleIcon/> ,
    number : 1200,
    text : "Users"
  },
  {
    icon : <PeopleIcon/> ,
    number : 1200,
    text : "Users"
  },
  {
    icon : <PeopleIcon/> ,
    number : 1200,
    text : "Users"
  },
  {
    icon : <PeopleIcon/> ,
    number : 1200,
    text : "Users"
  },
]
const LeftContainer = () => {
  return (
    <Box sx={{ background: "green", height: "100%", width: "100%" }}>
      <Box
        sx={{
          display: "grid",
          justifyContent: "space-between",
          gridTemplateColumns: "48% 48%",
        }}
      >
        {InfoCardArray.map((value, index) => (
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
    </Box>
  );
}

export default LeftContainer;