import {
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import AddVariants from "./AddVariants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { CategoryList, ListElement } from "../../UI/Shape.styled";
import { styled } from "@mui/system";

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

const VariantsItemsLoader = ({
  variants,
  onVariantStateLift,
  deleteVariantsHandle,
  setVariantUI,
  defualtVariant,
}) => {
  return (
    <>
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
            gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
          }}
        >
          <ListHeader>Name</ListHeader>
          <ListHeader>Price</ListHeader>
          <ListHeader>Sale Price</ListHeader>
          <ListHeader>Edit</ListHeader>
          <ListHeader>Delete</ListHeader>
        </Box>
        <Box
          sx={{
            height: "auto",
            width: "100%",
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
            overflowY: "scroll",
          }}
        >
          {Object.keys(variants).map((id) => {
            const item = variants[`${id}`];
            console.log("item", item);
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
    </>
  );
};

const AddVariantsAndVariantsListLoader = ({
  setVariants,
  variants,
  defualtVariant,
  setDefualtVariant,
}) => {
  const [AddvarinatUI, setVariantUI] = useState("");

  const onVariantStateLift = async (type, liftedState) => {
    if (type) {
      if (!defualtVariant) {
        setDefualtVariant({ ...liftedState });
      }
      if (
        defualtVariant &&
        defualtVariant.sellingPrice > liftedState.sellingPrice
      ) {
        setDefualtVariant({ ...liftedState });
      }
      await setVariants((prv) => {
        prv[`${liftedState.id}`] = liftedState;
        return { ...prv };
      });

      // return;
    }
    setVariantUI("");
  };

  const deleteVariantsHandle = (itemId) => {
    setVariants((prv) => {
      delete prv[`${itemId}`];
      return { ...prv };
    });
  };

  // useEffect(() => {
  //   setVariantUI(
  //     <VariantsItemsLoader
  //       variants={variants}
  //       onVariantStateLift={onVariantStateLift}
  //       setVariantUI={setVariantUI}
  //       deleteVariantsHandle={deleteVariantsHandle}
  //     />
  //   );
  // }, [variants]);
  return (
    <Box>
      {/* UpperBox for Items Load With Scroll View  */}

      {Object.keys(variants).length > 0 ? (
        <Box
          sx={{
            width: "100%",
            height: "300px",
            backgroundColor: "rgba(255,255,255, 0.08)",
          }}
        >
          <VariantsItemsLoader
            defualtVariant={defualtVariant}
            variants={variants}
            onVariantStateLift={onVariantStateLift}
            deleteVariantsHandle={deleteVariantsHandle}
            setVariantUI={setVariantUI}
          />
        </Box>
      ) : (
        <Box>
          <Box
            sx={{
              width: "100%",
              height: "300px",
              backgroundColor: "rgba(255,255,255, 0.08)",
              overflowY: "scroll",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography sx={{ color: "#fff", fontSize: "1.5rem" }}>
              No variants found !
            </Typography>
          </Box>
        </Box>
      )}

      {/* LowerBox For Add Variants  */}
      {AddvarinatUI}
      <Box>
        <Button
          onClick={() =>
            setVariantUI(<AddVariants onStateLift={onVariantStateLift} />)
          }
          variant="contained"
          sx={{ marginTop: "16px", marginBottom: "10px" }}
        >
          {" "}
          Add Variants{" "}
        </Button>
      </Box>
    </Box>
  );
  // <Box>{AddvarinatUI}</Box>;
};

export default AddVariantsAndVariantsListLoader;
