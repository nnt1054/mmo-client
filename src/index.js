import React from 'react';
import ReactDOM from 'react-dom';
import App from './ui/App';
import './ui/index.css';
import store from './store/store';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import Game from './game/main'
// import { Engine, Scene, GameObject } from 'mini5-engine';

var username = prompt("Please enter your name", "Harry Potter");

const socket = io('http://localhost:8000', {query:'name=' + username});

socket.on('connect', () => {
	console.log(socket.id);
	console.log(socket.connected); // true
});

socket.on('heartbeat', (data) => {
	console.log(data);
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    	<App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

Game.username = username;
Game.addSocket(socket);
Game.start();