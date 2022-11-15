import averageFromArray from "./averageFromArray"

const calculateSMA = (rateBasis, ratePeriod) => {
    let elementArray = []
    let rateContainer = []
    for (let i = 0; i < rateBasis.length; i++) {
        if (i > (ratePeriod - 2)) {
            elementArray = rateBasis.slice((i - (ratePeriod - 1)), i + 1)
            rateContainer[i] = averageFromArray(elementArray)           
        } else {
            rateContainer[i] = null
        }
    }
    return rateContainer
}

export default calculateSMA