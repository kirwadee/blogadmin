import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import Sidebarr from "./scenes/global/Sidebarr";
import Topbar from "./scenes/global/Topbar";
import Login from "./scenes/Login";
import PostView from "./scenes/post";
import Posts from "./scenes/posts";
import ProfileUpdate from "./scenes/profile";
import Team from "./scenes/team";
import UserView from "./scenes/user";
import Write from "./scenes/Write";
import { ColorModeContext, useMode } from "./theme";

const drawerWidth = 240;

function App() {
  const [theme, colorMode] = useMode();
  const { currentUser } = useSelector((state) => state.auth);

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {currentUser && (
            <Sidebarr
              mobileOpen={mobileOpen}
              handleDrawerToggle={handleDrawerToggle}
            />
          )}
          <Box
            component="main"
            className="content"
            sx={{
              flexGrow: 1,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
            }}
          >
            {currentUser && <Topbar handleDrawerToggle={handleDrawerToggle} />}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/user/:id" element={<UserView />} />
              <Route path="/profile/:id" element={<ProfileUpdate />} />
              <Route path="/login" element={<Login />} />
              <Route path="/write" element={<Write />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/post/:id" element={<PostView />} />
            </Routes>
          </Box>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
