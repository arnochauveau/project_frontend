/**
 * Created by arno on 28/12/2014.
 */
var express =  require('express');
var path = require('path');

var Site = require('./site');
var Brewery = require('./brewery');

var app = express();
app.use(express.static(path.join(__dirname, '/../public')));

app.get('/',Site.index);
app.get('/chat',Site.chat);

app.get('/Brewerys',Brewery.list);
app.get('/brewery/add',Brewery.add);



module.exports= app;