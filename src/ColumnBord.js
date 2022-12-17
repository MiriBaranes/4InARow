import React from 'react';
import BoardItem from "./BoardItem";

const CLASS_NAME = "group";

function ColumnBord(props) {
    return (
        <div className={CLASS_NAME} onClick={props.onClick}>
            {
                props.columnInfo.map((key, index) => {
                        return (
                            <BoardItem
                                place={key.place}
                                type={key.type}
                                key={index}
                            >
                            < /BoardItem>
                        )
                    }
                )
            }
        </div>
    )

}

// class ColumnBord extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             placeOnColumn: 0,
//             type: this.props.type,
//             clicked: this.props.clicked
//         }
//     }
//
//     getUp = () => {
//         if (this.state.placeOnColumn < this.state.type.length) {
//             this.props.setUp();
//             const clicked = this.state.clicked;
//             clicked.push({c: this.props.column, r: this.state.placeOnColumn});
//             const newType = this.state.type;
//             newType[this.state.placeOnColumn] = this.props.turn % 2;
//             this.setState({
//                 type: newType,
//                 clicked: clicked,
//                 placeOnColumn: this.state.placeOnColumn + 1
//             })
//         } else {
//             alert("full column")
//         }
//         console.log(this.state.clicked)
//     }
//
//     render() {
//
//         return (
//             <div className={"group"} onClick={this.getUp}>
//                 {
//                     this.props.rows.map((key) => {
//                             return (
//                                 <BoardItem
//                                     column={this.props.column}
//                                     row={key}
//                                     type={this.state.type[key]}
//                                     key={key}
//                                 >
//                                 < /BoardItem>
//                             )
//                         }
//                     )
//                 }
//             </div>
//         )
//     }
// }


export default ColumnBord;

