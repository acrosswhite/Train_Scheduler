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
  var currentTime = moment();
  var nextArrival = 0;
  var minutesAway = 0;


$("#add-train-button").on("click", function(event){
	event.preventDefault();

	trainName = $("#train-name-input").val().trim();
	destination = $("#destination").val().trim();
	frequency = $("#frequency").val().trim();

	var newTrain = {
		name: trainName,
		trainDestination: destination,
		trainFrequency: frequency,
		};

	console.log(newTrain);

	database.ref().push(newTrain);

	$("#trainName").empty();
	$("#destination").empty();
	$("#frequency").empty();
});

