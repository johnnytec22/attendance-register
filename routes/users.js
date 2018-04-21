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



router.get('/dashboard', function(req, res, next) {
    var db = admin.database();
    var EventRef = db.ref("registerapp").child('events')

    EventRef.orderByKey().limitToLast(1).on('child_added', (recent_event_snapshot) => {
      req.recent_event = recent_event_snapshot.val()
    })

    EventRef.orderByKey().on('value', (all_events) => {
      req.events = all_events.val()
      console.log(all_events.key)
      req.event_count = all_events.numChildren()
    })

    next()
}, (req, res, next) => {
    var dash_data = {
      recent_event: req.recent_event,
      events: req.events,
      event_count: req.event_count
    }
    console.log(dash_data)
    res.render('dashboard.pug', {title: "Dashboard", data:dash_data})
})


module.exports = router;
