export default class InputHandler {
  constructor(paddle, game) {
      document.addEventListener("keydown", event => {
          switch (event.keyCode) {
              case 37: // Left arrow
                  paddle.moveLeft();
                  break;
              
              case 39: // Right arrow
                  paddle.moveRight();
                  break;
              
              case 27: // Escape
                  game.togglePause();
                  break;
              
              case 32: // Space
                  game.start();
                  break;
          }
      });
      
      document.addEventListener("keyup", event => {
          switch (event.keyCode) {
              case 37: // Left arrow
                  if (paddle.speed < 0) paddle.stop();
                  break;
              
              case 39: // Right arrow
                  if (paddle.speed > 0) paddle.stop();
                  break;
          }
      });
  }
}