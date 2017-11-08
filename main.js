document.addEventListener("DOMContentLoaded", function() {

	var outputWrapper=document.querySelector(".js-twitch-output"),
			triggers=document.querySelectorAll(".js-filter-status");

console.log(triggers);


	var requestData = {
     clientID : "l474jl9t8k6vb1cyvtmlljrn90i7r7",
     clientSecret : "1otcv927vx32p06bse3mznppnbi4nj",
     queries : [
        "ESL_SC2",
        "OgamingSC2",
        "cretetion",
        "freecodecamp",
        "storbeck",
        "habathcx",
        "RobotCaleb",
        "noobs2ninjas"
    ],
     API:  "https://api.twitch.tv/kraken/search/streams"

	}



var channelsData=new Array;

requestData.queries.forEach(function (el) {

return	sendRequest(el,channelsData,requestData);

});

// console.log(channelsData);





triggers.forEach(function(el) {

el.addEventListener('click', function(event) {

console.log(event.currentTarget.getAttribute('data-filter-status'));

switch (event.currentTarget.getAttribute('data-filter-status')) {

		case 'online':
		showOnline(outputWrapper,channelsData);
		break;
		case 'offline':
		showOffline(outputWrapper,channelsData);
		break;
	default:
		showAll(outputWrapper,channelsData);
		break;
}

})

});






});



// ====================================
// send rquest


function sendRequest(streamChannel, responseArray, requestParams) {
		var  arrayOfResponses=responseArray;
    var url = requestParams.API + "/?query=" + streamChannel + "&client_id=" + requestParams.clientID +
        "&client_secret" + requestParams.clientSecret + "?callback=?";

    function createCORSRequest(method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {

            // Check if the XMLHttpRequest object has a "withCredentials" property.
            // "withCredentials" only exists on XMLHTTPRequest2 objects.
            xhr.open(method, url, true);

        } else if (typeof XDomainRequest != "undefined") {

            // Otherwise, check if XDomainRequest.
            // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
            xhr = new XDomainRequest();
            xhr.open(method, url);

        } else {

            // Otherwise, CORS is not supported by the browser.
            xhr = null;

        }
        return xhr;
    }

    var xhr = createCORSRequest('GET', url);
    if (!xhr) {
        throw new Error('CORS not supported');
    }
    // Response handlers.
    xhr.onload = function() {
        var text = xhr.responseText;
        var parsedJSON = JSON.parse(text);
        // console.log(parsedJSON);
        fillResponseArray(parsedJSON,arrayOfResponses);

    };

    xhr.onerror = function() {

        console.log('Woops, there was an error making the request.');
    };

    xhr.send();
}


function fillResponseArray(object,array) {

let el=object;

array.push(el);

return array;
}


function 	showOnline(output,data) {


let outputHTML='<div class="output-wrapper__item"><div class="stream">'+
	'<a href="" class="stream__link">'+
	'<div class="stream__img" style="background-image: ; background-size: cover"></div>'+
	'<h3 class="stream__heading"></h3></a></div></div>';


output.html=outputHTML;

}