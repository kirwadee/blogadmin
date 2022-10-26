import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Posts = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);
  // FETCHING POSTS
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://personofinterestadmin.herokuapp.com/api/posts"
        );
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "_id", headerName: "ID", flex: 0.5 },
    {
      field: "img",
      headerName: "Image",
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
            src={params.row.img}
            alt="title"
            sx={{ width: "100%", height: "100%" }}
          />
        </Box>
      ),
    },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "desc",
      headerName: "Post Description",
      flex: 2,
      cellClassName: "post-column--cell",
    },
    {
      field: "Action",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Button
          onClick={() => navigate(`/post/${params.row._id}`)}
          color="inherit"
        >
          View
        </Button>
      ),
    },
  ];
  return (
    <Box m="20px">
      <Header title="POSTS" subtitle="List of Posts Posted so far" />
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
          "& .name-column--cell": {
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
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          getRowId={(row) => row._id}
          checkboxSelection
          columns={columns}
          rows={posts}
        />
      </Box>
    </Box>
  );
};

export default Posts;
