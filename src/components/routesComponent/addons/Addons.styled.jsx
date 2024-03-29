import { styled } from "@mui/system";

export const AddonsContainer = styled("div")({
  width: "100%",
  height: "98%",
  display: "flex",
});

export const FilterSection = styled("div")(({ theme }) => ({
  borderRadius: "5px",
  padding: "20px",
  color: "#fff",
  backgroundColor: theme.palette.surface.dp03,
  boxShadow: theme.shadows[5],
}));

export const CreateAddonsStyle = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 40,
}));
