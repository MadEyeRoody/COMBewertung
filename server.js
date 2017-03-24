var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const collection = 'combewertung';
var MongoClient = require("mongodb").MongoClient;
var resDocs = [];
var responses= [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/', function(req, res) {
    res.redirect('index.html');
});


app.post('/api/speichereBewertung', function (req, res) {
    MongoClient.connect("mongodb://combewertung:3dKmkmTw6kh2KIkbpZ2R6aYVpVYSatM2fjK41V0fSxrsAlzS1mvKW9tWn5nqi2r3Kp34Qnm1ebxnaJQem3ximQ==@combewertung.documents.azure.com:10250/?ssl=true",
        function(err, db) {
            if (err) {
                console.log(err);
            } else {
                db.collection(collection).insertOne(req.body, function(error, result) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(result);
                        res.send(200);
                    }
                    db.close;
                });
            }

        }
    );

})

app.get('/api/getBewertung', function (req, res) {
    MongoClient.connect("mongodb://combewertung:3dKmkmTw6kh2KIkbpZ2R6aYVpVYSatM2fjK41V0fSxrsAlzS1mvKW9tWn5nqi2r3Kp34Qnm1ebxnaJQem3ximQ==@combewertung.documents.azure.com:10250/?ssl=true",
        function(err, db) {
            if (err) {
                console.log(err);
            } else {
                db.collection(collection).find().toArray(function(err, docs) {
                    if (err) {
                        console.log(err);
                    } else {
                        for (var id=0;docs.length>id;id++){
                            if(docs[id].stationShort== req.query.id){
                                resDocs.push(docs[id]);
                            }
                        }


                        var positiv=0;
                        var mittel=0;
                        var negativ=0;
                        var keine=0;
                        var gesamt=0;

                        for (var i =0;resDocs.length>i;i++){
                            for(var answer in item){
                                console.log(answer)
                                if(answer.answer =="positiv"){
                                    positiv= positiv+1;
                                }
                                if(answer.answer =="mittel"){
                                    mittel= mittel+1;
                                }
                                if(answer.answer =="negativ"){
                                    negativ= negativ+1;
                                }
                                if(answer.answer =="positiv"){
                                    keine= keine+1;
                                }
                                gesamt = gesamt+1;
                            }

                            responses.push({
                                frage:answer.question,
                                gesamt: gesamt,
                                positiv:positiv,
                                mittel:mittel,
                                negativ:negativ,
                                keine:keine
                            })
                        }

                        var resJSON= {name:resDocs[0].name, responses: responses};


                        res.send(resJSON);
                    }

                    db.close();
                });
            }

        }
    );

})
app.listen(process.env.PORT || 8080);
