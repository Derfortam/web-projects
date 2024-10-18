"use strict"

const header = document.querySelector(".header")
const breakPoint = header.dataset.media
const strBreakPoint = /\d{3}|\d{2}/.exec(breakPoint)[0]

const matchMedia = window.matchMedia(breakPoint)
matchMedia.addEventListener("change", e => {
   const isTrue = e.matches

   const button = document.createElement("button")
   button.className = "header__burger"
   button.innerHTML = "<span></span>"
   const headerContainer = document.querySelector(".header__container")

   if (isTrue) {
      headerContainer.append(button)
   } else {
      const buttonBurger = document.querySelector(".header__burger")
      if (buttonBurger) {
         buttonBurger.remove()
      }
   }
})
if (window.innerWidth < parseFloat(strBreakPoint)) {
   const button = document.createElement("button")
   button.className = "header__burger"
   button.innerHTML = "<span></span>"
   const headerContainer = document.querySelector(".header__container")
   headerContainer.append(button)
}

document.documentElement.addEventListener("click", documentActions)
function documentActions(e) {
   const target = e.target
   if (target.closest(".header__burger")) {
      document.body.classList.toggle("menu-open")
   } else {
      document.body.classList.remove("menu-open")
   }
}

const headerList = document.querySelector(".menu-header__list")
headerList.addEventListener("click", headerListActions)
function headerListActions(e) {
   const target = e.target
   if (target.closest(".menu-header__link")) {
      e.preventDefault()
      const currentLink = target.closest(".menu-header__link")
      const scrollElem = currentLink.dataset.goto
      const elem = document.querySelector(scrollElem)

      elem.scrollIntoView({behavior: "smooth", block: "start"})

      // if (scrollElem === ".cards") {
      //    const elem = document.querySelector(scrollElem)
      //    if (elem) {
      //       elem.scrollIntoView({behavior: "smooth", block: "start"})
      //    } else {
      //       console.error(`Element not found: ${scrollElem}`)
      //    }
      // } else {
      //    const elem = document.querySelector(scrollElem)
      //    if (window.innerWidth < 797) {
      //       if (elem) {
      //          elem.scrollIntoView({behavior: "smooth", block: "start"})
      //       } else {
      //          console.error(`Element not found: ${scrollElem}`)
      //       }
      //    } else {
      //       if (elem) {
      //          elem.scrollIntoView({behavior: "smooth", block: "end"})
      //       } else {
      //          console.error(`Element not found: ${scrollElem}`)
      //       }
      //    }
      // }
   }
}
