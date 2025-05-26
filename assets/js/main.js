"use strict";

$(document).ready(function () {
    var visualSwiper = new Swiper(".swiper-visual", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 0,
    observer: true,
    effect: "fade",
    observerParents: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".ms1 .swiper-navigation .swiper-pagination",
        type: "fraction",
        },
    navigation: {
        nextEl: ".ms1 .swiper-button-next",
        prevEl: ".ms1 .swiper-button-prev",
    },
    });

    var newsSwiper = new Swiper(".swiper-news", {
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        slidesPerView: 2.05,
        spaceBetween: -150,
        breakpoints: {
            992: {
                slidesPerView: 6.15,
                spaceBetween: -50,
            }
        },
        pagination: {
        el: ".ms2 .swiper-pagination",
        type: "fraction",
        },
        navigation: {
        nextEl: ".ms2 .swiper-button-next",
        prevEl: ".ms2 .swiper-button-prev",
        },
    });

  $(".btn-swiper-play").on("click", function (e) {
    var $t = $(this),
        $tg = $(this).data('target');

        $t.toggleClass("on");
      console.log($tg);

      switch ($tg) {
        case 'swiper-news':
            setTimeout(() => {
                if ($(this).hasClass('on') ) {
                    newsSwiper.autoplay.stop() ;
                    console.log('멈춤')
                } else {
                    newsSwiper.autoplay.start() ;
                    console.log('재생')
                }
            }, 100);
        break;
        case 'swiper-visual':
            setTimeout(() => {
                if ($(this).hasClass('on') ) {
                    VisualSwiper.autoplay.stop() ;
                } else {
                    VisualSwiper.autoplay.start() ;
                }
            }, 100);
        break;
        default:
        break;
    }
    });
});
