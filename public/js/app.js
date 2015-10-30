// CLIENT-SIDE JAVASCRIPT
// On page load

$(document).ready(function(){
	console.log("app.js works");

	function makeCartString(item) {
		return '<div class="row cart-item" data-id="'+item._id+'">'+
		'<div class="col-sm-4">'+
		'<img class="cart-list-image" src="'+item.imgUrl+'">'+
		'</div>'+
		'<div class="col-sm-6">'+
		'<span><h4>'+item.itemName+'</h4></span>'+
		'<span><strong>Location: </strong><i>'+item.locationRoom+'</i></span>'+
		'</div>'+
		'<div class="col-sm-2">'+
		'<button type="button" class="close" id="cart-item<%=count++%>">&times;</button>'+
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
		'<button type="button" class="btn btn-primary" id="add-to-cart">Add To Cart</button>'+
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

	$("body").on('submit', '#add-item-to-library', function (e) {
		e.preventDefault();
		console.log("form submitted");
		var addedItem = $(this).serialize();
		console.log(addedItem);

		$.post('/libraries', addedItem)
		.success(function (data) {
			console.log(data);
			$("#add-item-to-library")[0].reset();
		});
		$(function () {
			$('#myModal').modal('toggle');
		});
		location.reload();
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
			$("#add-to-cart").on('click', function (e) {
				e.preventDefault();
				console.log("add to cart click worked");
				var libraryString = makeCartString(fullData);
				var currentId = fullData._id;
				console.log(currentId);
				if ($('#your-cart-display').find('#'+currentId).length<1)
				{
					$("#your-cart-display").append(libraryString);
				} else {
					alert("item is already in cart!");
				}
			});
		});
	});

	$('#add-dates-to-cart-items').on('submit', function (e) {
		e.preventDefault();
		console.log("cart items reservation button works");
		// var tooo = $('#fromDate').val(new Date().toISOString().subString(0, 10));
		// var frommm = $('#toDate').val(new Date().toISOString().subString(0, 10));
		// var newDates = "from="+frommm+"&to="+tooo;
		// console.log(newDates);
		var newDates = $('#add-dates-to-cart-items').serialize();
		console.log(newDates);
		var itemsInCart = $(".cart-item").map(function() {
			return $(this).data("id");
		});
		console.log(itemsInCart);
		for (var i = 0; i<itemsInCart.length; i++) {
			$.ajax({
				url: '/libraries/' + itemsInCart[i],
				type: 'PUT',
				data: newDates,
				success: function(result) {
					console.log('put request completed');
					console.log(result);
				}
			});
		}
		$('.cart-item').remove();
		$("#add-dates-to-cart-items")[0].reset();
		location.reload();
	});

	$(".cart-item").on('click', ".close", function (e) {
		e.preventDefault();
		var itemId = $(this).attr("data-id");
		$('div.cart-item[data-id='+itemId+']').remove();
	});


	$(".library-listing").on('click', ".close", function (e) {
		e.preventDefault();

		var itemId = $(this).attr("data-id");

		$.ajax({
			url: '/libraries/' + itemId,
			type: 'DELETE',
			success: function(result) {
				console.log('hi mom');
				console.log(this);
				$('div.library-listing[data-id='+itemId+']').remove();
			}
		});
	});

});