import React from "react";
import classes from "./Panel.module.css";

const panel = (props) => {
    return (<div className={classes.panel}>
        <h3 className={classes.description}>{props.description}</h3>
        {props.children}
    </div>)
}

export default panel;
