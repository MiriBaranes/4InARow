import ColumnBord from "./ColumnBord";
import React from "react";
import "./bord-style.css"
import GameOver from "./GameOver";
import Header from "./Header";

const COLUMN = [0, 1, 2, 3, 4, 5, 6];
const ROWS = [0, 1, 2, 3, 4, 5];
const SEQUENCE = 4;
const MIN_COLUMN = 3;
const SLOPE_LEFT = -1;
const SLOPE_RIGHT = 1;
const SLOPE_ON_LINE = 0;
const X_INDEX = 0;
const Y_INDEX = 1;
const NO_CLICKED = -1;
const PLAYER_1_WIN = "yellow player win";
const PLAYER_2_WIN = "red player win";
const NO_WINNER = "NO WINNER";
const GAME_NAME = "Four In A Row Game";
const CLASS_NAME = "boardGame";
const RED = "ACTIVE : RED PLAYER";
const YELLOW = "ACTIVE : YELLOW PLAYER";

class BoardGame extends React.Component {
    state = {
        activePlayer: RED,
        columns: [],
        fullColumn: 0,
        turn: 0,
        gameOver: false,
        winnMessage: ""
    }
    INIT_STATE = {
        fullColumn: 0,
        turn: 0,
        gameOver: false,
        winnMessage: ""
    }
    makeArrayOfObject = () => {
        let arr = [];
        COLUMN.map((column, xi) => {
            let arrayColumn = [];
            ROWS.map((row, yi) => {
                arrayColumn.push({place: [xi, yi], type: -1})
            })
            arr.push(arrayColumn);
        })
        return arr;
    }

    componentDidMount() {
        this.setState({
            columns: this.makeArrayOfObject()
        })
    }

    checkWinnTemp = (x, y, type) => {
        const counterRow = 1 + this.getCounter(x, y, type, 1, 0) + this.getCounter(x, y, type, -1, 0);
        const counterInColumn = 1 + this.getCounter(x, y, type, 0, 1) + this.getCounter(x, y, type, 0, -1);
        const counterLeftDiag = 1 + this.getCounter(x, y, type, 1, -1) + this.getCounter(x, y, type, -1, 1);
        const counterRightDiag = 1 + this.getCounter(x, y, type, 1, 1) + this.getCounter(x, y, type, -1, -1);
        return counterRow >= SEQUENCE || counterInColumn >= SEQUENCE || counterLeftDiag >= SEQUENCE || counterRightDiag >= SEQUENCE;
    }

    getCounter = (x, y, type, disX, disY) => {
        let counter = 0;
        x = x + disX;
        y = disY + y;
        while ((x < COLUMN.length && x >= 0) && (y < ROWS.length && y >= 0)) {
            if (this.state.columns[x][y].type === type) {
                counter++;
                x = x + disX;
                y = disY + y;
            } else {
                break;
            }
        }
        return counter;
    }


    findArrayElementByType(c) {
        return this.state.columns[c].find((element) => {
            return element.type === NO_CLICKED;
        })
    }

    makeChangePlayers = (c) => {
        const element = this.findArrayElementByType(c);
        if (element === undefined) {
            alert("Is Full Column");
        } else {
            element.type = this.state.turn % 2
            const x = element.place[X_INDEX];
            const y = element.place[Y_INDEX];
            console.log(this.state.turn)
            this.thereIsWinner(x, y, element.type);
            this.setState({
                turn: this.state.turn + 1,
                activePlayer: this.getPlayerName(this.state.turn + 1)
            });
        }
    }
    getPlayerName = (turn) => {
        return turn % 2 === 0 ? RED : YELLOW;
    }
    thereIsWinner = (x, y, type) => {
        const thereIsWinner = this.checkWinnTemp(x, y, type);
        this.checkWinnTemp(x, y, type)
        if (thereIsWinner || this.state.turn === COLUMN.length * ROWS.length - 1) {
            this.setState({
                gameOver: true,
            })
            let message = NO_WINNER;
            if (thereIsWinner) {
                message = this.getNameOfWinner();
            }
            this.setState({
                winnMessage: message
            })
        }
    }
    getNameOfWinner = () => {
        return this.state.turn % 2 === 0 ? PLAYER_2_WIN : PLAYER_1_WIN
    }
    resetGame = () => {
        this.setState({...this.INIT_STATE, columns: this.makeArrayOfObject()});
    }
    setColor = () => {
        return this.state.activePlayer === RED ? "red" : "yellow";
    }

    render() {
        return (
            <div className={CLASS_NAME}>
                <Header header={GAME_NAME}></Header>
                <div style={{color: this.setColor(), margin: "5px"}}>
                    {this.state.activePlayer}
                </div>
                <div>
                    {this.state.columns.map((column, index) => {
                        return (<ColumnBord onClick={() => this.makeChangePlayers(index)}
                                            columnInfo={column}
                                            column={index} key={index}> </ColumnBord>
                        )
                    })}
                    {this.state.gameOver &&
                        <GameOver winner={this.state.winnMessage} handleClose={this.resetGame}/>}
                </div>
            </div>
        )
    }
}

export default BoardGame;