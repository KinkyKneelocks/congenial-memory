import calculateSMA from "./calculateSMA"

const calculateEMA = (rateBasis, ratePeriod) => {
 let k = 2 / (ratePeriod + 1)
 let sma = calculateSMA(rateBasis, ratePeriod)
 let ema = []

 for (let key in sma) {
    if (sma[key] === null) {
        ema.push(null)
    } else if (sma[key] > 0 && sma[key - 1] === null) {
        ema.push(sma[key])
    } else {
        ema.push(
            (rateBasis[key] * k) + (ema[key - 1] * (1 - k))
        )
    }
 }
 return ema
}

export default calculateEMA