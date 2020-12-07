import React from 'react';
import ReactDOM from 'react-dom';
import App from './ui/App';
import './ui/index.css';
import store from './store/store';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import Game from './game/main'
// import { Engine, Scene, GameObject } from 'mini5-engine';

async function main() { 
  let starting_scene = 'area01';
  let url = 'http://localhost:8081/gameserver?scene=' + starting_scene;

  let username = await prompt("Please enter your name", "Harry Potter");
  let socket = await setup_websocket(url, username);

  Game.forceSwitchScene(starting_scene, {});
  Game.username = username;
  Game.addSocket(socket);
  Game.start();

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

// returns socket object
async function setup_websocket(url, username) {
  let response = await fetch(url);
  let data = await response.json();

  // let socket = await io('http://localhost:8080', {query:'name=' + username});
  // console.log(socket);
  // var socket = io(window.location.origin, {
  //   path: window.location.pathname + 'socket.io',
  //   query:"name=" + username,
  // });

  console.log(data.pathname)
  let socket = await io(data.origin, {
    path: data.pathname,
    query:"name=" + username,
  });

  socket.on('connect', () => {
    console.log(this);
  });

  socket.on('heartbeat', (data) => {
    console.log(data);
  });

  socket.on('teleport', (data) => {
    console.log(data);
  })

  return socket
}

async function new_websocket(url, username) {
}

main();