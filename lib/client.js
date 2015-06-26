var restify = require('restify');
var server = require('./Server');

var client = restify.createJsonClient({
    url: 'http://localhost:3000'
});

// a static user to CREATE READ UPDATE DELETE

var testUser = {
    username: 'Hugo',
    id: 1
};

var julio = {
    username: 'Raptor',
    id: 2
};

/*
client.post('/users/add', testUser, function (err, req, res, testUser) {
    if (err) {
        console.log("An error ocurred >>>>>>");
        console.log(err);
    } else {
        console.log('User saved >>>>>>> ');
        console.log( testUser );
    }
});

client.post('/users/add', julio, function (err, req, res, testUser) {
    if (err) {
        console.log("An error ocurred >>>>>>");
        console.log(err);
    } else {
        console.log('User saved >>>>>>> ');
        console.log( julio );
    }
});




client.get( '/users/list/'+testUser.id, function( err, req, res, user){
    if( err ){
        console.log( 'An error ocurred >>>>>>' );
        console.log( err );
    }else{
        console.log( 'User found:');
        console.log( user );
    }
});
*/
client.del( '/users/delete/' + julio.id, function( err, req, res, status ){
    if( err ){
        console.log( 'An error ocurred >>>>>>' );
        console.log( err );
    }else{
        console.log( 'User deleted....: ' );
        console.log( status );
    }
});

client.get( '/users/list', function( err, req, res, users ){
    if( err ){
        console.log( 'An error ocurred >>>>>>' );
        console.log( err );
    }else{
        console.log( 'Total users: ' + users.length );
        console.log( users );
    }
});

client.get( '/users/list/'+julio.id,function( err, req, res, user){
    if( err ){
        console.log( 'An error ocurred >>>>>>' );
        console.log( err );
    }else{
        console.log( user );
    }
});
/*
client.get( '/users/delete/all', function( err, req, res, users ){
    if (err) {
        console.log("An error ocurred >>>>>>");
        console.log(err);
    } else {
        console.log('Users deleted >>>>>>> ' + users);
    }
});
*/
