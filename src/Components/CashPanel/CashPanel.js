import React from "react";
import NewCashEntry from "./NewCashEntry/NewCashEntry";
import classes from "./CashPanel.module.css";

const cashPanel = (props) => {

    // renders list of cash entries -> from props
    // renders add button to add to cash entries -> needs handler from props
    let entries = null;
    if (props.cashItems && props.cashItems.length > 0){
        entries = props.cashItems.map((item, index) => {
            // return <CashEntry name={item.name} value={item.value}/>
            return (
                <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.value}</td>
                </tr>
            );
        })
    }
    return (<div className={classes.CashPanel}>
        <p className={classes.description}>{props.description}</p>
        {props.cashItems.length > 0 ?
            <table className={classes.cashTable}>
                <thead>
                    <tr>
                        <td>Item</td>
                        <td>Value</td>
                    </tr>
                </thead>
                <tbody>
                    {entries}
                </tbody>
            </table>
            :
            null
        }
        <NewCashEntry inputChanged={props.inputChanged} clicked={props.addCashEntryHandler} newCashItem={props.newCashItem}/>        
    </div>);
}

export default cashPanel;