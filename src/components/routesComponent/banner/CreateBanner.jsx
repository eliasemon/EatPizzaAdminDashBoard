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
  backLinkType : "",
  backLink : ""
}
const CreateBanner = () => {
  const { ui, uploadProcess, image, setImage } = useFileUploaderJSX(true , {propsWidth : "325" , propsHeight : "150"} );
  const [items, setItems] = useState(dataModel);
  const [activeItem , setActiveItem]= useState(0);


  useEffect(() => {
    getSingleDataWithOutRealTimeUpdates("banner" , "banner1").then((data)=>{
      setItems(data)
      console.log(data)
      setImage(data.image.imageDownloadUrl)
      setActiveItem(Number(data?.backLinkType?.index))
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
    data.backLinkType = {title : options[activeItem].title ,  index : options[activeItem].index}
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
      <SelectOption
        width="40%"
        options={options}
        activeItem={activeItem}
        setActiveItem={(index)=> { setItems((prv) => ({ ...prv, backLink : "" , backLinkType : options[activeItem]  }))  ; setActiveItem(index)}}
      />

        <Box>
        <LabelText>{options[activeItem]?.title}</LabelText>
          <InputText
            color="common"
            id="filled-size-normal"
            placeholder={`Enter the ${options[activeItem]?.title}`}
            value={items.backLink}
            onChange={(e) =>
              setItems((prv) => ({ ...prv, backLink : e.target.value }))
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
