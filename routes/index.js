var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Datos Personales' });
});

/* GET hello world. */
router.get('/helloworld', function (req, res, next) {
  res.render('helloworld', { title: 'Hola Mundo!' });
});

/* GET Userlist page. */
router.get('/userlist', function (req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({}, {}, function (e, docs) {
    res.render('userlist', {
      'userlist': docs,
      title: 'Lista de Usuarios'
    });
  });
});

/* GET New User page. */
router.get('/newuser', function (req, res) {
  res.render('newuser', { title: 'Añadir o Borrar Usuarios' });
});

/* POST to Add User Service */
router.post('/adduser', function (req, res) {
  // Set our internal DB variable
  var db = req.db;
  // Get our form values. These rely on the "name" attributes
  var userName = req.body.username;
  var userEmail = req.body.useremail;
  // Set our collection
  var collection = db.get('usercollection');
  // Submit to the DB
  collection.insert({
    'username': userName,
    'email': userEmail
  }, function (err, doc) {
    if (err) {
      // If it failed, return error
      res.send('There was a problem adding the information to the database.');
    } else {
      // And forward to success page
      res.redirect('userlist');
    }
  });
});

/* POST to Add User Service */
router.post('/deluser', function (req, res) {
  // Set our internal DB variable
  var db = req.db;
  // Get our form values. These rely on the "name" attributes
  var userName = req.body.username;
  // Set our collection
  var collection = db.get('usercollection');
  // Submit to the DB
  collection.remove({
    username: userName
  }, function (err, doc) {
    if (err) {
      // If it failed, return error
      res.send('Problema al borrar registro.');
    } else {
      // And forward to success page
      res.redirect('userlist');
    }
  });
});

module.exports = router;
