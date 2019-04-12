var HTTP_PORT = process.env.PORT || 3000;
const express = require("express");
const exphbs = require('express-handlebars');
const path = require ("path");
const app = express();
var bodyParser = require('body-parser');
var bitcore = require('bitcore-lib');
var Insight = require('bitcore-explorers').Insight;
var privateKeyWIF = 'cV8BaciFsJVA3B3Q9fjXmkeofjBfFiiA4Z9nTrSJCtonwUg2BKzr'; //Private key intended for address mgNgSfeNjxYsLtY5SDE8XbetwUuwqrLjJ1
var privateKey = bitcore.PrivateKey.fromWIF(privateKeyWIF);


app.engine(".hbs", exphbs({ extname: ".hbs"}));
app.set("view engine", ".hbs");

app.use(express.static(path.join(__dirname, '/public')));


app.use(bodyParser.urlencoded({ extended: true })); 

app.post('/transaction', function(req,res){ //purpose to render the transactions page
    res.render('Transaction', {});

})

app.post('/chart', function(req, res){
    res.render('mychart', {}); //used to render the chart with on click command
})

app.post('/buy', function(req, res){
    var insight = new Insight('testnet');
    //queries a function run by bitpays insight server allows querying of node
    var add1 = req.body.address;
    console.log(add1);
    var add2 = req.body.address2;
    console.log(add2);
    var dep = req.body.deposit;
    insight.getUnspentUtxos(add1, function(err, utxos){
    
    var privateKeyWIF = 'cV8BaciFsJVA3B3Q9fjXmkeofjBfFiiA4Z9nTrSJCtonwUg2BKzr';//used for signing so transaction hex value can be generated specifically address mgNgSfeNjxYsLtY5SDE8XbetwUuwqrLjJ1

    var privateKey = bitcore.PrivateKey.fromWIF(privateKeyWIF);

        var tx = bitcore.Transaction();
        console.log('Unspent Transaction Amount'+ utxos); //array of unspent outputs
        tx.from(utxos);
        tx.to(req.body.address2, req.body.deposit);
        tx.change(req.body.address);
        tx.sign(privateKey);
        console.log(tx.toObject());
        console.log(tx);
        
        res.redirect('https://live.blockcypher.com/btc-testnet/pushtx/'); //you must copy and paste the hex transaction value posted in console log when prompted to
})
});

app.post('/redirect', function(request, response){ //used to check validity of an address
        response.redirect('https://live.blockcypher.com/btc-testnet/address/'+request.body.address);
})

app.get("/", function(req, res) //gets the front page
{     
    res.render('Markdale',{})
})
app.post("/", function(req, res) //necessary to post all data for front page.
{   
    res.render('Markdale',
    {})
});

var server = app.listen(HTTP_PORT, function () {
	console.log('Listening on port ' + HTTP_PORT); //ensures the server is hosted on port 3000
})

