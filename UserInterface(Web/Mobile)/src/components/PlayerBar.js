import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import {
  AppBar,
  Toolbar,
  IconButton,
  Slider,
  Box,
  Typography
} from "@mui/material";
import {
  PlayArrow,
  Pause,
  SkipNext,
  SkipPrevious,
  Shuffle,
  Repeat,
  VolumeUp
} from "@mui/icons-material";

// PUBLIC_INTERFACE
/**
 * Persistent, accessible playback control bar for main app.
 */
const PlayerBar = () => {
  const { state, dispatch } = useContext(PlayerContext);
  const { current, playing, queue, shuffle, repeat, volume } = state;

  const handlePlayPause = () => {
    dispatch({ type: playing ? "PAUSE" : "PLAY" });
  };

  const handleSkip = (direction) => {
    dispatch({ type: "SKIP", direction });
  };

  const handleVolume = (e, newVal) => {
    dispatch({ type: "SET_VOLUME", volume: newVal });
  };

  return (
    <AppBar
      position="fixed"
      color="secondary"
      sx={{ top: "auto", bottom: 0, zIndex: 1201 }}
      component="nav"
      aria-label="Playback controls"
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle1" noWrap>
            {current ? `${current.title} — ${current.artist}` : "No track selected"}
          </Typography>
        </Box>
        <IconButton aria-label="Previous" onClick={() => handleSkip("back")}>
          <SkipPrevious />
        </IconButton>
        <IconButton
          aria-label={playing ? "Pause" : "Play"}
          onClick={handlePlayPause}
        >
          {playing ? <Pause /> : <PlayArrow />}
        </IconButton>
        <IconButton aria-label="Next" onClick={() => handleSkip("forward")}>
          <SkipNext />
        </IconButton>
        <IconButton
          aria-label={shuffle ? "Disable shuffle" : "Enable shuffle"}
          color={shuffle ? "primary" : "default"}
          onClick={() => dispatch({ type: "SET_SHUFFLE", shuffle: !shuffle })}
        >
          <Shuffle />
        </IconButton>
        <IconButton
          aria-label={repeat ? "Disable repeat" : "Enable repeat"}
          color={repeat ? "primary" : "default"}
          onClick={() => dispatch({ type: "SET_REPEAT", repeat: !repeat })}
        >
          <Repeat />
        </IconButton>
        <VolumeUp sx={{ ml: 2, mr: 0.5 }} />
        <Slider
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={handleVolume}
          sx={{ width: 100 }}
          aria-label="Volume"
        />
      </Toolbar>
    </AppBar>
  );
};

export default PlayerBar;
