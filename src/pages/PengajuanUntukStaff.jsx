import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, Container, Grid } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
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
import { add, format, sub } from "date-fns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { TimePicker } from "@mui/x-date-pickers";
import axios from "axios";
import dayjs from "dayjs";
import React, { useContext, useEffect, useRef, useState } from "react";

import QueryString from "qs";
import { Link } from "react-router-dom";
import AccessContext from "../context/AccessProvider";
import { AppContext } from "../store";
import { isRejected } from "@reduxjs/toolkit";
const PengajuanUntukStaff = () => {
  const stateContext = useContext(AppContext);
  console.log("stateContext", stateContext);
  const token = stateContext.auth.token;
  const state = useContext(AppContext);

  const user = state.auth.user;
  console.log(state.auth.user);
  const nama = state.auth.user.nama;

  const [jamMulai, setJamMulai] = React.useState(new Date());
  const [jamSelesai, setJamSelesai] = React.useState(new Date());
  const [files, setFiles] = React.useState([]);
  const { setAccessToken } = useContext(AccessContext);
  const [setProfil] = useState({});
  const [selectedId, setSelectedId] = React.useState("");

  const [setOpenConfirmUbah] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [setNamaStaff] = React.useState([]);
  const [pengajuan, setPengajuan] = useState([]);

  // Membuat Function untuk Melogout
  const handleLogout = () => {
    setAccessToken(""); // Menghapuskan Access Token di Context
    setProfil({}); // Mengosongkan State Profil
  };
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

  const [bukakkan, setBukakkan] = React.useState(false);
  const handleBukakan = (_id) => {
    console.log(_id);
    setBukakkan(!open);
    setSelectedId(_id);
  };

  const formRefs = {
    _id: useRef(),
    reason: useRef(),
    dateOfFilling: useRef(),
    files: useRef(),
    startOverTime: useRef(),
    endOverTime: useRef(),
  };
  const [setForm] = useState({});
  const [dataEdit] = useState({});
  const [dataEditt, setDataEditt] = useState([]);
  const getPengajuan = async () => {
    let dateStart = sub(new Date(), {
      months: 1,
    });
    dateStart = format(dateStart, "yyyy-MM-dd") + " 00:00:00";
    let dateEnd = add(new Date(), {
      months: 12,
    });
    dateEnd = format(dateEnd, "yyyy-MM-dd") + " 23:59:59";
    const query = QueryString.stringify(
      {
        dateStart: dateStart,
        dateEnd: dateEnd,
        skip: 0,
        limit: 20,
        name: nama,
      },
      {
        encodeValuesOnly: true,
      }
    );
    console.log(query);
    await axios({
      method: "GET",
      url: "https://api-dev-overtime.assist.id/api/ReqOverTimes/view/?" + query,
      headers: {
        Authorization: token,
      },
    }).then((res) => {
      // res.data bentuknya
      // {  }
      console.log("data pengajuan", res.data);

      if (res.data.data) {
        // ini artinya kita mengisi data pengajuan dengan nilai yg diterima dari server
        setPengajuan(res.data.data);
      }
    });
  };
  useEffect(() => {
    getPengajuan();
  }, [nama]);

  console.log("hahahahha", dataEditt);
  let date = new Date();

  const handleSave = async () => {
    const startOverTime = formRefs.startOverTime.current.value;
    const endOverTime = formRefs.endOverTime.current.value;
    let dateStart = format(new Date(jamMulai), "yyyy-MM-dd HH:mm.ss ");
    console.log(dateStart);
    let dateEnd = format(new Date(jamSelesai), "yyyy-MM-dd HH:mm.ss ");
    console.log(dateEnd);

    const payload = {
      startOverTime: dateStart,
      endOverTime: dateEnd,
      files,
    };
    await axios({
      method: "POST",
      url: `https://api-dev-overtime.assist.id/api/ReqOverTimes/handOverWork/?id=${selectedId}`,
      headers: {
        Authorization: token,
      },
      data: payload,
    })
      .then((res) => {
        console.log(res.data);
        alert("telah menyimpan data laporan overtime");
        setForm({});
        getPengajuan();
      })
      .catch((err) => {
        // selain code 200 masuk ke catch
        // bentuk error itu object {}
        // untuk mendapatkan pesan error dari BE harus diakses objectnya untuk mengambil field message
        alert(
          "tidak bisa tambah dua kali data nya maaf",
          err.response.data.error.message
        );
      });
  };

  const handleCreate = async () => {
    const id = user.Staff._id;
    const reason = formRefs.reason.current.value;
    const dateOfFilling = formRefs.dateOfFilling.current.value;

    const payload = {
      id,
      reason,
      dateOfFilling,
    };
    console.log(payload);
    await axios({
      method: "POST",
      url: "https://api-dev-overtime.assist.id/api/ReqOverTimes/requstOverTime/",
      headers: {
        Authorization: token,
      },
      data: payload,
    })
      .then((res) => {
        console.log(res.data);
        alert("anda telah menambah data");
        setForm({});
        getPengajuan();
      })
      .catch((err) => {
        console.log(err.message);
        alert("data failed tidak ada data/atau data sudah di tambah");
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
    console.log(newValue.$d);
    setValue(newValue.$d);
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
  const hiasan = {
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
    height: 300,
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

  const pages = ["PengajuanLembur "];
  const pagesss = ["staff"];

  const settings = ["Profile", "Logout"];
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

  //ini untuk dialog tambah
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
  const [jam, setJam] = React.useState(dayjs("2014-08-18T21:11:54"));

  const handleTukar = (newValue) => {
    setJam(newValue);
  };

  return (
    <>
      {/* render kumpulan modal */}

      {/* render lainnya */}
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
                  {pagesss.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
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

              <Box
                sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
              ></Box>
              <Link
                to="/profilstaff"
                style={{
                  color: "white",
                  fontWeight: "bold",
                  textDecoration: "none",
                  marginRight: 40,
                  marginTop: 20,
                  marginLeft: 30,
                }}
              >
                Staff
              </Link>

              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <Link
                    to="/pengajuanuntukstaff"
                    style={{
                      marginRight: 700,
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

              <Button
                style={{
                  color: "white",
                  fontWeight: "bold",
                  marginTop: 18,
                  marginLeft: 50,
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
                      marginTop: 10,
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
                      onClick={handleClickTambah}
                    >
                      Tambah
                    </Button>
                    <Dialog
                      open={tambah}
                      TransitionComponent={Transitioon}
                      keepMounted
                      onClose={handleClickTambah}
                      aria-describedby="alert-dialog-slide-description"
                    >
                      <DialogTitle>
                        apakah kamu yakin ingin menambah data
                      </DialogTitle>
                      <DialogActions>
                        <Button onClick={handleTotok}>Tidak</Button>
                        <Button style={{ color: "red" }} onClick={handleCreate}>
                          Yakin
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                  <Button
                    onClick={() => handleClose}
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
                open={bukakkan}
                onClose={handleBukakan}
                onBackdropClick={handleBukakan}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={hiasan}>
                  <div>
                    <form
                      style={{
                        marginLeft: 160,
                        marginTop: 150,
                        position: "absolute",
                      }}
                      id="form"
                    >
                      <input
                        type="file"
                        onChange={(e) => {
                          files.push(e.target.files[0]);
                          setFiles(files);
                        }}
                      />
                    </form>
                  </div>
                  <Typography
                    style={{ textAlign: "center", fontWeight: "bold" }}
                    id="modal-modal-title"
                    variant="h5"
                    component="h2"
                  >
                    Laporan Selesai Overtime
                  </Typography>
                  <div
                    style={{
                      marginLeft: 10,
                      position: "absolute",

                      marginTop: 20,
                    }}
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="JamMulai"
                        value={jamMulai}
                        inputRef={formRefs.startOverTime}
                        defaultValue={dataEditt.startOverTime || ""}
                        ampm={false}
                        onChange={(newValue) => {
                          setJamMulai(newValue.$d);
                          console.log(newValue.$d);
                        }}
                      />
                    </LocalizationProvider>
                  </div>
                  <div style={{ marginTop: 24, marginLeft: 300 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="JamSelesai"
                        ampm={false}
                        value={jamSelesai}
                        inputRef={formRefs.endOverTime}
                        defaultValue={dataEditt.endOverTime || ""}
                        onChange={(newValue) => {
                          setJamSelesai(newValue.$d);
                          console.log(newValue.$d);
                        }}
                      />
                    </LocalizationProvider>
                  </div>

                  <Button
                    onClick={() => handleSave("simpan")}
                    style={{
                      backgroundColor: "blue",
                      color: "white",
                      marginLeft: 500,
                      marginTop: 170,
                    }}
                  >
                    Simpan
                  </Button>
                </Box>
              </Modal>

              <Box
                style={{ marginTop: 19, marginLeft: 2 }}
                sx={{ flexGrow: 1 }}
              >
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <MenuIcon style={{ color: "white", width: 180 }} />
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
                  <Link
                    to="/"
                    onClick={handleLogout}
                    style={{ marginLeft: 40 }}
                  >
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
                      Status Request
                    </StyledTableCell>

                    <StyledTableCell style={{ backgroundColor: "blue" }}>
                      Approved By
                    </StyledTableCell>
                    <StyledTableCell style={{ backgroundColor: "blue" }}>
                      Aksi
                    </StyledTableCell>
                    <StyledTableCell style={{ backgroundColor: "blue" }}>
                      Bukti Lembur
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
                    } else if (isRejected) {
                      statusPengajuan = "Rejected";
                    }
                    return (
                      <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                          {format(new Date(v.dateOfFilling), "dd/MM/yyyy")}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {user.nama}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {v.reason}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {format(new Date(v.startOverTime), "hh:mm")}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {format(new Date(v.endOverTime), "hh:mm")}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          <>{statusPengajuan}</>
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {v.approvedBy}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          <Button
                            onClick={() => handleDelete(user._id)}
                            variant="outlined"
                          >
                            <DeleteIcon style={{ color: "red" }} />
                          </Button>
                          {/* 
                          <Button onClick={handleClickOpen}>
                            {isEdit ? "Tambah" : "Ubah"}
                            <CreateIcon
                              onClick={isEdit ? handleUpdate : handleCreate}
                              style={{ color: "blue" }}
                            />
                          </Button> */}
                        </StyledTableCell>
                        <StyledTableCell>
                          <Button
                            style={{
                              color: "black",
                              fontWeight: "bold",
                              marginTop: 18,
                              marginLeft: 50,
                            }}
                            onClick={() => handleBukakan(v._id)}
                          >
                            <AddIcon />
                          </Button>
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

export default PengajuanUntukStaff;
