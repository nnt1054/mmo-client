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
  let username = 'neil';

  if (process.env.REACT_APP_MODE === MODE_CLIENT) {
    username = await prompt("Please enter your name", "Harry Potter");
    let url = 'http://localhost:3000/manager/gameserver?scene=' + starting_scene;
    let socket = await setup_websocket(Game, url, username);
    Game.global.socket = socket;
    Game.currentScene.updateSocket();
  }

  Game.global.username = username;
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
async function setup_websocket(game, url, username) {
  let response = await fetch(url);
  let data = await response.json();

  console.log(data);
  let socket = await io(data.origin, {
    path: data.pathname,
    query:"name=" + username,
  });

  socket.on('connect', () => {
    console.log('connected!');
  });

  socket.on('heartbeat', (data) => {
    console.log(data);
  });

  // Things that interact with the scene can just be in base_scene class
  socket.on('playerTeleportStart', (data) => {
    // switch scene to transition scene
    game.currentScene.sceneFadeOut();
    // data includes which scene to switch to for preloading/transition data
    game.global.nextScene = data.scene_name;
    game.global.state = 'transitioning'
    console.log(data);    
  })

  socket.on('playerTeleportDestination', async (data) => {
    if (game.global.state != 'transitioning') {
      return;
    }
    // data includes dest servers scene_name, origin, path to establish ws connection
    // check if player in transition scene state
    // send websocket connection request with server
    // call connectToServer on new websocket(?)
    // let newSocket = await setup_websocket(game, data.url, game.global.username);
    let tempUrl = 'http://localhost:3000/manager/gameserver?scene=' + game.global.nextScene;
    let newSocket = await setup_websocket(game, tempUrl, game.global.username);
    game.forceSwitchScene(game.global.nextScene, {});
    game.global.oldSocket = game.global.socket;
    game.global.socket = newSocket;
    game.currentScene.updateSocket();
    game.global.oldSocket.close();
  })

  return socket
}

async function new_websocket(url, username) {
}

main();