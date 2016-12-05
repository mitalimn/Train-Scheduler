
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
var nextArrival;
var minutesAway;

$('#submit').on("click", function (){
	// body...
	trainName = $('#trainName').val().trim();
	destination = $('#destination').val().trim();
	console.log("trainName "+ trainName + "destination "+ destination);
});
