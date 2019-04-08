// Write your numbers code in this file!

document.addEventListener('DOMContentLoaded', allTheStuff);

function allTheStuff(e){
  displayDroid(2)
  displayDroid(3)

  let crawlButton = document.getElementById('crawlBtn');
  crawlButton.addEventListener('click', getOpeningCrawl);

  let form = document.getElementById("planetForm");
  form.addEventListener('submit', getPlanet);


}

function displayDroid(number) {
  fetch(`https://swapi.co/api/people/${number}`)
  .then(p => p.json())
  .then (p => {
    droidDiv = document.getElementById(`droid-${number}`)
    doidDiv.innerHTML =
    `<div>${p.name}</div><div>${p.height}</div><div>${p.mass}</div><button id="droid-${number}">Get Home Planet</button>`
  })
}

function getPlanet(e) {
  e.preventDefault();
  searchText = e.target.firstElementChild.value;
  if (!(searchText <= 60) || searchText < 1 || searchText === undefined) {
    e.target.firstElementChild.value = ""
    alert("Enter a number between 1 and 60")
    return
  }
  fetch(`https://swapi.co/api/planets/${searchText}`)
  .then(p => p.json())
  .then (p => {
    document.querySelector("#planetData").innerHTML = `<p>${p.name}</p>${p.climate}`
    e.target.firstElementChild.value = ""

  })
}

function getOpeningCrawl(){
  let promiseForData = fetch('https://swapi.co/api/films/1/')
  .then(res  => res.json())
  .then(data => {
    let div = document.querySelector('#crawlDiv');
    div.innerText = data.opening_crawl;
 });
}
