import $ from 'jquery';
import 'popper.js';
import 'bootstrap';
import 'bootstrap/js/dist/util';
import AOS from 'aos'
import Pace from 'pace-js/pace'
window.jQuery = $;
window.$ = $;
require("@fancyapps/fancybox");
import 'slick-carousel'
//import List from 'list.js'
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { faViber, faSkype, faWhatsapp, faVk, faYoutube, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faMapMarkerAlt, faSearch, faChevronDown, faChevronLeft, faChevronRight, faTh, faThList } from '@fortawesome/free-solid-svg-icons'
library.add( faViber, faSkype, faWhatsapp, faVk, faYoutube, faFacebook, faInstagram, faMapMarkerAlt, faSearch, faChevronDown, faChevronLeft, faChevronRight, faTh, faThList );

// ====================================== Replace fa-icons with SVGs ===========================
dom.watch();

$(()=>{
    Pace.start();
    //console.log('loaded!!!');
// ====================================== Animate on scroll ====================================

    AOS.init();

// ====================================== Loader ===============================================

    //$('.loader-area').fadeOut().end().delay(400).fadeOut('slow');

// ====================================== Navbar icon animation ================================

    $('.nav-button').on('click', function () {
        $('.animated-icon1').toggleClass('open');
    });

// ===================================== Custom File Input =====================================

    $('#customFile').change((e)=>{
        let filename = $(e.target).val();
        filename = filename.substring(filename.lastIndexOf("\\") + 1, filename.length);
        $(e.target).next('.custom-file-label').html(filename);
    });

// =================================== scroll to top button ====================================
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.scrollTop').fadeIn();
        } else {
            $('.scrollTop').fadeOut();
        }
    });
    $('.scrollTop').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 400);
        return false;
    });

// ================================== View of Items in Catalog =================================

    function displayItems(){
        let sideBarActive = window.localStorage.getItem('sidebar');
        let viewItems = window.localStorage.getItem('view');
        if(sideBarActive === 'true') {
            $('.custom-switch input').attr('checked', true);
            $('.left-bar').removeClass('collapsed');
        } else {
            $('.custom-switch input').attr('checked', false);
            $('.left-bar').addClass('collapsed');
            $('.left-bar .collapsible').removeClass('show');
            $('.accordion-card').removeClass('active');
        }

        $('.view').removeClass('active');

        if(viewItems === 'list'){
            $('.catalog-items').addClass('list-view');
            $('[data-view = list]').addClass('active');
        } else {
            $('.catalog-items').removeClass('list-view');
            $('[data-view = tile]').addClass('active');
        }

        if(window.innerWidth <= 768) {
            $('.custom-tile').css('display', 'none');
            $('.catalog-items').removeClass('list-view');
        }
    }

    displayItems();

    $('.view').click((e) => {
        if($(e.target).closest('div').hasClass('active')) {
            return false;
        }
        let viewItem = $(e.target).closest('div');
        let viewType = viewItem.data('view');
        $('.view').removeClass('active');
        viewItem.addClass('active');
        if(viewType === 'list'){
            $('.catalog-items').animate({'opacity': 0}, 200, function(){
                $('.catalog-items').addClass('list-view');
            });
            $('.catalog-items').animate({'opacity': 1}, 200);
            window.localStorage.setItem('view', 'list');
        } else {
            $('.catalog-items').animate({'opacity': 0}, 200, function(){
                $('.catalog-items').removeClass('list-view');
            });
            $('.catalog-items').animate({'opacity': 1}, 200);
            window.localStorage.setItem('view', 'tile');
        }
    });

// ========================================== YMaps ============================================

    ymaps.ready(init);
    function init(){
        let myMap = new ymaps.Map("ymapsContainer", {
            center: [55.76, 37.64],
            zoom: 1,
            controls: []
        });

        if($('#ymapsContacts').length){
            let contactsMap = new ymaps.Map("ymapsContacts", {
                center: [55.76, 37.64],
                zoom: 11,
                controls: []
            });
            contactsMap.behaviors.disable('scrollZoom');

            if($('.addr-link').length){
                $('.addr-link').click((e) => {
                    e.preventDefault();
                    var addr = $(e.target).data('address');
                    console.log(addr);
                    ymaps.geocode(addr, {
                        results: 1
                    }).then(function(res){
                        let firstObj = res.geoObjects.get(0),
                            coordinates = firstObj.geometry.getCoordinates(),
                            bounds = firstObj.properties.get('boundedBy');
                        firstObj.options.set('preset', 'islands#darkBlueDotIconWithCaption');
                        firstObj.properties.set('iconCaption', firstObj.getAddressLine());
                        contactsMap.geoObjects.add(firstObj);
                        // Масштабируем карту на область видимости геообъекта.
                        contactsMap.setBounds(bounds, {
                            // Проверяем наличие тайлов на данном масштабе.
                            checkZoomRange: true
                        });
                    });
                });

            }
        }

        if($('#modalMap').length){
            console.log('modal map container exists');
            let modalMap = new ymaps.Map("modalMap", {
                center: [55.76, 37.64],
                zoom: 11,
                controls: []
            });
            var addr = ['хамовники', 'арбат', 'электросталь'];
            console.log(addr);

            ymaps.geocode(addr, {
                results: 1
            }).then(function(res){
                let firstObj = res.geoObjects.get(0),
                    coordinates = firstObj.geometry.getCoordinates(),
                    bounds = firstObj.properties.get('boundedBy');
                firstObj.options.set('preset', 'islands#darkBlueDotIconWithCaption');
                firstObj.properties.set('iconCaption', firstObj.getAddressLine());
                modalMap.geoObjects.add(firstObj);
                // Масштабируем карту на область видимости геообъекта.
                modalMap.setBounds(bounds, {
                    // Проверяем наличие тайлов на данном масштабе.
                    checkZoomRange: true
                });
            });
        }

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

            result.via = [];

            if(data[2].value !== "") {
                result.via = data[2].value.split(";");
            }
            return result;
        }

        function setPoints(data){

            let points = [];

            let viaPointsIndexes = [];

            if(data.res === 'success'){
                points.push(data.from);

                if(data.via.length){
                    $.each(data.via, (el, idx)=>{
                        if(idx !== ""){
                            points.push(idx);
                        } else {
                            return;
                        }
                    })
                }

                points.push(data.to);

                $.each(points, (idx, elt)=>{
                    if (idx === 0 || idx === points.length-1){
                        return;
                    } else {
                        viaPointsIndexes.push(idx);
                    }
                });

            } else {
                result.res = 'error';
                $('.preloader').fadeOut();
                $('#'+data.item+'Help').text('Ошибка');
                $('#via').text('Добавтье все промежуточные пункты через точку с запятой');
                return result;
            }
            //return points;
            let result = {};
            result.res = 'success';
            result.points = points;
            result.viaIndexes = viaPointsIndexes;
            return result;
        }

        $('#ymapsForm').submit((e)=>{
            $('.preloader').fadeIn();
            e.preventDefault();

            let data = setData($(e.target).serializeArray());
            let points = setPoints(data);
            if (points.res === 'success'){

                route.model.setParams({
                    viaIndexes: points.viaIndexes
                });

                route.model.setReferencePoints(points.points);

                ymaps.route(points.points)
                    .done((router)=>{
                        $('#distance').text(Math.round(router.getLength()/1000) + " км");
                        console.log(router.getHumanLength()); // длина маршрута
                        //console.log(route.getHumanTime()); // сколько примерно повремени
                        $('.preloader').css('display', 'none');
                    }, (err)=>{
                        $('.preloader').css('display', 'none');
                        $('#ymapsForm')[0].reset();
                        console.log(err);
                    });
            } else {
                console.log(points.res);
            }
        });
    }

    // =============================== Contacts Page Maps ======================================


// ======================================== Calculator =========================================
    let closeCalc = ()=>{

        $('#calculator').removeClass('calc-show');
        $('.screen').fadeOut();
        $('#calculator, .filters, #faq #question').find('.active').removeClass('active');
    };

    $('.rightBtn').click((e)=>{
        if(!$('#calculator').hasClass('calc-show')) {
            $('#calculator').addClass('calc-show');
            $('.screen').fadeIn();
        } else {
            return true;
        }
    });
    $('.close-btn').click(closeCalc);

    $('.screen').click(closeCalc);

// ====================================== Feedback-form ========================================

    $('.form-wrap form').submit((e) => {
        $('.form-wrap, .backside').toggleClass('flipped');
        e.preventDefault();
    });

// ========================================= Switcher ==========================================

    $('.custom-switch input').click((e) => {
        console.log(e.target.checked);
        if(e.target.checked) {
            $('.left-bar').removeClass('collapsed');
        } else {
            $('.left-bar').addClass('collapsed');
            $('.left-bar .collapsible').removeClass('show');
            $('.accordion-card').removeClass('active');
        }
        window.localStorage.setItem('sidebar', e.target.checked);
    });

// ======================================== Accordion ==========================================
    //$('.accordion-card').click(function(e){
        //$(this).find('.collapsible').collapse('toggle');
        //$(this).toggleClass('active');
    //});

// ====================================== Slick sliders ========================================

    let slickCarousel = {
        useTransform: true,
        infinite: true,
        arrows: true,
        dots: false,
        autoplay: true,
        slidesToShow: 1,
        cssEase: "ease-out",
        appendArrows: $('#slickArrowsCarousel'),
        prevArrow: $('#slickArrowsCarousel .prev'),
        nextArrow: $('#slickArrowsCarousel .next')
    };

    let slickSolutions = {
        infinite: false,
        arrows: true,
        dots: false,
        autoplay: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        appendArrows: $('#slickArrowsSolutions'),
        prevArrow: $('#slickArrowsSolutions .prev'),
        nextArrow: $('#slickArrowsSolutions .next'),
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
        prevArrow: '<button class="slick-arrow prev"><i class="fas fa-chevron-left"></i></button>',
        nextArrow: '<button class="slick-arrow next"><i class="fas fa-chevron-right"></i></button>',
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
        prevArrow: $('#arrowsNews .prev'),
        nextArrow: $('#arrowsNews .next'),
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
        prevArrow: $('#arrowsArticles .prev'),
        nextArrow: $('#arrowsArticles .next'),
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
        prevArrow: $('#arrowsPartners .prev'),
        nextArrow: $('#arrowsPartners .next'),
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
        prevArrow: $('#arrowsHistory .prev'),
        nextArrow: $('#arrowsHistory .next'),
        responsive: [{
            breakpoint: '768',
            settings: {
                arrows: false,
                dots: true,
                slidesToShow: 1
            }
        }]
    };

    let slickRelated = {
        infinite: false,
        arrows: true,
        dots: false,
        autoplay: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        appendArrows: $('#arrowsRelated'),
        prevArrow: $('#arrowsRelated .prev'),
        nextArrow: $('#arrowsRelated .next'),
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
    $('.slick-related').slick(slickRelated)

});