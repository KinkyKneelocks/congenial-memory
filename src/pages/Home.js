import React from "react";
import useFetch from "../hooks/useFetch";
import SMAChart from "../components/SMAChart";
import CandelstickChart from "../components/CandlestickChart";

const Home = () => {

    let apiUrl = 'https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=USD&to_symbol=HUF&outputsize=full&apikey=ACZ9MQI4XV8R0UOX'
    const [ mainUrl, setMainUrl] = React.useState('https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=USD&outputsize=full&apikey=demo')
    const { loading, error, data } = useFetch(apiUrl)

    if (loading) {
        return (
            <h1>Loading</h1>
        )
    }

    if (error) {
        return (
            <h1>Oops, error</h1>
        )
    }
    
    if (data) {
        let filteredData = {
            date: [],
            open: [],
            high: [],
            low: [],
            close: [],
            sma20: {
                dataName: 'SMA 20',
                smaStep: 20, 
                isVisible: false,
                exp: false,
                dataSeries: []
            },
            sma50: {
                dataName: 'SMA 50',
                smaStep: 50, 
                isVisible: true,
                exp: false,
                dataSeries: []
            },
            sma100: {
                dataName: 'SMA 100', 
                smaStep: 100,
                isVisible: false,
                exp: false,
                dataSeries: []
            },
            sma200: {
                dataName: 'SMA 200', 
                smaStep: 200,
                isVisible: true,
                exp: false,
                dataSeries: []
            },
            ema20: {
                dataName: 'EMA 20', 
                smaStep: 20,
                isVisible: false,
                exp: true,
                dataSeries: []
            },
            ema50: {
                dataName: 'EMA 50', 
                smaStep: 50,
                isVisible: false,
                exp: true,
                dataSeries: []
            },
            ema100: {
                dataName: 'EMA 100', 
                smaStep: 100,
                isVisible: false,
                exp: true,
                dataSeries: []
            },
            ema200: {
                dataName: 'EMA 200', 
                smaStep: 200,
                isVisible: false,
                exp: true,
                dataSeries: []
            },
        }

        let date = new Date()
        date.setFullYear(date.getFullYear() - 3)
        
        for (var key in data['Time Series FX (Daily)']) {
            if (date <= Date.parse(key)) {
                filteredData.date.unshift(key)
                filteredData.open.unshift(parseFloat(data['Time Series FX (Daily)'][key]['1. open']))
                filteredData.high.unshift(parseFloat(data['Time Series FX (Daily)'][key]['2. high']))
                filteredData.low.unshift(parseFloat(data['Time Series FX (Daily)'][key]['3. low']))
                filteredData.close.unshift(parseFloat(data['Time Series FX (Daily)'][key]['4. close']))
            }
        } 

        return (
            <div>
                <h1>What's up</h1>
                <SMAChart data={filteredData} />
                <CandelstickChart data={filteredData} />
            </div>
        )   
    } 
}

export default Home