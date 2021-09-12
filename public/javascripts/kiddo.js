const formTag = document.querySelector("form")
const inputTag = formTag.querySelector("input")
const nameTag = d3.select("span.name")

const search = (name) => {
  let results = data.filter((d, i) => {
    return d.name.toLowerCase() === name.toLowerCase()
  })
  if (results.length > 0) {
    nameTag.text(name)
  } else {
    alert(`No results for ${name}`)
  }

}

search("Kobe")

formTag.addEventListener("submit", function(event) {
  event.preventDefault()
  search(inputTag.value)
  inputTag.value = '';
})