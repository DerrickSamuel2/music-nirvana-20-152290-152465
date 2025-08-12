import React, { useState } from "react";
import { Box, InputBase, IconButton, Paper, Typography, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import api from "../utils/api";

// PUBLIC_INTERFACE
/**
 * Search page for songs, albums, artists.
 */
function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const doSearch = async () => {
    if (!query.trim()) return;
    try {
      const res = await api.get(`/search`, { params: { q: query }});
      setResults(res.data || []);
    } catch (e) {
      setResults([]);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Paper component="form" onSubmit={e => (e.preventDefault(), doSearch())} sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <InputBase
          tabIndex={0}
          sx={{ ml: 2, flex: 1 }}
          placeholder="Search songs, albums, artists..."
          aria-label="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') doSearch(); }}
          inputProps={{ 'aria-label': 'Search input' }}
        />
        <IconButton type="submit" aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      {results.length > 0 && (
        <Grid container spacing={2}>
          {results.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.id}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1">{item.title}</Typography>
                <Typography variant="body2">{item.artist}</Typography>
                <Typography variant="body2">{item.album}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default Search;
