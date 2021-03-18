import React from "react";
import Auxiliary from "../../../../hoc/Auxiliary/Auxiliary"
import classes from "./InputControl.module.css"

const inputControl = (props) => {
    return (<div>
        <p className={classes.InputControl}>{props.children}</p>
        <input onChange={(event) => props.updateInputHandler(event, props.type)}/>
    </div>);
}

export default inputControl;