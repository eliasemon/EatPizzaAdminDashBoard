import { styled } from "@mui/system";

export const CreateItemsContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  width: "97%",
  height: "95%",
  padding: "3%",
  borderRadius: "5px",
  backgroundColor: theme.palette.surface.dp01,
}));
