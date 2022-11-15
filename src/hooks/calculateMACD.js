import calculateEMA from "./calculateEMA"

const calculateMACD = (rateBasis) => {
    let ema26 = calculateEMA(rateBasis, 26)
    let ema12 = calculateEMA(rateBasis, 12)
    let macd = {
        init: [],
        signal: [],
        histogram: []
    }
    
    for (let key in ema26) {
        if (ema26[key] === null || ema12[key] === null) {
            macd.init.push(null)
        } else {
            macd.init.push((ema12[key] - ema26[key]))
        }
    }
    macd.signal = calculateEMA(macd.init, 9)
    for (let key in macd.init) {
        if (macd.signal[key] === 0) {
            macd.signal[key] = null
        }
        if (macd.init[key] === null || macd.signal[key] === null) {
            macd.histogram.push(null)
        } else {
            macd.histogram.push((macd.init[key] - macd.signal[key]))
        }
    }
    return macd
}

export default calculateMACD