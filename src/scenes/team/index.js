import { Avatar, Box, Button, Typography, useTheme } from "@mui/material";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Team = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser]);
  // GET USERS FROM SERVER
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axios.get("/users");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getAllUsers();
  }, []);

  /////
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "_id", headerName: "ID" },
    {
      field: "profilePic",
      headerName: "Photo",
      flex: 1,
      renderCell: (params) => (
        <Box
          sx={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
          }}
        >
          <img
            src={params?.row?.profilePic}
            alt="title"
            sx={{ width: "100%", height: "100%" }}
          />
        </Box>
      ),
    },
    {
      field: "username",
      headerName: "Username",
      flex: 1,
      cellClassName: "username-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      cellClassName: "email-column--cell",
    },
    {
      field: "access",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { isAdmin } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              isAdmin ? colors.greenAccent[600] : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {isAdmin ? (
              <AdminPanelSettingsOutlinedIcon />
            ) : (
              <LockOpenOutlinedIcon />
            )}

            {isAdmin ? (
              <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                Admin
              </Typography>
            ) : (
              <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                User
              </Typography>
            )}
          </Box>
        );
      },
    },
    {
      field: "Action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <Button
          onClick={() => navigate(`/user/${params.row._id}`)}
          color="inherit"
        >
          View
        </Button>
      ),
    },
  ];
  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Box
        m="30px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .username-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .email-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
        }}
      >
        <DataGrid getRowId={(row) => row._id} columns={columns} rows={users} />
      </Box>
    </Box>
  );
};

export default Team;
