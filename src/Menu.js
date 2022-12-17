import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import BoardGame from "./BoardGame";
import HomePage from "./HomePage";
import React from "react";

function Menu(props) {
    return (
        <div>
            <BrowserRouter>
                <NavLink
                    style={props.show}
                    className={"icon"}
                    to={"/main"}>
                    Click Here For Main Page
                </NavLink>
                <NavLink
                    style={props.show}
                    className={"icon"}
                    to={"/game"}>
                    Click Here To Start The Play
                </NavLink>
                <Routes>
                    <Route path={"/game"} element={<BoardGame/>}/>
                    <Route path={"/main"} element={<HomePage header={props.appName} explanation={props.explanation}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Menu;
