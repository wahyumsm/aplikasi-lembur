import FilterListIcon from "@mui/icons-material/FilterList";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Button,
  Checkbox,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { alpha, styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// import XlsxPopulate from "xlsx-populate";
import axios from "axios";
import { add, format, sub } from "date-fns";
import QueryString from "qs";
import * as XLSX from "xlsx";
import { AppContext } from "../store";

const Laporan = () => {
  const stateContext = useContext(AppContext);
  console.log("stateContext", stateContext);
  const token = stateContext.auth.token;
  const [name, setName] = useState("");
  const [filterStatus, setFilterStatus] = React.useState([]);

  function handleChangeStatus(event) {
    const name = event.target.name;
    const value = event.target.value;

    // rencananya di array kita kumpulkan status mana aja yang checked / centang
    // apakah nama dia ada pada array filter status
    const exist = filterStatus.findIndex((status) => status === name);
    if (exist !== -1) {
      filterStatus.splice(exist, 1);
    } else {
      if (value === "on") {
        filterStatus.push(name);
      }
    }

    setFilterStatus(filterStatus);
    filterData();
  }

  const [Laporan, setLaporan] = useState([]);
  const getLaporan = async () => {
    axios({
      method: "GET",
      url: "https://api-dev-overtime.assist.id/api/DataOverTimes/laporanDataOverTime/?dateStart=2023-01-01+00:00:00&dateEnd=2023-01-28+23:59:59&skip=0&limit=20",
      headers: {
        Authorization: token,
      },
    }).then((res) => {
      console.log(res.data);

      if (res.data.data) {
        setLaporan(res.data.data);
      }
    });
  };
  useEffect(() => {
    if (token) getLaporan();
  }, [token]);

  const filterData = async () => {
    const newDateStart = format(dateStart, "yyyy-MM-dd 00:00:00");
    const newDateEnd = format(dateEnd, "yyyy-MM-dd 23:59:59");

    console.log("newDateStart", newDateStart);
    console.log("newDateEnd", newDateEnd);

    const query = QueryString.stringify({
      dateStart: newDateStart,
      dateEnd: newDateEnd,
      skip: 0,
      limit: 20,
      name: name,
      status: filterStatus,
    });
    console.log(query);
    axios({
      method: "GET",
      url:
        "https://api-dev-overtime.assist.id/api/DataOverTimes/laporanDataOverTime/?" +
        query,
      headers: {
        Authorization: token,
      },
    }).then((res) => {
      console.log(res.data.data);
      if (res.data.data) setLaporan(res.data.data);
    });
  };
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const [value, setValue] = React.useState(new Date());
  const handleTime = (newValue) => {
    setValue(newValue);
  };
  const [pilihan, setPilihan] = React.useState("");

  const handleNama = (event) => {
    setPilihan(event.target.value);
  };

  const style = {
    position: "absolute",
    top: "55%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 550,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    height: 200,
  };
  const [buka, setBuka] = React.useState(false);
  const handleBuka = () => {
    setBuka(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  let currentDate = new Date();
  let oneMonthBefore = new Date();
  oneMonthBefore.setMonth(currentDate.getMonth() - 1);
  const [dateStart, setDateStart] = React.useState(oneMonthBefore);
  const [dateEnd, setDateEnd] = React.useState(currentDate);

  const handleChange = (name) => (value) => {
    if (name === "dateStart") {
      setDateStart(() => value.$d);
    } else {
      setDateEnd(() => value.$d);
    }
  };

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
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const pages = ["PengajuanLembur"];
  const laporan = ["Laporan"];
  const settings = ["Profile", "Logout"];
  const dataMasterr = ["dataMaster"];
  const [anchorElNave, setAnchorElNave] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenuu = (event) => {
    setAnchorElNave(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [];
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const saveExcell = () => {
    let dateStart = sub(new Date(), {
      months: 1,
    });
    dateStart = format(dateStart, "yyyy-MM-dd") + " 00:00:00";
    let dateEnd = add(new Date(), {
      months: 12,
    });
    dateEnd = format(dateEnd, "yyyy-MM-dd") + " 23:59:59";
    const query = QueryString.stringify({
      dateStart,
      dateEnd,
      skip: 0,
      limit: 20,
    });
    axios({
      method: "GET",
      url:
        "https://api-dev-overtime.assist.id/api/DataOverTimes/laporanDataOverTime/?" +
        query,

      headers: {
        Authorization: token,
      },
    }).then((res) => {
      if (res.data) {
        const data = res.data.data;
        console.log("data", data);
        // map pada array digunakan untuk membentuk array baru
        // guna map untuk memanipulasi array tanpa mengubah array aslinya
        const populated = data.map((item) => ({
          Nama: item.data.name,
          "Tanggal Lembur": format(
            new Date(item.data.ReqOverTime.dateOfFilling),
            "dd/MM/yyyy"
          ),
          "Jam Mulai": item.data.ReqOverTime.startOverTime,
          "Jam Selesai": item.data.ReqOverTime.endOverTime,
          "Di Approve Oleh": item.data.ReqOverTime.approvedBy,
          "Total Jam Lembur": item.totalOverTime,
        }));
        console.log(populated);
        var wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(populated);
        XLSX.utils.book_append_sheet(wb, ws);
        XLSX.writeFile(wb, "hasil laporan lembur.xlsx");
      }
    });
  };
  useEffect(() => {
    getLaporan();
  }, []);

  return (
    <>
      <div className="row">
        <AppBar sty position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <img style={{ width: 100 }} src="logo.png" />
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenuu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNave}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>

              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {laporan.map((laporan) => (
                  <Link
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      marginLeft: 100,
                      marginTop: 18,
                      textDecoration: "none",
                    }}
                    to="/laporan"
                    key={laporan}
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      fontSize: 15,
                      marginLeft: 100,
                      fontWeight: "bold",
                    }}
                  >
                    {laporan}
                  </Link>
                ))}
              </Box>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {dataMasterr.map((dataMasterr) => (
                  <Link
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      marginTop: 18,
                      textDecoration: "none",
                      marginLeft: 39,
                    }}
                    to="/datamasteradmin"
                    key={dataMasterr}
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      fontSize: 15,
                      fontWeight: "bold",
                    }}
                  >
                    {dataMasterr}
                  </Link>
                ))}
              </Box>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <Link
                    to="/pengajuanuntukadmin"
                    style={{
                      marginRight: 600,
                      color: "white",
                      fontWeight: "bold",
                      marginTop: 18,
                      textDecoration: "none",
                    }}
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      fontSize: 15,
                      fontWeight: "bold",
                    }}
                  >
                    {page}
                  </Link>
                ))}
              </Box>

              <Box
                style={{ marginTop: 19, marginLeft: 250 }}
                sx={{ flexGrow: 1 }}
              >
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </div>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 128,
            height: 128,
          },
        }}
      >
        <Paper
          style={{
            width: 2000,
            height: 600,
            border: "4px solid #000",
            marginLeft: 20,
            marginTop: 60,
          }}
          elevation={1}
        >
          <Box>
            <TextField
              onChange={(e) => setName(e.target.value)}
              style={{
                marginTop: 30,
                marginLeft: 50,
                border: "2px solid #000",
                marginRight: 20,
                position: "absolute",
                backgroundColor: "ButtonFace",
              }}
              id="filled-basic"
              label="Filter"
            ></TextField>
            <Button onClick={filterData}>
              <FilterListIcon
                style={{
                  marginLeft: 400,
                  marginTop: 100,
                  position: "absolute",
                  color: "black",
                }}
              />
            </Button>
          </Box>

          <Box
            style={{
              backgroundColor: "ButtonFace",
              width: 260,
              height: 140,
              marginLeft: 670,
              border: "2px solid #000",
              position: "absolute",
              marginTop: 30,
            }}
          >
            <p style={{ marginLeft: 20, position: "absolute" }}> Status</p>

            <div style={{ position: "absolute", marginTop: 30 }}>
              <Checkbox
                name="isApproved"
                onChange={handleChangeStatus}
                style={{
                  marginLeft: 130,
                  position: "absolute",
                  marginTop: 10,
                }}
                {...label}
              />
              <p style={{ marginLeft: 168, marginTop: 20 }}>Approved</p>
            </div>

            <Checkbox
              name="isRejected"
              onChange={handleChangeStatus}
              style={{
                marginTop: 38,
                position: "absolute",
              }}
              {...label}
            />
            <p style={{ marginTop: 47, marginLeft: 40 }}>Rejected</p>

            <div>
              <Checkbox
                name="isDone"
                onChange={handleChangeStatus}
                style={{ marginTop: 5, position: "absolute", marginLeft: 130 }}
                {...label}
              />
              <p
                style={{ marginLeft: 170, marginTop: 14, position: "absolute" }}
              >
                Done
              </p>
            </div>
            <Checkbox
              name="isPending"
              onChange={handleChangeStatus}
              style={{ marginTop: 5, position: "absolute" }}
              {...label}
            />
            <p style={{ marginTop: 28, marginLeft: 40 }}>Pending</p>
          </Box>
          <Box
            style={{
              backgroundColor: "ButtonFace",
              width: 300,
              // height: 200,
              marginLeft: 300,
              border: "2px solid #000",
              position: "absolute",
              marginTop: 30,
            }}
          >
            <p styl e={{ marginLeft: 30, position: "absolute" }}>
              Tanggal
            </p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack
                style={{ marginTop: 4, marginLeft: 19, marginRight: 19 }}
                spacing={3}
              >
                <MobileDatePicker
                  inputFormat="MM/DD/YYYY"
                  value={dateStart}
                  label="tanggal Mulai"
                  name="dateStart"
                  onChange={handleChange("dateStart")}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack
                style={{ marginTop: 10, marginLeft: 19, marginRight: 19 }}
                spacing={3}
              >
                <MobileDatePicker
                  inputFormat="MM/DD/YYYY"
                  value={dateEnd}
                  label="tanggal Selesai"
                  name="dateEnd"
                  onChange={handleChange("dateEnd")}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
            <Button
              variant="contained"
              sx={{ m: 2 }}
              size="small"
              onClick={filterData}
            >
              Filter Tanggal
            </Button>
          </Box>
          <Button
            onClick={saveExcell}
            style={{
              backgroundColor: "blue",
              color: "white",
              marginLeft: 1300,
              marginTop: 20,
            }}
          >
            Export
          </Button>
          {/* <button type="button" onClick={saveAsExcel}>
              Download
            </button> */}
          <TableContainer
            style={{
              marginTop: 200,
              border: "3px solid #000",
              backgroundColor: "ButtonFace",
            }}
            component={Paper}
          >
            <Table aria-label="simple table">
              <TableHead style={{ border: "2px solid #000" }}>
                <TableRow>
                  <TableCell style={{ border: "1px solid #000" }}>
                    Tanggal lembur
                  </TableCell>
                  <TableCell style={{ border: "1px solid #000" }}>
                    Nama Staff
                  </TableCell>
                  <TableCell style={{ border: "1px solid #000" }}>
                    Jam Mulai
                  </TableCell>
                  <TableCell style={{ border: "1px solid #000" }}>
                    Jam Selesai
                  </TableCell>
                  <TableCell style={{ border: "1px solid #000" }}>
                    Approved By
                  </TableCell>
                  <TableCell style={{ border: "1px solid #000" }}>
                    Total Jam Lembur
                  </TableCell>
                  <TableCell style={{ border: "1px solid #000" }}>
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {console.log(Laporan)}
                {Laporan.map((v) => {
                  let statusPengajuan = "Pending";
                  if (v.data.ReqOverTime.isApproved) {
                    statusPengajuan = "Approved";
                  } else if (v.data.ReqOverTime.isPending) {
                    statusPengajuan = "Pending";
                  } else if (v.data.ReqOverTime.isRejected) {
                    statusPengajuan = "Rejected";
                  } else if (v.data.ReqOverTime.isDone) {
                    statusPengajuan = "done";
                  }
                  return (
                    <>
                      <TableRow>
                        <TableCell style={{ border: "1px solid #000" }}>
                          {format(
                            new Date(v.data.ReqOverTime.dateOfFilling),
                            "dd/MM/yyyy"
                          )}
                        </TableCell>
                        <TableCell style={{ border: "1px solid #000" }}>
                          {v.data.name}
                        </TableCell>
                        <TableCell style={{ border: "1px solid #000" }}>
                          {v.data.startOverTime === null
                            ? "-"
                            : format(new Date(v.data.startOverTime), "HH:mm")}
                        </TableCell>
                        <TableCell style={{ border: "1px solid #000" }}>
                          {v.data.endOverTime === null
                            ? "-"
                            : format(new Date(v.data.endOverTime), "HH:mm")}
                        </TableCell>
                        <TableCell style={{ border: "1px solid #000" }}>
                          {v.data.ReqOverTime.approvedBy}
                        </TableCell>
                        <TableCell style={{ border: "1px solid #000" }}>
                          {v.totalOverTime}
                        </TableCell>
                        <TableCell style={{ border: "1px solid #000" }}>
                          <>{statusPengajuan}</>
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </>
  );
};

export default Laporan;
