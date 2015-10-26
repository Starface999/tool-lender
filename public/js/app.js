// CLIENT-SIDE JAVASCRIPT
// On page load

$(document).ready(function(){
	console.log("app.js works");

	function makeCartString(item) {
		return '<div class="row cart-item">'+
					'<div class="col-sm-4">'+
						'<img class="cart-list-image" src="'+item.imgUrl+'">'+
					'</div>'+
					'<div class="col-sm-8">'+
						'<span><h4>'+item.itemName+'</h4></span>'+
						'<span><strong>Location:</strong><i>'+item.locationRoom+'</i></span>'+
					'</div>'+
				'</div>';
	}

	function makeHTMLString(item) {
		return '<div class="row">'+
			'<div class="col-sm-6">'+
				'<img class="item-listing-image" src="'+item.imgUrl+'">'+
			'</div>'+
			'<div class="col-sm-6">'+
				'<hr>'+
				'<span><h3>'+item.itemName+'</h3></span>'+
				'<span><strong>Unavailable on:</strong></span>'+
				'<ul class="unavailable-on" id="unavailable-list">'+
				'</ul>'+
				'<span><strong>Location: </strong><i>'+item.locationRoom+'</i></span>'+
				'<p id="location-on">'+item.locationDescription+'</p>'+
				'<button type="button" class="btn btn-primary add-to-cart" id="'+item._id+'">Add To Cart</button>'+
			'</div>'+
			'<div class="col-sm-12">'+
				'<span><strong>Instructions for Use:</strong></span>'+
				'<p>'+item.useInstructions+'</p>'+
			'</div>'+
		'</div>';
	}

	function getUnavailable(item) {
		var unavailableArr=[];
		for (var i = 0; i<item.dateRange.length; i++) {
		unavailableArr.push('<li>'+item.dateRange[i].from+ '-' + item.dateRange[i].to + '</li>');
		}
		return unavailableArr;
	}

$("#add-item-to-library").submit(function (e) {
	e.preventDefault();
	var addedItem = $(this).serialize();

	$.post('/api/libraries', addedItem, function (data) {
		console.log(data);
		$("#add-item-to-library")[0].reset();
	});
});

$(".library-listing").on('click', function (e) {
	e.preventDefault();
	console.log("clicking worked");
	console.log($(this));
	var libraryId = $(this).data('id');
	$.get("/api/libraries/"+libraryId, function (fullData) {
		console.log(fullData);
		var libraryString = makeHTMLString(fullData);
		var unavailableString = getUnavailable(fullData);
		$("#item-display").html(libraryString);
		$("#unavailable-list").html(unavailableString);
	});
});

$(".add-to-cart").on('submit', function (e) {
	e.preventDefault();
	console.log("add to cart click worked");
	console.log($(this));
	var libraryId = $(this).data('id');
	$.get("/api/libraries/"+libraryId, function (fullData) {
		console.log(fullData);
		var libraryString = makeCartString(fullData);
		$("#your-cart-display").append(libraryString);
	});
});

});