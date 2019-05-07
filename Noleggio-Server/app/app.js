//cd /*eslint-env node*/

var express = require('express');
var app = express();


var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');


var mysql = require("mysql");
var MongoClient = require('mongodb').MongoClient;

//var fs = require('fs');
//var https = require('https');

// per la creazione di un server https sono necessari una chiave (key)
// ed un certificato (cert) per certificare il sito e quindi poter utilizzare
// https. Il seguente comando (digitato nel terminal)

// openssl req -nodes -new -x509 -keyout server.key -out server.cert

// permette al creazione di questi certificati che però,
// ovviamente, non vengono accettati dal browser ma permettojno ugualmente
// di utilizzare la geolocalizzazione


/*var server = https.createServer({
  key: fs.readFileSync(__dirname + '/server.key'),
  cert: fs.readFileSync(__dirname + '/server.cert')
}, app);*/

app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', './views');
app.set('view engine', 'pug');
app.use(cookieParser());


app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/utente', function (req, res) {
    var conn = mysql.createConnection({
      host: "remotemysql.com",
      user: "cDUBK27lGm",
      password: "wwL2oN45fX",
      database: "cDUBK27lGm"
    });
    conn.connect(function(err){
        if(err) throw err;
        conn.query("SELECT ID FROM Utente WHERE Usr = '" + req.body.usr + "' AND Pass = '" + req.body.pass + "'", function(err, resu, fields){
            if(err){ throw err;}

            if(resu.length != 0){
                res.send({autorizzazione:"OK", ID: resu});
            }else{
                res.send({autorizzazione:"KO"});
            }

        });
    });
});



app.post('/regutente', function (req, res) {
    var conn = mysql.createConnection({
      host: "remotemysql.com",
      user: "cDUBK27lGm",
      password: "wwL2oN45fX",
      database: "cDUBK27lGm"
    });
    conn.connect(function(err){
        if(err) throw err;
        conn.query("INSERT INTO Utente (Nome, Cognome, Usr, Pass, DataN) VALUES ('"+ req.body.Nome +"', '"+ req.body.Cognome +"', '"+ req.body.Usr +"', '"+ req.body.Pass +"', '"+ req.body.Data +"'')", function(err, resu, fields){
            if(err){ throw err;}
            console.log(resu);
            res.send(resu);

        });
    });
});



// LOGIN GRAFICO
/*
app.get('/', function (req, res) {
    if(req.cookies.usr!=undefined){
        res.redirect("/home");
    }else{
        res.sendFile(__dirname + '/login.html');
    }
});


app.post('/log', function (req, res) {

    var conn = mysql.createConnection({
      host: "remotemysql.com",
      user: "cDUBK27lGm",
      password: "wwL2oN45fX",
      database: "cDUBK27lGm"
    });
    conn.connect(function(err){
        if(err) throw err;
        conn.query("SELECT ID FROM Utente WHERE Usr = '" + req.body.usr + "' AND Pass = '" + req.body.pass + "'", function(err, resu, fields){
            if(err){ throw err;}

            if(resu.length != 0){

               res.cookie('usr', resu[0].ID);
               res.redirect("./home");

            }else{
                res.redirect("./");

            }

        });
    });


});


app.get('/logout', function (req, res) {
    res.cookie('usr', "", {expires: new Date(Date.now())});
    res.redirect("/");
});



app.get('/home', function (req, res) {
    if(req.cookies.usr!=undefined){
       res.render('home');
    }else{
        res.redirect("/");
    }
});
*/


/*
server.listen(3000, function () {
  console.log('Example app listening on port 3000! Go to https://localhost:3000/')
});
*/


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
