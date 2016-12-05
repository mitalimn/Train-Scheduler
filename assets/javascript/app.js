
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
var firstTrainTime;

$('#submit').on("click", function (){
	// body...
	trainName = $('#trainName').val().trim();
	destination = $('#destination').val().trim();
	console.log("trainName "+ trainName + "destination "+ destination);

	database.ref().push({
		trainName : trainName,
		destination : destination,
		// firstTrainTime : firstTrainTime,
		// frequency : frequency
	});//push ends

	$('#trainName').val("");
	$('#destination').val("");

	return false;
}); //submit click function ends

// Display on Dom from the database


database.ref().on('child_added', function(snapshot){
	console.log(snapshot.val().trainName);
	console.log(snapshot.val().destination);
	// console.log(snapshot.val().frequency);

	$('#trainList').append('<tr><td>' +snapshot.val().trainName+ 
		'</td><td>'+ snapshot.val().destination+ '</td>')

});