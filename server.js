var express = require('express');
var app = express();
const collection = 'combewertung';
var MongoClient = require("mongodb").MongoClient;


app.get('/', function(req, res) {
    res.redirect('index.html');
});


app.post('/api/speichereBewertung', function (req, res) {
    MongoClient.connect("mongodb://combewertung:3dKmkmTw6kh2KIkbpZ2R6aYVpVYSatM2fjK41V0fSxrsAlzS1mvKW9tWn5nqi2r3Kp34Qnm1ebxnaJQem3ximQ==@combewertung.documents.azure.com:10250/?ssl=true",
        function(err, db) {
            if (err) {
                console.log(err);
            } else {
                db.collection(collection).insertOne(req, function(error, result) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(result);
                    }
                });
            }
        }
    );

})
app.listen(process.env.PORT || 8080);
