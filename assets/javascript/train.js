$(document).ready(function() {

    function getValues() {

        var trainName = $("#train-name").val().trim();
        var trainDest = $("#destination").val().trim();
        var trainTime = $("#train-time").val().trim();
        var trainFreq = $("#frequency").val().trim();

        calcMinAway(trainTime, trainFreq);

        var tableInfo = $("<tr>")
        tableInfo.append("<td>" + trainName + "</td>")
        tableInfo.append("<td>" + trainDest + "</td>")
        tableInfo.append("<td>" + trainFreq + "</td>")

        $(".table").append(tableInfo);

    }

    function calcMinAway(tTime, tFreq) {
        //get current time
        var dt = new Date();
        //var cTime = dt.getHours() + ":" + dt.getMinutes();

        console.log("first time: " + tTime);
        console.log("freq " + tFreq);

        //convert first time entered to total number of minutes
        var tTimeHour = parseInt(tTime.substr(0, 2));
        var tTimeMin = parseInt(tTime.substr(3, 2));
        var tTimeTotalMin = (tTimeHour * 60) + tTimeMin;

        //convert current time to total number of minutes
        var cTimeTotalMin = (dt.getHours() * 60) + dt.getMinutes();

        //calculate how far away the train is and the arrival time
        var timeDiff = cTimeTotalMin - tTimeTotalMin;
        var divideTotal = (timeDiff / tFreq);
        var remainder = (divideTotal % 1).toFixed(10);
        var minFrac = Math.floor(remainder * tFreq);
        var farAway = tFreq - minFrac;  //this is how many minutes away the train is
        console.log("farAway " + farAway);
        var totalMinArrive = cTimeTotalMin + farAway;
        var arriveTimeFrac = totalMinArrive / 60;
        var arriveTimeRemainder = (arriveTimeFrac % 1).toFixed(10);
        var arriveTimeMin = Math.floor(arriveTimeRemainder * 60);  //check that minutes are rounded correctly
        var arriveTimeHour = Math.floor(arriveTimeFrac);
        var arrivalTime = arriveTimeHour + ":" + arriveTimeMin;  // this is the next arrival time
        console.log("arrivalTime " + arrivalTime);



        
    }

    $("#submit-button").on("click", function() {
        event.preventDefault();

        getValues();

    }) 

    
});