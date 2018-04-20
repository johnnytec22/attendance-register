var express = require('express');
var admin = require("firebase-admin");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res) {
  res.render('register.pug', { title: "Register"});
});

router.post('/register', function(req, res) {
  // Get a database reference to our blog
  var db = admin.database();
  var ref = db.ref("registerapp");
  var userRef = ref.child('users').child(req.body.username)
  userRef.set(req.body)
  res.end()
});


router.get('/login', function(req, res) {
  res.render('login.pug', { title: "Login"});
});

router.post('/login', function(req, res) {
  console.log(req.body)
  res.redirect('/users/dashboard')
});

router.get('/dashboard', function(req, res) {
  var db = admin.database();
  var EventRef = db.ref("registerapp").child('events')

  
  EventRef.orderByKey().on('child_added', (event_snapshot) => {
    console.log(event_snapshot.val())
  })

  res.render('dashboard.pug', {title: "Dashboard"})
})


module.exports = router;
