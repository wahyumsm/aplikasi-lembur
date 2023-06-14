import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditTwoToneIcon from "@mui/icons-material/Edit";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, Container, Grid } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
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
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import TextField from "@mui/material/TextField";

import React, { useContext, useEffect, useState } from "react";

import Slide from "@mui/material/Slide";

import axios from "axios";
import { useRef } from "react";
import { Link } from "react-router-dom";
import AccessContext from "../context/AccessProvider";
import { AppContext } from "../store";
import { JWT_TOKEN } from "../utils/constants";
import KonfirmasiDialog from "../components/KonfirmasiDialog";

const DataMasterAdmin = () => {
  const stateContext = useContext(AppContext);
  console.log("stateContext", stateContext);
  // const user = state.auth.user;
  // console.log(state.auth.user);
  // const nama = state.auth.user.nama;

  const token = stateContext.auth.token;
  const { setAccessToken } = useContext(AccessContext);
  const [profil, setProfil] = useState({});

  // boolean = true/false (ya/tidak)
  const [openDialogHapus, setOpenDialogHapus] = useState(false);

  function closeDialogHapus() {
    setOpenDialogHapus(false);
  }

  function handleOpenDialogHapus(id) {
    // id diterima dari tombol di bawah
    // true = ya
    // false = tidak
    setOpenDialogHapus(true);
    setDeleteId(id);
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAccessToken(""); // Menghapuskan Access Token di Context
    setProfil({}); // Mengosongkan State Profil
  };
  const formRefs = {
    password: useRef({}),
    nama: useRef({}),
    address: useRef({}),
    noHp: useRef({}),
    jabatan: useRef({}),
    _id: useRef({}),
    email: useRef({}),
  };

  const handleTetep = () => {
    setBukakk(false);
    setIsEdit(false);
  };
  const [bukakk, setBukakk] = React.useState(false);
  const handleBukak = () => {
    setBukakk(true);
    setIsEdit(false);
  };
  const handleClickOpen = () => {
    setBukakk(true);
  };

  const handleTutuip = () => {
    setBukakk(false);
  };

  const [bukakkk, setBukakkk] = React.useState(false);
  const handleBukakk = () => {
    setBukakkk(!open);
    setIsEdit(false);
  };

  const handleTutuop = () => {
    setBukakk(false);
  };

  const [editId, setEditId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [setOpenConfirmUbah] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [dataMaster, setDataMaster] = React.useState([]);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nama, setNama] = useState("");
  const [namaError, setNamaError] = useState("");
  const [pengajuan, setPengajuan] = useState([]);
  const [form, setForm] = useState({});
  const [dataEdit, setDataEdit] = useState({});
  console.log(dataEdit);

  const getPengajuan = async () => {
    console.log(JWT_TOKEN);
    axios({
      method: "GET",
      url: "https://api-dev-overtime.assist.id/api/Staffs/view?skip=0&limit=50",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        console.log(res.data);
        setDataMaster(res.data.data);
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
  const handleRegister = async () => {
    const nama = formRefs.nama.current.value;
    const email = formRefs.email.current.value;
    const password = formRefs.password.current.value;

    const payload = {
      nama,
      email,
      password,
    };
    console.log(payload);
    axios({
      method: "POST",
      url: "https://api-dev-overtime.assist.id/api/Masyarakats/register/",
      data: {
        email: email,
        password: password,
        nama: nama,
      },
      headers: {
        Authorization: token,
      },
      data: payload,
    })
      .then((res) => {
        alert("berhasil membuat akun Terima Kasih!!!");
        setEmail("");
        setPassword("");
        setNama("");
        handleTetep();
        setForm({});
      })
      .catch((err) => {
        const error = err.response.message;
        console.log("error ", error);
        alert(
          "akun ini telah terdaftar  dan dibuat tidak bisa di tekan dua kali"
        );
      });
  };

  const handleDelete = async () => {
    await axios({
      method: "POST",
      url:
        "https://api-dev-overtime.assist.id/api/Staffs/delete/?id=" + deleteId,
      headers: {
        Authorization: token,
      },
    }).then((res) => {
      if (res.data) {
        alert("Sukses Menghapus data");
        getPengajuan();

        // tutup konfirmasi dialog hapus
        setOpenDialogHapus(false);
        setDeleteId(null);
      }
    });
  };

  const handleEdit = (value) => {
    // value = bentuk yang dikirim dari tombol edit adalah object
    // ambil data yang diperlukan: address, noHp, jabatan
    // formRefs.address.current.value = value.address;
    // formRefs.noHp.current.value = value.noHp;
    // formRefs.jabatan.current.value = value.jabatan;

    setIsEdit(true);
    setOpenUbah(true);
    setDataEdit(value);
    setEditId(value._id);
  };
  // nutup modal edit
  const handleCloseEdit = () => {
    setIsEdit(false);
    setOpenUbah(false);
    // di sini harusnya data edit itu berupa object
    setDataEdit({});
    setEditId(null);
  };
  const handleUpdate = async () => {
    const address = formRefs.address.current.value;
    const noHp = formRefs.noHp.current.value;
    const jabatan = formRefs.jabatan.current.value;

    const payload = {
      address,
      noHp,
      jabatan,
    };
    console.log("editId", editId);
    await axios({
      method: "PUT",
      url: "https://api-dev-overtime.assist.id/api/Staffs/edit/?id=" + editId,
      data: payload,
      headers: {
        Authorization: token,
      },
    }).then((res) => {
      // ini respon ketika berhasil mengubah data
      alert("berhasil mengubah data");

      // memperbarui data pada tabel
      getPengajuan();

      // tutup modal ubah, sekaligus reset form
      handleCloseEdit();
    });
  };

  const passwordInside = async () => {
    axios({
      method: "POST",
      url: "https://api-dev-overtime.assist.id/api/Masyarakats/change-password?",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        if (res.data?.id) {
          alert("berhasil membuat akun");
          setEmail("");
          setPassword("");
          setNama("");
          setForm({});
        }
      })
      .catch((err) => {
        const error = err.response.data;
        alert("berhasil Mengubah Password");
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
    width: 320,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    height: 370,
  };
  const hiasanUbah = {
    position: "absolute",
    top: "55%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 440,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    height: 398,
  };

  const [buka, setBuka] = React.useState(false);
  const handleBuka = () => {
    setBuka(true);
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
  const [OpenUbah, setOpenUbah] = React.useState(false);
  const handleTutupUbah = () => {
    setOpenUbah(false);
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
  const settings = ["LupaPassword"];
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
    setDataMaster(event.target.value);
    console.log(setDataMaster);
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

  const lupaPassword = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    height: 300,
  };
  const [lupa, setLupa] = React.useState(false);
  const handleLupa = () => setLupa(true);
  const handleCloseLupa = () => setLupa(false);

  return (
    <>
      {/* KUMPULAN MODAL */}
      <KonfirmasiDialog
        open={openDialogHapus}
        onConfirm={handleDelete}
        onClose={closeDialogHapus}
        title="Hapus Data?"
        desc="Apakah kamu ingin menghapus data ini karena ini tindakan tidak bisa dibatalkan"
      />
      {/* KUMPULAN MODAL */}

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
                {laporan.map((laporan) => (
                  <Link
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      marginLeft: 60,
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
                      marginLeft: 50,
                      marginTop: 18,
                      textDecoration: "none",
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
              {/* {settings.map((settings) => (
                 <Button onClick={handleLupa}>Lupa Password</Button>
              <Modal
                open={lupa}
                onClose={handleCloseLupa}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={lupaPassword}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Lupa Password
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <TextField
                      style={{
                        width: 200,
                        position: "absolute",
                        marginTop: 10,
                        marginLeft: 30,
                      }}
                      id="outlined-basic"
                      label="Password Lama"
                      name="Password Lama"
                      variant="outlined"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                    />
                    <TextField
                      style={{
                        width: 200,
                        position: "absolute",
                        marginTop: 80,
                        marginLeft: 30,
                      }}
                      id="outlined-basic"
                      label="Password Baru"
                      name="Password Baru"
                      variant="outlined"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                    />
                  </Typography>
                </Box>
              </Modal>
              {settings}
              ))} */}
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <Link
                    to="/pengajuanuntukadmin"
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
                  backgroundColor: "green",
                  marginRight: 40,
                }}
                onClick={handleBukak}
              >
                <AddIcon />
                Buat AkunStaff
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
                    Tambah Akun Staff
                  </Typography>

                  <TextField
                    style={{
                      width: 200,
                      marginTop: 100,
                      position: "absolute",
                      marginLeft: 30,
                    }}
                    id="outlined-basic"
                    label="AlamatEmail"
                    name="email"
                    variant="outlined"
                    inputRef={formRefs.email}
                    defaultValue={dataEdit.email || ""}
                  />

                  <TextField
                    style={{
                      width: 200,
                      marginTop: 200,

                      marginLeft: 30,
                      position: "absolute",
                    }}
                    id="outlined-basic"
                    label="password"
                    name="password"
                    variant="outlined"
                    inputRef={formRefs.password}
                    defaultValue={dataEdit.password || ""}
                  />
                  <TextField
                    style={{
                      width: 200,
                      position: "absolute",
                      marginTop: 10,
                      marginLeft: 30,
                    }}
                    id="outlined-basic"
                    label="namaLengkap"
                    name="namaLengkap"
                    variant="outlined"
                    inputRef={formRefs.nama}
                    defaultValue={dataEdit.nama || ""}
                  />

                  <div>
                    <Button
                      onClick={handleTetep}
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        fontWeight: "bold",
                        marginTop: 300,
                        marginLeft: 10,
                        borderRadius: 100,
                        width: 100,
                      }}
                    >
                      Keluar
                    </Button>
                    <Button
                      style={{
                        backgroundColor: "blue",
                        color: "white",
                        marginTop: 300,
                        marginLeft: 39,
                        fontWeight: "bold",
                        position: "absolute",
                        borderRadius: 100,
                        width: 100,
                      }}
                      variant="outlined"
                      onClick={handleRegister}
                    >
                      Daftar
                    </Button>
                  </div>
                </Box>
              </Modal>
              <div style={{ marginLeft: 1300, position: "absolute" }}>
                <Modal
                  open={OpenUbah}
                  onClose={handleTutupUbah}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={hiasanUbah}>
                    <h1 style={{ textAlign: "center" }}>Ubah Staff</h1>

                    <TextField
                      style={{
                        width: 400,
                        position: "absolute",
                        marginLeft: 30,
                      }}
                      id="outlined-basic"
                      label="Address"
                      name="Address"
                      variant="outlined"
                      inputRef={formRefs.address}
                      defaultValue={dataEdit.address || ""}
                    />
                    <TextField
                      style={{
                        width: 400,
                        position: "absolute",
                        marginLeft: 30,
                        marginTop: 200,
                      }}
                      id="outlined-basic"
                      label="Role"
                      name="Role"
                      variant="outlined"
                      inputRef={formRefs.jabatan}
                      defaultValue={dataEdit.jabatan || ""}
                    />
                    <TextField
                      style={{
                        width: 400,
                        position: "absolute",
                        marginLeft: 30,
                        marginTop: 100,
                      }}
                      id="outlined-basic"
                      label="NoHp"
                      name="NoHp"
                      variant="outlined"
                      inputRef={formRefs.noHp}
                      defaultValue={dataEdit.noHp || ""}
                    />

                    <IconButton
                      style={{
                        backgroundColor: "blue",
                        marginLeft: 130,
                        width: 160,
                        marginTop: 270,
                        borderRadius: 100,
                      }}
                      onClick={handleBukakk}
                    >
                      <Button
                        style={{ color: "white" }}
                        variant="outlined"
                        onClick={handleUpdate}
                      >
                        UbahStaf
                      </Button>
                      {/* <Dialog
                        open={bukakkk}
                        onClose={handleTutuop}
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
                      </Dialog> */}
                    </IconButton>
                  </Box>
                </Modal>
              </div>
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
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                  <Link to="/" onClick={handleLogout} style={{ fontSize: 13 }}>
                    <h3
                      style={{
                        color: "black",
                        marginLeft: 30,
                      }}
                    >
                      Logout
                    </h3>
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
                      <h5 style={{ marginLeft: 90 }}>Address</h5>
                    </StyledTableCell>
                    <StyledTableCell style={{ backgroundColor: "blue" }}>
                      Role
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
                  {console.log(dataMaster)}
                  {dataMaster.map((v) => {
                    return (
                      <>
                        <StyledTableRow>
                          <StyledTableCell component="th" scope="row">
                            <h6>{v.email}</h6>
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            <h6>{v.name}</h6>
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            <h6>{v.address}</h6>
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            <h6>{v.jabatan}</h6>
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            <h6>{v.noHp}</h6>
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            <Button
                              onClick={() => handleOpenDialogHapus(v._id)}
                              autoFocus
                            >
                              <DeleteIcon style={{ color: "red" }} />
                            </Button>
                            <IconButton onClick={() => handleEdit(v)}>
                              <EditTwoToneIcon
                                style={{ color: "blue" }}
                              ></EditTwoToneIcon>
                            </IconButton>
                          </StyledTableCell>
                        </StyledTableRow>
                      </>
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

export default DataMasterAdmin;
