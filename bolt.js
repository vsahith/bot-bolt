$('head').append('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
$('head').append('<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">');
$('head').append('<link rel="stylesheet" type="text/css" ng-href="https://gitlab.com/nvk777/bot-bolt/blob/master/bolt.css">');
$('head').append('<meta name="viewport" content="width=device-width, initial-scale=1">');
$('head').append('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">');
$('head').append('<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>');
$('head').append('<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>');
//$('body').append('<div class="w3-container"><h2>Circular Buttons</h2><button class="w3-button w3-xlarge w3-circle w3-black">+</button></div>');
//document.body.innerHTML += '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">';
document.body.innerHTML += '<div class="w3-container"><button onclick="botpop()" data-toggle="modal" data-target="#myModal" class="w3-button w3-xlarge w3-circle w3-black">+</button></div>';

//$('body').append('<div class="container"><h2>Modal Example</h2><button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button><div class="modal fade" id="myModal" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Modal Header</h4></div><div class="modal-body"><p>Some text in the modal.</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div></div></div></div></div>');

var recognition;
var output_class = "#message"
var flags = {}
var base_url = getBaseURL()

function getBaseURL() {
    return 'http://tina.qa.darwinbox.io'
}

var cdn = "https://cdn.rawgit.com/vedantvohra1/bot-bolt/master/init/"

var queryString = window.location.search;
console.log(queryString)
if (queryString != "") {
    var init = localStorage.getItem("init")
    console.log(init)
    if (init) {
        $('head').append('<script src="' + cdn + init + '.js"></script>')
        var entities = JSON.parse(localStorage.getItem("entities"))
        init(entities)
    }
}



function message() {
    $('.modal-body').empty()
    var text = $('#message').val();
    document.getElementById('message').value = "";
    var d = new Date(),
        h = (d.getHours() < 10 ? '0' : '') + d.getHours(),
        m = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    var time = h + ':' + m;
    console.log(text);
    if (text != "") {
        $('#messages').append('<div class="container darker"><img src="https://rawgit.com/vedantvohra1/bot-bolt/master/tony.jpg" alt="Avatar" style="width:5%;height:5%;" class="right" style="width:100%;"><p>' + text + '</p><span class="time-left">' + time + '</span></div>');
        $('.modal-body').html("Please wait...")
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/query?q=" + encodeURIComponent(text),
            success: function(response) {
                console.log(response)

                if (response.url) {
                    var url = base_url + response.url
                    localStorage.setItem("init", response.init)
                    localStorage.setItem("entities", JSON.stringify(response.entities))
                    $('.modal-body').empty()
                    $('.modal-body').append('<iframe frameBorder="0" src = "' + url + '?q=apply_leave" width = "100%" height = "70%">Sorry your browser does not support inline frames.</iframe>');
                } else {
                    $('.modal-body').empty()
                    botsay("Hmm... I'm sorry, could you say that again?")
                    trigger_speech_recognition()
                }

                scrollToBottom()
            }
        });
    }
}

function scrollToBottom() {
    $('html, body').animate({
        scrollTop: $(document).height()
    });
}


function botpop() {
    voiceInit();
    localStorage.clear()
    console.log("bot is init");
    $('body').append('<div class="modal fade" id="myModal" role="dialog"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><div id="messages"></div></div><div class="modal-body"></div><div id="reqblock" class="modal-footer"></div></div></div></div></div>');
    $("#messages").empty();
    botsay("Hey! How can I help?")
    $("#reqblock").empty();
    $(".modal-body").empty()
    $('#reqblock').append('<input type="text" id="message">');
    $('#reqblock').append('<button id="callbot" type="button" class="btn btn-default" >Record</button>');
    $('#reqblock').append('<button id="textsubmit" type="button" class="btn btn-default" >submit</button>');
    $("#callbot").click(function() {
        if (flags.listening == false) {
            trigger_speech_recognition()
        } else if (flags.listening == true) {
            stop_speech_recognition()
        }
    });
}

var voiceInit = () => {
    flags.listening = false

    try

    {

        recognition = new(window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition || SpeechRecognition || webkitSpeechRecognition)();

    } catch (e)

    {

        console.log("Your browser does not support speech recognition. Please use Chrome.", e);

    }
}

function botsay(message) {
    var d = new Date(),
        h = (d.getHours() < 10 ? '0' : '') + d.getHours(),
        m = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    var time = h + ':' + m;
    console.log(time);

    $('#messages').append('<div class="container lighter"><img src="https://rawgit.com/vedantvohra1/bot-bolt/master/jarvis.png" alt="Avatar" style="width:5%;height:5%;"><p>' + message + '</p><span class="time-right">' + time + '</span></div>');
}

var voiceInit = () => {
    flags.listening = false

    try

    {

        recognition = new(window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition || SpeechRecognition || webkitSpeechRecognition)();

    } catch (e)

    {

        console.log("Your browser does not support speech recognition. Please use Chrome.", e);

    }
}

var getTextFromEvent = function(e)

{

    return event.results[0][0].transcript;

};

var trigger_speech_recognition = function()

{


    recognition.continuous = false;

    recognition.interimResults = true;

    recognition.lang = "en-US";

    recognition.maxAlternatives = 1;

    var t = $(output_class).val(); // existing text

    recognition.onresult = function(event) {

        var r = getTextFromEvent(event); // new word

        $(output_class).val(t + " " + r) //reads existing content and add new identified word with a space

    };

    recognition.onstart = function() {

        console.log("listening");
        flags.listening = true
        $('#callbot').html('Recording...')
    }



    recognition.onend = function() {

        flags.listening = false
        $('#callbot').html('Record')

        console.log("onend")
        if (flags.manual_intervention) {
            message()
            return;
        }

        trigger_speech_recognition();

    }



    recognition.onerror = function(event) {

        if (event.error == 'no-speech') {

            console.log('no-speech');

            stop_speech_recognition();

        };

    }

    recognition.start();


    recognition.onaudioend = function(event) {
        console.log("audioend");
        flags.manual_intervention = true
        stop_speech_recognition()
    }

};

var stop_speech_recognition = function(manual = false) {

    recognition.stop();
    flags.listening = false
    $('#callbot').html('Record')
};



console.log('working')