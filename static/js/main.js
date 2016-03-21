;(function () {
	
	'use strict';

	// iPad and iPod detection	
	var isiPad = function(){
	  return (navigator.platform.indexOf("iPad") != -1);
	}

	var isiPhone = function(){
    return (
      (navigator.platform.indexOf("iPhone") != -1) || 
      (navigator.platform.indexOf("iPod") != -1)
    );
	}

	// Mobile Menu Clone ( Mobiles/Tablets )
	var mobileMenu = function() {
		if ( $(window).width() < 769 ) {
			$('html,body').addClass('earth-overflow');

			if ( $('#earth-mobile-menu').length < 1 ) {
				
				var clone = $('#earth-primary-menu').clone().attr({
					id: 'earth-mobile-menu-ul',
					class: ''
				});
				var cloneLogo = $('#earth-logo').clone().attr({
					id : 'earth-logo-mobile',
					class : ''
				});

				$('<div id="earth-logo-mobile-wrap">').append(cloneLogo).insertBefore('#earth-header-section');
				$('#earth-logo-mobile-wrap').append('<a href="#" id="earth-mobile-menu-btn"><i class="ti-menu"></i></a>')
				$('<div id="earth-mobile-menu">').append(clone).insertBefore('#earth-header-section');

				$('#earth-header-section').hide();
				$('#earth-logo-mobile-wrap').show();
			} else {
				$('#earth-header-section').hide();
				$('#earth-logo-mobile-wrap').show();
			}

		} else {

			$('#earth-logo-mobile-wrap').hide();
			$('#earth-header-section').show();
			$('html,body').removeClass('earth-overflow');
			if ( $('body').hasClass('earth-mobile-menu-visible')) {
				$('body').removeClass('earth-mobile-menu-visible');
			}
		}
	};


	// Parallax
  // var scrollBanner = function () {
  //   var scrollPos = $(this).scrollTop();
  //   console.log(scrollPos);
  //   $('.earth-hero-intro').css({
  //     'opacity' : 1-(scrollPos/300)
  //   });
  // }


	// Click outside of the Mobile Menu
	var mobileMenuOutsideClick = function() {
		$(document).click(function (e) {
	    var container = $("#earth-mobile-menu, #earth-mobile-menu-btn");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      $('body').removeClass('earth-mobile-menu-visible');
	    }
		});
	};


	// Mobile Button Click
	var mobileBtnClick = function() {
		// $('#earth-mobile-menu-btn').on('click', function(e){
		$(document).on('click', '#earth-mobile-menu-btn', function(e){
			e.preventDefault();
			if ( $('body').hasClass('earth-mobile-menu-visible') ) {
				$('body').removeClass('earth-mobile-menu-visible');	
			} else {
				$('body').addClass('earth-mobile-menu-visible');
			}
			
		});
	};


	// Main Menu Superfish
	var mainMenu = function() {

		$('#earth-primary-menu').superfish({
			delay: 0,
			animation: {
				opacity: 'show'
			},
			speed: 'fast',
			cssArrows: true,
			disableHI: true
		});

	};

	// Superfish Sub Menu Click ( Mobiles/Tablets )
	var mobileClickSubMenus = function() {

		$('body').on('click', '.earth-sub-ddown', function(event) {
			event.preventDefault();
			var $this = $(this),
				li = $this.closest('li');
			li.find('> .earth-sub-menu').slideToggle(200);
		});

	};

	// Window Resize
	var windowResize = function() {
		$(window).resize(function(){
			mobileMenu();
		});

	};

	// Window Scroll
	var windowScroll = function() {
		$(window).scroll(function() {

			var scrollPos = $(this).scrollTop();
			if ( $('body').hasClass('earth-mobile-menu-visible') ) {
				$('body').removeClass('earth-mobile-menu-visible');
			}

			if ( $(window).scrollTop() > 70 ) {
				$('#earth-header-section').addClass('earth-scrolled');
			} else {
				$('#earth-header-section').removeClass('earth-scrolled');
			}


			// Parallax
			$('.earth-hero-intro').css({
	      'opacity' : 1-(scrollPos/300)
	    });

		});
	};

	// Fast Click for ( Mobiles/Tablets )
	var mobileFastClick = function() {
		if ( isiPad() && isiPhone()) {
			FastClick.attach(document.body);
		}
	};

	// Easy Repsonsive Tabs
	var responsiveTabs = function(){
		
		$('#earth-tab-feature').easyResponsiveTabs({
      type: 'default',
      width: 'auto', 
      fit: true, 
      inactive_bg: '',
      active_border_color: '',
      active_content_border_color: '',
      closed: 'accordion',
      tabidentify: 'hor_1'
            
    });
    $('#earth-tab-feature-center').easyResponsiveTabs({
      type: 'default',
      width: 'auto',
      fit: true, 
      inactive_bg: '',
      active_border_color: '',
      active_content_border_color: '',
      closed: 'accordion', 
      tabidentify: 'hor_1' 
      
    });
    $('#earth-tab-feature-vertical').easyResponsiveTabs({
      type: 'vertical',
      width: 'auto',
      fit: true,
      inactive_bg: '',
      active_border_color: '',
      active_content_border_color: '',
      closed: 'accordion',
      tabidentify: 'hor_1'
    });
	};

	// Owl Carousel
	var owlCrouselFeatureSlide = function() {
		
		var owl2 = $('.owl-carousel-2');
		owl2.owlCarousel({
				items: 1,
		    loop: true,
		    margin: 0,
		    lazyLoad: true,
		    responsiveClass: true,
		    nav: true,
		    dots: true,
		    smartSpeed: 500,
		    navText: [
		      "<i class='ti-arrow-left owl-direction'></i>",
		      "<i class='ti-arrow-right owl-direction'></i>"
	     	],
		    responsive: {
		        0: {
		          items: 1,
		          nav: true
		        },
		        600: {
		          items: 1,
		          nav: true,
		        },
		        1000: {
		          items: 1,
		          nav: true,
		        }
	    	}
		});
	};

	// MagnificPopup
	var magnifPopup = function() {
		$('.image-popup').magnificPopup({
			type: 'image',
		  gallery:{
		    enabled:true
		  }
		});
	};

	$(function(){

		mobileFastClick();
		responsiveTabs();
		mobileMenu();
		mainMenu();
		magnifPopup();
		mobileBtnClick();
		mobileClickSubMenus();
		mobileMenuOutsideClick();
		owlCrouselFeatureSlide();
		windowResize();
		windowScroll();


	});

	// Get tumblr post
	function getTumblr() {

		$.ajax({
			type: 'GET',
			url: "http://api.tumblr.com/v2/blog/earthcompany-jp.tumblr.com/posts/text?api_key=ZBZzyAZod4J065jK7h1zJueVFkiGVx7u93tROVDRL1kV3Ew5vt",
			async: false,
			jsonpCallback: 'jsonCallback',
			contentType: "application/json",
			dataType: 'jsonp',
			success: function(json) {
				var latest = json.response.posts[0];
				$("#blog-headline").text(latest.title);
				$("#blog-body").html(latest.body);
				json.response.posts.forEach(function(el, i) {
					if(i > 4) return false;
					$("#blog-more").append("<li><a href='"+ el.post_url +"'>"+ el.title +"</li>");
				});
			},
			error: function(e) {
				console.log(e.message);
			}
		});   
	}





}());