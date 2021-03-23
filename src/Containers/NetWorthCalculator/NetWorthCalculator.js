import axios from "axios"
import React, { Component } from "react";
import CashPanel from "../../Components/CashPanel/CashPanel";
import EquityPanel from "../../Components/EquityPanel/EquityPanel";
import DoughnutGraph from "../../Components/DoghnutGraph/DoughnutGraph";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary"
import classes from "./NetWorthCalculator.module.css";

class NetWorthCalculator extends Component {
    state = {
        // states for cash items
        cashItems: [],
        newCashItem: {
            name: "",
            value: ""
        },
        totalCashValue: 0,

        // states for equity items
        equityItems: [],
        newEquityItem: {
            ticker: "",
            quantity: "",
            stockPrice: "",
            totalValue: "",
        },
        totalEquityValue: 0,

        // state for net worth calculation
        totalValue: 0,

        // states for plotting doughnut graphs
        cashDoughnut: [],
        equityDoughnut: [],
        totalDoughnut: [],

        // state for ticker search
        searchSuggestions: []

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
        // run axios -> get top 5 results -> set new equity item -> set top 5 results in a state. element that displays top 5 results when input is not empty.
        if (name === "ticker") {
            axios.get(`https://financialmodelingprep.com/api/v3/search-ticker?query=${value.toUpperCase()}&limit=5&apikey=${process.env.REACT_APP_FMP_API_KEY}`).then(response => {
                console.log(response);
                if (response.data.length !== 0) {
                    this.setState({searchSuggestions: response.data});
                } else {
                    this.setState({searchSuggestions: []});
                }
            })
        }
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
        axios.get(`https://financialmodelingprep.com/api/v3/quote/${ticker.toUpperCase()}?apikey=${process.env.REACT_APP_FMP_API_KEY}`)
            .then(response => {
                // console.log(response);
                const stockPrice = parseFloat(response.data[0].price).toFixed(2);
                const totalValue = parseFloat(stockPrice * quantity).toFixed(2);
                this.setState(prevState => {
                    return {
                        equityItems: [...prevState.equityItems, { ticker: ticker.toUpperCase(), quantity, stockPrice, totalValue }],
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
        const totalCashValue = parseFloat(allCashItems.map(item => {
            return parseFloat(item.value);
        }).reduce((prevValue, currentValue) => {
            return currentValue + prevValue
        }, 0)).toFixed(2);
        this.setState({ totalCashValue: totalCashValue });

        // calculate equity value
        const allEquityItems = this.state.equityItems;
        let totalEquityValue = parseFloat(allEquityItems.map(item => {
            return parseFloat(item.totalValue)
        }).reduce((prevVal, currentVal) => {
            return prevVal + currentVal
        }, 0)).toFixed(2);

        totalEquityValue = totalEquityValue * 1.35;
        this.setState({ totalEquityValue: totalEquityValue });
        this.setState({ totalValue: (parseFloat(totalCashValue) + parseFloat(totalEquityValue)).toFixed(2) });

        // setting doughnut graph values
        this.setState({ totalDoughnut: [{ name: "Cash", value: totalCashValue }, { name: "Equities", value: totalEquityValue }] });
        this.setState({ cashDoughnut: allCashItems });
        this.setState({ equityDoughnut: allEquityItems.map(equityItem => ({ name: equityItem.ticker, value: equityItem.totalValue })) });
    }

    autoFillHandler = (ticker) => {
        this.setState(prevState => { 
            return {newEquityItem : {
                ...prevState.newEquityItem,
                ticker: ticker
            }, searchSuggestions: []}
        })
    }

    render() {
        const graphs = <div className={classes.center}>
            <DoughnutGraph
                datalist={this.state.totalDoughnut}
                displayVal={this.state.totalValue}
                description="Total Net Worth"
                title="Overview" />
            <DoughnutGraph
                datalist={this.state.cashDoughnut}
                displayVal={this.state.totalCashValue}
                description="Total Cash Value"
                title="Cash Items" />
            <DoughnutGraph
                datalist={this.state.equityDoughnut}
                displayVal={this.state.totalEquityValue}
                description="Total Equity Value"
                title="Equity Items" />
        </div>

        const welcomeMessage = <div className={classes.center}>
            <h1>Welcome to the net worth calculator!</h1>
            <p>Start adding items to calculate your net worth!</p>
        </div>

        return (<div>
            <div>
                {
                    this.state.totalDoughnut.length > 0 
                        ? graphs
                        : welcomeMessage
                }

                <div className={classes.nwContainer}>
                    <CashPanel
                        description="Cash Items"
                        addCashEntryHandler={this.addCashEntryHandler}
                        cashItems={this.state.cashItems}
                        inputChanged={this.onCashInputChange}
                        newCashItem={this.state.newCashItem}
                        totalCash={this.state.totalCashValue}
                    />

                    <EquityPanel
                        description="Equity Items"
                        equityItems={this.state.equityItems}
                        inputChangeHandler={this.onEquityInputChange}
                        newEquityItem={this.state.newEquityItem}
                        clicked={this.addEquityEntryhandler}
                        suggestions={this.state.searchSuggestions}
                        autofill={this.autoFillHandler}
                    />
                </div>
            </div>
            <div className={classes.center}>
                <button className={classes.calculateBtn} onClick={this.calculateTotalHandler}>Calculate Net Worth</button>
            </div>
        </div>);
    }
}

export default NetWorthCalculator;