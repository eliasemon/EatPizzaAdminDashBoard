import { useRef , useState} from  'react'
import PrintOrderDetails from '../../printComponent'
import { useReactToPrint } from "react-to-print";
import { Box } from "@material-ui/core";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import { Chip } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import PrintIcon from "@mui/icons-material/Print";

const ListBody = styled(Box)`
  width: 100%;
  /* min-height: 40px; */
  color: #fff;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  background-color: #2f2e2e;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #212020;
`;

const OrdersItemsCard = ({ item, creationDate }) => {
  const componentRef = useRef();
  const [isPrint, setIsprinting] = useState(false);
  const handelPrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${item.id}`,
    onAfterPrint: () => {
      alert("Print Success");
      setIsprinting(false);
    },
    onBeforePrint: () => {
      setIsprinting(true);
    },
    onBeforeGetContent: () => {
      setIsprinting(true);
    },
  });

  let color = "";
  if (item.status == "compleat") {
    color = "success";
  } else if (item.status == "cancel") {
    color = "error";
  } else if (item.status == "inCoocked") {
    color = "info";
  } else {
    color = "secondary";
  }

  return (
    <Box
      key={item.id}
      sx={{
        flex: 1,
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
      }}
    >
      <ListBody>{item.id}</ListBody>
      <ListBody>{item.userName}</ListBody>
      <ListBody>{item?.userPhoneNumber}</ListBody>
      <ListBody>{creationDate.toLocaleString()}</ListBody>
      <ListBody>
        <Chip
          color={color}
          variant="contained"
          label={item.status}
          // color={ item.status == "compleat" ? "success" :  (item.status ==  "cancel" ? "error" : "" ) }
        />
      </ListBody>
      <ListBody>
        <PrintIcon
          onClick={handelPrint}
          fontSize="large"
          sx={{
            "&:hover": {
              color: "secondary.light",
              cursor: "pointer",
            },
          }}
        />
      </ListBody>
      <Box sx={{ position: "absolute", top: -1000, left: 0, zIndex: -100 }}>
        <Box ref={componentRef}>
          <PrintOrderDetails el={item} />
        </Box>
      </Box>
    </Box>
  );
};


export default OrdersItemsCard