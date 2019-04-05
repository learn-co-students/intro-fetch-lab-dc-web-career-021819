// Write your swapi code in this file!

document.querySelector('#crawlBtn').addEventListener('click', getOpeningCrawl)

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

function getPlanet(){

}
