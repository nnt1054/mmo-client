import { GameObject } from 'mini5-engine';

const w = 87,
	a = 65,
	s = 83,
	d = 68,
	space = 32,
	xDisp = 0,
	yDisp = 0;

class inputManagerObject extends GameObject {

	constructor(scene) {
	    super(scene)
  		this.inputState = {
  			xState: 'idle',
  			yState: 'idle',
  		};
  		this.sendUpdate = false;
	}

	update(delta) {

		var prev_xState = this.inputState.xState;
		if (a in this.scene.engine.keyState && d in this.scene.engine.keyState) {
			this.inputState.xState = 'idle';
		} else if (a in this.scene.engine.keyState) {
			this.inputState.xState = 'movingLeft';
		} else if (d in this.scene.engine.keyState) {
			this.inputState.xState = 'movingRight';
		} else {
			this.inputState.xState = 'idle';
		}
		if (prev_xState != this.inputState.xState) {
			this.sendUpdate = true;
		}

		var prev_yState = this.inputState.yState;
		if (space in this.scene.engine.keyState) {
			this.inputState.yState = 'jumping';
		} else {
			this.inputState.yState = 'idle';
		}
		if (prev_yState != this.inputState.yState) {
			this.sendUpdate = true;
		}

		// Send Updates to Server
		if (this.sendUpdate && this.scene.engine.mode === 'client') {
			this.scene.engine.locals.socket.emit('inputState', this.inputState);
			this.sendUpdate = false;
		}

	}

}

export default inputManagerObject;