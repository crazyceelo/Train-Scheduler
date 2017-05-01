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

// Submit button and push data to database.
$("#submitButton").on("click", function(event){
  event.preventDefault();

  name = $("#name-input").val().trim();
  destination = $("#destination-input").val().trim();
  time = $("#time-input").val().trim();
  frequency = $("#frequency-input").val().trim();

  database.ref().push({
    name: name,
    destination: destination,
    time: time,
    frequency: frequency
  })
})

// pull from database and put on html page.
database.ref().on("child_added", function(snapshot){
  $(".table").append('<tr><th class="tableName2">' + snapshot.val().name +
    '</th><th class="tableDestination2">' + snapshot.val().destination +
    '</th><th class="tableFrequency2 text-center">' + snapshot.val().frequency +
    '</th><th class="tableNext"></th>' +
    '<th class="tableMinutes"></th>');


// need to figure out how moment.js works
// // http://uci.bootcampcontent.com/UCI-Coding-Bootcamp/03-17-Class-Content/tree/master/uci20170313-m_w/07-firebase/1-Class-Content/7.3/Activities/01-TimeSheet
})