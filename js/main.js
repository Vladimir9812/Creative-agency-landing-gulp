$(function() {
    function CurcleBar(id) {
        let bar = new ProgressBar.Circle(id, {
            color: '81868e',
            strokeWidth: 3,
            trailWidth: 1,
            easing: 'easeInOut',
            duration: 2000,
          
            from: { color: '#19bd9a', width: 2 },
            to: { color: '#19bd9a', width: 3 },
      
            step: function(state, circle) {
              circle.path.setAttribute('stroke', state.color);
              circle.path.setAttribute('stroke-width', state.width);
          
              let value = Math.round(circle.value() * 100);
              if (value === 0) {
                circle.setText('0%');
              } else {
                circle.setText(value + "%");
              }
            }
          });
          bar.text.style.fontFamily = 'OpenSans';
          bar.text.style.fontSize = '1.7rem';
      
          return bar;
    }
    function LineBar(id) {
        return bar = new ProgressBar.Line(id, {
            easing: 'easeInOut',
            duration: 1800,
            color: '#19bd9a',
            trailColor: '#eee',
            svgStyle: {width: '100%', height: '100%'},
            text: {
              style: {
                color: '#999',
                position: 'absolute',
                right: '0',
                top: '-15px',
                padding: 0,
                margin: 0,
                transform: null
              },
            },
            step: (state, bar) => {
              bar.setText(Math.round(bar.value() * 100) + ' %');
            }
        });
    }
    function ScrollTop(winScroll) {
        let headerH = $('.header').innerHeight();
        winScroll > headerH ? $('.header').addClass('fixed') : $('.header').removeClass('fixed');
    }

    // слайдер
    $('.team__inner').slick({
        dots: true, 
        arrows: false, 
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 3000
    });
    $('.review__inner').slick({
        dots: true, 
        arrows: false, 
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 3000
    });
   
    // процентные кольца
    let brand = CurcleBar(branding),
        web = CurcleBar(web_d),
        ui = CurcleBar(UI),
        lineBrand = LineBar(lineOne),
        lineWeb = LineBar(lineTwo),
        lineUser = LineBar(lineThree),
        lineBrand_2 = LineBar(lineOne_2),
        lineWeb_2 = LineBar(lineTwo_2),
        lineUser_2 = LineBar(lineThree_2),
        lineBrand_3 = LineBar(lineOne_3),
        lineWeb_3 = LineBar(lineTwo_3),
        lineUser_3 = LineBar(lineThree_3)
        
    // анимация процентов
    $(".section--service").mouseenter(function() {
        brand.animate(0.8);
        web.animate(0.7);
        ui.animate(0.75);
    })
    $(".section--team").mouseenter(function() {
        lineBrand.animate(0.8);
        lineWeb.animate(0.65);
        lineUser.animate(0.75);
        lineBrand_2.animate(0.65);
        lineWeb_2.animate(0.8);
        lineUser_2.animate(0.9);
        lineBrand_3.animate(0.85);
        lineWeb_3.animate(0.60);
        lineUser_3.animate(0.75);
    })

   // плавный скролл
    $('[data-scroll]').on('click', function(event) {
        event.preventDefault();
        
        $('#nav a').removeClass("active");
        $(this).addClass("active");
        
        let blockId = $(this).data('scroll');
        let blockScroll = $(blockId).offset().top;
        $("html, body").animate({
            scrollTop: blockScroll
        },1000);
    });

    // стрелка на главном экране
    $('.main__arrow').on('click', function() {
        event.preventDefault();

        let mainHeight = $('.main').innerHeight();
        
        $("html, body").animate({
            scrollTop: mainHeight
        },1000);
    });

    // иконки инструментов
    $('[data-curcle]').on('click', function(event) {
        event.preventDefault();
        
        let contentId = $(this).data('curcle');

        ['heard','mouse','lamp'].indexOf(contentId) === -1 ? $('.curcle--service').removeClass('active') : 
        $('.curcle--details').removeClass('active');

        $(this).addClass('active');

        ['heard','mouse','lamp'].indexOf(contentId) === -1 ? $('.service__content').addClass('close') : 
        $('.details__content').addClass('close');

        $("#"+contentId).removeClass('close');
    });

    // работы портфолио
    $('[data-work]').on('click', function(event) {
        event.preventDefault();

        const works = {
            col1: ["work","identity","brand"],
            col2: ["work","print","brand"],
            col3: ["work","print","brand","identity"],
            col4: ["work","brand","web"]
        }
        $(".works__item").css('display','none');

        $(".portfolio__link").removeClass('active');
        $(this).addClass('active');

        let workId = $(this).data('work');
        $(".work").addClass('close');

        for (item in works) {
            if (works[item].indexOf(workId)!==-1) $("."+item).css('display','block');
        }

        $("."+workId).removeClass('close');
    });

    //анимация цены
    $('.price__item').mouseenter(function() {

        let priceId = $(this).data('price');
        $('#' + priceId + 'Head').text('Let’s Start');
        $('#' + priceId + 'Content').hide();
        $('#' + priceId + 'Hover').show();
    })
    $('.price__item').mouseleave(function() {
        let PriceName = {
            priceOne: "Premium",
            priceTwo: "Gold",
            priceThree: "Exclusive"
        }
        let priceId = $(this).data('price');
        $('#' + priceId + 'Head').text(PriceName[priceId]);
        $('#' + priceId + 'Content').show();
        $('#' + priceId + 'Hover').hide();
    })
    
    //меню
    $('.nav__toggle').on('click',function(event){
        event.preventDefault();

        $(this).toggleClass('active');
        $('.nav').toggleClass('active');
        $('.header').toggleClass('active');
    })

    //header fixed + бегающая навигация
    let services = $('#service').offset().top,
        portfolio = $('#portfolio').offset().top,
        team = $('#team').offset().top,
        blog = $('#blog').offset().top,
        contact = $('#contact').offset().top;

    $(window).on('scroll',function() {
        event.preventDefault();

        let windowH = $(this).scrollTop();
        ScrollTop(windowH);

        if (windowH < services) {
            $('#nav a').removeClass('active');
            $('[data-scroll = "#about"]').addClass('active'); 
        } else if (windowH >= services  && windowH <= portfolio) {
            $('#nav a').removeClass('active');
            $('[data-scroll = "#service"]').addClass('active');
        }  else if (windowH > portfolio && windowH <= team) {
            $('#nav a').removeClass('active');
            $('[data-scroll = "#portfolio"]').addClass('active');
        }  else if (windowH > team && windowH <= blog) {
            $('#nav a').removeClass('active');
            $('[data-scroll = "#team"]').addClass('active');
        }  else if (windowH > blog && windowH <= contact) {
            $('#nav a').removeClass('active');
            $('[data-scroll = "#blog"]').addClass('active');
        }  else {
            $('#nav a').removeClass('active');
            $('[data-scroll = "#contact"]').addClass('active');
        }
        
    })     

})
