const averageFromArray = (arr) => {
    return (
        arr.reduce( ( p, c ) => p + c, 0 ) / arr.length
    )
}

export default averageFromArray