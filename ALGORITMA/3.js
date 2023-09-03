function findTotalData (input = [], query = []) {
  const result = []
  for (let i = 0; i < query.length; i++) {
    const itemQuery = query[i]
    let count = 0

    for (let j = 0; j < input.length; j++) {
      const itemInput = input[j]

      if (itemInput === itemQuery) {
        count++
      }
    }

    result.push(count)
  }
  return result
}

const INPUT = ['xc', 'dz', 'bbb', 'dz']  
const QUERY = ['bbb', 'ac', 'dz']  

console.log(findTotalData(INPUT, QUERY))
