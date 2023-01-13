import { Box, ListItemText } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import CreateAddons from "./CreateBanner";
import SelectedCatagories from "../../UI/SelectedCatagories";
import {
  showDataByArrayQuers,
  showDataWithOutPagination,
  delteColloctionInstance,
} from "../../../../utils";
import { HalfBox } from "../../UI/Shape.styled";
import { FilterSection, BannerContainer } from "./Banner.styled";
import { CategoryList, ListElement } from "../../UI/Shape.styled";
import FilterView from "../../UI/FilterView";
import TitleBar from "../../UI/TitleBar";

const itemsModel = {
  name: "",
  price: "",
  selectedCatagories: [],
};

const Banner = () => {
  const [items, setItems] = useState("");
  const [selectedCatagories, setSelectedCatagories] = useState([]);
  const clearFilterfun = () => {
    setSelectedCatagories([]);
  };

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
  }, [selectedCatagories]);

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
    <BannerContainer>
      <HalfBox color="blue">
        <TitleBar title="Creation Section" color="blue" />
        {createDtaUI}
      </HalfBox>
     
    </BannerContainer>
  );
};
export default Banner;
