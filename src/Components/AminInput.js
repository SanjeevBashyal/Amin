import React from 'react';
import { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom';
import amin from '../img/amin.svg';
import './AminInput.css'

const AminInput = () => {

    return (
        <div className="aminDesign">
            <a href="/"><img src={amin} alt="amin" title="Amin"/></a>
        </div>
        
      );
}
 
export default AminInput;