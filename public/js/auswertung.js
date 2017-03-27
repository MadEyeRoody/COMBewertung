/**
 * Created by roody on 24.03.17.
 */


function addResults(question, id) {
    var divContainer = document.getElementById("questionContainer");
    var divQuestionAndAnswer = document.createElement("div");
    var divQuestion = document.createElement("div");
    var divAnswer = createAnswerDiv(id);

    divQuestionAndAnswer.className = "questionAndAnswer";
    divQuestion.className = classQuestionInactive;
    divAnswer.className = "answer";

    if (id == 0) {
        divQuestion.className = classQuestionActive;
    }

    divQuestionAndAnswer.setAttribute("id", "questionAndAnswer" + id);
    divQuestion.setAttribute("id", "question" + id);

    divQuestion.innerHTML = question;

    divQuestionAndAnswer.appendChild(divQuestion);
    divQuestionAndAnswer.appendChild(divAnswer);

    divContainer.appendChild(divQuestionAndAnswer);
}


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

window.onload = function main() {
    var station = getQueryVariable("station");


    $.get(
        "http://combewertung.azurewebsites.net/api/getBewertung?id="+station,
        {paramOne : 1, id : station},
        function(data) {
            document.getElementById("standName").innerHTML=data.name;
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