import { GameObject } from 'mini5-engine';
import { default as otherPlayerObject } from './otherPlayerObject'

class playerManagerObject extends GameObject {

	constructor(scene) {
	    super(scene)
      	this.scene = scene;
  		this.update = this.update.bind(this);
  		this.draw = this.draw.bind(this);

        this.gameState = this.parent.gameState['playerManager'] = {};
        this.connectedPlayers = {};
	}

	update(delta) {
		this.gameState = this.parent.gameState['playerManager']
		for (var name in this.gameState) {
			if (name in this.connectedPlayers) {
				this.connectedPlayers[name].update(delta);
			} else {
				this.connectedPlayers[name] = new otherPlayerObject(this.scene, name, this);
			}
		}
	}

	draw(interpolationPercentage) {
		for (var name in this.gameState) {

			if (name in this.connectedPlayers) {
				this.connectedPlayers[name].draw(interpolationPercentage);
			}
		}
	}

	// addPlayer(socket) {
	// 	console.log("adding player object" + socket.id)
	// 	let username = this.count;
	// 	this.count++;
	// 	this.connectedPlayers.push(new playerObject(this.scene, socket, username, this))
	// }
}

export default playerManagerObject;