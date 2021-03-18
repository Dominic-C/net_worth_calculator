import React from "react";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary"
import InputControl from "./InputControl/InputControl"
import InputEquity from "./InputEquity/InputEquity"
const inputControls = (props) => {
    let cashItemList = []
    if (props.cashItems.length > 0) {
        cashItemList = props.cashItems.map((item, index) => {
            return (
                // add onchange listener to the inputs here
                <div key={index}>
                <input value={item.item}></input>
                <input value={item.amount}></input>
                </div>
            )
        })

        // calculate total here.
    }

    return <Auxiliary>
        <InputControl updateInputHandler={props.updateInputHandler} type={"savings"}>Savings</InputControl>
        <InputControl updateInputHandler={props.updateInputHandler} type={"debt"}>Debt</InputControl>
        <p>Total: {props.totalCash}</p>

        <button onClick={props.addCashItemHandler}>Add</button>
        {cashItemList}
        
        <InputEquity getMarketValueHandler={props.getMarketValueHandler} marketValue={props.marketValue} equityChangeListener={props.equityChangeListener}/>

    </Auxiliary>
}

export default inputControls;