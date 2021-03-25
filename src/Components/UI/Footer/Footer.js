import React, { Component } from "react";
import classes from "./Footer.module.css";

class Footer extends Component {
    render() {
    const year = new Date().getFullYear();
        return (<div className={classes.Footer}>
        Copyright © {year}
    </div>)

    }
}

export default Footer;