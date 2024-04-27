
  // Define the Canvas class
  class CustomCanvas {
    constructor(canvasId) {
        window.onload = function () {
            this.canvas = document.getElementById(canvasId);
            this.context = this.canvas.getContext('2d');
        }
    }
  
    // Function to draw an image on the canvas
    drawImage(img) {
      this.context.drawImage(img, 0, 0);
    }
  }
  
  // Create an instance of the CustomCanvas class
  export const customCanvas = new CustomCanvas('canvas');