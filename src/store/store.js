import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './reducers/counterSlice';
import playerStateReducer from './reducers/playerStateSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    playerState: playerStateReducer,
  },
});