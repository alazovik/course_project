function SolveTaskController() {

    this.onTaskSolve = function(responseText) {
        if(responseText == 'correct') {
            modal('Успешно', 'Задача решена верно')
        } else if(responseText == 'wrong') {
            modal('Неверно', 'Задача решена неверно')
        } else {
            modal('Успешно', 'Вы уже решили задачу верно')
        }
    }

    var modal = function(text, html) {
        $('.modal-alert').modal({ show : false, keyboard : true, backdrop : true });
        $('.modal-alert .modal-header h4').text(text);
        $('.modal-alert .modal-body p').html(html);
        $('.modal-alert').modal('show');
        $('.modal-alert button').off('click');
    }
}
