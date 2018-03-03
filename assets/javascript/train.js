$(document).ready(function() {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCUI-aQG9C9NOUWsPRcSTVFcVX82A08Y7g",
        authDomain: "joseph-firebase-project.firebaseapp.com",
        databaseURL: "https://joseph-firebase-project.firebaseio.com",
        projectId: "joseph-firebase-project",
        storageBucket: "joseph-firebase-project.appspot.com",
        messagingSenderId: "513762594275"
    };
    firebase.initializeApp(config);

    // Create a variable to reference the database.
    var database = firebase.database();

    var initialLoad = true;

    function getValues() {

        var trainName = $("#train-name").val().trim();
        var trainDest = $("#destination").val().trim();
        var trainTimeHour = $("#train-time-hour").val().trim();
        var trainTimeMin = $("#train-time-min").val().trim();
        var trainFreq = $("#frequency").val().trim();

        if (trainTimeHour > 24 || trainTimeHour < 0) {
            alert("Hours have to be between 0 and 24");
            return
        }
         else if (trainTimeMin > 59 || trainTimeMin < 0) {
            alert("Minutes have to be between 0 and 59");
            return
        }else if (trainFreq <= 0) {
            alert("Train Frequency has to be greater than 0");
            return
        }

        // var tableInfo = $("<tr>")
        // tableInfo.append("<td>" + trainName + "</td>")
        // tableInfo.append("<td>" + trainDest + "</td>")
        // tableInfo.append("<td>" + trainFreq + "</td>")

        var firstTime = (trainTimeHour + ":" + trainTimeMin);

        var minsAway = calcMinAway(firstTime, trainFreq);
        var nextArrival = calcNextArrival(minsAway);

        // tableInfo.append("<td>" + nextArrival + "</td>")
        // tableInfo.append("<td>" + minsAway + "</td>")

        // $(".table").append(tableInfo);

        database.ref().push ({
            name: trainName,
            destination: trainDest,
            freq: trainFreq,
            arrival: nextArrival,
            minAway: minsAway,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        })

        $("#train-name").val("");
        $("#destination").val("");
        $("#train-time-hour").val("");
        $("#train-time-min").val("");
        $("#frequency").val("");

    }

    function calcMinAway(tFirstTime, tFreq) {

        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(tFirstTime, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);

        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // Difference between the times
        var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + timeDiff);

        // Time apart (remainder)
        var tRemainder = timeDiff % tFreq;
        console.log(tRemainder);

        // Minute Until Train
        var farAway = tFreq - tRemainder;
        console.log("MINUTES TILL TRAIN: " + farAway);
        return farAway;
    }

    function calcNextArrival (howFarAway) {

        // Next Train
        var nextTrain = moment().add(howFarAway, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
        return moment(nextTrain).format("hh:mm a");
                
    }

    // function addTableRow (lv) {
    //     var tableInfo = $("<tr>")
    //         tableInfo.append("<td>" + lv.name + "</td>")
    //         tableInfo.append("<td>" + lv.destination + "</td>")
    //         tableInfo.append("<td>" + lv.freq + "</td>")
    //         tableInfo.append("<td>" + lv.arrival + "</td>")
    //         tableInfo.append("<td>" + lv.minAway + "</td>")

    //         $(".table").append(tableInfo);
    //}

    $("#submit-button").on("click", function(event) {
        event.preventDefault();

        getValues();

    }) 

    if (initialLoad) {
        database.ref().orderByChild("dateAdded").on("child_added", function(snapshot) {
            console.log("inital load");
            var lv = snapshot.val();
            console.log(lv.name);

            var tableInfo = $("<tr>");
            tableInfo.append("<td>" + lv.name + "</td>");
            tableInfo.append("<td>" + lv.destination + "</td>");
            tableInfo.append("<td>" + lv.freq + "</td>");
            tableInfo.append("<td>" + lv.arrival + "</td>");
            tableInfo.append("<td>" + lv.minAway + "</td>");

            $(".table").append(tableInfo);
            //addTableRow (lv1);
            initialLoad = false;
    
            // Handle the errors
        }, function(errorObject) {
            console.log("Errors handled: " + errorObject.code);
        });
    }
     else {
         database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
            // storing the snapshot.val() in a variable for convenience
            var sv = snapshot.val();
            
            var tableInfo = $("<tr>")
            tableInfo.append("<td>" + sv.name + "</td>")
            tableInfo.append("<td>" + sv.destination + "</td>")
            tableInfo.append("<td>" + sv.freq + "</td>")
            tableInfo.append("<td>" + sv.arrival + "</td>")
            tableInfo.append("<td>" + sv.minAway + "</td>")

            $(".table").append(tableInfo);

            //addTableRow ();

            // Handle the errors
        }, function(errorObject) {
            console.log("Errors handled: " + errorObject.code);
        });
    }
    
});