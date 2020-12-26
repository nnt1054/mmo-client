import { Scene } from 'mini5-engine';

import { 
	backgroundObject,
	blockObject,
	playerObject,
	portalObject,
	bouncingBallObject,
	playerManagerObject
} from '../gameObjects/'

class baseScene extends Scene {

	setup(args) {
	}

	updateSocket() {
		this.engine.socket.on('gamestate', (data) => {
			this.gameState = data;
			// console.log(this.gameState);
		})
	}

}

export default baseScene;