import React, { Component } from "react";
import template from '../template.json';
import './canvas.css';
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

  updateCaption(ctx, text1) {
    const position_x = template.caption.position.x;
    const position_y = template.caption.position.y;
    const max_characters_per_line = 31;
    const font_size = template.caption.font_size;
    const alignment = template.caption.alignment;
    const text_color = template.caption.text_color;
    const padding = 5;
    ctx.font = `${font_size}pt bold Kremlin Pro Web `;
    ctx.fillStyle = text_color;
    ctx.textAlign = alignment;

    // split text into words
    const words = text1.split(' ');

    // initialize line index and current line
    let lineIndex = 0;
    let currentLine = '';

    // loop through words and add them to the current line
    for (let i = 0; i < words.length; i++) {
        const word = words[i];

        // check if adding the word to the current line exceeds the maximum characters per line
        if (currentLine.length + word.length + 1 > max_characters_per_line) {
            // move to the next line
            ctx.fillText(currentLine.trim(), position_x, position_y + lineIndex * (font_size + padding));
            currentLine = word + ' ';
            lineIndex++;
        } else {
            // add the word to the current line
            currentLine += word + ' ';
        }
    }

    // fill the remaining text on the current line
    ctx.fillText(currentLine.trim(), position_x, position_y + lineIndex * (font_size + padding));
}
updateCTA(ctx, text2, rect) {
  if (text2 != null) {
    ctx.beginPath();
    const radius = 10; // Set the radius of the rounded corners
    ctx.moveTo(rect.x, rect.y + radius);
    ctx.lineTo(rect.x, rect.y + rect.height - radius);
    ctx.quadraticCurveTo(rect.x, rect.y + rect.height, rect.x + radius, rect.y + rect.height);
    ctx.lineTo(rect.x + rect.width - radius, rect.y + rect.height);
    ctx.quadraticCurveTo(rect.x + rect.width, rect.y + rect.height, rect.x + rect.width, rect.y + rect.height - radius);
    ctx.lineTo(rect.x + rect.width, rect.y + radius);
    ctx.quadraticCurveTo(rect.x + rect.width, rect.y, rect.x + rect.width - radius, rect.y);
    ctx.lineTo(rect.x + radius, rect.y);
    ctx.quadraticCurveTo(rect.x, rect.y, rect.x, rect.y + radius);
    ctx.fillStyle = rect.background_color;
    ctx.fill();
    ctx.closePath();
    ctx.font = '30pt bold Kremlin Pro Web';
    ctx.fillStyle = rect.text_color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text2, rect.x + rect.width / 2, rect.y + rect.height / 2);
  }
}
  

  updateCanvas() {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const { imageSrc, text1, text2, bgcolor } = this.props;
    canvas.style.background = bgcolor;


    const designPattern = new Image();
    const mask = new Image();
    const maskStroke = new Image();
    const image = new Image();

    designPattern.src = template.urls.design_pattern;
    mask.src = template.urls.mask;
    maskStroke.src = template.urls.stroke;
    image.src = imageSrc;


    const x = template.image_mask.x;
    const y = template.image_mask.y;
    const iwidth = template.image_mask.width;
    const iheight = template.image_mask.height;
    setInterval(function () {
      ctx.globalCompositeOperation = 'destination-over';
      ctx.drawImage(designPattern, 0, 0);
      ctx.drawImage(mask, 0, 0);
      ctx.drawImage(maskStroke, 0, 0);
    }, 16.666)
    image.onload = () => {
      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(image, x, y, iwidth, iheight);

    };
    ctx.globalCompositeOperation = 'source-over';

    this.updateCaption(ctx, text1);
    // this.updateCTA(ctx,text2); 

    // The rectangle should have x,y,width,height properties
    var rect = {
      x: template.cta.position.x,
      y: template.cta.position.y,
      width: template.cta.position.x*1.5,
      height: template.cta.position.y/3.4,
      text_color:template.cta.text_color,
      background_color:template.cta.background_color
    };
    this.updateCTA(ctx,text2,rect);
    
  }


  render() {
    return (
      <div>
        <canvas
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
      </div>
    );
  }
}

export default Canvas;