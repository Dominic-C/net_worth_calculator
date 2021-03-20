import React from "react";
import CashEntry from "./CashEntry/CashEntry";
import NewCashEntry from "./NewCashEntry/NewCashEntry";
import classes from "./CashPanel.module.css";

const cashPanel = (props) => {

    // renders list of cash entries -> from props
    // renders add button to add to cash entries -> needs handler from props
    let entries = null;
    if (props.cashItems && props.cashItems.length > 0){
        entries = props.cashItems.map(item => {
            return <CashEntry name={item.name} value={item.value}/>
        })
    }
    return (<div className={classes.CashPanel}>
        <p className={classes.description}>{props.description}</p>
        {entries}
        <NewCashEntry inputChanged={props.inputChanged} clicked={props.addCashEntryHandler} newCashItem={props.newCashItem}/>        
    </div>);
}

export default cashPanel;