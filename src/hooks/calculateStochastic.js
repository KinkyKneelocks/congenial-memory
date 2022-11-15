import calculateSMA from "./calculateSMA"

const calculateStochastic = (rateBasis) => {
let stochastic = {
    k: [],
    d: []
}
let ratePeriod = 14
let high
let low

for (let i = 0; i < rateBasis.close.length; i++) {
 if (i < (ratePeriod - 1)) {
    stochastic.k.push(null)
 } else {  
    high = Math.max(...rateBasis.high.slice((i - (ratePeriod - 1)), (i + 1)))
    low =  Math.min(...rateBasis.low.slice((i - (ratePeriod - 1)), (i + 1)))
    stochastic.k.push(
        (((rateBasis.close[i] - low) / (high - low)) * 100)
        )
    }   
}

let smoothStochastic = []
for (let i in stochastic.k) {
    if (stochastic.k[i] != null) {
        smoothStochastic.push(stochastic.k[i])
    }
}
let smoothBasis = calculateSMA(smoothStochastic, 3)
for (let key in stochastic.k) {
    if (key < ratePeriod - 1) {
        stochastic.d.push(null)
    } else {        
        stochastic.d.push(...smoothBasis)
        break
    }
}
return stochastic
}

export default calculateStochastic