"use strict"

// const swipeObj = {
//     slide1: {
//         description: "text here",
//         img: 'img/page/img2.webp'
//     },
//     slide2: {
//         description: "text here new",
//         img: 'img/page/img3.webp'
//     },
//     slide3: {
//         description: "text here very new",
//         img: 'img/page/img4.webp'
//     }
// }

document.addEventListener("click", documentAction)

const headerBurger = document.querySelector(".header__burger")
const text = document.querySelector(".swipe__description")

function documentAction(e) {
   const targetElement = e.target
   if (targetElement.closest(".header__burger")) {
      document.body.classList.toggle("menu-open")
   }
}

// // просто хотів спробувати реалізувати свайпер через об'єкти
// // кращий міг би бути через масив

// // події
// document.addEventListener('click', documentAllAction)

// const linkShow = document.querySelector('.event__link')

// const eventClass = document.querySelector('.event')

// function documentAllAction(e) {
//     let targetElement = e.target
//     e.preventDefault()
//     if (targetElement.closest('.event__link')) {
//         eventClass.classList.toggle('active')
//     }
// }
// //linkShow.addEventListener("click", show)

// // function show(e) {
// //     e.preventDefault()
// //     console.log(e)
// //     if (linkShow) {
// //         eventClass.classList.toggle('active')
// //     } else if (!linkShow) {
// //         eventClass.classList.remove('active')
// //     }
// // }

// // виклик при автозавантаженні

// window.addEventListener("DOMContentLoaded", domLoaded)
// function domLoaded(e) {

// }

// // таймер

// const timerText = document.querySelector('.timer__circle')
// let timerContent = parseInt(timerText.textContent)

// const imgTimer = document.querySelector('.timer__img')
// imgTimer.addEventListener('click', endTimer)
// function endTimer() {
//     document.documentElement.classList.remove('timing')
// }

// const timeButton = document.querySelector('.timer__button')
// timeButton.addEventListener('click', startTimer)

// function startTimer() {
//     timerInterval = setInterval(timerFunc, 800)
// }

// function timerFunc() {
//     if (timerContent >= -1) {
//         console.log(timerContent)
//         timerText.textContent = timerContent
//         timerContent--
//         if (timerContent === -1) {
//             document.documentElement.classList.add('timing')
//         }
//     } else {
//         clearInterval(timerInterval)
//     }

// }

// // виклик форми
// // все працює, проте не розумію чому форма з'являється лише в одному місці
// // і зміщує інші блоки
// const form = document.querySelector('.form')
// const closeButton = document.querySelector('.form__close')
// closeButton.addEventListener('click', showForm)
// form.hidden = true

// function showForm() {
//     if (form.hidden) {
//         form.hidden = false
//     } else {
//         form.hidden = true
//     }

// }

// setTimeout(showForm, 5000)

// const iconForm = document.querySelector('.form__eye')
// const password = document.querySelector('.form__pass')
// console.log(password.getAttribute("type"))
// iconForm.addEventListener('click', showPassword)

// function showPassword() {
//     if (password.getAttribute("type") === "password") {
//         password.setAttribute("type", "text")
//         iconForm.src = "img/page/hide_2.png"
//     } else {
//         password.setAttribute("type", "password")
//         iconForm.src = "img/page/view_2.png"
//     }

// }

// // IntersectionObserver

// let options = {
//     root: null,
//     rootMargin: "0px 0px 0px 0px",
//     /*
//     threshhold: 0.3 відсоток появи об'єкту у в'юпорті 0.3 це 30% від розміру елементу який відслідковується
//     0 це будь яка поява
//     1 це повна поява об'кта в в'юпорті
//     */
//     threshhold: 0.3,
// }

// let callback = (entries, observer) => {
//     entries.forEach((entry) => {
//         const targetElement = entry.target
//         if (entry.isIntersecting) {
//             targetElement.classList.add("show")
//             // це прописано до останього завдання
//             if (targetElement.closest('.item__item')) {
//                 // запускамо функцію
//                 startInterval()
//                 // Зупиняємо спостереження, оскільки функція вже викликана
//                 // надибав такий варіант, працює, бо по іншому ніяк не міг це зробити
//                 observer.unobserve(entry.target)
//             }
//             //console.log("елемент видно")
//         } else {
//             // targetElement.classList.remove("show")
//             // console.log("елемент не видно")
//             if (!targetElement.closest('.item__item')) {
//                 targetElement.classList.remove("show")
//             }
//         }
//     })
// }

// let observer = new IntersectionObserver(callback, options)

// // якщо один об'єкт
// let target = document.querySelector(".section")
// observer.observe(target)

// // якщо об'єктів багато
// // let someElements = document.querySelectorAll("[class*='--anim']")
// // someElements.forEach(someElement => {
// //     observer.observe(someElement);
// // })

// // =====================================================
// // код для HEADER
// document.addEventListener('click', documentAct)
// function documentAct(e) {
//     const targetElement = e.target
//     // console.log(targetElement)
//     if (targetElement.closest('.header__burger')) {
//         document.documentElement.classList.toggle('menu-open')
//     } else if (targetElement.closest('.menu__link')) {
//         if (document.documentElement.classList.contains('menu-open')) {
//             document.documentElement.classList.remove('menu-open')
//         }
//         const linkMenu = targetElement.closest('.menu__link')
//         const goto = linkMenu.dataset.goto
//         const gotoElement = document.querySelector(goto)
//         if (gotoElement) {
//             gotoElement.scrollIntoView({
//                 behavior: "smooth",
//                 block: "center"
//             })
//         }
//         e.preventDefault()
//     }
//     else if (!targetElement.closest('.header__burger')) {
//         if (document.documentElement.classList.contains('menu-open')) {
//             document.documentElement.classList.remove('menu-open')
//         }
//     }
// }

// // =====================================================

// // тут все можна було робити через делегування, але я робив завдання окремо лише для наочності

// // домашка
// // --------------------------------------------------------

// // Задача №1
// // Дано в html: три елементи з класом item.
// // При кліку на кожен з елментів додати клас active,
// // при повторному кліку прибрати клас

// const itemElement = document.querySelectorAll('.item')
// itemElement.forEach(item => {
//     item.addEventListener("click", addNewClass)
// })
// function addNewClass() {
//     itemElement.forEach(item => {
//         item.classList.toggle('active')
//     })
// }
// // --------------------------------------------------------

// // Задача №2
// // Дано в css/scss: body прозорий
// // При повному завантаженню сторінки додати клас до body який прибирає прозорість.

// window.addEventListener("load", pageLoaded);
// function pageLoaded(e) {
//     document.body.classList.add('loaded');
// }

// // --------------------------------------------------------

// // Задача №3
// // Дано в html: header main footer
// // Пи наведенні курсору на header змінювати колір фону у footer.
// // Коли курсор йде з header повертати початковий фон для footer.

// const header = document.querySelector('header')
// const footer = document.querySelector('footer')
// // console.log(header)
// header.addEventListener("mouseenter", changeColor)
// header.addEventListener("mouseleave", revertColor)

// originalColor = window.getComputedStyle(footer).backgroundColor

// function revertColor() {
//     footer.style.backgroundColor = originalColor
// }

// function changeColor() {
//     footer.style.backgroundColor = 'red'
// }

// // --------------------------------------------------------

// // Задача №4
// // Дано в html: текст, елемент з класом item, текст. Так, що елемент з класом item за межами в'юпотрта.
// // Створити функцію яка будує інтервал який буде змінювати контент в елементі item виводячи цифру яка збільшується на одиницю: 1 2 3 ... і т.д.
// // Затримка між зміною числа, та до якого числа має працювати інтервал має задаватись в дата атрибутах елемента item.
// // Функція має запустатить коли ми доскролюємо до елементу item (його видно), і не запускатись повторно.

// const itemNum = document.querySelector('.item__item')
// let itemEnd = itemNum.dataset.end
// let itemDelay = itemNum.dataset.delay
// // console.log(itemEnd)
// // console.log(itemDelay)

// function dataToNum(elem) {
//     return parseFloat(elem)
// }

// function startInterval() {
//     if (itemNum) {
//         if (itemNum.classList.contains('show')) {
//             let i = 0
//             const intervalId = setInterval(() => {
//                 console.log(i)
//                 itemNum.textContent = `${i} +`
//                 ++i
//                 if (i > dataToNum(itemEnd)) {
//                     clearInterval(intervalId)
//                 }
//             }, i * dataToNum(itemDelay))
//         }
//     }
// }

// observer.observe(itemNum)

// /*
// щоб функція виконувалась лише один раз після з'яви,
// то в IntersectionObserver вище я зробив виключення для
// класу item__item, тобто коли я докрутив до нього, то запускав
// startInterval(), а потім зупиняв IntersectionObserver для цього класу

// === Зразок коду ===

//  if (targetElement.closest('.item__item')) {
//     startInterval()
//     observer.unobserve(entry.target)
// }

// */
