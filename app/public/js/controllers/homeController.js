
function HomeController()
{
// bind event listeners to button clicks //
	var that = this;

// handle user logout //
	$('#btn-logout').click(function(){ that.attemptLogout(); });

// handle account deletion //
	$('#account-edit').click(function(){ window.location.href = '/edit'});
    $('#add-task').click(function(){ window.location.href = '/add-task'})
    $('#view-tasks').click(function(){window.location.href = '/tasks'})
	this.attemptLogout = function()
	{
		var that = this;
		$.ajax({
			url: "/logout",
			type: "POST",
			data: {logout : true},
			success: function(data){
	 			that.showLockedAlert('You are now logged out.<br>Redirecting you back to the homepage.');
			},
			error: function(jqXHR){
				console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
			}
		});
	}
}

