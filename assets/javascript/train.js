// Initialize Firebase
var config = {
  apiKey: "AIzaSyCdJzK9_TremO4_gA18kXt91Odalr5hSvc",
  authDomain: "myfirstproject-b04dd.firebaseapp.com",
  databaseURL: "https://myfirstproject-b04dd.firebaseio.com",
  projectId: "myfirstproject-b04dd",
  storageBucket: "myfirstproject-b04dd.appspot.com",
  messagingSenderId: "94314040395"
};
firebase.initializeApp(config);
var database = firebase.database();

// Initialize variables
var name = "";
var destination = "";
var time = "";
var frequency = "";
var nextTrain = "";
var tMinutesTillTrain = "";

// Submit button and push data to database.
$("#submitButton").on("click", function(event){
  event.preventDefault();

  name = $("#name-input").val().trim();
  destination = $("#destination-input").val().trim();
  time = $("#time-input").val().trim();
  frequency = $("#frequency-input").val().trim();

  var timeConverted = moment(time, "hh:mm").subtract(1, "years");
  console.log(timeConverted);

  var currentTime = moment();
  console.log("Current Time: " + moment(currentTime).format("hh:mm"));

  var diffTime = moment().diff(moment(timeConverted), "minutes");
  console.log("Difference in Time: " + diffTime);

  var tRemainder = diffTime % frequency;
  console.log(tRemainder);

  var tMinutesTillTrain = frequency - tRemainder;
  console.log("minutes till train: " + tMinutesTillTrain);

  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("arrival time: " + moment(nextTrain).format("hh:mm"));
  var nextArrival = moment(nextTrain).format("hh:mm");

  database.ref().push({
    name: name,
    destination: destination,
    time: time,
    frequency: frequency,
    nextArrival: nextArrival,
    tMinutesTillTrain: tMinutesTillTrain
  })
})

database.ref().on("child_added", function(snapshot){
$(".table").append('<tr><td class="tableName2">' + snapshot.val().name +
  '</td><td class="tableDestination2">' + snapshot.val().destination +
  '</td><td class="tableFrequency2 text-center">' + snapshot.val().frequency +
  '</td><td class="tableNextTrain2 text-center">' + snapshot.val().nextArrival +
  '</td><td class="tableMinutesTillTrain2 text-center">' + snapshot.val().tMinutesTillTrain);
})

// pull from database and put on html page.
