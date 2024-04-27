import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { SketchPicker } from 'react-color';
import wavyline from '../assets/wavyline.webp';
import { customCanvas } from './Canvas';
import { useRef } from 'react';


export const Editor = () => {
  const [bgcolor, setBgcolor]=React.useState("#0369A1")
  const [showColorPicker,setShowColorPicker]=React.useState(false)
  const fileInputRef = useRef(null);

  const handleColorChange=(color)=>{
    setBgcolor(color.hex)
  }
  
  const handleImageChange = (event) => {
    if (fileInputRef.current && customCanvas) {
      customCanvas.setContext();
      fileInputRef.current.onchange = function() {
        const img = new Image();
        img.onload = function() {
          customCanvas.drawImage(this,0,0);
        };
        img.src = URL.createObjectURL(event.target.files[0]);
      };
    }
    }
       // async function sampleColor() {
    //   if('EyeDropper' in window) {
    //     const ed = new EyeDropper();
    //     const color = await ed.open();
    //     if(color) {
    //       document.getElementById('canvas').style.backgroundColor = rgb;
    //     }
    //   }
    // }
    
    // function setColorSwatch(rgb) {
    // 

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col'>
          <canvas id="canvas" className='border' width="1080px" height="1080px" style= {{backgroundColor:bgcolor, background:wavyline}}/>
        </div>
        <div className='col'>
          <div className="mb-3">
            <label  htmlFor="formFile" className="form-label">Select Image</label>
            <input id="inputFile" type="file" accept="image/*"  ref={fileInputRef} onChange={handleImageChange}/>
          </div>
          <br></br>
          <br></br>
            <div className="form-floating mb-3">
              <input type="text" className="form-control" id="floatingcaption" onChange={handleCaptionText} placeholder="Your Caption"/>
              <label htmlFor="floatingcaption">Caption</label>
            </div>
            <div className="form-floating">
              <input type="text" className="form-control" id="floatingcta" placeholder="Your Call To Action"/>
              <label htmlFor="floatingcta">CTA</label>
            </div>
            <br></br>
            <button onClick={()=>setShowColorPicker(!showColorPicker)} className='btn btn-primary'>Change Background Color</button>
            {showColorPicker && ( 
              <div className='position-absolute' style={{zIndex:9999}}>
                <SketchPicker color={bgcolor} onChange={handleColorChange}/>
              </div>
            )}
            {/* <button onClick="sampleColor()">Pippette icon</button> */}
        </div>
      </div>    
    </div>
  )
}

