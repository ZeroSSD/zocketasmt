
  // Define the Canvas class
  class CustomCanvas {

    constructor(canvasId) {
        this.canvasId = canvasId;
      }
    
      // Function to set the context of the canvas
      setContext() {
        console.log("hit")
        this.canvas = document.getElementById(this.canvasId);
        this.context = this.canvas.getContext('2d');
      }
  
    // Function to draw an image on the canvas
    drawImage(img, x, y, width, height) {
        this.context.drawImage(img, 50, 50, 400, 400);
        }
    drawCaption(text,x,y) {
        this.context.font = 'bold 30px Arial';
        this.context.fillStyle = 'white';
        this.context.fillText(text, 100, 100);
    }
  }
  
  // Create an instance of the CustomCanvas class
  export const customCanvas = new CustomCanvas('canvas');