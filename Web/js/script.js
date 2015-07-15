$(document).ready(function(){
	$('.sponsorFlip').click(function(){
		var elem = $(this);
		if(elem.data('flipped'))
		{
			elem.revertFlip();
			elem.data('flipped',false)
		}
		else
		{
			elem.flip({
				direction:'lr',
				speed: 200,
				onBefore: function(){
					elem.html(elem.siblings('.sponsorData').html());
				}
			});
			elem.data('flipped',true);
		}
	})

	$('.sponsorFlip').mouseover(function(){
		$('.sponsorListHolder_hiddenForLeft').stop();
		$('.sponsorListHolder_hiddenForMiddle').stop();
		$('.sponsorListHolder_hiddenForRight').stop();
		var elem=$(this).parent('.sponsor').attr('id');
			switch (elem) {
			    case "1":
			        $('.sponsorListHolder_hiddenForLeft').css({"background": "url('../img/sponsors/p010.jpg') no-repeat center" });
					$('.sponsorListHolder_hiddenForLeft').fadeTo("slow",0.99);
					$('.sponsorListHolder_hiddenForLeft').css({display: "block"});//船舶
					break;
				case "2":
					$('#mid02').fadeTo("normal",0.99);
					$('#mid02').css({display: "block"});//危险品
					break;
				case "5":
					$('#mid01').fadeTo("normal",0.99);
					$('#mid01').css({display: "block"});//货代平台
					break;
				case "4":
				    $('.sponsorListHolder_hiddenForLeft').css({"background": "url('../img/sponsors/p011.jpg') no-repeat center"});
					$('.sponsorListHolder_hiddenForLeft').fadeTo("slow",0.99);
					$('.sponsorListHolder_hiddenForLeft').css({ display: "block"}); //集卡
  					break;
            	case "3":
            	    $('.sponsorListHolder_hiddenForRight').css({ "background": "url('../img/sponsors/p012.jpg') no-repeat center" });
					$('.sponsorListHolder_hiddenForRight').fadeTo("slow",0.99);
					$('.sponsorListHolder_hiddenForRight').css({display: "block"});
					break;
	            case "6":
	                $('.sponsorListHolder_hiddenForRight').css({ "background": "url('../img/sponsors/p013.jpg') no-repeat center" });
					$('.sponsorListHolder_hiddenForRight').fadeTo("slow",0.99);
					$('.sponsorListHolder_hiddenForRight').css({display: "block"});
					break;

			}
	})
	$('.sponsorFlip').mouseout(function(){
		$('.sponsorListHolder_hiddenForLeft').stop();
		$('.sponsorListHolder_hiddenForMiddle').stop();
		$('.sponsorListHolder_hiddenForRight').stop();
		var elem=$(this).parent('.sponsor').attr('id');
			switch (elem) {
			    case "1":
			        $('.sponsorListHolder_hiddenForLeft').css({"background": "#fff" });
					$('.sponsorListHolder_hiddenForLeft').fadeTo("slow",0);
					$('.sponsorListHolder_hiddenForLeft').css({ "display": "none"});
					break;
				case "2":
					$('#mid02').fadeTo("normal",0);
					$('#mid02').css({"display": "none"});
					break;
				case "5":
					$('#mid01').fadeTo("normal",0);
					$('#mid01').css({"display": "none"});
					break;
	            case "4":
	                $('.sponsorListHolder_hiddenForLeft').css({"background": "#fff" });
					$('.sponsorListHolder_hiddenForLeft').fadeTo("slow",0);
					$('.sponsorListHolder_hiddenForLeft').css({ "display": "none"});
					break;
	            case "3":
	                $('.sponsorListHolder_hiddenForRight').css({ "background": "#fff" });
					$('.sponsorListHolder_hiddenForRight').fadeTo("slow",0);
					$('.sponsorListHolder_hiddenForRight').css({"display": "none"});
					break;
	            case "6":
	                $('.sponsorListHolder_hiddenForRight').css({ "background": "#fff" });
					$('.sponsorListHolder_hiddenForRight').fadeTo("slow",0);
					$('.sponsorListHolder_hiddenForRight').css({"display": "none"});
					break;
			}

	});
});