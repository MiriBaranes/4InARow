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

class BoardGame extends React.Component {
    state = {
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


    checkWinner = (x, y, type) => {
        return this.checkWinnerInRowAndDiagonal(x, y, SLOPE_LEFT, type) ||
            (this.checkWinnerInRowAndDiagonal(x, y, SLOPE_RIGHT, type)) ||
            (this.checkWinnerInRowAndDiagonal(x, y, SLOPE_ON_LINE, type)) ||
            this.checkWinnInColumn(x, y, type);
    }


    checkWinnerInRowAndDiagonal = (x, y, m, type) => {
        const arrayPoints = this.getVector(x, y, m);
        let counter = 0;
        if (arrayPoints.length >= SEQUENCE) {
            arrayPoints.map((item => {
                if (this.state.columns[item[X_INDEX]][item[Y_INDEX]].type === type) {
                    counter++;
                } else if (counter < SEQUENCE) {
                    counter = 0;
                }
            }))
        }
        return counter >= SEQUENCE;
    }

    getVector = (x, y, m) => {
        let result = [];
        for (let xi = 0; xi < COLUMN.length; xi++) {
            const tempY = this.findY(x, y, m, xi);
            if (tempY >= 0 && tempY < ROWS.length) {
                result.push([xi, tempY]);
            }
        }
        return result;
    }
    checkWinnInColumn = (x, y, type) => {
        if (y >= 3) {
            return (this.state.columns[x][y - 1].type === type &&
                this.state.columns[x][y - 2].type === this.state.columns[x][y - MIN_COLUMN].type &&
                this.state.columns[x][y - 2].type === type);
        }
    }

    findB = (x, y, m) => {
        return y - m * x;
    }
    findY = (x, y, m, x1) => {
        return m * x1 + this.findB(x, y, m);
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
            });
        }
    }
    thereIsWinner = (x, y, type) => {
        const thereIsWinner = this.checkWinner(x, y, type);
        if (thereIsWinner || this.state.turn === COLUMN.length * ROWS.length - 1) {
            this.setState({
                gameOver: true
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

    render() {
        return (
            <div className={CLASS_NAME}>
                <Header header={GAME_NAME}></Header>
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