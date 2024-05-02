const mainBookSwiper = document.querySelector("#main-book-swiper")
if (mainBookSwiper) {
   new Swiper("#main-book-swiper", {
      loop: true,
      autoplay: {
         delay: 3000, // Час (в мілісекундах) між автоматичними переключеннями
         disableOnInteraction: false, // Вимкнути автоперемотку при взаємодії користувача зі слайдером
      },
      pagination: {
         el: ".main-book-swiper__lines",
         clickable: true,
      },
      navigation: {
         nextEl: "#main-book-swiper-to-right",
         prevEl: "#main-book-swiper-to-left",
      },
      slidesPerView: 1,
      spaceBetween: 30,
      speed: 300,
      keyboard: {
         enabled: true,
         onlyInViewport: false,
      },
      //   breakpoints: {
      //      320: {
      //         slidesPerView: 1.5,
      //         spaceBetween: 5,
      //      },
      //      500: {
      //         slidesPerView: 2,
      //         spaceBetween: 10,
      //      },
      //      600: {
      //         slidesPerView: 3,
      //         spaceBetween: 15,
      //      },
      //      830: {
      //         slidesPerView: 4,
      //         spaceBetween: 20,
      //      },
      //      1208: {
      //         slidesPerView: 5,
      //         spaceBetween: 30,
      //      },
      //   },
   })
}

export function ourGenresInit() {
   const ourGenres = document.querySelector("#ourGenresSlider")
   if (ourGenres) {
      new Swiper("#ourGenresSlider", {
         loop: true,
         pagination: {
            el: "#ourGenresSliderLines",
            clickable: true,
         },
         navigation: {
            nextEl: "#ourGenresSliderNext",
            prevEl: "#ourGenresSliderPrev",
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
export function topGenresInit() {
   const popularTopGenres = document.querySelector("#popularTopGenres")
   if (popularTopGenres) {
      new Swiper("#popularTopGenres", {
         loop: true,
         pagination: {
            el: "#popularTopGenresLines",
            clickable: true,
         },
         navigation: {
            nextEl: "#popularTopGenresNext",
            prevEl: "#popularTopGenresPrev",
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

const scienceOurGenresSlider = document.querySelector("#scienceOurGenresSlider")
if (scienceOurGenresSlider) {
   new Swiper("#scienceOurGenresSlider", {
      loop: true,
      pagination: {
         el: "#scienceOurGenresSliderLines",
         clickable: true,
      },
      navigation: {
         nextEl: "#scienceOurGenresSliderNext",
         prevEl: "#scienceOurGenresSliderPrev",
      },
      slidesPerView: 5,
      spaceBetween: 30,
      autoHeight: true,
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

const sciencePopularTopGenres = document.querySelector("#sciencePopularTopGenres")
if (sciencePopularTopGenres) {
   new Swiper("#sciencePopularTopGenres", {
      loop: true,
      pagination: {
         el: "#sciencePopularTopGenresLines",
         clickable: true,
      },
      navigation: {
         nextEl: "#sciencePopularTopGenresNext",
         prevEl: "#sciencePopularTopGenresPrev",
      },
      slidesPerView: 5,
      spaceBetween: 30,
      autoHeight: true,
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

const infoBookSwiper = document.querySelector("#infoBookSwiper")
if (infoBookSwiper) {
   new Swiper("#infoBookSwiper", {
      loop: true,
      pagination: {
         el: "#infoBookLines",
         clickable: true,
      },
      navigation: {
         nextEl: "#infoBookNext",
         prevEl: "#infoBookPrev",
      },
      slidesPerView: 2,
      spaceBetween: 30,
      speed: 600,
      keyboard: {
         enabled: true,
         onlyInViewport: false,
      },
      breakpoints: {
         320: {
            slidesPerView: 1,
            spaceBetween: 30,
         },
         1230: {
            slidesPerView: 2,
            spaceBetween: 30,
         },
      },
   })
}
