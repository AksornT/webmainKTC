/* Core Media Application */
window.matchMedia || (window.matchMedia = function () {
    "use strict";

    var styleMedia = (window.styleMedia || window.media);
    if (!styleMedia) {
        var style = document.createElement('style'),
            script = document.getElementsByTagName('script')[0],
            info = null;

        style.type = 'text/css';
        style.id = 'matchmediajs-test';

        script.parentNode.insertBefore(style, script);
        info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;

        styleMedia = {
            matchMedium: function (media) {
                var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

                if (style.styleSheet) {
                    style.styleSheet.cssText = text;
                } else {
                    style.textContent = text;
                }

                return info.width === '1px';
            }
        };
    }

    return function (media) {
        return {
            matches: styleMedia.matchMedium(media || 'all'),
            media: media || 'all'
        };
    };
}());

(function () {
    if (window.matchMedia && window.matchMedia('all').addListener) {
        return false;
    }

    var localMatchMedia = window.matchMedia,
        hasMediaQueries = localMatchMedia('only all').matches,
        isListening = false,
        timeoutID = 0,
        queries = [],
        handleChange = function (evt) {
            clearTimeout(timeoutID);

            timeoutID = setTimeout(function () {
                for (var i = 0, il = queries.length; i < il; i++) {
                    var mql = queries[i].mql,
                        listeners = queries[i].listeners || [],
                        matches = localMatchMedia(mql.media).matches;

                    if (matches !== mql.matches) {
                        mql.matches = matches;

                        for (var j = 0, jl = listeners.length; j < jl; j++) {
                            listeners[j].call(window, mql);
                        }
                    }
                }
            }, 30);
        };

    window.matchMedia = function (media) {
        var mql = localMatchMedia(media),
            listeners = [],
            index = 0;

        mql.addListener = function (listener) {
            if (!hasMediaQueries) return;

            if (!isListening) {
                isListening = true;
                window.addEventListener('resize', handleChange, true);
            }
            if (index === 0) {
                index = queries.push({
                    mql: mql,
                    listeners: listeners
                });
            }

            listeners.push(listener);
        };
        mql.removeListener = function (listener) {
            for (var i = 0, il = listeners.length; i < il; i++) {
                if (listeners[i] === listener) {
                    listeners.splice(i, 1);
                }
            }
        };
        return mql;
    };
}());
/* Core Media Application - End */

var _isTouch = 'ontouchstart' in document.documentElement;
$(function () {

    var _ua = (navigator.userAgent || navigator.vendor || window.opera),
        _device = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

    $("body").addClass((_isTouch) ? "isTouch" : "no-touch");
    if (_device.test(_ua)) {
        $("body").addClass("device-mobile");
    } else {
        $('a[href^="tel:"]').removeAttr("href");
    }
});

var _pathScan = ['affinity', 'business', 'learn-earn', 'vacancies', 'co-brand', 'responsibility', 'supervision', 'contactless', 'paywave', 'generic', 'contact', 'debenturesinfo'];
var _localpath = location.pathname;
var found = false,
    _addDir = '';

// fx-num
$(function(){
$(".fx-num").forceNumber();
   $(_pathScan).each(function (index, value) {
        if (_localpath.indexOf(value) > 0) {
            found = true;
        }
    });
    
    if(found) _addDir = '../';
});

$(function () {
    //open/close mega-navigation
    $('.cd-dropdown-trigger').on('click', function (e) {
        e.preventDefault();
        toggleNav();
    });

    //close meganavigation
    $('.cd-dropdown .cd-close').on('click', function (e) {
        e.preventDefault();
        toggleNav();
    });

    function toggleNav() {
        var navIsVisible = (!$('.cd-dropdown').hasClass('dropdown-is-active')) ? true : false;
        $('.cd-dropdown').toggleClass('dropdown-is-active', navIsVisible);
        $('.cd-dropdown-trigger').toggleClass('dropdown-is-active', navIsVisible);
        $('.device-mobile').toggleClass('dropdown-noscroll', navIsVisible);
        if (!navIsVisible) {
            $('.cd-dropdown').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
                $('.move-out').removeClass('move-out');
                $('.is-active').removeClass('is-active');
            });
        }
    }
    
    function updateLabels(targetedClass) {
        $(arguments[0]).each(function () {
            var _parent = $(this).parent('label');
            $(this).is(':checked') ? _parent.addClass('selected') : '';
        });
    }
    updateLabels('.label-to-bold-if-checked');
});

// Terms Conditions
$(function () {
    if ($(".click-terms").length) {
        $(".click-terms").click(function (e) {
            e.preventDefault();
            $(".click-terms").toggleClass("active");
            $(".terms-content").slideToggle("300");
            $(".terms-content").toggleClass("active");
        });
        $(".click-toggle").click(function (e) {
            e.preventDefault();
            $(".click-toggle").toggleClass("active");
            $(".branches-content").slideToggle("300");
            $(".branches-content").toggleClass("active");
        });
    }
});


// OWL Slides
$(function () {
    var stagepaddingslides = $('.stagepadding-item'),
        fiveslides = $('.five-item'),
        fourslides = $('.four-item'),
        threeslides = $('.three-item'),
        banner = $('.banner-slider'),
        fourgrouping = $('.four-grouping'),
        twogrouping = $('.two-grouping'),
        threegrouping = $('.three-grouping');

    stagepaddingslides.each(function () {
        var _items = $(this).find(".item"),
            _max = _items.length;
        $(this).owlCarousel({
            loop: true,
            margin:11,
            autoplay: true,
            items: 1,
            lazyLoad: true,
            nav: true,
            smartSpeed: 500,
            responsive: {
                0   : { items: 1, stagePadding: 40, margin:10 },
                600 : { items: 1, stagePadding: 80, },
                980 : { items: 2, stagePadding: 80 },
                1400: { items: 2, stagePadding: 100 },
                1600: { items: 2, stagePadding: 200 },
                1800: { items: 3, stagePadding: 150 }
            }
        });
    });
    fiveslides.each(function () {
        var _items = $(this).find(".item"),
            _max = _items.length;
        $(this).owlCarousel({
            items:5,
            loop:(_max > 5),
            touchDrag: (_max > 5), 
            mouseDrag: (_max > 5),
            margin:10,
            autoplay: false,
            lazyLoad: true,
            nav: false,
            dots: false,
            smartSpeed: 500,
            responsive: {
                0   : { items: 1, stagePadding: 40, margin:12, touchDrag: (_max > 1), mouseDrag: (_max > 1), loop:(_max > 1) },
                600 : { items: 2, stagePadding: 47, margin:12, touchDrag: (_max > 2), mouseDrag: (_max > 2), loop:(_max > 2) },
                980 : { items: 5, touchDrag: (_max > 5), mouseDrag: (_max > 5), loop:(_max > 5)},
            }
        });
    });
    fourslides.each(function () {
        var _items = $(this).find(".item"),
            _max = _items.length;
        $(this).owlCarousel({
            items:4,
            loop:(_max > 4),
            margin:10,
            autoplay: false,
            nav: false,
            dots: false,
            smartSpeed: 500,
            responsive: {
                0   : { items: 1, stagePadding: 40, margin:12, touchDrag: (_max > 1), mouseDrag: (_max > 1), loop:(_max > 1) },
                600 : { items: 2, stagePadding: 47, margin:12, touchDrag: (_max > 2), mouseDrag: (_max > 2), loop:(_max > 2) },
                980 : { items: 4, touchDrag: (_max > 4), mouseDrag: (_max > 4), loop:(_max > 4)},
            }
        });
    });
    threeslides.each(function () {
        var _items = $(this).find(".item"),
            _max = _items.length;
        $(this).owlCarousel({
            items:3,
            loop:(_max > 3),
            touchDrag: (_max > 3), 
            mouseDrag: (_max > 3),
            margin:10,
            autoplay: false,
            lazyLoad: true,
            nav: false,
            dots: false,
            smartSpeed: 500,
            responsive: {
                0   : { items: 1, stagePadding: 40, margin:12, touchDrag: (_max > 1), mouseDrag: (_max > 1), loop:(_max > 1) },
                600 : { items: 2, stagePadding: 47, margin:12, touchDrag: (_max > 2), mouseDrag: (_max > 2), loop:(_max > 2) },
                980 : { items: 3, touchDrag: (_max > 3), mouseDrag: (_max > 3), loop:(_max > 3)},
            }
        });
    });
    banner.each(function () {
        var _items = $(this).find(".item"),
            _max = _items.length;
        $(this).owlCarousel({
            items:2,
            loop:(_max > 2),
            touchDrag: (_max > 2), 
            mouseDrag: (_max > 2),
            margin:12,
            autoplay: true,
            lazyLoad: true,
            nav: false,
            smartSpeed: 500,
            responsive: {
                0: { items: 1, stagePadding: 40, margin:10, loop:(_max > 2), touchDrag: (_max > 1), mouseDrag: (_max > 1) },
                600: { margin: 15 },
                980: { },
            }
        });
    });
    fourgrouping.each(function () {
        var _items = $(this).find(".item"),
            _max = _items.length;
        $(this).owlCarousel({
            items:4,
            loop:(_max > 4),
            touchDrag: (_max > 4), 
            mouseDrag: (_max > 4),
            margin: 12,
            nav: false,
            autoplay: false,
            lazyLoad: true,
            smartSpeed: 500,
            responsive: {
                0: { items: 1, stagePadding:45, margin:15, touchDrag: (_max > 1), mouseDrag: (_max > 1), loop:(_max > 1) },
                480: { items: 2, stagePadding:52, margin:15, touchDrag: (_max > 2), mouseDrag: (_max > 2), loop:(_max > 2) },
                767: { items: 2, touchDrag: (_max > 2), mouseDrag: (_max > 2), loop:(_max > 2) },
                991: { },
            }
        });
    });
    threegrouping.each(function () {
        var _items = $(this).find(".item"),
            _max = _items.length;
        $(this).owlCarousel({
            items:3,
            loop:(_max > 3),
            touchDrag: (_max > 3), 
            mouseDrag: (_max > 3),
            margin: 12,
            autoplay: false,
            lazyLoad: true,
            nav: false,
            smartSpeed: 500,
            responsive: {
                0: { items: 1, stagePadding:45, margin:15, touchDrag: (_max > 1), mouseDrag: (_max > 1), loop:(_max > 1) },
                480: { items: 2, stagePadding:52, margin:15, touchDrag: (_max > 2), mouseDrag: (_max > 2), loop:(_max > 2) },
                767: { items: 2, touchDrag: (_max > 2), mouseDrag: (_max > 2), loop:(_max > 2) },
                991: { },
            }
        });
    });
    twogrouping.each(function () {
        var _items = $(this).find(".item"),
            _max = _items.length;
        $(this).owlCarousel({
            items:2,
            loop:(_max > 2),
            touchDrag: (_max > 2), 
            mouseDrag: (_max > 2),
            margin: 12,
            autoplay: false,
            items: 2,
            lazyLoad: true,
            nav: false,
            smartSpeed: 500,
            responsive: {
                0: { items: 1, stagePadding:45, margin:15, touchDrag: (_max > 1), mouseDrag: (_max > 1), loop:(_max > 1) },
                480: { items: 2, stagePadding:52, margin:15, touchDrag: (_max > 2), mouseDrag: (_max > 2), loop:(_max > 2) },
                767: { items: 2, touchDrag: (_max > 2), mouseDrag: (_max > 2), loop:(_max > 2) },
                991: { },
            }
        });
    });
});

// Highlight Slider
$(function () {
    if ($("#highlight-slider").length) {
        var slider = new MasterSlider();
        var _host = $("#highlight-slider"),
            msslider = _host.find(".master-slider"),
            items = _host.find(".ms-slide"),
            total = items.length,
            loop = items.length > 2;

        slider.setup(msslider, {
            width: 1500,
            height: 550,
            preload: 0,
            autoplay: true,
            autoHeight: true,
            layout: 'fullwidth',
            view: 'mask',
            space: 0,
            loop: loop
        });

        if (total > 1) {
            slider.control('bullets');
        }
        slider.control('slideinfo', {
            insertTo: ".ms-inner-controls-cont",
            autohide: false,
            align: 'bottom',
            size: 150
        });
    }
});


$(function () {
    if ($('#navsticky').length) {
        var _window = $(window),
            _nav = $('#navsticky'),
            _anchor = $('#sticky-anchor'),
            _subSticky = null;

        if ($("#subSticky").length) {
            _subSticky = $("#subSticky");
        }

        function sticky_relocate() {
            var window_top = _window.scrollTop();
            var div_top = _anchor.offset().top;
            if (window_top > div_top) {
                _nav.addClass('sticky');
                _anchor.height(_nav.outerHeight());
                _subSticky && _subSticky.removeClass("hide");
            } else {
                _nav.removeClass('sticky');
                _anchor.height(0);
                _subSticky && _subSticky.addClass("hide");
            }
        }
        sticky_relocate();
        $(window).scroll(sticky_relocate);
    }
});


jQuery.fn.forceNumber = function () {
    return this.each(function () {
        $(this).keydown(function (e) {
            var reg = /[\d\.\-]/,
                key = e.charCode || e.keyCode || 0,
                fn = (e.key=="Enter") || (e.key=="Backspace") || (e.key=="Tab") || (e.key=="Decimal") || (e.key=="ArrowRight") || (e.key=="ArrowLeft"),
                flg = fn || (reg.test(e.key)) || (e.key==null);
            return flg && (
                key == 8 ||
                key == 9 ||
                key == 13 ||
                key == 46 ||
                key == 110 ||
                key == 190 ||
                (key >= 35 && key <= 40) ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));
        });
    });
};


// Thank
function showThank() {
    $("#bx-regis").hide();
    $("#bx-thank").show().css('opacity', 0).fadeTo(360, 1);
    return false;
}


// Select
$(function () {
    if ($(".styled-select").length) {
        $(".styled-select").each(function () {
            var config = {
                '.chosen-select': {
                    width: "100%",
                    disable_search: true
                }
            }
            for (var selector in config) {
                $(selector).chosen(config[selector]);
            }

            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                $(selector).chosen("destroy");
            }
        });
    }
});


// Label Checked Checkbox
$(function () {
    if ($(".label-checked").length) {
        $(".label-checked").click(function () {
            var _parent = $(this).parent('label');
            $(this).is(':checked') ? _parent.addClass('selected') : _parent.removeClass('selected');
        });
    }
});

// Language Soon

$(function(){
    var btnLang = $(".language-soon");
    btnLang.each(function(){
        $(this).click(function(){
            $(this).toggleClass("active");
        });
    });
});

// Scrollnav
$(function () {
    if ($(".scrollnav a").length) {
        $('.scrollnav a').click(function () {
            var $href = $(this).attr('href');
            $('html,body').stop().animate({
                scrollTop: $($href).offset().top - 50
            }, 1000);
            return false;
        });
    }
});

// Parallaxing
$(document).scroll(function () {
    var $movebg = $(window).scrollTop() * -0.3;
    $('.bg-parallax-scroll').css('background-positionY', ($movebg) + 'px');
});
$(function(){
    if($('.bg-parallax-scroll').length){
        $(window).scroll(function(){
            var $movebg = $(window).scrollTop() * -0.3;
            $('.bg-parallax-scroll').css('background-positionY', ($movebg) + 'px');
        })
    }
})


$(function () {
    if($(".px-section").length){
        var _vH = window.innerHeight;

        var _section = $(".px-section"),
            _max = _section.length,
            _navIndex = -1;

        var _nav = $(".scroll-links"),
            _output = null;

        if ($(".px-mobileNav-sout").length) {
            _output = $(".px-mobileNav-sout").find("span");
        }

        function moveScroll() {
            var _pY = $(window).scrollTop(),
                _intY = _pY - _vH,
                _endY = _pY + _vH;

            var _reflow = true;
            for (var i = 0; i < _max; i++) {
                var _obj = $(_section[i]),
                    _top = _obj.offset().top - 54,
                    _bottom = _top + _obj.height();
                if ((_pY >= _top) && (_pY < _bottom)) {
                    if (_navIndex == i) {
                        _reflow = false;
                        break;
                    }
                    break;
                }
            }
            if (_reflow && (_navIndex != i)) {
                _navIndex = i;
                _section.removeClass("focus");
                _nav.removeClass("active");
                if (i < _max) {
                    _obj.addClass("focus");
                    $(_nav[i]).addClass("active");
                    if (_output) {
                        _output.text($(_nav[i]).text())
                    }
                }
            }
        }

        moveScroll();
        $(window).scroll(moveScroll).resize(function () {
            _vH = window.innerHeight;
            moveScroll();
        });
    }
});

/* Sub sticky */
$(function () {
    var _window = $(window),
        _subSticky = null,
        _anchor = null,
        _box = $(".px-mobileNav-sout");
    if ($("#subSticky").length) {
        _subSticky = $("#subSticky");
        _anchor = $("#sticky-anchor");
    }
    $(".getURL").click(function (e) {
        var _href = this.getAttribute('href');
        if (_href.charAt(0) == "#") {
            e.preventDefault();
            _subSticky.removeClass("expand");
            _box.removeClass("show");
            $('html,body').animate({
                scrollTop: $(_href).offset().top - 50
            }, 1000);
        }
    })
    _box.click(function (e) {
        $(this).toggleClass("show");
        _subSticky.toggleClass("expand");
        if ($(this).hasClass('show')) {
            var window_top = _window.scrollTop();
            var div_top = _anchor.offset().top;
            if (window_top < div_top) {
                $('html,body').animate({
                    scrollTop: div_top + 5
                }, 500);
            }
        }
    })
})

// -------- Social Share -------- //

function addQS(d, c) {
    var a = [];
    for (var b in c)
        if (c[b]) a.push(b.toString() + '=' + encodeURIComponent(c[b]));
    return d + '?' + a.join('&')
}

function fbShare() {
    var g = {
        u: document.URL,
        t: document.title
    };
    var a = addQS('https://www.facebook.com/sharer.php', g);
    window.open(a, 'sharer', 'toolbar=0,status=0,width=626,height=436');

    return false;
}

function fbShare2(url) {

    FB.ui({
        method: 'share',
        href: url
    });

    return false;
}

function twShare() {
    var g = {
        /*url: document.URL,*/
        via: 'ktcprivilege',
        related: '',
        hashtags: 'KTC',
        text: document.title
    };
    var a = addQS('http://twitter.com/share', g) + '&url=' + document.URL;
    window.open(a, 'tweet', 'toolbar=0,status=0,width=626,height=436');
    return false;
}

function gpShare() {
    var g = {
        url: document.URL,
        hl: "th"
    };
    var a = addQS('https://plus.google.com/share', g);
    window.open(a, 'sharer', 'menubar=no,toolbar=no,resizable=yes,status=0,width=600,height=600');
    return false;
}

function lineMSG() {
    window.location = "line://msg/text/" + encodeURIComponent(document.URL);
}


function mailShare() {
    var g = 'mailto:';
    g += '?subject=' + encodeURIComponent(document.title) + ' KTC';
    g += '&body=' + $("meta[property=og\\:description]").attr('content') + '\n\n' + encodeURIComponent(document.URL);
    win = window.open(g, 'emailWindow');
}


// Search
$(function () {
    if ($(".ic-search").length) {
        $(".ic-search").click(function (e) {
            obj = $(this);

            $('.nav-search a[data-role="privilage"]').click();
            if (typeof obj.parent().data('search') != 'undefined') {
                dataSearch = obj.parent().data('search');
                if (dataSearch == 'creditcard' || dataSearch == 'other') {
                    $('.nav-search a[class=search-' + dataSearch + ']').click();
                    //('#formGlobalSearch').attr('action', '/sites/Satellite');				
                }
            } else {
                if (typeof $('#formGlobalSearch').attr('role') != 'undefined' && $('#formGlobalSearch').attr('role') == 'index-search') {
                    //('#formGlobalSearch').attr('action', '/sites/Satellite');					
                } else {
                    //('#formGlobalSearch').attr('action', '/sites/Satellite');					
                }

            }
            setTimeout(function () {
                $("#globalSearch")[0].focus();
            }, 100);
        });
        $("#globalSearch").keyup(function () {
            //if (this.value.length > 2) {
                //$('.bx-searchresult').find('ul[id^=result]').addClass('hide');
                //$('.bx-searchresult').find('ul#result-' + $(this).parent().find('#searchtype').val()).removeClass('hide');
                //$(".bx-searchresult").show();
				//alert("Submit");
            //} else {
                //$('.bx-searchresult').find('ul[id^=result]').addClass('hide');
                //$(".bx-searchresult").hide();
            //}
			var yourInput = $(this).val();
			re = /[`~!@#$^*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;
			var isSplChar = re.test(yourInput);
			if(isSplChar)
			{
				var no_spl_char = yourInput.replace(/[`~!@#$^*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
				$(this).val(no_spl_char);
			}
        });
    }
});

//ic ic-location-arrow click search
$(function() {
	$(".ic-location-arrow").click(function (e) {
		$('#formGlobalSearch').submit();
		e.preventDefault();
	});
});

// Accordion FAQ
$(function () {
    if ($(".accordion").length) {

        var accordion = $(".accordion");
        accordion.each(function () {
            $(this).accordion({
                collapsible: true,
                active: true,
                animate: 300,
                heightStyle: "content",
                header: "> .accordion-group > .accordion-title",
                create: function (event, ui) {
                    setTimeout(function () {
                        if ($('.accordion-group:visible').length > 30) {
                            var i = 1;
                            $('.accordion-group:visible').each(function () {
                                if (i > 30) {
                                    $(this).addClass('hidden');
                                }
                                i++;
                            });
                        }
                    }, 100);
                }
            });
        });

    }
})


$(function () {
    var htmlPage = $("html");
    $(".icon-submenu").click(function(e) {
        e.preventDefault();
        $(".nav-sidebar").toggleClass('view').slideToggle();
        htmlPage.toggleClass("overflow-hidden");
    });
    $("#nav-sidebar-bound").click(function () {
        $(".nav-sidebar").toggleClass('view').slideToggle();
    });
});

// Sidenav
$(function () {
    var clickSub = function (e) {
        e.preventDefault();
        $(this).parent().toggleClass("active");
    }
    $(".sidenav").each(function () {

        $(".submenu").parent().addClass('has-submenu');
        var group = $(".group-sidenav"),
            menu = group.find(".slicknav-link"),
            submenu = group.find(".submenu"),
            group_hasSub = $(".group-sidenav.has-submenu"),
            menu_hasSub = group_hasSub.find(".slicknav-link");

        function handleMQL(mql) {

            if (mql.matches) {
                $(".sidenav").addClass("sidenav-mobile");
                $(".group-sidenav.selected").addClass("active");

                menu_hasSub.on("click", clickSub);
            } else {
                $(".sidenav").removeClass("sidenav-mobile");
                $(".group-sidenav").removeClass("active");

                menu_hasSub.off("click", clickSub);
            }
        }

        var mql = window.matchMedia("(max-width:1024px)");
        mql.addListener(handleMQL);
        handleMQL(mql);

    });
});

// nav Sidebar
$(function () {
    if ($(".nav-sidebar").length) {
        $('.nav-sidebar').fixTo('.section-2column', {
            top: 118,
            useNativeSticky: true
        });
    }
})

// Register Campaign
 $(function(){
    $("#btnregister").click(function() {
        $('html, body').animate({
            scrollTop: $("#formregister").offset().top -110}, 800);
    });
});


// Map Container 
$('.map-container')
    .click(function () {
        $(this).find('iframe').addClass('clicked')
    })
    .mouseleave(function () {
        $(this).find('iframe').removeClass('clicked')
    });


// Popup
$(function () {
    var _body = $("body");
    $(".popup").each(function () {
        var _loc = $(this);
        _loc.on('click', '.close-popup', function (e) {
            e.preventDefault();
            _loc[0].closePopup();
        });
        this.showPopup = function () {
            _loc.addClass("show");
            _body.addClass("popup-active");
        }
        this.closePopup = function () {
            _loc.removeClass("show");
            _body.removeClass("popup-active");
        }
        _loc.find(".popup-bound").click(function () {
            _loc[0].closePopup();
        });
    });
    $(".open-popup").click(function (e) {
        e.preventDefault();
        _body.addClass("popup-active");
        $(this.getAttribute('href')).addClass("show");
    });
});

function showPxPopUP(id) {
    ($(".popup.show")[0]) && $(".popup.show")[0].closePopup();
    document.getElementById(id).showPopup();
}

// nivoLightbox
$(function () {
    if($('.gallery-list>a').length){
        $('.gallery-list a').nivoLightbox();
    }
});

// Search

$(document).ready(function () {
    $('.nav-search a').click(function () {

        dataRole = $(this).data('role');
		console.log('dataRole:'+ dataRole);
        $('.bx-searchresult').find('ul[id^=result]').addClass('hide');
        $(".bx-searchresult").hide();

        $(this).parents('.form-search').find('#searchtype').val(dataRole);
        $(this).parents('.nav-search').find('.active').removeClass('active');
        $(this).addClass('active');

        if (dataRole == 'creditcard') {
			text = typeof window._lang == 'undefined' || window._lang == 'th' ? 'ค้นหาบัตร' : 'Search Card';
            $(this).parents('.form-search').find('#globalSearch').attr('placeholder', text);
            $('#popup-search').addClass('popup-bgw, popupsearch-bgw');
        } else if (dataRole == 'privilage') {
			text = typeof window._lang == 'undefined' || window._lang == 'th' ? 'ค้นหาสิทธิพิเศษ' : 'Search Privilage';
            $(this).parents('.form-search').find('#globalSearch').attr('placeholder', text);
            $('#popup-search').addClass('popup-bgw, popupsearch-bgw');
        } else if (dataRole == 'other'){
			text = typeof window._lang == 'undefined' || window._lang == 'th' ? 'ค้นหาทุกสิ่งใน KTC' : 'Search Everything';
            $(this).parents('.form-search').find('#globalSearch').attr('placeholder', text);
            $('#popup-search').removeClass('popup-bgw, popupsearch-bgw');
        }else{
			text = typeof window._lang == 'undefined' || window._lang == 'th' ? 'ค้นหาสิทธิพิเศษ' : 'Search Privilage';
            $(this).parents('.form-search').find('#globalSearch').attr('placeholder', text);
            $('#popup-search').addClass('popup-bgw, popupsearch-bgw');
		}
		
        if (typeof $('#formGlobalSearch').attr('role') != 'undefined' && $('#formGlobalSearch').attr('role') == 'index-search') {
            switch (dataRole) {
            case 'creditcard':
                //('#formGlobalSearch').attr('action', '/sites/Satellite');
				$(this).parents('.form-search').find('#pagename').attr('value', 'KTC/Page/CreditSearchResult');
                break;
            case 'privilage':
                //('#formGlobalSearch').attr('action', '/sites/Satellite');
				$(this).parents('.form-search').find('#pagename').attr('value', 'KTC/Page/PrivilageSearchResult');
                break;

            default:
                //('#formGlobalSearch').attr('action', '/sites/Satellite');
				$(this).parents('.form-search').find('#pagename').attr('value', 'KTC/Page/OtherSearchResult');
            }
        } else {
            switch (dataRole) {
            case 'creditcard':
                //('#formGlobalSearch').attr('action', '/sites/Satellite');
				$(this).parents('.form-search').find('#pagename').attr('value', 'KTC/Page/CreditSearchResult');
                break;
            case 'privilage':
                //('#formGlobalSearch').attr('action', '/sites/Satellite');
				$(this).parents('.form-search').find('#pagename').attr('value', 'KTC/Page/PrivilageSearchResult');
                break;

            default:
                //('#formGlobalSearch').attr('action', '/sites/Satellite');
				$(this).parents('.form-search').find('#pagename').attr('value', 'KTC/Page/OtherSearchResult');
            }
        }

    });
});

// Placeholder
$(function(){$("input, textarea").placeholder()});(function(e,t,n){function r(e){var t={};var r=/^jQuery\d+$/;n.each(e.attributes,function(e,n){if(n.specified&&!r.test(n.name)){t[n.name]=n.value}});return t}function i(e,t){var r=this;var i=n(r);if(r.value==i.attr("placeholder")&&i.hasClass("placeholder")){if(i.data("placeholder-password")){i=i.hide().next().show().attr("id",i.removeAttr("id").data("placeholder-id"));if(e===true){return i[0].value=t}i.focus()}else{r.value="";i.removeClass("placeholder");r==o()&&r.select()}}}function s(){var e;var t=this;var s=n(t);var o=this.id;if(t.value==""){if(t.type=="password"){if(!s.data("placeholder-textinput")){try{e=s.clone().attr({type:"text"})}catch(u){e=n("<input>").attr(n.extend(r(this),{type:"text"}))}e.removeAttr("name").data({"placeholder-password":s,"placeholder-id":o}).bind("focus.placeholder",i);s.data({"placeholder-textinput":e,"placeholder-id":o}).before(e)}s=s.removeAttr("id").hide().prev().attr("id",o).show()}s.addClass("placeholder");s[0].value=s.attr("placeholder")}else{s.removeClass("placeholder")}}function o(){try{return t.activeElement}catch(e){}}var u=Object.prototype.toString.call(e.operamini)=="[object OperaMini]";var a="placeholder"in t.createElement("input")&&!u;var f="placeholder"in t.createElement("textarea")&&!u;var l=n.fn;var c=n.valHooks;var h=n.propHooks;var p;var d;if(a&&f){d=l.placeholder=function(){return this};d.input=d.textarea=true}else{d=l.placeholder=function(){var e=this;e.filter((a?"textarea":":input")+"[placeholder]").not(".placeholder").bind({"focus.placeholder":i,"blur.placeholder":s}).data("placeholder-enabled",true).trigger("blur.placeholder");return e};d.input=a;d.textarea=f;p={get:function(e){var t=n(e);var r=t.data("placeholder-password");if(r){return r[0].value}return t.data("placeholder-enabled")&&t.hasClass("placeholder")?"":e.value},set:function(e,t){var r=n(e);var u=r.data("placeholder-password");if(u){return u[0].value=t}if(!r.data("placeholder-enabled")){return e.value=t}if(t==""){e.value=t;if(e!=o()){s.call(e)}}else if(r.hasClass("placeholder")){i.call(e,true,t)||(e.value=t)}else{e.value=t}return r}};if(!a){c.input=p;h.value=p}if(!f){c.textarea=p;h.value=p}n(function(){n(t).delegate("form","submit.placeholder",function(){var e=n(".placeholder",this).each(i);setTimeout(function(){e.each(s)},10)})});n(e).bind("beforeunload.placeholder",function(){n(".placeholder").each(function(){this.value=""})})}})(this,document,jQuery)