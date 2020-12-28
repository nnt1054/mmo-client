import React from 'react';
import ReactDOM from 'react-dom';
import App from './ui/App';
import './ui/index.css';
import store from './store/store';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import Game from './game/main'

const MODE_LOCAL = 'local';
const MODE_CLIENT = 'client';

async function main() { 
  console.log(process.env.REACT_APP_MODE);

  let starting_scene = 'testScene';

  Game.forceSwitchScene(starting_scene, {});
  Game.global.username = "Neil :)"

  if (process.env.REACT_APP_MODE === MODE_CLIENT) {
    let username = await prompt("Please enter your name", "Harry Potter");
    let url = 'http://localhost:8081/gameserver?scene=' + starting_scene;
    let socket = await setup_websocket(url, username);
    Game.global.socket = socket;
    Game.currentScene.updateSocket();
  }

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

// PERSISTENT WEB SOCKET FUNCTIONS
// ... or all web socket functions?
// whatever doesn't need to be cleared between client connections

// returns socket object
async function setup_websocket(url, username) {
  let response = await fetch(url);
  let data = await response.json();

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

  // Things that interact with the scene can just be in base_scene class

  socket.on('playerTeleportStart', (data) => {
    // switch scene to transition scene
    // data includes which scene to switch to for preloading/transition data
  })

  socket.on('playerTeleportDestination', (data) => {
    // data includes dest servers scene_name, origin, path to establish ws connection
    // check if player in transition scene state
    // send websocket connection request with server
    // call connectToServer on new websocket(?)
  })

  return socket
}

async function new_websocket(url, username) {
}

main();