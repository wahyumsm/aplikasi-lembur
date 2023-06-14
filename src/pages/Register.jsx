import { Box, Button, Checkbox, Input, Paper } from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AccessContext from "../context/AccessProvider";
import { JWT_TOKEN } from "../utils/constants";

const Register = () => {
  const { accessToken, setAccessToken } = useContext(AccessContext);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nama, setNama] = useState("");
  const [namaError, setNamaError] = useState("");

  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: "https://api-dev-overtime.assist.id/api/Masyarakats/register/",
      data: {
        email: email,
        password: password,
        nama: nama,
      },
      headers: {
        Authorization: JWT_TOKEN,
      },
    })
      .then((res) => {
        if (res.data?.id) {
          alert("berhasil masuk");
          setEmail("");
          setPassword("");
          setNama("");
          setAccessToken(res.data.id);
          navigate("/login");
        }
      })
      .catch((err) => {
        alert("Kesalahan jaringan");
        const error = err.response.data;
      });
  };

  return (
    <>
      {accessToken}
      <>
        <img
          style={{
            width: 210,
            position: "absolute",
            marginTop: 1,
            marginLeft: 639,

            borderRadius: 500,
          }}
          src="ol.webp"
        />

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 2,
              width: 400,
              height: 480,
              marginLeft: 69,
              marginTop: 29,
            },
          }}
        >
          <Paper elevation={3}>
            <img
              style={{ width: 180, marginLeft: 105, marginTop: 1 }}
              src="logo.png"
            />

            <p style={{ fontSize: 15, marginLeft: 38, fontWeight: "unset" }}>
              Email
            </p>

            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: 300,
                borderColor: "black",
                marginLeft: 40,
                borderRadius: 1,
                border: "1px solid black",
              }}
            >
              {emailError !== "" && <h1>{emailError}</h1>}
            </Input>
            <p style={{ fontSize: 15, marginLeft: 38, fontWeight: "unset" }}>
              Password
            </p>

            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: 300,
                borderColor: "black",
                marginLeft: 40,
                borderRadius: 1,
                border: "1px solid black",
              }}
            >
              {passwordError !== "" && <h1>{passwordError}</h1>}
            </Input>
            <p style={{ fontSize: 15, marginLeft: 38, fontWeight: "unset" }}>
              Nama Lengkap
            </p>

            <Input
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              style={{
                width: 300,
                borderColor: "black",
                marginLeft: 40,
                borderRadius: 1,
                border: "1px solid black",
              }}
            >
              {namaError !== "" && <h1>{namaError}</h1>}
            </Input>

            <div
              style={{ marginLeft: 29, marginTop: 10, position: "absolute" }}
            >
              <Checkbox></Checkbox>
            </div>
            <h5 style={{ marginLeft: 70, fontWeight: "inherit" }}>
              Ingat Saya
            </h5>
            <Button
              onClick={handleLogin}
              type="submit"
              style={{
                backgroundColor: "blueviolet",
                marginLeft: 40,
                width: 300,
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
                Daftar
              </p>
            </Button>
          </Paper>
        </Box>
      </>
    </>
  );
};

export default Register;
