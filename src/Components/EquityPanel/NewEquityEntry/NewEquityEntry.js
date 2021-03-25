import React from "react";
import classes from "./NewEquityEntry.module.css";
import EntryField from "../../UI/EntryField/EntryField";

const newEquityEntry = (props) => {

    const suggestions = <div className={classes.suggestions}>{props.suggestions.map(suggestion => {
        return <p onClick={() => props.autofill(suggestion.symbol)} className={classes.suggestion} key={suggestion.symbol}>{suggestion.symbol} - {suggestion.name}</p>})}
    </div>
    return (<div>
        <EntryField autoComplete="off" name="ticker" placeholder="Ticker" onChange={props.equityInputChangeHandler} value={props.newEquityItem.ticker}/>
        {props.suggestions.length > 0 ? suggestions : null}
        <EntryField autoComplete="off" name="quantity" placeholder="Quantity" onChange={props.equityInputChangeHandler} value={props.newEquityItem.quantity} type="number"/>
        <button onClick={props.clicked}>Add</button>
    </div>);
} 

export default newEquityEntry;