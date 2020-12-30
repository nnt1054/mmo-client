import { GameObject } from 'mini5-engine';

class bouncingBallObject extends GameObject {
  

    constructor(scene, color='red') {
        super(scene)

  		this.posAABB = this.createAABB(128, 128, 128, 128)
        this.radius = 32;
        this.speed = 0.1;
        this.velocity = 0.1;
        this.direction = 1;
        this.color = color;
        this.target = null;

        this.gameState = this.parent.gameState['bouncingBall'] = {x: this.posAABB.x, y: this.posAABB.y};
        this.lastUpdate = this.gameState.y;
    }

  	update(delta) {
        this.gameState = this.parent.gameState['bouncingBall'];
        // this.posAABB.setPos(this.gameState.x, this.gameState.y);

        if (this.gameState.y == this.lastUpdate) {
            // this.lastY = this.posAABB.canvasPos.y;
            let y = this.posAABB.min.y + this.velocity * delta
            this.posAABB.setPos(this.posAABB.x, y);

            let canvasPos = this.posAABB.canvasPos;
            if (canvasPos.y > 400 - 64 && this.velocity > 0) {
                this.velocity = -this.velocity;
            } else if (canvasPos.y < 32 && this.velocity < 0) {
                this.velocity = -this.velocity;
            }
        } else {
            this.lastUpdate = this.gameState.y;
            this.posAABB.setPos(this.gameState.x, this.gameState.y);
        }
    }

  	draw(interpolationPercentage) {
        // Interpolate with the last position to reduce stuttering.
        let canvasPos = this.posAABB.canvasPos
        // var y = this.lastY + (canvasPos.y - this.lastY) * interpolationPercentage;
        this.circle(this.scene.engine.context, canvasPos.x, canvasPos.y);
  	}

    circle(context, x, y) {
        context.beginPath();
        context.arc(x, y, this.radius, 0, 2 * Math.PI, false);
        context.fillStyle = this.color;
        context.fill();
        context.lineWidth = 1;
        context.stroke();
    }

}


export default bouncingBallObject;