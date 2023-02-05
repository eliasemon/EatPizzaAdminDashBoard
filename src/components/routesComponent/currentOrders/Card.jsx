import { Box, Button } from "@mui/material";
import { useState, useEffect ,useRef } from "react";
import { HalfBox } from "../../UI/Shape.styled";
import TitleBar from "../../UI/TitleBar";
import {
  CurrentOrdersContainer,
  CardHeaderStyles,
} from "./CurrentOrders.styled";
import { useReactToPrint } from "react-to-print";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import product from "../../../assets/images/product2.png";
import OrderQuantity from "./OrderQuantity";
import { getFirestore , doc , updateDoc} from "firebase/firestore";
import {firebaseApp} from '../../../../firebaseConfig'
import { setDataforTotalSummery , delteColloctionInstanceWithOutLoadingAnimation , getDataForTotalSummery } from "../../../../utils";
import PrintOrderDetails from "../../printComponent";
import ConfirmationBox from "./../../UI/ConfirmationBox";
import PrintIcon from "@mui/icons-material/Print";

const orderStatusChanged = {
  pending: "inCoocked",
  inCoocked: "picked",
  picked: "compleate",
};

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Header = ({ name, orderId, mobile }) => {
  return (
    <Box sx={{ padding: "8px 4px", color: "lightgray" }}>
      <Typography fontSize="22px">{mobile}</Typography>
      <Typography color="#c8c8c8">{name}</Typography>
      <Typography color="#c8c8c8">{orderId}</Typography>
    </Box>
  );
};

const CardComponent = ({ el, setUnHandleOrderDocs, color }) => {
  const [isPrint, setIsprinting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const message = useRef("");
  const agreeFunction = useRef(null);

  const componentRef = useRef();
  const [delayTime, setDelayTime] = useState(
    Date.now() - Number(el.creationTime)
  );
  const intervalID = useRef();

  useEffect(() => {
    if (el.status != "compleate" && el.status != "cancel") {
      intervalID.current = setInterval(() => {
        setDelayTime(Date.now() - Number(el.creationTime));
      }, 1000 * 60);
    }
    return () => clearInterval(intervalID.current);
  }, [delayTime]);

  const handelPrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${el.id}`,
    onAfterPrint: () => {
      alert("Print Success");
      setIsprinting(false);
    },
    onBeforePrint: () => {
      setIsprinting(true);
    },
  });

  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const db = getFirestore();
  const colRef = doc(db, "ordersList", `${el.id}`);
  const onClickButtonHandler = async () => {
    await updateDoc(colRef, { status: orderStatusChanged[el.status] });
    if (el.status === "picked") {

      const orderCompleateRef = doc(db, "totalSummery", "compleatedOrder");
      const TotalSell = doc(db, "totalSummery", "TotalSells");
      const TotalExtraCost = doc(db, "totalSummery", "TotalExtraCost");
      const todaySell = doc(db, "totalSummery", "todaySell");
      const monthlYSell = doc(db, "totalSummery", "monthlYSell");

      const totalSummeryData = await getDataForTotalSummery();
      console.log(totalSummeryData);
      if (
        !totalSummeryData.compleatedOrder ||
        !totalSummeryData.TotalSells ||
        !totalSummeryData.TotalExtraCost ||
        !totalSummeryData.todaySell ||
        !totalSummeryData.monthlYSell
      ) {
        await setDataforTotalSummery({ count: 1 }, orderCompleateRef);
        await setDataforTotalSummery(
          { count: el.TotalOrderAmmount },
          TotalSell
        );
        await setDataforTotalSummery(
          { count: el.totalExtraCost },
          TotalExtraCost
        );
        const date = new Date().toDateString();
        const todaySellItem = {
          date: date,
          count: el.TotalOrderAmmount,
        };
        await setDataforTotalSummery(todaySellItem, todaySell);

        const dateSplitArray = date.split(" ");
        const monthlYSellItem = {
          date: `${dateSplitArray[1]} ${dateSplitArray[3]}`,
          count: el.TotalOrderAmmount,
        };
        await setDataforTotalSummery(monthlYSellItem, monthlYSell);
      } else {
        await updateDoc(orderCompleateRef, {
          count: Number(totalSummeryData.compleatedOrder.count) + 1,
        });
        await updateDoc(TotalSell, {
          count:
            Number(totalSummeryData.TotalSells.count) +
            Number(el.TotalOrderAmmount),
        });
        await updateDoc(TotalExtraCost, {
          count:
            Number(totalSummeryData.TotalExtraCost.count) +
            Number(el.totalExtraCost || 0),
        });
        const dateStr = new Date().toDateString();
        if (totalSummeryData.todaySell.date === dateStr) {
          await updateDoc(todaySell, {
            count:
              Number(totalSummeryData.todaySell.count) +
              Number(el.TotalOrderAmmount),
          });
        } else {
          const todaySellItem = {
            date: new Date().toDateString(),
            count: el.TotalOrderAmmount,
          };
          await setDataforTotalSummery(todaySellItem, todaySell);
        }

        const dateSplitStr = dateStr.split(" ");
        if (
          totalSummeryData.monthlYSell.date ===
          `${dateSplitStr[1]} ${dateSplitStr[3]}`
        ) {
          await updateDoc(monthlYSell, {
            count:
              Number(totalSummeryData.monthlYSell.count) +
              Number(el.TotalOrderAmmount),
          });
        } else {
          const monthlYSellItem = {
            date: `${dateSplitStr[1]} ${dateSplitStr[3]}`,
            count: el.TotalOrderAmmount,
          };
          await setDataforTotalSummery(monthlYSellItem, monthlYSell);
        }
      }
      setUnHandleOrderDocs((prv) => {
        delete prv[el.id];
        return { ...prv };
      });
    } else {
      setUnHandleOrderDocs((prv) => {
        prv[el.id].status = orderStatusChanged[el.status];
        return { ...prv };
      });
    }
  };
  const declineOrder = async (type) => {
    await updateDoc(colRef, { status: type });
    setUnHandleOrderDocs((prv) => {
      delete prv[el.id];
      return { ...prv };
    });
  };

  const handleCancel = (type) => {
    message.current =
      "Are you sure you want to cancel the order ? You can not revert it after clicking agree";
    agreeFunction.current = () => declineOrder(type);
    setDialogOpen(true);
  };

  return (
    <Card
      sx={{
        borderTop: `1px solid ${color}`,
        margin: "5px 5px 15px 5px",
        padding: "10px",
      }}
    >
      <Box>
        <p style={{ color: "#fff" }}>
          {Math.round(delayTime / (1000 * 60))} minutes ago.
        </p>
      </Box>
      <CardHeaderStyles onClick={handleExpandClick} sx={{ cursor: "pointer" }}>
        <Header
          name={el.userName}
          orderId={el.id}
          mobile={el?.userPhoneNumber}
        />
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon sx={{ fontSize: "36px", color: "lightgray" }} />
        </ExpandMore>
      </CardHeaderStyles>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {Object.keys(el.items).map((key) => (
          <OrderQuantity key={key} product={el.items[key]} />
        ))}
        <Box
          sx={{
            disply: "flex",
            flexDirection: "row",
            padding: "10px",
            marginTop: "20px",
            marginBottom: "5px",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography color="white">Subtotal</Typography>
            <Typography color="white">৳ {el.subTottal}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography color="white">Delivery & Other Cost</Typography>
            <Typography color="white">৳ {el.totalExtraCost}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography color="white">Discount</Typography>
            <Typography color="white"> -{el.discountAmmount}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography color="white">Total</Typography>
            <Typography color="white">৳ {el.TotalOrderAmmount}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography color="white">Payment Method</Typography>
            <Typography color="white">{el.paymentType}</Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography color="white">Shiping Address</Typography>
            <Typography color="white">{el.shipingAddress}</Typography>
          </Box>
        </Box>
        <Box sx={{ marginBottom: ".5rem" }}>
          <Button
            sx={{ marginRight: ".5rem" }}
            variant="outlined"
            color="error"
            onClick={() => handleCancel("cancel")}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            endIcon={<PrintIcon />}
            onClick={handelPrint}
          >
            Print
          </Button>
        </Box>
        <Button
          onClick={onClickButtonHandler}
          mt={1}
          variant="contained"
          fullWidth
        >
          PROCESS TO NEXT
        </Button>
      </Collapse>
      <Box sx={{ position: "absolute", top: -1000, left: 0, zIndex: -100 }}>
        <Box ref={componentRef}>
          <PrintOrderDetails el={el} />
        </Box>
      </Box>
      {dialogOpen && (
        <ConfirmationBox
          data={{ dialogOpen, setDialogOpen, message, agreeFunction }}
        />
      )}
    </Card>
  );
};
export default CardComponent;
