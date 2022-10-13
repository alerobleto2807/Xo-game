import React from "react";
import logo from '../logo.svg';
import '../App.css';
import '../index.css'
import Game from "./xo-game";


  function JuegoXyO() {
    return (
      <>
       <img src={logo} className="App-logo" alt="logo" />
        <h1 className="play__name"> 🎮 JUGUEMOS  X - O 🎮</h1>
        <Game />
        <p className="firma">Develop by : A. Robleto Dev</p>
      </>
         
    );
  }
  export default JuegoXyO;