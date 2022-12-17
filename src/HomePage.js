
import Explanation from "./Explanation";
import React from "react";


function HomePage(props) {
    return (
        <div className={"header"}>
            {props.header}
            <Explanation explanation={props.explanation}></Explanation>
        </div>
    )
}

export default HomePage;