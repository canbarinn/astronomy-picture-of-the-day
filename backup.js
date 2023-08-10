"use strict";

let pictureList = document.getElementById("info-list");
let button = document.getElementById("load-more")
let favButton = document.getElementById("add-favorites")

let API_KEY = "s8WQQgzdfVNLP3dhSDb2Y0UyGp7Ad67DNOYlsak3";
async function getPics() {
  let url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=10`;
  let response = await fetch(url);
  let data = await response.json();
  console.log(data)
  return data;
}

function addHtmlElement(pic) {
  let html = `
  <button id="add-favorites type="submit"">Add to Favorites</button>
  <h1 class="header">${pic.title}</h1>
        <img src=${pic.url} alt="Not Found 404" class="image">
        <h2 class="text-header">XYZ</h2>
        <text class="text">${pic.explanation}</text>
        <p class="foot-info"></p>
`;
  return html;
}

async function listPics() {
  let array = await getPics();
  array.forEach((element) => {
    let html = addHtmlElement(element);
    let li = document.createElement("li");
    li.innerHTML = html;
    pictureList.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", () => {
 listPics()
})

button.addEventListener("click", () => {
    listPics()
})

