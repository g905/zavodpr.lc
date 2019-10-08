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
        infinite: true,
        arrows: true,
        dots: false,
        autoplay: true,
        slidesToShow: 1,
        cssEase: "ease-out",
        appendArrows: $('#slickArrowsCarousel')
    };

    let slickSolutions = {
        infinite: false,
        arrows: true,
        dots: false,
        autoplay: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        appendArrows: $('#slickArrowsSolutions'),
        responsive: [{
            breakpoint: '768',
            settings: {
                arrows: false,
                dots: true,
                slidesToShow: 1
            }
        }]
    };

    let slickTeam = {
        infinite: false,
        arrows: true,
        dots: false,
        autoplay: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: '768',
            settings: {
                arrows: false,
                dots: true,
                slidesToShow: 1
            }
        }]
    };

    let slickNews = {
        infinite: false,
        arrows: true,
        dots: false,
        autoplay: false,
        slidesToShow: 2,
        slidesToScroll: 1,
        appendArrows: $('#arrowsNews'),
        responsive: [{
            breakpoint: '768',
            settings: {
                arrows: false,
                dots: true,
                slidesToShow: 1
            }
        }]
    };

    let slickArticles = {
        infinite: false,
        arrows: true,
        dots: false,
        autoplay: false,
        slidesToShow: 2,
        slidesToScroll: 1,
        appendArrows: $('#arrowsArticles'),
        responsive: [{
            breakpoint: '768',
            settings: {
                arrows: false,
                dots: true,
                slidesToShow: 1
            }
        }]
    };

    let slickPartners = {
        infinite: false,
        arrows: true,
        dots: false,
        autoplay: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        appendArrows: $('#arrowsPartners'),
        responsive: [{
            breakpoint: '768',
            settings: {
                arrows: false,
                dots: true,
                slidesToShow: 1
            }
        }]
    };

    let slickHistory = {
        infinite: false,
        arrows: true,
        dots: false,
        autoplay: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        appendArrows: $('#arrowsHistory'),
        responsive: [{
            breakpoint: '768',
            settings: {
                arrows: false,
                dots: true,
                slidesToShow: 1
            }
        }]
    };

    $('.carousel').slick(slickCarousel);
    $('.slick-solutions').slick(slickSolutions);
    $('.slick-team').slick(slickTeam);
    $('.slick-news').slick(slickNews);
    $('.slick-articles').slick(slickArticles);
    $('.slick-partners').slick(slickPartners);
    $('.slick-history').slick(slickHistory);

});