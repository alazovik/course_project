
$(document).ready(function(){

	var hc = new HomeController();

// customize the account settings form //
	
	$('#account-form h2').text('Настройки профиля');
	$('#account-form #sub1').text('Здесь расположены текущие настройки профиля');
	$('#name-tf').attr('disabled', 'disabled');
	$('#email-tf').attr('disabled', 'disabled');
	$('#country-list').attr('disabled', 'disabled');
	$('#user-tf').attr('disabled', 'disabled');
	$('#account-edit').html('Редактировать');
	$('#add-task').html("Добавить задачу");
	$('#view-tasks').html("Список задач")

});
