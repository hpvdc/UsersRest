var restify = require('restify');
var mongojs = require('mongojs');

var db = mongojs( 'usersDB', ['users']);

var server = restify.createServer();

server.use( restify.acceptParser( server.acceptable));
server.use( restify.bodyParser());
server.use( restify.queryParser());

server.listen( 3000, function(){
    console.log( 'Server listening at 3000');
});

server.get( '/users/list', function( req, res, next){
    db.users.find( function( err, users ){
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        if( err )
            res.send( 'Impossible to see users' );

        res.end( JSON.stringify( users ) );
    });

    return next();
});


server.get( 'users/list/:id', function( req, res, next ){
    db.users.find( { id: req.params.id}, function( err, data ){
        if( err )
            res.send( 'User cannot be found' );

        res.end( JSON.stringify( data ));
    });
    return next();
});

server.post( '/users/add', function( req, res, next){
    var user = { username: req.params.username, id:req.params.id};
    db.users.save( user, function( err, data ){
        if( err )
            res.send( err );

        res.end( JSON.stringify( user ));
    });

    return next();
});


server.del( '/users/delete/:id', function( req, res, next ){
    db.users.remove( {id: req.params.id}, function( err, data ){
        res.writeHead( 200,{
                'Content-Type': 'application/json; charset=utf-8'
        });

        res.end( JSON.stringify( data.ok ));
    });

    return next();
});


server.get( '/users/delete/all', function( req, res, next ){
    db.users.drop();
    return next();
});
module.exports = server;
