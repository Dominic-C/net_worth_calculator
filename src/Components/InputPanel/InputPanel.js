import React from "react";
import InputControls from "./InputControls/InputControls"

const inputPanel = (props) => {
    return <InputControls cashItems={props.cashItems}
        addCashItemHandler={props.addCashItemHandler}
        updateInputHandler={props.updateInputHandler}
        totalCash={props.totalCash}
        equityChangeListener={props.equityChangeListener}
        getMarketValueHandler={props.getMarketValueHandler}
        marketValue={props.marketValue} />
}

export default inputPanel;