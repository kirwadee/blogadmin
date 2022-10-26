import {
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { logoutUserThunk } from "../features/user/userSlice";
import useToggle from "../hooks/useToggle";
import SettingsIcon from "@mui/icons-material/Settings";
import { tokens } from "../theme";

const UserModal = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { el, open, handleClick, handleClose } = useToggle();
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUserThunk());
  };
  return (
    <Box sx={{ px: 1 }}>
      <Tooltip title="User settings">
        <IconButton id="basic-button" onClick={handleClick} color="inherit">
          <PersonOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu-button"
        anchorEl={el}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-menu-button",
        }}
      >
        <ListItem
          sx={{ pt: 0, pb: 1, backgroundColor: colors.blueAccent[900] }}
          alignItems="flex-start"
        >
          <ListItemAvatar>
            <Avatar alt={currentUser?.username} src={currentUser?.image} />
          </ListItemAvatar>
          <ListItemText
            primary={currentUser?.username}
            secondary={<Typography>{currentUser?.email}</Typography>}
          />
        </ListItem>

        <Box
          sx={{
            minWidth: 300,
            borderTop: "1px solid #ddd",
            backgroundColor: colors.blueAccent[900],
          }}
        >
          <List sx={{ p: 0 }}>
            <ListItem disablePadding>
              <ListItemButton
                LinkComponent={Link}
                to={`/profile/${currentUser?._id}`}
              >
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText>Manage Your Account</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText>Sign Out</ListItemText>
              </ListItemButton>
            </ListItem>
            <Divider />
          </List>
        </Box>
      </Menu>
    </Box>
  );
};

export default UserModal;
