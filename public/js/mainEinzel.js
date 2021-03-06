var classQuestionActive = "questionActive h1";
var classQuestionInactive = "questionInactive h4";
var station;
var answers=[
	"positiv",
	"mittel",
	"negativ",
	"keine"
];
var stationTitle;
var stationShort;
var questions;
var givenAnswers =[];

var query = window.location.search.substring(1);
var vars = query.split("&");
for (var i = 0; i < vars.length; i++) {
	var pair = vars[i].split("+");
	if (pair[1] == "windowed") {
		window.open('einzel.html?'+pair[0],'windowName','toolbar=no');
		javascript:window.history.back();
	}
}


function addQuestion(question, id) {
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

function createAnswerDiv(id) {
	var divAnswer = document.createElement("div");
	divAnswer.setAttribute("id", "answerContainer" + id);
	for (var i = 0; i < 4; i++) {
		var linkButton = document.createElement("a");
		linkButton.setAttribute("href", "#");
		var buttonImg = document.createElement("img");
		buttonImg.setAttribute("src", "img/smiley_" + answers[i] + ".png");
		buttonImg.className = "smileyInactive";
		if (id == 0) {
			buttonImg.className = "smileyActive";
			linkButton
					.setAttribute("onClick", "doAnswer(" + id + "," + i + ")");
		}
		linkButton.appendChild(buttonImg);
		divAnswer.appendChild(linkButton);
	}
	return divAnswer;
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

function doAnswer(id, answerIndex) {
	saveAnswerLocal(id, answerIndex);
	fadeOutAnsweredQuestion(id, answerIndex);
	if (lastQuestion(id)) {
		sendAnswer();
		showThanks();
		return;
	}

	fadeInNewQuestion(id + 1);
}

function saveAnswerLocal(id, answerIndex){
	var newAnswer={
		question:questions[id],
		answer:answers[answerIndex]
	};
	givenAnswers.push(newAnswer);
}

function reloadPageAfterMillis(millis) {
	setTimeout(function() {
		location.reload();
	}, millis);
}

function showThanks() {

	$('#thanksModal').modal({
		backdrop : 'static',
		keyboard : false
	});
	$("#thanksModal").modal("show");
	
}
function sendAnswer() {
    console.log("sendAnswer called");

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://combewertung.azurewebsites.net/api/speichereBewertung", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            reloadPageAfterMillis(2000);
            document.getElementById("thanksText").innerHTML="Vielen Dank für Ihre Teilnahme!"
        }
    }
    xhr.send(JSON.stringify({
        stationId: station,stationShort:stationShort, name: stationTitle ,answers: givenAnswers
    }));
}
function lastQuestion(id) {
	return id == questions.length - 1;
}

function fadeInNewQuestion(id) {
	var answersneu = document.getElementById("answerContainer" + id).children;

	for (var index = 0; index < 4; index++) {
		answersneu[index].children[0].className = "smileyActive";
		answersneu[index].setAttribute("onClick", "doAnswer(" + id + ","
				+ (index) + ")");
	}

	document.getElementById("question" + id).className = classQuestionActive;
}

function fadeOutAnsweredQuestion(id, answerIndex) {
	var answersalt = document.getElementById("answerContainer" + id).children;
	for (var index = 0; index < 4; index++) {
		if (index != answerIndex) {
			answersalt[index].children[0].setAttribute("src", "img/smileyGrey_"
					+ answers[(index)] + ".png");

		}
		answersalt[index].removeAttribute("onClick");
		answersalt[index].children[0].className = "smileyInactive";
	}

	document.getElementById("question" + (id)).className = classQuestionInactive;
}

window.onload = function main() {
	station = getQueryVariable("station");

    $.getJSON("data/questions.json", function (obj) {
            stationTitle=obj[station].titel;
		document.getElementById("standName").innerHTML=stationTitle;
        document.title=stationTitle;
			stationShort = obj[station].stand;
            questions=obj[station].questions;
             for ( var question in questions) {
                 addQuestion(questions[question], question);
          }
    });
};
