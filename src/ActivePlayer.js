import React from "react";

const CLASS_NAME = "smallHeader";
const RED_PLAYER_COLOR = "red";
const RED_PLAYER_MESSAGE = "Red player  is  active";
const YELLOW_PLAYER_COLOR = "yellow";
const YELLOW_PLAYER_MESSAGE = "Yellow  player  is active";

function ActivePlayer(props) {
    const setColor = () => {
        return props.isRedPlay ? RED_PLAYER_COLOR : YELLOW_PLAYER_COLOR;
    }
    const getNamePlayer = () => {
        return props.isRedPlay ? RED_PLAYER_MESSAGE : YELLOW_PLAYER_MESSAGE;
    }
    return <div
        className={CLASS_NAME} style={{color: setColor()}}>
        {getNamePlayer()}
    </div>
}

export default ActivePlayer;