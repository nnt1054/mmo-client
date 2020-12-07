import { GameObject } from 'mini5-engine';
import { useSelector, useDispatch } from 'react-redux';
import { default as store } from '../../store/store'
import { 
	setPlayerState,
	setPlayerPosition,
} from '../../store/reducers/playerStateSlice'
import {
	selectCount,
	increment,
} from '../../store/reducers/counterSlice'

class playerObject extends GameObject {

	constructor(scene) {
	    super(scene)
      	this.scene = scene;
  		this.update = this.update.bind(this);
  		this.draw = this.draw.bind(this);

  		this.x = 64;
  		this.y = 0;

  		this.xVel = 10;
  		this.yVel = 0;
  		this.gravity = 0.005;
  		this.jump = -1.5;
  		this.jumpTimer = 0;
  		this.AABB = this.createAABB(64, 64, this.x, this.y)

  		this.state = 'idle';
  		this.colors = {
  			'jumping': 'red',
  			'walking': 'yellow',
  			'idle': 'blue',
  		}

  		this.newCount = 0;
  		this.count = 0;
  		const handleCountListener = this.handleCountUpdate.bind(this);
  		this.countUnsubscribe = store.subscribe(handleCountListener);

  		this.inputState = {
  			xState: 'idle',
  			yState: 'idle',
  		};
  		this.sendUpdate = false;
	}

	handleCountUpdate() {
		this.newCount = selectCount(store.getState());
	}

	update(delta) {
		var w = 87,
			a = 65,
			s = 83,
			d = 68,
			space = 32,
			xDisp = 0,
			yDisp = 0;

		// need to sync this.gameState = {
		// 	state: 'jumping',
		// 	x: x,
		// 	y: y,
		// }
		// at what point do I uhhh uhhhhhhhhhhh
		// 1. detect client prediction new state based on input
		// 2. emit either input OR new game state? we can make an 'inputState' function
			// 2.1 what do i want to send to the server? the idea is to send input state that calculates the next state?
			// 2.2 uh send something along the lines of "movingLeft" or "movingRight", also "jumping"
		// 3. process server.gameState and double check if need to resync
			// 3.1 you can find this state in uh this.scene.gameState['playermanager'][this.scene.engine.username]

		var prev_xState = this.inputState.xState;
		// Client Side Input Processing
		if (a in this.scene.engine.keyState && d in this.scene.engine.keyState) {
			this.inputState.xState = 'idle';
			xDisp = 0;
		} else if (a in this.scene.engine.keyState) {
			this.inputState.xState = 'movingLeft';
			xDisp = -this.xVel;
		} else if (d in this.scene.engine.keyState) {
			this.inputState.xState = 'movingRight';
			xDisp = this.xVel;
		} else {
			this.inputState.xState = 'idle';
		}
		if (prev_xState != this.inputState.xState) {
			this.sendUpdate = true;
		}

		if (space in this.scene.engine.keyState) {
			if (this.jumpTimer <= 0) {
				this.sendUpdate = true;
				this.inputState.yState = 'jumping';
				this.yVel = this.jump;
				this.jumpTimer = 1000;
			}
		} else {
			if (this.inputState.yState != 'idle') {
				this.sendUpdate = true;
			}
			this.inputState.yState = 'idle';
		}

		this.timer += delta
		if (this.timer > 1000) {
			this.timer = 0;
			console.log(delta, this.inputState);
		}

		this.jumpTimer -= delta;

		if (this.yVel) {
			this.state = 'jumping';
		} else if (xDisp) {
			this.state = 'walking';
		} else {
			this.state = 'idle';
		}

		// Resolve Physics Collisions
		this.yVel += (this.gravity * delta);
		yDisp = (this.yVel * delta) + (this.gravity * Math.pow(delta, 2));
		this.x += xDisp;
		this.y += yDisp;
		this.AABB.setPos(this.x, this.y);
		var collisions = this.AABB.checkCollisions(this.scene.staticObjects);
		if (collisions.length > 0) {
			for (var i = 0; i < collisions.length; i++) {
				var aabb = collisions[i];
				this.handleCollision(aabb, xDisp, yDisp);
			}
		}

		// Resolve Portal Collisions
		var collisions = this.AABB.checkCollisions(this.scene.portalObjects);
		var nextScene = null;
		if (collisions.length > 0) {
			for (var i = 0; i < collisions.length; i++) {
	            nextScene = collisions[i].parent.nextScene
			}
		}
		if (nextScene != null) {
	        // this.scene.switchScene(nextScene);
	        console.log("should switch to scene: " + nextScene);
		}

		this.count = this.newCount;
		store.dispatch(setPlayerState(this.state));
		store.dispatch(setPlayerPosition([ Math.round(this.x), Math.round(this.y)]));
		store.dispatch(increment());

		if (this.sendUpdate) {
			this.scene.engine.socket.emit('inputState', this.inputState);
			// // send stuff socket
			// setTimeout(()=>this.scene.engine.socket.emit('inputState', this.inputState), 100);
			// // console.log(this.inputState);
			this.sendUpdate = false;
		}

	}
	// Resolves and sets AABB position based on colliding aabb, x-axis displacement, and y axis-displacement
	handleCollision(aabb, xDisp, yDisp) {
		if (xDisp > yDisp) {
			this.AABB.setPos(this.x - xDisp, this.y)
			if (this.AABB.checkCollision(aabb)) {
				this.handleYCollision(aabb);
			} else {
				this.handleXCollision(aabb);
			}
		} else {
			this.AABB.setPos(this.x, this.y - yDisp)
			if (this.AABB.checkCollision(aabb)) {
				this.handleXCollision(aabb);
			} else {
				this.handleYCollision(aabb);
			}
		}
		this.AABB.setPos(this.x, this.y);
	}

	// helper function for handleCollision
	handleYCollision(aabb) {
		if (this.AABB.ifTopCollision(aabb)) {
			this.y = aabb.max.y;
		} else {
			this.y = aabb.min.y - this.AABB.height;
			this.jumpTimer = 0;
		}
		this.yVel = 0;
	}
	// helper function for handleCollision
	handleXCollision(aabb) {
		if (this.AABB.ifLeftCollision(aabb)) {
			this.x = aabb.max.x;
		} else {
			this.x = aabb.min.x - this.AABB.width;
		}
	}

	draw(interpolationPercentage) {
        this.scene.engine.context.fillStyle = this.colors[this.state];
        this.scene.engine.context.fillRect(this.AABB.min.x, this.AABB.min.y, this.AABB.width, this.AABB.height);
        this.scene.engine.context.fillStyle = "black";
		this.scene.engine.context.textAlign = "center";
        this.scene.engine.context.font = "30px Comic Sans MS";
        this.scene.engine.context.fillText("THIS IS ME", this.AABB.min.x + this.AABB.width/2, this.AABB.min.y - 10);
	}
}

export default playerObject;