import React from "react"
import Apexcharts from 'react-apexcharts'
import SelectorButton from "./SelectorButton"
import calculateSMA from "../hooks/calculateSMA"

const SMAChart = (props) => {
    
    const smaParams = []
    for (let key in props.data) {
        if (props.data[key].dataName) {
            smaParams.push({
                dataName: props.data[key].dataName,
                isVisible: props.data[key].isVisible,
                smaStep: props.data[key].smaStep
            })
        }
    }

    const [ seriesSelector, setSeriesSelector] = React.useState(smaParams)

    const changeChart = (e) => {        
        setSeriesSelector(prevSeriesSelector => prevSeriesSelector.map(key => {
            return key.dataName === e ?
                {...key, isVisible: !key.isVisible} :
                key
        }))
    }

    let usedCharts = [
        {
            name: "close",
            data: props.data.close
        }]

    for (let i in seriesSelector) {
        if (seriesSelector[i].isVisible) {
            usedCharts.push({
                name: seriesSelector[i].dataName,
                data: calculateSMA(props.data.close, seriesSelector[i].smaStep)
            })
        }
    }

    let selectorButtons = seriesSelector.map((element) => {
        return (
            <SelectorButton key={element.dataName} changeChart={() => {changeChart(element.dataName)}} dataname={element.dataName} isActive={element.isVisible} />
        )
    })

    let chartSetup = {
        series: usedCharts,
        options: {
            chart: {
                animations: {
                    enabled: false
                  },
                type: 'line'
            },
            stroke: {
                curve: 'straight'
            },
            xaxis: {
                categories: props.data.date,
                type: 'datetime'
            }
        }
    }

    return (
        <div>
            {selectorButtons}
            <Apexcharts options={chartSetup.options} series={chartSetup.series} height='400' />
        </div>
    )
}

export default SMAChart