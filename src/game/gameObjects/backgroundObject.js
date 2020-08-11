import { GameObject } from 'mini5-engine';

class backgroundObject extends GameObject {

    constructor(scene) {
        super(scene)
		this.parent.gameState['backgroundObject01'] = {}
        this.gameState = this.parent.gameState['backgroundObject01'];
        this.gameState = {x: 0, y: 1};
    }

  	update(delta) {
  	}

  	draw(interpolationPercentage) {
        this.scene.engine.context.fillStyle = 'lightgreen';
        this.scene.engine.context.fillRect(0, 0, this.scene.engine.canvas.width, this.scene.engine.canvas.height);
  	}

}

export default backgroundObject;