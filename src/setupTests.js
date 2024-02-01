// // jest-dom adds custom jest matchers for asserting on DOM nodes.
// // allows you to do things like:
// // expect(element).toHaveTextContent(/react/i)
// // learn more: https://github.com/testing-library/jest-dom
// import "@testing-library/jest-dom";

// var overlay = document.createElement("div");
// var loader = document.createElement("span");
// loader.classList.add("loader");
// overlay.classList.add("overlay-div");
// overlay.appendChild(loader);
// document.body.appendChild(overlay);
// document.body.style.overflowY = "hidden";

// setTimeout(() => {
//   var sections = document.querySelectorAll("#PAGE_SECTIONSc1dmp section");
//   sections.forEach((section) => {
//     section.classList.add("swiper-slide");
//   });

//   document.querySelector("#PAGE_SECTIONSc1dmp").classList.add("swiper-wrapper");
//   var container = document.querySelector(".c1dmp-container");
//   container.classList.add("swiper");
//   // Create and append the pagination container
//   var paginationContainer = document.createElement("div");
//   paginationContainer.classList.add("swiper-pagination");
//   container.appendChild(paginationContainer);

//   var swiper = new Swiper(".swiper", {
//     // Optional parameters
//     direction: "vertical",
//     slidesPerView: 1,

//     mousewheel: {
//       invert: false,
//       thresholdDelta: 20,
//       thresholdTime: 500,
//     },
//     keyboard: {
//       enabled: true,
//     },
//     preventInteractionOnTransition: true,

//     // If we need pagination
//     pagination: {
//       el: ".swiper-pagination",
//       clickable: true,
//     },

//     // Navigation arrows
//     navigation: {
//       nextEl: ".swiper-button-next",
//       prevEl: ".swiper-button-prev",
//     },

//     // And if we need scrollbar
//     scrollbar: {
//       el: ".swiper-scrollbar",
//     },
//   });
//   overlay.style.display = "none";
//   document.body.style.overflowY = "scroll";

//   document.querySelector("#comp-lqghczgh1").addEventListener("click", () => {
//     document.querySelectorAll(".swiper-pagination-bullet")[3].click();
//   });

//   if (window.innerWidth > 991) {
//     document.querySelector("#comp-lqghczgi6").addEventListener("click", () => {
//       document.querySelectorAll(".swiper-pagination-bullet")[5].click();
//     });
//     document.querySelector("#comp-lqghczgh1").addEventListener("click", () => {
//       document.querySelectorAll(".swiper-pagination-bullet")[3].click();
//     });
//   } else {
//     document.querySelector("#comp-lqghczgi6").addEventListener("click", () => {
//       document.querySelectorAll(".swiper-pagination-bullet")[6].click();
//     });
//     document.querySelector("#comp-lqghczgh1").addEventListener("click", () => {
//       document.querySelectorAll(".swiper-pagination-bullet")[1].click();
//     });
//   }
// }, 3500);

// console.log("HELO");

// var overlay = document.createElement("div");
// var loader = document.createElement("span");
// loader.classList.add("loader");
// overlay.classList.add("overlay-div");
// overlay.appendChild(loader);
// document.body.appendChild(overlay);
// document.body.style.overflowY = "hidden";

// function addSlider(containerWrapperClass, sectionWrapperId, sectionId) {
//   var sections = document.querySelectorAll(sectionWrapperId);

//   console.log(sections);
//   if (sections.length != 0) {
//     sections.forEach((section) => {
//       section.classList.add("swiper-slide");
//     });

//     document.querySelector(sectionId).classList.add("swiper-wrapper");
//     var container = document.querySelector(containerWrapperClass);
//     container.classList.add("swiper");
//     // Create and append the pagination container
//     var paginationContainer = document.createElement("div");
//     paginationContainer.classList.add("swiper-pagination");
//     container.appendChild(paginationContainer);

//     var swiper = new Swiper(".swiper", {
//       // Optional parameters
//       direction: "vertical",
//       slidesPerView: 1,

//       mousewheel: {
//         invert: false,
//         thresholdDelta: 20,
//         thresholdTime: 500,
//       },
//       keyboard: {
//         enabled: true,
//       },
//       preventInteractionOnTransition: true,

//       // If we need pagination
//       pagination: {
//         el: ".swiper-pagination",
//         clickable: true,
//       },

//       // Navigation arrows
//       navigation: {
//         nextEl: ".swiper-button-next",
//         prevEl: ".swiper-button-prev",
//       },

//       // And if we need scrollbar
//       scrollbar: {
//         el: ".swiper-scrollbar",
//       },
//     });
//     overlay.style.display = "none";
//     document.body.style.overflowY = "scroll";
//   }
// }

// setTimeout(() => {
//   addSlider(
//     ".c1dmp-container",
//     "#PAGE_SECTIONSc1dmp section",
//     "#PAGE_SECTIONSc1dmp"
//   );
//   addSlider(
//     ".mjwlc-container",
//     "#PAGE_SECTIONSmjwlc section",
//     "#PAGE_SECTIONSmjwlc"
//   );
//   addSlider(
//     ".k6v3k-container",
//     "#PAGE_SECTIONSk6v3k section",
//     "#PAGE_SECTIONSk6v3k"
//   );
//   addSlider(
//     ".asm82-container",
//     "#PAGE_SECTIONSasm82 section",
//     "#PAGE_SECTIONSasm82"
//   );
//   addSlider(
//     ".oc538-container",
//     "#PAGE_SECTIONSoc538 section",
//     "#PAGE_SECTIONSoc538"
//   );
//   addSlider(
//     ".t1p2h-container",
//     "#PAGE_SECTIONSt1p2h section",
//     "#PAGE_SECTIONSt1p2h"
//   );
// }, 3500);
