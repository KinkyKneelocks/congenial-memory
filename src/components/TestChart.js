import React from "react"
import Apexcharts from 'react-apexcharts'
import useFetch from "../hooks/useFetch"

const TestChart = () => {  
    const { loading, error, data } = useFetch('https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=USD&outputsize=full&apikey=demo')

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
            sma200: [],
            sma50: []
        }

        const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
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

        for (let i = 0; i < filteredData.date.length; i++) {            
            if (i > 198) {
                let array = filteredData.close.slice((i - 199), i)  
                console.log(filteredData.close[i - 199])             
                filteredData.sma200[i] = average(array)
            } else {
                filteredData.sma200[i] = null
            }

            if (i > 48) {
                let array = filteredData.close.slice((i - 49), i)               
                filteredData.sma50[i] = average(array)
            } else {
                filteredData.sma50[i] = null
            }
        }

        

        let stuff = {
            series: [
                {
                    name: "close",
                    data: filteredData.close
                },
                {
                    name: "SMA (200)",
                    data: filteredData.sma200
                },
                {
                    name: "SMA (50)",
                    data: filteredData.sma50
                }
            ],
            options: {
                chart: {
                    type: 'line'
                },
                stroke: {
                    curve: 'straight'
                },
                xaxis: {
                    categories: filteredData.date
                }
            }
        }
    
    
    
        return (
            <div>
                <h1>Chart goes here</h1>
                <Apexcharts options={stuff.options} series={stuff.series} />
            </div>
        )
    }

}

export default TestChart