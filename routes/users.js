var express = require('express');
var admin = require("firebase-admin");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.redirect('/users/login');
});

router.get('/register', function(req, res) {
  res.render('register.pug', { title: "Register"});
});

router.post('/register', function(req, res) {

  admin.auth().createUser( {
    email: req.body.email,
    password: req.body.password,
    displayName: req.body.full_name,
    disabled: false
  })
    .then(function(userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log("Successfully updated user", userRecord.toJSON());
      res.send('user registered!')
    })
    .catch(function(error) {
      console.log("Error updating user:", error);
      res.send('error occured')
    });

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

    EventRef.orderByKey().limitToLast(1).once('child_added', (recent_event_snapshot) => {
      recent_event = recent_event_snapshot.val()
      recent_event['key'] = recent_event_snapshot.key
      req.recent_event = recent_event

      EventRef.orderByKey().once('value', (all_events) => {
        req.events = all_events.val()
        req.event_count = all_events.numChildren()

        var dash_data = {
          recent_event: req.recent_event,
          events: req.events,
          event_count: req.event_count
        }
        
        res.render('dashboard.pug', {title: "Dashboard", data:dash_data})


      })


    })

})


module.exports = router;
