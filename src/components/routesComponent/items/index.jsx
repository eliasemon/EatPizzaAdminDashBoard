import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "60ch",
    },
  },
}));

const columns = [
  { id: "itemid", label: "ITEMS ID", minWidth: 170 },
  { id: "itemsname", label: "ITEMS NAME", minWidth: 100 },
  {
    id: "status",
    label: "STATUS",
    minWidth: 170,
  },
  {
    id: "edit",
    label: "EDIT ITEMS",
    minWidth: 170,
  },
  {
    id: "delete",
    label: "DELETE ITEMS",
    minWidth: 170,
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData("#eatpizza01", "IN", 1324171354, 3287263),
  createData("#eatpizza02", "CN", 1403500365, 9596961),
  createData("#eatpizza03", "IT", 60483973, 301340),
  createData("#eatpizza04", "US", 327167434, 9833520),
  createData("#eatpizza05", "CA", 37602103, 9984670),
  createData("#eatpizza06", "AU", 25475400, 7692024),
  createData("#eatpizza07", "DE", 83019200, 357578),
  createData("#eatpizza08", "IE", 4857000, 70273),
  createData("#eatpizza09", "MX", 126577691, 1972550),
  createData("#eatpizza10", "JP", 126317000, 377973),
  createData("#eatpizza11", "FR", 67022000, 640679),
  createData("#eatpizza11", "GB", 67545757, 242495),
  createData("#eatpizza12", "RU", 146793744, 17098246),
  createData("#eatpizza13", "NG", 200962417, 923768),
  createData("#eatpizza14", "BR", 210147125, 8515767),
];

const ItemList = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        // gridTemplateColumns: "17.9vw auto",
        width: "100%",
        height: "100%",
        padding: "1%",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Enter user ID or username or phonenumber"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        <Button variant="contained" size="large" color="primary">
          Create Items
        </Button>
      </Box>
      <Box sx={{ marginTop: "2%" }}>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default ItemList;
