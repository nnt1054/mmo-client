import React from 'react';
import ReactDOM from 'react-dom';
import App from './ui/App';
import './ui/index.css';
import store from './store/store';
import { Provider } from 'react-redux';
import Game from './game/main'
// import { Engine, Scene, GameObject } from 'mini5-engine';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    	<App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

Game.start()