import { Box, ListItemText } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import CreateAddons from "./createAddons";
import SelectedCatagories from '../../UI/SelectedCatagories';
import { showDataByArrayQuers , showDataWithOutPagination ,  delteColloctionInstance} from "../../../../utils";

import {
  AddonsContainer,
  LabelText,
  CategoryList,
  ListElement,
} from "./Addons.styled";

const itemsModel = {
  name: "",
  price: "",
  selectedCatagories: [],
};

const Addons = () => {
  const [items, setItems] = useState("");
  const [selectedCatagories, setSelectedCatagories] = useState([]);
  const [createDtaUI, setcreateDtaUI] = useState(
    <CreateAddons EditAbleItem={itemsModel} status={false} />
  );

  useEffect(() => {
    if (selectedCatagories.length > 0) {
      showDataByArrayQuers(
        setItems,
        "Addons",
        selectedCatagories,
        "selectedCatagories"
      );
    } else {
      showDataWithOutPagination(setItems, "Addons");
    }
  }, [selectedCatagories, items]);

  const clearUi = () => {
    setcreateDtaUI(<CreateAddons EditAbleItem={itemsModel} status={false} />);
  };
  const handelEditDataUi = (item) => {
    setcreateDtaUI(
      <CreateAddons EditAbleItem={item} status={true} clearUi={clearUi} />
    );
  };

  const deleteItems = (itemsID, itemName) => {
    if (
      window.confirm(
        `******************************************** \n\n Wait:= \n\n Do You Wanna Delete \n**"${itemName}"**\nAddons Item!!! \n\n ********************************************`
      )
    ) {
      delteColloctionInstance(itemsID, "Addons");
    }
  };

  return (
    <AddonsContainer>
      <Box>
        {createDtaUI}
        <LabelText>Filter By Catagories</LabelText>
        <SelectedCatagories
          selectedCatagories={selectedCatagories}
          setSelectedCatagories={setSelectedCatagories}
        />
      </Box>
      <CategoryList subheader={<li />}>
        <ul>
          {items &&
            items.map((doc) => {
              const item = doc.data();
              item.id = doc.id;
              return (
                <ListElement key={item.id}>
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
                        onClick={() => deleteItems(item.id, item.name)}
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
      </CategoryList>
    </AddonsContainer>
  );
};
export default Addons;
