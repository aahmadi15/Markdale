var bitcore = require('bitcore-lib');
var Insight = require('bitcore-explorers').Insight;
var privateKeyWIF = 'cV8BaciFsJVA3B3Q9fjXmkeofjBfFiiA4Z9nTrSJCtonwUg2BKzr';

var privateKey = bitcore.PrivateKey.fromWIF(privateKeyWIF);
var address = privateKey.toAddress();//sender address

console.log('address');
console.log(address);

var privateKeyWIF2 = 'cMjSqy8zfuJYjJ5uQKpYbTzCjfupkwKcM4KJW54x3uMM2LGYqKnB';

var privateKey2 = bitcore.PrivateKey.fromWIF(privateKeyWIF2);
var address2 = privateKey2.toAddress(); //recieving address


console.log('address2:');
console.log(address2);

var insight = new Insight('testnet');
//queries a function run by bitpays insight server allows querying of node

var tx = bitcore.Transaction();
insight.getUnspentUtxos(address, function(err, utxos){
if (err){

}

else {
    console.log('Unspent Transaction Amount'+ utxos); //array of unspent outputs
    tx.from(utxos);
    tx.to(address2, 5000);
    tx.change(address);
    tx.fee(10000);
    tx.sign(privateKey);//private key associated with address in input transaction
    //console.log('transaction:');
    tx.sign(privateKey2);
    console.log(tx.toObject());
    console.log('serialized output');
    tx.serialize();
    insight.broadcast(tx, function(err, returnedTxId){
       if (err){
            console.log(err);
        }
        //else
        //{
            console.log('Successful Broadcast: ' + returnedTxId);
        //}
    });
    //https://live.blockcypher.com/btc-testnet/address/mgNgSfeNjxYsLtY5SDE8XbetwUuwqrLjJ1/ checks testnet bitcoins
}
})