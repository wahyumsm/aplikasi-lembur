import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, Container, Grid } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import { alpha, styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import { format, isValid } from "date-fns";
import { Link } from "react-router-dom";

import React, { useContext, useEffect, useRef, useState } from "react";

import AccessContext from "../context/AccessProvider";
import { AppContext } from "../store";

const Admin = () => {
  const [id, setId] = React.useState("");
  const stateContext = useContext(AppContext);
  console.log("stateContext", stateContext);
  const token = stateContext.auth.token;
  const handleTetep = () => {
    setBukakk(false);
    setIsEdit(false);
  };
  const [bukakk, setBukakk] = React.useState(false);
  const handleBukak = () => {
    setBukakk(!open);
    setIsEdit(false);
  };
  const handleClickOpen = () => {
    setBukakk(true);
  };

  const handleTotop = () => {
    setBukakk(false);
    setIsEdit(false);
  };

  const [bukaYong, setBukaYong] = React.useState(false);
  const handleBukakan = () => {
    setBukaYong(!open);
    setIsUbah(false);
  };
  const handleUbahOpen = () => {
    setBuka(true);
  };

  const approvedd = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    height: 170,
  };
  const [approv, setApprov] = React.useState(false);
  const handleOpenApprov = (id) => {
    setId(id);

    return setApprov(true);
  };
  const handleTutupApprov = () => setApprov(false);

  const [OpenConfirmUbah, setOpenConfirmUbah] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isUbah, setIsUbah] = useState(false);
  const namaStafff = [
    {
      _id: "63bd83ea5a33c1df8c8cba6f",
      name: "Muhammad Yogi",
    },
    {
      _id: "63bd84b75a33c1df8c8cba70",
      name: "Ryan Fajri",
    },
    {
      _id: "63bd84b75a33c1df8c8cba70",
      name: "Zulfadli",
    },
    {
      _id: "63cf87d3a00389d6a7f3d4a3",
      name: "syarifah",
    },
  ];
  const [namaStaff, setNamaStaff] = React.useState([]);

  const [pengajuan, setPengajuan] = useState([]);

  const formRefs = {
    _id: useRef(),
    reason: useRef(),
    dateOfFilling: useRef(),
  };
  const { setAccessToken } = useContext(AccessContext);
  const [profil, setProfil] = useState({});
  const handleLogout = () => {
    localStorage.removeItem("token");
    setAccessToken(""); // Menghapuskan Access Token di Context
    setProfil({}); // Mengosongkan State Profil
  };
  const [form, setForm] = useState({});
  const [dataEdit, setDataEdit] = useState({});
  const getPengajuan = async () => {
    axios({
      method: "GET",
      url: "https://api-dev-overtime.assist.id/api/ReqOverTimes/view/?dateStart=2023-01-01+00:00:00&dateEnd=2023-01-28+23:59:59&skip=0&limit=20",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        console.log(res.data);

        if (res.data.data) {
          setPengajuan(res.data.data);
        }
      })
      .catch((err) => alert("Anda belum login."));
  };
  useEffect(() => {
    if (token) getPengajuan();
  }, [token]);

  const handleCreate = async () => {
    const id = formRefs._id.current.value;
    const reason = formRefs.reason.current.value;
    const dateOfFilling = formRefs.dateOfFilling.current.value;

    const payload = {
      id,
      reason,
      dateOfFilling,
    };
    console.log(payload);
    axios({
      method: "POST",
      url: "https://api-dev-overtime.assist.id/api/ReqOverTimes/requstOverTime/",
      headers: {
        Authorization: token,
      },
      data: payload,
    }).then((res) => {
      console.log(res.data);
      alert("anda telah menambah data");
      setForm({});
      getPengajuan();
    });
  };

  const handleDelete = async (_id) => {
    console.log(_id);

    await axios({
      method: "POST",
      url:
        "https://api-dev-overtime.assist.id/api/ReqOverTimes/delete/?id=" + _id,
      headers: {
        Authorization: token,
      },
    }).then((res) => {
      if (res.data) {
        alert("Sukses Menghapus data");
        getPengajuan();
      }
    });
  };

  const handleUpdate = async () => {
    const reason = formRefs.reason.current.value;
    const dateOfFilling = formRefs.dateOfFilling.current.value;
    const payload = {
      reason,
      dateOfFilling,
    };
    console.log(payload);
    axios({
      method: "POST",
      url: "https://api-dev-overtime.assist.id/api/ReqOverTimes/edit/?id=",
      data: payload,
      headers: {
        Authorization: token,
      },
    }).then((res) => {
      if (res.data) {
        setForm({});
        setOpenConfirmUbah(false);
        getPengajuan();
      }
    });
  };
  const handleApprove = async (action) => {
    axios({
      method: "POST",
      url: `https://api-dev-overtime.assist.id/api/ReqOverTimes/submitApproval/?id=${id}&action=${action}`,
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        console.log(res.data);
        alert("anda berhasil");
      })
      .catch((err) => {
        alert(err.response.data.error.message);
      });
  };
  const approved = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

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
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
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
  const dataMasterr = ["dataMaster"];
  const pagesss = ["managementStaff"];
  const laporan = ["Laporan"];

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

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const rows = [];
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const handleSelect = (event) => {
    setNamaStaff(event.target.value);
    console.log(setNamaStaff);
  };
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const [buukaa, setBuukaa] = React.useState(false);

  const handleClickBuka = () => {
    setBuukaa(true);
  };

  const handleTutip = () => {
    setBuukaa(false);
  };

  //untuk hapus

  const Transitioin = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const [hapuss, setHapuss] = React.useState(false);

  const handleHapuss = () => {
    console.log("Hapus Data");
    setHapuss(true);
  };

  const handleTitip = () => {
    setHapuss(false);
  };

  //ini untuk dialog P
  const Transitioon = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const [tambah, setTambah] = React.useState(false);

  const handleClickTambah = () => {
    setTambah(true);
  };

  const handleTotok = () => {
    setTambah(false);
  };
  const dapatkanJam = (tanggalnya) => {
    if (tanggalnya) {
      // Jika Ada Tanggalnya
      const date = new Date(tanggalnya);
      return date.toLocaleString("id-ID", {
        timeZone: "Asia/Jakarta",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      });
    }
  };
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
                ></Menu>
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
                {dataMasterr.map((dataMasterr) => (
                  <Link
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      marginLeft: 170,

                      textDecoration: "none",
                      position: "absolute",
                    }}
                    to="/datamasteradmin"
                    key={dataMasterr}
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      fontSize: 15,
                      marginLeft: 90,
                      fontWeight: "bold",
                    }}
                  >
                    {dataMasterr}
                  </Link>
                ))}
              </Box>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {laporan.map((laporan) => (
                  <Link
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      textDecoration: "none",

                      marginRight: 100,
                      marginTop: 21,
                    }}
                    to="/laporan"
                    key={laporan}
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      fontSize: 15,
                      fontWeight: "bold",
                    }}
                  >
                    {laporan}
                  </Link>
                ))}
              </Box>
              <Link
                to="/pengajuanuntukadmin"
                style={{
                  color: "white",
                  fontWeight: "bold",
                  textDecoration: "none",
                  marginRight: 640,
                  marginTop: 20,
                }}
              >
                Pengajuan Lembur
              </Link>

              <Button
                style={{
                  color: "white",
                  fontWeight: "bold",
                  marginTop: 18,
                  backgroundColor: "green",
                  marginRight: 40,
                }}
                onClick={handleBukak}
              >
                <AddIcon />
                tambah pengajuan
              </Button>
              <Modal
                open={bukakk}
                onClose={handleTetep}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    style={{ textAlign: "center", fontWeight: "bold" }}
                    id="modal-modal-title"
                    variant="h5"
                    component="h2"
                  >
                    Tambah Pengajuan
                  </Typography>

                  {/* INI PILIHAN STAFF NAMA */}
                  <Box
                    style={{
                      width: 200,
                      marginTop: 20,
                      marginLeft: 10,
                      position: "absolute",
                    }}
                  ></Box>

                  <TextField
                    style={{
                      width: 200,
                      position: "absolute",
                      marginTop: 90,
                    }}
                    id="outlined-basic"
                    label="alasan"
                    name="alasan"
                    variant="outlined"
                    inputRef={formRefs.reason}
                    defaultValue={dataEdit.reason || ""}
                  />
                  <Box
                    style={{
                      width: 200,
                      marginTop: 10,
                      position: "absolute",
                    }}
                  >
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Nama Staff
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Nama Staff"
                        onChange={handleSelect}
                        inputRef={formRefs._id}
                        value={namaStaff}
                      >
                        {namaStafff.map((v) => {
                          return <MenuItem value={v._id}>{v.name}</MenuItem>;
                        })}
                      </Select>
                    </FormControl>
                  </Box>
                  {/* INI PILIHAN TANGGAL */}
                  <Typography id="modal-modal-description">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Stack
                        style={{
                          width: 200,
                          marginLeft: 310,
                          position: "absolute",
                          marginTop: 9,
                        }}
                        spacing={1}
                      >
                        <DesktopDatePicker
                          label="Tanggal Overtime"
                          inputFormat="MM/DD/YYYY"
                          value={value}
                          onChange={handleTime}
                          renderInput={(params) => <TextField {...params} />}
                          inputRef={formRefs.dateOfFilling}
                          defaultValue={dataEdit.dateOfFilling || ""}
                        />
                      </Stack>
                    </LocalizationProvider>
                  </Typography>

                  <div>
                    <Button
                      style={{
                        backgroundColor: "blue",
                        color: "white",
                        marginTop: 140,
                        marginLeft: 460,
                        fontWeight: "bold",
                        position: "absolute",
                        borderRadius: 100,
                      }}
                      variant="outlined"
                      onClick={handleCreate}
                    >
                      Tambah
                    </Button>
                  </div>
                  <Button
                    onClick={handleClose}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      fontWeight: "bold",
                      marginTop: 140,
                      marginLeft: 360,
                      borderRadius: 100,
                    }}
                  >
                    Keluar
                  </Button>
                </Box>
              </Modal>
              <Modal
                open={bukaYong}
                onClose={handleTotop}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    style={{ textAlign: "center", fontWeight: "bold" }}
                    id="modal-modal-title"
                    variant="h5"
                    component="h2"
                  >
                    Ubah
                  </Typography>
                  <TextField
                    style={{
                      width: 200,
                      position: "absolute",
                      marginTop: 90,
                    }}
                    id="outlined-basic"
                    label="alasan"
                    name="alasan"
                    variant="outlined"
                    inputRef={formRefs.reason}
                    defaultValue={dataEdit.reason || ""}
                  />
                  {/* INI PILIHAN TANGGAL */}
                  <Typography id="modal-modal-description">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Stack
                        style={{
                          width: 200,
                          marginLeft: 310,
                          position: "absolute",
                          marginTop: 9,
                        }}
                        spacing={1}
                      >
                        <DesktopDatePicker
                          label="Tanggal Overtime"
                          inputFormat="MM/DD/YYYY"
                          value={value}
                          onChange={handleTime}
                          renderInput={(params) => <TextField {...params} />}
                          inputRef={formRefs.dateOfFilling}
                          defaultValue={dataEdit.dateOfFilling || ""}
                        />
                      </Stack>
                    </LocalizationProvider>
                  </Typography>

                  <div>
                    <Button
                      style={{
                        backgroundColor: "blue",
                        color: "white",
                        marginTop: 140,
                        marginLeft: 460,
                        fontWeight: "bold",
                        position: "absolute",
                        borderRadius: 100,
                      }}
                      variant="outlined"
                      onClick={handleCreate}
                    >
                      Tambah
                    </Button>
                  </div>
                  <Button
                    onClick={handleClose}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      fontWeight: "bold",
                      marginTop: 140,
                      marginLeft: 360,
                      borderRadius: 100,
                    }}
                  >
                    Keluar
                  </Button>
                </Box>
              </Modal>

              <Box
                style={{ marginTop: 19, marginLeft: 2 }}
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
                  <Link to="/" onClick={handleLogout} style={{ fontSize: 10 }}>
                    <h3 style={{ color: "black" }}>Logout</h3>
                  </Link>
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 408,
              height: 128,
              marginLeft: 70,
              marginTop: 30,
              borderRadius: 200,
            },
          }}
        ></Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 408,
              height: 128,
              marginLeft: 70,
              marginTop: 2,
              borderRadius: 200,
            },
          }}
        ></Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell style={{ backgroundColor: "blue" }}>
                      Tanggal Overtime
                    </StyledTableCell>

                    <StyledTableCell style={{ backgroundColor: "blue" }}>
                      Nama Staff
                    </StyledTableCell>
                    <StyledTableCell style={{ backgroundColor: "blue" }}>
                      Alasan
                    </StyledTableCell>

                    <StyledTableCell style={{ backgroundColor: "blue" }}>
                      Jam Mulai
                    </StyledTableCell>

                    <StyledTableCell style={{ backgroundColor: "blue" }}>
                      Jam Selesai
                    </StyledTableCell>
                    <StyledTableCell style={{ backgroundColor: "blue" }}>
                      Status
                    </StyledTableCell>

                    <StyledTableCell style={{ backgroundColor: "blue" }}>
                      Aksi
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody style={{ backgroundColor: "white" }}>
                  {console.log(pengajuan)}
                  {pengajuan.map((v) => {
                    let statusPengajuan = "Pending";
                    if (v.isApproved) {
                      statusPengajuan = "Approved";
                    } else if (v.isPending) {
                      statusPengajuan = "Pending";
                    } else if (v.isRejected) {
                      statusPengajuan = "Rejected";
                    }
                    return (
                      <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                          {format(new Date(v.dateOfFilling), "dd/MM/yyyy")}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          <h6>{v.name}</h6>
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          <h6>{v.reason}</h6>
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {/* {v.startOverTime}
                            {isValid(new Date(v.startOverTime)) &&
                              format(new Date(v.startOverTime, "HH:mm "))} */}
                          {/* {format(new Date(v.dateOfFilling), "dd/MM/yyyy")} */}
                          {dapatkanJam(v.startOverTime)}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {dapatkanJam(v.endOverTime)}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          <>{statusPengajuan}</>
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          <Button
                            onClick={() => handleDelete(v._id)}
                            variant="outlined"
                          >
                            <DeleteIcon style={{ color: "red" }} />
                          </Button>

                          <Button onClick={handleClickOpen}>
                            <CreateIcon
                              onClick={isEdit ? handleUpdate : handleCreate}
                              style={{ color: "blue" }}
                            />
                          </Button>

                          <div>
                            <Button onClick={() => handleOpenApprov(v._id)}>
                              <CheckIcon />
                            </Button>
                            <Modal
                              hideBackdrop
                              open={approv}
                              onClose={handleTutupApprov}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                            >
                              <Box sx={approvedd}>
                                <Typography
                                  style={{ textAlign: "center" }}
                                  id="modal-modal-title"
                                  variant="h5"
                                  component="h2"
                                >
                                  Konfirmasi Approve
                                </Typography>
                                <Typography
                                  id="modal-modal-description"
                                  sx={{ mt: 2 }}
                                >
                                  Apakah anda yakin untuk melakukan approve
                                  request ini?
                                </Typography>
                                <Button
                                  onClick={() => handleApprove("approve")}
                                  style={{
                                    backgroundColor: "blue",
                                    color: "white",
                                    marginLeft: 240,
                                    marginTop: 50,
                                    position: "absolute",
                                  }}
                                >
                                  Approve
                                </Button>
                                <Button
                                  onClick={() => handleApprove("reject")}
                                  style={{
                                    backgroundColor: "red",
                                    color: "white",
                                    marginLeft: 340,

                                    marginTop: 50,
                                    position: "absolute",
                                  }}
                                >
                                  Reject
                                </Button>
                              </Box>
                            </Modal>
                          </div>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Admin;
