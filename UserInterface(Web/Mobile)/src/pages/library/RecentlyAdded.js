import React, { useEffect, useState } from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import api from "../../utils/api";

// PUBLIC_INTERFACE
/**
 * Recently added songs in the user's library.
 */
function RecentlyAdded() {
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    api.get("/library/recent").then(res => setRecent(res.data || []));
  }, []);

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>Recently Added</Typography>
      <List>
        {recent.map(item => (
          <ListItem key={item.id} button tabIndex={0} aria-label={`Song: ${item.title}`}>
            <ListItemText primary={item.title} secondary={item.artist} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default RecentlyAdded;
