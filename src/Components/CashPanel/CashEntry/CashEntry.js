import React from "react";
import classes from "./CashEntry.module.css"
// display one cash entry item
const cashEntry = (props) => {
    return (<div className={classes.CashEntry}>
        <p>{props.name}</p>
        <p>{props.value}</p>
    </div>);
} 

export default cashEntry;