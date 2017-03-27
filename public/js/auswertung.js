/**
 * Created by roody on 24.03.17.
 */


function addResults(result,gesamt) {
    var divContainer = document.getElementById("resultContainer");

    var divResult = document.createElement("div");

    var h3Question = document.createElement("h3");
    h3Question.innerHTML=result.frage;
    divResult.appendChild(h3Question);

    var quotaPositiv = ((result.positiv/gesamt)*100).toFixed(2);
    var quotaMittel = ((result.mittel/gesamt)*100).toFixed(2);
    var quotaNegaitv = ((result.negativ/gesamt)*100).toFixed(2);
    var quotaKeine = ((result.keine/gesamt)*100).toFixed(2);

    var pQuota = document.createElement("p");
    pQuota.innerHTML= "davon Positiv "+ result.positiv+" ("+quotaPositiv+"%) </br></br>" +
        "davon Mittel "+ result.mittel+" ("+quotaMittel+"%) </br></br>" +
        "davon Negativ "+ result.negativ+" ("+quotaNegaitv+"%) </br></br>" +
        "davon keine Antwort "+ result.keine+" ("+quotaKeine+"%) </br></br>"

    divResult.appendChild(pQuota);
    divContainer.appendChild(divResult);
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
        "http://combewertung.azurewebsites.net/api/getBewertung",
        {id : station},
        function(data) {
            document.getElementById("standName").innerHTML=data.name;
            document.getElementById("gesamtAnzahl").innerHTML="Antworten Gesamt: "+data.gesamt;
            document.title="Auswertung";
            for( var result in data.responses){
                addResults(data.responses[result],data.gesamt)
            }

        }
    );

};