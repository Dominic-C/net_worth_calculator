import React from "react";
const newEquityEntry = (props) => {
    return (<div >
        <input name="ticker" placeholder="Ticker" onChange={props.equityInputChangeHandler} value={props.newEquityItem.ticker}/>
        <input name="quantity" placeholder="Quantity" onChange={props.equityInputChangeHandler} value={props.newEquityItem.quantity}/>
        <button onClick={props.clicked}>Add</button>
    </div>);
} 

export default newEquityEntry;