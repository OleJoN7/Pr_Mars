$(document).ready(function () {
    $('.slider').slick({
        infinity: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        loop:true,
        autoplay: true,
        autoplaySpeed: 10000,
        vertical: true,
        arrows: false,
        mobileFirst: true
    });

    $(".scroll").click(function () {
        $('html,body').animate({
            scrollTop: $(".fly-section").offset().top
        }, 1000);
    });

    $('.fly-higher').hover(function () {
        $('.hover-block').animate({
            width: "100%"
        }, 1000);
        $('.rotate-view-btn').css({
            "transform": "rotate(0) translateX(50%)",
            'transition': '1s'
        }).text("VIEW LESS")
    }, function () {
        $('.hover-block').animate({
            width: "56%"
        }, 1000);
        $('.rotate-view-btn').css({
            "transform": "rotate(270deg) translateY(140%)",
            'transition': '1s'
        }).text("VIEW MORE");
    });

    $('.show-btn').on('click', function () {
        var indexItem = $('.show-btn').index(this);
        $(this).siblings('p').toggleClass('decrease');
        $('.hidden-block').eq(indexItem).fadeToggle(1000);
    })
    $('.show-btn').on('click', function () {
        $(this).siblings('h3').toggleClass('decrease');
    })

});