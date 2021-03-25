import axios from "axios"
import React, { Component } from "react";
import CashPanel from "../../Components/CashPanel/CashPanel";
import EquityPanel from "../../Components/EquityPanel/EquityPanel";
import DoughnutGraph from "../../Components/DoghnutGraph/DoughnutGraph";
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
        searchSuggestions: [],

        fetching: false

    }

    // onInputChange -> function that updates newCashItem state
    // for cash items
    onCashInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState(prevState => { return { newCashItem: { ...prevState.newCashItem, [name]: value } } })
    }

    onEquityInputChange = (event) => {
        let { name, value } = event.target;
        // disable autocomplete to save API calls
        if (name === "ticker") {
            const reqOne = axios.get(`https://financialmodelingprep.com/api/v3/search-ticker?query=${value.toUpperCase()}&limit=5&exchange=NASDAQ&apikey=${process.env.REACT_APP_FMP_API_KEY}`);
            const reqTwo = axios.get(`https://financialmodelingprep.com/api/v3/search-ticker?query=${value.toUpperCase()}&limit=5&exchange=NYSE&apikey=${process.env.REACT_APP_FMP_API_KEY}`);

            axios.all([reqOne, reqTwo]).then(axios.spread((...responses) => {
                let tickersToAppend = [];
                for (let response of responses) {
                    if (response.data.length !== 0){
                        tickersToAppend = tickersToAppend.concat(response.data);
                    }
                }
                if (tickersToAppend.length > 0) {
                    this.setState({searchSuggestions: tickersToAppend});
                } else {
                    this.setState({searchSuggestions: []});
                }
            }))
        }

        // auto uppercase
        if (name === "ticker") {
            value = value.toUpperCase();
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
        this.setState({ fetching: true });

        // get ticker and quantity from newEquityItem object
        // send axios get request to get price. then update state with ticker, quantity
        const { ticker, quantity } = this.state.newEquityItem;
        axios.get(`https://financialmodelingprep.com/api/v3/quote/${ticker.toUpperCase()}?apikey=${process.env.REACT_APP_FMP_API_KEY}`)
            .then(response => {
                // console.log(response);
                this.setState({ fetching: false });
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
            return {
                newEquityItem: {
                    ...prevState.newEquityItem,
                    ticker: ticker
                }, searchSuggestions: []
            }
        })
    }

    render() {

        const welcomeMessage = <div>
            <h1>Welcome to the net worth calculator!</h1>
            {this.state.cashItems.length !== 0 || this.state.equityItems.length !== 0 
            || this.state.newCashItem.name.length !== 0 || this.state.newCashItem.value.length !== 0
            || this.state.newEquityItem.ticker.length !== 0 || this.state.newEquityItem.quantity.length !== 0
            ? <p>Click the "Add" button to register items, then click "Calculate" once all items are added!</p> 
            : <p>Start adding items to calculate your net worth!</p>}
        </div>

        const graphs = <div>
            <h1>Your Net Worth is ${this.state.totalValue}!</h1>
            <p>Here's the breakdown:</p>
            {this.state.totalValue > 0 ? <DoughnutGraph
                datalist={this.state.totalDoughnut}
                displayVal={this.state.totalValue}
                description="Total Net Worth"
                title="Overview" /> : null}
            {this.state.totalCashValue > 0 ? <DoughnutGraph
                datalist={this.state.cashDoughnut}
                displayVal={this.state.totalCashValue}
                description="Total Cash Value"
                title="Cash Items" /> : null}
            {this.state.totalEquityValue > 0 ? <DoughnutGraph
                datalist={this.state.equityDoughnut}
                displayVal={this.state.totalEquityValue}
                description="Total Equity Value"
                title="Equity Items" /> : null}
        </div>

        const classList = [classes.center];
        if (this.state.totalValue === 0) {
            classList.push(classes.verticalCenter);
        }

        return (<div>
            <div className={classList.join(" ")}>
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
                        fetching={this.state.fetching}
                    />
                </div>
                <button className={classes.calculateBtn} onClick={this.calculateTotalHandler}>Calculate Net Worth</button>
            </div>
        </div>);
    }
}

export default NetWorthCalculator;