import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { Box, Tabs, Tab } from "@mui/material";
import Playlists from "./library/Playlists";
import RecentlyAdded from "./library/RecentlyAdded";
import LikedSongs from "./library/LikedSongs";

// PUBLIC_INTERFACE
/**
 * Library page with tabs for Playlists, Recently Added, Liked Songs.
 */
function Library() {
  const tabs = [
    { label: "Playlists", path: "playlists" },
    { label: "Recently Added", path: "recent" },
    { label: "Liked Songs", path: "liked" }
  ];
  let currentTab = 0;
  if (window.location.pathname.includes("recent")) currentTab = 1;
  else if (window.location.pathname.includes("liked")) currentTab = 2;

  return (
    <Box sx={{ p: 2 }}>
      <Tabs value={currentTab} aria-label="Library Sections">
        {tabs.map((tab, i) => (
          <Tab
            key={tab.label}
            component={NavLink}
            to={tab.path}
            label={tab.label}
            tabIndex={0}
          />
        ))}
      </Tabs>
      <Box sx={{ mt: 2 }}>
        <Routes>
          <Route path="playlists/*" element={<Playlists />} />
          <Route path="recent" element={<RecentlyAdded />} />
          <Route path="liked" element={<LikedSongs />} />
        </Routes>
      </Box>
    </Box>
  );
}
export default Library;
