import {
  Button,
  Box,
  Select,
  MenuItem,
  FormHelperText,
  Autocomplete,
  TextField,
} from "@mui/material";
import { useState , useEffect } from "react";
import { CreateBannerStyle } from "./Banner.styled";
import { LabelText, InputText, ButtonGroup } from "./../../UI/Forms.styled";
import { FormControl } from "@material-ui/core";
import SelectOption from "./../../UI/SelectOption";
import useFileUploaderJSX from "../../../hooks/useFileUploader";
import { getSingleDataWithOutRealTimeUpdates , setDataToCollection} from "../../../../utils";
import { toast } from "react-toastify";
import { showLoading , closeLoading } from "../../loading/loading";



const options = [
  {
    title: "Product Ref",
    index : 0,
    cb: () => {}
  },
  {
    title: "External Link",
    index : 1,
    cb: () => {}
  },
];
const dataModel = {
  homePageTittle : "",
  image : {},
  ShopAddress : ""

}
const CreateBanner = () => {
  const { ui, uploadProcess, image, setImage } = useFileUploaderJSX(true , {propsWidth : "325" , propsHeight : "150"} );
  const [items, setItems] = useState(dataModel);

  useEffect(() => {
    getSingleDataWithOutRealTimeUpdates("banner" , "banner1").then((data)=>{
      setItems(data)
      setImage(data.image.imageDownloadUrl)
    }).catch(()=>{
      setItems(dataModel)
    })
  },[]);

  const updataHandle = () =>{

    if (items.homePageTittle === "") {
      toast.error("You have missed Some required Filed");
      return;
    }
    const data = { ...items };
    data.id = "banner1"
    if (image) {
      showLoading()
      uploadProcess("banner", "banner1").then((v) => {
        data.image = { ...v };
        setDataToCollection(data, "banner", false);
      }).then(()=>{
        closeLoading()
      }).catch(()=>{
        toast.error("Some Things Went Worng");
        closeLoading()
      });
    } else {
      data.image = {};
      setDataToCollection(data, "banner", false);
    }
  }

  return (
    <CreateBannerStyle>
      <Box>
        <LabelText>Home Page Tittle</LabelText>
        <InputText
          color="common"
          id="filled-size-normal"
          placeholder="Enter Home Page Tittle"
          value={items.homePageTittle}
          onChange={(e) =>
            setItems((prv) => ({ ...prv, homePageTittle : e.target.value }))
          }
        />
      </Box>
      <Box>
        <LabelText>Phycal Shop Address</LabelText>
        <InputText
          color="common"
          id="filled-size-normal"
          placeholder="Enter Phycal Shop Address"
          value={items.ShopAddress}
          onChange={(e) =>
            setItems((prv) => ({ ...prv, ShopAddress : e.target.value }))
          }
        />
      </Box>

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
      <ButtonGroup>
        <Button onClick= {updataHandle} variant="contained" size="large">
          Update
        </Button>
      </ButtonGroup>
    </CreateBannerStyle>
  );
};
//

export default CreateBanner;
