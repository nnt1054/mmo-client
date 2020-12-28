import { Scene } from 'mini5-engine';

import {
	inputManagerObject,
} from '../gameObjects/'

class baseScene extends Scene {

	setup(args) {
		this.inputManager = new inputManagerObject(this);
	}

	update(delta) {
		this.inputManager.update(delta);
		super.update(delta);
	}

	updateSocket() {
		console.log('updated socket!');
		this.engine.global.socket.on('gamestate', (data) => {
			this.gameState = data;
			console.log(this.gameState);
		})
	}

}
 
export default baseScene;







// inputManager reads user input from the gameEngine
// gameObject reads from inputManager and calculates inputState
// networkManager reads the inputState and sends to the server