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

// ====================================== Replace fa-icons with SVGs ===========================
dom.watch();

$(()=>{
    console.log('loaded!!!');
// ====================================== Animate on scroll ====================================

    AOS.init();

// ====================================== Loader ===============================================

    $('.loader-area').fadeOut().end().delay(400).fadeOut('slow');

// ====================================== Navbar icon animation ================================

    $('.nav-button').on('click', function () {
        $('.animated-icon1').toggleClass('open');
    });

// ====================================== YMaps ================================================

    $( document ).ready(()=>{ymaps.ready(init)});
    function init(){
        let myMap = new ymaps.Map("ymapsContainer", {
            center: [55.76, 37.64],
            zoom: 7,
            controls: []
        });

        let route = new ymaps.multiRouter.MultiRoute({
            referencePoints: [
                'Москва',
                'Ижевск',
            ]
        },
            {
                boundsAutoApply: true
            });

        myMap.behaviors.disable('scrollZoom');

        myMap.geoObjects.add(route);

        route.events.add("boundschange", ()=>{
            myMap.setBounds(route.getBounds(), {
                checkZoomRange: true
            })
        });

        function setData(data) {
            $('.small').text('');
            let from = data[0].value;
            let to = data[1].value;

            let result = {};

            if(from === "") {
                result.res = 'error';
                result.item = 'from';
            } else
            if(to === "") {
                result.res = 'error';
                result.item = 'to';
            } else {
                result.res = 'success';
                result.from = from;
                result.to = to;
            }

            return result;
        }

        $('#ymapsForm').submit((e)=>{
            $('.preloader').css('display', 'block');
            e.preventDefault();
            //console.log($(e.target).serializeArray());

            let data = setData($(e.target).serializeArray());

            let points = [];
            if(data.res === 'success'){
                points.push(data.from, data.to);
                route.model.setReferencePoints(points);
                ymaps.route(points)
                    .done((router)=>{
                        $('#distance').text(Math.round(router.getLength()/1000) + " км");
                        console.log(router.getHumanLength()); // длина маршрута
                        //console.log(route.getHumanTime()); // сколько примерно повремени
                        $('.preloader').css('display', 'none');
                    }, (err)=>{
                        $('.preloader').css('display', 'none');
                        console.log(err.message);
                    })
            } else {
                $('.preloader').css('display', 'none');
                $('#'+data.item+'Help').text('Ошибка');
            }
        });

    }

// ======================================== Calculator =========================================
    $('#calcBtn').click(()=>{
        $('#calculator').toggleClass('calc-show')
    });
    $('#closeCalcBtn').click(()=>{
        $('#calculator').removeClass('calc-show')
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