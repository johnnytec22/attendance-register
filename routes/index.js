var express = require('express');
var router = express.Router();
var admin = require('firebase-admin')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/create_event', (req, res) => {
  res.render('create_event.pug')
})

router.post('/add_event', (req, res) => {


  var db = admin.database();
  var ref = db.ref("registerapp");
  var eventRef = ref.child('events').push(req.body)

  res.redirect('/users/dashboard');
})

module.exports = router;
