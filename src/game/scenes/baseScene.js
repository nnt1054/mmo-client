import { Scene } from 'mini5-engine';

import {
	inputManagerObject,
} from '../gameObjects/'

class baseScene extends Scene {

	setup(args) {
		this.scaled = false;
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
		})
	}

	sceneFadeOut() {
		console.log('fading out');
	}

	draw(interpolationPercentage) {
		// if (!this.scaled) {
		// 	this.engine.context.scale(1.1, 1.1);
		// 	this.canvas.width = window.innerWidth;
		// 	this.canvas.height = window.innerHeight;
		// 	this.scaled = true;
		// }
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		super.draw(interpolationPercentage);
	}

}
 
export default baseScene;







// inputManager reads user input from the gameEngine
// gameObject reads from inputManager and calculates inputState
// networkManager reads the inputState and sends to the server