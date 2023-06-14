import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ProfilStaff from "./pages/ProfilStaff";
import Laporan from "./pages/Laporan";
import PengajuanUntukAdmin from "./pages/PengajuanUntukAdmin";
import PengajuanUntukStaff from "./pages/PengajuanUntukStaff";
import DataMasterAdmin from "./pages/DataMasterAdmin";
import Register from "./pages/Register";
import AppContainer, { AppContext } from "./store";
import { roles } from "./utils/constants";
import { Provider } from "react-redux";
import { store } from "./store/index-new";

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer>
        <AppContext.Consumer>
          {({ auth: { roleList } }) => {
            console.log(roleList);

            return (
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/laporan" element={<Laporan />} />
                  <Route
                    path="/pengajuanuntukadmin"
                    element={<PengajuanUntukAdmin />}
                  />
                  <Route
                    path="/datamasteradmin"
                    element={<DataMasterAdmin />}
                  />
                  <Route path="/register" element={<Register />} />
                  {/* {roleList.a2 && ( */}
                  <Route path="/profilstaff" element={<ProfilStaff />} />
                  {/* )} */}
                  {/* {roleList.a3 && ( */}
                  <Route
                    path="/pengajuanuntukstaff"
                    element={<PengajuanUntukStaff />}
                  />
                  {/* )} */}
                </Routes>
              </BrowserRouter>
            );
          }}
        </AppContext.Consumer>
      </AppContainer>
    </Provider>
  );
};

export default App;
