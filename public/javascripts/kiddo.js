const formTag = document.querySelector("form")
const inputTag = formTag.querySelector("input")
const nameTag = d3.select("span.name")

const search = (name) => {
  nameTag.text(name)
}

formTag.addEventListener("submit", function(event) {
  event.preventDefault()
  search(inputTag.value)
  inputTag.value = '';
})