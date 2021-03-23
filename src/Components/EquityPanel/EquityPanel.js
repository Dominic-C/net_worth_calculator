// TODO: reference cashPanel
// create handlers in NetWorthCalc
import React from "react";
import NewEquityEntry from "./NewEquityEntry/NewEquityEntry";
import classes from "./EquityPanel.module.css";

const equityPanel = (props) => {
    //  equityEntries
    let entries = null;
    if (props.equityItems && props.equityItems.length > 0) {
        entries = props.equityItems.map((item, index) => {
            // return <EquityEntry equityItem={item} />
            return (
                <tr key={index}>
                    <td>{item.ticker}</td>
                    <td>{item.quantity}</td>
                    <td>{item.stockPrice}</td>
                    <td>{item.totalValue}</td> 
                    <td>{(item.totalValue * 1.35).toFixed(2)}</td> 
                </tr>
            );
        })
    }
    return (<div className={classes.EquityPanel}>
        <p className={classes.description}>{props.description}</p>
        {props.equityItems.length > 0 
            ?
            <table className={classes.equityTable}>
                <thead>
                    <tr>
                        <td>Ticker</td>
                        <td>Quantity</td>
                        <td>Stock Price (USD)</td>
                        <td>Value (USD)</td>
                        <td>Value (SGD)</td>
                    </tr>
                </thead>
                <tbody>
                    {entries}
                </tbody>
            </table>
            : null
        }
        <NewEquityEntry equityInputChangeHandler={props.inputChangeHandler}
            clicked={props.clicked}
            newEquityItem={props.newEquityItem}
            suggestions={props.suggestions}
            autofill={props.autofill}
        />
    </div>);
}

export default equityPanel;