import $ from "jquery";

let hamburger = $('.hamburger');
let navbarList = $('.navbar-list');
let overlay = $('.overlay');

export default function Hamburger(){

function updateNavbarVisibility() {
    if (window.innerWidth <= 990) {
        hamburger.removeClass('not-visible');
    } else {
        hamburger.addClass('not-visible');
    }
}

updateNavbarVisibility();

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

    let overlay = $('<div>'); 
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

hamburger.on('click', function(){
   createOverlay() , toggleNavbar()
});

}