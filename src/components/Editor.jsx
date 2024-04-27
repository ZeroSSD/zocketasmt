import React, { useState } from "react";
import Canvas from "./Canvas";
// import wavyline from '../assets/wavyline.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "bootstrap/dist/css/bootstrap.min.css";
import { SketchPicker } from "react-color";




const Editor = () => {
  const [imageSrc, setImageSrc] = useState("");
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [bgcolor, setBgcolor] = useState("#0369A1");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [colorHistory, setColorHistory] = useState([]);
  const handleChangeComplete = (color) => {
    // setActiveColor(color.hex);
    setBgcolor(color.hex); // Update bgcolor state
    setColorHistory((prevColors) => [...prevColors, color.hex]);
  };

  const handleColorSelect = (color) => {
    setBgcolor(color);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageSrc(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <div className="canvas">
            <Canvas
              className="border"
              imageSrc={imageSrc}
              text1={text1}
              text2={text2}
              bgcolor={bgcolor}
            />
          </div>
        </div>
        <div className="col" id="editor">
          <h2 align="center">Ad customization</h2>
          <h4 align="center">
            Customize your ad and get the templates accordingly
          </h4>
          <br />
          <br />
          
          <div className="input-group mb-3">
            <input type="file" id="image" accept="image/*" onChange={handleImageChange} />
            </div>
            {/* <div className="mb-3">
              <input type="file" id="image" accept="image/*" onChange={handleImageChange} />
            </div> */}
          <br />
          <br />
          <hr />
          <h6 align="center">Edit Contents</h6>
          <br />
          <br />
          <div className="form-floating mb-3">
            <label htmlFor="text1"></label>
            <input
              type="text"
              id="text1"
              className="form-control"
              placeholder="Your Caption"
              value={text1}
              onChange={(e) => setText1(e.target.value)}
            />
          </div>
          <div className="form-floating mb-3">
            <label htmlFor="text2"></label>
            <input
              type="text"
              id="text2"
              className="form-control"
              placeholder="CTA"
              value={text2}
              onChange={(e) => setText2(e.target.value)}
            />
          </div>
          <div className="color-picker">
            <div className="color-history">
              {colorHistory.slice(-5).map((color, index) => (
                <div
                  key={index}
                  style={{ backgroundColor: color }}
                  className="color-swatch"
                  onClick={() => handleColorSelect(color)}
                />
              ))}
            </div>

          <button
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="btn btn-primary"
          >
            Choose your colour
          </button>
          {showColorPicker && (
            <div className="position-absolute" style={{ zIndex: 9999 }}>
              <SketchPicker color={bgcolor} onChange={handleChangeComplete} />
            </div>
          )}
          {/* <button onClick="sampleColor()">Pippette icon</button> */}
        </div>
        

        {/* Render Canvas component and pass props */}
      </div>
    </div>
    </div>
  );
};

export default Editor;
