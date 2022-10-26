import { Box, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { tokens } from "../../theme";
import axios from "axios";

const UserView = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //  GET USER
  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`/users/${id}`);
      setUser(res.data);
    };
    getUser();
  }, [id]);

  return (
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Box
          component="img"
          width="200px"
          height="200px"
          bordeRadius="10px"
          src={user?.profilePic}
          alt={user?.username}
        />
        <Typography variant="h4" color={colors.greenAccent[600]}>
          {user.username}
        </Typography>
        <Typography variant="h5">{user.email}</Typography>
      </Box>
    </Box>
  );
};

export default UserView;
