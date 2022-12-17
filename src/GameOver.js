function GameOver(props) {
    return (
        <div className="popup-box">
            <div className="box">
                {props.winner}
                <div>
                    <button onClick={props.handleClose}>Play Again</button>
                </div>
            </div>
        </div>
    )
}

export default GameOver;