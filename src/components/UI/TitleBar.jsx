import { styled } from "@mui/system";

const TitlebarStyle = styled("div")((props) => ({
  backgroundColor: "#1E1E1E",
  border: `2px solid ${props.theme.palette.color[props.color] ?? "#fff"}`,
  borderRadius: "5px",
  padding: "1% 2%",
  position: "absolute",
  top: "-3%",
  zIndex: 1,
  alignSelf: "center",
  marginBottom: 10,
}));

const Text = styled("p")({
  color: "white",
  textAlign: "center",
});

const TitleBar = ({ title, color }) => {
  return (
    <TitlebarStyle color={color}>
      <Text>{title}</Text>
    </TitlebarStyle>
  );
};

export default TitleBar;
