import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  TextField,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import AddVariantsAndVariantsListLoader from "./AddVariantsAndVariantsListLoader";
import SelectedCatagories from "../../UI/SelectedCatagories";
import ShowAddonsList from "./ShowAddonsList";
import { CreateItemsContainer, InputWrapper } from "./CreateItems.styled";
import { InputSection, InputText, LabelText } from "../../UI/Forms.styled";
import { useNavigate, useParams } from "react-router-dom";
import {
  setDataToCollection,
  shortUUID,
  getSingleDataWithOutRealTimeUpdates,
} from "../../../../utils";
import { showLoading , closeLoading } from "../../loading/loading";

import useFileUploaderJSX from "../../../hooks/useFileUploader";
import { toast } from "react-toastify";

const CreateItems = ({ update }) => {
  const { itemsIdToBeUpdated } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState("");
  const [variants, setVariants] = useState({});
  const [selectedCatagories, setSelectedCatagories] = useState([]);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const { ui, uploadProcess, image, setImage } = useFileUploaderJSX(update);

  useEffect(() => {
    if (update) {
      getSingleDataWithOutRealTimeUpdates("productlist", itemsIdToBeUpdated)
        .then((data) => {
          setItems({ ...data });
          setVariants({ ...data.variants });
          setSelectedCatagories([...data.selectedCatagories]);
          setSelectedAddons([...data.selectedAddons]);
          setImage(data.image.imageDownloadUrl);
        })
        .catch((msg) => {
          navigate("/items");
          toast.error(msg);
        });
    } else {
      setItems((prv) => ({ ...prv, id: `EatPizza-${shortUUID()}` }));
    }
  }, []);

  const createProduct = () => {
    if (items.name == "" || Object.keys(variants).length == 0) {
      toast.error("You have missed Some required Filed");
      return;
    }
    const data = { ...items };

    data.variants = { ...variants };

    let tempData;
    Object.keys(variants).forEach((key) => {
      const item = variants[key];
      console.log(item);
      if (!tempData) {
        tempData = item;
      } else if (Number(item.sellingPrice) < Number(tempData.sellingPrice)) {
        tempData = item;
      }
      return;
    });

    data.defualtVariant = tempData;

    data.selectedCatagories = [...selectedCatagories];
    data.selectedAddons = [...selectedAddons];

    if (image) {
      showLoading();
      uploadProcess("product", items.id)
        .then((v) => {
          data.image = { ...v };
          setDataToCollection(data, "productlist", false);
        })
        .then(() => {
          closeLoading();
          navigate("/items");
        });
    } else {
      data.image = {};
      setDataToCollection(data, "productlist", false);
      navigate("/items");
    }
  };

  return (
    <CreateItemsContainer>
      {/* LeftContainer Start  */}
      <Box
        sx={{
          width: "50%",
          padding: "1%",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <LabelText>Items ID : {items?.id} </LabelText>
          </Box>
          <InputWrapper>
            <LabelText>Items Name</LabelText>
            <InputText
              color="common"
              placeholder="Enter item name"
              value={items.name}
              onChange={(e) =>
                setItems((prv) => ({ ...prv, name: e.target.value }))
              }
            />
          </InputWrapper>
        </Box>
        {/* DescripTion  */}

        {/* Catagories Select Option  */}
        <Box sx={{ marginTop: "1rem" }}>
          <LabelText>Please Select Catagory</LabelText>
          <SelectedCatagories
            setSelectedCatagories={setSelectedCatagories}
            selectedCatagories={selectedCatagories}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* For Upload Image  */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginTop: "1rem",
              justifyContent: "space-between",
            }}
          >
            <LabelText>Upload Image Here</LabelText>
            {ui}
          </Box>
          {/* Description Here */}
        </Box>
        <InputWrapper>
          <LabelText>Description</LabelText>
          <TextField
            color="common"
            placeholder="Enter description here"
            inputProps={{
              style: {
                height: "3rem",
                color: "#fff",
              },
            }}
            sx={{
              width: "100%",
              ".MuiInputBase-root": {
                backgroundColor: "secondary",
                border: "1px solid grey",
              },
            }}
            multiline
            row={2}
            onChange={(e) =>
              setItems((prv) => ({ ...prv, descriptions: e.target.value }))
            }
            value={items.descriptions || ""}
          />
        </InputWrapper>
      </Box>
      {/* LeftConTainer End  */}

      {/* Right Container Start  */}
      <Box
        sx={{
          width: "50%",
          height: "100%",
          padding: "2%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* UpperBox Start  */}
        <Box sx={{ height: "40%" }}>
          <AddVariantsAndVariantsListLoader
            variants={variants}
            setVariants={setVariants}
          />
        </Box>
        {/* UpperBox End  */}

        {/* DownBox Start  */}
        <LabelText>Please Select Addons </LabelText>
        <Box sx={{ height: "55%", overflowY: "auto" }}>
          {/* showing Addons Section  */}
          <ShowAddonsList
            selectedAddons={selectedAddons}
            setSelectedAddons={setSelectedAddons}
            selectedCatagories={selectedCatagories}
          />
        </Box>
        {/* DownBox End  */}

        {/* Compleate And DisCard Actions  */}
        <Box
          sx={{
            marginTop: "auto",
            marginLeft: "auto",
            display: "flex",
            gap: "5%",
          }}
        >
          <Button onClick={createProduct} variant="contained" size="large">
            Complete
          </Button>
          <Button
            onClick={() => navigate("/items")}
            variant="outlined"
            size="large"
          >
            Discard
          </Button>
        </Box>
      </Box>
      {/* Right Container End  */}
    </CreateItemsContainer>
  );
};
export default CreateItems;
