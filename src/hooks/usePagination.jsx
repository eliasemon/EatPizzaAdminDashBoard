import {useState , useEffect} from 'react'
import { Box } from "@material-ui/core";
import Pagination from "@mui/material/Pagination";

const usePagination = ({totalPage}) => {
    const [activepage , setActivePage] = useState(1);
    const [localTotal , setLocalTotal] = useState(totalPage) 
    // console.log(ac)
    const changeTheLocalTotal = (num) =>{
        setLocalTotal(num)
    }
    const ui = (
      <Box
        style={{
          width: "100%",
        }}
      >
        <Pagination
          count={localTotal}
          onChange={(e, page) => setActivePage(Number(page))}
          sx={{ color: "#fff" }}
        />
      </Box>
    );

  return {
    ui , 
    activepage,
    changeTheLocalTotal,
    localTotal
  }
}

export default usePagination