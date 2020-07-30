import { GameObject } from 'mini5-engine';

class backgroundObject extends GameObject {

    constructor(scene) {
        super(scene)
    }
    
  	update(delta) {
  	}
  
  	draw(interpolationPercentage) {
        this.scene.engine.context.fillStyle = 'lightgreen';
        this.scene.engine.context.fillRect(0, 0, this.scene.engine.canvas.width, this.scene.engine.canvas.height);
  	}

}

export default backgroundObject;