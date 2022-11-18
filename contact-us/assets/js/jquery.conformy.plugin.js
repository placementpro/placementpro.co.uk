(function($) {
	// Email Validation
	$.fn.conformyEmailValidate     = function () {
		var emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return emailRegexp.test(String($(this).val()));
	}
	// Phone Validation
	$.fn.conformyPhoneValidate     = function () {
		//var phoneRegexp = /^[0-9]+$/;
		var phoneRegexp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
			return phoneRegexp.test($(this).val());
	}
	$.fn.modalClose = function(){
		let thisModalTarget  = $(this).attr('id'),
			$this            = $(this);
		 
		$(window).on('click', function(event){
			if(event.target.id == thisModalTarget){
				$this.removeClass("active");
			}
		});
	}    
})(jQuery);