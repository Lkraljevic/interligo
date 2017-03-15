$(function() {                                    //run when the DOM is ready
	const element = document.getElementById('newsletter')
	element.addEventListener('submit', event => {
		event.preventDefault();
		$.ajax({
			url: '/newsletter',
			data: $(event.srcElement).serialize(),
			success: function(a) {
				 document.getElementById('newsletter_email').value = ''
			}
		});
	});
});
//mobile-nav-open
$(function() {                                    //run when the DOM is ready
	$(".mobile-nav-icon").click(function() {      //use a class, since your ID gets mangled
		$(".mobile-nav").addClass("active");      //add the class to the clicked element
	});
});

//mobile-nav-close
$(function() {
	$(".nav-close").click(function() {
		$(".mobile-nav").removeClass("active");
	});
});

//mobile-nav CONTACTS
$(function() {
	$(".btn-contact").click(function() {
		$(".mobile-nav").removeClass("active");
	});
});






//popup-open
$(function() {
	$(".btn-otvori").click(function() {
        $(".popup").addClass("active");
	});
});

//popup-close
$(function() {
	$(".btn-close").click(function() {
        $(".popup").removeClass("active");
	});
});