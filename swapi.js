// // Write your swapi code in this file!
//
// document.querySelector('#crawlBtn').addEventListener('click', getOpeningCrawl)
// document.querySelector('#planetForm').addEventListener('submit', getPlanet)
// document.addEventListener("DOMContentLoaded", () => {
//   getDroids(2);
//   getDroids(3);
// })
// function getOpeningCrawl(){
//   fetch('https://swapi.co/api/films/1/')
//     .then(res => res.json())
//     .then(json => insertCrawl(json.opening_crawl));
// }
//
// function insertCrawl(input){
//   let crawlDiv = document.querySelector('#crawlDiv')
//   let newP = document.createElement('p');
//   crawlDiv.appendChild(newP)
//   newP.innerText = input;
// }
//
// function getPlanet(e){
//   e.preventDefault()
//   const i = document.getElementById('planetForm').querySelector('input').value
//   document.getElementById('planetForm').querySelector('input').value = ""
//   // debugger
//   fetch(`https://swapi.co/api/planets/${i}`)
//     .then(res => res.json())
//     .then(json => {
//       let input = `The planet ${json.name} has a ${json.climate} climate.`
//       insertPlanet(input)
//     })
// }
//
// function insertPlanet(input) {
//   const planetData = document.querySelector('#planetData')
//   let newP = document.createElement('p');
//   planetData.appendChild(newP)
//   newP.innerText = input;
// }
//
// function getDroids(i){
//   fetch(`https://swapi.co/api/people/${i}`)
//     .then(res => res.json())
//     .then(json => {
//       insertDroid(i, json)
//       // console.log(json.name)
//       // let input = `The planet ${json.name} has a ${json.climate} climate.`
//       // insertPlanet(input)
//     })
// }
//
// function insertDroid(id, input){
//   const div = document.getElementById(`droid-${id}`);
//   let spanName = document.createElement('span');
//   let spanHeight = document.createElement('span');
//   let spanMass = document.createElement('span');
//   let btn = document.createElement('button');
//   div.appendChild(spanName);
//   div.appendChild(spanHeight);
//   div.appendChild(spanMass);
//
// }
/////////////////////////////////////////////////////////////////////////////////////////////////////
function fetchSwapi(type, num) {
  return fetch(`https://swapi.co/api/${type}/${num}`).then(res => res.json())
}


function getOpeningCrawl() {
  fetchSwapi('films', 1)
  .then(d => {
    crawlDiv = document.getElementById("crawlDiv");
    crawlDiv.innerText = d.opening_crawl;
  });
};


function getPlanet(e) {
  e.preventDefault()
  const planetId = parseInt(document.querySelector('#planetInput').value)
  const planetData = document.getElementById('planetData')
  document.querySelector('#planetInput').value = ''
  if(isNaN(planetId) || planetId < 1 || planetId > 60) {
    planetData.innerHTML = "please enter a number between 1 and 60"
  } else {
    fetchSwapi('planets', planetId)
    .then(d => {
      planetData.innerHTML = `<p>Name: ${d.name}</p> <p>Climate: ${d.climate}`
  })
  }
}

function getHomePlanet(planetData, id) {
  console.log(`about to fetch data for planet ${planetData}`);
  fetch(planetData)
  .then(r => r.json())
  .then(planet => {
    document.getElementById(`droid-${id}-homeworld`).innerText = planet.name
  })
}

function getDroids() {
  const droidIDs = [2, 3]
  droidIDs.map(id => {
    const droidNameSpan = document.getElementById(`droid-${id}-name`)
    const droidHeightSpan = document.getElementById(`droid-${id}-height`)
    const droidMassSpan = document.getElementById(`droid-${id}-mass`)
    const droidBtn = document.getElementById(`droid-${id}-btn`)
    fetchSwapi("people", id)
    .then(droid => {
      droidNameSpan.innerText = droid.name
      droidHeightSpan.innerText = droid.height
      droidMassSpan.innerText = droid.mass
      droidBtn.addEventListener('click', () => getHomePlanet(droid.homeworld, id))
    })
  })
}

document.addEventListener('DOMContentLoaded', function() {
  const crawlButton = document.querySelector('#crawlBtn')
  crawlButton.addEventListener('click', getOpeningCrawl)
  const planetSelector = document.querySelector('#planetForm')
  planetSelector.addEventListener('submit', getPlanet)
  const droidBtn = document.querySelector("#find-droids")
  droidBtn.addEventListener('click', getDroids)
})
