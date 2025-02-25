export default class Paddle {
  constructor(game) {
      this.gameWidth = game.gameWidth;
      this.element = document.getElementById('paddle');
      
      this.width = 150;
      this.height = 20;
      
      this.maxSpeed = 7;
      this.speed = 0;
      
      this.position = {
          x: game.gameWidth / 2 - this.width / 2,
          y: game.gameHeight - this.height - 10
      };
      
      this.updatePosition();
  }
  
  moveLeft() {
      this.speed = -this.maxSpeed;
  }
  
  moveRight() {
      this.speed = this.maxSpeed;
  }
  
  stop() {
      this.speed = 0;
  }
  
  update(deltaTime) {
      this.position.x += this.speed;
      
      // Prevent paddle from going out of bounds
      if (this.position.x < 0) this.position.x = 0;
      if (this.position.x + this.width > this.gameWidth) 
          this.position.x = this.gameWidth - this.width;
          
      this.updatePosition();
  }
  
  updatePosition() {
      this.element.style.left = `${this.position.x}px`;
      this.element.style.top = `${this.position.y}px`;
      this.element.style.width = `${this.width}px`;
      this.element.style.height = `${this.height}px`;
  }
}