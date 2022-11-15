import React from "react";
import Apexcharts from 'react-apexcharts';
import calculateMACD from "../hooks/calculateMACD";
import calculateRSI from "../hooks/calculateRSI";
import calculateStochastic from "../hooks/calculateStochastic";

const CandelstickChart = (props) => {

    let test = 'category'
    const [timeFrame, setTimeFrame] = React.useState(120)
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
    const macd = calculateMACD(croppedData.close)
    const stochastic = calculateStochastic(croppedData)

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
                    type: test
                },
                yaxis: {
                    labels: {
                        formatter: function(val, index) {
                            return val.toFixed(2);
                          },
                        maxWidth: '100px',                        
                    },
                    max: Math.max(...croppedData.high)
                }
            },
            MACDseries: [{
                name: 'MACD',
                type: 'line',
                data: macd.init
            },
            {
                name: 'Signal',
                type: 'line',
                data: macd.signal
            },
            {
                name: 'Histogram',
                type: 'bar',
                data: macd.histogram
            }],
            MACDoptions: {
                chart: {
                    id: 'macdchart',
                    height: 250,
                    type: 'line',                    
                    animations: {
                        enabled: false
                    },
                    group: 'stockgroup'                    
                },
                labels: croppedData.date,
                annotations: {
                    yaxis: [{
                        y: 0,
                        strokeDashArray: 2,
                        borderColor: '#00E396',
                        label: {
                            borderColor: '#00E396',
                            style: {
                            color: '#fff',
                            background: '#00E396'
                            },
                            text: 'Baseline',
                            textAnchor: 'start',
                            offsetX: '-1000',  
                        }                        
                    }]
                },
                xaxis: {
                    type: test
                },
                yaxis: {
                    labels: {
                        formatter: function(val) {
                            return val.toFixed(2);
                        },
                        maxWidth: '100px'
                    }
                },
                plotOptions: {
                    bar: {
                        borderRadius: 0,
                        colors: {
                            ranges: [{
                                from: 1000,
                                to: 0,
                                color: '#F84F31'
                            }, 
                            {
                            from: 0,
                            to: -1000,                            
                            color: '#00E396'
                            }]
                        }
                    }
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
                annotations: {
                    yaxis: [{
                        y: 0,
                        y2: 30,
                        fillColor: '#B3F7CA',
                        opacity: 0.65,
                        label: {
                            text: 'Oversold', 
                            textAnchor: 'start',
                            offsetX: '-1000',                                                      
                            borderColor: '#B3F7CA',
                            style: {
                              fontSize: '16px',
                              color: '#fff',
                              background: '#00E396'                              
                            }
                        }
                    },
                    {
                        y: 70,
                        y2: 100,
                        fillColor: '#B3F7CA',
                        opacity: 0.65,
                        label: {
                            text: 'Overbought', 
                            textAnchor: 'start',
                            offsetX: '-1000',                                                      
                            borderColor: '#B3F7CA',
                            style: {
                              fontSize: '16px',
                              color: '#fff',
                              background: '#00E396'                              
                            }
                        }
                    }]
                },
                xaxis: {
                    type: test
                },
                yaxis: {
                    labels: {
                        maxWidth: '100px',
                    },
                    min: 0,
                    max: 100
                }
            },
            StochasticSeries: [{
                name: 'K% (Fast)',
                data: stochastic.k                
            },
            {
                name: 'D% (Slow)',
                data: stochastic.d
            }],
            StochasticOptions: {
                labels: croppedData.date,
                chart: {  
                    id: 'stochasticchart',                  
                    animations: {
                        enabled: false
                    },
                    type: 'line',
                    group: 'stockgroup',
                    height: 250
                },
                annotations: {
                    yaxis: [{
                        y: 0,
                        y2: 20,
                        fillColor: '#B3F7CA',
                        opacity: 0.65,
                        label: {
                            text: 'Oversold', 
                            textAnchor: 'start',
                            offsetX: '-1000',                                                      
                            borderColor: '#B3F7CA',
                            style: {
                              fontSize: '16px',
                              color: '#fff',
                              background: '#00E396'                              
                            }
                        }
                    },
                    {
                        y: 80,
                        y2: 100,
                        fillColor: '#B3F7CA',
                        opacity: 0.65,
                        label: {
                            text: 'Overbought', 
                            textAnchor: 'start',
                            offsetX: '-1000',                                                      
                            borderColor: '#B3F7CA',
                            style: {
                              fontSize: '16px',
                              color: '#fff',
                              background: '#00E396'                              
                            }
                        }
                    }]
                },
                xaxis: {
                    type: test
                },
                yaxis: {
                    labels: {                        
                        formatter: function(val, index) {
                            return val.toFixed(2);
                        },
                        maxWidth: '100px',
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
            <Apexcharts series={chartSetup.StochasticSeries} options={chartSetup.StochasticOptions} type="line" height={250} />
            <Apexcharts series={chartSetup.MACDseries} options={chartSetup.MACDoptions} type='line' height={250} />           
        </div>
    )
}

export default CandelstickChart