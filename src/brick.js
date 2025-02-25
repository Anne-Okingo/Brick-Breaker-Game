import { detectCollision } from "./collisionDetection.js";

export default class Brick {
    constructor(game, position) {
        this.game = game;
        this.position = position;
        this.width = 80;
        this.height = 24;
        
        this.markedForDeletion = false;
        
        // Create a DOM element for this brick
        this.element = document.createElement('div');
        this.element.className = 'brick';
        this.element.style.left = `${this.position.x}px`;
        this.element.style.top = `${this.position.y}px`;
        
        // Add the brick to the DOM
        document.getElementById('bricks-container').appendChild(this.element);
    }
    
    update() {
        if (detectCollision(this.game.ball, this)) {
            this.game.ball.speed.y = -this.game.ball.speed.y;
            this.markedForDeletion = true;
            
            // Remove the brick from the DOM
            this.element.remove();
        }
    }
}