"use strict";

let API_KEY = "s8WQQgzdfVNLP3dhSDb2Y0UyGp7Ad67DNOYlsak3";

let picArray = []

async function getPics() {
  let url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=10`;
  let response = await fetch(url);
  let data = await response.json();
  console.log(data)
  return data;
}

async function addSpaceItems() {
  let i =0;
  let array = await getPics()
  let ul = document.getElementById("space-list")
  await array.map((item)=> {
    picArray.push(item);
    let {title:title, url:url, explanation:explanation, copyright:copyright, date:date} = item
    // console.log(title,url,explanation)
    let li = document.createElement("li")
    li.id = i
    let html = `
    <img src=${url} alt="Space image" class="image">
    <p id="reference"><em>${copyright ? `Reference: ${copyright }, ` : ""} Date: ${date}</em><p/>
    <h1 class="header">${title}</h1>
    <text class="text">${explanation}</text>
    <p class="foot-info"></p>
    <button class="fav-button" onclick="getItem(${i})">ADD TO FAVORITES</button>
    `
    li.innerHTML = html
    ul.appendChild(li)
    i++
  })
}

window.addEventListener("load", function() {
  addSpaceItems()
  showFavoriteItems()

});


let favsArray = []

const getItem = function (id) {
let message = document.querySelector(".added-message-container");
let cannotMessage = document.querySelector(".cannot-message-container");

let getjson = localStorage.getItem("favSpaceItems")
let olddata = JSON.parse(getjson)

if(!favsArray.includes(picArray[id])){
  favsArray = [...olddata]
  favsArray.push(picArray[id])
  saveToLocalStorage(favsArray)
  message.hidden = false;
  setTimeout(()=> {
    message.hidden  = true;

  },2000)
} else {
  cannotMessage.hidden = false
  setTimeout(() => {
    cannotMessage.hidden = true
  },2000)
}

}
// WORKING
function saveToLocalStorage(array) {

  let json = JSON.stringify(array)
  localStorage.setItem("favSpaceItems", json)

  let getjson = localStorage.getItem("favSpaceItems")
  let data = JSON.parse(getjson)
  console.log("localstorage data", data)

}


function getItemsFromLocalStorage() {
  let jsonArray = localStorage.getItem("favSpaceItems")
  let array = JSON.parse(jsonArray)
  return array
}

function showFavoriteItems() {
  let items = getItemsFromLocalStorage()
  let ul = document.getElementById("favorites-list")
  items.map(item => {
    let {title:title, url:url, explanation:explanation} = item
    // console.log(title,url,explanation)
    let li = document.createElement("li")
    let html = `<h1 class="header">${title}</h1>
    <img src=${url} alt="Space image" class="image">
    <h2 class="text-header">XYZ</h2>
    <text class="text">${explanation}</text>
    <p class="foot-info"></p>
  })`
  li.innerHTML = html
  ul.appendChild(li)

})
}

