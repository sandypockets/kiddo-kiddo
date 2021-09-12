const formTag = document.querySelector("form")
const inputTag = formTag.querySelector("input")
const nameTag = d3.select("span.name")

const svg = d3.select("svg")

svg
  .attr("width", 960)
  .attr("height", 540)

const pathsGroup = svg
  .append("g")
  .attr("class", "paths")

const rankScale = d3.scalePow()
  .exponent(0.25)
  .domain([1, 1000])
  .range([20, 500])

const dateScale = d3.scaleLinear()
  .domain([1880, 2010])
  .range([80, 915])

const rankAxis = d3.axisLeft(rankScale)
  .tickValues([1, 5, 10, 25, 50, 100, 500, 700, 1000])
  .tickPadding(5)
const dateAxis = d3.axisBottom(dateScale)
  .tickFormat((d, i) => { return d + "'s" })
  .tickPadding(5)

const line = d3.line()
  .x((d, i) => { return dateScale(1880 + 10 * i) })
  .y((d, i) => { return rankScale(d) })
  .defined((d, i) => { return d != 0 })
  .curve(d3.curveCardinal.tension(0.5))

svg
  .append("g")
  .attr("transform", "translate(60, 0)")
  .call(rankAxis)

svg
  .append("g")
  .attr("transform", "translate(0, 510)")
  .call(dateAxis)


const search = (name) => {
  let results = data.filter((d, i) => {
    return d.name.toLowerCase() === name.toLowerCase()
  })
  if (results.length > 0) {
    nameTag.text(name)
    const lines = pathsGroup
      .selectAll("path")
      .data(results, (d, i) => { return d.name })

    lines
      .enter()
      .append("path")
      .attr("class", (d, i) => { return d.sex })
      .attr("d", (d, i) => { return line(d.rank) })

    lines
      .exit()
      .remove()

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