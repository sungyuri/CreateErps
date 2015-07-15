$(document).ready(function(){

	$('.sponsorFlip').mouseover(function(){
		var elem = $(this);
		if(!elem.data('flipped')){
			elem.flip({
				direction:'lr',
				speed: 200,
				onBefore: function(){
					elem.html(elem.siblings('.sponsorData').html());
				}
			});
			elem.data('flipped',true);
		}
	});
	$('.sponsorFlip').mouseout(function(){
		var elem = $(this);
		if(elem.data('flipped'))
		{
			elem.revertFlip();
			elem.data('flipped',false)
		}
	});
});