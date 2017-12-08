jQuery(function ($) {

	/*----------------------/
	/* PAGE LOADER
	/*---------------------*/

	if ($('body.no-preloader').length <= 0) {
		$('body').jpreLoader({
			showSplash: false,
			loaderVPos: "50%"
		});
	}


	/*----------------------/
	/* MAIN NAVIGATION
	/*---------------------*/

	// navbar and logo switch related with scroll position
	$(window).on('scroll', function () {
		if ($(window).width() > 1024) {
			if ($(document).scrollTop() > 150) {
				setNavbarLight();
			} else {
				setNavbarTransparent();
			}
		}
	});

	// navbar and logo switch related with screen width
	function toggleNavbar() {
		if (($(window).width() > 1024) && ($(document).scrollTop() <= 150)) {
			setNavbarTransparent();
		} else {
			setNavbarLight();
		}
	}

	toggleNavbar();

	$(window).resize(function () {
		toggleNavbar();
	});

	/* navbar setting functions */
	function setNavbarLight() {
		$('.navbar').addClass('navbar-light');
		$('.navbar-brand img').attr('src', 'assets/img/loop-logo.png');
	}

	function setNavbarTransparent() {
		$('.navbar').removeClass('navbar-light');
		$('.navbar-brand img').attr('src', 'assets/img/loop-logo-white.png');
	}

	// hide collapsible menu
	$('.navbar-nav li a').click(function () {
		if ($(this).parents('.navbar-collapse.collapse').hasClass('in')) {
			$('#main-nav').collapse('hide');
		}
	});

	$('#main-nav a, .hero-buttons a').on('click', function (e) {
		e.preventDefault();

		var target = $($(this).attr('href'));

		$('html, body').animate({
			scrollTop: target.offset().top
		}, 1000, 'easeInOutExpo');
	});


	/*----------------------/
	/* HERO UNIT SUPERSIZED
	/*---------------------*/

	if ($('.slideshow').length > 0) {
		$.supersized({

			// Functionality		
			autoplay: 1,				// Slideshow starts playing automatically
			slide_interval: 3000,		// Length between transitions
			transition: 1, 				// 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
			transition_speed: 1000,		// Speed of transition

			// Components
			slide_links: 'blank',		// Individual links for each slide (Options: false, 'num', 'name', 'blank')
			thumb_links: 0,				// Individual thumb links for each slide
			slides: [				// Slideshow Images
				{ image: 'assets/img/sliders/slider1.jpg', title: '<div class="hero-text"><h2 class="hero-heading">HANDCRAFTED</h2><p>Built to provide great visitor experience</p></div>', thumb: '', url: '' },
				{ image: 'assets/img/sliders/slider2.jpg', title: '<div class="hero-text"><h2 class="hero-heading">PARALLAX</h2><p>Scrolling the page is fun with parallax background</p></div>', thumb: '', url: '' },
				{ image: 'assets/img/sliders/slider3.jpg', title: '<div class="hero-text"><h2 class="hero-heading">BUY ONE FOR TWO</h2><p>Buy one to get both of the agency and personal theme</p></div>', thumb: '', url: '' }
			],
		});

		$(".fa-pause, .fa-play").click(function () {
			$(this).toggleClass("fa-pause fa-play");
		});
	}


	/*----------------------/
	/* PARALLAX
	/*---------------------*/

	$('.full-width-parallax').parallax(0, 0.1);

	function setParallax() {
		if ($(window).width() > 1024) {
			$('.full-width-parallax').parallax(0, 0.1);
		}
	}

	setParallax();

	$(window).resize(function () {
		setParallax();
	});


	/*----------------------/
	/* SKILLS
	/*---------------------*/

	$('#skills').waypoint(function () {
		$('.chart').each(function () {
			$(this).easyPieChart({
				size: 150,
				barColor: '#ffae3f',
				trackColor: '#eee',
				scaleColor: false,
				lineWidth: 2,
				easing: 'easeOutExpo',
				animate: 2000
			});
		});
	},
		{
			offset: '70%'
		});


	/*----------------------/
	/* TWITTER STREAM
	/*---------------------*/

	var configProfile = {
		profile: { screenName: "thedevelovers" }, // provide your twitter username here
		domId: "tweet",
		maxTweets: 1,
		enableLinks: true,
		showUser: false,
		showTime: false,
		showImages: false,
		showInteraction: false,
		lang: "en"
	};

	twitterFetcher.fetch(configProfile);


	/*----------------------/
	/* SCROLL TO TOP
	/*---------------------*/

	if ($(window).width() > 992) {
		$(window).scroll(function () {
			if ($(this).scrollTop() > 300) {
				$('.back-to-top').fadeIn();
			} else {
				$('.back-to-top').fadeOut();
			}
		});

		$('.back-to-top').click(function (e) {
			e.preventDefault();

			$('body, html').animate({
				scrollTop: 0
			}, 800, 'easeInOutExpo');
		});
	}


	/*----------------------/
	/* WORKS
	/*---------------------*/

	var $container = $('.work-item-list');

	new imagesLoaded($container, function () {
		$container.isotope({
			itemSelector: '.work-item'
		});
	});


	$('.work-item-filters a').click(function (e) {

		var selector = $(this).attr('data-filter');
		$container.isotope({
			filter: selector
		});

		$('.work-item-filters a').removeClass('active');
		$(this).addClass('active');

		return false;
	});

	var originalTitle, currentItem;

	$('.media-popup').magnificPopup({
		type: 'image',
		callbacks: {
			beforeOpen: function () {

				// modify item title to include description
				currentItem = $(this.items)[this.index];
				originalTitle = currentItem.title;
				currentItem.title = '<h3>' + originalTitle + '</h3>' + '<p>' + $(currentItem).parents('.work-item').find('img').attr('alt') + '</p>';

				// adding animation
				this.st.mainClass = 'mfp-fade';
			},
			close: function () {
				currentItem.title = originalTitle;
			}
		}

	});


	/*----------------------/
	/* SOCIAL NETWORK
	/*---------------------*/

	if ($(window).width() > 1024) {
		wow = new WOW({
			animateClass: 'animated'
		});

		wow.init();
	} else {
		$('.wow').attr('class', '');
	}


	/*----------------------/
	/* TOOLTIP
	/*---------------------*/

	if ($(window).width() > 1024) {
		$('body').tooltip({
			selector: "[data-toggle=tooltip]",
			container: "body"
		});
	}


	/*----------------------/
	/* AJAX CONTACT FORM
	/*---------------------*/

	$('#contact-form').parsley();

	$('.contact-form form').submit(function (e) {

		e.preventDefault();

		if (!$(this).parsley('isValid'))
			return;

		$theForm = $(this);
		$btn = $(this).find('#submit-button');
		$btnText = $btn.text();
		$alert = $(this).parent().find('.alert');

		$btn.find('.loading-icon').addClass('fa-spinner fa-spin ');
		$btn.prop('disabled', true).find('span').text("Sending...");

		$.post('php_mailer/mail_handler.php', $(this).serialize(), function (data) {

			$message = JSON.parse(data);

			if ($message.success == true) {
				$theForm.slideUp('medium', function () {
					$alert.removeClass('alert-danger');
					$alert.addClass('alert-success').html("Thank you. We will contact you soon").slideDown('medium');
				});
			} else {
				$alert.addClass('alert-danger').html("Please check your information and try again").slideDown('medium');
			}

			$btn.find('.loading-icon').removeClass('fa-spinner fa-spin ');
			$btn.prop('disabled', false).find('span').text($btnText);

		})
			.fail(function () { console.log('AJAX Error'); });

	});


	// init scrollspy except on Opera, it doesn't work because body has 100% height
	if (!navigator.userAgent.match("Opera/")) {
		$('body').scrollspy({
			target: '#main-nav'
		});
	} else {
		$('#main-nav .nav li').removeClass('active');
	}



	particlesJS('particles-js',
	
	// {
	// 	"particles": {
	// 	  "number": {
	// 		"value": 80,
	// 		"density": {
	// 		  "enable": true,
	// 		  "value_area": 800
	// 		}
	// 	  },
	// 	  "color": {
	// 		"value": "#ffffff"
	// 	  },
	// 	  "shape": {
	// 		"type": "circle",
	// 		"stroke": {
	// 		  "width": 0,
	// 		  "color": "#000000"
	// 		},
	// 		"polygon": {
	// 		  "nb_sides": 5
	// 		},
	// 		"image": {
	// 		  "src": "img/github.svg",
	// 		  "width": 100,
	// 		  "height": 100
	// 		}
	// 	  },
	// 	  "opacity": {
	// 		"value": 0.5,
	// 		"random": false,
	// 		"anim": {
	// 		  "enable": false,
	// 		  "speed": 1,
	// 		  "opacity_min": 0.1,
	// 		  "sync": false
	// 		}
	// 	  },
	// 	  "size": {
	// 		"value": 3,
	// 		"random": true,
	// 		"anim": {
	// 		  "enable": false,
	// 		  "speed": 40,
	// 		  "size_min": 0.1,
	// 		  "sync": false
	// 		}
	// 	  },
	// 	  "line_linked": {
	// 		"enable": true,
	// 		"distance": 150,
	// 		"color": "#ffffff",
	// 		"opacity": 0.4,
	// 		"width": 1
	// 	  },
	// 	  "move": {
	// 		"enable": true,
	// 		"speed": 2,
	// 		"direction": "none",
	// 		"random": false,
	// 		"straight": false,
	// 		"out_mode": "out",
	// 		"bounce": false,
	// 		"attract": {
	// 		  "enable": false,
	// 		  "rotateX": 600,
	// 		  "rotateY": 1200
	// 		}
	// 	  }
	// 	},
	// 	"interactivity": {
	// 	  "detect_on": "canvas",
	// 	  "events": {
	// 		"onhover": {
	// 		  "enable": true,
	// 		  "mode": "grab"
	// 		},
	// 		"onclick": {
	// 		  "enable": true,
	// 		  "mode": "repulse"
	// 		},
	// 		"resize": true
	// 	  },
	// 	  "modes": {
	// 		"grab": {
	// 		  "distance": 119.88011988011988,
	// 		  "line_linked": {
	// 			"opacity": 1
	// 		  }
	// 		},
	// 		"bubble": {
	// 		  "distance": 400,
	// 		  "size": 40,
	// 		  "duration": 2,
	// 		  "opacity": 8,
	// 		  "speed": 3
	// 		},
	// 		"repulse": {
	// 		  "distance": 200,
	// 		  "duration": 0.4
	// 		},
	// 		"push": {
	// 		  "particles_nb": 4
	// 		},
	// 		"remove": {
	// 		  "particles_nb": 2
	// 		}
	// 	  }
	// 	},
	// 	"retina_detect": true
	//   })

	{
		"particles": {
		  "number": {
			"value": 468,
			"density": {
			  "enable": true,
			  "value_area": 800
			}
		  },
		  "color": {
			"value": "#ffffff"
		  },
		  "shape": {
			"type": "circle",
			"stroke": {
			  "width": 0,
			  "color": "#000000"
			},
			"polygon": {
			  "nb_sides": 5
			},
			"image": {
			  "src": "img/github.svg",
			  "width": 100,
			  "height": 100
			}
		  },
		  "opacity": {
			"value": 1,
			"random": true,
			"anim": {
			  "enable": true,
			  "speed": 1,
			  "opacity_min": 0,
			  "sync": false
			}
		  },
		  "size": {
			"value": 2,
			"random": true,
			"anim": {
			  "enable": false,
			  "speed": 4,
			  "size_min": 0.3,
			  "sync": false
			}
		  },
		  "line_linked": {
			"enable": false,
			"distance": 150,
			"color": "#ffffff",
			"opacity": 0.4,
			"width": 1
		  },
		  "move": {
			"enable": true,
			"speed": .5,
			"direction": "none",
			"random": true,
			"straight": false,
			"out_mode": "out",
			"bounce": false,
			"attract": {
			  "enable": false,
			  "rotateX": 600,
			  "rotateY": 600
			}
		  }
		},
		"interactivity": {
		  "detect_on": "canvas",
		  "events": {
			"onhover": {
			  "enable": true,
			  "mode": "repulse"
			},
			"onclick": {
			  "enable": true,
			  "mode": "repulse"
			},
			"resize": true
		  },
		  "modes": {
			"grab": {
			  "distance": 400,
			  "line_linked": {
				"opacity": 1
			  }
			},
			"bubble": {
			  "distance": 250,
			  "size": 0,
			  "duration": 2,
			  "opacity": 0,
			  "speed": 3
			},
			"repulse": {
			  "distance": 89.32849335314796,
			  "duration": 0.4
			},
			"push": {
			  "particles_nb": 4
			},
			"remove": {
			  "particles_nb": 2
			}
		  }
		},
		"retina_detect": true
	  })


	  createContactInfo();



});

function createContactInfo(){
	$("#myPhone").text("(949) 464-7353");
	$("#myEmail>a").text("mattbarnettdev@gmail.com")
}


