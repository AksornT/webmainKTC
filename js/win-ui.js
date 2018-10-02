$(document).ready(function() {

    //disable auto complete
    $('input, form').attr('autocomplete', 'false');

    $('#menu-global').addClass('mini-header alway-mini');
    $('#menu-global.expand-menu').removeClass('mini-header alway-mini');
	$('.footer-menu h3').on('click touch', function () {
        $('.footer-menu h3').not(this).each(function(){
	        $(this).removeClass('active');
	    });
        $(this).toggleClass('active');
    });

    $(".to-top").on('click touch', function () {
      $("html, body").animate({ scrollTop: 0 }, "slow");
      return false;
    });

    //search-category selected
    $(".subcat + label").on('click touch', function () {
      $("#all-cat").prop('checked', false).checkboxradio('refresh');
    });
    $("#all-cat + label").on('click touch', function () {
      $(".subcat").prop('checked', false).checkboxradio('refresh');
    });

    //flexi page nav
    var navScrollTo = function(elementId, offset) {
        offset = offset == null ? 0 : offset;
        $('html, body').animate({
            scrollTop: $(elementId).offset().top - offset
        }, 800);
    };
    $("body").scrollspy({target: "#nav-flexi-navbar", offset: 180});
    $('body').on('activate.bs.scrollspy', function (event) {
        //sync scrollspy to other menu
        var currentSection = event.target.firstElementChild.hash;
        $("#nav-flexi-modal li.nav-item").each(function(i, el) {
            var $el = $(el);
            if (el.firstElementChild.hash === currentSection) {
                $el.addClass("active");
            } else {
                $el.removeClass("active");
            }
            console.log(el.firstElementChild.hash, currentSection);
        });
    });
    $("#nav-flexi a.nav-link").on('click touch', function (event) {
        event.preventDefault();
        var hash = this.hash;
        if (hash.length > 0) {
            navScrollTo(hash, 150);
        }
    });

    $("#nav-flexi-mobile a.nav-link, #nav-flexi-modal .nav a.nav-link").each(function (index, elem) {
        elem.addEventListener('touchend', function (event) {
            event.preventDefault();
            var hash = this.hash;
            if (hash.length > 0) {
                navScrollTo(hash, 100);
            }
            $("#nav-flexi-modal").modal("hide");
        }, {passive: false})
    });

    $('#nav-flexi .sticky-right .card-register-center').on('click touch', function (event) {
        event.preventDefault();
        var hash = this.hash;
        if (hash.length > 0) {
            navScrollTo(hash, 170);
        }
    });

    $('#nav-flexi-mobile a.card-register-center').on('click touch', function (event) {
        event.preventDefault();
        var hash = this.hash;
        if (hash.length > 0) {
            navScrollTo(hash, 120);
        }
    });

    //global sub-nav sticky bar
    $('.sub-sticky a[href^="#"]').each(function (index, elem) {
        var touchHandler = function (event) {
            event.preventDefault();
            var hash = this.hash;
            var topOffset = $('#menu-global').innerHeight() + $('.sub-sticky').innerHeight();
            if (hash !== "#" && hash.length > 0) {
                navScrollTo(hash, topOffset);
            }
        };
        elem.addEventListener('click', touchHandler);
        elem.addEventListener('touchend', touchHandler, {passive: false});
    });



    

    //Sticky page nav
    var stickyNavScrollTo = function(elementId, offset) {
        offset = offset == null ? 0 : offset;
        $('html, body').animate({
            scrollTop: $(elementId).offset().top - offset
        }, 800);
    };

    $("body").scrollspy({target: ".sub-sticky", offset: 180});

    $('body').on('activate.bs.scrollspy', function (event) {
        //sync scrollspy to other menu
        var currentSection = event.target.firstElementChild.hash;
        $("#sticky-modal li a").each(function(i, el) {
            var $el = $(el);
            if (el.firstElementChild.hash === currentSection) {
                $el.addClass("active");
            } else {
                $el.removeClass("active");
            }
            console.log(els.firstElementChild.hash, currentSection);
        });
    });

    $("#sticky-modal a").each(function (index, elem) {
        elem.addEventListener('touchend', function (event) {
            event.preventDefault();
            var hash = this.hash;
            flexiNavScrollTo(hash, 100);
            $("#sticky-modal").modal("hide");
        }, {passive: false})
    });

    //for styling form
    function stylinginputFunction() {
    $('.form-wrap input[type="text"], .form-wrap input[type="password"]').each(function(){
      var fLabel = $(this).attr('placeholder');
      $(this).after( '<label>' + fLabel + '</label>' );
      $(this).change(function(){
        if ($(this).val().length == 0){
            $(this).removeClass("hasText");
        } else {
            $(this).addClass("hasText");
        }
      });
     });
    }
    stylinginputFunction();
    $('.form-wrap input[type="text"], .form-wrap input[type="password"]').each(function(){
        if ($(this).val().length == 0){
            $(this).removeClass("hasText");
        } else {
            $(this).addClass("hasText");
        }
     });

    //can submit only when all input are filled

    $('.form-wrap button[type="submit"]').prop('disabled', true);
    
    var toValidate = jQuery('.form-wrap input[type="text"].required, .form-wrap input[type="password"].required');
    var theValidate = jQuery('.form-wrap input[type="checkbox"].required');
    valid = false;
    valid2 = true;
    valid3 = true;
    if ($('.form-wrap input[type="checkbox"]').hasClass('required')){
        valid2 = false;
    }

    theValidate.on('touch click', function () {
        if ($(this).prop('checked') == true) {
            jQuery(this).data('valid2', true);
            console.log("checked");
        } else {
            jQuery(this).data('valid2', false);
            console.log("notChecked");
        }
        theValidate.each(function () {
            if (jQuery(this).data('valid2') == true) {
                valid2 = true;
            } else {
                valid2 = false;
            }
        });
        if (valid === true && valid2 === true && valid3 === true) {
            jQuery('.form-wrap button[type="submit"]').prop('disabled', false);
        } else {
            jQuery('.form-wrap button[type="submit"]').prop('disabled', true);
        }

        console.log("valid =" + valid);
        console.log("valid2 =" + valid2);
        console.log("valid3 =" + valid3);
    });
    toValidate.on('keyup', function () {
        if ($(this).val().length > 0) {
            $(this).data('valid', true);
            console.log("filled");
        } else{
            $(this).data('valid', false);
            console.log("notFilled");
        }
        toValidate.each(function () {
            if ($(this).data('valid') == true) {
                valid = true;
            } else {
                valid = false;
            }
        });
        if (valid === true && valid2  === true && valid3 === true) {
            jQuery('.form-wrap button[type="submit"]').prop('disabled', false);
        } else {
            jQuery('.form-wrap button[type="submit"]').prop('disabled', true);
        }

        console.log("valid =" + valid);
        console.log("valid2 =" + valid2);
        console.log("valid3 =" + valid3);
    });

    $('#myCheck').on('touch click', function () {
        $('#email').toggle();
        if ($("#email input").hasClass("required")) {
            $('#email input').removeClass('required');
            valid3 = true;
        } else {
            $('#email input').addClass('required');
            valid3 = false;
        }
        $('#email .required').val("");
        if (valid === true && valid2  === true && valid3 === true) {
            jQuery('.form-wrap button[type="submit"]').prop('disabled', false);
        } else {
            jQuery('.form-wrap button[type="submit"]').prop('disabled', true);
        }

        console.log("valid =" + valid);
        console.log("valid2 =" + valid2);
        console.log("valid3 =" + valid3);
    });

    $('#email input').on('keyup', function () {
        if (jQuery(this).val().length > 0) {
            valid3 = true;
            console.log("filled");
        } else{
            valid3 = false;
            console.log("notFilled");
        }
        if (valid === true && valid2  === true && valid3 === true) {
            jQuery('.form-wrap button[type="submit"]').prop('disabled', false);
        } else {
            jQuery('.form-wrap button[type="submit"]').prop('disabled', true);
        }

        console.log("valid =" + valid);
        console.log("valid2 =" + valid2);
        console.log("valid3 =" + valid3);
    });


    //styling select dropdown
    $('.form-wrap select').each(function(){
        $(this).after( '<span class="select-arrow"></span>' );
    });

    //switch page when register
    $('#regis-mem').on('click touch', function () {
      $("#pg-regis").attr("action", "register-member-2.html");
    });

    $('#regis-mer').on('click touch', function () {
      $("#pg-regis").attr("action", "register-merchant-2.html");
    });

    $('#forgot-pass').on('click touch', function () {
      $("#pg-regis").attr("action", "forgot-password-2.html");
     });

     $('#forgot-user').on('click touch', function () {
      $("#pg-regis").attr("action", "forgot-username-2.html");
    });

    $('#forgot-pass-mer').on('click touch', function () {
      $("#pg-regis").attr("action", "forgot-password-2.1.html");
    });

    $('#forgot-user-mer').on('click touch', function () {
      $("#pg-regis").attr("action", "forgot-username-2.1.html");
    });


   
        


    //for switch language
    $(".lang-wrap").on('click touch', function () {
      $(".lang-wrap").toggleClass('active');
    });

    //for favorite and share button
    $(".fav-btn, .share-btn").on('click touch', function () {
      $(this).toggleClass('active');
      return false;
    });

    $('body').on('click touch', function () {
      $('.share-btn').removeClass('active');
    });

    /* FILTER FORM */
    $('#filter-modal input').change(function(){
        var hasChecked = false;
        var checkedAll = true;
        $('#filter-modal').find('input').each(function(){
            if($(this).prop('checked')){
                hasChecked=true;
            }
            else{
                checkedAll=false;
            }
        });
        if(checkedAll){
            $('#filter-modal').find('.select-all-btn').attr('disabled', 'disabled');
        }
        else{
            $('#filter-modal').find('.select-all-btn').removeAttr('disabled');
        }
        if(hasChecked){
            $('#filter-modal').find('.submit-filter-btn').removeAttr('disabled');
            $('#filter-modal').find('.reset-btn').removeAttr('disabled');
        }
        else{
            $('#filter-modal').find('.submit-filter-btn').attr('disabled','disabled');
            $('#filter-modal').find('.reset-btn').attr('disabled', 'disabled');
        }
    });

    $('#filter-modal .select-all-btn').click(function(e){
        e.preventDefault();
        e.stopPropagation();
        $('#filter-modal').find('input').prop('checked', true).trigger('change');
    });

    $('#filter-modal .reset-btn').click(function(e){
        e.preventDefault();
        e.stopPropagation();
        $('#filter-modal').find('input').prop('checked', false).trigger('change');
    });

    $('.form-check-required input').change(function(){
        //Check if all required input has filled
        var filledAll = true;
        var form = $(this).parents('form');
        form.find('.required').each(function(){
            if($(this).is(':checkbox')){
                if(!$(this).prop('checked')){
                    filledAll = false;
                }
            }
            else{
                if($(this).val().length <= 0){
                    filledAll = false;
                }
            }
        });
        if(filledAll) {
            form.find('.btn-submit-form').removeClass('disabled');
        }
        else {
            form.find('.btn-submit-form').addClass('disabled');
        }
    });

    $('.form-check-required input').keyup(function(){
        $(this).trigger('change');
    });


    //for sort list in promotion
    var sortList = 0;
    $('#edit-my-link-modal .all-type-list').on('click touch', function (){
        if(sortList <= 3) {
            if ($(this).hasClass('active')) {
                $('.all-type-list').removeClass( "active" );
                sortList = 0;
                $('.list-number').text('');
                $('.submit-btn').prop("disabled", true);
                return false;
            } else {
                sortList = sortList + 1;
                $(this).addClass( "active" );
                $(this).find('.list-number').text(sortList);
                console.log(sortList);
                if(sortList >= 1) {
                    $('.submit-btn').prop("disabled", false);
                } else {
                    $('.submit-btn').prop("disabled", true);
                }
                return false;
            }
        } else {
            if ($(this).hasClass('active')) {
                $('.all-type-list').removeClass( "active" );
                sortList = 0;
                $('.list-number').text('');
                $('.submit-btn').prop("disabled", true);
                return false;
            }
        }
    });

    //for choose credit card to compare
    var cards = 0;
    $('.chooseThis').on('click touch', function (){
        if(cards <= 2) {
            if ($(this).parent().parent().parent().parent().hasClass('active')) {
                return false;
            } else {
                cards = cards + 1;
                $(this).parent().parent().parent().parent().addClass( "active" ).addClass("choice-" + cards);
                var creditImage = $(this).parent().parent().parent().parent().find('img').attr('src');
                var creditText = $(this).parent().parent().parent().find('.credit-title').text();
                $(".compared-box > div:nth-child("+cards+") img").attr('src', creditImage).addClass('gotImage');
                $(".compared-box > div:nth-child("+cards+") img + p").text(creditText);
                $(".compared-box > div:nth-child("+cards+")").addClass("compare-item-" + cards);
                $('.click-compare').addClass('active');
                $('.main-credit').addClass('addTop');
                if(cards >= 2) {
                    $('.go-compare').prop("disabled", false);
                } else {
                    $('.go-compare').prop("disabled", true);
                }
                console.log(cards);
                return false;
            }
        } else {
            console.log(cards);
            return false;
        }
        
        compareFunction();
    
    });

    function compareFunction() {

        $('.box-compare-credit:nth-child(1) p + span').bind('click touch', function (event){
            $(this).parent().remove();
            $('.choice-1').removeClass('active').removeClass('choice-1');
            $('.choice-2').removeClass('choice-2').addClass('choice-1');
            $('.box-compare-credit:nth-child(1)').removeClass('compare-item-2').addClass('compare-item-1');
            $('.choice-3').removeClass('choice-3').addClass('choice-2');
            $('.box-compare-credit:nth-child(2)').removeClass('compare-item-3').addClass('compare-item-2');
            $('.compared-box').append('<div class="col-6 col-sm-6 col-lg-4 text-center box-compare-credit"><img src="img/img-dis-compare.png"><p></p><span>+</span></div>')
            cards = cards - 1;
            if(cards == 1) {
                $('.go-compare').prop("disabled", true);
            }
            if(cards == 0 ) {
                $('.click-compare').removeClass('active');
                $('.main-credit').removeClass('addTop');
            }
            
            console.log(cards);
            $( '.box-compare-credit p + span' ).unbind();
            compareFunction();
            return false;
        });

        $('.box-compare-credit:nth-child(2) p + span').bind('click touch', function (event){
            $(this).parent().remove();
            $('.choice-2').removeClass('active').removeClass('choice-2');
            $('.choice-3').removeClass('choice-3').addClass('choice-2');
            $('.box-compare-credit:nth-child(2)').removeClass('compare-item-3').addClass('compare-item-2');
            $('.compared-box').append('<div class="col-6 col-sm-6 col-lg-4 text-center box-compare-credit"><img src="img/img-dis-compare.png"><p></p><span>+</span></div>')
            cards = cards - 1;
            if(cards == 1) {
                $('.go-compare').prop("disabled", true);
            }
            if(cards == 0) {
                $('.click-compare').removeClass('active');
                $('.main-credit').removeClass('addTop');
            }
            console.log(cards);
            $( '.box-compare-credit p + span' ).unbind();
            compareFunction();
            return false;
        });



        $('.box-compare-credit:nth-child(3) p + span').bind('click touch', function (event){
            $(this).parent().remove();
            $('.choice-3').removeClass('active').removeClass('choice-3');
            $('.compared-box').append('<div class="col-6 col-sm-6 col-lg-4 text-center box-compare-credit"><img src="img/img-dis-compare.png"><p></p><span>+</span></div>');
            cards = cards - 1;
            if(cards == 1) {
                $('.go-compare').prop("disabled", true);
            }
            if(cards == 0) {
                $('.click-compare').removeClass('active');
                $('.main-credit').removeClass('addTop');
            }
            console.log(cards);
            $( '.box-compare-credit p + span' ).unbind();
            compareFunction();
            return false;
        });
    }

    compareFunction();

    $('.click-compare .btn-cancel').on('click touch', function () {
        cards = 0;
        $('.click-compare').removeClass('active');
        $('.go-compare').prop("disabled", true);
        $('.compare-active').removeClass('active choice-1 choice-2 choice-3');
        $('.box-compare-credit').each(function(){
            $(this).remove();
        });
        $('.compared-box').append('<div class="col-6 col-sm-6 col-lg-4 text-center box-compare-credit"><img src="img/img-dis-compare.png"><p></p><span>+</span></div><div class="col-6 col-sm-6 col-lg-4 text-center box-compare-credit"><img src="img/img-dis-compare.png"><p></p><span>+</span></div><div class="col-6 col-sm-6 col-lg-4 text-center box-compare-credit"><img src="img/img-dis-compare.png"><p></p><span>+</span></div>');
        $('.main-credit').removeClass('addTop');
        console.log(cards);
        compareFunction();
        return false;
    });


    //for search
    $(".suggess-list").on('click touch', function () {
      $("#fake-result").empty();
      $(this).clone().appendTo( "#fake-result" );
      var searchtext = $(this).find("p").text();
      $( "#search" ).val( searchtext );
      $("#suggest-box").blur();
    });
    $("#search").on('click touch', function () {
      $("#fake-result").empty();
    });

    //for anchor
    $('a[data-scroll="scroll"]').on('click touch', function (event) {
        event.preventDefault();
        var hash = this.hash;
        var offset = $(this).attr('data-offset') | 0;
        navScrollTo(hash, offset);
    });
    $('a[href="#"]').on('click touch', function (event) {
        event.preventDefault();
    });

    //discard credit cards in compare table
    $('.campare-table th .compare-cancel').on('click touch', function (event) {
        var indexZ = $(this).parent().parent().index();
        $(this).parent().parent().remove();
        $('.campare-table tbody tr').each(function(){
          $(this).find('td').eq( indexZ ).remove();
        });
    });

    $('.form-content .input-ico input[type=file]').change(function() {
        var filename = $(this).val();
        $(this).next().val(filename).addClass('hasText');
    });

});

//change header when scroll down.
$(document).on('scroll', function() {
    if($(this).scrollTop()>=$('#head-trigger').position().top){
        $('#menu-global').addClass('mini-header');
        $('.ghost-footer').addClass('active');
    }else{
        $('#menu-global').removeClass('mini-header');
        $('#menu-global.expand-menu .scrolled-menu > li').removeClass('active');
        $('.ghost-footer').removeClass('active');
    };

    var stickyTrigger = $('#sticky-trigger');
    var isStickyTriggerExisted = stickyTrigger.length > 0;
    if(isStickyTriggerExisted &&
        $(this).scrollTop() >= stickyTrigger.position().top){
        $('.sub-sticky').addClass('active');
    }else{
        $('.sub-sticky').removeClass('active');
    }

//something appeared on footer

    if($(this).scrollTop()>=$('#foot-trigger').position().top){
        $('.ghost-footer').addClass('active-mobile');
    }else{
        $('.ghost-footer').removeClass('active-mobile');
    };


    //flexi navbar
    var navFlexiScrollTrigger = $('#nav-flexi-scroll-trigger');
    var navFlexiMobileScrollTrigger = $('#nav-flexi-mobile-scroll-trigger');
    if(navFlexiScrollTrigger.length > 0 && $(this).scrollTop() >= navFlexiScrollTrigger.offset().top) {
        $('#nav-flexi').addClass('fixed');
    } else {
        $('#nav-flexi').removeClass('fixed');
        $('#nav-flexi-navbar li.nav-item:first-child').addClass('active');
    }

    if(navFlexiMobileScrollTrigger.length > 0 && $(this).scrollTop() >= navFlexiMobileScrollTrigger.offset().top) {
        $('#nav-flexi-mobile .nav.mini').addClass('show');
    } else {
        $('#nav-flexi-mobile .nav.mini').removeClass('show');
        // $('#nav-flexi-mobile .nav.mini li.nav-item:first-child').addClass('active');
    }


    //for credit cards compared table
    if($(this).scrollTop()>= 84){
        $('.page-credit-compare').addClass('active-mobile');
    }else{
        $('.page-credit-compare').removeClass('active-mobile');
    };

    // for share button
    if($(this).scrollTop()>=$('.article-icon .share-btn').offset().top - 200){
        $('.share-popover').addClass('on-bottom');
    }else{
        $('.share-popover').removeClass('on-bottom');
    };



});

//for menu mobile


$(document).ready(function() {
	$('.menu-responsive-dropdown h3').on('click touch', function () {
        $('.menu-responsive-dropdown h3').not(this).each(function(){
	        $(this).removeClass('active');
	    });
        $(this).toggleClass('active');
    });

    $('body').on('click touch', function (e) {
        $('.scrolled-menu > li').removeClass('active');
        $('.login-btn.logged-in').removeClass('active');
    });
    $('.scrolled-menu > li').on('click touch', function (e) {
        e.stopPropagation();
        $('.scrolled-menu > li').not(this).each(function(){
            $(this).removeClass('active');
        });
        $(this).toggleClass('active');
        $('.login-btn.logged-in').removeClass('active');
    });
    $('.login-btn.logged-in').on('click touch', function (e) {
        e.stopPropagation();
        $(this).toggleClass('active');
        $('.scrolled-menu > li').removeClass('active');
    });

    $('.menu-mobile.only-mobile').on('click touch', function () {
        $('#scrolled-menu-responsive').addClass('active');
    });
    $('.menu-resp-close').on('click touch', function () {
        $('#scrolled-menu-responsive').removeClass('active');
    });

});

//for chackbox
function myFunction() {
  // Get the checkbox
  var checkBox = document.getElementById("myCheck");
  // Get the output text
  var text = document.getElementById("email");

  // If the checkbox is checked, display the output text
  if (checkBox.checked == true){
    text.style.display = "block";
  } else {
    text.style.display = "none";
  }
}

//for compare credit
function myFunction() {
    var x = document.getElementById("myCompare");
    if (x.style.display == "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}




function show1(){
  document.getElementById('type2').style.display ='none';
  document.getElementById('type1').style.display ='block';
}
function show2(){
  document.getElementById('type2').style.display ='block';
  document.getElementById('type1').style.display ='none';
}



$(document).ready(function() {

      var idcardSelected = document.getElementById("idcardSelected");
      var idcard = document.getElementById("idcard");
      // Input Passpord
      var passpord= document.getElementById("passpord");


      $('#exampleFormControlSelect1').change(function(){
      // If the checkbox is checked, display the output text
          if ($(this).val() == "idcard"){
                $(idcard).show();
                $(passpord).hide();
                console.log('id');
          } else {
                $(idcard).hide();
                $(passpord).show();
                console.log('passport');
          }
      });


});






