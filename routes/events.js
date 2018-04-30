var express = require('express')
var router = express.Router()

var admin = require('firebase-admin')

//gets and displays information for a single event 
router.get('/event/:key', (req, res, next) => {
    var key = req.params.key;

    var db = admin.database();
    var ref = db.ref('registerapp').child('events').child(key);

    ref.once('value', (event_data) => {
        var data = event_data.val();
        data['key'] = event_data.key;

        var guestRef = db.ref('registerapp').child('guests').child(key)
        guestRef.on('value', (snap) => {
            data['guest_count'] = snap.numChildren();
            data['recent_guests'] = snap.val();
   
            res.render('event_info.pug', {'data':data})
        })
        

    })
}) 

//take care of requests asking for a platform or form to edit and event
router.get('/:key/edit', (req, res) => {
    var key = req.params.key;

    var db = admin.database();
    var ref = db.ref('registerapp').child('events').child(key);

    ref.once('value').then((snap) => {
        var data = snap.val()
        data['key'] = snap.key;

        res.render('event_edit.pug', {'data':data});
    }).catch((error) => {
        res.send('<h1>Am Error Occurred, please try again </h1>');
    })

});

//posts data from and edited event form
router.post('/:key/update', (req, res) => {
    var key = req.params.key;

    var db = admin.database();
    var ref = db.ref('registerapp').child('events').child(key);

    ref.update(req.body, (error) => {
        if(error) {
            res.send('error: Please, try again');
        }else{
            res.redirect('/events/event/'+key);
        }
    })
    
});


router.get('/:title/:key/add_guest', (req, res) => {
    var key = req.params.key;
    var title = req.params.title;

    var context = {
        'key':key,
        'event_title':title
    };
    if (req.query.msg) {
        context['success_msg'] = req.query.msg;
    }


    var db = admin.database();
    var ref = db.ref('registerapp').child('guests').child(key);

    ref.on('value', (snap) => {
        var guest_count = snap.numChildren();
        context['guest_count'] = guest_count;

        res.render('add_guest.pug', context)
    })

    
})

router.post('/:title/:key/add_guest', (req, res) => {
    var key = req.params.key;
    var title = req.params.title;
    
    var db = admin.database();
    var ref = db.ref('registerapp').child('guests').child(key);

    ref.push(req.body, (error) => {
        if(error) {
            res.send('Error!');
        }else{
            res.send('<p class="alert-success">'+ req.body.full_name +' was successfully registered</p>')
        }
    })
});


module.exports = router;