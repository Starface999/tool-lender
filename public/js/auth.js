$(document).ready(function(){

function checkAuth() {
	$.get('/current-user', function (data) {
		console.log(data);
		if (data.user) {
			$('.logged-in').show();
			$('.not-logged-in').hide();
			$('.log-out').show();
		} else {
			$('.logged-in').hide();
			$('.not-logged-in').show();
			$('.log-out').hide();
		}
	}
	);
}

checkAuth();

console.log("app.js works");

$("#signup-form").submit(function(e) {
	e.preventDefault();
	var user = $(this).serialize();
	$.post('/users', user, function (data) {
		checkAuth();
		console.log(data);
	});
$('#signUp').modal('toggle');
$("#signup-form")[0].reset();
});

$('#login-form').submit( function (e) {
	e.preventDefault();
	var user = $(this).serialize();
	$.post('/login', user, function (data) {
		checkAuth();
	});
	$('#logIn').modal('toggle');
	$("#login-form")[0].reset();
});

$('#log-out-modal-button').on('click', function (e) {
	e.preventDefault();

	$.get('/logout', function (data) {
		console.log(data.msg);
		$('.logged-in').hide();
		$('.not-logged-in').show();
		$('.log-out').hide();
	});
});

});