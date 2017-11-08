document.addEventListener("DOMContentLoaded", function() {
    var clientID = "l474jl9t8k6vb1cyvtmlljrn90i7r7";
    var clientSecret = "1otcv927vx32p06bse3mznppnbi4nj";
    var streams = [
        "ESL_SC2",
        "OgamingSC2",
        "cretetion",
        "freecodecamp",
        "storbeck",
        "habathcx",
        "RobotCaleb",
        "noobs2ninjas"
    ];



var channelsData=new Array;


streams.forEach(function (el) {
return	sendRequest(el);

})



function sendRequest(streamChannel) {





    var url = " https://api.twitch.tv/kraken/search/streams/?query=" + streamChannel + "&client_id=" + clientID +
        "&client_secret" + clientSecret + "?callback=?";


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
        console.log(parsedJSON);
        fillResponseArray(parsedJSON);

    };

    xhr.onerror = function() {

        console.log('Woops, there was an error making the request.');
    };

    xhr.send();



}





function fillResponseArray(parsedJSON) {


let singeChannelData=parsedJSON;
console.log(singeChannelData);
channelsData.push(singeChannelData);
return channelsData;
}

console.log(channelsData);


});



