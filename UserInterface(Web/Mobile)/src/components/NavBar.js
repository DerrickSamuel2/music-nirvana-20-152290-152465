import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";

// PUBLIC_INTERFACE
/**
 * Persistent navigation bar for main app sections, with accessibility enhancements.
 */
function NavBar() {
  const location = useLocation();
  const navItems = [
    { label: "Home", path: "/" },
    { label: "Search", path: "/search" },
    { label: "Library", path: "/library" },
    { label: "Profile", path: "/profile" }
  ];

  return (
    <AppBar position="fixed" color="secondary" sx={{ top: 0 }}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1 }}
          aria-label="Music Nirvana 2.0"
        >
          Music Nirvana
        </Typography>
        {navItems.map(({ label, path }) => (
          <Button
            key={label}
            component={NavLink}
            to={path}
            color={location.pathname === path ? "primary" : "inherit"}
            tabIndex={0}
            sx={{
              ml: 2,
              fontWeight: location.pathname === path ? "bold" : "normal",
              "&.active": { fontWeight: "bold", color: "primary.main" }
            }}
            aria-label={`Navigate to ${label}`}
          >
            {label}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
