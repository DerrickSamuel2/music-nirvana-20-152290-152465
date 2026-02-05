import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Library from "./pages/Library";
import Profile from "./pages/Profile";
import NavBar from "./components/NavBar";
import PlayerBar from "./components/PlayerBar";
import { Box } from "@mui/material";

// PUBLIC_INTERFACE
/**
 * Root component with navigation, player bar, and routed main content.
 */
function App() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
      }}
      tabIndex={-1}
      aria-label="Application main wrapper"
    >
      <NavBar />
      <Box
        component="main"
        sx={{ flex: 1, overflow: "auto", mt: 6, mb: 9 }}
        aria-label="Main content"
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/library/*" element={<Library />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Box>
      <PlayerBar />
    </Box>
  );
}
export default App;
