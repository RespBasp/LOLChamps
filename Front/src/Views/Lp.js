import React from 'react';
import Logo from "../Components/Logo";
import "./Lp.css";
import MyCarousel from "../Components/Carrousel/Lp-Carrousel";
import { Link } from 'react-router-dom';

function Lp() {

  return (
    <div className="Lp">
      <div className="Title">
        <h1>WELCOME TO</h1>
        <Logo/>
        <h1> GUIDE PAGE</h1>
      </div>

      <button className="Enter">
        <Link to="/home">Enter</Link>
        </button>

      <div className="Carousel">
        <MyCarousel />
      </div>
    </div>
  )
}


export default Lp
