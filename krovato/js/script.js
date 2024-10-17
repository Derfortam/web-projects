"use strict"
// vscode-fold=1
import NavigaionPages from "./navigationPages.js"
document.documentElement.addEventListener("click", documentActions)

function documentActions(e) {
   const target = e.target
   if (target.closest(".navigation-header__lang")) {
      const button = document.querySelector(".navigation-header__custom-button")
      button.classList.toggle("active")
   } else {
      const button = document.querySelector(".navigation-header__custom-button")
      button.classList.remove("active")
   }
   if (target.closest(".categiries-products__wrapper-select")) {
      const button = document.querySelector(".categiries-products__custom-button")
      button.classList.toggle("active")
   } else {
      const button = document.querySelector(".categiries-products__custom-button")
      if (button) button.classList.remove("active")
   }
   if (target.closest(".navigation-header__burger")) {
      document.documentElement.classList.toggle("menu-open")
   }
   if (target.closest(".catalog-menu__item")) {
      const thisLink = target.closest(".catalog-menu__item")
      const allLinks = document.querySelectorAll(".catalog-menu__item")
      allLinks.forEach(item => item.classList.remove("active-catalog"))
      thisLink.classList.add("active-catalog")

      const allLinksArray = Array.from(allLinks)

      const hasActiveCatalogAncestor = allLinksArray.some(item => item.closest(".active-catalog") !== null)

      if (hasActiveCatalogAncestor) {
         document.documentElement.classList.add("menu-catalog-has-open-value")
      } else {
         document.documentElement.classList.remove("menu-catalog-has-open-value")
      }
   } else {
      const allLinks = document.querySelectorAll(".catalog-menu__item")
      allLinks.forEach(item => item.classList.remove("active-catalog"))
      document.documentElement.classList.remove("menu-catalog-has-open-value")
   }
   if (target.closest(".actions-header__catalog-button")) {
      document.documentElement.classList.toggle("open-catalog-menu")
   }

   if (target.closest(".categiries-products__categories-sign")) {
      const allProducts = document.querySelectorAll(".categiries-products__categories-sign")
      allProducts.forEach(item => {
         item.classList.remove("active")
      })
      target.closest(".categiries-products__categories-sign").classList.add("active")
   }
   if (target.closest(".categiries-products__close-icon")) {
      const parent = target.closest(".categiries-products__close-icon").closest(".categiries-products__categories-sign")
      if (parent.nextElementSibling) {
         parent.nextElementSibling.classList.add("active")
      }
      if (!parent.nextElementSibling && parent.previousElementSibling) {
         parent.previousElementSibling.classList.add("active")
      }
      parent.remove()
   }

   if (target.closest(".filter-products__main-title")) {
      const elem = target.closest(".filter-products__main-title")
      const parent = elem.closest(".filter-products")
      parent.classList.toggle("open-filter")
   }
   if (target.closest(".info-about-product__label")) {
      const products = document.querySelectorAll(".info-about-product__label")
      products.forEach(item => item.classList.remove("active-texture"))
      target.closest(".info-about-product__label").classList.add("active-texture")
   }

   if (target.closest(".info-about-product__show-more")) {
      e.preventDefault()
      target.closest(".info-about-product__show-more")
      uploadTextures("clothTextures", currentTextureIndex, texturesList)
      currentTextureIndex += 5
      if (currentTextureIndex >= texturesList.length) target.closest(".info-about-product__show-more").disabled = true
   }
   if (target.closest(".order-info__block-delivery")) {
      const elem = target.closest(".order-info__block-delivery")
      const allElem = document.querySelectorAll(".order-info__block-delivery")
      allElem.forEach(item => item.classList.remove("active-order"))
      elem.classList.add("active-order")
   }
   if (target.closest(".full-product-card__basket")) {
      const elem = target.closest(".full-product-card__basket")
      const parentBlock = elem.closest(".full-product-card")

      const size = parentBlock.querySelector(".full-product-card__sizes").textContent
      const imageSrc = parentBlock.querySelector(".full-product-card__image").getAttribute("src")
      const name = parentBlock.querySelector(".full-product-card__title").textContent
      const statusText = parentBlock.querySelector(".full-product-card__status").textContent
      const status = statusText === "В наявності" ? true : false
      // const oldPrice = parentBlock.querySelector(".full-product-card__old-price").textContent
      // const newPrice = parentBlock.querySelector(".full-product-card__new-price").textContent

      let oldPrice
      if (parentBlock.querySelector(".full-product-card__old-price")) {
         oldPrice = parentBlock.querySelector(".full-product-card__old-price").textContent
      } else oldPrice = null

      let newPrice
      if (parentBlock.querySelector(".full-product-card__new-price")) {
         newPrice = parentBlock.querySelector(".full-product-card__new-price").textContent
      } else newPrice = null

      const maxCount = parseInt(parentBlock.getAttribute("data-max-count"))
      const result = {
         size: size,
         name: name,
         src: imageSrc,
         status: status,
         oldPrice: oldPrice,
         newPrice: newPrice,
         maxCount: maxCount,
      }
      favouriteArray = JSON.parse(localStorage.getItem("favList")) ?? []

      favouriteArray.push(result)
      localStorage.setItem("favList", JSON.stringify(favouriteArray))
      updateDataInBacket()
      // console.log(favouriteArray)
   }
   if (target.closest(".backet-product__close")) {
      const close = target.closest(".backet-product__close")
      const parent = close.closest(".backet-product__block")
      parent.remove()

      const allBacketProd = document.querySelectorAll(".backet-product__block")

      favouriteArray = []
      if (allBacketProd.length) {
         allBacketProd.forEach(item => {
            const imageSrc = item.querySelector(".backet-product__main-img").getAttribute("src")

            const size = item.querySelector(".backet-product__size").textContent

            const name = item.querySelector(".backet-product__name-product").textContent

            const statusText = item.querySelector(".backet-product__status").textContent
            const status = statusText === "В наявності" ? true : false

            let oldPrice
            if (item.querySelector(".old-price")) {
               oldPrice = item.querySelector(".old-price").textContent
            } else oldPrice = null

            let newPrice
            if (item.querySelector(".new-price")) {
               newPrice = item.querySelector(".new-price").textContent
            } else newPrice = null

            const maxCount = parseInt(item.getAttribute("data-max-count"))

            const result = {
               size: size,
               name: name,
               src: imageSrc,
               status: status,
               oldPrice: oldPrice,
               newPrice: newPrice,
               maxCount: maxCount,
            }
            favouriteArray.push(result)
            localStorage.setItem("favList", JSON.stringify(favouriteArray))
         })
      } else {
         favouriteArray = []

         localStorage.setItem("favList", JSON.stringify(favouriteArray))
      }
      updateDataInBacket()
   }
}

// ===========
// масив. бере із локального сховища, якщо там пусто, то масив пустий
// Створюємо масив

// ===========
function uploadFavList(localStarageName, id) {
   if (JSON.parse(localStorage.getItem(localStarageName))) {
      const path = document.getElementById(id)
      if (path) {
         const array = JSON.parse(localStorage.getItem(localStarageName))
         console.log(array)
         for (let i = 0; i < array.length; i++) {
            console.log(i)

            const li = document.createElement("li")
            li.classList.add("backet-product__block")
            li.setAttribute("data-max-count", array[i].maxCount)

            const frontDiv = document.createElement("div")
            frontDiv.classList.add("backet-product__front")

            const mainImg = document.createElement("img")
            mainImg.src = array[i].src
            mainImg.alt = array[i].name
            mainImg.classList.add("backet-product__main-img")
            frontDiv.append(mainImg)

            const countDiv = document.createElement("div")
            countDiv.classList.add("backet-product__count-of-prod")

            const minusImg = document.createElement("img")
            minusImg.src = "img/page/order/minus.svg"
            minusImg.alt = ""
            minusImg.className = "backet-minus"
            countDiv.append(minusImg)

            const countSpan = document.createElement("span")
            countSpan.id = "count-of-prod-in-backet"
            countSpan.textContent = "1"
            countDiv.append(countSpan)

            const plusImg = document.createElement("img")
            plusImg.src = "img/page/order/plus.svg"
            plusImg.alt = "plus"
            plusImg.className = "backet-plus"
            countDiv.append(plusImg)

            frontDiv.append(countDiv)
            li.append(frontDiv)

            const contentDiv = document.createElement("div")
            contentDiv.classList.add("backet-product__content")

            const sizeSpan = document.createElement("span")
            sizeSpan.classList.add("backet-product__size")
            sizeSpan.textContent = array[i].size
            contentDiv.append(sizeSpan)

            const nameHeading = document.createElement("h5")
            nameHeading.classList.add("backet-product__name-product")
            nameHeading.textContent = array[i].name
            contentDiv.append(nameHeading)

            const statusHeading = document.createElement("h6")
            statusHeading.classList.add("backet-product__status", "full-product-card__status", "full-product-card__status--in-stock", "icon-check")
            statusHeading.textContent = "В наявності"
            contentDiv.append(statusHeading)

            const costDiv = document.createElement("div")
            costDiv.classList.add("backet-product__cost")

            const currentPriceSpan = document.createElement("span")
            currentPriceSpan.className = "new-price"
            currentPriceSpan.textContent = array[i].newPrice
            costDiv.append(currentPriceSpan)

            if (array[i].oldPrice !== null) {
               const oldPriceSpan = document.createElement("span")
               oldPriceSpan.className = "old-price"
               oldPriceSpan.textContent = array[i].oldPrice
               costDiv.append(oldPriceSpan)
            }

            contentDiv.append(costDiv)
            li.append(contentDiv)

            const closeDiv = document.createElement("div")
            closeDiv.classList.add("backet-product__close")

            const closeImg = document.createElement("img")
            closeImg.src = "img/page/order/close.svg"
            closeImg.alt = "close"
            closeDiv.append(closeImg)

            li.append(closeDiv)

            console.log(li)
            path.append(li)
         }
      }
      updateDataInBacket()
   }
}

let favouriteArray = []
document.addEventListener("DOMContentLoaded", () => {
   favouriteArray = [] ?? JSON.parse(localStorage.getItem("favList"))
   uploadFavList("favList", "favList")
   // updateDataInBacket()
})

// =======
function updateDataInBacket() {
   const wrapper = document.querySelector(".backet-product")
   if (wrapper) {
      const allBlocks = document.querySelectorAll(".backet-product__block")
      let countOfProduct = 0
      let totalSum = 0
      allBlocks.forEach(item => {
         const count = parseInt(item.querySelector("#count-of-prod-in-backet").textContent)
         const rawPrice = item.querySelector(".new-price").textContent.trim()
         const cleanPrice = rawPrice.replace(/\D/g, "")
         const price = parseInt(cleanPrice, 10)

         countOfProduct += count
         totalSum += price * count
      })

      console.log(totalSum)
      const idCountOfProd = document.getElementById("countOfProducts")
      const idCountOfAllProd = document.getElementById("countOfAllProd")

      idCountOfProd.textContent = countOfProduct
      idCountOfAllProd.textContent = countOfProduct

      const totalSumId = document.querySelectorAll(".total-sum")
      totalSumId.forEach(item => (item.textContent = totalSum.toLocaleString("ua-UA")))
   }
}

// =============================
// ======
let currentTextureIndex = 0
function uploadTextures(ind, from, list, step = 5) {
   const id = document.getElementById(ind)
   if (id && from < list.length) {
      // id.innerHTML = ""

      let end
      if (from + step > list.length) end = list.length
      else end = from + step

      for (let i = from; i < end; i++) {
         const templ = `
         <label class="info-about-product__label">
            <img src="${list[i].img}"
                  alt="cloth texture" class="info-about-product__img-cloth">
            <input type="radio" name="texture" value="${list[i].name}">
         </label>
         `
         id.innerHTML += templ
      }
   }
}
const texturesList = [
   {
      name: "texture 1",
      img: "img/page/product-overview/mini-textures/texture1.jpg",
   },
   {
      name: "texture 2",
      img: "img/page/product-overview/mini-textures/texture2.jpg",
   },
   {
      name: "texture 3",
      img: "img/page/product-overview/mini-textures/texture1.jpg",
   },
   {
      name: "texture 4",
      img: "img/page/product-overview/mini-textures/texture2.jpg",
   },
   {
      name: "texture 5",
      img: "img/page/product-overview/mini-textures/texture1.jpg",
   },
   {
      name: "texture 6",
      img: "img/page/product-overview/mini-textures/texture2.jpg",
   },
   {
      name: "texture 7",
      img: "img/page/product-overview/mini-textures/texture1.jpg",
   },
   {
      name: "texture 8",
      img: "img/page/product-overview/mini-textures/texture2.jpg",
   },
   {
      name: "texture 9",
      img: "img/page/product-overview/mini-textures/texture1.jpg",
   },
   {
      name: "texture 10",
      img: "img/page/product-overview/mini-textures/texture2.jpg",
   },
   {
      name: "texture 11",
      img: "img/page/product-overview/mini-textures/texture1.jpg",
   },
   {
      name: "texture 12",
      img: "img/page/product-overview/mini-textures/texture2.jpg",
   },
]
uploadTextures("clothTextures", currentTextureIndex, texturesList)
// ============================================================

function replaceNavigation(mod = "replace") {
   const navigation = document.querySelector(".navigation-header__container")
   if (mod === "replace") {
      navigation.className = "open-menu__container"
      const newBlock = document.createElement("div")
      newBlock.className = "open-menu"
      newBlock.append(navigation)
      const header = document.querySelector(".header")
      header.append(newBlock)
   } else if (mod === "return") {
      const newBlock = document.querySelector(".open-menu")
      const navigationBlock = document.querySelector(".open-menu__container")
      if (navigationBlock) {
         navigationBlock.className = "navigation-header__container"
         const navigationHeader = document.querySelector(".navigation-header")
         navigationHeader.append(navigationBlock)
         newBlock.remove()
      }
   }
}
function changeNavig(mod = "add") {
   if (mod === "add") {
      const burgerButton = `
      <button class="navigation-header__burger">
                           <span></span>
      </button> 
      `
      const logo = document.getElementById("logo")
      const headerContainer = document.createElement("div")
      const tel = document.getElementById("tel")
      headerContainer.className = "navigation-header__container"
      headerContainer.innerHTML = burgerButton

      headerContainer.append(logo)
      headerContainer.append(tel)

      const navigationHeader = document.querySelector(".navigation-header")
      navigationHeader.append(headerContainer)
   } else if (mod === "remove") {
      const burger = document.querySelector(".navigation-header__burger")
      if (burger) {
         burger.remove()

         const logo = document.getElementById("logo")
         const tel = document.getElementById("tel")
         const catalog = document.getElementById("catalog")
         const search = document.getElementById("search")
         const act = document.getElementById("otherAct")

         const actionsBlock = document.querySelector(".actions-header__container")
         actionsBlock.append(logo)
         actionsBlock.append(catalog)
         actionsBlock.append(search)
         actionsBlock.append(tel)
         actionsBlock.append(act)

         const headerContainer = document.querySelector(".navigation-header__container")
         headerContainer.remove()
      }
   }
}
function replaceSearch(mod = "replace") {
   if (mod === "replace") {
      const act = document.getElementById("otherAct")
      const search = document.getElementById("search")
      act.prepend(search)
   } else if (mod === "return") {
      const act = document.getElementById("otherAct")
      const tel = document.getElementById("tel")
      const search = document.getElementById("search")

      const container = document.querySelector(".actions-header__container")
      container.append(search)
      container.append(tel)
      container.append(act)
   }
}

function openCloseSearch() {
   document.documentElement.classList.toggle("open-search")
   const container = document.querySelector(".actions-header__container")
   if (document.body.closest(".open-search")) {
      // const searchVoid = `
      //    <div id="newSearch" class="main-search icon-search">
      //       <input type="search" placeholder="Пошук товарів">
      //    </div>
      // `
      const searchVoid = document.createElement("div")
      searchVoid.className = "main-search icon-search"
      searchVoid.setAttribute("id", "newSearch")
      const input = document.createElement("input")
      input.setAttribute("type", "search")
      input.setAttribute("placeholder", "Пошук товарів")
      searchVoid.append(input)
      container.append(searchVoid)
      console.log("Add")
   } else {
      const searchVoid = document.querySelector(".main-search")
      if (searchVoid) searchVoid.remove()
      console.log("remove")
      // console.log(searchVoid)
   }
}

function openSearch() {
   const search = document.getElementById("search")
   if (search) {
      search.addEventListener("click", openCloseSearch)
   } else {
      console.log("Не існує")
   }
}
function deleteSearch() {
   const search = document.getElementById("search")
   if (search) search.removeEventListener("click", openCloseSearch)
   const searchVoid = document.querySelector(".main-search")
   if (searchVoid) searchVoid.remove()
   document.documentElement.classList.remove("open-search")
}

if (window.innerWidth < 990) {
   replaceNavigation("replace")
   changeNavig()
   replaceSearch()

   openSearch()
} else {
   replaceNavigation("return")
   replaceSearch("return")
   changeNavig("remove")
   deleteSearch()
}

const breackPoint = `(max-width: 990px)`
const matchMedia = window.matchMedia(breackPoint)
matchMedia.addEventListener("change", e => {
   const isTrue = e.matches
   if (isTrue) {
      replaceNavigation("replace")
      changeNavig()
      replaceSearch()
      openSearch()
   } else {
      replaceNavigation("return")
      replaceSearch("return")
      changeNavig("remove")
      deleteSearch()
   }
})

// ===========
// swipers

const heroSlider = document.querySelector(".hero__slider")
if (heroSlider) {
   new Swiper(".hero__slider", {
      navigation: {
         nextEl: "#heroNextSlide",
         prevEl: "#heroPrevSlide",
      },
      loop: true,
      grabCursor: true,
      keyboard: {
         enabled: true,
         onlyInVieport: true,
         pageDown: true,
      },
      // mousewheel: {
      //    sensitivity: 1,
      //    eventsTarget: ".portfolio__container",
      // },
      slidesPerView: "1",
      watchOverFlow: true,
      pagination: {
         el: ".hero__pagination",
         clickable: true,
      },
      // spaceBetween: 30,
      // centeredSlides: true,
      // initialSlide: 3,
      // breakpoints: {
      //    320: {
      //       slidesPerView: 1,
      //    },
      //    670: {
      //       slidesPerView: 2,
      //    },
      //    1020: {
      //       slidesPerView: 3,
      //    },
      // },
   })
}

const promotionSlider = document.querySelector("#promotion-slider")
if (promotionSlider) {
   new Swiper("#promotion-slider", {
      navigation: {
         nextEl: "#next-promotion",
         prevEl: "#prev-promotion",
      },
      grabCursor: true,
      keyboard: {
         enabled: true,
         onlyInVieport: true,
         pageDown: true,
      },
      loop: true,
      // mousewheel: {
      //    sensitivity: 1,
      //    eventsTarget: ".portfolio__container",
      // },
      slidesPerView: "3",
      // pagination: {
      //    el: ".swiper-pagination",
      //    clickable: true,
      // },
      watchOverFlow: true,
      spaceBetween: 30,
      // centeredSlides: true,
      // initialSlide: 3,
      breakpoints: {
         320: {
            slidesPerView: 1.5,
         },
         550: {
            slidesPerView: 2,
         },
         797: {
            slidesPerView: 3,
         },
      },
   })
}

const newsSlider = document.querySelector("#news-slider")
if (newsSlider) {
   new Swiper("#news-slider", {
      navigation: {
         nextEl: "#next-news",
         prevEl: "#prev-news",
      },
      grabCursor: true,
      keyboard: {
         enabled: true,
         onlyInVieport: true,
         pageDown: true,
      },
      loop: true,
      // mousewheel: {
      //    sensitivity: 1,
      //    eventsTarget: ".portfolio__container",
      // },
      slidesPerView: "3",
      // pagination: {
      //    el: ".swiper-pagination",
      //    clickable: true,
      // },
      watchOverFlow: true,
      spaceBetween: 30,
      // centeredSlides: true,
      // initialSlide: 3,
      breakpoints: {
         320: {
            slidesPerView: 1.5,
         },
         550: {
            slidesPerView: 2,
         },
         797: {
            slidesPerView: 3,
         },
      },
   })
}

// =========

// show more

const showMoreText = document.getElementById("show-more-text")
if (showMoreText) {
   const realTextHeight = showMoreText.clientHeight
   // console.log(realTextHeight)
   let stepHeight = 200
   showMoreText.style.height = `${stepHeight}px`
   showMoreText.style.overflow = "hidden"

   const showMoreButton = document.getElementById("show-more-button")
   showMoreButton.addEventListener("click", showMoreTextFunction)
   function showMoreTextFunction(e) {
      console.log(stepHeight)
      if (stepHeight <= realTextHeight) {
         let oldStep = stepHeight
         if (200 > realTextHeight - stepHeight) {
            let part = realTextHeight - stepHeight
            stepHeight += part + 80
            showMoreButton.classList.add("end")
            hideText(showMoreButton)
         } else {
            stepHeight += 200
            showMoreButton.classList.remove("end")
         }
         // console.log(stepHeight)

         // showMoreText.style.height = `${stepHeight}px`

         let showInterval = setInterval(() => {
            showMoreText.style.height = `${oldStep}px`
            if (oldStep <= stepHeight) {
               oldStep += 4
            } else {
               clearInterval(showInterval)
            }
         }, 10)
      }
   }

   function hideText(button) {
      if (button.classList.contains("end")) {
         // console.log("Hello")
         button.removeEventListener("click", showMoreTextFunction)
         button.addEventListener("click", hideTextFunction)
      }
   }

   function hideTextFunction() {
      console.log(stepHeight)
      let realHeight = realTextHeight
      let startHeight = 200
      let hideInterval = setInterval(() => {
         showMoreText.style.height = `${realHeight}px`
         if (realHeight >= startHeight) {
            realHeight -= 10
         } else {
            reverse()
            clearInterval(hideInterval)
         }
      }, 10)
   }

   function reverse() {
      stepHeight = 200
      showMoreButton.classList.remove("end")
      showMoreButton.removeEventListener("click", hideTextFunction)
      showMoreButton.addEventListener("click", showMoreTextFunction)
   }
}
// =============

const range = document.getElementById("feedback-range")

const container = document.querySelector(".feedback__body")
if (range && container) {
   range.addEventListener("input", rangeSlider)
   console.log(container.clientWidth)
   function rangeSlider(e) {
      const scrollPercentage = parseInt(range.value) / 100
      const scrollAmount = (container.scrollWidth - container.clientWidth) * scrollPercentage
      console.log(scrollAmount)
      // console.log(range.value)
      container.scrollTo({
         left: scrollAmount,
         behavior: "smooth", // плавна прокрутка
      })
   }

   let isDown = false
   let startX
   let scrollLeft

   container.addEventListener("mousedown", e => {
      isDown = true
      container.classList.add("active")
      startX = e.pageX - container.offsetLeft
      scrollLeft = container.scrollLeft
   })

   container.addEventListener("mouseleave", () => {
      isDown = false
      container.classList.remove("active")
   })

   container.addEventListener("mouseup", () => {
      isDown = false
      container.classList.remove("active")
   })

   container.addEventListener("mousemove", e => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - container.offsetLeft
      const walk = (x - startX) * 1 // швидкість прокрутки
      container.scrollLeft = scrollLeft - walk
   })
}
// -----------------

// window.addEventListener("resize", updateBlockHeight)
if (document.querySelector(".subcategories__wrapper")) {
   window.addEventListener("resize", logging)

   function logging() {
      console.log("Hello")
      showHideTheSubcategories()
      // const blockWrapper = document.querySelector(".subcategories__wrapper")
      // let realHeightOfBlock = blockWrapper.clientHeight
      // console.log(realHeightOfBlock)
   }
   showHideTheSubcategories()
   function showHideTheSubcategories() {
      const startingSizeOfBlock = 250

      const blockWrapper = document.querySelector(".subcategories__wrapper")
      blockWrapper.style.height = "auto"
      let realHeightOfBlock = blockWrapper.clientHeight

      const showSubcategoriesButton = document.getElementById("showSubcategories")
      if (showSubcategoriesButton && blockWrapper) {
         // updateBlockHeight()
         showSubcategoriesButton.addEventListener("click", showSubcategories)
         function showSubcategories(e) {
            realHeightOfBlock = blockWrapper.clientHeight
            console.log(realHeightOfBlock)
            let end = realHeightOfBlock
            blockWrapper.classList.add("show")
            showSubcategoriesButton.textContent = "Показати підкатегорії"
            blockWrapper.style.height = "auto"
            let showInerval = setInterval(() => {
               if (end > startingSizeOfBlock) {
                  blockWrapper.style.height = `${end}px`
                  end -= 10
               } else {
                  chandgeMode()
                  clearInterval(showInerval)
               }
            }, 10)
         }

         function chandgeMode() {
            showSubcategoriesButton.removeEventListener("click", showSubcategories)
            showSubcategoriesButton.addEventListener("click", hideSubcategories)
         }

         function hideSubcategories() {
            // realHeightOfBlock = blockWrapper.clientHeight
            blockWrapper.classList.remove("show")
            showSubcategoriesButton.textContent = "Приховати підкатегорії"
            let end = realHeightOfBlock

            let start = startingSizeOfBlock

            let showInerval = setInterval(() => {
               if (end > start) {
                  blockWrapper.style.height = `${start}px`
                  start += 10
               } else {
                  clearInterval(showInerval)
                  reverse()
               }
            }, 10)
         }

         function reverse() {
            // blockWrapper.style.height = "auto"
            showSubcategoriesButton.removeEventListener("click", hideSubcategories)
            showSubcategoriesButton.addEventListener("click", showSubcategories)
         }

         if (blockWrapper.classList.contains("show")) {
            blockWrapper.style.height = "250px"
            reverse()
         }
      }
   }
}
// глюки при асинхронному зменшенні розміру вікна, треба виправити  resize

// ------------------------

// pages swiper

// const productsPagesCount = 18

// const productsPages = document.querySelector("#products-pages")
// for (let i = 1; i <= 9; i++) {
//    const button = document.createElement("a")
//    button.setAttribute("href", "#")
//    if (i === 1) button.className = "categiries-products__page active"
//    else button.className = "categiries-products__page"
//    if (i === 8) button.textContent = "..."
//    else if (i === 9) button.textContent = productsPagesCount
//    else button.textContent = i

//    productsPages.append(button)
// }

// function translatePagesNumbersToRight() {
//    const productsPages = document.querySelector("#products-pages")
//    let firstNum = parseInt(document.querySelector(".categiries-products__page").textContent)
//    firstNum++

//    let activeItem
//    const allPages = document.querySelectorAll(".categiries-products__page")
//    allPages.forEach(item => {
//       if (item.classList.contains("active")) {
//          if (item.nextElementSibling) activeItem = parseInt(item.nextElementSibling.textContent)
//       }
//    })

//    if (activeItem - 4 <= 0) {
//       productsPages.innerHTML = ""
//       for (let i = 1; i <= firstNum + 7; i++) {
//          let button
//          if (i === 8) {
//             button = document.createElement("span")
//             button.textContent = "..."
//          } else if (i === activeItem) {
//             button = document.createElement("span")
//             button.textContent = i
//          } else if (i === 9) {
//             button = document.createElement("a")
//             button.setAttribute("href", "#")
//             button.textContent = productsPagesCount
//          } else {
//             button = document.createElement("a")
//             button.setAttribute("href", "#")
//             button.textContent = i
//          }

//          if (activeItem === i && i !== 8) button.className = "categiries-products__page active"
//          else button.className = "categiries-products__page"

//          // if (i === 8) console.log("8")
//          // console.log(thisPageNum)
//          productsPages.append(button)
//       }
//       activeItem++
//    } else if (activeItem + 4 >= productsPagesCount) {
//       productsPages.innerHTML = ""

//       for (let i = productsPagesCount - 8; i <= productsPagesCount; i++) {
//          let button
//          if (i === activeItem) {
//             button = document.createElement("span")
//             button.textContent = i
//          } else if (i === productsPagesCount) {
//             button = document.createElement("a")
//             button.setAttribute("href", "#")
//             button.textContent = productsPagesCount
//          } else {
//             button = document.createElement("a")
//             button.setAttribute("href", "#")
//             button.textContent = i
//          }

//          if (activeItem === i) button.className = "categiries-products__page active"
//          else button.className = "categiries-products__page"

//          // if (i === 8) console.log("8")
//          // console.log(thisPageNum)
//          productsPages.append(button)
//       }

//       if (activeItem !== productsPagesCount) activeItem++
//    } else if (activeItem - 4 > 0) {
//       productsPages.innerHTML = ""
//       for (let i = activeItem - 4; i <= activeItem + 4; i++) {
//          let button
//          if (i === activeItem + 3) {
//             button = document.createElement("span")
//             button.textContent = "..."
//          } else if (i === activeItem) {
//             button = document.createElement("span")
//             button.textContent = i
//          } else if (i === activeItem + 4) {
//             button = document.createElement("a")
//             button.setAttribute("href", "#")
//             button.textContent = productsPagesCount
//          } else {
//             button = document.createElement("a")
//             button.setAttribute("href", "#")
//             button.textContent = i
//          }

//          if (activeItem === i && i !== activeItem + 3) button.className = "categiries-products__page active"
//          else button.className = "categiries-products__page"

//          // if (i === 8) console.log("8")
//          // console.log(thisPageNum)
//          productsPages.append(button)
//       }
//       if (activeItem !== productsPagesCount) activeItem++
//    }

//    // productsPages.innerHTML = ""
//    // if (firstNum + 8 >= productsPagesCount) {
//    //    firstNum = productsPagesCount - 8
//    //    for (let i = firstNum; i <= firstNum + 8; i++) {
//    //       const button = document.createElement("a")
//    //       button.setAttribute("href", "#")
//    //       if (activeItem === i) button.className = "categiries-products__page active"
//    //       else button.className = "categiries-products__page"
//    //       button.textContent = i

//    //       productsPages.append(button)
//    //    }
//    // } else {
//    //    for (let i = firstNum; i <= firstNum + 8; i++) {
//    //       const button = document.createElement("a")
//    //       button.setAttribute("href", "#")
//    //       if (activeItem === i) button.className = "categiries-products__page active"
//    //       else button.className = "categiries-products__page"
//    //       if (i === firstNum + 7) button.textContent = "..."
//    //       else if (i === firstNum + 8) button.textContent = productsPagesCount
//    //       else button.textContent = i
//    //       productsPages.append(button)
//    //    }
//    // }
// }

// function translatePagesNumbersToLeft() {
//    // const productsPages = document.querySelector("#products-pages")
//    // let firstNum = parseInt(document.querySelector(".categiries-products__page").textContent)
//    // firstNum--
//    // if (firstNum > 0) {
//    //    productsPages.innerHTML = ""
//    //    if (firstNum + 8 >= productsPagesCount) {
//    //       firstNum = productsPagesCount - 8
//    //       for (let i = firstNum; i <= firstNum + 8; i++) {
//    //          const button = document.createElement("a")
//    //          button.setAttribute("href", "#")
//    //          button.className = "categiries-products__page"
//    //          button.textContent = i
//    //          productsPages.append(button)
//    //       }
//    //    } else {
//    //       for (let i = firstNum; i <= firstNum + 8; i++) {
//    //          const button = document.createElement("a")
//    //          button.setAttribute("href", "#")
//    //          button.className = "categiries-products__page"
//    //          if (i === firstNum + 7) button.textContent = "..."
//    //          else if (i === firstNum + 8) button.textContent = productsPagesCount
//    //          else button.textContent = i
//    //          productsPages.append(button)
//    //       }
//    //    }
//    // }

//    const productsPages = document.querySelector("#products-pages")
//    let firstNum = parseInt(document.querySelector(".categiries-products__page").textContent)
//    firstNum--

//    let activeItem
//    const allPages = document.querySelectorAll(".categiries-products__page")
//    allPages.forEach(item => {
//       if (item.classList.contains("active")) {
//          if (item.previousElementSibling) activeItem = parseInt(item.previousElementSibling.textContent)
//       }
//    })

//    // console.log(activeItem)
//    if (activeItem > 0) {
//       if (activeItem - 4 <= 0) {
//          productsPages.innerHTML = ""
//          for (let i = 1; i <= firstNum + 9; i++) {
//             let button
//             if (i === 8) {
//                button = document.createElement("span")
//                button.textContent = "..."
//             } else if (i === activeItem) {
//                button = document.createElement("span")
//                button.textContent = i
//             } else if (i === 9) {
//                button = document.createElement("a")
//                button.setAttribute("href", "#")
//                button.textContent = productsPagesCount
//             } else {
//                button = document.createElement("a")
//                button.setAttribute("href", "#")
//                button.textContent = i
//             }

//             if (activeItem === i && i !== 8) button.className = "categiries-products__page active"
//             else button.className = "categiries-products__page"

//             // if (i === 8) console.log("8")
//             // console.log(thisPageNum)
//             productsPages.append(button)
//          }
//          activeItem--
//       } else if (activeItem + 4 >= productsPagesCount) {
//          productsPages.innerHTML = ""

//          for (let i = productsPagesCount - 8; i <= productsPagesCount; i++) {
//             let button
//             if (i === activeItem) {
//                button = document.createElement("span")
//                button.textContent = i
//             } else if (i === productsPagesCount) {
//                button = document.createElement("a")
//                button.setAttribute("href", "#")
//                button.textContent = productsPagesCount
//             } else {
//                button = document.createElement("a")
//                button.setAttribute("href", "#")
//                button.textContent = i
//             }

//             if (activeItem === i) button.className = "categiries-products__page active"
//             else button.className = "categiries-products__page"

//             // if (i === 8) console.log("8")
//             // console.log(thisPageNum)
//             productsPages.append(button)
//          }

//          if (activeItem !== productsPagesCount) activeItem--
//       } else if (activeItem - 4 > 0) {
//          productsPages.innerHTML = ""
//          for (let i = activeItem - 4; i <= activeItem + 4; i++) {
//             let button
//             if (i === activeItem + 3) {
//                button = document.createElement("span")
//                button.textContent = "..."
//             } else if (i === activeItem) {
//                button = document.createElement("span")
//                button.textContent = i
//             } else if (i === activeItem + 4) {
//                button = document.createElement("a")
//                button.setAttribute("href", "#")
//                button.textContent = productsPagesCount
//             } else {
//                button = document.createElement("a")
//                button.setAttribute("href", "#")
//                button.textContent = i
//             }

//             if (activeItem === i && i !== activeItem + 3) button.className = "categiries-products__page active"
//             else button.className = "categiries-products__page"

//             // if (i === 8) console.log("8")
//             // console.log(thisPageNum)
//             productsPages.append(button)
//          }
//          if (activeItem !== productsPagesCount) activeItem--
//       }
//    }
// }

// function detecteActiveLink(mode) {
//    const allPages = document.querySelectorAll(".categiries-products__page")
//    if (allPages) {
//       if (mode === "right") {
//          allPages.forEach(item => {
//             if (item.classList.contains("active")) {
//                return parseInt(item.nextElementSibling.textContent)
//             } else {
//                return null
//             }
//          })
//       } else if (mode === "left") {
//          allPages.forEach(item => {
//             if (item.classList.contains("active")) return parseInt(item.previousElementSibling.textContent)
//          })
//       }
//    }
// }

// function moveActiveRight(item) {
//    item.classList.remove("active")
//    item.nextElementSibling.add("active")
// }
// function moveActiveLeft(item) {
//    item.classList.remove("active")
//    item.previousElementSibling.add("active")
// }

// document.querySelector("#categiries-products-next").addEventListener("click", translatePagesNumbersToRight)
// document.querySelector("#categiries-products-prev").addEventListener("click", translatePagesNumbersToLeft)

// productsPages.addEventListener("click", shiftPages)
// function shiftPages(e) {
//    const target = e.target
//    if (target.closest(".categiries-products__page")) {
//       const thisPage = target.closest(".categiries-products__page")

//       let thisPageNum
//       if (isNaN(parseInt(thisPage.textContent))) {
//          let el = thisPage.previousElementSibling
//          if (el) thisPageNum = parseInt(el.textContent) + 1
//          else {
//             let otherEl = thisPage.nextElementSibling
//             thisPageNum = parseInt(otherEl.textContent) - 1
//          }
//       } else thisPageNum = parseInt(thisPage.textContent)
//       // translatePagesNumbersToRight(thisPageNum)

//       const allPages = document.querySelectorAll(".categiries-products__page")
//       allPages.forEach(item => item.classList.remove("active"))

//       thisPage.classList.add("active")

//       const productsPages = document.querySelector("#products-pages")

//       if (thisPageNum - 4 < 0) {
//          console.log("thisPageNum - 4 < 0")
//          const firstLinkNum = parseInt(document.querySelector(".categiries-products__page").textContent)
//          productsPages.innerHTML = ""
//          // console.log(firstLinkNum)
//          for (let i = 1; i <= firstLinkNum + 8; i++) {
//             let button
//             if (i === 8) {
//                button = document.createElement("span")
//                button.textContent = "..."
//             } else if (i === firstLinkNum + 8) {
//                button = document.createElement("a")
//                button.setAttribute("href", "#")
//                button.textContent = productsPagesCount
//             } else if (thisPageNum === i) {
//                button = document.createElement("span")
//                button.textContent = i
//             } else {
//                button = document.createElement("a")
//                button.setAttribute("href", "#")
//                button.textContent = i
//             }

//             if (thisPageNum === i && i !== 8) button.className = "categiries-products__page active"
//             else button.className = "categiries-products__page"

//             // if (i === 8) console.log("8")
//             // console.log(thisPageNum)
//             productsPages.append(button)
//          }
//       } else if (thisPageNum + 4 >= productsPagesCount) {
//          console.log("thisPageNum + 4 >= productsPagesCount")
//          const lastElem = productsPagesCount

//          productsPages.innerHTML = ""
//          // console.log(firstLinkNum)
//          for (let i = lastElem - 8; i <= lastElem; i++) {
//             let button
//             if (i === lastElem) {
//                button = document.createElement("a")
//                button.setAttribute("href", "#")
//                button.textContent = productsPagesCount
//             } else if (thisPageNum === i) {
//                button = document.createElement("span")
//                button.textContent = i
//             } else {
//                button = document.createElement("a")
//                button.setAttribute("href", "#")
//                button.textContent = i
//             }

//             if (thisPageNum === i && i !== 8) button.className = "categiries-products__page active"
//             else button.className = "categiries-products__page"

//             // if (i === 8) console.log("8")
//             // console.log(thisPageNum)
//             productsPages.append(button)
//          }
//       } else if (thisPageNum - 4 > 0) {
//          // console.log(" > 0")
//          console.log("thisPageNum - 4 > 0")
//          console.log(thisPageNum)
//          if (thisPageNum + 4 <= productsPagesCount) {
//             productsPages.innerHTML = ""
//             // firstNum = productsPagesCount - 8
//             for (let i = thisPageNum - 4; i <= thisPageNum + 4; i++) {
//                // console.log(thisPageNum)
//                // console.log(i)
//                // const button = document.createElement("a")
//                // button.setAttribute("href", "#")
//                // if (thisPageNum === i) button.className = "categiries-products__page active"
//                // else button.className = "categiries-products__page"
//                // button.textContent = i
//                // productsPages.append(button)
//                let button
//                if (i === thisPageNum + 3) {
//                   button = document.createElement("span")
//                   button.textContent = "..."
//                } else if (i === thisPageNum + 4) {
//                   button = document.createElement("a")
//                   button.setAttribute("href", "#")
//                   button.textContent = productsPagesCount
//                } else if (thisPageNum === i) {
//                   button = document.createElement("span")
//                   button.textContent = i
//                } else {
//                   button = document.createElement("a")
//                   button.setAttribute("href", "#")
//                   button.textContent = i
//                }

//                if (thisPageNum === i && i !== thisPageNum + 3) button.className = "categiries-products__page active"
//                else button.className = "categiries-products__page"

//                if (i === thisPageNum + 3) button.className = "categiries-products__page"
//                productsPages.append(button)
//             }
//          }
//       }
//    }
// }

// class NavigaionPages {
//    constructor(productsPagesCount, size, pathToPaste, activeClass) {
//       this.productsPagesCount = productsPagesCount
//       this.pathToPaste = pathToPaste
//       this.size = parseInt(size)
//       this.activeClass = activeClass

//       // ----------
//       this.idForPrevButton = this.generateUniqueID()
//       this.idForNextButton = this.generateUniqueID()
//       this.idForPagesWrapper = this.generateUniqueID()

//       // ----------

//       this.el = this.render()
//    }

//    generateUniqueID() {
//       return "id-" + Date.now() + "-" + Math.floor(Math.random() * 1000)
//    }

//    setupPages() {
//       const pagesWrapper = document.getElementById(this.idForPagesWrapper)
//       for (let i = 1; i <= this.size; i++) {
//          const button = document.createElement("a")
//          button.setAttribute("href", "#")
//          if (i === 1) button.className = `navigation-pages__page ${this.activeClass}`
//          else button.className = "navigation-pages__page"
//          if (i === this.size - 1) button.textContent = "..."
//          else if (i === this.size) button.textContent = this.productsPagesCount
//          else button.textContent = i
//          pagesWrapper.append(button)
//       }
//    }
//    // -----------------
//    setupPagesWithLessPages() {
//       const pagesWrapper = document.getElementById(this.idForPagesWrapper)
//       for (let i = 1; i <= this.size; i++) {
//          // console.log("work")
//          const button = document.createElement("a")
//          button.setAttribute("href", "#")
//          if (i === 1) button.className = `navigation-pages__page ${this.activeClass}`
//          else button.className = "navigation-pages__page"
//          if (i === this.size - i) button.textContent = i
//          button.textContent = i
//          // console.log(button.textContent)
//          pagesWrapper.append(button)
//       }
//    }
//    // -----------------

//    setEventsToArrowButtons() {
//       document.getElementById(this.idForNextButton).addEventListener("click", this.translatePagesNumbersToRight.bind(this))
//       document.getElementById(this.idForPrevButton).addEventListener("click", this.translatePagesNumbersToLeft.bind(this))
//       document.getElementById(this.idForPagesWrapper).addEventListener("click", this.shiftPages.bind(this))
//       // document.getElementById(this.idForPagesWrapper).addEventListener("click", this.translatePages.bind(this))
//    }
//    translatePagesNumbersToRight() {
//       const pagesWrapper = document.getElementById(this.idForPagesWrapper)
//       let firstNum = parseInt(document.querySelector(".navigation-pages__page").textContent)
//       firstNum++
//       let activeItem
//       const allPages = document.querySelectorAll(".navigation-pages__page")
//       allPages.forEach(item => {
//          if (item.classList.contains(this.activeClass)) {
//             if (item.nextElementSibling) activeItem = parseInt(item.nextElementSibling.textContent)
//          }
//       })

//       // console.log(parseInt(allPages[allPages.length - 1].textContent))
//       // if (activeItem !== parseInt(allPages[allPages.length - 1].textContent)) {
//       if (activeItem - Math.floor(this.size / 2) <= 0) {
//          pagesWrapper.innerHTML = ""
//          for (let i = 1; i <= firstNum + this.size - 2; i++) {
//             let button
//             if (i === this.size - 1) {
//                button = document.createElement("span")
//                button.textContent = "..."
//             } else if (i === activeItem) {
//                button = document.createElement("span")
//                button.textContent = i
//             } else if (i === this.size) {
//                button = document.createElement("a")
//                button.setAttribute("href", "#")
//                button.textContent = this.productsPagesCount
//             } else {
//                button = document.createElement("a")
//                button.setAttribute("href", "#")
//                button.textContent = i
//             }

//             if (activeItem === i && i !== 8) button.className = `navigation-pages__page ${this.activeClass}`
//             else button.className = "navigation-pages__page"

//             // if (i === 8) console.log("8")
//             // console.log(thisPageNum)
//             pagesWrapper.append(button)
//          }
//          activeItem++
//       } else if (activeItem + Math.floor(this.size / 2) >= this.productsPagesCount) {
//          pagesWrapper.innerHTML = ""

//          for (let i = this.productsPagesCount - this.size + 1; i <= this.productsPagesCount; i++) {
//             let button
//             if (i === activeItem) {
//                button = document.createElement("span")
//                button.textContent = i
//             } else if (i === this.productsPagesCount) {
//                button = document.createElement("a")
//                button.setAttribute("href", "#")
//                button.textContent = this.productsPagesCount
//             } else {
//                button = document.createElement("a")
//                button.setAttribute("href", "#")
//                button.textContent = i
//             }

//             if (activeItem === i) button.className = `navigation-pages__page ${this.activeClass}`
//             else button.className = "navigation-pages__page"

//             // if (i === 8) console.log("8")
//             // console.log(thisPageNum)
//             pagesWrapper.append(button)
//          }

//          if (activeItem !== this.productsPagesCount) activeItem++
//       } else if (activeItem - Math.floor(this.size / 2) > 0) {
//          pagesWrapper.innerHTML = ""
//          for (let i = activeItem - Math.floor(this.size / 2); i <= activeItem + Math.floor(this.size / 2); i++) {
//             let button
//             if (i === activeItem + Math.floor(this.size / 2) - 1) {
//                button = document.createElement("span")
//                button.textContent = "..."
//             } else if (i === activeItem) {
//                button = document.createElement("span")
//                button.textContent = i
//             } else if (i === activeItem + Math.floor(this.size / 2)) {
//                button = document.createElement("a")
//                button.setAttribute("href", "#")
//                button.textContent = this.productsPagesCount
//             } else {
//                button = document.createElement("a")
//                button.setAttribute("href", "#")
//                button.textContent = i
//             }

//             if (activeItem === i && i !== activeItem + Math.floor(this.size / 2) - 1) button.className = `navigation-pages__page ${this.activeClass}`
//             else button.className = "navigation-pages__page"

//             // if (i === 8) console.log("8")
//             // console.log(thisPageNum)
//             pagesWrapper.append(button)
//          }
//          if (activeItem !== this.productsPagesCount) activeItem++
//       }
//    }
//    setEventsToArrowButtonsWithLessPages() {
//       document.getElementById(this.idForNextButton).addEventListener("click", this.translatePagesNumbersToRightWithLessPages.bind(this))
//       document.getElementById(this.idForPrevButton).addEventListener("click", this.translatePagesNumbersToLeftWithLessPages.bind(this))
//       document.getElementById(this.idForPagesWrapper).addEventListener("click", this.shiftPagesWithLessPages.bind(this))
//       // document.getElementById(this.idForPagesWrapper).addEventListener("click", this.translatePages.bind(this))
//    }
//    // ---------
//    translatePagesNumbersToRightWithLessPages() {
//       const pagesWrapper = document.getElementById(this.idForPagesWrapper)
//       // let firstNum = parseInt(document.querySelector(".navigation-pages__page").textContent)
//       // firstNum++
//       let activeItem
//       const allPages = document.querySelectorAll(".navigation-pages__page")
//       allPages.forEach(item => {
//          if (item.classList.contains(this.activeClass)) {
//             if (item.nextElementSibling) activeItem = parseInt(item.nextElementSibling.textContent)
//          }
//       })

//       if (activeItem) {
//          pagesWrapper.innerHTML = ""
//          for (let i = 1; i <= this.size; i++) {
//             let button
//             if (i === activeItem) {
//                button = document.createElement("span")
//                button.textContent = i
//                button.className = `navigation-pages__page ${this.activeClass}`
//             } else {
//                button = document.createElement("a")
//                button.setAttribute("href", "#")
//                button.textContent = i
//                button.className = "navigation-pages__page"
//             }

//             // button.className = "navigation-pages__page"

//             pagesWrapper.append(button)
//          }
//          activeItem++
//       }
//    }
//    translatePagesNumbersToLeftWithLessPages() {
//       // console.log("left")
//       const pagesWrapper = document.getElementById(this.idForPagesWrapper)
//       let firstNum = parseInt(document.querySelector(".navigation-pages__page").textContent)
//       firstNum--

//       let activeItem
//       const allPages = document.querySelectorAll(".navigation-pages__page")
//       allPages.forEach(item => {
//          if (item.classList.contains(this.activeClass)) {
//             if (item.previousElementSibling) activeItem = parseInt(item.previousElementSibling.textContent)
//          }
//       })

//       // console.log(activeItem)
//       if (activeItem > 0) {
//          pagesWrapper.innerHTML = ""
//          for (let i = 1; i <= this.size; i++) {
//             let button
//             if (i === activeItem) {
//                button = document.createElement("span")
//                button.textContent = i
//                button.className = `navigation-pages__page ${this.activeClass}`
//             } else {
//                button = document.createElement("a")
//                button.setAttribute("href", "#")
//                button.textContent = i
//                button.className = "navigation-pages__page"
//             }
//             // if (thisPageNum === i) button.className = `navigation-pages__page ${this.activeClass}`
//             //             else button.className = "navigation-pages__page"
//             //             button.className = "navigation-pages__page"

//             pagesWrapper.append(button)
//          }
//          activeItem--
//       }
//    }

//    // ---------
//    translatePagesNumbersToLeft() {
//       console.log("left")
//       const pagesWrapper = document.getElementById(this.idForPagesWrapper)
//       let firstNum = parseInt(document.querySelector(".navigation-pages__page").textContent)
//       firstNum--

//       let activeItem
//       const allPages = document.querySelectorAll(".navigation-pages__page")
//       allPages.forEach(item => {
//          if (item.classList.contains(this.activeClass)) {
//             if (item.previousElementSibling) activeItem = parseInt(item.previousElementSibling.textContent)
//          }
//       })

//       // console.log(activeItem)
//       if (activeItem > 0) {
//          if (activeItem - Math.floor(this.size / 2) <= 0) {
//             pagesWrapper.innerHTML = ""
//             for (let i = 1; i <= firstNum + this.size; i++) {
//                let button
//                if (i === this.size - 1) {
//                   button = document.createElement("span")
//                   button.textContent = "..."
//                } else if (i === activeItem) {
//                   button = document.createElement("span")
//                   button.textContent = i
//                } else if (i === this.size) {
//                   button = document.createElement("a")
//                   button.setAttribute("href", "#")
//                   button.textContent = this.productsPagesCount
//                } else {
//                   button = document.createElement("a")
//                   button.setAttribute("href", "#")
//                   button.textContent = i
//                }

//                if (activeItem === i && i !== this.size - 1) button.className = `navigation-pages__page ${this.activeClass}`
//                else button.className = "navigation-pages__page"

//                // if (i === 8) console.log("8")
//                // console.log(thisPageNum)
//                pagesWrapper.append(button)
//             }
//             activeItem--
//          } else if (activeItem + Math.floor(this.size / 2) >= this.productsPagesCount) {
//             pagesWrapper.innerHTML = ""

//             for (let i = this.productsPagesCount - this.size + 1; i <= this.productsPagesCount; i++) {
//                let button
//                if (i === activeItem) {
//                   button = document.createElement("span")
//                   button.textContent = i
//                } else if (i === this.productsPagesCount) {
//                   button = document.createElement("a")
//                   button.setAttribute("href", "#")
//                   button.textContent = this.productsPagesCount
//                } else {
//                   button = document.createElement("a")
//                   button.setAttribute("href", "#")
//                   button.textContent = i
//                }

//                if (activeItem === i) button.className = `navigation-pages__page ${this.activeClass}`
//                else button.className = "navigation-pages__page"

//                // if (i === 8) console.log("8")
//                // console.log(thisPageNum)
//                pagesWrapper.append(button)
//             }

//             if (activeItem !== this.productsPagesCount) activeItem--
//          } else if (activeItem - Math.floor(this.size / 2) > 0) {
//             pagesWrapper.innerHTML = ""
//             for (let i = activeItem - Math.floor(this.size / 2); i <= activeItem + Math.floor(this.size / 2); i++) {
//                let button
//                if (i === activeItem + Math.floor(this.size / 2) - 1) {
//                   button = document.createElement("span")
//                   button.textContent = "..."
//                } else if (i === activeItem) {
//                   button = document.createElement("span")
//                   button.textContent = i
//                } else if (i === activeItem + Math.floor(this.size / 2)) {
//                   button = document.createElement("a")
//                   button.setAttribute("href", "#")
//                   button.textContent = this.productsPagesCount
//                } else {
//                   button = document.createElement("a")
//                   button.setAttribute("href", "#")
//                   button.textContent = i
//                }

//                if (activeItem === i && i !== activeItem + Math.floor(this.size / 2) - 1)
//                   button.className = `navigation-pages__page ${this.activeClass}`
//                else button.className = "navigation-pages__page"

//                // if (i === 8) console.log("8")
//                // console.log(thisPageNum)
//                pagesWrapper.append(button)
//             }
//             if (activeItem !== this.productsPagesCount) activeItem--
//          }
//       }
//    }
//    shiftPages(e) {
//       const target = e.target
//       if (target.closest(".navigation-pages__page")) {
//          const thisPage = target.closest(".navigation-pages__page")

//          let thisPageNum
//          if (isNaN(parseInt(thisPage.textContent))) {
//             let el = thisPage.previousElementSibling
//             if (el) thisPageNum = parseInt(el.textContent) + 1
//             else {
//                let otherEl = thisPage.nextElementSibling
//                thisPageNum = parseInt(otherEl.textContent) - 1
//             }
//          } else thisPageNum = parseInt(thisPage.textContent)
//          // translatePagesNumbersToRight(thisPageNum)

//          const allPages = document.querySelectorAll(".navigation-pages__page")
//          allPages.forEach(item => item.classList.remove(this.activeClass))

//          thisPage.classList.add(this.activeClass)

//          const pagesWrapper = document.getElementById(this.idForPagesWrapper)

//          if (thisPageNum - Math.floor(this.size / 2) < 0) {
//             // console.log("thisPageNum - 4 < 0")
//             const firstLinkNum = parseInt(document.querySelector(".navigation-pages__page").textContent)
//             pagesWrapper.innerHTML = ""
//             // console.log(firstLinkNum)
//             for (let i = 1; i <= firstLinkNum + this.size - 1; i++) {
//                let button
//                if (i === this.size - 1) {
//                   button = document.createElement("span")
//                   button.textContent = "..."
//                } else if (i === firstLinkNum + this.size - 1) {
//                   button = document.createElement("a")
//                   button.setAttribute("href", "#")
//                   button.textContent = this.productsPagesCount
//                } else if (thisPageNum === i) {
//                   button = document.createElement("span")
//                   button.textContent = i
//                } else {
//                   button = document.createElement("a")
//                   button.setAttribute("href", "#")
//                   button.textContent = i
//                }

//                if (thisPageNum === i && i !== 8) button.className = `navigation-pages__page ${this.activeClass}`
//                else button.className = "navigation-pages__page"

//                // if (i === 8) console.log("8")
//                // console.log(thisPageNum)
//                pagesWrapper.append(button)
//             }
//          } else if (thisPageNum + Math.floor(this.size / 2) >= this.productsPagesCount) {
//             // console.log("thisPageNum + 4 >= productsPagesCount")
//             const lastElem = this.productsPagesCount

//             pagesWrapper.innerHTML = ""
//             // console.log(firstLinkNum)
//             for (let i = lastElem - this.size + 1; i <= lastElem; i++) {
//                let button
//                if (i === lastElem) {
//                   button = document.createElement("a")
//                   button.setAttribute("href", "#")
//                   button.textContent = this.productsPagesCount
//                } else if (thisPageNum === i) {
//                   button = document.createElement("span")
//                   button.textContent = i
//                } else {
//                   button = document.createElement("a")
//                   button.setAttribute("href", "#")
//                   button.textContent = i
//                }

//                if (thisPageNum === i && i !== this.size - 1) button.className = `navigation-pages__page ${this.activeClass}`
//                else button.className = "navigation-pages__page"

//                // if (i === 8) console.log("8")
//                // console.log(thisPageNum)
//                pagesWrapper.append(button)
//             }
//          } else if (thisPageNum - Math.floor(this.size / 2) > 0) {
//             // console.log(" > 0")
//             // console.log("thisPageNum - 4 > 0")
//             // console.log(thisPageNum)
//             if (thisPageNum + Math.floor(this.size / 2) <= this.productsPagesCount) {
//                pagesWrapper.innerHTML = ""

//                for (let i = thisPageNum - Math.floor(this.size / 2); i <= thisPageNum + Math.floor(this.size / 2); i++) {
//                   let button
//                   if (i === thisPageNum + Math.floor(this.size / 2) - 1) {
//                      button = document.createElement("span")
//                      button.textContent = "..."
//                   } else if (i === thisPageNum + Math.floor(this.size / 2)) {
//                      button = document.createElement("a")
//                      button.setAttribute("href", "#")
//                      button.textContent = this.productsPagesCount
//                   } else if (thisPageNum === i) {
//                      button = document.createElement("span")
//                      button.textContent = i
//                   } else {
//                      button = document.createElement("a")
//                      button.setAttribute("href", "#")
//                      button.textContent = i
//                   }

//                   if (thisPageNum === i && i !== thisPageNum + Math.floor(this.size / 2) - 1)
//                      button.className = `navigation-pages__page ${this.activeClass}`
//                   else button.className = "navigation-pages__page"

//                   if (i === thisPageNum + Math.floor(this.size / 2) - 1) button.className = "navigation-pages__page"
//                   pagesWrapper.append(button)
//                }
//             }
//          }
//       }
//    }
//    shiftPagesWithLessPages(e) {
//       const target = e.target
//       if (target.closest(".navigation-pages__page")) {
//          const thisPage = target.closest(".navigation-pages__page")

//          let thisPageNum
//          if (isNaN(parseInt(thisPage.textContent))) {
//             let el = thisPage.previousElementSibling
//             if (el) thisPageNum = parseInt(el.textContent) + 1
//             else {
//                let otherEl = thisPage.nextElementSibling
//                thisPageNum = parseInt(otherEl.textContent) - 1
//             }
//          } else thisPageNum = parseInt(thisPage.textContent)
//          // translatePagesNumbersToRight(thisPageNum)

//          const allPages = document.querySelectorAll(".navigation-pages__page")
//          allPages.forEach(item => item.classList.remove(this.activeClass))

//          thisPage.classList.add(this.activeClass)

//          const pagesWrapper = document.getElementById(this.idForPagesWrapper)

//          const firstLinkNum = parseInt(document.querySelector(".navigation-pages__page").textContent)
//          pagesWrapper.innerHTML = ""
//          // console.log(firstLinkNum)
//          for (let i = 1; i <= this.size; i++) {
//             let button
//             if (thisPageNum === i) {
//                button = document.createElement("span")
//                button.textContent = i
//             } else {
//                button = document.createElement("a")
//                button.setAttribute("href", "#")
//                button.textContent = i
//             }
//             if (thisPageNum === i) button.className = `navigation-pages__page ${this.activeClass}`
//             else button.className = "navigation-pages__page"

//             pagesWrapper.append(button)
//          }
//       }
//    }
//    createFloor() {
//       const floor = document.getElementById(this.pathToPaste)
//       if (floor) {
//          const template = `
//       <div class="navigation-pages">
//            <button class="navigation-pages__button"
//               id="${this.idForPrevButton}"><i class="fa-solid fa-arrow-left"></i></button>
//                     <div id="${this.idForPagesWrapper}" class="navigation-pages__wrapper-pages"></div>
//            <button class="navigation-pages__button"
//               id="${this.idForNextButton}"> <i class="fa-solid fa-arrow-right"></i></button>
//      </div>
//      `
//          floor.innerHTML = template
//       } else return false
//    }

//    error() {
//       console.log("Error")
//       return "Error"
//    }
//    render() {
//       if (this.productsPagesCount <= 7) {
//          this.createFloor()
//          this.setupPagesWithLessPages()
//          this.setEventsToArrowButtonsWithLessPages()
//       } else {
//          if (this.size > this.productsPagesCount) this.error()
//          else {
//             this.createFloor()
//             this.setupPages()
//             this.setEventsToArrowButtons()
//          }
//       }
//    }
// }

const products = [
   {
      id: "1",
      img: "img/page/products/img.jpg",
      size: "Розмір: 61 x 184 x 2130 мм",
      name: "Ліжко Спарта / Sparta з підйомним механізмом",
      oldPrice: "155 400 грн.",
      price: "150 400 грн.",
      maxCount: 14,
   },
   {
      id: "2",
      img: "img/page/products/img2.jpg",
      size: "Розмір: 61 x 184 x 2030 мм",
      name: "Ліжко Спарта / Sparta з підйомним механізмом",
      price: "150 400 грн.",
      maxCount: 8,
   },
   {
      id: "3",
      img: "img/page/products/img3.jpg",
      size: "Розмір: 61 x 184 x 2130 мм",
      name: "Ліжко Спарта / Sparta з підйомним механізмом",
      oldPrice: "155 400 грн.",
      price: "150 400 грн.",
      maxCount: 2,
   },
   {
      id: "4",
      img: "img/page/products/img2.jpg",
      size: "Розмір: 61 x 184 x 2130 мм",
      name: "Ліжко Спарта / Sparta з підйомним механізмом",
      oldPrice: "155 400 грн.",
      price: "150 400 грн.",
      maxCount: 3,
   },
   {
      id: "5",
      img: "img/page/products/img2.jpg",
      size: "Розмір: 61 x 184 x 2130 мм",
      name: "Ліжко Спарта / Sparta з підйомним механізмом",
      oldPrice: "155 400 грн.",
      price: "150 400 грн.",
      maxCount: 14,
   },
   {
      id: "6",
      img: "img/page/products/img.jpg",
      size: "Розмір: 61 x 184 x 2030 мм",
      name: "Ліжко Спарта / Sparta з підйомним механізмом",
      price: "150 400 грн.",
      maxCount: 14,
   },
   {
      id: "7",
      img: "img/page/products/img3.jpg",
      size: "Розмір: 61 x 184 x 2130 мм",
      name: "Ліжко Спарта / Sparta з підйомним механізмом",
      oldPrice: "155 400 грн.",
      price: "150 400 грн.",
      maxCount: 10,
   },
   {
      id: "8",
      img: "img/page/products/img2.jpg",
      size: "Розмір: 61 x 184 x 2130 мм",
      name: "Ліжко Спарта / Sparta з підйомним механізмом",
      oldPrice: "155 400 грн.",
      price: "150 400 грн.",
      maxCount: 10,
   },
   {
      id: "9",
      img: "img/page/products/img.jpg",
      size: "Розмір: 61 x 184 x 2130 мм",
      name: "Ліжко Спарта / Sparta з підйомним механізмом",
      oldPrice: "155 400 грн.",
      price: "150 400 грн.",
      maxCount: 10,
   },
   {
      id: "10",
      img: "img/page/products/img2.jpg",
      size: "Розмір: 61 x 184 x 2030 мм",
      name: "Ліжко Спарта / Sparta з підйомним механізмом",
      price: "150 400 грн.",
      maxCount: 12,
   },
   {
      id: "11",
      img: "img/page/products/img3.jpg",
      size: "Розмір: 61 x 184 x 2130 мм",
      name: "Ліжко Спарта / Sparta з підйомним механізмом",
      oldPrice: "155 400 грн.",
      price: "150 400 грн.",
      maxCount: 4,
   },
   {
      id: "12",
      img: "img/page/products/img2.jpg",
      size: "Розмір: 61 x 184 x 2130 мм",
      name: "Ліжко Спарта / Sparta з підйомним механізмом",
      oldPrice: "155 400 грн.",
      price: "150 400 грн.",
      maxCount: 10,
   },
   {
      id: "13",
      img: "img/page/products/img2.jpg",
      size: "Розмір: 61 x 184 x 2030 мм",
      name: "Ліжко Спарта / Sparta з підйомним механізмом",
      price: "150 400 грн.",
      maxCount: 3,
   },
   {
      id: "14",
      img: "img/page/products/img3.jpg",
      size: "Розмір: 61 x 184 x 2130 мм",
      name: "Ліжко Спарта / Sparta з підйомним механізмом",
      oldPrice: "155 400 грн.",
      price: "150 400 грн.",
      maxCount: 5,
   },
   {
      id: "15",
      img: "img/page/products/img2.jpg",
      size: "Розмір: 61 x 184 x 2130 мм",
      name: "Ліжко Спарта / Sparta з підйомним механізмом",
      oldPrice: "155 400 грн.",
      price: "150 400 грн.",
      maxCount: 8,
   },
   {
      id: "16",
      img: "img/page/products/img.jpg",
      size: "Розмір: 61 x 184 x 2130 мм",
      name: "Ліжко Спарта / Sparta з підйомним механізмом",
      oldPrice: "155 400 грн.",
      price: "150 400 грн.",
      maxCount: 14,
   },
   {
      id: "17",
      img: "img/page/products/img2.jpg",
      size: "Розмір: 61 x 184 x 2030 мм",
      name: "Ліжко Спарта / Sparta з підйомним механізмом",
      price: "150 400 грн.",
      maxCount: 8,
   },
   {
      id: "18",
      img: "img/page/products/img3.jpg",
      size: "Розмір: 61 x 184 x 2130 мм",
      name: "Ліжко Спарта / Sparta з підйомним механізмом",
      oldPrice: "155 400 грн.",
      price: "150 400 грн.",
      maxCount: 2,
   },
   {
      id: "19",
      img: "img/page/products/img2.jpg",
      size: "Розмір: 61 x 184 x 2130 мм",
      name: "Ліжко Спарта / Sparta з підйомним механізмом",
      oldPrice: "155 400 грн.",
      price: "150 400 грн.",
      maxCount: 3,
   },
   {
      id: "20",
      img: "img/page/products/img2.jpg",
      size: "Розмір: 61 x 184 x 2130 мм",
      name: "Ліжко Спарта / Sparta з підйомним механізмом",
      oldPrice: "155 400 грн.",
      price: "150 400 грн.",
      maxCount: 14,
   },
   {
      id: "21",
      img: "img/page/products/img.jpg",
      size: "Розмір: 61 x 184 x 2030 мм",
      name: "Ліжко Спарта / Sparta з підйомним механізмом",
      price: "150 400 грн.",
      maxCount: 14,
   },
   {
      id: "22",
      img: "img/page/products/img3.jpg",
      size: "Розмір: 61 x 184 x 2130 мм",
      name: "Ліжко Спарта / Sparta з підйомним механізмом",
      oldPrice: "155 400 грн.",
      price: "150 400 грн.",
      maxCount: 10,
   },
   {
      id: "23",
      img: "img/page/products/img2.jpg",
      size: "Розмір: 61 x 184 x 2130 мм",
      name: "Ліжко Спарта / Sparta з підйомним механізмом",
      oldPrice: "155 400 грн.",
      price: "150 400 грн.",
      maxCount: 10,
   },
   {
      id: "24",
      img: "img/page/products/img.jpg",
      size: "Розмір: 61 x 184 x 2130 мм",
      name: "Ліжко Спарта / Sparta з підйомним механізмом",
      oldPrice: "155 400 грн.",
      price: "150 400 грн.",
      maxCount: 10,
   },
   {
      id: "25",
      img: "img/page/products/img2.jpg",
      size: "Розмір: 61 x 184 x 2030 мм",
      name: "Ліжко Спарта / Sparta з підйомним механізмом",
      price: "150 400 грн.",
      maxCount: 12,
   },
   {
      id: "26",
      img: "img/page/products/img3.jpg",
      size: "Розмір: 61 x 184 x 2130 мм",
      name: "Ліжко Спарта / Sparta з підйомним механізмом",
      oldPrice: "155 400 грн.",
      price: "150 400 грн.",
      maxCount: 4,
   },
   {
      id: "27",
      img: "img/page/products/img2.jpg",
      size: "Розмір: 61 x 184 x 2130 мм",
      name: "Ліжко Спарта / Sparta з підйомним механізмом",
      oldPrice: "155 400 грн.",
      price: "150 400 грн.",
      maxCount: 10,
   },
   {
      id: "28",
      img: "img/page/products/img2.jpg",
      size: "Розмір: 61 x 184 x 2030 мм",
      name: "Ліжко Спарта / Sparta з підйомним механізмом",
      price: "150 400 грн.",
      maxCount: 3,
   },
   {
      id: "29",
      img: "img/page/products/img3.jpg",
      size: "Розмір: 61 x 184 x 2130 мм",
      name: "Ліжко Спарта / Sparta з підйомним механізмом",
      oldPrice: "155 400 грн.",
      price: "150 400 грн.",
      maxCount: 5,
   },
   {
      id: "30",
      img: "img/page/products/img2.jpg",
      size: "Розмір: 61 x 184 x 2130 мм",
      name: "Ліжко Спарта / Sparta з підйомним механізмом",
      oldPrice: "155 400 грн.",
      price: "150 400 грн.",
      maxCount: 8,
   },
]

// function uploadProductsCards(fromEach, list, site, mode) {
//    if (mode === "nonClear") {
//       fromEach = parseInt(fromEach)
//       if (fromEach <= list.length) {
//          let toEach
//          if (fromEach + 6 > list.length) {
//             let diff = list.length - fromEach
//             toEach = fromEach + diff
//          } else toEach = fromEach + 6

//          const place = document.getElementById(site)
//          // place.innerHTML = ""
//          // console.log("work")
//          for (let i = fromEach - 1; i < toEach; i++) {
//             // console.log("work")
//             // console.log(list[i])
//             let template
//             if (list[i].oldPrice) {
//                template = `
//       <div class="full-product-card" id="${list[i].id}">
//                                     <img src="${list[i].img}" alt="product-image"
//                                         class="full-product-card__image">
//                                     <div class="full-product-card__info">
//                                         <span class="full-product-card__sizes">${list[i].size}
//                                         </span>
//                                         <h4 class="full-product-card__title">Ліжко Спарта / Sparta з підйомним
//                                             механізмом </h4>
//                                         <h6
//                                             class="full-product-card__status full-product-card__status--in-stock icon-check">
//                                             В наявності
//                                         </h6>
//                                     </div>
//                                     <div class="full-product-card__actions">
//                                         <div class="full-product-card__prices">
//                                             <span class="full-product-card__old-price">${list[i].oldPrice}</span>
//                                             <span class="full-product-card__new-price">${list[i].price}</span>
//                                         </div>
//                                         <div class="full-product-card__buttons">
//                                             <button class="full-product-card__favourite icon-heart"></button>
//                                             <button class="full-product-card__basket icon-backet"></button>
//                                         </div>
//                                     </div>
//                                 </div>
//       `
//             } else {
//                template = `
//          <div class="full-product-card " id="${list[i].id}">
//                                        <img src="${list[i].img}" alt="product-image"
//                                            class="full-product-card__image">
//                                        <div class="full-product-card__info">
//                                            <span class="full-product-card__sizes">${list[i].size}
//                                            </span>
//                                            <h4 class="full-product-card__title">Ліжко Спарта / Sparta з підйомним
//                                                механізмом </h4>
//                                            <h6
//                                                class="full-product-card__status full-product-card__status--in-stock icon-check">
//                                                В наявності
//                                            </h6>
//                                        </div>
//                                        <div class="full-product-card__actions">
//                                            <div class="full-product-card__prices">
//                                                <span class="full-product-card__new-price">${list[i].price}</span>
//                                            </div>
//                                            <div class="full-product-card__buttons">
//                                                <button class="full-product-card__favourite icon-heart"></button>
//                                                <button class="full-product-card__basket icon-backet"></button>
//                                            </div>
//                                        </div>
//                                    </div>
//          `
//             }

//             place.innerHTML += template
//             // console.log(template)
//          }
//       }
//    } else if (mode === "clear") {
//       fromEach = parseInt(fromEach)
//       if (fromEach <= list.length) {
//          let toEach
//          if (fromEach + 6 > list.length) {
//             let diff = list.length - fromEach
//             toEach = fromEach + diff
//          } else toEach = fromEach + 5

//          const place = document.getElementById(site)
//          place.innerHTML = ""
//          // console.log("work")
//          for (let i = fromEach - 1; i < toEach; i++) {
//             // console.log("work")
//             // console.log(list[i])
//             let template
//             if (list[i].oldPrice) {
//                template = `
//       <div class="full-product-card" id="${list[i].id}">
//                                     <img src="${list[i].img}" alt="product-image"
//                                         class="full-product-card__image">
//                                     <div class="full-product-card__info">
//                                         <span class="full-product-card__sizes">${list[i].size}
//                                         </span>
//                                         <h4 class="full-product-card__title">Ліжко Спарта / Sparta з підйомним
//                                             механізмом </h4>
//                                         <h6
//                                             class="full-product-card__status full-product-card__status--in-stock icon-check">
//                                             В наявності
//                                         </h6>
//                                     </div>
//                                     <div class="full-product-card__actions">
//                                         <div class="full-product-card__prices">
//                                             <span class="full-product-card__old-price">${list[i].oldPrice}</span>
//                                             <span class="full-product-card__new-price">${list[i].price}</span>
//                                         </div>
//                                         <div class="full-product-card__buttons">
//                                             <button class="full-product-card__favourite icon-heart"></button>
//                                             <button class="full-product-card__basket icon-backet"></button>
//                                         </div>
//                                     </div>
//                                 </div>
//       `
//             } else {
//                template = `
//          <div class="full-product-card " id="${list[i].id}">
//                                        <img src="${list[i].img}" alt="product-image"
//                                            class="full-product-card__image">
//                                        <div class="full-product-card__info">
//                                            <span class="full-product-card__sizes">${list[i].size}
//                                            </span>
//                                            <h4 class="full-product-card__title">Ліжко Спарта / Sparta з підйомним
//                                                механізмом </h4>
//                                            <h6
//                                                class="full-product-card__status full-product-card__status--in-stock icon-check">
//                                                В наявності
//                                            </h6>
//                                        </div>
//                                        <div class="full-product-card__actions">
//                                            <div class="full-product-card__prices">
//                                                <span class="full-product-card__new-price">${list[i].price}</span>
//                                            </div>
//                                            <div class="full-product-card__buttons">
//                                                <button class="full-product-card__favourite icon-heart"></button>
//                                                <button class="full-product-card__basket icon-backet"></button>
//                                            </div>
//                                        </div>
//                                    </div>
//          `
//             }

//             place.innerHTML += template
//             // console.log(template)
//          }
//       }
//    }
// }
function uploadCards(fromEach, step, list, site) {
   step = parseInt(step)
   fromEach = parseInt(fromEach)
   if (fromEach <= list.length) {
      let toEach
      if (fromEach + step > list.length) {
         let diff = list.length - fromEach
         toEach = fromEach + diff
      } else toEach = fromEach + step - 1

      const place = document.getElementById(site)
      place.innerHTML = ""

      for (let i = fromEach - 1; i < toEach; i++) {
         let template
         if (list[i].oldPrice) {
            template = `
      <div data-max-count="${list[i].maxCount}" class="full-product-card" id="${list[i].id}">
                                    <img src="${list[i].img}" alt="product-image"
                                        class="full-product-card__image">
                                    <div class="full-product-card__info">
                                        <span class="full-product-card__sizes">${list[i].size}
                                        </span>
                                        <h4 class="full-product-card__title">Ліжко Спарта / Sparta з підйомним
                                            механізмом </h4>
                                        <h6
                                            class="full-product-card__status full-product-card__status--in-stock icon-check">
                                            В наявності
                                        </h6>
                                    </div>
                                    <div class="full-product-card__actions">
                                        <div class="full-product-card__prices">
                                            <span class="full-product-card__old-price">${list[i].oldPrice}</span>
                                            <span class="full-product-card__new-price">${list[i].price}</span>
                                        </div>
                                        <div class="full-product-card__buttons">
                                            <button class="full-product-card__favourite icon-heart"></button>
                                            <button class="full-product-card__basket icon-backet"></button>
                                        </div>
                                    </div>
                                </div>
      `
         } else {
            template = `
         <div data-max-count="${list[i].maxCount}" class="full-product-card " id="${list[i].id}">
                                       <img src="${list[i].img}" alt="product-image"
                                           class="full-product-card__image">
                                       <div class="full-product-card__info">
                                           <span class="full-product-card__sizes">${list[i].size}
                                           </span>
                                           <h4 class="full-product-card__title">Ліжко Спарта / Sparta з підйомним
                                               механізмом </h4>
                                           <h6
                                               class="full-product-card__status full-product-card__status--in-stock icon-check">
                                               В наявності
                                           </h6>
                                       </div>
                                       <div class="full-product-card__actions">
                                           <div class="full-product-card__prices">
                                               <span class="full-product-card__new-price">${list[i].price}</span>
                                           </div>
                                           <div class="full-product-card__buttons">
                                               <button class="full-product-card__favourite icon-heart"></button>
                                               <button class="full-product-card__basket icon-backet"></button>
                                           </div>
                                       </div>
                                   </div>
         `
         }

         place.innerHTML += template
         // console.log(template)
      }
   }
}

if (document.getElementById("nav-pages")) {
   let productCount = products.length
   let count = products.length / 3
   // console.log(count)

   new NavigaionPages(count, 7, "nav-pages", "active")

   uploadCards(1, 3, products, "product-wrapper")

   document.getElementById("show-more-products").addEventListener("click", uloadMoreCards)

   // const navPages = document.querySelectorAll(".navigation-pages__page")
   // navPages.forEach((item, index) => {
   //    if (item.classList.contains("active")) {
   //       counter = index + 1
   //    }
   // })

   function uloadMoreCards() {
      const alignPagesEvent = new CustomEvent("alignPages", {
         detail: {
            message: "Hello from triggerCustomEvent!",
            time: new Date(),
         },
      })

      // Викликаємо подію
      document.dispatchEvent(alignPagesEvent)

      // let counter
      // const navPages = document.querySelectorAll(".navigation-pages__page")
      // navPages.forEach((item, index) => {
      //    if (item.classList.contains("active")) {
      //       counter = index + 1
      //    }
      // })
      // console.log(counter)
      const allElem = document.querySelectorAll(".full-product-card")
      const lastElem = allElem[allElem.length - 1]
      const id = parseInt(lastElem.getAttribute("id"))
      if (document.querySelectorAll(".full-product-card").length <= 3) {
         count = products.length / 3
         uploadProductsCardsNoClear(id, products, "product-wrapper")
      } else {
         uploadProductsCardsNoClear(id, products, "product-wrapper")
      }
      // const pages = document.querySelectorAll(".navigation-pages__page")
      // pages.forEach(item => item.classList.remove("active"))
      // pages[counter].classList.add("active")
      // if (counter <= count) counter++
      translatePagesOnTouch()
      navPagesPagination()
   }

   function uploadProductsCardsNoClear(fromEach, list, site) {
      // console.log(list)
      fromEach = parseInt(fromEach)
      if (fromEach <= list.length) {
         let toEach
         if (fromEach + 3 > list.length) {
            let diff = list.length - fromEach
            toEach = fromEach + diff
         } else toEach = fromEach + 2

         const place = document.getElementById(site)
         for (let i = fromEach; i <= toEach; i++) {
            // console.log("work")
            // console.log(list[i])
            let template
            // console.log(list[i])
            if (list[i].oldPrice) {
               template = `
      <div data-max-count="${list[i].maxCount}"  class="full-product-card" id="${list[i].id}">
                                    <img src="${list[i].img}" alt="product-image"
                                        class="full-product-card__image">
                                    <div class="full-product-card__info">
                                        <span class="full-product-card__sizes">${list[i].size}
                                        </span>
                                        <h4 class="full-product-card__title">Ліжко Спарта / Sparta з підйомним
                                            механізмом </h4>
                                        <h6
                                            class="full-product-card__status full-product-card__status--in-stock icon-check">
                                            В наявності
                                        </h6>
                                    </div>
                                    <div class="full-product-card__actions">
                                        <div class="full-product-card__prices">
                                            <span class="full-product-card__old-price">${list[i].oldPrice}</span>
                                            <span class="full-product-card__new-price">${list[i].price}</span>
                                        </div>
                                        <div class="full-product-card__buttons">
                                            <button class="full-product-card__favourite icon-heart"></button>
                                            <button class="full-product-card__basket icon-backet"></button>
                                        </div>
                                    </div>
                                </div>
      `
            } else {
               template = `
         <div data-max-count="${list[i].maxCount}"  class="full-product-card " id="${list[i].id}">
                                       <img src="${list[i].img}" alt="product-image"
                                           class="full-product-card__image">
                                       <div class="full-product-card__info">
                                           <span class="full-product-card__sizes">${list[i].size}
                                           </span>
                                           <h4 class="full-product-card__title">Ліжко Спарта / Sparta з підйомним
                                               механізмом </h4>
                                           <h6
                                               class="full-product-card__status full-product-card__status--in-stock icon-check">
                                               В наявності
                                           </h6>
                                       </div>
                                       <div class="full-product-card__actions">
                                           <div class="full-product-card__prices">
                                               <span class="full-product-card__new-price">${list[i].price}</span>
                                           </div>
                                           <div class="full-product-card__buttons">
                                               <button class="full-product-card__favourite icon-heart"></button>
                                               <button class="full-product-card__basket icon-backet"></button>
                                           </div>
                                       </div>
                                   </div>
         `
            }

            place.innerHTML += template
            // console.log(template)
         }
      }
   }

   function translatePagesOnTouch() {
      if (document.querySelector(".navigation-pages")) {
         document.querySelector(".navigation-pages").addEventListener("click", translatePages)
         function translatePages(e) {
            const target = e.target
            const allCards = document.querySelectorAll(".full-product-card")

            if (target.closest(".navigation-pages__page")) {
               if (allCards.length > 3) {
                  // new NavigaionPages(products.length / 3, products.length / 3, "nav-pages", "active")
                  let id = parseInt(target.closest(".navigation-pages__page").textContent)
                  id = id * 3 - 2
                  uploadCards(id, 3, products, "product-wrapper")
                  // new NavigaionPages(products.length / 3, products.length / 3, "nav-pages", "active")
                  translatePagesOnTouch()
                  // counter = id
               } else {
                  let id = parseInt(target.closest(".navigation-pages__page").textContent)
                  // counter = id
                  id = id * 3 - 2
                  uploadCards(id, 3, products, "product-wrapper")
               }
            }
         }
      }
   }

   translatePagesOnTouch()
   navPagesPagination()

   // =========
   function navPagesPagination() {
      if (document.querySelector(".navigation-pages")) {
         document.querySelector(".navigation-pages").addEventListener("click", translatePagesFunc)
         function translatePagesFunc(e) {
            const target = e.target
            if (target.closest(".navigation-pages__button")) {
               const pages = document.querySelectorAll(".navigation-pages__page")
               // console.log(pages.length)
               // if (pages.length > 3) {
               //    console.log("1")

               //    console.log(pages.length)
               //    new NavigaionPages(count, count, "nav-pages", "active")
               //    // let index
               //    // pages.forEach(item => {
               //    //    if (item.classList.length === 2) {
               //    //       index = parseInt(item.textContent) * 3 - 2
               //    //    }
               //    // }
               //    uploadCards(1, 3, products, "product-wrapper")
               // } else {
               // console.log("2")
               let index
               pages.forEach(item => {
                  if (item.classList.length === 2) {
                     index = parseInt(item.textContent) * 3 - 2
                  }
               })

               uploadCards(index, 3, products, "product-wrapper")
               // }
            }
         }
      }
   }
}
// треба десь додати
/* 
 count = products.length / 3
   new NavigaionPages(count, count, "nav-pages", "active")*/

// в класі вказати активний елемент

// =============================================

let filterRange = document.getElementById("filter-products-slider")
if (filterRange) {
   const filterRangeFrom = document.querySelector("#filter-products-slider-from")
   const filterRangeTo = document.querySelector("#filter-products-slider-to")
   noUiSlider.create(filterRange, {
      start: [0, 10000],
      connect: true,
      range: {
         min: 100,
         max: 10000,
      },
      format: wNumb({
         decimals: 0,
         thousand: "",
         // prefix: "$",
      }),
   })
   filterRange.noUiSlider.on("update", function (values, handle) {
      filterRangeFrom.value = `${values[0]}`
      filterRangeTo.value = `${values[1]}`
   })
   filterRangeFrom.addEventListener("change", function () {
      filterRange.noUiSlider.setHandle(0, filterRangeFrom.value)
   })
   filterRangeTo.addEventListener("change", function () {
      filterRange.noUiSlider.setHandle(1, filterRangeTo.value)
   })
}

// ----------------------------------------
const manufacturesInputList = [
   {
      name: "Corners",
   },
   {
      name: "Estella",
   },
   {
      name: "Green Line",
   },
   {
      name: "Legko",
   },
   {
      name: "MiroMark",
   },
   {
      name: "Novelty",
   },
   {
      name: "Soft-line",
   },
   {
      name: "Venger",
   },
   {
      name: "Soft-g",
   },
]

const typeInputList = [
   {
      name: "Без узголів'я",
      id: "headboard",
   },
   {
      name: "З узголів'ям",
      id: "withHeadboard",
   },
   {
      name: "Двоярусні",
      id: "bunk",
   },
   {
      name: "Розкладачки",
      id: "cots",
   },
   {
      name: "Шафи",
      id: "cabinets",
   },
]

const bedSizeInputList = [
   {
      name: "200x210 см",
      id: "size-200-210",
   },
   {
      name: "200x200 см",
      id: "size-200-200",
   },
   {
      name: "180x200 см",
      id: "size-180-200",
   },
   {
      name: "160x200 см",
      id: "size-160-200",
   },
   {
      name: "110x190 см",
      id: "size-110-190",
   },
]

function uploadAllInputs(id, start, list, step = 4) {
   // const filterShowMoreManufacturer = document.getElementById(id)
   // const parent = filterShowMoreManufacturer.closest(".filter-products__body")
   const path = document.getElementById(id)
   if (path) {
      start = parseInt(start) - 1
      let end
      if (start + step > list.length) end = list.length
      else end = start + step
      for (let i = start; i < end; i++) {
         const div = document.createElement("div")
         div.className = "filter-products__custom-input custom-input"

         const input = document.createElement("input")
         input.type = "checkbox"
         input.className = "custom-input__checkbox"
         if (list[i].id) input.id = list[i].id
         else input.id = list[i].name.toLowerCase()

         const label = document.createElement("label")
         if (list[i].id) label.htmlFor = list[i].id
         else label.htmlFor = list[i].name.toLowerCase()
         label.className = "custom-input__block-checkbox"
         label.textContent = list[i].name

         div.appendChild(input)
         div.appendChild(label)
         path.appendChild(div)
      }
   }
}

// ============================================================
// const fullManufacturesList = document.querySelectorAll(".")
if (document.querySelector(".filter-products")) {
   let visionManufacturesInputList = 1
   let visionBedSizeInputList = 1
   uploadAllInputs("filter-products-manufactures-enter-point", visionManufacturesInputList, manufacturesInputList)
   uploadAllInputs("filter-products-type-enter-point", 1, typeInputList, typeInputList.length)
   uploadAllInputs("filter-products-bed-size-enter-point", 1, bedSizeInputList)

   // -==========- //
   document.querySelector(".filter-products").addEventListener("click", filterProductsActions)

   function filterProductsActions(e) {
      const target = e.target

      if (target.closest(".filter-products__title")) {
         const parent = target.closest(".filter-products__title").closest(".filter-products__block")
         parent.classList.toggle("open")
      }
      if (target.closest(".filter-products__show-more")) {
         const element = target.closest(".filter-products__show-more")
         if (element.getAttribute("id") === "filterShowMoreManufacturer") {
            visionManufacturesInputList += 4
            uploadAllInputs("filter-products-manufactures-enter-point", visionManufacturesInputList, manufacturesInputList)
         }
         if (element.getAttribute("id") === "filterShowMoreBedSize") {
            visionBedSizeInputList += 4
            uploadAllInputs("filter-products-bed-size-enter-point", visionBedSizeInputList, bedSizeInputList)
         }
      }
   }
}

// =========================

const faq = document.querySelector(".faq")
if (faq) {
   faq.addEventListener("click", faqFunction)
   function faqFunction(e) {
      const target = e.target
      if (target.closest(".faq__block")) target.closest(".faq__block").classList.toggle("open-faq")
   }
}

// ==========================================
// page-product-overview
// ==========================================

// ==================================
// ! на майбутнє цікавий проект
/*
const productCatalogInfo = [
   {
      id: "doubleBed-MK-1",
      name: "Ліжко двоспальне МК-1 з підйомним механізмом",
      explicitness: true,
      rating: 4.5,
      feedbacks: 93,
      model: 62003836,
      price: 15400,
      oldPrice: 25400,
      fabric: [
         {
            name: "blue",
            texture: "img",
         },
         {
            name: "red",
            texture: "img",
         },
         {
            name: "yellow",
            texture: "img",
         },
      ],
      maxQuantity: 25,
   },
   {
      id: "2",
      name: "Ліжко двоспальне МК-1 з підйомним механізмом",
      explicitness: true,
      rating: 4.5,
      feedbacks: 93,
      model: 62003836,
      price: 15400,
      oldPrice: 25400,
      fabric: [
         {
            name: "blue",
            texture: "img",
         },
         {
            name: "red",
            texture: "img",
         },
         {
            name: "yellow",
            texture: "img",
         },
      ],
      maxQuantity: 25,
   },
]
const productCatalogInfoImages = [
   {
      id: "doubleBed-MK-1",
      mainImage: "img",
   },
]
*/
/*  
   Завантажуємо слайдер із фото. 
   Після кожного перелистування ми маємо перевіряти активний слайд та його ID. 
   Тоді у іншому списку ми знаходимо цей ідентифікатор та записуємо нову інформацію.
*/

/* 
 const swiper = new Swiper('.swiper-container', {
      
        loop: true,
        pagination: {
            el: '.swiper-pagination',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {
            slideChange: function () {
                const activeIndex = this.activeIndex;
                const slides = this.slides;
                const activeSlide = slides[activeIndex];
   
                console.log('Активний слайд:', activeSlide);
                
            }
        }
    });
*/
// ==================================

const mainProduct = document.querySelector(".main-product")
if (mainProduct) {
   console.log("yes")
   const mainProductSliderImages = document.querySelectorAll(".main-product__slider img")
   let mainProductThumbSlider

   if (mainProductSliderImages.length) {
      const productImagesBlock = document.querySelector(".main-product__images")
      let mainProductThumbSliderTemplate = `<div class="main-product__thumb-slider thumb-slider">`
      mainProductThumbSliderTemplate += `<div class="thumb-slider__slider swiper">`
      mainProductThumbSliderTemplate += `<div class="thumb-slider__wrapper swiper-wrapper">`
      mainProductSliderImages.forEach(mainProductSliderImage => {
         const srcImage = mainProductSliderImage.getAttribute("src").replace("/slider/", "/slider/thumbs/")
         mainProductThumbSliderTemplate += `<div class="thumb-slider__slide swiper-slide">
				<img src="${srcImage}" class="thumb-slider__image" alt="Image">
			</div>`
      })
      mainProductThumbSliderTemplate += `</div>`
      mainProductThumbSliderTemplate += `</div>`
      // mainProductThumbSliderTemplate += `<div class="thumb-slider__arrows">`
      // mainProductThumbSliderTemplate += `
      // 	<button type="button" class="thumb-slider__arrow thumb-slider__arrow--up _icon-ch-up"></button>
      // 	<button type="button" class="thumb-slider__arrow thumb-slider__arrow--down _icon-ch-down"></button>
      // `
      // mainProductThumbSliderTemplate += `</div>`
      mainProductThumbSliderTemplate += `</div>`

      productImagesBlock.insertAdjacentHTML("beforeend", mainProductThumbSliderTemplate)

      mainProductThumbSlider = new Swiper(".thumb-slider__slider", {
         // Optional parameters
         loop: true,
         // direction: "vertical",
         spaceBetween: 20,
         // autoHeight: true,
         speed: 800,
         slidesPerView: 5,
         // breakpoints: {
         //    // 320: {
         //    //    slidesPerView: 1.5,
         //    // },
         //    900: {
         //       slidesPerView: 4,
         //    },
         //    1260: {
         //       slidesPerView: 5,
         //    },
         // },
      })
   }

   const mainProductSlider = new Swiper(".main-product__slider", {
      // Optional parameters
      loop: true,
      // direction: "vertical",
      // autoHeight: true,
      // Navigation arrows
      navigation: {
         nextEl: "#thumb-arrow-right",
         prevEl: "#thumb-arrow-left",
      },
      keyboard: {
         enabled: true,
      },
      speed: 800,
      spaceBetween: 0,
      slidesPerView: 1,
      thumbs: {
         swiper: mainProductThumbSlider,
      },
      pagination: {
         el: "#main-prod-pagination",
         clickable: true,
      },
   })
}

// ====================================
// rating
// ====================================

function getRatingStar(rate) {
   let ratingValue = parseFloat(rate)
   return ratingValue
}
// function getRatingStar() {
//    let ratingValue = 3.5
//    return ratingValue
// }
function setRaitingStar(element, rate) {
   const fullPart = parseInt(getRatingStar(rate))
   const emptyPart = getRatingStar(rate) - fullPart
   // console.log(getRatingStar())
   // console.log(fullPart)
   // console.log(emptyPart)
   // console.log(fullPart)

   // console.log(element)
   for (let i = 0; i < fullPart; ++i) {
      // console.log(element[i])
      element[i].style.background = `url('../icon/full-star.svg') 0 0 / cover no-repeat`
   }
   if (emptyPart > 0) {
      const currentPercent = emptyPart * 100
      element[fullPart].innerHTML = `<span style="width: ${currentPercent + "%"}"></span>`
   }
}
function setRatingToItems(elem, rate) {
   if (elem) {
      // console.log(elem)
      const items = elem.querySelectorAll(".raiting__star")
      setRaitingStar(items, rate)
   }
}

// using
const bedID = document.getElementById("double-bed-MK1")
setRatingToItems(bedID, 5)

const ivan = document.getElementById("ivanLapchuckRate")
setRatingToItems(ivan, 4.5)

// ==============================

// =========================
function actionsWithProd(width) {
   width = parseFloat(width)
   const mainProd = document.getElementById("main-product")
   const newPlaceForProd = document.getElementById("form-titling")
   const oldPlaceForProd = document.getElementById("page-prod")

   function replaceHTMLElem(elem, place, mode = 1) {
      if (elem) {
         if (parseInt(mode) === 1) place.append(elem)
         else if (parseInt(mode) === 2) place.prepend(elem)
      }
   }

   // replaceHTMLElem(mainProd, newPlaceForProd)

   const breakPoint = `(max-width: ${width}px)`
   const matchingMedia = window.matchMedia(breakPoint)
   console.log(matchingMedia)
   matchMedia.addEventListener("change", e => {
      const isTrue = e.matches
      if (isTrue) {
         replaceHTMLElem(mainProd, newPlaceForProd)
      } else {
         replaceHTMLElem(mainProd, oldPlaceForProd, 2)
      }
   })
   if (window.innerWidth < width) replaceHTMLElem(mainProd, newPlaceForProd)
   else replaceHTMLElem(mainProd, oldPlaceForProd, 2)
}
actionsWithProd(990)

// ======================
// product-count
const buttonActionsCountProd = document.querySelector(".info-about-product__product-count")
if (buttonActionsCountProd) {
   let maxCount = 13
   let currentProdCount = parseInt(document.getElementById("show-prod-count").textContent)

   buttonActionsCountProd.addEventListener("click", buttonCountProdActions)
   function buttonCountProdActions(e) {
      e.preventDefault()
      const target = e.target
      if (target.closest(".info-about-product__change-count")) {
         const button = target.closest(".info-about-product__change-count")
         if (button.getAttribute("id") === "decreace-prod") {
            if (currentProdCount - 1 > 0) {
               currentProdCount--
               document.getElementById("show-prod-count").textContent = currentProdCount
            }
         } else if (button.getAttribute("id") === "increace-prod") {
            if (currentProdCount < maxCount) {
               currentProdCount++
               document.getElementById("show-prod-count").textContent = currentProdCount
            }
         }
      }
   }
}

// ==============================

// відгуки

const commentsList = [
   {
      id: "1",
      mainUser: "Іван Побиван",
      idRate: "ivanPobyvanRate1",
      rate: 3.4,
      time: "25.01.2022",
      text: `Вчора привезли ліжко, і воно дуже класне, краще ніж очікували. Велика, м'яка,
                                        зручна. Брали разом із матрацом, тому одразу випробували. Є велика ніша для
                                        зберігання, поміститься не тільки постіль.`,
      hidenComments: 4,
      usefullReview: 24,
      hiddenCommentsBlock: [
         {
            defendant: "Віктор Лапчук",
            time: "12.05.2022",
            text: `Вчора привезли ліжко, і воно дуже класне, краще ніж очікували. Велика, м'яка,
            зручна. Брали разом із матрацом, тому одразу випробували. Є велика ніша для
            зберігання, поміститься не тільки постіль.`,
         },
         {
            defendant: "Віктор Лапчук",
            time: "12.05.2022",
            text: `Вчора привезли ліжко, і воно дуже класне, краще ніж очікували. Велика, м'яка,
            зручна. Брали разом із матрацом, тому одразу випробували. Є велика ніша для
            зберігання, поміститься не тільки постіль.`,
         },
      ],
   },
   {
      id: "2",
      mainUser: "Вікторія Ньюман",
      idRate: "ivanPobyvanRate3",
      rate: 4,
      time: "25.01.2022",
      text: `Вчора привезли ліжко, і воно дуже класне, краще ніж очікували. Велика, м'яка,
                                        зручна. Брали разом із матрацом, тому одразу випробували. Є велика ніша для
                                        зберігання, поміститься не тільки постіль.`,
      hidenComments: 4,
      usefullReview: 24,
      hiddenCommentsBlock: [
         {
            defendant: "Стас Лапчук",
            time: "12.05.2022",
            text: `Вчора привезли ліжко, і воно дуже класне, краще ніж очікували. Велика, м'яка,
            зручна. Брали разом із матрацом, тому одразу випробували. Є велика ніша для
            зберігання, поміститься не тільки постіль.`,
         },
         {
            defendant: "Віктор Лапчук",
            time: "12.05.2022",
            text: `Вчора привезли ліжко, і воно дуже класне, краще ніж очікували. Велика, м'яка,
            зручна. Брали разом із матрацом, тому одразу випробували. Є велика ніша для
            зберігання, поміститься не тільки постіль.`,
         },
         {
            defendant: "Стас Лапчук",
            time: "12.05.2022",
            text: `Вчора привезли ліжко, і воно дуже класне, краще ніж очікували. Велика, м'яка,
            зручна. Брали разом із матрацом, тому одразу випробували. Є велика ніша для
            зберігання, поміститься не тільки постіль.`,
         },
         {
            defendant: "Віктор Лапчук",
            time: "12.05.2022",
            text: `Вчора привезли ліжко, і воно дуже класне, краще ніж очікували. Велика, м'яка,
            зручна. Брали разом із матрацом, тому одразу випробували. Є велика ніша для
            зберігання, поміститься не тільки постіль.`,
         },
      ],
   },
   {
      id: "3",
      mainUser: "Г'юї Васкес",
      idRate: "ivanPobyvanRate4",
      rate: 3,
      time: "25.01.2022",
      text: `Вчора привезли ліжко, і воно дуже класне, краще ніж очікували. Велика, м'яка,
                                        зручна. Брали разом із матрацом, тому одразу випробували. Є велика ніша для
                                        зберігання, поміститься не тільки постіль.`,
      hidenComments: 4,
      usefullReview: 48,
      hiddenCommentsBlock: [
         {
            defendant: "Катерина Лапчук",
            time: "12.05.2022",
            text: `Вчора привезли ліжко, і воно дуже класне, краще ніж очікували. Велика, м'яка,
            зручна. Брали разом із матрацом, тому одразу випробували. Є велика ніша для
            зберігання, поміститься не тільки постіль.`,
         },
         {
            defendant: "Віктор Лапчук",
            time: "12.05.2022",
            text: `Вчора привезли ліжко, і воно дуже класне, краще ніж очікували. Велика, м'яка,
            зручна. Брали разом із матрацом, тому одразу випробували. Є велика ніша для
            зберігання, поміститься не тільки постіль.`,
         },
      ],
   },
   {
      id: "4",
      mainUser: "Ені Васкес",
      idRate: "rate-4",
      rate: 3.5,
      time: "25.01.2022",
      text: `Вчора привезли ліжко, і воно дуже класне, краще ніж очікували. Велика, м'яка,
                                        зручна. Брали разом із матрацом, тому одразу випробували. Є велика ніша для
                                        зберігання, поміститься не тільки постіль.`,
      hidenComments: 4,
      usefullReview: 48,
      hiddenCommentsBlock: [
         {
            defendant: "Катерина Лапчук",
            time: "12.05.2022",
            text: `Вчора привезли ліжко, і воно дуже класне, краще ніж очікували. Велика, м'яка,
            зручна. Брали разом із матрацом, тому одразу випробували. Є велика ніша для
            зберігання, поміститься не тільки постіль.`,
         },
         {
            defendant: "Віктор Лапчук",
            time: "12.05.2022",
            text: `Вчора привезли ліжко, і воно дуже класне, краще ніж очікували. Велика, м'яка,
            зручна. Брали разом із матрацом, тому одразу випробували. Є велика ніша для
            зберігання, поміститься не тільки постіль.`,
         },
      ],
   },
   {
      id: "5",
      mainUser: "Біллі Батчер",
      idRate: "rate-5",
      rate: 2.7,
      time: "25.01.2022",
      text: `Вчора привезли ліжко, і воно дуже класне, краще ніж очікували. Велика, м'яка,
                                        зручна. Брали разом із матрацом, тому одразу випробували. Є велика ніша для
                                        зберігання, поміститься не тільки постіль.`,
      hidenComments: 4,
      usefullReview: 48,
      hiddenCommentsBlock: [
         {
            defendant: "Катерина Лапчук",
            time: "12.05.2022",
            text: `Вчора привезли ліжко, і воно дуже класне, краще ніж очікували. Велика, м'яка,
            зручна. Брали разом із матрацом, тому одразу випробували. Є велика ніша для
            зберігання, поміститься не тільки постіль.`,
         },
         {
            defendant: "Віктор Лапчук",
            time: "12.05.2022",
            text: `Вчора привезли ліжко, і воно дуже класне, краще ніж очікували. Велика, м'яка,
            зручна. Брали разом із матрацом, тому одразу випробували. Є велика ніша для
            зберігання, поміститься не тільки постіль.`,
         },
      ],
   },
   {
      id: "6",
      mainUser: "Гаррет Бейл",
      idRate: "rate-6",
      rate: 4.8,
      time: "25.01.2024",
      text: `Вчора привезли ліжко, і воно дуже класне, краще ніж очікували. Велика, м'яка,
                                        зручна. Брали разом із матрацом, тому одразу випробували. Є велика ніша для
                                        зберігання, поміститься не тільки постіль.`,
      hidenComments: 4,
      usefullReview: 48,
      hiddenCommentsBlock: [
         {
            defendant: "Катерина Лапчук",
            time: "12.05.2022",
            text: `Вчора привезли ліжко, і воно дуже класне, краще ніж очікували. Велика, м'яка,
            зручна. Брали разом із матрацом, тому одразу випробували. Є велика ніша для
            зберігання, поміститься не тільки постіль.`,
         },
         {
            defendant: "Віктор Лапчук",
            time: "12.05.2022",
            text: `Вчора привезли ліжко, і воно дуже класне, краще ніж очікували. Велика, м'яка,
            зручна. Брали разом із матрацом, тому одразу випробували. Є велика ніша для
            зберігання, поміститься не тільки постіль.`,
         },
      ],
   },
   {
      id: "7",
      mainUser: "Олена Квавець",
      idRate: `rate-7`,
      rate: 2.7,
      time: "25.01.2022",
      text: `Вчора привезли ліжко, і воно дуже класне, краще ніж очікували. Велика, м'яка,
                                        зручна. Брали разом із матрацом, тому одразу випробували. Є велика ніша для
                                        зберігання, поміститься не тільки постіль.`,
      hidenComments: 2,
      usefullReview: 48,
      hiddenCommentsBlock: [
         {
            defendant: "Катерина Лапчук",
            time: "12.05.2022",
            text: `Вчора привезли ліжко, і воно дуже класне, краще ніж очікували. Велика, м'яка,
            зручна. Брали разом із матрацом, тому одразу випробували. Є велика ніша для
            зберігання, поміститься не тільки постіль.`,
         },
         {
            defendant: "Віктор Лапчук",
            time: "12.05.2022",
            text: `Вчора привезли ліжко, і воно дуже класне, краще ніж очікували. Велика, м'яка,
            зручна. Брали разом із матрацом, тому одразу випробували. Є велика ніша для
            зберігання, поміститься не тільки постіль.`,
         },
      ],
   },
]
if (document.querySelector(".comments-section__all-comments")) {
   const reviewsCound = document.getElementById("reviewsCound")
   if (reviewsCound) reviewsCound.textContent = commentsList.length
   // =====================================
   let averageScore =
      commentsList.reduce((prev, item) => {
         return prev + parseFloat(item.rate)
      }, 0) / commentsList.length
   averageScore = averageScore.toFixed(1)
   console.log(averageScore)

   const averageReviewRate = document.getElementById("average-review-rate")
   setRatingToItems(averageReviewRate, averageScore)

   const averageScoreNum = document.getElementById("averageScoreNum")
   if (averageScoreNum) averageScoreNum.textContent = averageScore

   // =============================
   function uploadComments(from, list) {
      from = parseInt(from)
      let end
      if (from + 5 > list.length) end = list.length
      else end = from + 5
      const commentWrapper = document.getElementById("commentWrapper")
      for (let i = from; i < end; i++) {
         const templ = `
       <article id="${list[i].id}" class="comments-section__block">
                                <div class="comments-section__titling">
                                    <h5 class="comments-section__user-name icon-user">${list[i].mainUser}</h5>
                                    <div id="${list[i].idRate}" class="info-about-product__raiting raiting__box">
                                        <label class="info-about-product__star-raiting raiting__star">
                                            <input type="radio" value="1">
                                        </label>
                                        <label class="info-about-product__star-raiting raiting__star">
                                            <input type="radio" value="2">
                                        </label>
                                        <label class="info-about-product__star-raiting raiting__star">
                                            <input type="radio" value="3">
                                        </label>
                                        <label class="info-about-product__star-raiting raiting__star">
                                            <input type="radio" value="4">
                                        </label>
                                        <label class="info-about-product__star-raiting raiting__star">
                                            <input type="radio" value="5">
                                        </label>
                                    </div>
                                    <time class="comments-section__time" datetime="${list[i].time.replaceAll(".", "-")}">${list[i].time}</time>
                                </div>
                                <div class="comments-section__text">
                                    <p>${list[i].text}</p>
                                </div>
                                <div class="comments-section__actions">
                                    <button class="comments-section__act icon-comment comments-section__act--answer">Відповісти</button>
                                    <button data-comments-value="${list[i].hiddenCommentsBlock.length}"
                                        class="comments-section__act comments-section__act--show"> 
                                        <span>${list[i].hiddenCommentsBlock.length}</span>
                                        Показати
                                        відповіді</button>
                                    <span class="comments-section__act comments-section__act--like icon-like">Корисний відгук:
                                        <span class="like">${list[i].usefullReview}</span></span>
                                </div>


                                 <div class="comments-section__open-comments open-comments">
                                    
                                </div>

                                 <form action="#" method="get" class="comments-section__write-comment write-comment">
                                    <h5 class="write-comment__title icon-back-comment">Відповідь для ${list[i].mainUser}</h5>
                                    <div class="write-comment__wrapper">
                                        <input required type="text" placeholder="Ваше ім'я та прізвище"
                                            class="write-comment__input">
                                        <input required type="email" placeholder="E-mail" class="write-comment__input">
                                        <textarea required name="user-review" class="write-comment__review"
                                            placeholder="Відгук"></textarea>
                                    </div>
                                    <div class="write-comment__actions">
                                        <button class="write-comment__button write-comment__button--submit" >Відправити</button>
                                        <button
                                            class="write-comment__button write-comment__button--cancel">Відмінити</button>
                                    </div>
                                </form>

                            </article> 
      `

         commentWrapper.innerHTML += templ
         setRatingToItems(document.getElementById(list[i].idRate), list[i].rate)

         const hidCom = document.querySelectorAll(".open-comments")
         const lastComHid = hidCom[hidCom.length - 1]

         for (let j = 0; j < list[i].hiddenCommentsBlock.length; j++) {
            const block = `
         <div class="open-comments__block open-comments__comments-section comments-section">
                                           <div class="comments-section__titling">
                                               <span class="icon-user"></span>
                                               <h5 class="comments-section__defendant-name icon-arrow-to-right">${
                                                  list[i].hiddenCommentsBlock[j].defendant
                                               }
                                               </h5>
                                               <h5 class="comments-section__user-name comments-section__user-name--bold">
                                                  ${list[i].mainUser}
                                               </h5>
                                               <time class="comments-section__time" datetime="${list[i].hiddenCommentsBlock[j].time.replaceAll(
                                                  ".",
                                                  "-"
                                               )}">${list[i].hiddenCommentsBlock[j].time}</time>
                                           </div>
                                           <div class="comments-section__text">
                                               <p>${list[i].hiddenCommentsBlock[j].text}</p>
                                           </div>
                                       </div>`
            lastComHid.innerHTML += block
         }
      }
   }

   uploadComments(0, commentsList)

   const commentwrapper = document.querySelector(".comments-section__all-comments")
   if (commentwrapper) {
      commentwrapper.addEventListener("click", commentwrapperActions)
      function commentwrapperActions(e) {
         const target = e.target
         if (target.closest(".comments-section__act--show")) {
            const button = target.closest(".comments-section__act--show")
            const parentBlock = button.closest(".comments-section__block")
            parentBlock.classList.toggle("open-hidden-comments")

            const showButton = parentBlock.querySelector(".comments-section__act--show")
            if (parentBlock.classList.contains("open-hidden-comments")) {
               showButton.textContent = "Приховати відповіді"
               showButton.classList.add("icon-close-comment")
            } else {
               const countOfComents = showButton.getAttribute("data-comments-value")
               console.log(countOfComents)
               showButton.innerHTML = `<span>${countOfComents}</span>Показати відповіді`
               showButton.classList.remove("icon-close-comment")
            }
         }
         if (target.closest(".comments-section__act--answer")) {
            const button = target.closest(".comments-section__act--answer")
            const parentBlock = button.closest(".comments-section__block")
            parentBlock.classList.toggle("open-write-comments")

            const writeButton = parentBlock.querySelector(".comments-section__act--answer")
            if (parentBlock.classList.contains("open-write-comments")) {
               writeButton.textContent = "Передумав"
               writeButton.classList.add("icon-close-comment")
               writeButton.classList.remove("icon-comment")
            } else {
               writeButton.textContent = "Відповісти"
               writeButton.classList.remove("icon-close-comment")
               writeButton.classList.add("icon-comment")
            }
         }
         if (target.closest(".write-comment__button--cancel")) {
            const parentBlock = target.closest(".write-comment__button--cancel").closest(".comments-section__block")
            parentBlock.classList.remove("open-write-comments")
         }
         if (target.closest(".comments-section__act--like")) {
            const likeButton = target.closest(".comments-section__act--like")
            const like = likeButton.querySelector(".like")
            likeButton.classList.toggle("giveLike")
            let likeButtonNum = like.textContent
            if (likeButton.closest(".giveLike")) {
               likeButtonNum++
            } else {
               likeButtonNum--
            }
            like.textContent = likeButtonNum
         }
         e.preventDefault()
         if (target.closest(".write-comment__button--submit")) {
            const submitButton = target.closest(".write-comment__button--submit")
            const parentForm = submitButton.closest(".write-comment")

            const parentBlock = submitButton.closest(".comments-section__block")
            const comments = parentBlock.querySelector(".comments-section__open-comments")
            console.log(comments)
            const inputsInfo = parentForm.querySelectorAll(".write-comment__input")
            const userName = inputsInfo[0].value
            const userEmail = inputsInfo[1].value
            const userText = parentForm.querySelector(".write-comment__review").value
            const mainUserName = parentBlock.querySelector(".comments-section__user-name")

            const timeNow = new Date()
            const year = timeNow.getFullYear()
            const month = timeNow.getMonth() + 1
            const day = timeNow.getDate()

            const template = document.createElement("div")
            template.classList.add("open-comments__block", "open-comments__comments-section", "comments-section")

            const titling = document.createElement("div")
            titling.classList.add("comments-section__titling")

            const iconUser = document.createElement("span")
            iconUser.classList.add("icon-user")

            const defendantName = document.createElement("h5")
            defendantName.classList.add("comments-section__defendant-name", "icon-arrow-to-right")
            defendantName.textContent = userName

            const userNameBold = document.createElement("h5")
            userNameBold.classList.add("comments-section__user-name", "comments-section__user-name--bold")
            userNameBold.textContent = mainUserName.textContent

            const timeElement = document.createElement("time")
            timeElement.classList.add("comments-section__time")
            timeElement.setAttribute("datetime", `${year}-${month}-${day}`)
            timeElement.textContent = `${year}.${month}.${day}`

            const textDiv = document.createElement("div")
            textDiv.classList.add("comments-section__text")

            const textParagraph = document.createElement("p")
            textParagraph.textContent = userText

            titling.appendChild(iconUser)
            titling.appendChild(defendantName)
            titling.appendChild(userNameBold)
            titling.appendChild(timeElement)

            textDiv.appendChild(textParagraph)

            template.appendChild(titling)
            template.appendChild(textDiv)

            comments.appendChild(template)

            comments.append(template)
            console.log(template)

            const actButton = parentBlock.querySelector(".comments-section__act--show")
            let id = parseInt(actButton.getAttribute("data-comments-value"))
            id++
            actButton.setAttribute("data-comments-value", id)
            actButton.innerHTML = `<span>${id}</span> Показати відповіді`

            inputsInfo.forEach(item => (item.value = ""))
            const userInputText = parentForm.querySelector(".write-comment__review")
            userInputText.value = ""

            parentBlock.classList.remove("open-write-comments")
         }
         if (target.closest(".comments-section__show-more-comments")) {
            const lastId = document.querySelectorAll(".comments-section__block").length
            uploadComments(lastId, commentsList)
         }
      }
   }
}

// ==========================================

const backetProduct = document.querySelector(".backet-product")
if (backetProduct) {
   backetProduct.addEventListener("click", backetProductActions)

   function backetProductActions(e) {
      const target = e.target

      if (target.closest(".backet-plus")) {
         const parentBlock = target.closest(".backet-plus").closest(".backet-product__block")
         const maxCount = parseInt(parentBlock.getAttribute("data-max-count"))

         let countNow = parseInt(parentBlock.querySelector("#count-of-prod-in-backet").textContent)
         if (countNow < maxCount) countNow++
         parentBlock.querySelector("#count-of-prod-in-backet").textContent = countNow
         updateDataInBacket()
      }
      if (target.closest(".backet-minus")) {
         const parentBlock = target.closest(".backet-minus").closest(".backet-product__block")

         let countNow = parseInt(parentBlock.querySelector("#count-of-prod-in-backet").textContent)
         if (countNow > 1) countNow--
         parentBlock.querySelector("#count-of-prod-in-backet").textContent = countNow
         updateDataInBacket()
      }
   }
}

// ================================

// Initialize Swiper

const commentsListAboutMagaz = [
   {
      id: "1",
      mainUser: "Іван Побиван",
      idRate: "ivanPobyvanRate1",
      rate: 3.7,
      time: "25.01.2024",
      text: `Вчора привезли ліжко, і воно дуже класне, краще ніж очікували. Велика, м'яка,
                                        зручна. Брали разом із матрацом, тому одразу випробували. Є велика ніша для
                                        зберігання, поміститься не тільки постіль.`,
      productImageScr: "img/page/comments-section/sign.jpg",
      productName: "Krovato",
      category: "allReviews",
   },
   {
      id: "2",
      mainUser: "Влада Кравченко",
      idRate: "vladaTkachenko2",
      rate: 3.7,
      time: "25.03.2024",
      text: `Вчора привезли ліжко, і воно дуже класне, краще ніж очікували. Велика, м'яка,
                                        зручна. Брали разом із матрацом, тому одразу випробували. Є велика ніша для
                                        зберігання, поміститься не тільки постіль.`,
      productImageScr: "img/page/comments-section/крісло.png",
      productName: "Крісло для геймерів AEROCOOL EARL Steel Blue",
      category: "aboutProducts",
   },
   {
      id: "3",
      mainUser: "Назар",
      idRate: "hazar3",
      rate: 3.7,
      time: "25.01.2024",
      text: `Вчора привезли ліжко, і воно дуже класне, краще ніж очікували. Велика, м'яка,
                                        зручна. Брали разом із матрацом, тому одразу випробували. Є велика ніша для
                                        зберігання, поміститься не тільки постіль.`,
      productImageScr: "img/page/comments-section/столик.png",
      productName: "Столик журнальний СЖ-101",
      category: "aboutMarket",
   },
   {
      id: "4",
      mainUser: "Ольга",
      idRate: "olga4",
      rate: 3.7,
      time: "25.01.2024",
      text: `Вчора привезли ліжко, і воно дуже класне, краще ніж очікували. Велика, м'яка,
                                        зручна. Брали разом із матрацом, тому одразу випробували. Є велика ніша для
                                        зберігання, поміститься не тільки постіль.`,
      productImageScr: "img/page/comments-section/орто-матрас.png",
      productName: "Ортопедический матрас Эко-Lite 90х190",
      category: "allReviews",
   },
   {
      id: "5",
      mainUser: "Андрій Сидоренко",
      idRate: "andriySidorenko5",
      rate: 4.5,
      time: "30.03.2024",
      text: `Придбав нову книжкову шафу. Дуже задоволений якістю матеріалу та зборки. Шафа виглядає стильно
                                       і сучасно, прекрасно вписується в інтер'єр. Книги розміщуються компактно, багато місця для зберігання.`,
      productImageScr: "img/page/comments-section/крісло.png",
      productName: "Книжкова шафа IKEA Billy",
      category: "allReviews",
   },
   {
      id: "6",
      mainUser: "Марія Петрівна",
      idRate: "mariaPetrivna6",
      rate: 4.8,
      time: "12.04.2024",
      text: `Купила новий пилосос, і він перевершив усі мої очікування. Дуже потужний, тихий і легкий у
                                       використанні. Прибирання тепер займає набагато менше часу.`,
      productImageScr: "img/page/comments-section/крісло.png",
      productName: "Пилосос Dyson V11",
      category: "aboutProducts",
   },
   {
      id: "7",
      mainUser: "Сергій Іванов",
      idRate: "serhiyIvanov7",
      rate: 4.2,
      time: "05.02.2024",
      text: `Нещодавно купив новий смартфон, і він мені дуже подобається. Швидкий, потужний, з відмінною
                                       камерою. Ідеальний для роботи і розваг.`,
      productImageScr: "img/page/comments-section/кухня.png",
      productName: "Кухня",
      category: "aboutMarket",
   },
   {
      id: "8",
      mainUser: "Катерина Пономаренко",
      idRate: "katerynaPonomarenko8",
      rate: 3.9,
      time: "20.03.2024",
      text: `Замовила новий диван, і він дуже зручний. Прекрасно виглядає в нашій вітальні, м'який та
                                       комфортний для сидіння. Єдина проблема - колір трохи відрізняється від того, що на фото.`,
      productImageScr: "img/page/comments-section/кухня.png",
      productName: "Диван IKEA Kivik",
      category: "allReviews",
   },
   {
      id: "9",
      mainUser: "Катерина Ілик",
      idRate: "katerynaIlyk9",
      rate: 4.7,
      time: "05.03.2024",
      text: `Замовила новий диван, і він дуже зручний. Прекрасно виглядає в нашій вітальні, м'який та
                                       комфортний для сидіння. Єдина проблема - колір трохи відрізняється від того, що на фото.`,
      productImageScr: "img/page/comments-section/кухня.png",
      productName: "Диван IKEA Kivik",
      category: "aboutMarket",
   },
   {
      id: "10",
      mainUser: "Віктор Ілик",
      idRate: "Victorlyk10",
      rate: 4.1,
      time: "05.03.2024",
      text: `Замовила новий диван, і він дуже зручний. Прекрасно виглядає в нашій вітальні, м'який та
                                       комфортний для сидіння. Єдина проблема - колір трохи відрізняється від того, що на фото.`,
      productImageScr: "img/page/comments-section/кухня.png",
      productName: "Диван IKEA Kivik",
      category: "aboutMarket",
   },
   // {
   //    id: "11",
   //    mainUser: "Віктор Ілик",
   //    idRate: "Victorlyk11",
   //    rate: 4.1,
   //    time: "05.03.2024",
   //    text: `Замовила новий диван, і він дуже зручний. Прекрасно виглядає в нашій вітальні, м'який та
   //                                     комфортний для сидіння. Єдина проблема - колір трохи відрізняється від того, що на фото.`,
   //    productImageScr: "img/page/comments-section/кухня.png",
   //    productName: "Диван IKEA Kivik",
   //    category: "aboutMarket",
   // },
]

const aboutMarketList = commentsListAboutMagaz.filter(item => item.category === "aboutMarket")
const aboutProducts = commentsListAboutMagaz.filter(item => item.category === "aboutProducts")

let stepOfComment = 3
let currentStep = 0

function uploadCommentReviews(list, id, mode, from, step, clear = true) {
   if (document.getElementById(id)) {
      const path = document.getElementById(id)

      from = parseInt(from)
      step = parseInt(step)
      let end
      if (from + step > list.length) end = list.length
      else end = from + step

      if (clear === true || clear === "mix") path.innerHTML = ""
      for (let i = from; i < end; i++) {
         const template = `
                                 <div class="comment-review__block">
                                       <div class="comment-review__titling">
                                           <div class="comment-review__icon">
                                               <img src="img/page/icons/user.svg" alt="user">
                                           </div>
                                           <h4 class="comment-review__name">${list[i].mainUser}</h4>
                                           <div id="${list[i].idRate}" class="comment-review__raiting raiting__box">
                                               <label class="comment-review__star-raiting raiting__star">
                                                   <input type="radio" value="1">
                                               </label>
                                               <label class="comment-review__star-raiting raiting__star">
                                                   <input type="radio" value="2">
                                               </label>
                                               <label class="comment-review__star-raiting raiting__star">
                                                   <input type="radio" value="3">
                                               </label>
                                               <label class="comment-review__star-raiting raiting__star">
                                                   <input type="radio" value="4">
                                               </label>
                                               <label class="comment-review__star-raiting raiting__star">
                                                   <input type="radio" value="5">
                                               </label>
                                           </div>
                                            <time class="comment-review__time" datetime="${list[i].time.replaceAll(".", "-")}">${list[i].time}</time>
                                       </div>
                                       <div class="comment-review__text">
                                           <p>${list[i].text}</p>
                                       </div>
                                       <div class="comment-review__under-info">
                                           <div class="comment-review__product-img"><img
                                                   src="${list[i].productImageScr}" alt="product"></div>
                                           <h6 class="comment-review__prod-name">${list[i].productName} </h6>
                                       </div>
                                 </div>
            `
         path.innerHTML += template
         setRatingToItems(document.getElementById(list[i].idRate), list[i].rate)
      }
      // path.innerHTML += `<div id='${mode}Nav'></div>`
      const nav = document.querySelector(".comment-review__nav")
      const pagesCount = Math.ceil(list.length / stepOfComment)
      // console.log(pagesCount)

      const showMoreButton = `
      <button id="show-more-products" class="comment-review__show-more categiries-products__show-more icon-saving-more">Показати ще товари</button>
      `
      if (clear === true) {
         nav.innerHTML = "<div id='navComment'></div>"
         nav.innerHTML += showMoreButton

         if (Math.ceil(list.length / stepOfComment) <= 9) new NavigaionPages(pagesCount, pagesCount, `navComment`, "active")
         else new NavigaionPages(Math.ceil(list.length / stepOfComment), 9, `navComment`, "active")
      } else if (clear === "mix") {
         // ....
      } else {
         nav.innerHTML = ""
         nav.innerHTML = "<div id='navComment'></div>"
         nav.innerHTML += showMoreButton

         if (Math.ceil(list.length / stepOfComment) <= 9) new NavigaionPages(pagesCount, pagesCount, `navComment`, "active")
         else new NavigaionPages(Math.ceil(list.length / stepOfComment), 9, `navComment`, "active")
      }
   }
}
const tabsComment = document.querySelector(".comment-review")
if (tabsComment) {
   tabsComment.addEventListener("click", tabsCommentActions)
   // currentStep = 0
   const buttons = document.querySelectorAll(".comment-review__button")
   buttons.forEach(item => {
      if (item.classList.contains("active")) {
         const idTab = item.getAttribute("data-tab")
         document.getElementById(idTab).style.display = "flex"
         uploadCommentReviews(commentsListAboutMagaz, "allReviews", idTab, currentStep, stepOfComment)
      }
   })
   function tabsCommentActions(e) {
      const target = e.target
      if (target.closest(".comment-review__button")) {
         const thisButton = target.closest(".comment-review__button")
         const allButtons = document.querySelectorAll(".comment-review__button")
         allButtons.forEach(item => {
            item.classList.remove("active")
            const idTab = item.getAttribute("data-tab")
            document.getElementById(idTab).style.display = "none"
         })
         thisButton.classList.add("active")
         currentStep = 0
         const idTab = thisButton.getAttribute("data-tab")
         document.getElementById(idTab).style.display = "flex"
         document.querySelectorAll(".comment-review__tabcontent").forEach(item => (item.innerHTML = ""))
         if (idTab === "allReviews") uploadCommentReviews(commentsListAboutMagaz, "allReviews", idTab, currentStep, stepOfComment)
         else if (idTab === "aboutProducts") uploadCommentReviews(aboutProducts, "aboutProducts", idTab, currentStep, stepOfComment)
         else if (idTab === "aboutMarket") uploadCommentReviews(aboutMarketList, "aboutMarket", idTab, currentStep, stepOfComment)
      }
      if (target.closest(".comment-review__show-more")) {
         let id = ""
         const buttons = document.querySelectorAll(".comment-review__button")
         buttons.forEach(item => {
            if (item.classList.contains("active")) id = item.getAttribute("data-tab")
         })
         // const tabContent = document.querySelector(".comment-review__tabcontent")
         // const idOfTabContent = tabContent.getAttribute("id")
         currentStep += stepOfComment
         const pagesPrev = document.querySelectorAll(".navigation-pages__page")
         if (pagesPrev.length > 1) {
            let curretArrayToUpload = []
            if (id === "allReviews") {
               curretArrayToUpload = commentsListAboutMagaz
            } else if (id === "aboutProducts") {
               curretArrayToUpload = aboutProducts
            } else if (id === "aboutMarket") {
               curretArrayToUpload = aboutMarketList
            }

            uploadCommentReviews(curretArrayToUpload, id, id, currentStep, stepOfComment, false)
            const pages = document.querySelectorAll(".navigation-pages__page")

            let pageNum
            pages.forEach(item => {
               if (item.classList.contains("active")) pageNum = parseInt(item.textContent)
               item.classList.remove("active")
            })
            const index = currentStep / stepOfComment
            if (index < pages.length) pages[currentStep / stepOfComment].classList.add("active")
            else pages[pages.length - 1].classList.add("active")

            // if (item.nextElementSibling) item.nextElementSibling.classList.add("active")
         }
      }
      if (target.closest(".navigation-pages__button")) {
         // console.log("push")
         const pages = document.querySelectorAll(".navigation-pages__page")
         if (pages.length > 1) {
            let pageNum
            pages.forEach(item => {
               if (item.classList.contains("active")) pageNum = parseInt(item.textContent)
            })
            if (pageNum) {
               let id = ""
               const buttons = document.querySelectorAll(".comment-review__button")
               buttons.forEach(item => {
                  if (item.classList.contains("active")) id = item.getAttribute("data-tab")
               })
               // const tabContent = document.getElementById(id)
               // const tabContent = document.querySelector(".comment-review__tabcontent")
               // const idOfTabContent = tabContent.getAttribute("id")
               let index = pageNum * stepOfComment - stepOfComment

               let curretArrayToUpload = []
               if (id === "allReviews") {
                  curretArrayToUpload = commentsListAboutMagaz
               } else if (id === "aboutProducts") {
                  curretArrayToUpload = aboutProducts
               } else if (id === "aboutMarket") {
                  curretArrayToUpload = aboutMarketList
               }

               uploadCommentReviews(curretArrayToUpload, id, id, index, stepOfComment, "mix")
            }
         }
      }
      if (target.closest(".navigation-pages__page")) {
         const pages = document.querySelectorAll(".navigation-pages__page")
         const thisPage = target.closest(".navigation-pages__page")
         if (pages.length > 1) {
            let pageNum = parseInt(thisPage.textContent)
            if (pageNum) {
               let id = ""
               const buttons = document.querySelectorAll(".comment-review__button")
               buttons.forEach(item => {
                  if (item.classList.contains("active")) id = item.getAttribute("data-tab")
               })

               // const tabContent = document.querySelector(".comment-review__tabcontent")
               // const idOfTabContent = tabContent.getAttribute("id")
               let index = pageNum * stepOfComment - stepOfComment

               let curretArrayToUpload = []
               if (id === "allReviews") {
                  curretArrayToUpload = commentsListAboutMagaz
               } else if (id === "aboutProducts") {
                  curretArrayToUpload = aboutProducts
               } else if (id === "aboutMarket") {
                  curretArrayToUpload = aboutMarketList
               }
               uploadCommentReviews(curretArrayToUpload, id, id, index, stepOfComment, "mix")
            }
         }
      }
   }

   const averageRatingCommentsID = document.getElementById("averageRatingComments")
   let averageRatingComments =
      commentsListAboutMagaz.reduce((prev, item) => {
         return prev + item.rate
      }, 0) / commentsListAboutMagaz.length

   averageRatingComments = averageRatingComments.toFixed(1)
   averageRatingCommentsID.textContent = averageRatingComments

   const averageRatingCommentsRate = document.getElementById("averageRatingCommentsRate")
   // console.log(commentsRate)
   setRatingToItems(averageRatingCommentsRate, parseFloat(averageRatingComments))
}

// два баги

// 1
// коли 10 елементів то не завантажується останній

// 2
// у інших табах не пацюють навігаційні кнопки

// =============================================================
// =============================================================
// =============================================================

const blogList = [
   {
      id: "1",
      href: "#",
      title: "Стільці для вітальні. Як правильно вибрати?",
      alt: "Стільці для вітальні. Як правильно вибрати?",
      imgSrc: "img/page/news/img1.jpg",
      lastWord: "Детальніше",
   },
   {
      id: "2",
      href: "#",
      title: "Що краще вибрати для кухні – стільці чи кухонний куточок?",
      alt: "Що краще вибрати для кухні – стільці чи кухонний куточок?",
      imgSrc: "img/page/news/img2.jpg",
      lastWord: "Детальніше",
   },
   {
      id: "3",
      href: "#",
      title: "Оформлення вітальні. Які м'які меблі краще вибрати?",
      alt: "Оформлення вітальні. Які м'які меблі краще вибрати?",
      imgSrc: "img/page/news/img3.jpg",
      lastWord: "Детальніше",
   },
   {
      id: "4",
      href: "#",
      title: "Стільці для вітальні. Як правильно вибрати?",
      alt: "Стільці для вітальні. Як правильно вибрати?",
      imgSrc: "img/page/news/img1.jpg",
      lastWord: "Детальніше",
   },
   {
      id: "5",
      href: "#",
      title: "Що краще вибрати для кухні – стільці чи кухонний куточок?",
      alt: "Що краще вибрати для кухні – стільці чи кухонний куточок?",
      imgSrc: "img/page/news/img2.jpg",
      lastWord: "Детальніше",
   },
   {
      id: "6",
      href: "#",
      title: "Оформлення вітальні. Які м'які меблі краще вибрати?",
      alt: "Оформлення вітальні. Які м'які меблі краще вибрати?",
      imgSrc: "img/page/news/img3.jpg",
      lastWord: "Детальніше",
   },
   {
      id: "7",
      href: "#",
      title: "Стільці для вітальні. Як правильно вибрати?",
      alt: "Стільці для вітальні. Як правильно вибрати?",
      imgSrc: "img/page/news/img1.jpg",
      lastWord: "Детальніше",
   },
   {
      id: "8",
      href: "#",
      title: "Що краще вибрати для кухні – стільці чи кухонний куточок?",
      alt: "Що краще вибрати для кухні – стільці чи кухонний куточок?",
      imgSrc: "img/page/news/img2.jpg",
      lastWord: "Детальніше",
   },
   {
      id: "9",
      href: "#",
      title: "Оформлення вітальні. Які м'які меблі краще вибрати?",
      alt: "Оформлення вітальні. Які м'які меблі краще вибрати?",
      imgSrc: "img/page/news/img3.jpg",
      lastWord: "Детальніше",
   },
   {
      id: "10",
      href: "#",
      title: "Оформлення вітальні. Які м'які меблі краще вибрати?",
      alt: "Оформлення вітальні. Які м'які меблі краще вибрати?",
      imgSrc: "img/page/news/img3.jpg",
      lastWord: "Детальніше",
   },
]

function uploadBlogList(list, startIndex, idPathToPaste, step, mode = false) {
   if (document.getElementById(idPathToPaste)) {
      const pathToPaste = document.getElementById(idPathToPaste)

      startIndex = parseInt(startIndex)
      step = parseInt(step)
      let end
      if (startIndex + step > list.length) end = list.length
      else end = startIndex + step

      if (mode) pathToPaste.innerHTML = ""
      else if (mode === "mix") pathToPaste.innerHTML = ""

      for (let i = startIndex; i < end; i++) {
         const template = `
                        <a href="${list[i].href}" class="section-blog__block promotion-slider__block">
                            <img src="${list[i].imgSrc}" alt="${list[i].alt}" class="promotion-slider__news-image">
                            <h4 class="promotion-slider__news-title">${list[i].title}
                            </h4>
                            <h6 class="promotion-slider__news-link icon-arrow">${list[i].lastWord}</h6>
                        </a>
         `
         pathToPaste.innerHTML += template
      }

      // const navId = document.getElementById("blogNavigation")
      if (mode === true) {
         if (Math.ceil(blogList.length / step) <= 9)
            new NavigaionPages(Math.ceil(blogList.length / step), Math.ceil(blogList.length / step), "blogNavigation", "active")
         else new NavigaionPages(Math.ceil(blogList.length / step), 9, "blogNavigation", "active")
      }
   }
}

const stepsOfBlogUploading = 4
let currentStepOfBlogUploading = 0

uploadBlogList(blogList, currentStepOfBlogUploading, "blogWrapper", stepsOfBlogUploading, true)
currentStepOfBlogUploading += stepsOfBlogUploading

const blogSection = document.querySelector(".section-blog")
if (blogSection) {
   blogSection.addEventListener("click", blogSectionActions)
   function blogSectionActions(e) {
      const target = e.target
      if (target.closest(".section-blog__button")) {
         uploadBlogList(blogList, currentStepOfBlogUploading, "blogWrapper", stepsOfBlogUploading, false)
         currentStepOfBlogUploading += stepsOfBlogUploading

         const allPages = document.querySelectorAll(".navigation-pages__page")
         let indexOfPage = 0

         allPages.forEach((item, index) => {
            if (item.classList.contains("active")) {
               if (index + 1 < allPages.length) indexOfPage = index + 1
            }
            item.classList.remove("active")
         })
         // console.log(indexOfPage)
         allPages[indexOfPage].classList.add("active")
      }
      if (target.closest(".navigation-pages__button")) {
         const allPages = document.querySelectorAll(".navigation-pages__page")
         let indexOfPage = 0

         allPages.forEach(item => {
            if (item.classList.contains("active")) {
               indexOfPage = parseInt(item.textContent)
            }
         })

         currentStepOfBlogUploading = indexOfPage * stepsOfBlogUploading - stepsOfBlogUploading
         uploadBlogList(blogList, currentStepOfBlogUploading, "blogWrapper", stepsOfBlogUploading, "mix")
         currentStepOfBlogUploading += stepsOfBlogUploading
      }
      if (target.closest(".navigation-pages__page")) {
         const index = parseInt(target.closest(".navigation-pages__page").textContent)
         currentStepOfBlogUploading = index * stepsOfBlogUploading - stepsOfBlogUploading
         uploadBlogList(blogList, currentStepOfBlogUploading, "blogWrapper", stepsOfBlogUploading, "mix")
         currentStepOfBlogUploading += stepsOfBlogUploading
      }
   }
}

// class RevitalizeNavPages{
//    constructor(func){}
// }

// ============================================================

const livingRoomDesign = [
   {
      title: "",
      img: "",
      text: ["", ""],
      subtitle: "",
      subList: [""],
      bootomText: "",
   },
]

// regex
