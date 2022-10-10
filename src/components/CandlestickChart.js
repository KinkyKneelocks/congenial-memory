import React from "react";
import Apexcharts from 'react-apexcharts'
import calculateRSI from "../hooks/calculateRSI";

const CandelstickChart = (props) => {
    const [timeFrame, setTimeFrame] = React.useState(90)
    const croppedData = {
        close: props.data.close.slice(-timeFrame),
        date: props.data.date.slice(-timeFrame),
        high: props.data.high.slice(-timeFrame),
        low: props.data.low.slice(-timeFrame),
        open: props.data.open.slice(-timeFrame)
    }
    const dataSet = []
    const rsiDataRaw = calculateRSI(croppedData.close, 14)
    const rsiData = []
    for (let i = 0; i < croppedData.close.length; i++) {
        dataSet.push({
            x: croppedData.date[i],
            y: [croppedData.open[i] , croppedData.high[i], croppedData.low[i], croppedData.close[i]]
        })
        rsiData.push({
            x: croppedData.date[i],
            y: rsiDataRaw[i]
        })
    }

    const [chartSetup, setChartSetup] = React.useState({
            series: [{
                name: 'candle',                
                data: dataSet
            }],
            options: {
                chart: {               
                    animations: {
                        enabled: false
                      },
                    id: 'candles',
                    type: 'candlestick',
                    group: 'stockgroup',
                    height: 500           
                },                
                xaxis: {
                    type: "datetime"
                },
                yaxis: {
                    labels: {
                        minWidth: '20',                        
                    },
                    max: Math.max(...croppedData.high)
                }
            },
            RSIseries: [{
                name: 'RSI 14',
                data: rsiData                
            }],
            RSIoptions: {
                chart: {  
                    id: 'rsichart',                  
                    animations: {
                        enabled: false
                    },
                    type: 'line',
                    group: 'stockgroup',
                    height: 250
                },
                xaxis: {
                    type: 'datetime'
                },
                yaxis: {
                    labels: {
                        minWidth: '20'
                    },
                    min: 0,
                    max: 100
                }
            }
        })        


    return (
        <div>
            <h3>CandelstickChart</h3>
            <Apexcharts series={chartSetup.series} options={chartSetup.options} type="candlestick" height={500} />   
            <Apexcharts series={chartSetup.RSIseries} options={chartSetup.RSIoptions} type="line" height={250} />           
        </div>
    )
}

export default CandelstickChart