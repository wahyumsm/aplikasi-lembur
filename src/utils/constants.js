export const JWT_TOKEN = localStorage.getItem("token") || "";

export const roles = {
  a1: "pengajuan lembur",
  a2: "pengajuanuntukstaff",
  a3: "profilstaff",
  a4: "pengajuanuntukadmin",
  a5: "datamasteradmin",
  a6: "register",
  a7: "laporan",
};

export const rolesOld = [
  {
    value: "pengajuan lembur",
    desc: "Melakukan Pengajuan Lembur",
  },
  {
    value: "pengajuanuntukstaff",
    desc: "Melakukan Pengajuan pada staf",
  },
  {
    value: "register",
    desc: "melakukan daftar",
  },
  {
    value: "datamasteradmin",
    desc: "melakukan lihat data master admin",
  },
  {
    value: "laporan",
    desc: "melakukan lihat laporan",
  },
  {
    value: "profilstaff",
    desc: "untuk profilpara staff",
  },
  {
    value: "pengajuanuntukadmin",
    desc: "melakukan pengajuan untuk admin",
  },
];
