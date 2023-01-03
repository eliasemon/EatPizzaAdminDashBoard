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

  const [defualtVariant, setDefualtVariant] = useState("");

  useEffect(() => {
    if (update) {
      getSingleDataWithOutRealTimeUpdates("productlist", itemsIdToBeUpdated)
        .then((data) => {
          setItems({ ...data });
          setVariants({ ...data.variants });
          setDefualtVariant({ ...data.defualtVariant });
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
    data.selectedCatagories = [...selectedCatagories];
    data.selectedAddons = [...selectedAddons];
    data.defualtVariant = { ...defualtVariant };

    if (image) {
      uploadProcess("product", items.id).then((v) => {
        data.image = { ...v };
        setDataToCollection(data, "productlist", false);
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
          justifyContent: "space-between",
        }}
      >
        {/* <Box>
          <Typography color="white">
            {" "}
            {update ? "Update The Items Information" : "Create New Items"}
          </Typography>
        </Box> */}
        <Box>
          <Box sx={{ flexDirection: "row" }}>
            <LabelText sx={{ display: "inline" }}>Items ID : </LabelText>
            <LabelText sx={{ display: "inline" }}>{items?.id}</LabelText>
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
              id="filled-size-normal"
            />
          </InputWrapper>
          <InputWrapper>
            <LabelText>Description</LabelText>
            <InputText
              color="common"
              placeholder="Enter description here"
              onChange={(e) =>
                setItems((prv) => ({ ...prv, descriptions: e.target.value }))
              }
              value={items.descriptions || ""}
            />
          </InputWrapper>
        </Box>
        {/* DescripTion  */}

        {/* Catagories Select Option  */}
        <Box>
          <Typography pt={1} color="white">
            Please Select Catagory
          </Typography>
          <SelectedCatagories
            setSelectedCatagories={setSelectedCatagories}
            selectedCatagories={selectedCatagories}
          />
        </Box>

        {/* For Upload Image  */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "1%",
          }}
        >
          {ui}
        </Box>
      </Box>
      {/* LeftConTainer End  */}

      {/* Right Container Start  */}
      <Box
        sx={{
          width: "50%",
          padding: "2%",
          display: "flex",
          flexDirection: "column",
          gap: "2%",
        }}
      >
        {/* UpperBox Start  */}
        <Box>
          <AddVariantsAndVariantsListLoader
            variants={variants}
            setVariants={setVariants}
            defualtVariant={defualtVariant}
            setDefualtVariant={setDefualtVariant}
          />
        </Box>
        {/* UpperBox End  */}

        {/* DownBox Start  */}
        <Box>
          {/* showing Addons Section  */}
          <ShowAddonsList
            selectedAddons={selectedAddons}
            setSelectedAddons={setSelectedAddons}
            selectedCatagories={selectedCatagories}
          />
        </Box>
        {/* DownBox End  */}

        {/* Compleate And DisCard Actions  */}
        <Box sx={{ marginTop: "3%", display: "flex", gap: "2%" }}>
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
