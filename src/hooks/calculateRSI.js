import averageFromArray from "./averageFromArray"

const calculateRSI = (rateBasis, ratePeriod) => {
    let gain = []
    let loss = []
    let avgGain = []
    let avgLoss = []
    let RSI = []
    
    for (let i = 0; i < rateBasis.length; i++) {
     if (i === 0) {
      gain.push(null)
      loss.push(null)
     } else {        
     let e = parseFloat(rateBasis[i]) - parseFloat(rateBasis[i - 1])
      if (e > 0) {
       gain.push(e)
       loss.push(0)
      } else {
       gain.push(0)
       loss.push((e * -1))   
      }
     }
    }
    
    let elementArray = []
    
    for (let i = 0; i < rateBasis.length; i++) {
     if (i < (ratePeriod)) {
      avgGain.push(null)
      avgLoss.push(null)
      RSI.push(null)
     } else if (i === (ratePeriod)) {
      elementArray = gain.slice((i - (ratePeriod - 1)), (i + 1))
      avgGain.push(averageFromArray(elementArray))
      elementArray = loss.slice((i - (ratePeriod - 1)), (i + 1))
      avgLoss.push(averageFromArray(elementArray))
      let rsiElement = 100 - (100 / (1 + (avgGain[i] / avgLoss[i])))
      RSI.push(Math.round((rsiElement + Number.EPSILON) * 100) / 100)
     } else {
       elementArray = gain.slice((i - (ratePeriod - 1)), (i + 1))
      avgGain.push(averageFromArray(elementArray))
      elementArray = loss.slice((i - (ratePeriod - 1)), (i + 1))
      avgLoss.push(averageFromArray(elementArray))
      let rsiElement = 100 - (100 / (1 + (((avgGain[i - 1] * (ratePeriod - 1)) + gain[i]) / ((avgLoss[i - 1] * (ratePeriod - 1)) + loss[i]))))
      RSI.push(Math.round((rsiElement + Number.EPSILON) * 100) / 100)
     }
    }    
    return RSI
}

export default calculateRSI