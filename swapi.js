// Write your swapi code in this file!

document.querySelector('#crawlBtn').addEventListener('click', getOpeningCrawl)
document.querySelector('#planetForm').addEventListener('submit', getPlanet)

function getOpeningCrawl(){
  fetch('https://swapi.co/api/films/1/')
    .then(res => res.json())
    .then(json => insertCrawl(json.opening_crawl));
}

function insertCrawl(input){
  let crawlDiv = document.querySelector('#crawlDiv')
  let newP = document.createElement('p');
  crawlDiv.appendChild(newP)
  newP.innerText = input;
}

function getPlanet(e){
  e.preventDefault()
  const i = document.getElementById('planetForm').querySelector('input').value
  document.getElementById('planetForm').querySelector('input').value = ""
  // debugger
  fetch(`https://swapi.co/api/planets/${i}`)
    .then(res => res.json())
    .then(json => {
      let input = `The planet ${json.name} has a ${json.climate} climate.`
      insertPlanet(input)
    })
}

function insertPlanet(input) {
  const planetData = document.querySelector('#planetData')
  let newP = document.createElement('p');
  planetData.appendChild(newP)
  newP.innerText = input;
}
