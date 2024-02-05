const resp = require('../utils/utils');

class PagesController {

    static rootRequest(req, res){
        res.send('You are on the homepage');
    }

    static aboutRequest(req, res){
        res.send('You are on the about us page');
    }

    static signupPage(req, res){
        res.send('You are on the sign up page');
    }

    static loginPage(req, res){
        res.send('You are on the login page of the application');
    }

}

module.exports = PagesController;