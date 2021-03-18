import axios from "axios"
import React, { Component } from "react";
import InputPanel from "../../Components/InputPanel/InputPanel"

class NetWorthCalculator extends Component {
    // cash has positive and negative lists.
    // equities has only one list
    state = {
        savings: 0,
        debt: 0,
        cashItem: [],
        totalCash: 0,
        ticker: null,
        tickervalue: 0
    }

    updateInputHandler = (event, item) => {
        const total = item === "savings" ? event.target.value - this.state.debt : this.state.savings - event.target.value;
        this.setState({ [item]: event.target.value, totalCash: total });
    }

    addCashItemHandler = () => {
        // add objects to cashItem
        this.setState({ cashItem: [...this.state.cashItem, { item: "item", amount: "1234" }] })
    }
    equityChangeListener = (event) => {
        const ticker = event.target.value;
        this.setState({ ticker: ticker });
    }
    getMarketValueHandler = () => {
        const url = `https://financialmodelingprep.com/api/v3/quote/${this.state.ticker.toUpperCase()}?apikey=7f0b3c8089695e3330c5803459be0c31`;
        axios.get(url).then(response => {
            // TODO: figure out breaking promise chain. Code below doesnt work
            // if (response.data[0] === 'undefined') {
            //     this.setState({tickervalue : 0});
            //     return;
            // }
            console.log(response.data[0].price);
            this.setState({tickervalue : response.data[0].price});
        });
    }
    

    render() {
        return (<div>
        <InputPanel 
            getMarketValueHandler={this.getMarketValueHandler}
            equityChangeListener={this.equityChangeListener}
            cashItems={this.state.cashItem}
            addCashItemHandler={this.addCashItemHandler}
            updateInputHandler={this.updateInputHandler}
            totalCash={this.state.totalCash}
            marketValue={this.state.tickervalue} />
        </div>);
    }
}

export default NetWorthCalculator;