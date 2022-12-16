import { styled } from "@mui/system";

// const TitlebarStyle = styled("div")({
//   //   backgroundColor: ({ status }) =>
//   //     status === "primary" ? "#449CCD" : "#8AE32C",
//   borderRadius: "5px",
//   padding: "1% 2%",
//   marginTop: "-50px",
//   zIndex: 1,
//   alignSelf: "center",
// });

const TitlebarStyle = styled("div")((props) => ({
  backgroundColor: props.color,
  borderRadius: "5px",
  padding: "1% 2%",
  marginTop: "-50px",
  zIndex: 1,
  alignSelf: "center",
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
