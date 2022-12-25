import { Box , Button  } from '@mui/material'

import {useEffect, useState} from 'react'

import { RightContainer, Section } from "./Dashboard.styled";

import {
  showDataWithOutPagination,
  addDataToCollection,
  setDataToCollection,
} from "../../../../utils";
import AutometicTimeChange from "./AutometicTimeChange";
import ManualMode from "./ManualMode";
import SkeletoneForDashBoardRightContainer from "../../UI/skeletone/SkeletoneForDashBoardRightContainer";

const dataModel = {
  id: "openingAndClosingData",
  name: "ResturentOpeningHr",
  automaticMode: true,
  openingHR: 7,
  closingHR: 20,
  manualModeResturentClosed: false,
  notice: "",
  serviceTimeZone: "GMT+0600",
  serviceTimeZoneOffSet : -360
};

const RightContainerMain = () => {
  const [data, setData] = useState("");
  const [forView, setForView] = useState("");

  useEffect(() => {
    showDataWithOutPagination(setData, "ResturentOpeningHr").then((length) => {
      if (length == 0) {
        setDataToCollection(dataModel, "ResturentOpeningHr", false);
      }
    });
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      setForView({ ...data[0].data() });
    }
  }, [data]);

  const openResturent = () => {
    const data = { ...forView };
    data.manualModeResturentClosed = false;
    setDataToCollection(data, "ResturentOpeningHr", false);
  };

  if (!forView) {
    return <SkeletoneForDashBoardRightContainer />;
  }
  return (
    <RightContainer>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          // height: "100%",
        }}
      >
        {forView.manualModeResturentClosed && (
          <Box
            sx={{
              width: "100%",
              minHeight: "100%",
              backgroundColor: "rgba(255,255,255,.5)",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 200,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button variant="contained" size="large" onClick={openResturent}>
              Open The Resturent
            </Button>
          </Box>
        )}
        <Box
          sx={{
            zIndex: 100,
          }}
        >
          <Section margin="0" padding="0">
            <AutometicTimeChange
              data={data[0].data()}
              forView={forView}
              setForView={setForView}
            />
          </Section>
          <Box
            sx={{
              width: "100%",
              height: "20px",
            }}
          ></Box>

          <Section margin="0" padding="0">
            <ManualMode forView={forView} setForView={setForView} />
          </Section>
        </Box>
      </Box>
    </RightContainer>
  );
};

export default RightContainerMain