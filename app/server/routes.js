
var CT = require('./modules/country-list');
var AM = require('./modules/account-manager');
var EM = require('./modules/email-dispatcher');
var taskManager = require('./modules/task-manager')
var solvedTaskManager = require('./modules/solved-task-manager')

module.exports = function(app) {

// main login page //
	app.get('/', function(req, res){
	// check if the user's credentials are saved in a cookie //
		if (req.cookies.user == undefined || req.cookies.pass == undefined){
			res.render('login', { title: 'Логин' });
		}	else{
	// attempt automatic login //
			AM.autoLogin(req.cookies.user, req.cookies.pass, function(o){
				if (o != null){
				    req.session.user = o;
					res.redirect('/home');
				}	else{
					res.render('login', { title: 'Логин' });
				}
			});
		}
	});
	
	app.post('/', function(req, res){
		AM.manualLogin(req.body['user'], req.body['pass'], function(e, o){
			if (!o){
				res.status(400).send(e);
			}	else{
				req.session.user = o;
				if (req.body['remember-me'] == 'true'){
					res.cookie('user', o.user, { maxAge: 900000 });
					res.cookie('pass', o.pass, { maxAge: 900000 });
				}
				res.status(200).send(o);
			}
		});
	});
	
// logged-in user homepage //
	
	app.get('/home', function(req, res) {
		if (req.session.user == null){
	// if user is not logged-in redirect back to login page //
			res.redirect('/');
		}	else{
			res.render('home', {
				title : 'Профиль',
				countries : CT,
				udata : req.session.user
			});
		}
	});

	app.get('/edit', function(req, res) {
    		if (req.session.user == null){
    	// if user is not logged-in redirect back to login page //
    			res.redirect('/');
    		}	else{
    			res.render('edit_account', {
    				title : 'Редактировать профиль',
    				countries : CT,
    				udata : req.session.user
    			});
    		}
    	});

    app.get('/add-task', function(req, res) {
        if (req.session.user == null){
        	// if user is not logged-in redirect back to login page //
        	res.redirect('/');
        } else{
        	res.render('add-task', {
        				title : 'Опубликовать задачу',
        				udata : req.session.user
        		});
        	}
    });

	app.post('/add-task', function(req, res) {
	    taskManager.addNewTask({
	                title   : req.body['title'],
        			text 	: req.body['text'],
        			correct_answer 	: req.body['correct-answer'],
        			user : req.session.user
        		}, function(e){
        			if (e){
        				res.status(400).send(e);
        			}	else{
        				res.status(200).send('ok');
        			}
        		});
	});

    app.get('/tasks', function(req, res) {
        taskManager.getAllRecords( function(e, tasksList){
    			res.render('tasks', { tasks : tasksList });
    		})
    });

    app.get('/task/:id', function(req, res) {
        taskManager.findById(req.params.id, function(e, foundTask){
            res.render('view-task', {task: foundTask});
        })
    });

    app.post('/task/:id', function(req, res){

        solvedTaskManager.findByIdAndUser(req.params.id, req.session.user.user, function(solved) {
            if(solved.length > 0) {
                res.status(200).send('already-solved')
            } else {
                checkCorrectAnswer(req, res)
            }
        })
    });

    var checkCorrectAnswer = function(req, res) {
        taskManager.findById(req.params.id, function(e, foundTask){
            if(foundTask.correct_answer == req.body['answer']) {
                solvedTaskManager.addNewTask({
                    _id : req.params.id,
                    user : req.session.user.user
                }, function(e) {
                    if (e){
                        res.status(400).send(e);
                    }	else{
                        res.status(200).send('correct')
                    }
                })
            } else {
                res.status(200).send('wrong')
            }
        })
    }

	app.post('/edit', function(req, res){
		if (req.session.user == null){
			res.redirect('/');
		}	else{
			AM.updateAccount({
				id		: req.session.user._id,
				name	: req.body['name'],
				email	: req.body['email'],
				pass	: req.body['pass'],
				country	: req.body['country']
			}, function(e, o){
				if (e){
					res.status(400).send('error-updating-account');
				}	else{
					req.session.user = o;
			// update the user's login cookies if they exists //
					if (req.cookies.user != undefined && req.cookies.pass != undefined){
						res.cookie('user', o.user, { maxAge: 900000 });
						res.cookie('pass', o.pass, { maxAge: 900000 });	
					}
					res.status(200).send('ok');
				}
			});
		}
	});

	app.post('/logout', function(req, res){
		res.clearCookie('user');
		res.clearCookie('pass');
		req.session.destroy(function(e){ res.status(200).send('ok'); });
	})
	
// creating new accounts //
	
	app.get('/signup', function(req, res) {
		res.render('signup', {  title: 'Войти', countries : CT });
	});
	
	app.post('/signup', function(req, res){
		AM.addNewAccount({
			name 	: req.body['name'],
			email 	: req.body['email'],
			user 	: req.body['user'],
			pass	: req.body['pass'],
			country : req.body['country']
		}, function(e){
			if (e){
				res.status(400).send(e);
			}	else{
				res.status(200).send('ok');
			}
		});
	});

	app.get('/rating', function(req, res) {
		AM.getAllRecords( function(e, accounts){
		    solvedTaskManager.aggregateBySolvedTasks(function(e, aggr) {
		        for (var i = 0, len = accounts.length; i < len; i++) {
                    for (var j = 0, lenAggr = aggr.length; j < lenAggr; j++) {
                        if(accounts[i].user == aggr[j]._id) {
                           accounts[i].tasks =  aggr[j].count
                        } else {
                           accounts[i].tasks = 0
                        }
                    }
                }
			    res.render('rating', { title : 'Рейтинг', accts : accounts.sort(function(a, b){return b.tasks - a.tasks}) });
		    })
		})
	});
	
	app.post('/delete', function(req, res){
		AM.deleteAccount(req.body.id, function(e, obj){
			if (!e){
				res.clearCookie('user');
				res.clearCookie('pass');
				req.session.destroy(function(e){ res.status(200).send('ok'); });
			}	else{
				res.status(400).send('record not found');
			}
	    });
	});
	
	app.get('*', function(req, res) { res.render('404', { title: 'Страница не найдена'}); });

};
