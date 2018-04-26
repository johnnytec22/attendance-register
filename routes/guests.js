const express = require('express');
var router = express.Router();
var admin = require('firebase-admin');

router.get('/:event_key/:guest_key/edit', (req, res) => {
    var event_key = req.params.event_key;
    var guest_key = req.params.guest_key;
    var event_name = req.query.event;

    var db = admin.database();
    var ref = db.ref('registerapp').child('guests').child(event_key).child(guest_key);
    ref.once('value', (snap) => {
        var guest_data = snap.val();
        var context = {
            'guest_data':guest_data,
            'event_key': event_key,
            'guest_key': guest_key,
            'event_name': event_name
        }

        console.log(context)
        res.render('guest_edit.pug', context);
    })
})


router.post('/:event_key/:guest_key/update', (req, res) => {
    var event_key = req.params.event_key;
    var guest_key = req.params.guest_key;

    var db = admin.database();
    var ref = db.ref('registerapp/guests/'+event_key).child(guest_key);

    ref.update(req.body, (error) => {
        if(error) {
            res.send('Error: Try Again');
        }else{
            res.redirect('/events/event/'+event_key);
        }
    })
})

router.get('/:event_key/:guest_key/delete', (req, res) => {
    var event_key = req.params.event_key;
    var guest_key = req.params.guest_key;

    var db = admin.database();
    var ref = db.ref('registerapp/guests/'+event_key).child(guest_key);

    ref.remove((error) => {
        if(error) {
            res.send('<h1>Error: Data not deleted, Please try again</h1>');
        }else{
            res.redirect('/events/event/'+event_key);
        }
    });
})

module.exports = router