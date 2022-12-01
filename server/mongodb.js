const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';//data base address
const databaseName = 'text-mmorpg';

MongoClient.connect(connectionURL,{useNewUrlParser: true}, (error,client)=>{
    if(error){
        return console.log('Unable to connect to dataBase')
    }
    console.log('Connected to dataBase')


    // create a object and add it in the players collection
    const db = client.db(databaseName);
   /* db.collection('players').insertOne({
        name: 'Gaetan',
        age:34
    }, (error,result)=>{
        if(error){
            return console.log('unable to insert player');
        }
        console.log(result.ops);
    });*/

    // insert many object in the collection avatars

 /*   db.collection('avatars').insertMany([
        {
            name: 'Brice',
            lvl: 35,
            acceptpvp: true
        },{
            name: 'Mathieu',
            lvl:36,
            acceptpvp: true
        },{
            name: 'Elouan',
            lvl: 22,
            acceptpvp: false
        }
    ], (error,result) => {
        if(error){
            return console.log('unable to insert avatars');
        }
        console.log(result.ops);
    });*/


    //query one document
    // give the first corresponding to critere
    /*db.collection('avatars').findOne({acceptpvp: true}, (error, player) => {
        if(error){
            return console.log('unable to fetch player')
        }
        console.log(player);
    });*/

    // query multiple documents
    db.collection('avatars').find({acceptpvp : true}).toArray((error,players) => {
        console.log(players);
    });

    db.collection('avatars').find({acceptpvp: true}).count((error,count) => {
        console.log(count);
    });

    //Promise Update Documents

    const doWorkPromise = new Promise((resolve,reject)=> {
        setTimeout(()=>{
            resolve([7,4,1]);
            reject('Problem');
        },2000)
    });

    doWorkPromise.then((result)=>{
        console.log('successful!', result);
    }).catch((error) =>{
        console.log('Error!',error);
    });

    //usage case of promise

    const ObjectID = mongodb.ObjectID;
    const updatePromise =  db.collection('avatars').updateOne(
        {_id: new ObjectID("63861949737d63383678327e") },
        {
            $set:{
                name:'Sancho'
            }

        }).then((result) => {
            console.log('Success!', result);
        }).catch((error)=> {
            console.log('Failure!', error);
        });

    db.collection('avatars').deleteOne({_id: new ObjectID("63861949737d63383678327e")} );

});