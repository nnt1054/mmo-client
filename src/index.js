import React from 'react';
import ReactDOM from 'react-dom';
import App from './ui/App';
import './ui/index.css';
import store from './store/store';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import Game from './game/main'

async function main() { 
  console.log(process.env.REACT_APP_MODE);

  let starting_scene = 'testScene';

  Game.forceSwitchScene(starting_scene, {});
  let username = 'neil';

  username = await prompt("Please enter your name", "Harry Potter");
  let url = 'http://localhost:3000/manager/gameserver?scene=' + starting_scene;
  let socket = await setup_websocket(Game, url, username);
  Game.locals.socket = socket;
  Game.currentScene.updateSocket();
  Game.locals.username = username;
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
    game.locals.nextScene = data.scene_name;
    game.locals.state = 'transitioning'
    console.log(data);    
  })

  socket.on('playerTeleportDestination', async (data) => {
    if (game.locals.state != 'transitioning') {
      return;
    }
    // data includes dest servers scene_name, origin, path to establish ws connection
    // check if player in transition scene state
    // send websocket connection request with server
    // call connectToServer on new websocket(?)
    // let newSocket = await setup_websocket(game, data.url, game.locals.username);
    let tempUrl = 'http://localhost:3000/manager/gameserver?scene=' + game.locals.nextScene;
    let newSocket = await setup_websocket(game, tempUrl, game.locals.username);
    game.forceSwitchScene(game.locals.nextScene, {});
    game.locals.oldSocket = game.locals.socket;
    game.locals.socket = newSocket;
    game.currentScene.updateSocket();
    game.locals.oldSocket.close();
  })

  return socket
}

async function new_websocket(url, username) {
}

main();