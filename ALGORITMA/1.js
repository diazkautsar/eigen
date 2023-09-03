function reverseString (string) {
  if (!string || (typeof string !== "string")) {
    return "invaild payload string"
  }
  const numbers = []
  const strings = []

  for (let i = 0; i < string.length; i++) {
    const item = string[i]

    if (isNaN(item)) {
      strings.unshift(item)
    } else {
      numbers.push(item)
    }
  }

  return `${strings.join("")}${numbers.join("")}`
}

const string = "NEGIE1"
console.log(reverseString(string))