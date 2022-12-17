
import './App.css';
import React from "react";
import Menu from "./Menu";


function App() {
    const show = ({isActive}) => isActive ? {
        display: "none"
    } : undefined;
    const explanation = [
        "this is game for to players",
        "Each player has a color - red or yellow",
        "The goal - to create a sequence of 4 balls - in a row, diagonal, or column",
        "good luck"
    ]
    const appName = "Four in a Row";
    return (
        <div className="App">
            <Menu appName={appName} explanation={explanation} show={show}></Menu>
        </div>
    );
}

export default App;
