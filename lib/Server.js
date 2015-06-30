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

        res.end( JSON.stringify( users ) + '\n' );
    });

    return next();
});


server.get( 'users/list/:id', function( req, res, next ){
    db.users.find( { id: req.params.id}, function( err, data ){
        res.writeHead( 200,{
                'Content-Type': 'application/json; charset=utf-8'
        });
        if( err )
            res.send( 'User cannot be found' );

        res.end( JSON.stringify( data ) + '\n' );
    });
    return next();
});

server.post( '/users/add', function( req, res, next){
    var user = { username: req.params.username, id:req.params.id};
    db.users.save( user, function( err, data ){
        res.writeHead( 200,{
                'Content-Type': 'application/json; charset=utf-8'
        });
        if( err )
            res.send( err );

        res.end( JSON.stringify( user ) + '\n' );
    });

    return next();
});

server.get( '/users/delete/all', function( req, res, next ){
    if( !db.users.drop() )
        res.end( 'Todos os users apagados\n');
    else {
        res.end( 'Erro ao apagar os users\n');
    }
    return next();
});

server.get( '/users/delete/:id', function( req, res, next ){
    db.users.find( { id: req.params.id}, function( err, data ){
        res.writeHead( 200,{
                'Content-Type': 'application/json; charset=utf-8'
        });
        if( err )
            res.send( 'User cannot be found' );

        if( data.length !== 0){
            db.users.remove( {id: req.params.id}, function( err, data ){
                res.writeHead( 200,{
                        'Content-Type': 'application/json; charset=utf-8'
                });

                if( err )
                    res.end( err );

                res.end( 'Utilizador apagado\n');

            });
        }else {
            res.end( 'Nao existe esse utilizador\n');
        }
    });


    return next();
});

server.post( 'users/update/', function( req, res, next ){
    var user;
    var userId;

    if( req.params.username !== undefined )
        user = req.params.username;

    if( req.params.id !== undefined )
        userId = req.params.id;


    if( user !== undefined && userId !== undefined){
        db.users.findAndModify( {query: { id: req.params.up }, update: {$set:{ username: user, id: userId}} },
            function( err, doc, data ){
            if( err ){
                res.end( 'username e id null\n' );
            }
            if(JSON.stringify( doc ) !== "null" )
                res.end( 'Utilizador modificado\n');
            else {
                res.end( 'Utilizador nao encontrado\n');
            }
        });
    }else if( user === undefined && userId !== undefined ){
        db.users.findAndModify( {query: { id: req.params.up }, update: {$set:{ id: userId}} },
            function( err, doc, data ){
            if( err ){
                res.end( 'username null\n' );
            }
            if(JSON.stringify( doc ) !== "null" )
                res.end( 'Utilizador modificado\n');
            else {
                res.end( 'Utilizador nao encontrado\n');
            }
        });
    }else if( user !== undefined && userId === undefined ){
        db.users.findAndModify( {query: { id: req.params.up }, update: {$set:{ username: user}} },
            function( err, doc, data ){
            if( err ){
                res.end( 'id null\n' );
            }
            if(JSON.stringify( doc ) !== "null" )
                res.end( 'Utilizador modificado\n');
            else {
                res.end( 'Utilizador nao encontrado\n');
            }
        });
    }
    else if( user === undefined && userId === undefined  ){
        res.end( 'Nao existem dados a alterar\n');
    }
    return next();
});
module.exports = server;
