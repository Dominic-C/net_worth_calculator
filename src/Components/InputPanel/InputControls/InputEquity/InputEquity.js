import React from "react";

const inputEquity = (props) => {
    return (
        <div>
        <input onChange={props.equityChangeListener}></input>
        <p>Value: {props.marketValue}</p>
        <button onClick={props.getMarketValueHandler}>Get Value!</button>
        </div>
    );
}

export default inputEquity