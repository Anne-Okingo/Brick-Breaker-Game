import Paddle from "./paddle.js";
import InputHandler from "./input.js";
import Ball from "./ball.js";
import Brick from "./brick.js";

import { buildLevel, level1, level2 } from "./levels.js";

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEWLEVEL: 4
};

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.gamestate = GAMESTATE.MENU;
        this.messageElement = document.getElementById('message');
        this.livesElement = document.getElementById('lives');
        
        this.ball = new Ball(this);
        this.paddle = new Paddle(this);
        this.gameObjects = [];
        this.bricks = [];
        this.lives = 3;

        this.levels = [level1, level2];
        this.currentLevel = 0;

        this.updateLivesDisplay();
        this.showMenuScreen();
        
        new InputHandler(this.paddle, this);
    }

    start() {
        if (this.gamestate !== GAMESTATE.MENU && 
            this.gamestate !== GAMESTATE.NEWLEVEL)
            return;

        // Clear any existing bricks
        document.getElementById('bricks-container').innerHTML = '';
        
        this.bricks = buildLevel(this, this.levels[this.currentLevel]);
        this.ball.reset();
        this.gameObjects = [this.ball, this.paddle];

        this.gamestate = GAMESTATE.RUNNING;
        this.hideMessage();
    }

    update(deltaTime) {
        if (this.lives === 0) {
            this.gamestate = GAMESTATE.GAMEOVER;
            this.showGameOverScreen();
        }

        if (this.gamestate === GAMESTATE.PAUSED ||
            this.gamestate === GAMESTATE.MENU ||
            this.gamestate === GAMESTATE.GAMEOVER)
            return;

        if (this.bricks.length === 0) {
            this.currentLevel++;
            this.gamestate = GAMESTATE.NEWLEVEL;
            this.start();
        }

        [...this.gameObjects, ...this.bricks].forEach(object =>
            object.update(deltaTime)
        );

        this.bricks = this.bricks.filter(brick => !brick.markedForDeletion);
    }

    togglePause() {
        if (this.gamestate === GAMESTATE.PAUSED) {
            this.gamestate = GAMESTATE.RUNNING;
            this.hideMessage();
        } else if (this.gamestate === GAMESTATE.RUNNING) {
            this.gamestate = GAMESTATE.PAUSED;
            this.showPauseScreen();
        }
    }
    
    showMenuScreen() {
        this.messageElement.innerHTML = 'Press SPACEBAR To Start';
        this.messageElement.className = 'menu';
    }
    
    showPauseScreen() {
        this.messageElement.innerHTML = 'Paused';
        this.messageElement.className = 'paused';
    }
    
    showGameOverScreen() {
        this.messageElement.innerHTML = 'GAME OVER';
        this.messageElement.className = 'gameover';
    }
    
    hideMessage() {
        this.messageElement.className = 'hidden';
    }
    
    updateLivesDisplay() {
        this.livesElement.textContent = this.lives;
    }
}