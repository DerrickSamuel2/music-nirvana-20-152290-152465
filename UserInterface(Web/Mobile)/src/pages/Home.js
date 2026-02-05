import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Card, CardActionArea, CardContent } from "@mui/material";
import api from "../utils/api";

// PUBLIC_INTERFACE
/**
 * Home screen with featured playlists, top charts, and new releases.
 */
function Home() {
  const [featured, setFeatured] = useState([]);
  const [charts, setCharts] = useState([]);
  const [newReleases, setNewReleases] = useState([]);

  useEffect(() => {
    api.get("/home/featured").then(res => setFeatured(res.data || [])).catch(()=>setFeatured([]));
    api.get("/home/charts").then(res => setCharts(res.data || [])).catch(()=>setCharts([]));
    api.get("/home/new-releases").then(res => setNewReleases(res.data || [])).catch(()=>setNewReleases([]));
  }, []);

  const RenderList = ({ title, items }) => (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>{title}</Typography>
      <Grid container spacing={2}>
        {items.map((item) => (
          <Grid key={item.id} item xs={12} sm={6} md={3}>
            <Card>
              <CardActionArea tabIndex={0} aria-label={`Playlist: ${item.title}`}>
                {/* You may add artwork here */}
                <CardContent>
                  <Typography variant="subtitle1">{item.title}</Typography>
                  {item.artist && <Typography variant="body2" color="textSecondary">{item.artist}</Typography>}
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  return (
    <Box sx={{ p: 2 }}>
      <RenderList title="Featured Playlists" items={featured} />
      <RenderList title="Top Charts" items={charts} />
      <RenderList title="New Releases" items={newReleases} />
    </Box>
  );
}
export default Home;
