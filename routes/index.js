/**
 * Created by arno on 28/12/2014.
 */
var express =  require('express');
var app = express();

require('./config')(app);
require('../passport/strategies');
require('../passport/session');

var Site = require('./site');
var Brewery = require('./brewery');
var User = require('./user');

app.get('/',Site.index);
app.get('/chat',Site.chat);

app.get('/Brewerys',Brewery.list);
app.get('/brewery/add',Brewery.add);

app.get('/users/add',User.add);
app.get('/user',User.CurrentUser);

app.get('/login',Site.login);
app.post('/login',User.login);

app.get('/logout',User.logout);

app.get('/login/facebook',User.fb);
app.get('/login/facebook/callback',User.fbcb);

module.exports= app;