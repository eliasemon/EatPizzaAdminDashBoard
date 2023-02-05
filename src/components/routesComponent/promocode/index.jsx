import { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Modal,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  showDataWithOutPagination,
  delteColloctionInstance,
} from "../../../../utils";
import { useEffect } from "react";
import CreatePromoCode from "./CreatePromoCode";
import { PromocodeContainer } from "./Promocode.styled";
import { CategoryList, HalfBox, ListElement } from "./../../UI/Shape.styled";
import TitleBar from "./../../UI/TitleBar";
import { FilterSection } from "../addons/Addons.styled";
import ExtraCostCreation from "./ExtraCostCreation";

const promoCodeModel = {
  name: "",
  description: "",
  discountType: "%",
  discountValue: "",
  validity: "",
  howManyTimesUsed: "",
  conditionAmmount: 0,
};
const ExtraCostCodeModel = {
  name: "",
  description: "",
  costType: "%",
  costValue: "",
};

const PromoCode = () => {
  const [showData, setShowData] = useState("");
  const [extraCostShowData, setExtraCostShowData] = useState("");
  const [outputObject, setOutputObject] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = (item) => {
    setOutputObject(item);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const [createDtaUI, setcreateDtaUI] = useState(
    <CreatePromoCode EditAbleItem={promoCodeModel} status={false} />
  );
  const [createExtraCostUI, setcreateExtraCostUI] = useState(
    <ExtraCostCreation EditAbleItem={ExtraCostCodeModel} status={false} />
  );

  useEffect(() => {
    showDataWithOutPagination(setShowData, "promoCode");
    showDataWithOutPagination(setExtraCostShowData, "extraCost");
  }, []);

  const deleteItems = (itemsID, itemName, type) => {
    if (
      window.confirm(
        `******************************************** \n\n Wait:= \n\n Do You Wanna Delete \n**"${itemName}"**\PromoCode Item!!! \n\n ********************************************`
      )
    ) {
      if (type === "extraCost") {
        delteColloctionInstance(itemsID, "extraCost", false, false);
        return;
      }
      delteColloctionInstance(itemsID, "promoCode", false, false);
    }
  };
  const clearUi = (type) => {
    if (type === "extraCost") {
      setcreateExtraCostUI(
        <ExtraCostCreation EditAbleItem={ExtraCostCodeModel} status={false} />
      );
      return;
    }
    setcreateDtaUI(
      <CreatePromoCode EditAbleItem={promoCodeModel} status={false} />
    );
  };
  const handelEditDataUi = (item, type) => {
    if (type === "extraCost") {
      setcreateExtraCostUI(
        <ExtraCostCreation
          EditAbleItem={item}
          status={true}
          clearUi={clearUi}
        />
      );
      return;
    }

    setcreateDtaUI(
      <CreatePromoCode EditAbleItem={item} status={true} clearUi={clearUi} />
    );
  };

  const newDate = new Date(outputObject.validity);

  // code stolen from addons

  return (
    <>
      <PromocodeContainer>
        <HalfBox color="blue">
          <TitleBar title="Promocode Section" color="blue" />
          {createDtaUI}

          <Box sx={{ boxSizing: "border-box", position: "relative" }}>
            <List
              sx={{
                marginTop: "1rem",
                width: "100%",

                maxHeight: "25vh",

                bgcolor: "secondary",
                position: "absolute",
                overflowY: "scroll",
                color: "common.white",
                // maxHeight: 300,
                "& ul": { padding: 0 },

              }}
              subheader={<li />}
            >
              {
                <ul>
                  {showData &&
                    showData.map((doc) => {
                      const item = doc.data();
                      item.id = doc.id;
                      return (
                        <ListItem
                          key={doc.id}
                          sx={{
                            backgroundColor: "secondary.dark",
                            marginBottom: "5px",
                            borderRadius: "5px",
                          }}
                        >
                          <Box
                            sx={{ flex: 1 ,  marginRight : "10px" , cursor : "pointer" }}
                            onClick={() => {
                              handleOpen(item);
                            }}
                          >
                            <ListItemText primary={item.name} />
                            <Typography>
                              Status :{" "}
                              {Date.now() < Date.parse(item.validity)
                                ? "Available"
                                : "Expired"}
                            </Typography>
                          </Box>
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
                        </ListItem>
                      );
                    })}
                </ul>
              }
            </List>
          </Box>
        </HalfBox>
        <HalfBox color="green">
          <TitleBar title="Extra Cost" color="green" />
          {createExtraCostUI}

          <Box>
            <List
              sx={{
                boxSizing: "border-box",
                width: "100%",
                height: "24vh",

                marginTop: "1rem",
                bgcolor: "secondary",
             
                overflowY: "auto",
                color: "common.white",
            
                "& ul": { padding: 0 },
              }}
              subheader={<li />}
            >
              {
                <ul>
                  {extraCostShowData &&
                    extraCostShowData.map((doc) => {
                      const item = doc.data();
                      item.id = doc.id;
                      return (
                        <ListItem
                          key={doc.id}
                          sx={{
                            backgroundColor: "secondary.dark",
                            marginBottom: "5px",
                            borderRadius: "5px",
                          }}
                        >
                          <ListItemText
                             sx={{ flex: 1 ,  marginRight : "10px" , cursor : "pointer" }}
                            onClick={() => {
                              handleOpen(item);
                            }}
                            primary={item.name}
                          />
                          <Box sx={{ display: "flex", gap: "10px" }}>
                            <Box>
                              <EditIcon
                                onClick={() =>
                                  handelEditDataUi(item, "extraCost")
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
                                onClick={() =>
                                  deleteItems(doc.id, item.name, "extraCost")
                                }
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
        </HalfBox>
      </PromocodeContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            width: "400px",
            padding: "2rem",
            backgroundColor: "#252525",
            border: "none",
            borderRadius: "15px",
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              color: "#fff",
            }}
          >
            {outputObject.name}
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, fontSize: "1.2rem", color: "#fff" }}
          >
            Description : {outputObject.description}
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, fontSize: "1.2rem", color: "#fff" }}
          >
            {outputObject.discountValue ? "Discount" : "Cost"} Value :{" "}
            {outputObject.discountValue ?? outputObject.costValue}{" "}
            {outputObject.discountType ?? outputObject.costType}
          </Typography>
          {outputObject.discountType && (
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, fontSize: "1.2rem", color: "#fff" }}
            >
              Condition Amount : {outputObject.conditionAmmount}
            </Typography>
          )}
          {outputObject.discountType && (
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, fontSize: "1.2rem", color: "#fff" }}
            >
              Validity : {newDate.toLocaleString()}
            </Typography>
          )}
        </Box>
      </Modal>
    </>
  );
};
export default PromoCode;
