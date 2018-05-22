
$(document).ready(function(){

	var atc = new AddTaskController();

	$('#account-form').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){

		},
		success	: function(responseText, status, xhr, $form){
			if (status == 'success') atc.onTaskAdd();
		},
		error : function(e){
			alert(e)
		}
	});

// customize the account settings form //

	$('#account-form h2').text('Новая задача');
	$('#publish-task-btn').html('Опубликовать');

});
