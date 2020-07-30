import { GameObject } from 'mini5-engine';

class portalObject extends GameObject {

	constructor(scene, nextScene, width, height, x, y) {
	    super(scene)
      	this.scene = scene;
      	this.nextScene = nextScene;
  		this.update = this.update.bind(this);
  		this.draw = this.draw.bind(this);
  		this.AABB = this.createAABB(width, height, x, y, this)
   		this.clickAABB = this.createAABB(width, height, x, y, this)
  		this.color = 'yellow';
	}

	update(delta) {
        this.allowClickDetection(this.clickAABB);

        if (this.isClicked()) {
            this.scene.engine.switchScene(this.nextScene);
        }
	}

	draw(interpolationPercentage) {
        this.scene.engine.context.fillStyle = this.color;
        this.scene.engine.context.fillRect(this.AABB.min.x, this.AABB.min.y, this.AABB.width, this.AABB.height);
	}

}

export default portalObject;