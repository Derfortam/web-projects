"use strict"

document.addEventListener("click", documentAction)

const headerBurger = document.querySelector(".header__burger")
const text = document.querySelector(".swipe__description")

function documentAction(e) {
   const targetElement = e.target
   if (targetElement.closest(".header__burger")) {
      document.body.classList.toggle("menu-open")
   }
}

// IntersectionObserver

let options = {
   root: null,
   rootMargin: "0px 0px 0px 0px",
   /*
    threshhold: 0.3 відсоток появи об'єкту у в'юпорті 0.3 це 30% від розміру елементу який відслідковується
    0 це будь яка поява
    1 це повна поява об'кта в в'юпорті
    */
   threshhold: 0.2,
}

let callback = (entries, observer) => {
   entries.forEach(entry => {
      const targetElement = entry.target
      if (entry.isIntersecting) {
         targetElement.classList.add("show")

         // observer.unobserve(entry.target)
         // }
      }
   })
}

let observer = new IntersectionObserver(callback, options)

// якщо один об'єкт

const basicHero = document.querySelector(".basic-hero")
if (basicHero) observer.observe(basicHero)
const aboutSection = document.querySelector(".about-section")
if (aboutSection) observer.observe(aboutSection)

const services = document.querySelector(".page__services")
if (services) observer.observe(services)
const managers = document.querySelector(".managers")
if (managers) observer.observe(managers)
const galerySection = document.querySelector(".galery-section")
if (galerySection) observer.observe(galerySection)
const formSection = document.querySelector(".form-section")
if (formSection) observer.observe(formSection)
const mainHero = document.querySelector(".main-hero")
if (mainHero) observer.observe(mainHero)
// якщо об'єктів багато
// let someElements = document.querySelectorAll("[class*='--anim']")
// someElements.forEach(someElement => {
//     observer.observe(someElement);
// })

const eventsBlock = document.querySelectorAll(".events__block")
if (eventsBlock) {
   eventsBlock.forEach(elem => {
      observer.observe(elem)
   })
}

const blockNewsSection = document.querySelectorAll(".block-news__section")
if (blockNewsSection) {
   blockNewsSection.forEach(elem => {
      observer.observe(elem)
   })
}
