document.addEventListener('DOMContentLoaded', init)

function init(){

  //listeners
  document.addEventListener('click', clickHandler)
  document.addEventListener('change', changeHandler)

  //variables
  const factsAboutOneButton = document.getElementById("number-one")
  const oneFactsDiv = document.getElementById("one-facts")
  const numberInput = document.getElementById("pick-a-number")
  const randomFactDiv = document.getElementById("random-math-fact")
  const yearHistoryDiv = document.getElementById("year-history")
  const allNumbersButton = document.getElementById("all-numbers-button")
  const allNumbersDiv = document.getElementById("all-the-numbers")
  let year = 2019

  //interval
  setInterval(() => {
    fetch(`http://numbersapi.com/${year}/year`)
    .then(response => response.text())
    .then(response => {yearHistoryDiv.innerText = response})
    year--
  }, 5000)
  //functions
  function clickHandler(event){
    if (event.target === factsAboutOneButton){
      displayRandomFactAboutNumber(1, oneFactsDiv)
    }
    if (event.target === allNumbersButton) {
      allNumbersDiv.innerHTML = "";
      [...Array(100).keys()].forEach((i) => {
        fetch(`http://numbersapi.com/random/trivia`)
        .then(response => response.text())
        .then(response => {allNumbersDiv.innerHTML += `<div>${response}</div>`})
    })
    }
  }

  function changeHandler(event){
    if (event.target === numberInput){
      number = event.target.value
      if (!isNaN(Number(number))){
        displayRandomFactAboutNumber(number, randomFactDiv)
      }
      else {
        randomFactDiv.innerText = "Pick a valid number"
      }
    }
  }

  function displayRandomFactAboutNumber(number, location){
    fetch(`http://numbersapi.com/${number}/trivia`)
    .then(response => response.text())
    .then(response => {location.innerText = response})
  }
}
