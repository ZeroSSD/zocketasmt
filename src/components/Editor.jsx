import React, { useState } from "react";
import Canvas from "./Canvas";
import "bootstrap/dist/css/bootstrap.min.css";
import { SketchPicker } from "react-color";


const Editor = () => {
  //state variables to store the current state and update them when needed
  const [imageSrc, setImageSrc] = useState("");
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [bgcolor, setBgcolor] = useState("#0369A1");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [colorHistory, setColorHistory] = useState([]);
  // takes the hex value of the color and sets it as the background color of the canvas
  const handleChangeComplete = (color) => {
    setBgcolor(color.hex); // Update bgcolor state
    setColorHistory((prevColors) => [...prevColors, color.hex]);
    setShowColorPicker(false);
  };

  async function sampleColor(abortController) {
    const eyeDropper = new window.EyeDropper();
    try {
      const result = await eyeDropper.open({signal: abortController.signal});
      handleColorSelect(result.sRGBHex);
    } catch (e) {
      return null;
    }
  }

  const handleColorSelect = (color) => {
    setBgcolor(color);
    setColorHistory((prevColors) => [...prevColors, color]);
    setShowColorPicker(false);
  };

  //handling the image file and adding it on the canvas
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
    //used bootstrap to separate the canvas and the editor
    <div className="container-fluid">
      <div className="row">
        <div className="col my-canvas">
          {/* using canvas component to implement the canvas functionality */}
          <Canvas
            className="border"
            imageSrc={imageSrc}
            text1={text1}
            text2={text2}
            bgcolor={bgcolor}
          />
        </div>
        <div className="col">
          <div className=" editor">
            <h2 align="center" className="headings">Ad customization</h2>
            <h4 align="center" className="headings">
              Customize your ad and get the templates accordingly
            </h4>
            <br />
            <br />


            <label for="images" class="drop-container" id="dropcontainer">
              <input type="file" id="images" accept="image/*" onChange={handleImageChange} required />
            </label>

            <br />
            <br />
            <hr />
            <h6 align="center">Edit Contents</h6>
            <br />
            <br />
            <div className="form-floating mb-3">
              <input type="text" className="form-control" id="floatingcaption" placeholder="Your Caption"  value={text1}
                onChange={(e) => setText1(e.target.value)}/>
              <label htmlFor="floatingcaption">Caption</label>
            </div>
            <div className="form-floating">
              <input type="text" className="form-control" id="floatingcta" placeholder="Your Call To Action" value={text2}
                onChange={(e) => setText2(e.target.value)}/>
              <label htmlFor="floatingcta">CTA</label>
            </div>
            <br></br>
            <div className="color-picker">
              <div className="color-history">
                {/* creating the colorHistory array of top 5 colors used recently  */}
                {colorHistory.slice(-5).map((color, index) => (
                  <div
                    key={index}
                    style={{ backgroundColor: color }}
                    className="color-swatch"
                    onClick={() => handleColorSelect(color)}
                  />
                ))}
                {colorHistory.length >= 0 && (
                  <button className="add-color" onClick={() => setShowColorPicker(true)}>
                    +
                  </button>
                )}
              </div>
              {showColorPicker && (
                <div className="position-absolute" style={{ zIndex: 9999 }}>
                  <SketchPicker color={bgcolor} onChange={handleChangeComplete} />
                  <button className="pen" onClick={sampleColor}>Pick a color from this page</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
