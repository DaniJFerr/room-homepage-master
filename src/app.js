// import './main.scss';
// import $ from "jquery";

// let hamburger = $('.hamburger');
// let navbarList = $('.navbar-list');
// let overlay = $('.overlay');

// window.addEventListener('resize', () => {
//     if (window.innerWidth <= 990) {
//         navbarList.addClass('not-visible');
//         hamburger.removeClass('not-visible');

//     } else if (window.innerWidth > 900) {
//         hamburger.addClass('not-visible');
//         navbarList.removeClass('not-visible');
//     }
    
// });

// function handleClick() {
//     let isToggleActive = hamburger.toggleClass('is-active').hasClass('is-active');
//     if(!isToggleActive) {
//         navbarList.addClass('not-visible');
//         navbarList.removeClass('list-visible');
//     } else if (isToggleActive) {
//         navbarList.removeClass('not-visible');
//         navbarList.addClass('list-visible');
//     }
// }

// // function handleOverlay() {
// //     let isToggleActive = overlay.toggleClass('is-active').hasClass('is-active');
// //     if(!isToggleActive) {
// //         overlay.addClass('not-visible');
// //     } else if (isToggleActive) {
// //         overlay.removeClass('not-visible');
// //     }
// // }

// hamburger.on('click', handleClick ());


// import './main.scss';
// import $ from "jquery";

// let hamburger = $('.hamburger');
// let navbarList = $('.navbar-list');

// // It's better to use a function to determine the state and apply changes accordingly
// function updateNavbarVisibility() {
//     if (window.innerWidth <= 990) {
//         navbarList.addClass('not-visible');
//         hamburger.removeClass('not-visible');
//     } else {
//         hamburger.addClass('not-visible');
//         navbarList.removeClass('not-visible');
//     }
// }

// // Call initially to set the correct classes based on the current screen size
// updateNavbarVisibility();

// // Debounce resize event for performance improvements
// let debounceTimeout;
// window.addEventListener('resize', () => {
//     clearTimeout(debounceTimeout);
//     debounceTimeout = setTimeout(updateNavbarVisibility, 100);
// });

// function toggleNavbar() {
//     let isToggleActive = hamburger.toggleClass('is-active').hasClass('is-active');
    
//     if(!isToggleActive) {
//         navbarList.addClass('not-visible').addClass('not-list-visible');
//         toogleOverlay(false);  
//     } else {
//         navbarList.removeClass('not-visible').addClass('list-visible');
//         toogleOverlay(true);
//     }
// }

// function createOverlay(){
//       // Moved overlay logic here to reduce global scope pollution
//       let overlay = $('div'); // Assume there's an overlay div you want to select instead of creating a new <div>
//       overlay.addClass('overlay'); 
//      $('body').append(overlay);
// }

// function toogleOverlay(isToggleActive){
//     if(isToggleActive){
//         overlay.addClass('overlay-visible');
//     } else {
//         overlay.removeClass('overlay-visible');
//     }
// }


// // Remove redundant IIFE that was directly invoking handleClick();
// hamburger.on('click', toggleNavbar, createOverlay);


import './main.scss';
import $ from "jquery";

let hamburger = $('.hamburger');
let navbarList = $('.navbar-list');
let overlay = $('.overlay');

// It's better to use a function to determine the state and apply changes accordingly
function updateNavbarVisibility() {
    if (window.innerWidth <= 990) {
        hamburger.removeClass('not-visible');
    } else {
        hamburger.addClass('not-visible');
    }
}

// Call initially to set the correct classes based on the current screen size
updateNavbarVisibility();

// Debounce resize event for performance improvements
let debounceTimeout;
window.addEventListener('resize', () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(updateNavbarVisibility, 100);
});

function toggleNavbar() {
    let isToggleActive = hamburger.toggleClass('is-active').hasClass('is-active');
    
    if(!isToggleActive) {
        navbarList.toggleClass('Animated');
        toggleOverlay(false);  
    } else {
        navbarList.toggleClass('Animated');
        toggleOverlay(true);
    }
}

function createOverlay() {
    // Moved overlay logic here to reduce global scope pollution
    let overlay = $('<div>'); // Assume there's an overlay div you want to select instead of creating a new <div>
    overlay.addClass('overlay'); 
    $('body').append(overlay);
}

function toggleOverlay(isToggleActive) {
    overlay = $('.overlay');
    if (isToggleActive) {
        overlay.addClass('overlay-visible');
    } else {
        overlay.removeClass('overlay-visible'); 
        overlay.remove();
    }
}

// Remove redundant IIFE that was directly invoking handleClick();
hamburger.on('click', function(){
   createOverlay() , toggleNavbar()
});
