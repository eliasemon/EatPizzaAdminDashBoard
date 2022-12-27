import { Box, List, ListItem, ListItemText, Button } from "@mui/material";
import { useState, useEffect } from "react";
import AddVariants from "./AddVariants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const VariantsItemsLoader = ({
  variants,
  onVariantStateLift,
  deleteVariantsHandle,
  setVariantUI
}) => {
  return (
    <>
      <Box>
        <List
          sx={{
            width: "100%",
            maxWidth: 400,
            marginTop: "5%",
            bgcolor: "secondary",
            position: "relative",
            overflow: "auto",
            color: "common.white",
            // maxHeight: 300,
            "& ul": { padding: 0 },
          }}
          subheader={<li />}
        >
          {
            <ul>
              {Object.keys(variants).map((id) => {
                const item = variants[`${id}`];
                return (
                  <ListItem
                    key={item.id}
                    sx={{
                      backgroundColor: "secondary.dark",
                      marginBottom: "5px",
                      borderRadius: "5px",
                    }}
                  >
                    <ListItemText primary={item.name} />
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
                  </ListItem>
                );
              })}
            </ul>
          }
        </List>
      </Box>
    </>
  );
};

const AddVariantsAndVariantsListLoader = ({ setVariants, variants }) => {
  const [AddvarinatUI, setVariantUI] = useState("");

  const onVariantStateLift = async (type, liftedState) => {
    if (type) {
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

  console.log(variants);

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
  return(
    <Box>
      {/* UpperBox for Items Load With Scroll View  */}
      <Box>
          <VariantsItemsLoader
            variants={variants}
            onVariantStateLift={onVariantStateLift}
            deleteVariantsHandle={deleteVariantsHandle}
            setVariantUI={setVariantUI}
          />
      </Box>


      {/* LowerBox For Add Variants  */}
      {AddvarinatUI}
      <Box>
        <Button 
          onClick={()=> setVariantUI(
                              <AddVariants
                                onStateLift={onVariantStateLift}
                              />
          )} variant="contained"> Add Variants </Button>
      </Box>







    </Box>

  ) 
  // <Box>{AddvarinatUI}</Box>;
};

export default AddVariantsAndVariantsListLoader;
