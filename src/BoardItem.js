import React from "react";
import "./bord-style.css"

const PLAYER_1_COLOR = 'red';
const PLAYER_2_COLOR = 'yellow';
const CIRCLE_CLASS = "bord-style circle";
const REC_CLASS = "bord-style rec";
const NO_CLICKED_COLOR = "white";
const NO_CLICKED = -1;
const BoardItem = (props) => {

    const printColor = (player) => {
        return player === 0 ? PLAYER_1_COLOR : PLAYER_2_COLOR;
    }

    return (
        <div className={REC_CLASS}>
            <div className={CIRCLE_CLASS} data-place={props.place}
                 style={{backgroundColor: props.type === NO_CLICKED ? NO_CLICKED_COLOR : printColor(props.type)}}>
            </div>
        </div>
    )
}

export default BoardItem;