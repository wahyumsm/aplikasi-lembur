import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Container, Tooltip } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import React, { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../store';

const pages = ['PengajuanLembur'];


const Topbar = () => {
  // ambil state dari context
  const globalState = useContext(AppContext);
  // ambil data user dari globalState
  const user = globalState.auth.user;
  console.log(user);
  let initialOpen = !user.Staff;

  //   kumpulan state
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [open, setOpen] = React.useState(initialOpen);
  const [isEdit, setIsEdit] = React.useState(false);
  const [dataEdit, setDataEdit] = React.useState({});
  const [profil, setProfil] = useState({});

  const formRefs = {
    id: useRef(),
    jabatan: useRef(),
    noHp: useRef(),
    address: useRef(),
  };

  // Membuat Function untuk Melogout
  const handleLogout = () => {
    localStorage.removeItem('token');
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpen = () => {
    setOpen(!open);
    setIsEdit(false);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img style={{ width: 100 }} src="logo.png" />
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
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
              color: 'white',
              fontWeight: 'bold',
              textDecoration: 'none',
              marginLeft: 120,
              marginTop: 20,
              position: 'absolute',
            }}
          >
            Staff
          </Link>
          <Box
            style={{ marginLeft: 100, fontSize: 21 }}
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
          >
            {pages.map((page) => (
              <Link
                to="/pengajuanuntukstaff"
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  marginTop: 18,
                  textDecoration: 'none',
                }}
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',

                  fontWeight: 'bold',
                }}
              >
                {page}
              </Link>
            ))}
          </Box>

          <div style={{ marginLeft: 1200, position: 'absolute' }}>
            <Button
              style={{
                color: 'white',
                fontWeight: 'bold',
                marginTop: 24,
              }}
              onClick={handleOpen}
            >
              <AddIcon />
              TAMBAH BIODATA
            </Button>
          </div>

          <Box style={{ marginTop: 19, marginLeft: 1000 }} sx={{ flexGrow: 1 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <MenuIcon style={{ color: 'white', width: 180 }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Link to="/" onClick={handleLogout} style={{ fontSize: 10 }}>
                <h3 style={{ color: 'black' }}>Logout</h3>
              </Link>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Topbar;
