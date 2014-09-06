;(function(){
	"use strict";
	

	/* Modify these values to suit your needs... */
	var config = {
		countdownDate: '09/09/2014 10:00 PM',
		socialTooltips: true
	};



	var app = {
		init: function(){
			app.countdown(config.countdownDate);

			$('#lightSwitchDummy').on('click', function(){
				if($('header').hasClass('lights-out')){
					$('header').removeClass('lights-out');
					$('#overlay').stop().fadeOut(400);
				}
				else {
					$('header').addClass('lights-out');
					$('#overlay').stop().fadeTo(400, .8);
				}
				
			});

			$('.rocket').on('click', function(e){
				e.preventDefault();

				$('html, body').animate({
					scrollTop: 0
				}, 500);
			});

			if(config.socialTooltips){
				$('#social a').tooltip();
			}

			$('#subscribe').submit(function(e) {
				e.preventDefault();

				$.ajax({
					url: 'inc/subscribe.php',
					data: 'ajax=true&email=' + escape($('#subscribeEmail').val()),
					dataType: 'json',
					success: function(resp) {
						$('#subscribeEmail').removeClass('error');

						if(resp.success  == 1){
							$('#modalContent').text(resp.message);
							$('#modal, #modalOverlay').fadeIn(500);

							$('#subscribeEmail').val('');
						}
						else {
							$('#subscribeEmail').addClass('error');
						}						
					}
				});
			
				return false;
			});

			$('#contact').submit(function(e) {
				e.preventDefault();

				$.ajax({
					url: 'inc/contact.php',
					data: 'name='+ escape($('#contactName').val()) +'&email=' + escape($('#contactEmail').val()) +'&message='+escape($('#contactMessage').val()),
					dataType: 'json',
					success: function(resp) {
						$('#contactName, #contactEmail, #contactMessage').removeClass('error');

						if(resp.success == 1){
							$('#modalContent').text(resp.message);
							$('#modal, #modalOverlay').fadeIn(500);

							$('#contactName, #contactEmail, #contactMessage').val('');
						}
						else {
							if(resp.errorCode == 1){
								$('#contactName').addClass('error').focus();
							}
							else if(resp.errorCode == 2){
								$('#contactEmail').addClass('error').focus();
							}
							else if(resp.errorCode == 3){
								$('#contactMessage').addClass('error').focus();
							}	
						}					
					}
				});
			
				return false;
			});

			$('#modal').on('click touchstart', function(e){
				e.stopPropagation();
			});

			$('#modalClose, #modalOverlay').on('click touchstart', function(){
				$('#modal, #modalOverlay').fadeOut(500);
			});
		},
		countdown: function(dt){
	        var end = new Date(dt),
	        	_second = 1000,
	        	_minute = _second * 60,
	        	_hour = _minute * 60,
	        	_day = _hour * 24,
	        	timer;

	       	function pad(a){
	       		return (a < 10 ? '0' + a : a);
	       	}

	        function showRemaining() {
	            var now = new Date(),
	            	distance = end - now;

	            if (distance < 0) {
	                clearInterval(timer);

	                return;
	            }

	            var days = Math.floor(distance / _day),
	            	hours = Math.floor((distance % _day) / _hour),
	            	minutes = Math.floor((distance % _hour) / _minute),
	            	seconds = Math.floor((distance % _minute) / _second);

	            document.getElementById('calendar').innerHTML = days;
	            document.getElementById('hours').innerHTML = pad(hours);
	            document.getElementById('minutes').innerHTML = pad(minutes);
	            document.getElementById('astroman').innerHTML = pad(seconds);

	            $('#separator').show();
	            setTimeout(function(){
	            	$('#separator').hide();
	            }, 500)
	        }

	        timer = setInterval(showRemaining, 1000);
	    },
		domReady: function(){},
		windowLoad: function(){}
	};

	app.init();
	$(function(){
		app.domReady();

		$(window).load(app.windowLoad);
	});

})(jQuery)