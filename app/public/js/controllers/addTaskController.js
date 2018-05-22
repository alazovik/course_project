
function AddTaskController()
{
// bind event listeners to button clicks //
	var that = this;

}

AddTaskController.prototype.onTaskAdd = function()
{
	$('.modal-alert').modal({ show : false, keyboard : true, backdrop : true });
	$('.modal-alert .modal-header h4').text('Успешно!');
	$('.modal-alert .modal-body p').html('Ваша задача была опубликована.');
	$('.modal-alert').modal('show');
	$('.modal-alert button').click(function(){window.location.href = '/home';});

}
