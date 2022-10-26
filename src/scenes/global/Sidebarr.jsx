import React from "react";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import { useSelector } from "react-redux";
import UserProfiler from "../../components/UserProfiler";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";

const sideListItems = [
  { id: 1, text: "Dashboard", icon: <HomeOutlinedIcon />, link: "/" },
  { id: 2, subdivision: true, text: "Data" },
  {
    id: 3,
    text: "Manage Team",
    icon: <PeopleOutlinedIcon />,
    link: "/team",
  },

  {
    id: 4,
    text: "Manage Posts",
    icon: <DynamicFeedIcon />,
    link: "/posts",
  },
  { id: 5, subdivision: true, text: "Pages" },
  {
    id: 6,
    text: "Write Post",
    icon: <ContactsOutlinedIcon />,
    link: "/write",
  },
];

const drawerItems = (
  <div>
    {sideListItems.map((item) => {
      return (
        <React.Fragment key={item.id}>
          {item.subdivision ? (
            <>
              <Divider />
              <Box sx={{ ml: 2, mt: 2 }}>
                <Typography
                  sx={{
                    textTransform: "uppercase",
                    fontWeight: "bold",
                  }}
                  variant="button"
                  display="block"
                  gutterBottom
                >
                  {item.text}
                </Typography>
              </Box>
            </>
          ) : item.divider ? (
            <Divider />
          ) : (
            <nav aria-label="side list items">
              <List sx={{ p: 0 }}>
                <Link
                  to={item.link}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItem disablePadding>
                    <ListItemButton active={`${item.text}`}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText>{item.text}</ListItemText>
                    </ListItemButton>
                  </ListItem>
                </Link>
              </List>
            </nav>
          )}
        </React.Fragment>
      );
    })}
  </div>
);

const drawerWidth = 240;

const Sidebarr = ({ mobileOpen, handleDrawerToggle }) => {
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        minHeight: "100vh",
        overflow: "scroll",
        overflowY: "auto",
        backgroundColor: "#151632",
      }}
      aria-label="sidebar navigation list items"
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        <UserProfiler
          myname={currentUser?.username}
          myimage={currentUser?.profilePic}
          alt={currentUser?.username}
        />
        <Divider />
        {drawerItems}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        <UserProfiler
          myname={currentUser?.username}
          myimage={currentUser?.profilePic}
          alt={currentUser?.username}
        />
        <Divider />
        {drawerItems}
      </Drawer>
    </Box>
  );
};

export default Sidebarr;
