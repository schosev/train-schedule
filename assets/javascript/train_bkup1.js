$(document).ready(function() {

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

        var tableInfo = $("<tr>")
        tableInfo.append("<td>" + trainName + "</td>")
        tableInfo.append("<td>" + trainDest + "</td>")
        tableInfo.append("<td>" + trainFreq + "</td>")

        var firstTime = (trainTimeHour + ":" + trainTimeMin);

        // var minsAway = calcMinAway(trainTimeHour, trainTimeMin, trainFreq, cTimeTotalMin);
        // var nextArrival = calcNextArrival(minsAway, cTimeTotalMin);
        var minsAway = calcMinAway(firstTime, trainFreq);
        var nextArrival = calcNextArrival(minsAway);

        tableInfo.append("<td>" + nextArrival + "</td>")
        tableInfo.append("<td>" + minsAway + "</td>")

        $(".table").append(tableInfo);

    }

    // function calcMinAway(tTimeHour, tTimeMin, tFreq, tTotalMin) {
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


        //convert first time entered to total number of minutes
        //var tTimeTotalMin = (parseInt(tTimeHour * 60) + parseInt(tTimeMin));

        //!!!!!!!!! NEED TO DO COMPARE IF tTimeTotalMin > tTotalMin TO SEE IF FIRST TRAIN TIME IS AFTER
        //!!!!!!!!! CURRENT TIME.....IF SO NEED TO FIGURE OUT THAT LOGIC

        //calculate how far away the train is and the arrival time
        // var timeDiff = tTotalMin - tTimeTotalMin;
        // var divideTotal = (timeDiff / tFreq);
        // var remainder = (divideTotal % 1);
        // var minFrac = Math.floor(remainder * tFreq);
        // var farAway = tFreq - minFrac;  //this is how many minutes away the train is
        // return farAway;
    }

    //function calcNextArrival (howFarAway, cTotalMin) {
    function calcNextArrival (howFarAway) {

        // Next Train
    var nextTrain = moment().add(howFarAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    return moment(nextTrain).format("hh:mm a");

        // var totalMinArrive = cTotalMin + howFarAway;
        // var arriveTimeFrac = totalMinArrive / 60;
        // var arriveTimeRemainder = (arriveTimeFrac % 1);
        // var arriveTimeMin = Math.floor(arriveTimeRemainder * 60);  //check that minutes are rounded correctly
        // var arriveTimeHour = Math.floor(arriveTimeFrac);
        // var arrivalTime = arriveTimeHour + ":" + arriveTimeMin;  // this is the next arrival time
        // return arrivalTime;
                
    }

    $("#submit-button").on("click", function() {
        event.preventDefault();

        getValues();

    }) 

    
});