
$(document).ready(function(){
	
	var av = new AccountValidator();
	var sc = new SignupController();
	
	$('#account-form').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			return av.validateForm();
		},
		success	: function(responseText, status, xhr, $form){
			if (status == 'success') $('.modal-alert').modal('show');
		},
		error : function(e){
			if (e.responseText == 'email-taken'){
			    av.showInvalidEmail();
			}	else if (e.responseText == 'username-taken'){
			    av.showInvalidUserName();
			}
		}
	});
	$('#name-tf').focus();
	
// customize the account signup form //
	
	$('#account-form h2').text('Регистрация');
	$('#account-form #sub1').text('Расскажите о себе');
	$('#account-form #sub2').text('Выберите имя пользователя & пароль');
	$('#account-form-btn1').html('Отмена');
	$('#account-form-btn2').html('Отправить');
	$('#account-form-btn2').addClass('btn-primary');
	
// setup the alert that displays when an account is successfully created //

	$('.modal-alert').modal({ show:false, keyboard : false, backdrop : 'static' });
	$('.modal-alert .modal-header h4').text('Профиль создан!');
	$('.modal-alert .modal-body p').html('Ваш профиль создан.</br>Нажмите OK чтобы залогиниться.');

});