document.addEventListener("DOMContentLoaded", function() {

    var outputWrapper = document.querySelector(".js-twitch-output"),
        triggers = document.querySelectorAll(".js-filter-status");




    var requestData = {
        clientID: "l474jl9t8k6vb1cyvtmlljrn90i7r7",
        clientSecret: "1otcv927vx32p06bse3mznppnbi4nj",
        queries: [
            "ESL_SC2",
            "OgamingSC2",
            "cretetion",
            "freecodecamp",
            "storbeck",
            "geekandsundry",
            "RobotCaleb",
            "noobs2ninjas"
        ],
        API: "https://api.twitch.tv/kraken/search/streams",
        APIOff: "https://api.twitch.tv/kraken/search/channels"

    }



    var channelsData = new Array;

    requestData.queries.forEach(function(el) {

        return sendRequest(el, channelsData, requestData, true);

    });


    var streamsData = new Array;

    requestData.queries.forEach(function(el) {

        return sendRequest(el, streamsData, requestData);

    });
    // console.log(channelsData);





    triggers.forEach(function(el) {

        el.addEventListener('click', function(event) {

            // console.log(event.currentTarget.getAttribute('data-filter-status'));

            switch (event.currentTarget.getAttribute('data-filter-status')) {

                case 'online':
                    filterOnline(outputWrapper, streamsData);
                    break;
                case 'offline':
                    filterOffline(outputWrapper, channelsData);
                    break;
                default:
                    filterAll(outputWrapper, channelsData);
                    break;
            }

        })

    });






});



// ====================================
// send rquest


function sendRequest(streamChannel, responseArray, requestParams, offline) {
    var arrayOfResponses = responseArray;

    if (offline === true) {
        var url = requestParams.APIOff + "/?query=" + streamChannel + "&client_id=" + requestParams.clientID +
            "&client_secret=" + requestParams.clientSecret + "?callback=?";
    } else {
        var url = requestParams.API + "/?query=" + streamChannel + "&client_id=" + requestParams.clientID +
            "&client_secret=" + requestParams.clientSecret + "?callback=?";
    }


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
        fillResponseArray(parsedJSON, arrayOfResponses);

    };

    xhr.onerror = function() {

        console.log('Woops, there was an error making the request.');
    };

    xhr.send();
}


function fillResponseArray(object, array) {

    let el = object;

    array.push(el);

    return array;
}


function filterAll(output, data) {

let streamChannel = [];

    data.forEach(function(el) {

        el.channels.forEach(function(element, index) {

                streamChannel.push(element);

        });


    });

    HTMLToDOM(output, streamChannel, "all");




}


function filterOnline(output, data) {


    let streamChannel = [];


    data.forEach(function(el) {

        if (el.streams.length !== 0) {

            streamChannel.push(el);

            HTMLToDOM(output, streamChannel, 'online');

        }


    });


}


function filterOffline(output, data) {

    let streamChannel = [];

    data.forEach(function(el) {

        el.channels.forEach(function(element, index) {


            if (element.status === "") {

                // let streamChannel=element;

                streamChannel.push(element);

            }

        });


    });

    HTMLToDOM(output, streamChannel, "offline");

}














function HTMLToDOM(output, stream, status) {


    output.innerHTML = " ";


    console.log(stream);
    // console.log(stream);

    if (status === "online") {



        stream.forEach(function(el) {

            let outputBox = document.createElement('div');
            outputBox.className += ('output-wrapper__item');


            outputBox.innerHTML = '<div class="stream">' +
                '<a href="' + el.streams[0].channel.url + '" class="stream__link">' +
                '<div class="stream__left"> <div class="stream__img" style="background-image: url(' + el.streams[0].channel.logo + '); background-size: cover"></div></div>' +
                '<div class="stream__right"><h3 class="stream__heading">' + el.streams[0].game + '</h3>' +
                '<p class="stream__descr">' + el.streams[0].channel.status + '</p></div></a></div>';



            output.append(outputBox);



        });

    } else if (status === "offline") {

        stream.forEach(function(el) {

                let outputBox = document.createElement('div');
                outputBox.className += ('output-wrapper__item');


                outputBox.innerHTML = '<div class="stream stream_offline">' +
                    '<a href="' + el.url + '" class="stream__link">' +
                    '<div class="stream__left"> <div class="stream__img" style="background-image: url(http://fillmurray.com/150/150); background-size: cover"></div></div>' +
                    '<div class="stream__right"><h3 class="stream__heading">' + el.display_name + '</h3>' +
                    '</div></a></div>';



                output.append(outputBox);


            });

        } else if (status==="all") {

        	      stream.forEach(function(el) {

        	      	let statusClass="";

        	      	if(el.status==="") {
        	      		statusClass="offline"

        	      	} else {
        	      		statusClass="online"
        	      	}

                let outputBox = document.createElement('div');
                outputBox.className += ('output-wrapper__item');


                outputBox.innerHTML = '<div class="stream stream_'+statusClass+'">' +
                    '<a href="' + el.url + '" class="stream__link">' +
                    '<div class="stream__left"> <div class="stream__img" style="background-image: url(http://fillmurray.com/150/150); background-size: cover"></div></div>' +
                    '<div class="stream__right"><h3 class="stream__heading">' + el.display_name + '</h3>' +
                    '</div></a></div>';



                output.append(outputBox);


            });
        }
         else  {

            alert('Give me some stuff, hey!');
        }
        





    }