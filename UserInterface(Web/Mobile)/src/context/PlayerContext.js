import React, { createContext, useReducer } from "react";

/**
 * Player context for managing playback state and controls.
 */
export const PlayerContext = createContext();

const initialState = {
  queue: [],
  current: null,
  playing: false,
  shuffle: false,
  repeat: false,
  volume: 0.8
};

function playerReducer(state, action) {
  switch (action.type) {
    case "SET_QUEUE":
      return { ...state, queue: action.queue, current: action.queue[0] || null };
    case "PLAY":
      return { ...state, playing: true };
    case "PAUSE":
      return { ...state, playing: false };
    case "SKIP":
      if (!state.queue.length) return state;
      const curIdx = state.queue.findIndex((t) => t.id === state.current?.id);
      let nextIdx = action.direction === "back" ? curIdx - 1 : curIdx + 1;
      if (nextIdx < 0) nextIdx = 0;
      if (nextIdx >= state.queue.length) nextIdx = state.repeat ? 0 : state.queue.length - 1;
      return { ...state, current: state.queue[nextIdx], playing: true };
    case "SET_CURRENT":
      return { ...state, current: action.track, playing: true };
    case "SET_SHUFFLE":
      return { ...state, shuffle: action.shuffle };
    case "SET_REPEAT":
      return { ...state, repeat: action.repeat };
    case "SET_VOLUME":
      return { ...state, volume: action.volume };
    default:
      return state;
  }
}

// PUBLIC_INTERFACE
export function PlayerProvider({ children }) {
  const [state, dispatch] = useReducer(playerReducer, initialState);
  return (
    <PlayerContext.Provider value={{ state, dispatch }}>
      {children}
    </PlayerContext.Provider>
  );
}
