import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Checkbox,
  Grid,
  Input,
  Paper,
  Stack,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AccessContext from "../context/AccessProvider";
import { AppContext } from "../store";
import { updateRoleList, updateToken, updateUser } from "../store/auth-new";

const Login = () => {
  const reduxState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const globalState = useContext(AppContext);
  console.log(globalState);

  const { accessToken, setAccessToken } = useContext(AccessContext);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [token, setToken] = useState("");

  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: "https://api-dev-overtime.assist.id/api/Masyarakats/login/",
      data: {
        email: email,
        password: password,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data?.id) {
          axios
            .get(
              "https://api-dev-overtime.assist.id/api/Masyarakats/ApiAfterLogin/",
              {
                headers: {
                  Authorization: res.data.id,
                },
              }
            )
            .then((resUser) => {
              console.log(resUser.data.data[0].nama);
              console.log(resUser);

              localStorage.setItem("token", res.data.id);

              alert("berhasil masuk");
              setEmail("");
              setPassword("");

              const menuAccess = resUser.data.data[0].Role.menuAccess;
              globalState.updater("auth", {
                roleList: menuAccess,
                user: resUser.data.data[0],
                token: res.data.id,
              });
              dispatch(updateRoleList(menuAccess));
              dispatch(updateUser(resUser.data.data[0]));
              dispatch(updateToken(res.data.id));
              if (menuAccess?.a5) {
                navigate("/datamasteradmin");
              }
              if (menuAccess?.a2 || menuAccess?.a3) {
                navigate("profilstaff");
              }
              console.log(resUser.data.data[0].Role.menuAccess);
              if (res.data.data) {
              }
            });
        }
      })

      .catch((err) => {
        console.log(err);
        const error = err.response.data;
        if (error?.email) {
          setEmailError(error.email);
        } else {
          setEmailError("");
          alert("gagal masuk password karena password salah");
        }
        if (error?.password) {
          setPasswordError(error.password);
        } else {
          setPasswordError("");
        }
      });
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Grid container justifyContent={"center"} spacing={2}>
      <Grid item xs={12} md={6} lg={4}>
        <img
          style={{
            width: 210,
            borderRadius: 500,
            margin: "0 auto",
            display: "block",
          }}
          src="ol.webp"
        />

        <Paper
          elevation={3}
          sx={{
            p: 9,
          }}
        >
          <Stack alignItems={"center"} spacing={1}>
            <img style={{ width: 180 }} src="logo.png" />

            <FormControl fullWidth variant="standard">
              <InputLabel
                // style={{ marginLeft: 10 }}
                htmlFor="standard-adornment-password"
              >
                Email
              </InputLabel>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                fullWidth
                // style={{ marginLeft: 10, width: 380 }}
              >
                email
                {emailError !== "" && <h1>{emailError}</h1>}
              </Input>
            </FormControl>
            <FormControl fullWidth variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              >
                {passwordError !== "" && <h1>{passwordError}</h1>}
              </Input>
            </FormControl>

            <Button
              onClick={handleLogin}
              type="submit"
              fullWidth
              style={{
                backgroundColor: "blueviolet",
                height: 40,
                borderRadius: 500,
              }}
            >
              <p
                style={{
                  fontSize: 12,
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Masuk
              </p>
            </Button>
          </Stack>
          <Link to="/khususstaff">
            <p style={{ textAlign: "center" }}>Daftar Akun Staff</p>
          </Link>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
