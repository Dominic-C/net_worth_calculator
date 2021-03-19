import axios from "axios"
import React, { Component } from "react";
import CashPanel from "../../Components/CashPanel/CashPanel";
import EquityPanel from "../../Components/EquityPanel/EquityPanel";
import OverviewPanel from "../../Components/OverviewPanel/OverviewPanel";

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
        totalEquityValue: 0,
        totalValue: 0
    }

    // onInputChange -> function that updates newCashItem state
    // for cash items
    onCashInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState(prevState => { return { newCashItem: { ...prevState.newCashItem, [name]: value } } })
    }

    onEquityInputChange = (event) => {
        const { name, value } = event.target;
        this.setState(prevState => {
            return {
                newEquityItem: {
                    ...prevState.newEquityItem,
                    [name]: value
                }
            }
        })
    }

    // addCashEntryHandler -> adds cash item to state then resets newCashItem
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

    addEquityEntryhandler = () => {
        // get ticker and quantity from newEquityItem object
        // send axios get request to get price. then update state with ticker, quantity
        const { ticker, quantity } = this.state.newEquityItem;
        axios.get(`https://financialmodelingprep.com/api/v3/quote/${ticker.toUpperCase()}?apikey=7f0b3c8089695e3330c5803459be0c31`)
            .then(response => {
                // console.log(response);
                const stockPrice = parseFloat(response.data[0].price).toFixed(2);
                const totalValue = stockPrice * quantity;
                this.setState(prevState => {
                    return {
                        equityItems: [...prevState.equityItems, { ticker, quantity, stockPrice, totalValue }],
                        newEquityItem: {
                            ticker: "",
                            quantity: "",
                            stockPrice: "",
                            totalValue: "",
                        }
                    }
                })
            })
    }

    calculateTotalHandler = () => {
        // calculate cash value
        const allCashItems = this.state.cashItems;
        const totalCashValue = allCashItems.map(item => {
            return parseFloat(item.value);
        }).reduce((prevValue, currentValue) => {
            return currentValue + prevValue
        }, 0).toFixed(2);
        this.setState({ totalCashValue: totalCashValue });

        // calculate equity value
        const allEquityItems = this.state.equityItems;
        const totalEquityValue = allEquityItems.map(item => {
            return item.totalValue
        }).reduce((prevVal, currentVal) => {
            return prevVal + currentVal
        }, 0).toFixed(2);
        this.setState({totalEquityValue: totalEquityValue});
        this.setState({totalValue: parseFloat(totalCashValue) + parseFloat(totalEquityValue)});
    }



    render() {
        return (<div>
            <OverviewPanel cashValue={this.state.totalCashValue}
                equityValue={this.state.totalEquityValue}
                totalValue={this.state.totalValue}
            />

            <CashPanel addCashEntryHandler={this.addCashEntryHandler}
                cashItems={this.state.cashItems}
                inputChanged={this.onCashInputChange}
                newCashItem={this.state.newCashItem}
                totalCash={this.state.totalCashValue}
            />

            <EquityPanel
                equityItems={this.state.equityItems}
                inputChangeHandler={this.onEquityInputChange}
                newEquityItem={this.state.newEquityItem}
                clicked={this.addEquityEntryhandler}
            />
            <button onClick={this.calculateTotalHandler}>Calculate Net Worth</button>
        </div>);
    }
}

export default NetWorthCalculator;