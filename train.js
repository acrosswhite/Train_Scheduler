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
  var trains = [];


$("#add-train-btn").on("click", function(event){
	event.preventDefault();

	trainName = $("#train-name-input").val().trim();
	destination = $("#destination-input").val().trim();
	frequency = $("#frequency-input").val().trim();
	firstTrain = $("#first-train-input").val().trim();



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
	var startTime = childSnapshot.val().trainStart;
	var nextArrivalOfTrain = timeChange(startTime, frequency).nextTrain;
	var minutesToTrainArrival = timeChange(startTime, frequency).minutesAway;
	trains.push(childSnapshot.val());

	$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency
	 + "</td><td class='arrival'>" + nextArrivalOfTrain + "</td><td class='minutes'>" + minutesToTrainArrival + "</td></tr>");

});



/*function timeConverter (){
	var firstTrainTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
	var difference = moment().diff(moment(firstTrainTimeConverted), "minutes");
	var remainder = difference % frequency;
	minutesAway = frequency - remainder;
	nextArrival = moment().add(minutesAway, "minutes");
	nextArrivalformatted = moment(nextArrival).format("HH:mm");
	console.log(nextArrivalformatted);
	return {
		na: nextArrivalformatted,
		ma: minutesAway
	};
};*/

function timeChange (startTime, frequency){
	var startTimeMoment = moment(startTime, "HH:mm");
	var currentTime = moment();
	while (startTimeMoment.isBefore(currentTime)){
		startTimeMoment = startTimeMoment.add(frequency, "minutes");
	}

	var difference = startTimeMoment.diff(moment(), "minutes");
	//var remainder = difference % freequency;
	//minutesAway = frequency - remainder;
	//nextArrival = moment().add(minutesAway, "minutes");
		return {
			nextTrain: startTimeMoment.format("HH:mm"),
			minutesAway: difference
		}
}

$("#refresh-button").on("click", function(){

	$("#train-table > tbody").empty();

	for (var i = 0; i < trains.length; i++) {
		var tableRow = trains[i];
		console.log(tableRow)

	
	$("#train-table > tbody").append("<tr><td>" + tableRow.name + "</td><td>" + tableRow.trainDestination + 
		"</td><td>" + tableRow.trainFrequency
	   + "</td><td class='arrival'>" + timeChange(tableRow.trainStart, tableRow.trainFrequency).nextTrain + 
	   "</td><td class='minutes'>" + timeChange(tableRow.trainStart, tableRow.trainFrequency).minutesAway + 
	   "</td></tr>");
	};

});

setTimeout (function (){

	$("#train-table > tbody").empty();

	for (var i = 0; i < trains.length; i++) {
		var tableRow = trains[i];
		console.log(tableRow)

	
	$("#train-table > tbody").append("<tr><td>" + tableRow.name + "</td><td>" + tableRow.trainDestination + 
		"</td><td>" + tableRow.trainFrequency
	   + "</td><td class='arrival'>" + timeChange(tableRow.trainStart, tableRow.trainFrequency).nextTrain + 
	   "</td><td class='minutes'>" + timeChange(tableRow.trainStart, tableRow.trainFrequency).minutesAway + 
	   "</td></tr>");
	};

}, 60000);



