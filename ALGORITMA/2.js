function getLongestSentence (sentence) {
  if (!sentence || (typeof sentence !== "string")) {
    return "invalid sentence payload"
  }

  let longestSentence = ""
  const converToArray = sentence.split(" ")

  for (let i = 0; i < converToArray.length; i++) {
    const item = converToArray[i]

    if ( item.length >= longestSentence.length ) {
      longestSentence = item
    }
  }

  return longestSentence
}

const sentence = "Saya sangat senang mengerjakan soal algoritma"
console.log(getLongestSentence(sentence))
