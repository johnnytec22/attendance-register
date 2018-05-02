const express = require('express');
var router = express.Router();
var admin = require('firebase-admin');

router.get('/:event_key/:guest_key/edit', (req, res) => {
    var event_key = req.params.event_key;
    var guest_key = req.params.guest_key;
 

    var db = admin.database();
    var ref = db.ref('registerapp').child('guests').child(event_key).child(guest_key);
    ref.once('value', (snap) => {
        var guest_data = snap.val();
        var context = {
            'guest_data':guest_data,
            'event_key': event_key,
            'guest_key': guest_key,
 
        }

        res.render('guest_edit.pug', context);
    })
})


router.post('/:event_key/:guest_key/update', (req, res, next) => {
    var event_key = req.params.event_key;
    var guest_key = req.params.guest_key;

    var db = admin.database();
    var ref = db.ref('registerapp').child('guests').child(event_key).child(guest_key);

    ref.update(req.body, (error) => {
        if(error) {
            res.send('Error: Try Again');
        }else{
            res.send(req.body.full_name + ' was successfully update');
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
            res.send('Error: Data not deleted, Please try again');
        }else{
            res.send(' was successfully update');
        }
    });
})

module.exports = router;