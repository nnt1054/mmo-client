import React, { Component, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  selectCount,
} from '../store/reducers/counterSlice';
import {
  setPlayerState,
  getPlayerState,
  getPlayerPosition,
} from '../store/reducers/playerStateSlice';

function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <div>
      <h1> count: { count } </h1>
      <button
        aria-label="Increment value"
        onClick={() => dispatch(increment())}
      > + </button>
    </div>
  )
}

function PlayerStateUI() {
  const playerState = useSelector(getPlayerState);
  const playerPosition = useSelector(getPlayerPosition);

  return (
    <div>
      <h1> status: { playerState } </h1>
      <h1> x: { playerPosition[0] } y: { playerPosition[1] } </h1>
    </div>
  )

}

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1> hello! </h1>
        <Counter />
        <PlayerStateUI />
      </div>
    );
  }
}

export default App;