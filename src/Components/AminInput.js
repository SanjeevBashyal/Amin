import React from 'react';
import { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom';
import amin from '../img/amin.svg';
import './AminInput.css'

const AminInput = () => {
    const r=1;
    let svg;
    let coordinates;
    let workingArea;
    
    let svgUnits = 2;

    let majorGrid;
    let minorGrid;
    let minorGridOn = false;
    let majorGridOn = false;

    let minorGridSeparation = 10;
    let majorGridSeparation = 100;

    const [vp,setVp]=useState({x1:0,y1:0,x2:500,y2:400});
    
    const [sc,setSc]=useState(500);
    // const [rSVG,setrSVG]=useState(0.4);

    const scrollCheck=(event)=>{
        console.log(event);
    }



    


    return (
        <div className="aminDesign">
            <a href="/"><img src={amin} alt="amin" title="Amin"/></a>
        </div>
        
      );
}
 
export default AminInput;