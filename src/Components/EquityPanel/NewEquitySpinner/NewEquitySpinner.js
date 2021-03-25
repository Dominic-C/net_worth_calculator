import React from "react";
import Spinner from "../../UI/Spinner/Spinner";
import classes from "./NewEquitySpinner.module.css";

const newEquitySpinner = (props) => {
    return (<div className={classes.addEquityContainer}>
            <p className={classes.description}>Adding new equity...</p>
            <Spinner/>
        </div>
    );
}

export default newEquitySpinner;