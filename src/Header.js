
import React from "react";
const MAIN_CLASS_NAME= "header";

function Header(props) {
    return (
        <div className={MAIN_CLASS_NAME}>
            {props.header}
        </div>
    )
}

export default Header;