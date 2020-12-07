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

class otherPlayerObject extends GameObject {

	constructor(scene, username, parent) {
	    super(scene, parent)
	    this.username = username;
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
      this.gameState = this.parent.gameState[this.username];


  		console.log('connecting: ' + username);
	}

	update(delta) {
        this.gameState = this.parent.gameState[this.username];
        if (!this.gameState.connected) {
        	return;
        }
		this.AABB.setPos(this.gameState.x, this.gameState.y);

	}

	draw(interpolationPercentage) {
		console.log('drawing?');
        if (!this.gameState.connected) {
        	return;
        }
        this.scene.engine.context.fillStyle = this.colors[this.state];
        this.scene.engine.context.fillRect(this.AABB.min.x, this.AABB.min.y, this.AABB.width, this.AABB.height);
        this.scene.engine.context.fillStyle = "black";
		this.scene.engine.context.textAlign = "center";
        this.scene.engine.context.font = "30px Comic Sans MS";
        this.scene.engine.context.fillText(this.username, this.AABB.min.x + this.AABB.width/2, this.AABB.min.y - 10);
	}
}

export default otherPlayerObject;