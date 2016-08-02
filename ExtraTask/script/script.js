(function ($){
    'use strict';
$(window).load(function() {
	$('.zoomable').hover(
		function() {
			$('.zoomable img').stop().animate({opacity: 0}, 0, 
				function() { 
					$('.zoomable img').attr({src: $('.zoomable img').attr('data-img-url')}); 
				}
			).animate({opacity: 1}, 300);
 
		}, 
		function() {
			$('.zoomable img').stop().animate({opacity: 0}, 0, 
				function() { 
					$('.zoomable img').attr({src: $('.zoomable img').attr('data-preview-url')}).css({margin: "0 0"}); 
				}
			).animate({opacity: 1}, 300);
		}
	);
 
	var c = $('.preload img').width() / $('.zoomable img').width();
 
	$('.zoomable').mousemove(function(e) {		
		var pX = e.pageX - $(this).offset().left;
		var pY = e.pageY - $(this).offset().top;
 
		var iX = pX * c - pX;
		var iY = pY * c - pY;
 
		$('.zoomable img').css({margin: "-" + iY + "px -" + iX + "px"});
 
	});
});
});(jQuery)