var express = require('express');
var router = express.Router();

let landing = require('../controllers/landing');
let user = require('../controllers/user');

let {isLoggedIn} = require('../middleware/hasAuth');
let {hasAuth} = require('../middleware/hasAuth');

//login requests
router.get('/login', user.show_login);
router.get('/signup', user.show_signup);

router.post('/login', user.login);
router.post('/signup', user.signup);

//logout routes
router.post('/logout', user.logout);
router.get('/logout', user.logout);

//landing page requests
router.get('/', landing.get_landing);
router.post('/', landing.submit_lead);

//show lead requests
router.get('/leads', isLoggedIn, landing.show_leads);
router.get('/lead/:lead_id',isLoggedIn,  landing.show_lead);

//edit lead requests
router.get('/lead/:lead_id/edit', hasAuth, landing.show_edit_lead)
router.post('/lead/:lead_id/edit', hasAuth, landing.edit_lead)

//delete lead requests
//router.post('/lead/:lead_id/delete', landing.delete_lead)
router.post('/lead/:lead_id/delete-json', landing.delete_lead_json)

//redirect
router.get('/redirect', landing.redirect_user)


module.exports = router;
