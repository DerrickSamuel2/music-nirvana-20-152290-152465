import React, { useEffect, useState } from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import api from "../../utils/api";

// PUBLIC_INTERFACE
/**
 * List of liked songs in the user's library.
 */
function LikedSongs() {
  const [liked, setLiked] = useState([]);

  useEffect(() => {
    api.get("/library/liked").then(res => setLiked(res.data || []));
  }, []);

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>Liked Songs</Typography>
      <List>
        {liked.map(item => (
          <ListItem key={item.id} button tabIndex={0} aria-label={`Song: ${item.title}`}>
            <ListItemText primary={item.title} secondary={item.artist} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default LikedSongs;
