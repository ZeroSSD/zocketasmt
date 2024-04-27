import React, { Component } from "react";
import template from '../template.json'
class Canvas extends Component {
    
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.updateCanvas();
  }

  componentDidUpdate() {
    this.updateCanvas();
  }


  updateCanvas() {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // const background = new Image();
    // background.src = "../assests/bg.jpeg";
    // background.onload = () => {
    //   ctx.drawImage(background, canvas.width, canvas.height);
    // };

    const { imageSrc, text1, text2, bgcolor} = this.props;
    
    canvas.style.background = bgcolor;

    ctx.font = "30px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(text1, 50, 50);
    ctx.fillText(text2, 50, 100);

    const designPattern = new Image();
    designPattern.src = template.urls.design_pattern;
    designPattern.onload = () => {
      ctx.drawImage(designPattern, 0, 0);
    };

    

    const mask = new Image();
    mask.src = template.urls.mask;
    mask.onload = () => {
      ctx.drawImage(mask, 0, 0);

    };

    const maskStroke = new Image();
    maskStroke.src = template.urls.stroke;
    maskStroke.onload = () => {
      ctx.drawImage(maskStroke, 0, 0);
    };
    
    const image = new Image();
    image.src = imageSrc;
    const x = template.image_mask.x;
    const y = template.image_mask.y;
    const iwidth = template.image_mask.width;
    const iheight = template.image_mask.height;
    image.onload = () => {
        ctx.drawImage(image, x,y,iwidth,iheight);
        // ctx.globalCompositeOperation='source-out'
    };
  }

  
  downloadCanvas() {
    const canvas = this.canvasRef.current;
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "canvas_image.png";
    link.click();
  }
  

  render() {
    return (
        <div>
      <canvas
        className="my-canvas
        ref={this.canvasRef}
        width="1080px"
        height="1080px"
        style={{
          display: "block",
          margin: "50% auto",
          height: 400,
          width: 400
        }}
      />
      <button onClick={this.downloadCanvas}>Download Canvas</button>
      </div>
    );
  }
}

export default Canvas;




    // const bgImage = new Image();
    // bgImage.src = "../assets/bg.jpg";
    // console.log(bgImage)
    // bgImage.onload = () => {
    //     ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    // };
