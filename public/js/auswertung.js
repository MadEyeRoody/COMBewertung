/**
 * Created by roody on 24.03.17.
 */

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    alert('Query Variable ' + variable + ' not found');
}

indow.onload = function main() {
    station = getQueryVariable("station");


    $.get(
        "http://combewertung.azurewebsites.net/api/getBewertung?id=Stand4_AV_Sarabi",
        {paramOne : 1, id : station},
        function(data) {
            alert('page content: ' + data);
        }
    );


/*
    $.getJSON("data/questions.json", function (obj) {
        stationTitle=obj[station].titel;
        document.getElementById("standName").innerHTML=stationTitle;
        document.title=stationTitle;
        stationShort = obj[station].stand;
        questions=obj[station].questions;
        var id = 0;
        for ( var question in questions) {
            addQuestion(questions[id], id);
            id++;
        }
    });*/
};