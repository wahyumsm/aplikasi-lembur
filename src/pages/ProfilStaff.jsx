import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditTwoToneIcon from "@mui/icons-material/Edit";
import MenuIcon from "@mui/icons-material/Menu";
import { Alert, Button, Container, Grid, Tooltip } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import { alpha, styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import QueryString from "qs";
import AccessContext from "../context/AccessProvider";
import { AppContext } from "../store";

const ProfilStaff = () => {
  const stateContext = useContext(AppContext);
  console.log("stateContext", stateContext);
  const token = stateContext.auth.token;
  const { setAccessToken } = useContext(AccessContext);
  const [profil, setProfil] = useState({});

  // Membuat Function untuk Melogout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setAccessToken(""); // Menghapuskan Access Token di Context
    setProfil({}); // Mengosongkan State Profil
  };
  const state = useContext(AppContext);
  const user = state.auth.user;
  console.log(state.auth.user);

  const [tambahId, setTambahId] = useState("");
  const [setDeleteId] = useState("");
  const [form, setForm] = useState({});
  const [staff, setStaff] = useState([]);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [setEditId] = useState("");
  const [setOpenConfirmUbah] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  console.log(dataEdit);

  const formRefs = {
    id: useRef(),
    jabatan: useRef(),
    noHp: useRef(),
    address: useRef(),
  };
  const getStaff = async () => {
    const query = QueryString.stringify({});
    console.log(query);
    axios({
      method: "GET",
      url:
        "https://api-dev-overtime.assist.id/api/Staffs/view?skip=0&limit=50" +
        query,
      headers: {
        Authorization: token,
      },
    }).then((res) => {
      console.log(res.data);
      if (res.data.data) {
        setStaff(res.data.data);
      }
    });
  };
  useEffect(() => {
    getStaff();
  }, []);

  const handleDelete = async (_id) => {
    console.log(_id);

    await axios({
      method: "POST",
      url: "https://api-dev-overtime.assist.id/api/Staffs/delete/?id=" + _id,
      headers: {
        Authorization: token,
      },
    }).then((res) => {
      if (res.data) {
        alert("Sukses Menghapus data");
      }
    });
  };

  const handleCreate = async () => {
    const id = formRefs.id.current.value;
    const address = formRefs.address.current.value;
    const jabatan = formRefs.jabatan.current.value;
    const noHp = formRefs.noHp.current.value;
    const payload = {
      id,
      address,
      jabatan,
      noHp,
    };
    console.log(payload);

    axios({
      method: "POST",
      url: "https://api-dev-overtime.assist.id/api/Staffs/add/?id=" + user._id,
      headers: {
        Authorization: token,
      },
      data: payload,
    })
      .then((res) => {
        console.log(res.data);
        alert("anda telah menambah data");
        setForm({});
        getStaff();
      })
      .catch((err) => {
        alert(
          "Bahwa Data atas nama ini telah di daftar kan jadi jangan daftar kan lagi maaf yah ",
          err.response.data.error.message
        );
        //   err.response.data.error.message
        // <Alert severity="error">(err.response.data.error.message)</Alert>;
      });
  };
  //INI FUNGSI UNTUK MEMBUKA HALAMAN PADA EDIT
  const handleEdit = (value) => {
    setIsEdit(true);
    setOpen(true);
    setDataEdit(value);
  };

  const handleUpdate = async () => {
    const jabatan = formRefs.jabatan.current.value;
    const noHp = formRefs.noHp.current.value;
    const payload = {
      jabatan,
      noHp,
    };
    console.log("hehe", dataEdit);
    const id = dataEdit._id;
    await axios({
      method: "PUT",
      url: "https://api-dev-overtime.assist.id/api/Staffs/edit/?id=" + id,
      data: payload,
      headers: {
        Authorization: token,
      },
    }).then((res) => {
      setForm({});
      getStaff();
      alert("anda telah mengubah data");
    });
  };

  const [value, setValue] = React.useState(new Date());
  const [storage, setStorage] = React.useState("");

  const handleTime = (newValue) => {
    setValue(newValue);
  };
  const [pilihan, setPilihan] = React.useState("");

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

  const handleNama = (event) => {
    setPilihan(event.target.value);
  };

  const style = {
    position: "absolute",
    top: "55%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    height: 390,
  };

  const handleClose = () => {
    setOpen(false);
    setIsEdit(false);
  };

  let initialOpen = !user.Staff;

  const [open, setOpen] = React.useState(initialOpen);
  const handleOpen = () => {
    setOpen(!open);
    setIsEdit(false);
  };

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

  const handleConfirmDelete = (id) => {
    setDeleteId(id);
    setOpenConfirmDelete(!openConfirmDelete);
  };
  const handleChangeState = (e) => {
    console.log(e.target.value);
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const [bukakk, setBukakk] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleTutuip = () => {
    setBukakk(false);
  };
  const hiasanModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    height: 400,
  };
  const [modalWoi, setModalWoi] = React.useState(false);
  const handleModal = () => setModalWoi(true);
  const handleTutupModal = () => setModalWoi(false);

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

              <Link
                to="/profilstaff"
                style={{
                  color: "white",
                  fontWeight: "bold",
                  textDecoration: "none",
                  marginLeft: 120,
                  marginTop: 20,
                  position: "absolute",
                }}
              >
                Staff
              </Link>
              <Box
                style={{ marginLeft: 100, fontSize: 21 }}
                sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
              >
                {pages.map((page) => (
                  <Link
                    to="/pengajuanuntukstaff"
                    style={{
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

                      fontWeight: "bold",
                    }}
                  >
                    {page}
                  </Link>
                ))}
              </Box>

              <div style={{ marginLeft: 1200, position: "absolute" }}>
                <Button
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    marginTop: 24,
                  }}
                  onClick={handleOpen}
                >
                  <AddIcon />
                  TAMBAH BIODATA
                </Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                      id="modal-modal-title"
                      variant="h5"
                      component="h2"
                    >
                      Tambah Staff
                    </Typography>

                    <Box
                      style={{
                        width: 500,
                        marginTop: 20,
                        marginLeft: 10,
                        position: "absolute",
                      }}
                    >
                      <TextField
                        disabled
                        style={{
                          width: 200,
                          position: "absolute",
                          marginLeft: 300,
                        }}
                        id="outlined-basic"
                        label="nama"
                        name="nama"
                        variant="outlined"
                        inputRef={formRefs.id}
                        defaultValue={dataEdit.id || ""}
                      />
                      <TextField
                        disabled
                        style={{
                          width: 200,
                          position: "absolute",
                          marginLeft: 300,
                          marginTop: 100,
                        }}
                        id="outlined-basic"
                        label="Email"
                        name="Email"
                        variant="outlined"
                        inputRef={formRefs.id}
                        defaultValue={dataEdit.id || ""}
                      />

                      <TextField
                        style={{
                          width: 200,
                          marginTop: 200,
                          position: "absolute",
                          marginLeft: 10,
                        }}
                        id="outlined-basic"
                        label="Jabatan"
                        name="jabatan"
                        variant="outlined"
                        inputRef={formRefs.jabatan}
                        defaultValue={dataEdit.jabatan || ""}
                      />

                      <TextField
                        style={{
                          width: 200,
                          marginTop: 100,
                          marginLeft: 10,
                          position: "absolute",
                        }}
                        id="outlined-basic"
                        label="address"
                        name="address"
                        variant="outlined"
                        inputRef={formRefs.address}
                        defaultValue={dataEdit.address || ""}
                      />

                      <TextField
                        style={{
                          width: 220,

                          position: "absolute",
                          marginLeft: 10,
                        }}
                        id="outlined-basic"
                        label="Nomor Hp"
                        name="noHp"
                        variant="outlined"
                        inputRef={formRefs.noHp}
                        defaultValue={dataEdit.noHp || ""}
                      />
                    </Box>

                    <IconButton
                      style={{
                        backgroundColor: "blue",
                        marginLeft: 260,
                        width: 160,
                        marginTop: 300,
                        borderRadius: 100,
                      }}
                      onClick={isEdit ? handleUpdate : handleCreate}
                    >
                      <Button
                        style={{ color: "white" }}
                        variant="outlined"
                        onClick={handleClickOpen}
                      >
                        {isEdit ? "Ubah" : "Tambah"} Staff
                      </Button>
                      <Dialog
                        open={bukakk}
                        onClose={handleTutuip}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            apakah kamu ingin mengubah data
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClickOpen} autoFocus>
                            iya
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </IconButton>
                  </Box>
                </Modal>
              </div>

              <Box
                style={{ marginTop: 19, marginLeft: 1000 }}
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
                      emailStaff
                    </StyledTableCell>
                    <StyledTableCell style={{ backgroundColor: "blue" }}>
                      Nama Staff
                    </StyledTableCell>

                    <StyledTableCell style={{ backgroundColor: "blue" }}>
                      Address
                    </StyledTableCell>
                    <StyledTableCell style={{ backgroundColor: "blue" }}>
                      Jabatan
                    </StyledTableCell>
                    <StyledTableCell style={{ backgroundColor: "blue" }}>
                      Nomor Hp
                    </StyledTableCell>
                    <StyledTableCell style={{ backgroundColor: "blue" }}>
                      Aksi
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody style={{ backgroundColor: "white" }}>
                  {console.log(user)}
                  <>
                    <StyledTableRow>
                      <StyledTableCell component="th" scope="row">
                        <h6>{user.email}</h6>
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        <h6>{user.nama}</h6>
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        <h6> {user.Staff && user.Staff.address}</h6>
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        <h6>{user.Staff && user.Staff.jabatan}</h6>
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        <h6>{user.Staff && user.Staff.noHp}</h6>
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        <Button
                          onClick={() => handleDelete(user._id)}
                          autoFocus
                        >
                          <DeleteIcon style={{ color: "red" }} />
                        </Button>
                        <IconButton onClick={() => handleEdit(user._id)}>
                          <EditTwoToneIcon
                            style={{ color: "blue" }}
                          ></EditTwoToneIcon>
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  </>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default ProfilStaff;
