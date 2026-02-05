import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Switch,
  FormControlLabel
} from "@mui/material";
import api from "../utils/api";

// PUBLIC_INTERFACE
/**
 * Profile page for viewing/updating user info and settings.
 */
function Profile() {
  const { user, setUser } = useContext(AuthContext);
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [contrast, setContrast] = useState(false);

  // Load user profile settings
  useEffect(() => {
    api.get("/user/profile").then(res => {
      setProfile({ name: res.data?.name || "", email: res.data?.email || "" });
      // If backend provides accessibility settings, set here (e.g., res.data.highContrast)
    });
  }, []);

  // Save profile
  const saveProfile = async () => {
    await api.put("/user/profile", { name: profile.name, email: profile.email });
    setUser && setUser({ ...user, ...profile });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5">User Profile</Typography>
      <Divider sx={{ my: 2 }}/>
      <Box component="form" sx={{ maxWidth: 400 }}>
        <TextField
          fullWidth
          label="Name"
          margin="normal"
          value={profile.name}
          onChange={e => setProfile({...profile, name: e.target.value})}
        />
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={profile.email}
          onChange={e => setProfile({...profile, email: e.target.value})}
          disabled
        />
        <Button onClick={saveProfile} variant="contained" sx={{ mt: 1 }}>Update Profile</Button>
      </Box>
      <Divider sx={{ my: 3 }}/>
      <Typography variant="h6">Accessibility Settings</Typography>
      <FormControlLabel
        control={
          <Switch
            checked={contrast}
            onChange={e => setContrast(e.target.checked)}
            color="primary"
          />
        }
        label="High Contrast Mode"
      />
      {/* Extend with more accessibility/user preferences as needed */}
    </Box>
  );
}

export default Profile;
