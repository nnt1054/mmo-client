import { Scene } from 'mini5-engine';

// import gameObjects
import { 
	backgroundObject,
	blockObject,
	playerObject,
	portalObject,
} from '../gameObjects/'

class area01 extends Scene {

	setup(args) {
	    // instantiate game objects
	    var background = new backgroundObject(this);
	    var ground = new blockObject(this, this.canvas.width*2, 32, -this.canvas.width, this.canvas.height - 32);
	    var floating = new blockObject(this, this.canvas.width/2, 32, 0, this.canvas.height/2);
	    var portalToTestScene = new portalObject(this, 'testScene', 80, 100, 700, 268)
	    var player = new playerObject(this);

	    // create layers
	    this.layerOrder = ['layer1', 'layer2', 'layer3'];
	    this.layers = {
	    	'layer1': [background],
	    	'layer2': [ground, floating, portalToTestScene],
	    	'layer3': [player],
	    }

	    // create collision tag lists
	    this.staticObjects = [ground.AABB, floating.AABB];
	    this.portalObjects = [portalToTestScene.AABB];

	    // add initial game objects
	    this.gameObjects = [background, player, portalToTestScene];
	}

}

export default area01;