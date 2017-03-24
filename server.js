var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const collection = 'combewertung';
var MongoClient = require("mongodb").MongoClient;

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
                db.collection(collection).distinct( req.query.id  , function(error, result) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(result);
                        res.send(result);
                    }
                });
            }
        }
    );

})
app.listen(process.env.PORT || 8080);
