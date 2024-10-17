"use strict"
class NavigaionPages {
   constructor(productsPagesCount, size, pathToPaste, activeClass) {
      this.productsPagesCount = productsPagesCount
      this.pathToPaste = pathToPaste
      this.size = parseInt(size)
      this.activeClass = activeClass

      // ----------
      this.idForPrevButton = this.generateUniqueID()
      this.idForNextButton = this.generateUniqueID()
      this.idForPagesWrapper = this.generateUniqueID()

      // ----------

      this.el = this.render()
      this.alignPages = this.alignPages.bind(this)
      document.addEventListener("alignPages", this.alignPages)
   }
   alignPages() {
      const pagesWrapper = document.getElementById(this.idForPagesWrapper)
      let firstNum = parseInt(document.querySelector(".navigation-pages__page").textContent)
      firstNum++
      let activeItem
      const allPages = document.querySelectorAll(".navigation-pages__page")
      allPages.forEach(item => {
         if (item.classList.contains(this.activeClass)) {
            if (item.nextElementSibling) activeItem = parseInt(item.nextElementSibling.textContent)
         }
      })

      console.log(activeItem)
      if (activeItem - Math.floor(this.size / 2) <= 1) {
         pagesWrapper.innerHTML = ""
         for (let i = 1; i <= firstNum + this.size - 2; i++) {
            let button
            if (i === this.size - 1) {
               button = document.createElement("span")
               button.textContent = "..."
            } else if (i === activeItem) {
               button = document.createElement("span")
               button.textContent = i
            } else if (i === this.size) {
               button = document.createElement("a")
               button.setAttribute("href", "#")
               button.textContent = this.productsPagesCount
            } else {
               button = document.createElement("a")
               button.setAttribute("href", "#")
               button.textContent = i
            }
            if (activeItem === i && i !== 8) button.className = `navigation-pages__page ${this.activeClass}`
            else button.className = "navigation-pages__page"
            pagesWrapper.append(button)
         }
         activeItem++
      } else if (activeItem + Math.floor(this.size / 2) >= this.productsPagesCount) {
         pagesWrapper.innerHTML = ""
         for (let i = this.productsPagesCount - this.size + 1; i <= this.productsPagesCount; i++) {
            let button
            if (i === this.productsPagesCount - this.size + 1) {
               button = document.createElement("a")
               button.setAttribute("href", "#")
               button.textContent = "1"
            } else if (i === this.productsPagesCount - this.size + 2) {
               button = document.createElement("span")
               button.textContent = "..."
            } else if (i === activeItem) {
               button = document.createElement("span")
               button.textContent = i
            } else if (i === this.productsPagesCount) {
               button = document.createElement("a")
               button.setAttribute("href", "#")
               button.textContent = this.productsPagesCount
            } else {
               button = document.createElement("a")
               button.setAttribute("href", "#")
               button.textContent = i
            }
            if (activeItem === i) button.className = `navigation-pages__page ${this.activeClass}`
            else button.className = "navigation-pages__page"
            pagesWrapper.append(button)
         }
         if (activeItem !== this.productsPagesCount) activeItem++
      } else if (activeItem - Math.floor(this.size / 2) > 0) {
         pagesWrapper.innerHTML = ""
         for (let i = activeItem - Math.floor(this.size / 2); i <= activeItem + Math.floor(this.size / 2); i++) {
            let button
            if (i === activeItem - Math.floor(this.size / 2)) {
               button = document.createElement("a")
               button.setAttribute("href", "#")
               button.textContent = "1"
            } else if (i === activeItem - Math.floor(this.size / 2) + 1) {
               button = document.createElement("span")
               button.textContent = "..."
            } else if (i === activeItem + Math.floor(this.size / 2) - 1) {
               button = document.createElement("span")
               button.textContent = "..."
            } else if (i === activeItem) {
               button = document.createElement("span")
               button.textContent = i
            } else if (i === activeItem + Math.floor(this.size / 2)) {
               button = document.createElement("a")
               button.setAttribute("href", "#")
               button.textContent = this.productsPagesCount
            } else {
               button = document.createElement("a")
               button.setAttribute("href", "#")
               button.textContent = i
            }
            if (activeItem === i && i !== activeItem + Math.floor(this.size / 2) - 1) button.className = `navigation-pages__page ${this.activeClass}`
            else button.className = "navigation-pages__page"
            pagesWrapper.append(button)
         }
      }
   }
   generateUniqueID() {
      return "id-" + Date.now() + "-" + Math.floor(Math.random() * 1000)
   }
   setupPages() {
      const pagesWrapper = document.getElementById(this.idForPagesWrapper)
      for (let i = 1; i <= this.size; i++) {
         const button = document.createElement("a")
         button.setAttribute("href", "#")
         if (i === 1) button.className = `navigation-pages__page ${this.activeClass}`
         else button.className = "navigation-pages__page"
         if (i === this.size - 1) button.textContent = "..."
         else if (i === this.size) button.textContent = this.productsPagesCount
         else button.textContent = i
         pagesWrapper.append(button)
      }
   }
   // -----------------
   setupPagesWithLessPages() {
      const pagesWrapper = document.getElementById(this.idForPagesWrapper)
      for (let i = 1; i <= this.size; i++) {
         // console.log("work")
         const button = document.createElement("a")
         button.setAttribute("href", "#")
         if (i === 1) button.className = `navigation-pages__page ${this.activeClass}`
         else button.className = "navigation-pages__page"
         if (i === this.size - i) button.textContent = i
         button.textContent = i
         // console.log(button.textContent)
         pagesWrapper.append(button)
      }
   }
   // -----------------
   setEventsToArrowButtons() {
      document.getElementById(this.idForNextButton).addEventListener("click", this.translatePagesNumbersToRight.bind(this))
      document.getElementById(this.idForPrevButton).addEventListener("click", this.translatePagesNumbersToLeft.bind(this))
      document.getElementById(this.idForPagesWrapper).addEventListener("click", this.shiftPages.bind(this))
      // document.getElementById(this.idForPagesWrapper).addEventListener("click", this.translatePages.bind(this))
   }
   translatePagesNumbersToRight() {
      const pagesWrapper = document.getElementById(this.idForPagesWrapper)
      let firstNum = parseInt(document.querySelector(".navigation-pages__page").textContent)
      firstNum++
      let activeItem
      const allPages = document.querySelectorAll(".navigation-pages__page")
      allPages.forEach(item => {
         if (item.classList.contains(this.activeClass)) {
            if (item.nextElementSibling) activeItem = parseInt(item.nextElementSibling.textContent)
         }
      })
      console.log(activeItem)
      if (activeItem - Math.floor(this.size / 2) <= 1) {
         pagesWrapper.innerHTML = ""
         for (let i = 1; i <= firstNum + this.size - 2; i++) {
            let button
            if (i === this.size - 1) {
               button = document.createElement("span")
               button.textContent = "..."
            } else if (i === activeItem) {
               button = document.createElement("span")
               button.textContent = i
            } else if (i === this.size) {
               button = document.createElement("a")
               button.setAttribute("href", "#")
               button.textContent = this.productsPagesCount
            } else {
               button = document.createElement("a")
               button.setAttribute("href", "#")
               button.textContent = i
            }

            if (activeItem === i && i !== 8) button.className = `navigation-pages__page ${this.activeClass}`
            else button.className = "navigation-pages__page"

            // if (i === 8) console.log("8")
            // console.log(thisPageNum)
            pagesWrapper.append(button)
         }
         activeItem++
      } else if (activeItem + Math.floor(this.size / 2) >= this.productsPagesCount) {
         pagesWrapper.innerHTML = ""

         for (let i = this.productsPagesCount - this.size + 1; i <= this.productsPagesCount; i++) {
            let button
            if (i === this.productsPagesCount - this.size + 1) {
               button = document.createElement("a")
               button.setAttribute("href", "#")
               button.textContent = "1"
            } else if (i === this.productsPagesCount - this.size + 2) {
               button = document.createElement("span")
               button.textContent = "..."
            } else if (i === activeItem) {
               button = document.createElement("span")
               button.textContent = i
            } else if (i === this.productsPagesCount) {
               button = document.createElement("a")
               button.setAttribute("href", "#")
               button.textContent = this.productsPagesCount
            } else {
               button = document.createElement("a")
               button.setAttribute("href", "#")
               button.textContent = i
            }

            if (activeItem === i) button.className = `navigation-pages__page ${this.activeClass}`
            else button.className = "navigation-pages__page"

            // if (i === 8) console.log("8")
            // console.log(thisPageNum)
            pagesWrapper.append(button)
         }

         if (activeItem !== this.productsPagesCount) activeItem++
      } else if (activeItem - Math.floor(this.size / 2) > 0) {
         pagesWrapper.innerHTML = ""
         for (let i = activeItem - Math.floor(this.size / 2); i <= activeItem + Math.floor(this.size / 2); i++) {
            let button
            if (i === activeItem - Math.floor(this.size / 2)) {
               button = document.createElement("a")
               button.setAttribute("href", "#")
               button.textContent = "1"
            } else if (i === activeItem - Math.floor(this.size / 2) + 1) {
               button = document.createElement("span")
               button.textContent = "..."
            } else if (i === activeItem + Math.floor(this.size / 2) - 1) {
               button = document.createElement("span")
               button.textContent = "..."
            } else if (i === activeItem) {
               button = document.createElement("span")
               button.textContent = i
            } else if (i === activeItem + Math.floor(this.size / 2)) {
               button = document.createElement("a")
               button.setAttribute("href", "#")
               button.textContent = this.productsPagesCount
            } else {
               button = document.createElement("a")
               button.setAttribute("href", "#")
               button.textContent = i
            }

            if (activeItem === i && i !== activeItem + Math.floor(this.size / 2) - 1) button.className = `navigation-pages__page ${this.activeClass}`
            else button.className = "navigation-pages__page"

            // if (i === 8) console.log("8")
            // console.log(thisPageNum)
            pagesWrapper.append(button)
         }
         if (activeItem !== this.productsPagesCount) activeItem++
      }
   }
   setEventsToArrowButtonsWithLessPages() {
      document.getElementById(this.idForNextButton).addEventListener("click", this.translatePagesNumbersToRightWithLessPages.bind(this))
      document.getElementById(this.idForPrevButton).addEventListener("click", this.translatePagesNumbersToLeftWithLessPages.bind(this))
      document.getElementById(this.idForPagesWrapper).addEventListener("click", this.shiftPagesWithLessPages.bind(this))
      // document.getElementById(this.idForPagesWrapper).addEventListener("click", this.translatePages.bind(this))
   }
   // ---------
   translatePagesNumbersToRightWithLessPages() {
      const pagesWrapper = document.getElementById(this.idForPagesWrapper)
      // let firstNum = parseInt(document.querySelector(".navigation-pages__page").textContent)
      // firstNum++
      let activeItem
      const allPages = document.querySelectorAll(".navigation-pages__page")
      allPages.forEach(item => {
         if (item.classList.contains(this.activeClass)) {
            if (item.nextElementSibling) activeItem = parseInt(item.nextElementSibling.textContent)
         }
      })

      if (activeItem) {
         pagesWrapper.innerHTML = ""
         for (let i = 1; i <= this.size; i++) {
            let button
            if (i === activeItem) {
               button = document.createElement("span")
               button.textContent = i
               button.className = `navigation-pages__page ${this.activeClass}`
            } else {
               button = document.createElement("a")
               button.setAttribute("href", "#")
               button.textContent = i
               button.className = "navigation-pages__page"
            }

            // button.className = "navigation-pages__page"

            pagesWrapper.append(button)
         }
         activeItem++
      }
   }
   translatePagesNumbersToLeftWithLessPages() {
      // console.log("left")
      const pagesWrapper = document.getElementById(this.idForPagesWrapper)
      let firstNum = parseInt(document.querySelector(".navigation-pages__page").textContent)
      firstNum--

      let activeItem
      const allPages = document.querySelectorAll(".navigation-pages__page")
      allPages.forEach(item => {
         if (item.classList.contains(this.activeClass)) {
            if (item.previousElementSibling) activeItem = parseInt(item.previousElementSibling.textContent)
         }
      })

      // console.log(activeItem)
      if (activeItem > 0) {
         pagesWrapper.innerHTML = ""
         for (let i = 1; i <= this.size; i++) {
            let button
            if (i === activeItem) {
               button = document.createElement("span")
               button.textContent = i
               button.className = `navigation-pages__page ${this.activeClass}`
            } else {
               button = document.createElement("a")
               button.setAttribute("href", "#")
               button.textContent = i
               button.className = "navigation-pages__page"
            }
            // if (thisPageNum === i) button.className = `navigation-pages__page ${this.activeClass}`
            //             else button.className = "navigation-pages__page"
            //             button.className = "navigation-pages__page"

            pagesWrapper.append(button)
         }
         activeItem--
      }
   }
   // ---------
   translatePagesNumbersToLeft() {
      console.log("left")
      const pagesWrapper = document.getElementById(this.idForPagesWrapper)
      let firstNum = parseInt(document.querySelector(".navigation-pages__page").textContent)
      firstNum--

      let activeItem
      const allPages = document.querySelectorAll(".navigation-pages__page")
      allPages.forEach(item => {
         if (item.classList.contains(this.activeClass)) {
            if (item.previousElementSibling) activeItem = parseInt(item.previousElementSibling.textContent)
         }
      })

      // console.log(activeItem)
      if (activeItem > 0) {
         if (activeItem - Math.floor(this.size / 2) <= 1) {
            pagesWrapper.innerHTML = ""
            for (let i = 1; i <= firstNum + this.size; i++) {
               let button
               if (i === this.size - 1) {
                  button = document.createElement("span")
                  button.textContent = "..."
               } else if (i === activeItem) {
                  button = document.createElement("span")
                  button.textContent = i
               } else if (i === this.size) {
                  button = document.createElement("a")
                  button.setAttribute("href", "#")
                  button.textContent = this.productsPagesCount
               } else {
                  button = document.createElement("a")
                  button.setAttribute("href", "#")
                  button.textContent = i
               }

               if (activeItem === i && i !== this.size - 1) button.className = `navigation-pages__page ${this.activeClass}`
               else button.className = "navigation-pages__page"

               // if (i === 8) console.log("8")
               // console.log(thisPageNum)
               pagesWrapper.append(button)
            }
            activeItem--
         } else if (activeItem + Math.floor(this.size / 2) >= this.productsPagesCount) {
            pagesWrapper.innerHTML = ""

            for (let i = this.productsPagesCount - this.size + 1; i <= this.productsPagesCount; i++) {
               let button
               if (i === this.productsPagesCount - this.size + 1) {
                  button = document.createElement("a")
                  button.setAttribute("href", "#")
                  button.textContent = "1"
               } else if (i === this.productsPagesCount - this.size + 2) {
                  button = document.createElement("span")
                  button.textContent = "..."
               } else if (i === activeItem) {
                  button = document.createElement("span")
                  button.textContent = i
               } else if (i === this.productsPagesCount) {
                  button = document.createElement("a")
                  button.setAttribute("href", "#")
                  button.textContent = this.productsPagesCount
               } else {
                  button = document.createElement("a")
                  button.setAttribute("href", "#")
                  button.textContent = i
               }

               if (activeItem === i) button.className = `navigation-pages__page ${this.activeClass}`
               else button.className = "navigation-pages__page"

               // if (i === 8) console.log("8")
               // console.log(thisPageNum)
               pagesWrapper.append(button)
            }

            if (activeItem !== this.productsPagesCount) activeItem--
         } else if (activeItem - Math.floor(this.size / 2) > 0) {
            pagesWrapper.innerHTML = ""
            for (let i = activeItem - Math.floor(this.size / 2); i <= activeItem + Math.floor(this.size / 2); i++) {
               let button
               if (i === activeItem - Math.floor(this.size / 2)) {
                  button = document.createElement("a")
                  button.setAttribute("href", "#")
                  button.textContent = "1"
               } else if (i === activeItem - Math.floor(this.size / 2) + 1) {
                  button = document.createElement("span")
                  button.textContent = "..."
               } else if (i === activeItem + Math.floor(this.size / 2) - 1) {
                  button = document.createElement("span")
                  button.textContent = "..."
               } else if (i === activeItem) {
                  button = document.createElement("span")
                  button.textContent = i
               } else if (i === activeItem + Math.floor(this.size / 2)) {
                  button = document.createElement("a")
                  button.setAttribute("href", "#")
                  button.textContent = this.productsPagesCount
               } else {
                  button = document.createElement("a")
                  button.setAttribute("href", "#")
                  button.textContent = i
               }

               if (activeItem === i && i !== activeItem + Math.floor(this.size / 2) - 1)
                  button.className = `navigation-pages__page ${this.activeClass}`
               else button.className = "navigation-pages__page"

               // if (i === 8) console.log("8")
               // console.log(thisPageNum)
               pagesWrapper.append(button)
            }
            if (activeItem !== this.productsPagesCount) activeItem--
         }
      }
   }
   shiftPages(e) {
      const target = e.target
      if (target.closest(".navigation-pages__page")) {
         const thisPage = target.closest(".navigation-pages__page")

         let thisPageNum
         if (isNaN(parseInt(thisPage.textContent))) {
            let el = thisPage.previousElementSibling
            if (el) thisPageNum = parseInt(el.textContent) + 1
            else {
               let otherEl = thisPage.nextElementSibling
               thisPageNum = parseInt(otherEl.textContent) - 1
            }
         } else thisPageNum = parseInt(thisPage.textContent)
         // translatePagesNumbersToRight(thisPageNum)

         const allPages = document.querySelectorAll(".navigation-pages__page")
         allPages.forEach(item => item.classList.remove(this.activeClass))

         thisPage.classList.add(this.activeClass)

         const pagesWrapper = document.getElementById(this.idForPagesWrapper)

         if (thisPageNum - Math.floor(this.size / 2) <= 1) {
            console.log("thisPageNum - 4 < 0")
            const firstLinkNum = parseInt(document.querySelector(".navigation-pages__page").textContent)
            pagesWrapper.innerHTML = ""
            // console.log(firstLinkNum)
            for (let i = 1; i <= firstLinkNum + this.size - 1; i++) {
               let button
               if (i === this.size - 1) {
                  button = document.createElement("span")
                  button.textContent = "..."
               } else if (i === firstLinkNum + this.size - 1) {
                  button = document.createElement("a")
                  button.setAttribute("href", "#")
                  button.textContent = this.productsPagesCount
               } else if (thisPageNum === i) {
                  button = document.createElement("span")
                  button.textContent = i
               } else {
                  button = document.createElement("a")
                  button.setAttribute("href", "#")
                  button.textContent = i
               }

               if (thisPageNum === i && i !== 8) button.className = `navigation-pages__page ${this.activeClass}`
               else button.className = "navigation-pages__page"

               // if (i === 8) console.log("8")
               // console.log(thisPageNum)
               pagesWrapper.append(button)
            }
         } else if (thisPageNum + Math.floor(this.size / 2) >= this.productsPagesCount) {
            // console.log("thisPageNum + 4 >= productsPagesCount")
            const lastElem = this.productsPagesCount

            pagesWrapper.innerHTML = ""
            // console.log(firstLinkNum)
            for (let i = lastElem - this.size + 1; i <= lastElem; i++) {
               let button
               if (i === lastElem - this.size + 1) {
                  button = document.createElement("a")
                  button.setAttribute("href", "#")
                  button.textContent = "1"
               } else if (i === lastElem - this.size + 2) {
                  button = document.createElement("span")
                  button.textContent = "..."
               } else if (i === lastElem) {
                  button = document.createElement("a")
                  button.setAttribute("href", "#")
                  button.textContent = this.productsPagesCount
               } else if (thisPageNum === i) {
                  button = document.createElement("span")
                  button.textContent = i
               } else {
                  button = document.createElement("a")
                  button.setAttribute("href", "#")
                  button.textContent = i
               }

               if (thisPageNum === i && i !== this.size - 1) button.className = `navigation-pages__page ${this.activeClass}`
               else button.className = "navigation-pages__page"

               // if (i === 8) console.log("8")
               // console.log(thisPageNum)
               pagesWrapper.append(button)
            }
         } else if (thisPageNum - Math.floor(this.size / 2) > 0) {
            // console.log(" > 0")
            // console.log("thisPageNum - 4 > 0")
            // console.log(thisPageNum)
            if (thisPageNum + Math.floor(this.size / 2) <= this.productsPagesCount) {
               pagesWrapper.innerHTML = ""

               for (let i = thisPageNum - Math.floor(this.size / 2); i <= thisPageNum + Math.floor(this.size / 2); i++) {
                  let button
                  if (i === thisPageNum - Math.floor(this.size / 2)) {
                     button = document.createElement("a")
                     button.setAttribute("href", "#")
                     button.textContent = "1"
                  } else if (i === thisPageNum - Math.floor(this.size / 2) + 1) {
                     button = document.createElement("span")
                     button.textContent = "..."
                  } else if (i === thisPageNum + Math.floor(this.size / 2) - 1) {
                     button = document.createElement("span")
                     button.textContent = "..."
                  } else if (i === thisPageNum + Math.floor(this.size / 2)) {
                     button = document.createElement("a")
                     button.setAttribute("href", "#")
                     button.textContent = this.productsPagesCount
                  } else if (thisPageNum === i) {
                     button = document.createElement("span")
                     button.textContent = i
                  } else {
                     button = document.createElement("a")
                     button.setAttribute("href", "#")
                     button.textContent = i
                  }

                  if (thisPageNum === i && i !== thisPageNum + Math.floor(this.size / 2) - 1)
                     button.className = `navigation-pages__page ${this.activeClass}`
                  else button.className = "navigation-pages__page"

                  if (i === thisPageNum + Math.floor(this.size / 2) - 1) button.className = "navigation-pages__page"
                  pagesWrapper.append(button)
               }
            }
         }
      }
   }
   shiftPagesWithLessPages(e) {
      const target = e.target
      if (target.closest(".navigation-pages__page")) {
         const thisPage = target.closest(".navigation-pages__page")

         let thisPageNum
         if (isNaN(parseInt(thisPage.textContent))) {
            let el = thisPage.previousElementSibling
            if (el) thisPageNum = parseInt(el.textContent) + 1
            else {
               let otherEl = thisPage.nextElementSibling
               thisPageNum = parseInt(otherEl.textContent) - 1
            }
         } else thisPageNum = parseInt(thisPage.textContent)
         // translatePagesNumbersToRight(thisPageNum)

         const allPages = document.querySelectorAll(".navigation-pages__page")
         allPages.forEach(item => item.classList.remove(this.activeClass))

         thisPage.classList.add(this.activeClass)

         const pagesWrapper = document.getElementById(this.idForPagesWrapper)

         const firstLinkNum = parseInt(document.querySelector(".navigation-pages__page").textContent)
         pagesWrapper.innerHTML = ""
         // console.log(firstLinkNum)
         for (let i = 1; i <= this.size; i++) {
            let button
            if (thisPageNum === i) {
               button = document.createElement("span")
               button.textContent = i
            } else {
               button = document.createElement("a")
               button.setAttribute("href", "#")
               button.textContent = i
            }
            if (thisPageNum === i) button.className = `navigation-pages__page ${this.activeClass}`
            else button.className = "navigation-pages__page"

            pagesWrapper.append(button)
         }
      }
   }
   createFloor() {
      const floor = document.getElementById(this.pathToPaste)
      if (floor) {
         const template = `
       <div class="navigation-pages">
            <button class="navigation-pages__button"
               id="${this.idForPrevButton}"><i class="fa-solid fa-arrow-left"></i></button>
                     <div id="${this.idForPagesWrapper}" class="navigation-pages__wrapper-pages"></div>
            <button class="navigation-pages__button"
               id="${this.idForNextButton}"> <i class="fa-solid fa-arrow-right"></i></button>
      </div>
      `
         floor.innerHTML = template
      } else return false
   }

   error() {
      console.log("Error")
      return "Error"
   }
   render() {
      if (this.productsPagesCount <= 7) {
         this.createFloor()
         this.setupPagesWithLessPages()
         this.setEventsToArrowButtonsWithLessPages()
      } else {
         if (this.size > this.productsPagesCount) this.error()
         else {
            this.createFloor()
            this.setupPages()
            this.setEventsToArrowButtons()
         }
      }
   }
}
export default NavigaionPages
