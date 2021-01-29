const models = require('../models');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('connect-flash');
let myPassport = require('../passport_setup');

const {validateUser} = require('../validator/signup');
const {isEmpty} = require('lodash');

const generateHAsh = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

const rerender_signup = function(errors, req, res, next) {
    res.render('user/signup', {
        formData: req.body,
        errors: errors
    })
};

    exports.show_login = function(req, res, next) {
        res.render('user/login', {
            formData: {}, 
            errors: {}
        });
    }

    exports.show_signup = function(req, res, next) {
        res.render('user/signup', {
            formData: {},
            errors: {}
        })
    };

    exports.login = function(req, res, next) {
        passport.authenticate('local', {
            successRedirect: "/",
            failureRedirect: "/login",
            failureFlash: true
        })(req, res, next);
    };

    exports.signup = function(req, res, next) {
        let errors = {};
        return validateUser(errors, req).then(errors => {
            if(!isEmpty(errors)) {
                rerender_signup(errors, req, res, next);
            } else {
                return models.User.findOne({
                    where: {
                        is_admin: true
                    }
                }).then(user => {
                    let NewUser;
                    if(user !== null) {
                        NewUser = models.User.build({
                            email: req.body.email,
                            username:req.body.username,
                            firstname:req.body.firstname,
                            lastname:req.body.lastname,
                            password: generateHAsh(req.body.password)
                        });
                    } else {
                        NewUser = models.User.build({
                            email: req.body.email,
                            username:req.body.username,
                            firstname:req.body.firstname,
                            lastname:req.body.lastname,
                            password: generateHAsh(req.body.password),
                            is_admin: true
                        })
                    }
                    return NewUser.save().then(result => {
                        passport.authenticate('local', {
                            successRedirect: "/",
                            failureRedirect: "/signup",
                            failureFlash: true
                        })(req, res, next);
                    })
            })
        }
    })};

    exports.logout = function(req, res, next) {
        req.logout(); //this destroys the session
        req.session.destroy();
        res.redirect('/login');
    };