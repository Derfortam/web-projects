"use strict"
import {ourGenresInit, topGenresInit} from "./swipers.js"

// import {mainBookSwiper} from "../js/swipers"
// document.addEventListener("DOMContentLoaded", function () {
//    let preloader = document.getElementById("preloader")
//    preloader.style.display = "none"
// })

window.addEventListener("scroll", function () {
   const header = document.querySelector("header")
   if (header) {
      if (window.scrollY > 200) {
         header.classList.add("scrolled")
      } else {
         header.classList.remove("scrolled")
      }
   }
})

const quotesArray = [
   '"Читати книгу - це все одно, що вести бесіду з найкращими людьми минулих століть", - Декарт',
   '"Письменник, створюючи твори, виконує тільки частину роботи, сподіваючись, що читач прийме подальшу участь у його розумовій діяльності", - Й. Гете',
   '"Життя сучасної людини немислиме без того постійного духовного спілкування з книжкою, яка надихається гордим людським прагненням звеличити самого себе", - В. О. Сухомлинський',
   '"Одні книги змушують нас мріяти, інші занурюють у дійсність, але всі вони пройняті найголовнішим для автора – щирістю" - П. Коельо',
   '"Не розум від книг, а книги від розуму створились" - Г. Сковорода',
]
const mainQuote = document.querySelector(".hero__text-decoration")
let randomQuotesIndex = Math.floor(Math.random() * quotesArray.length)
if (mainQuote) mainQuote.innerText = quotesArray[randomQuotesIndex]

document.addEventListener("click", documentActions)

function documentActions(e) {
   const targetElement = e.target
   if (targetElement.closest(".header__burger-block")) {
      document.body.classList.toggle("menu-open")
   }

   if (targetElement.closest(".choose-buttons__button")) {
      const chooseButton = targetElement.closest(".choose-buttons__button")
      const chooseElements = document.querySelectorAll(".choose-buttons__button")
      chooseElements.forEach(item => {
         item.classList.remove("active")
      })
      chooseButton.classList.toggle("active")

      // інші дії...
      // Наприклад додати нову сторінку.
   }

   // ==================
   // Відкриваємо потрібний нам каталог книг
   if (targetElement.closest(".book-section__body-slider")) {
      const elem = targetElement.closest(".book-section__body-slider")
      const elemData = elem.getAttribute("data-book")
      console.log(elemData)
      localStorage.setItem("openBookCatalog", elemData)
   }

   // ==============

   if (targetElement.closest(".frequently__item")) {
      const frequentlyItem = targetElement.closest(".frequently__item")
      frequentlyItem.classList.toggle("open")
   }

   // if (targetElement.closest(".frequently__item")) {
   //    const frequentlyItem = targetElement.closest(".frequently__item")
   //    //! change the error
   //    // const frequentlyElements = document.querySelectorAll(".frequently__item")
   //    // frequentlyElements.forEach(item => {
   //    //    item.classList.remove("open")
   //    // })
   //    frequentlyItem.classList.toggle("open")
   // }

   // tabs
   if (targetElement.closest(".tablinks")) {
      const tabElement = targetElement.closest(".tablinks")
      const allTabs = document.querySelectorAll(".tabcontent")

      allTabs.forEach(item => {
         item.style.display = "none"
         // item.classList.remove("active")
      })

      const tabLink = tabElement.dataset.tab
      const currentTabLink = document.getElementById(tabLink)
      console.log(currentTabLink)
      currentTabLink.style.display = "block"
      // currentTabLink.classList.add("active")

      const allTablinks = document.querySelectorAll(".book-section__tablinks")
      allTablinks.forEach(item => {
         item.classList.remove("active")
      })
      tabElement.classList.add("active")
   }

   if (targetElement.closest(".payment__button")) {
      const currentMode = targetElement.closest(".payment__button")
      const allModeContent = document.querySelectorAll(".payment__tabcontent")
      allModeContent.forEach(item => {
         item.style.display = "none"
         // item.classList.remove("active")
      })

      const tabLink = currentMode.dataset.tab
      const currentTabLink = document.getElementById(tabLink)
      currentTabLink.style.display = "block"
      // currentTabLink.classList.add("active")
   }
}
// ==========================
// для одного із табів ми додаємо дата-атрибут, щоб він по замовчанню був відкритим
const mainTab = document.querySelector("[data-main]")
if (mainTab) mainTab.style.display = "block"

// const openTab = document.querySelector("[data-open]")
// ==========================

function initiatecategoriesHomePageSwiper() {
   const categoriesHomePageSwiper = document.querySelector("#homePageCategoriesSwiper")
   if (categoriesHomePageSwiper) {
      new Swiper("#homePageCategoriesSwiper", {
         loop: true,
         pagination: {
            el: "#homePageCategoriesLines",
            clickable: true,
         },
         navigation: {
            nextEl: "#homePageNext",
            prevEl: "#homePagePrev",
         },
         slidesPerView: 5,
         spaceBetween: 30,
         speed: 600,
         keyboard: {
            enabled: true,
            onlyInViewport: false,
         },
         breakpoints: {
            320: {
               slidesPerView: 1.5,
               spaceBetween: 5,
            },
            500: {
               slidesPerView: 2,
               spaceBetween: 10,
            },
            600: {
               slidesPerView: 3,
               spaceBetween: 15,
            },
            830: {
               slidesPerView: 4,
               spaceBetween: 20,
            },
            1208: {
               slidesPerView: 5,
               spaceBetween: 30,
            },
         },
      })
   }
}
// ========================================
// raiting
const raitingStar = document.querySelectorAll(".raiting__star")
const jacobStar = document.querySelectorAll(".jacob-star")
const ruslanStar = document.querySelectorAll(".ruslan-star")

const googleStar = document.querySelectorAll(".google-star")
const googleStarRate = document.querySelector("#googleStarRate")

const ourStar = document.querySelectorAll(".our-raiting-star")
const ourStarRate = document.querySelector("#ourRating")

function getRatingStar(star) {
   let ratingValue = star
   return ratingValue
}
function setRaitingStar(element, star) {
   if (element) {
      const fullPart = parseInt(getRatingStar(star))
      const emptyPart = getRatingStar(star) - fullPart
      for (let i = 0; i < fullPart; ++i) {
         // element[i].style.background = `url('../img/icon/full-star.svg') 0 0 / cover no-repeat`
         element[i].classList.add("active")
      }
      if (emptyPart > 0) {
         const currentPercent = emptyPart * 100
         element[fullPart].innerHTML = `<span style="width: ${currentPercent + "%"}"></span>`
      }
   }
}
if (raitingStar.length > 0) {
   setRaitingStar(raitingStar, 4.5)
}
if (jacobStar.length > 0) {
   setRaitingStar(jacobStar, 5)
}
if (ruslanStar.length > 0) {
   setRaitingStar(ruslanStar, 3)
}
if (googleStar.length > 0) {
   setRaitingStar(googleStar, getRate(googleStarRate))
}
if (ourStar.length > 0) {
   setRaitingStar(ourStar, getRate(ourStarRate))
}

function getRate(item) {
   if (item) {
      let result = item.textContent
      result = parseFloat(result)
      return result
   }
}

// ========================================

// Функція зміни місця об'єкта
function changeObjectPlace(element, size, oldPlace, newPlace, oldPosition, newPosition) {
   if (element) {
      const mediaQuery = window.matchMedia(`(max-width: ${size}px)`)

      // Перевіряємо, чи виконується умовний медіа-запит
      if (mediaQuery.matches) {
         newPlace.insertAdjacentElement(newPosition, element)
      } else {
         oldPlace.insertAdjacentElement(oldPosition, element)
      }
   }
}

const headerAction = document.querySelector(".header__action")
const headerActionOldPlace = document.querySelector(".header__container")
const headerActionNewPlace = document.querySelector(".header__navigation")

// Виклик функції changeObjectPlace при відповідному стані медіа-запиту
const mediaQuery = window.matchMedia(`(max-width: ${820}px)`)
changeObjectPlace(headerAction, 820, headerActionOldPlace, headerActionNewPlace, "beforeend", "beforeend")
mediaQuery.addListener(() => {
   changeObjectPlace(headerAction, 820, headerActionOldPlace, headerActionNewPlace, "beforeend", "beforeend")
})

// ================================
const bookSectionOne = document.querySelector("#bookSectionOne")
const tabcontentForBookSectionOne = document.querySelector("#Tab1")
const oldPlaceForBookSectionOne = document.querySelector(".page__book-section")

if (bookSectionOne && tabcontentForBookSectionOne && oldPlaceForBookSectionOne) {
   const bookSectionBeak = `(max-width: 820px)`
   const bookSectionMatchMedia = window.matchMedia(bookSectionBeak)
   bookSectionMatchMedia.addEventListener("change", e => {
      const isTrueForBookSection = e.matches
      if (isTrueForBookSection) {
         tabcontentForBookSectionOne.insertAdjacentElement("beforeend", bookSectionOne)
      } else {
         oldPlaceForBookSectionOne.insertAdjacentElement("beforeend", bookSectionOne)
      }
   })
}
if ((window, innerWidth <= 820)) {
   if (tabcontentForBookSectionOne) tabcontentForBookSectionOne.appendChild(bookSectionOne)
}
// ==============
const bookSectionTwo = document.querySelector("#bookSectionTwo")
const tabcontentForBookSectionTwo = document.querySelector("#Tab2")
const oldPlaceForBookSectionTwo = document.querySelector(".page__book-section")
if ((window, innerWidth <= 820)) {
   // tabcontentForBookSectionTwo.insertAdjacentElement("beforeend", bookSectionTwo)
   if (tabcontentForBookSectionTwo) tabcontentForBookSectionTwo.appendChild(bookSectionTwo)
}
if (bookSectionTwo && tabcontentForBookSectionTwo && oldPlaceForBookSectionTwo) {
   const bookSectionBeak = `(max-width: 820px)`
   const bookSectionMatchMedia = window.matchMedia(bookSectionBeak)
   bookSectionMatchMedia.addEventListener("change", e => {
      const isTrueForBookSection = e.matches
      if (isTrueForBookSection) {
         // tabcontentForBookSectionTwo.appendChild(bookSectionTwo)
         tabcontentForBookSectionTwo.insertAdjacentElement("beforeend", bookSectionTwo)
      } else {
         // oldPlaceForBookSectionTwo.appendChild(bookSectionTwo)
         oldPlaceForBookSectionTwo.insertAdjacentElement("beforeend", bookSectionTwo)
      }
   })
}

// const mediaQueryForBookSectionTwo = window.matchMedia(`(max-width: ${820}px)`)
// changeObjectPlace(bookSectionTwo, 820, oldPlaceForBookSectionTwo, tabcontentForBookSectionTwo, "beforeend", "beforeend")
// mediaQueryForBookSectionTwo.addListener(() => {
//    changeObjectPlace(bookSectionTwo, 820, oldPlaceForBookSectionTwo, tabcontentForBookSectionTwo, "beforeend", "beforeend")
// })

// ==============

//перенесення пагінації для слайдерів

const bookSectionLinesSwiperNavigation = document.querySelectorAll(".book-section__lines-swiper-navigation")
const bookSectionLinesSwiperNavigationOldPlace = document.querySelectorAll(".book-section__pagination")
const bookSectionLinesSwiperNavigationNewPlace = document.querySelectorAll(".book-section__block-slider")

if (window.innerWidth <= 1400) {
   for (let i = 0; i < bookSectionLinesSwiperNavigationNewPlace.length; i++) {
      bookSectionLinesSwiperNavigationNewPlace[i].appendChild(bookSectionLinesSwiperNavigation[i])
   }
}
if (bookSectionLinesSwiperNavigation && bookSectionLinesSwiperNavigationOldPlace && bookSectionLinesSwiperNavigationNewPlace) {
   const bookSliderBreaKPoint = `(max-width: 1400px)`
   const bookMatchMedia = window.matchMedia(bookSliderBreaKPoint)
   bookMatchMedia.addEventListener("change", e => {
      const isTrueForBook = e.matches
      if (isTrueForBook) {
         for (let i = 0; i < bookSectionLinesSwiperNavigationNewPlace.length; i++) {
            bookSectionLinesSwiperNavigationNewPlace[i].appendChild(bookSectionLinesSwiperNavigation[i])
         }
      } else {
         for (let i = 0; i < bookSectionLinesSwiperNavigationOldPlace.length; i++) {
            bookSectionLinesSwiperNavigationOldPlace[i].appendChild(bookSectionLinesSwiperNavigation[i])
         }
      }
   })
}

// ==================================

// const tabcontentForBookSectionTwo = document.querySelector("#Tab2")
// const oldPlaceForBookSectionTwo = document.querySelector(".page__book-section")

// const mediaQueryForBookSectionTwo = window.matchMedia(`(max-width: ${820}px)`)
// changeObjectPlace(bookSectionTwo, 820, oldPlaceForBookSectionTwo, tabcontentForBookSectionTwo, "beforeend", "beforeend")
// mediaQueryForBookSectionTwo.addListener(() => {
//    changeObjectPlace(bookSectionTwo, 820, oldPlaceForBookSectionTwo, tabcontentForBookSectionTwo, "beforeend", "beforeend")
// })

// ================================

// const spollers = document.querySelectorAll("[data-spoller]")

// console.log(spollers)

// if (spollers.length) {
//    spollers.forEach((spoller) => {
//       spoller.dataset.spoller !== "open" ? (spoller.nextElementSibling.hidden = true) : spoller.classList.add("active")
//    })

// }
// let slideDown = (target, duration = 500) => {
//    if (!target.classList.contains("--sliding")) {
//       target.classList.add("--sliding")
//       target.hidden = false
//       let height = target.offsetHeight

//       target.style.paddingTop = 0
//       target.style.paddingBottom = 0
//       target.style.marginTop = 0
//       target.style.marginBottom = 0

//       target.style.overflow = "hidden"
//       target.style.height = 0

//       target.offsetHeight

//       target.style.transitionProperty = `height, margin, padding`
//       target.style.transitionDuration = `${duration}ms`

//       target.style.height = `${height}px`

//       target.style.removeProperty("padding-top")
//       target.style.removeProperty("padding-bottom")
//       target.style.removeProperty("margin-bottom")
//       target.style.removeProperty("margin-top")

//       setTimeout(() => {
//          target.style.removeProperty("height")
//          target.style.removeProperty("overflow")
//          target.style.removeProperty("transition-duration")
//          target.style.removeProperty("transition-property")
//          target.classList.remove("--sliding")
//       }, duration)
//    }
// }
// let slideUp = (target, duration = 500) => {
//    if (!target.classList.contains("--sliding")) {
//       target.classList.add("--sliding")
//       let height = target.offsetHeight

//       target.style.transitionProperty = `height, margin, padding`
//       target.style.transitionDuration = `${duration}ms`
//       target.style.height = `${height}px`

//       target.offsetHeight

//       target.style.overflow = "hidden"
//       target.style.paddingTop = 0
//       target.style.paddingBottom = 0
//       target.style.marginTop = 0
//       target.style.marginBottom = 0

//       target.style.height = 0

//       setTimeout(() => {
//          target.style.removeProperty("padding-top")
//          target.style.removeProperty("padding-bottom")
//          target.style.removeProperty("margin-bottom")
//          target.style.removeProperty("margin-top")

//          target.style.removeProperty("height")
//          target.style.removeProperty("overflow")
//          target.style.removeProperty("transition-duration")
//          target.style.removeProperty("transition-property")
//          target.classList.remove("--sliding")

//          target.hidden = true
//       }, duration)
//    }
// }
// let slideToggle = (target, duration = 500) => {
//    target.hidden ? slideDown(target, duration) : slideUp(target, duration)
// }

// =======
// Home page Pagination
// =======
function changeObjectLocation(element, mod, oldPlace, newPlace) {
   if (element) {
      if (mod === 1) {
         newPlace.insertAdjacentElement("beforeend", element)
      } else if (mod === 0) {
         oldPlace.insertAdjacentElement("beforeend", element)
      }
   }
}

function handleScreenSizeChange(e) {
   const isTrue = e.matches
   if (isTrue) {
      changeObjectLocation(homePageNavigation, 1, homePageCategoriesOldPlace, homePageCategoriesNewPlace)
   } else {
      changeObjectLocation(homePageNavigation, 0, homePageCategoriesOldPlace, homePageCategoriesNewPlace)
   }
}

const homePageNavigation = document.querySelector("#homePageCategoryNavigation")
const homePageCategoriesOldPlace = document.querySelector("#homePageCategoriesOldPlace")
const homePageCategoriesNewPlace = document.querySelector("#homePageCategoriesNewPlace")

const breakPoint = "(max-width: 1440px)"
const matchMedia = window.matchMedia(breakPoint)

matchMedia.addEventListener("change", handleScreenSizeChange)

// Викликаємо обробник зміни розміру екрану при завантаженні сторінки
handleScreenSizeChange(matchMedia)

// =========================
// ========================
// спойлери

const spollers = document.querySelectorAll(".frequently__title")

if (spollers) {
   spollers.forEach(item => {
      // Встановлюємо інтервал для кожного елемента
      setInterval(() => {
         // Отримуємо наступний елемент після заголовка
         const nextElement = item.nextElementSibling
         // Перевіряємо, чи існує наступний елемент та чи має батьківський елемент клас "open"
         if (nextElement) {
            nextElement.hidden = true
         }
         if (item.closest(".open")) {
            nextElement.hidden = false
         }
      }, 300) // 2000 мілісекунд (2 секунди) інтервалу
   })
}
// =======================================================================

// ==========================
//fetch categories swiper

fetch("../backend/categories.json")
   .then(pesponce => pesponce.json())
   .then(json => {
      const categoriesWrapper = document.querySelector("#categoriesWrapper")
      if (categoriesWrapper) {
         json.forEach(elem => {
            let result = `
            <div class="swiper-slide categories__slide">
            <a href="${elem.link}" class="categories__body">
               <div class="categories__images">
                  <img src="${elem.image}" alt="image" class="categories__img">
               </div>
               <div class="categories__info">
                  <h5 class="categories__name">${elem.name}</h5>
                  <div class="categories__link _i-slide-right"></div>
               </div>
            </a>
            </div>
            `
            categoriesWrapper.innerHTML += result
         })
         initiatecategoriesHomePageSwiper()
      }
   })
// ==========================

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

// =====================

fetch("../backend/ourGenresBook.json")
   .then(pesponce => pesponce.json())
   .then(json => {
      const ourGenresWrapper = document.querySelector("#ourGenresWrapper")
      if (ourGenresWrapper) {
         json.forEach(elem => {
            let result = `
            <div class="book-section__slide swiper-slide categories__slide">
                  <a data-book="${elem.data}" href="${elem.link}" class="book-section__body-slider categories__body">
                        <div class="book-section__images categories__images">
                           <img src="${elem.image}" alt="image"
                                          class="book-section__img categories__img">
                        </div>
                        <div class="book-section__info-slide categories__info">
                           <h5 class="book-section__name categories__name">${elem.name}</h5>
                           <div class="book-section__arrow categories__link _i-slide-right"></div>
                        </div>
                  </a>
            </div>
            `
            ourGenresWrapper.innerHTML += result
         })
         ourGenresInit()
      }
   })

fetch("../backend/topGenresBook.json")
   .then(pesponce => pesponce.json())
   .then(json => {
      const pupularGenresBook = document.querySelector("#pupularGenresBook")
      if (pupularGenresBook) {
         json.forEach(elem => {
            let result = `
            <div class="book-section__slide swiper-slide categories__slide">
                  <a href="${elem.link}" class="book-section__body-slider categories__body">
                        <div class="book-section__images categories__images">
                           <img src="${elem.image}" alt="image"
                                          class="book-section__img categories__img">
                        </div>
                        <div class="book-section__info-slide categories__info">
                           <h5 class="book-section__name categories__name">${elem.name}</h5>
                           <div class="book-section__arrow categories__link _i-slide-right"></div>
                        </div>
                  </a>
            </div>
            `
            pupularGenresBook.innerHTML += result
         })
         topGenresInit()
      }
   })
/*

<a href="#" class="genre__body">
                     <img src="img/page/all-books/fiction/1984.jpg" alt="image" class="genre__img">
                     <div class="genre__info">
                        <span class="genre__pages">253 pages</span>
                        <h5 class="genre__name">1984</h5>
                     </div>
                  </a>
*/

// =====================================================
// =====================================================
// Intersection observer
// =====================================================
let options = {
   root: null,
   rootMargin: "0px",
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
         // це прописано до останього завдання
         if (targetElement.closest(".page__categories")) {
            // запускамо функцію

            // Зупиняємо спостереження, оскільки функція вже викликана
            // надибав такий варіант, працює, бо по іншому ніяк не міг це зробити
            observer.unobserve(entry.target)
         }
         console.log("елемент видно")
      } else {
         // targetElement.classList.remove("show")
         // console.log("елемент не видно")
         // if (!targetElement.closest(".item__item")) {
         //    targetElement.classList.remove("show")
         // }
      }
   })
}

let observer = new IntersectionObserver(callback, options)

// якщо один об'єкт

let target = document.querySelector(".page__categories")
if (target) observer.observe(target)
let targetFrequently = document.querySelector(".frequently")
if (targetFrequently) observer.observe(targetFrequently)

let targetHero = document.querySelector(".page__hero")
if (targetHero) observer.observe(targetHero)

let targetPayment = document.querySelector(".payment")
if (targetPayment) observer.observe(targetPayment)

// якщо об'єктів багато
// let someElements = document.querySelectorAll("[class*='--anim']")
// someElements.forEach(someElement => {
//     observer.observe(someElement);
// })
// let someElements = document.querySelectorAll(".frequently")
// someElements.forEach(someElement => {
//    observer.observe(someElement)
// })
