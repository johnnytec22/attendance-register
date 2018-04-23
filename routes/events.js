var express = require('express')
var router = express.Router()

var admin = require('firebase-admin')


router.get('/event/:key', (req, res) => {
    var id = req.params.key;

    var db = admin.database();
    var ref = db.ref('registerapp').child('events').child(id);

    ref.once('value', (event_data) => {
        var data = event_data.val();
        data['key'] = event_data.key;
        
        res.render('event_info.pug', {'data':data})
    })
}) 


module.exports = router;