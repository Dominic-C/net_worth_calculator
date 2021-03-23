import React from "react";
import classes from "./NewEquityEntry.module.css";
const newEquityEntry = (props) => {

    const suggestions = <div className={classes.suggestions}>{props.suggestions.map(suggestion => {
        return <p onClick={() => props.autofill(suggestion.symbol)} className={classes.suggestion} key={suggestion.symbol}>{suggestion.symbol} - {suggestion.name}</p>})}
    </div>
    return (<div>
        <input autoComplete="off" name="ticker" placeholder="Ticker" onChange={props.equityInputChangeHandler} value={props.newEquityItem.ticker}/>
        {suggestions}
        <input name="quantity" placeholder="Quantity" onChange={props.equityInputChangeHandler} value={props.newEquityItem.quantity}/>
        <button onClick={props.clicked}>Add</button>
    </div>);
} 

export default newEquityEntry;