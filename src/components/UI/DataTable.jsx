// dataHeader = ["Name", "Price", "Sale Price", "Edit", "Delete"]

import { Box } from "@mui/material";
import { DeleteIcon } from "@mui/icons-material/Delete";
import { EditIcon } from "@mui/icons-material/Edit";
import AddVariants from "../routesComponent/createItems/AddVariants";

const DataTable = ({
  dataHeader = ["Name", "Price", "Sale Price", "Edit", "Delete"],
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box
        sx={{
          height: "auto",
          width: "100%",
          display: "grid",
          gridTemplateColumns: `${dataHeader.map(() => "1fr ")}`,
        }}
      >
        {dataHeader.map((data) => (
          <ListHeader>{data}</ListHeader>
        ))}
        {/* <ListHeader>Name</ListHeader>
        <ListHeader>Price</ListHeader>
        <ListHeader>Sale Price</ListHeader>
        <ListHeader>Edit</ListHeader>
        <ListHeader>Delete</ListHeader> */}
      </Box>
      <Box
        sx={{
          height: "auto",
          width: "100%",
          display: "grid",
          gridTemplateColumns: `${dataHeader.map(() => "1fr ")}`,
          //   gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
          overflowY: "scroll",
        }}
      >
        {Object.keys(variants).map((id) => {
          const item = variants[`${id}`];
          return (
            <>
              <ListBody>{item.name}</ListBody>
              <ListBody>{item.regularPrice}</ListBody>
              <ListBody>{item.sellingPrice}</ListBody>
              <ListBody>
                <EditIcon
                  onClick={() =>
                    setVariantUI(
                      <AddVariants
                        incomingItem={item}
                        onStateLift={onVariantStateLift}
                      />
                    )
                  }
                  sx={{
                    "&:hover": {
                      color: "secondary.light",
                      cursor: "pointer",
                    },
                  }}
                />
              </ListBody>
              <ListBody>
                <DeleteIcon
                  onClick={() => deleteVariantsHandle(item.id)}
                  sx={{
                    "&:hover": {
                      color: "secondary.light",
                      cursor: "pointer",
                    },
                  }}
                />
              </ListBody>
            </>
            // {defualtVariant.id == id && (
            //   <ListItemText
            //     primary={"Defualt"}
            //     sx={{ color: "green" }}
            //   />
            // )}
          );
        })}
      </Box>
    </Box>
  );
};

const ListHeader = styled(Box)`
  width: 100%;
  height: 40px;
  color: #fff;
  font-weight: 700;
  background-color: #212020;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ListBody = styled(Box)`
  width: 100%;
  min-height: 40px;
  color: #fff;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  background-color: #2f2e2e;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #212020;
`;

export default DataTable;
