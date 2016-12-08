// Initialize Firebase
var config = {
    apiKey: "AIzaSyC585hLdaNPpXSIlKEsGLQtWdl1geE0DvY",
    authDomain: "train-scheduler-10459.firebaseapp.com",
    databaseURL: "https://train-scheduler-10459.firebaseio.com",
    storageBucket: "train-scheduler-10459.appspot.com",
    messagingSenderId: "79763209333"
};
firebase.initializeApp(config);

var database = firebase.database();

//Variables
var trainName = "";
var destination = "";
var frequency;
var minutesAway;
var firstTrainTime;

$('#submit').on("click", function() {
    // body...
    trainName = $('#trainName').val().trim();
    destination = $('#destination').val().trim();
    frequency = $('#frequency').val().trim();
    firstTrainTime = moment($('#first-train-time').val().trim(), "HH:mm").format("X");
    console.log("firstTrainTime " + firstTrainTime);
    var arrival = moment(firstTrainTime, "hh:mm").subtract(1, "years"); //move 1 year back

    var currentTime = moment();
    // console.log("time now ----" + currentTime);
    console.log("hhhhhmmmmmm-- " + moment(currentTime).format("hh:mm"));


    var difference = moment().diff(moment(arrival), "minutes");
    console.log("difference -- " + difference);

    // time away -
    var remTime = difference % frequency;
    console.log("time rem " + remTime);

    var minutesAway = frequency - remTime;

    // next train arrival
    var nextTrain = moment().add(minutesAway, "minutes");

    console.log("next arrival " + moment(nextTrain).format("hh:mm"));

    var reachingTime = moment(nextTrain).format("hh:mm");

    // ------------------------------
    console.log("trainName " + trainName + "destination " + destination +
        "frequency" + frequency);

    database.ref().push({
        trainName: trainName,
        destination: destination,
        frequency: frequency,
        reachingTime: reachingTime,
        minutesAway: minutesAway

    }); //push ends

    $('#trainName').val("");
    $('#destination').val("");
    $('#firstTrainTime').val("");
    $('#frequency').val("");
    return false;
}); //submit click function ends

// Display on Dom from the database


database.ref().on('child_added', function(snapshot) {
    $('#trainList').append('<tr><td>' + snapshot.val().trainName +
        '</td><td>' + snapshot.val().destination +
        '</td><td>' + snapshot.val().frequency +
        '</td><td>' + snapshot.val().reachingTime +
        '</td><td>' + snapshot.val().minutesAway + '</td></tr>');
});
