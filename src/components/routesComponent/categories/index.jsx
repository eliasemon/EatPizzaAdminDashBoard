import { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {   showDataWithOutPagination , delteColloctionInstance} from "../../../../utils";
import { useEffect } from "react";
import CreateCatgories from "./createCatagories";
import { CategoryContainer } from "./Category.styled";

import { CategoryList, ListElement } from "../../UI/Shape.styled";

import { HalfBox } from "../../UI/Shape.styled";

const cataGoryModel = {
  name: "",
};

const Categories = () => {
  const [showData, setShowData] = useState("");
  const [createDtaUI, setcreateDtaUI] = useState(
    <CreateCatgories EditAbleItem={cataGoryModel} status={false} />
  );

  useEffect(() => {
    showDataWithOutPagination(setShowData, "catagories");
  }, []);

  const deleteItems = (itemsID, itemName) => {
    if (
      window.confirm(
        `******************************************** \n\n Wait:= \n\n Do You Wanna Delete \n**"${itemName}"**\nCatagory Item!!! \n\n ********************************************`
      )
    ) {
      delteColloctionInstance(itemsID, "catagories");
    }
  };
  const clearUi = () => {
    setcreateDtaUI(
      <CreateCatgories EditAbleItem={cataGoryModel} status={false} />
    );
  };
  const handelEditDataUi = (item) => {
    setcreateDtaUI(
      <CreateCatgories EditAbleItem={item} status={true} clearUi={clearUi} />
    );
  };

  return (
    <CategoryContainer>
      <HalfBox>{createDtaUI}</HalfBox>
      <HalfBox>
        <CategoryList subheader={<li />}>
          {
            <ul>
              {showData &&
                showData.map((doc) => {
                  const item = doc.data();
                  item.id = doc.id;
                  return (
                    <ListElement key={doc.id}>
                      <ListItemText primary={item.name} />
                      <Box sx={{ display: "flex", gap: "10px" }}>
                        <Box>
                          <EditIcon
                            onClick={() => handelEditDataUi(item)}
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
                            onClick={() => deleteItems(doc.id, item.name)}
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
        </CategoryList>
      </HalfBox>
    </CategoryContainer>
  );
};
export default Categories;
