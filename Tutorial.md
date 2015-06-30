Para se listar todos os users:
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET
http://0.0.0.0:3000/users/list


Para listar apenas um user:
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET
http://0.0.0.0:3000/users/list/id
*Em que id é o id do user*


Para se adicionar um user:
curl --data "username=XXXXXXXXX&id=YYYYYY" http://0.0.0.0:3000/users/add
*Em que XXXXXXX é o username e YYYYYY é o id*


Para se remover um user:
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET
http://0.0.0.0:3000/users/delete/id
*Em que id é o id do user*


Para se removerem todos os users:
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET
http://0.0.0.0:3000/users/delete/all

Para fazer update a um utilizador:
curl --data "up=ZZZZ&username=XXXXXXXXX&id=YYYYYY" http://0.0.0.0:3000/users/update
*Em que ZZZZ é o id do utilizador a alterar e os outros parametros sao opcionais,
id ou username*
