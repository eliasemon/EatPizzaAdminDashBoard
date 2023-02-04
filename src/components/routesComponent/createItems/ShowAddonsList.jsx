import { Box, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import SelectedCatagories from "../../UI/SelectedCatagories";
import {
  showDataWithOutPagination,
  showDataByArrayQuers,
} from "../../../../utils";
import { LabelText } from "../../UI/Forms.styled";
import SelectOption from "./../../UI/SelectOption";

const ShowAddonsList = ({
  selectedAddons,
  setSelectedAddons,
  selectedCatagories,
}) => {
  // const [selectedCatagories , setSelectedCatagories] = useState([])
  const [activeItem, setActiveItem] = useState(0);
  const [items, setItems] = useState("");
  const options = [
    {
      title: "DEFAULT FILTERED",
      cb: () => {
        ViewChange("filtered");
      },
    },
    {
      title: "All",
      cb: () => {
        ViewChange();
      },
    },
  ];

  const ViewChange = (type) => {
    if (type == "filtered") {
      if (selectedCatagories.length > 0) {
        showDataByArrayQuers(
          setItems,
          "Addons",
          selectedCatagories,
          "selectedCatagories"
        );
      }
      return;
    }
    showDataWithOutPagination(setItems, "Addons");
    return;
  };

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
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {/* for Addons Filtering  */}
      {/* <Box>
                      <FilterView  
                          selectedCatagories={selectedCatagories}
                          setSelectedCatagories={setSelectedCatagories}
                          clearFilterfun = {clearFilterfun}
                          heading = "Filter The Addons List By Catagories"
                        />
                    </Box> */}

      {/* itemsLoader */}

      {/* Naviagate Button  */}
      {/* <Box sx={{ display: "flex" }}>
        <Button onClick={() => ViewChange("filtered")}>Default Filtered</Button>
        <Button onClick={ViewChange}>All</Button>
      </Box> */}

      {selectedCatagories.length !== 0 && (
        <SelectOption
          width={"60%"}
          options={options}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          sx={{ height: "100%", fontSize: ".8rem" }}
        />
      )}
      <Box>
        {items && (
          <SelectedCatagories
            selectedCatagories={selectedAddons}
            setSelectedCatagories={setSelectedAddons}
            preAddedArray={items}
          />
        )}
      </Box>
    </Box>
  );
};
export default ShowAddonsList;
