"use strict"
let dataBookGenre = localStorage.getItem("openBookCatalog")
console.log(dataBookGenre)

if (dataBookGenre) {
   let localPath
   if (dataBookGenre === "fiction") localPath = "../backend/fiction.json"
   else if (dataBookGenre === "fantasy") localPath = "../backend/fantasy.json"
   fetch(localPath)
      .then(pesponce => pesponce.json())
      .then(json => {
         const genreWrapper = document.querySelector("#genreWrapper")
         if (genreWrapper) {
            json.forEach(elem => {
               let result = `
            <a href="${elem.link}" class="genre__body">
               <img src="${elem.image}" alt="image" class="genre__img">
               <div class="genre__info">
                  <span class="genre__pages">${elem.pages} сторінки</span>
                  <h5 class="genre__name">${elem.name}</h5>
               </div>
            </a>
            `
               genreWrapper.innerHTML += result
            })
         }
      })
}
// fetch("../backend/fiction.json")
//    .then(pesponce => pesponce.json())
//    .then(json => {
//       const genreWrapper = document.querySelector("#genreWrapper")
//       if (genreWrapper) {
//          json.forEach(elem => {
//             let result = `
//             <a href="${elem.link}" class="genre__body">
//                <img src="${elem.image}" alt="image" class="genre__img">
//                <div class="genre__info">
//                   <span class="genre__pages">${elem.pages} сторінки</span>
//                   <h5 class="genre__name">${elem.name}</h5>
//                </div>
//             </a>
//             `
//             genreWrapper.innerHTML += result
//          })
//       }
//    })
