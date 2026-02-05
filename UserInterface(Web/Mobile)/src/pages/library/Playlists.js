import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from "@mui/material";
import { Delete, Edit, LibraryAdd, Add } from "@mui/icons-material";
import api from "../../utils/api";

// PUBLIC_INTERFACE
/**
 * Playlist listing and management (create, edit, delete, add/remove songs).
 */
function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [dialog, setDialog] = useState({ open: false, mode: "", playlist: null });
  const [form, setForm] = useState({ name: "" });

  // Load all playlists
  const fetchPlaylists = () => {
    api.get("/library/playlists").then(res => setPlaylists(res.data || []));
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  // Open dialog for create/edit
  const openDialog = (mode, playlist = null) => {
    setDialog({ open: true, mode, playlist });
    setForm({ name: playlist?.name || "" });
  };
  const closeDialog = () => setDialog({ open: false, mode: "", playlist: null });

  // Create or edit playlist
  const handleSave = async () => {
    if (dialog.mode === "create") {
      await api.post("/library/playlist", { name: form.name });
    } else if (dialog.mode === "edit" && dialog.playlist) {
      await api.put(`/library/playlist/${dialog.playlist.id}`, { name: form.name });
    }
    fetchPlaylists();
    closeDialog();
  };

  // Delete playlist
  const handleDelete = async (pl) => {
    await api.delete(`/library/playlist/${pl.id}`);
    fetchPlaylists();
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
        <Typography variant="h5" sx={{ flex: 1 }}>My Playlists</Typography>
        <Button
          startIcon={<Add />}
          onClick={() => openDialog("create")}
          variant="contained"
        >
          New Playlist
        </Button>
      </Box>
      <Grid container spacing={2}>
        {playlists.map((pl) => (
          <Grid item xs={12} sm={6} md={4} key={pl.id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">{pl.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {pl.songs?.length || 0} songs
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton aria-label="Edit" onClick={() => openDialog("edit", pl)}>
                  <Edit />
                </IconButton>
                <IconButton aria-label="Delete" onClick={() => handleDelete(pl)}>
                  <Delete />
                </IconButton>
                {/* Additional controls (Add/Remove songs) can be placed here */}
                <IconButton aria-label="Add Songs">
                  <LibraryAdd />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={dialog.open} onClose={closeDialog}>
        <DialogTitle>
          {dialog.mode === "create" ? "Create Playlist" : "Edit Playlist"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            autoFocus
            label="Playlist Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            fullWidth
            inputProps={{ maxLength: 64 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
export default Playlists;
