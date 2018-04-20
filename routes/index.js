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

  var status
  if(req.body.status == 'true') {
    status = true
  }else if (req.body.status == 'false'){
    status = false
  }
  var new_event = {
    title : req.body.title,
    location : req.body.location,
    host : req.body.host,
    date : req.body.date,
    time : req.body.time,
    status : status
  }
  var db = admin.database();
  var ref = db.ref("registerapp");
  var eventRef = ref.child('events').push(new_event)

  res.redirect('/users/dashboard');
})

module.exports = router;
