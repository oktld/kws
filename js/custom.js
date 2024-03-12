(function($) {

	"use strict";

	/* ----------------------------------------------------------- */
	/*  FUNCTION TO STOP LOCAL AND YOUTUBE VIDEOS IN SLIDESHOW
    /* ----------------------------------------------------------- */

	function stop_videos() {
		var video = document.getElementById("video");
		if (video.paused !== true && video.ended !== true) {
			video.pause();
		}
		$('.youtube-video')[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
	}

	$(document).ready(function() {

		/* ----------------------------------------------------------- */
		/*  STOP VIDEOS
        /* ----------------------------------------------------------- */

		$('.slideshow nav span').on('click', function () {
			stop_videos();
		});

		/* ----------------------------------------------------------- */
		/*  FIX REVEALATOR ISSUE AFTER PAGE LOADED
        /* ----------------------------------------------------------- */

		$(".revealator-delay1").addClass('no-transform');

		/* ----------------------------------------------------------- */
		/*  PORTFOLIO GALLERY
        /* ----------------------------------------------------------- */

		if ($('.grid').length) {
			new CBPGridGallery( document.getElementById( 'grid-gallery' ) );
		}

		/* ----------------------------------------------------------- */
		/*  HIDE HEADER WHEN PORTFOLIO SLIDESHOW OPENED
        /* ----------------------------------------------------------- */

		$(".grid figure").on('click', function() {
			$("#navbar-collapse-toggle").addClass('hide-header');
		});

		/* ----------------------------------------------------------- */
		/*  SHOW HEADER WHEN PORTFOLIO SLIDESHOW CLOSED
        /* ----------------------------------------------------------- */

		$(".nav-close").on('click', function() {
			$("#navbar-collapse-toggle").removeClass('hide-header');
		});
		$(".nav-prev").on('click', function() {
			if ($('.slideshow ul li:first-child').hasClass('current')) {
				$("#navbar-collapse-toggle").removeClass('hide-header');
			}
		});
		$(".nav-next").on('click', function() {
			if ($('.slideshow ul li:last-child').hasClass('current')) {
				$("#navbar-collapse-toggle").removeClass('hide-header');
			}
		});

		/* ----------------------------------------------------------- */
		/*  PORTFOLIO DIRECTION AWARE HOVER EFFECT
        /* ----------------------------------------------------------- */

		var item = $(".grid li figure");
		var elementsLength = item.length;
		for (var i = 0; i < elementsLength; i++) {
			$(item[i]).hoverdir();
		}

		/* ----------------------------------------------------------- */
		/*  AJAX CONTACT FORM
        /* ----------------------------------------------------------- */

		$(".contactformxx").on("submit", function() {
			$(".output_message").text("Sending...");

			var form = $(this);
			$.ajax({
				type: 'POST',
				//url: form.attr("action"),
				//url: 'http://kws.hstn.me/send-message.php',
				url: 'https://kws.great-site.net/send-message.php',

				method: form.attr("method"),
				data: form.serialize(),
				cache:false,
				//dataType : 'json',
				crossDomain:true,

				success: function(result) {
					console.log('result');
					console.log(result);
					if (result == "success") {
						$(".form-inputs").css("display", "none");
						$(".box p").css("display", "none");
						$(".contactform").find(".output_message").addClass("success");
						$(".output_message").text("Message Sent!");
					} else {
						$(".tabs-container").css("height", "440px");

						$(".contactform").find(".output_message").addClass("error");
						$(".output_message").text("Error Sending!");
					}
				}
			});

			return false;
		});

	});

	$(document).keyup(function(e) {

		/* ----------------------------------------------------------- */
		/*  KEYBOARD NAVIGATION IN PORTFOLIO SLIDESHOW
        /* ----------------------------------------------------------- */
		if (e.keyCode === 27) {
			stop_videos();
			$('.close-content').click();
			$("#navbar-collapse-toggle").removeClass('hide-header');
		}
		if ((e.keyCode === 37) || (e.keyCode === 39)) {
			stop_videos();
		}
	});

	$(document).ready(function() {

	    //update this with your $form selector
	    var form_id = "kws_contact_form";

	    var data = {
	        "access_token": "krzjn9el8f68vrjv8n6g0f28"
	    };

	    var sendButton = $("#" + form_id + " [name='send']");

	    function onSuccess() {
	        // remove this to avoid redirect
	        //window.location = window.location.pathname + "?message=Email+Successfully+Sent%21&isError=0";

	    	$("#" + form_id + " .button-text").text('Send Message');
	    	sendButton.prop('disabled',false);

	    	$(".reset-me").val('');

			//$(".form-inputs").css("display", "none");
			//$(".box p").css("display", "none");
			$(".contactform").find(".output_message").removeClass("error");
			$(".contactform").find(".output_message").addClass("success");
			$(".output_message").text("Message Sent!");

	    }

	    function onError(error, err_message = "Error Sending!") {
	        // remove this to avoid redirect
	        //window.location = window.location.pathname + "?message=Email+could+not+be+sent.&isError=1";

	    	$("#" + form_id + " .button-text").text('Send Message');
	    	sendButton.prop('disabled',false);

			//$(".tabs-container").css("height", "440px");
			$(".contactform").find(".output_message").removeClass("success");
			$(".contactform").find(".output_message").addClass("error");
			$(".output_message").text(err_message);
	    }

	    

	    function sendEmail() {
	        //sendButton.val('Sending…');
	        $("#" + form_id + " .button-text").text('Sending…');
	        sendButton.prop('disabled',true);

	        var name = $("#" + form_id + " [name='name']").val();
	        var email = $("#" + form_id + " [name='email']").val();
	        var subject = $("#" + form_id + " [name='subject']").val();
	        var message = $("#" + form_id + " [name='message']").val();
	        
	        //data['subject'] = subject;
	        data['subject'] = "KWS Contact Us - "+name;
	        data['text'] = "Message from contact us page :\n\n Name: "+name+"\nEmail: "+email+"\n Subject: "+subject+"\n Message: " + message;


	        // validation
	        var regex_email = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	        var regex_name = /^[a-zA-Z]+ [a-zA-Z]+$/;

	        if (name=="" || email=="" || subject=="" || message=="" ) {

	        	onError('error', "All fields are required.");
	        	return false;

	        } else if (regex_name.test(name) == false) {

	        	onError('error', "Please enter your full name (first & last name).");
	        	return false;

	        } else if (regex_email.test(email) == false) {

	        	onError('error', "Please enter valid email address.");
	        	return false;

	        } else {

		        $.post('https://postmail.invotes.com/send',
		            data,
		            onSuccess
		        ).fail(onError);
	    	}

	        return false;
	    }

	    sendButton.on('click', sendEmail);

	    var $form = $("#" + form_id);
	    $form.submit(function( event ) {
	        event.preventDefault();
	    });

	});

})(jQuery);