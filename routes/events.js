var express = require('express')
var router = express.Router()

var admin = require('firebase-admin')


router.get('/event/:key', (req, res) => {
    var key = req.params.key;

    var db = admin.database();
    var ref = db.ref('registerapp').child('events').child(key);

    ref.once('value', (event_data) => {
        var data = event_data.val();
        data['key'] = event_data.key;
        
        res.render('event_info.pug', {'data':data})
    })
}) 

router.get('/:key/edit', (req, res) => {
    var key = req.params.key;

    var db = admin.database();
    var ref = db.ref('registerapp').child('events').child(key);

    ref.once('value').then((snap) => {
        var data = snap.val()
        data['key'] = snap.key;

        res.render('event_edit.pug', {'data':data});
    })

});

router.post('/:key/update', (req, res) => {
    var key = req.params.key;

    var db = admin.database();
    var ref = db.ref('registerapp').child('events').child(key);

    ref.update(req.body).then(function(doc) {
        res.redirect('/events/'+key+'/edit')
    }).catch(function(error) {
        res.send('error: Please, try again')
    })
 
});



module.exports = router;