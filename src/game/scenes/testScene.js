import baseScene from './baseScene';
import {
	backgroundObject,
	blockObject,
	playerObject,
	portalObject,
	bouncingBallObject,
	playerManagerObject,
	inputManagerObject
} from '../gameObjects/'

class testScene extends baseScene {

	setup(args) {
		super.setup(args);

	    // instantiate game objects
	    var background = new backgroundObject(this);
	    var ground = new blockObject(this, 800*2, 32, -800, 400 - 32);
	    var floating = new blockObject(this, 800/2, 32, 800/2, 400/2);
	    var ball = new bouncingBallObject(this, 'blue');
	    var player = new playerObject(this);
	    var portal = new portalObject(this, 'testScene', 96, 128, 640, 72);

	    // instantiate Manager objects
	    var playerManager = new playerManagerObject(this);

	    // create layers
	    this.layerOrder = ['layer1', 'layer2', 'layer3'];
	    this.layers = {
	    	'layer1': [background],
	    	'layer2': [ground, floating, ball, portal],
	    	'layer3': [player, playerManager],
	    }

	    // create collision tag lists
	    this.staticObjects = [ground.AABB, floating.AABB];
	    this.portalObjects = [portal.AABB];

	    // add initial game objects
	    this.gameObjects = [background, player, ball, playerManager, portal];
	}

}

export default testScene;