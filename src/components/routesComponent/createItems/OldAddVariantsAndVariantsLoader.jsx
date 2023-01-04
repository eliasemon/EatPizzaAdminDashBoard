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
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <List
          sx={{
            width: "100%",
            maxWidth: 600,
            bgcolor: "secondary",
            position: "relative",
            overflow: "auto",
            color: "common.white",
            "& ul": { padding: "20px" },
          }}
          subheader={<li />}
        >
          {
            <ul>
              {Object.keys(variants).map((id) => {
                const item = variants[`${id}`];
                console.log("item", item);
                return (
                  <ListElement
                    key={item.id}
                    sx={{
                      backgroundColor: "secondary.dark",
                      marginBottom: "15px",
                      borderRadius: "5px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                        padding: "10px",
                      }}
                    >
                      {defualtVariant.id == id && (
                        <ListItemText
                          primary={"Defualt"}
                          sx={{ color: "green" }}
                        />
                      )}

                      <ListItemText primary={item.name} />
                      <ListItemText primary={`${item.regularPrice} ৳`} />
                      <ListItemText primary={`${item.sellingPrice} ৳`} />
                    </Box>

                    <Box sx={{ display: "flex", gap: "10px" }}>
                      <Box>
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
                      </Box>
                      <Box>
                        <DeleteIcon
                          onClick={() => deleteVariantsHandle(item.id)}
                          sx={{
                            "&:hover": {
                              color: "secondary.light",
                              cursor: "pointer",
                            },
                          }}
                        />
                      </Box>
                    </Box>
                  </ListElement>
                );
              })}
            </ul>
          }
          {/* </CategoryList> */}
        </List>
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
            overflowY: "scroll",
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