import React from "react";
import useFetch from "../hooks/useFetch";
import SMAChart from "../components/SMAChart";
import CandelstickChart from "../components/CandlestickChart";

const Home = () => {

    const [ mainUrl, setMainUrl] = React.useState('https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=USD&outputsize=full&apikey=demo')
    const { loading, error, data } = useFetch(mainUrl)

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
                dataSeries: []
            },
            sma50: {
                dataName: 'SMA 50',
                smaStep: 50, 
                isVisible: true,
                dataSeries: []
            },
            sma100: {
                dataName: 'SMA 100', 
                smaStep: 100,
                isVisible: false,
                dataSeries: []
            },
            sma200: {
                dataName: 'SMA 200', 
                smaStep: 200,
                isVisible: true,
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