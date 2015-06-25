var restify = require('restify');
var mongodb = require('mongodb');
var monk = require('monk');
var db = monk('localhost:3000/DataBase');

var server = restify.createServer();

// fullResponse() sets up all of the default headrs for us
server.use(restify.fullResponse());

// bodyParser() remaps the body content of a request to the "req.params" variables
server.use(restify.bodyParser());

// This function make our Database accessible to our router, and avoid to open
// multiple connections

server.use(function(req, res, next) {
      req.mongo = mongodb;
      req.db = db;
      next();
});


server.listen(3000, function() {
      console.log('Server listening at ' + server.url);
});



server.get('/users/list', function(req, res, next) {

      var db = req.db;
      var users = db.get('users');


      users.find({}, function list(err, users) {
            if (err === undefined)
                  res.send('There is no users!');

            res.send(users);
      });
});

server.get('/users/:id', function(req, res, next) {

      var db = req.db;
      var users = db.get('users');

      users.findOne({
            'id': req.params.id
      }, function(err, user) {
            if (err === undefined)
                  res.send('That user doesnt exist!');

            res.send(user);
      });
});

server.post('/users/add/:name', function(req, res, next) {

      var db = req.db;
      var users = db.get('users');

      var userName = req.params.username;
      var Id = users.length + 1;

      users.insert({
            id: Id,
            username: userName
      }, function(err, user) {
            if (err === undefined)
                  res.send('Impossible to add user!');

            res.send(users);
      });
});

server.get('/users/remove/:id', function(req, res, next) {

      var db = req.db;
      var users = db.get('users');

      var Id = req.params.id;
      users.remove({
            'id': Id
      }, function(err, user) {
            if (err === undefined)
                  res.send('Impossible to remove user!');

            res.send(users);
      });
});
