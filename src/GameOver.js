const MAIN_CLASS_NAME = "popup-box";
const BOX_CLASS_NAME = "box"


function GameOver(props) {
    return (
        <div className={MAIN_CLASS_NAME}>
            <div className={BOX_CLASS_NAME}>
                {props.winner}
                <div>
                    <button onClick={props.handleClose}>Play Again</button>
                </div>
            </div>
        </div>
    )
}

export default GameOver;