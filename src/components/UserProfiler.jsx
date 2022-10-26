import { Avatar, Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { tokens } from "../theme";

const UserProfiler = ({ myname, myimage, alt }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "7px",
        mb: 2,
        mt: 2,
      }}
    >
      <Avatar
        sx={{ width: "100px", height: "100px" }}
        src={myimage}
        alt={alt}
      />
      <Typography variant="h5" color={colors.greenAccent[400]}>
        {myname}
      </Typography>
    </Box>
  );
};

export default UserProfiler;
