import { createSlice } from '@reduxjs/toolkit'

export const playerStateSlice = createSlice({
  name: 'playerState',
  initialState: {
    status: 'idle',
    position: [0, 0],
    // x: 0,
    // y: 0,
  },
  reducers: {
    setPlayerState: (state, action) => {
    	state.status = action.payload
    },
    setPlayerPosition: (state, action) => {
    	state.position = action.payload
    },
  }
})

export const { setPlayerState, setPlayerPosition } = playerStateSlice.actions;
export const getPlayerState = state => state.playerState.status;
export const getPlayerPosition = state => state.playerState.position;

export default playerStateSlice.reducer;