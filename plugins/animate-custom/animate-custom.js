$(document).ready(function() {
	$('.my-animate').live({
		mouseenter:function() {
			var anim = $(this).attr('for');
			$(this).addClass(anim);
		},
		mouseleave:function() {
			var anim = $(this).attr('for');
			$(this).removeClass(anim);
		}
	});
});