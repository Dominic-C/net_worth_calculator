import axios from "axios"
import React, { Component } from "react";
import CashPanel from "../../Components/CashPanel/CashPanel";

class NetWorthCalculator extends Component {
    state = {
        cashItems: [],
        newCashItem: {
            name: "",
            value: ""
        },
        totalCashValue: 0,
        
        equityItems: [],
        newEquityItem: {
            ticker: "",
            quantity: "",
            stockPrice: "",
            totalValue: "",
        },
        totalEquityValue: 0
    }

    // onInputChange -> function that updates newCashItem state
    onInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState(prevState => { return {newCashItem: { ...prevState.newCashItem, [name]: value }}})
    }

    // addCashEntryHandler -> adds cash item to state then resets newCashItem
    // TODO: use previous state method to call this.state.cashItems
    addCashEntryHandler = () => {
        const cashItem = this.state.newCashItem;
        this.setState((prevState) => {
            return {
                cashItems: [...prevState.cashItems, cashItem],
                newCashItem: {
                    name: "",
                    value: ""
                }
            }
        });
    }

    calculateTotalHandler = () => {
        const allCashItems = this.state.cashItems;
        const totalCashValue = allCashItems.map(item => {
            return parseFloat(item.value);
        }).reduce((currentValue, prevValue) => {
            return currentValue + prevValue
        }, 0);
        this.setState({totalCashValue: totalCashValue});
    }

    render() {
        return (<div>

            <CashPanel addCashEntryHandler={this.addCashEntryHandler}
                cashItems={this.state.cashItems}
                inputChanged={this.onInputChange}
                newCashItem={this.state.newCashItem}
                totalCash={this.state.totalCashValue}
                calculateTotalHandler={this.calculateTotalHandler}
            />
            
        </div>);
    }
}

export default NetWorthCalculator;