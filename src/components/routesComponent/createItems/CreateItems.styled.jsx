import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const CreateItemsContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  width: "97%",
  height: "95%",
  padding: "1%",
  borderRadius: "5px",
  backgroundColor: theme.palette.surface.dp01,
}));

export const InputWrapper = styled(Box)`
  margin-top: 1rem;
`;
