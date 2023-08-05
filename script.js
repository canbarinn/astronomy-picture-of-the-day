'use strict'

let pictureList = document.getElementById("picture-list")
let picture = document.createDocumentFragment()

let API_KEY = "s8WQQgzdfVNLP3dhSDb2Y0UyGp7Ad67DNOYlsak3"
async function getPics(){

 let url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=10`
 let response = await fetch(url)
 let data = response.json()
 console.log(data)
 return data
//  image.src = data[2].hdurl
//  pictureList.appendChild(image)
}

getPics().then((res)=>{
    res.forEach((elm)=>console.log(elm.hdurl))
})

