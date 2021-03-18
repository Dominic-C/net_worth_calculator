import React from "react";
import classes from "./CashEntry.module.css"
// display one cash entry item
const cashEntry = (props) => {
    return (<div >
        <p className={classes.EntryName}>{props.name}</p>
        <p className={classes.EntryValue}>{props.value}</p>
    </div>);
} 

export default cashEntry;