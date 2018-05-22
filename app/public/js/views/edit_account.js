
$(document).ready(function(){

	var hc = new EditProfileController();
	var av = new AccountValidator();

	$('#account-form').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			if (av.validateForm() == false){
				return false;
			} 	else{
			// push the disabled username field onto the form data array //
				formData.push({name:'user', value:$('#user-tf').val()})
				return true;
			}
		},
		success	: function(responseText, status, xhr, $form){
			if (status == 'success') hc.onUpdateSuccess();
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

// customize the account settings form //

	$('#account-form h2').text('Настройки профиля');
    $('#account-form #sub1').text('Здесь расположены текущие настройки профиля');
	$('#user-tf').attr('disabled', 'disabled');
	$('#account-form-btn1').html('Удалить');
	$('#account-form-btn1').addClass('btn-danger');
	$('#account-form-btn2').html('Обновить');

// setup the confirm window that displays when the user chooses to delete their account //

	$('.modal-confirm').modal({ show : false, keyboard : true, backdrop : true });
    $('.modal-confirm .modal-header h4').text('Удалить аккаунт');
    $('.modal-confirm .modal-body p').html('Вы уверены, что хотите удалить аккаунт?');
    $('.modal-confirm .cancel').html('Отмена');
    $('.modal-confirm .submit').html('Удалить');
    $('.modal-confirm .submit').addClass('btn-danger');

});
