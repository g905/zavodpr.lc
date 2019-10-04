import $ from 'jquery';
import 'popper.js';
import 'bootstrap';
import 'bootstrap/js/dist/util';
import AOS from 'aos'
window.jQuery = $;
require("@fancyapps/fancybox");
import 'slick-carousel'
//import List from 'list.js'
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { faViber, faSkype, faWhatsapp, faVk, faYoutube, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faMapMarkerAlt, faSearch, faChevronDown } from '@fortawesome/free-solid-svg-icons'
library.add( faViber, faSkype, faWhatsapp, faVk, faYoutube, faFacebook, faInstagram, faMapMarkerAlt, faSearch, faChevronDown );

// ====================================== Replace fa-icons with SVGs ===============================
dom.watch();

$(()=>{
    console.log('loaded!!!');
// ====================================== Animate on scroll ====================================

    AOS.init();

// ====================================== Loader ===============================================

    $('.loader-area').fadeOut().end().delay(400).fadeOut('slow');

// ========================================= Navbar icon animation =================================

    $('.nav-button').on('click', function () {
        $('.animated-icon1').toggleClass('open');
    });

// ====================================== Slick sliders ========================================

    let slickCarousel = {
        useTransform: true,
        "infinite": true,
        "arrows": true,
        "dots": false,
        "autoplay": true,
        "slidesToShow": 1,
        "cssEase": "ease-out",
        "appendArrows": $('.slick-arrows')
    };

    $('.carousel').slick(slickCarousel);


});