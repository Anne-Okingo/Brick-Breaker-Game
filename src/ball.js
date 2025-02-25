import { detectCollision } from "./collisionDetection.js";

export default class Ball {
    constructor(game) {
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.element = document.getElementById('ball');
        
        this.game = game;
        this.size = 16;
        this.reset();
    }

    reset() {
        this.position = { x: 10, y: 400 };
        this.speed = { x: 4, y: -2 };
        this.updatePosition();
    }

    update(deltaTime) {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        // Wall collision - left or right
        if (this.position.x + this.size > this.gameWidth || this.position.x < 0) {
            this.speed.x = -this.speed.x;
            
            // Prevent sticking to walls
            if (this.position.x < 0) this.position.x = 0;
            if (this.position.x + this.size > this.gameWidth) this.position.x = this.gameWidth - this.size;
        }

        // Wall collision - top
        if (this.position.y < 0) {
            this.speed.y = -this.speed.y;
            this.position.y = 0;
        }

        // Bottom of game - lose a life
        if (this.position.y + this.size > this.gameHeight) {
            this.game.lives--;
            this.game.updateLivesDisplay();
            this.reset();
        }

        // Paddle collision
        if (detectCollision(this, this.game.paddle)) {
            this.speed.y = -this.speed.y;
            this.position.y = this.game.paddle.position.y - this.size;
        }
        
        this.updatePosition();
    }
    
    updatePosition() {
        this.element.style.left = `${this.position.x}px`;
        this.element.style.top = `${this.position.y}px`;
    }
}