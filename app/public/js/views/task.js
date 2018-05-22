$(document).ready(function(){

    var solveTaskController = new SolveTaskController();

    $('#account-form').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){

		},
		success	: function(responseText, status, xhr, $form){
			    solveTaskController.onTaskSolve(responseText);

		},
		error : function(e){
			alert(e)
		}
	});

    $('#account-form h2').text('Решить задачу');
    $('#solve-task-btn').text('Решить!');
    $('#title').attr('disabled', 'disabled');
    $('#text').attr('disabled', 'disabled');
});