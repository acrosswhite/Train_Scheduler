var config = {
    apiKey: "AIzaSyA3YJ1GNc6yfZRuG0VZj_1UqiOUDMeFezc",
    authDomain: "train-scheduler-733fa.firebaseapp.com",
    databaseURL: "https://train-scheduler-733fa.firebaseio.com",
    projectId: "train-scheduler-733fa",
    storageBucket: "train-scheduler-733fa.appspot.com",
    messagingSenderId: "237846650288"
  };
  firebase.initializeApp(config);

  var trainName = "";
  var destination = "";
  var frequency = "";
  var firstTrain = "";
  var currentTime = moment();
  var nextArrival = 0;
  var minutesAway = 0;
  var nextArrivalformatted = "";


$("#add-train-btn").on("click", function(event){
	event.preventDefault();

	trainName = $("#train-name-input").val().trim();
	destination = $("#destination-input").val().trim();
	frequency = $("#frequency-input").val().trim();
	firstTrain = $("#first-train-input").val().trim();

	timeConverter ();

	var newTrain = {
		name: trainName,
		trainDestination: destination,
		trainFrequency: frequency,
		trainStart: firstTrain,
		nextTrain: nextArrivalformatted,
		minutesToArrival: minutesAway
		};

	console.log(newTrain);

	firebase.database().ref().push(newTrain);

	$("#train-name-input").val("");
	$("#destination-input").val("");
	$("#frequency-input").val("");
	$("#first-train-input").val("");

});

firebase.database().ref().on("child_added", function(childSnapshot){
	console.log(childSnapshot);

	var trainName = childSnapshot.val().name;
	var destination = childSnapshot.val().trainDestination;
	var frequency = childSnapshot.val().trainFrequency;
	var nextArrivalOfTrain = childSnapshot.val().nextTrain;
	var minutesToTrainArrival = childSnapshot.val().minutesToArrival;

	$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency
	 + "</td><td>" + nextArrivalOfTrain + "</td><td>" + minutesToTrainArrival + "</td></tr>");

});

//find current time and parse to military time
var currentTimeMilitary = function (){
	console.log(currentTime);
	return moment().format("HH:MM");
};

//function secondsSince (){
	//difference between current time and some past time value
	//var currentTimeDuration = moment.duration(currentTimeMilitary());
	//var timetableDuration = moment.duration("10:00");


	//var difference = timetableDuration.subtract(currentTimeDuration);
	//return moment.utc(difference.asMinutes()).format("HH:MM");


//};

//calculate the first train time * frequency of the train

//for each train on each day loop through the timetable 
// if time = time then train arrived and minutes remaining is 0
//if time (c) > timetable train is gone 
//if time (c) < timetable train is arriving in ct - tt minutes (break loop here)
//update this to html

function timeConverter (){
	var firstTrainTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
	var difference = moment().diff(moment(firstTrainTimeConverted), "minutes");
	var remainder = difference % frequency;
	minutesAway = frequency - remainder;
	nextArrival = moment().add(minutesAway, "minutes");
	nextArrivalformatted = moment(nextArrival).format("HH:mm");
};








//use settimeout to refresh the time pages
