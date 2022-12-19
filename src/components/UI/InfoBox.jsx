import { Typography } from "@mui/material";
import { styled } from "@mui/system";

const InfoBoxStyle = styled("div")((props) => ({
  display: "flex",
  width: props.halfWidth ? "48%" : "100%",
  margin: ".5rem 0",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  backgroundColor: props.theme.palette.surface.dp06,
  color: "#fff",
  borderRadius: "5px",
}));

const InfoBox = ({ title, amount, children, halfWidth }) => {
  return (
    <InfoBoxStyle halfWidth={halfWidth}>
      {children}
      <Typography>{amount}</Typography>
      <Typography>{title}</Typography>
    </InfoBoxStyle>
  );
};

export default InfoBox;
