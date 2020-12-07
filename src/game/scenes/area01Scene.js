import { Scene } from 'mini5-engine';

// import gameObjects
import { 
	backgroundObject,
	blockObject,
	playerObject,
	portalObject,
	bouncingBallObject,
	playerManagerObject
} from '../gameObjects/'

class area01Scene extends Scene {

	setup(args) {

	    // instantiate game objects
	    var background = new backgroundObject(this);
	    var ground = new blockObject(this, 800*2, 32, -800, 400 - 32);
	    var floating = new blockObject(this, 800/2, 32, 800/2, 400/2);
	    var ball = new bouncingBallObject(this, 'blue');
	    var player = new playerObject(this);
	    var playerManager = new playerManagerObject(this);

	    var portalToArea03 = new portalObject(this, 'area03', 80, 100, 700, 100);

	    // create layers
	    this.layerOrder = ['layer1', 'layer2', 'layer3'];
	    this.layers = {
	    	'layer1': [background],
	    	'layer2': [ground, floating, ball, portalToArea03],
	    	'layer3': [player, playerManager],
	    }

	    // create collision tag lists
	    this.staticObjects = [ground.AABB, floating.AABB];
	    this.portalObjects = [portalToArea03.AABB];

	    // add initial game objects
	    this.gameObjects = [background, player, ball, playerManager];

	}

	updateSocket() {
		this.engine.socket.on('gamestate', (data) => {
			this.gameState = data;
			// console.log(this.gameState);
		})

		this.engine.socket.on('teleport', (data) => {
			// change to transition scene
			this.switchScene('transitionScene', {
				sceneName: data.sceneName,
			})
		})
	}

}

export default area01Scene;