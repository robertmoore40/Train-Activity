var config = {
    apiKey: "AIzaSyDKSDYYtgXrI2oAFTsDv-o_roZdD5J_kzs",
    authDomain: "homework-7-a98c1.firebaseapp.com",
    databaseURL: "https://homework-7-a98c1.firebaseio.com",
    storageBucket: "homework-7-a98c1.appspot.com"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  
  // 2. Button for adding Employees
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();
    var trainFirstTime = moment($("#firstTime-input").val().trim(),"HH:mm").format("HH:mm");;
    console.log(trainFirstTime);
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      frequency: trainFrequency,
      firstTime: trainFirstTime
    };
    // Uploads employee data to the database
    database.ref().push(newTrain);
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.frequency);
    console.log(newTrain.firstTime);
    alert("Train successfully added");
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");
    $("#firstTime-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainFrequency = childSnapshot.val().frequency;
    var trainFirstTime = childSnapshot.val().firstTime;
  
    // Train
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainFrequency);
    console.log(trainFirstTime);
  
    var firstTrainTime = moment(trainFirstTime, "HH:mm");
    console.log(firstTrainTime);
    console.log(typeof firstTrainTime);
  
    var timeDifference = moment().diff(moment(firstTrainTime), "minutes");
    console.log(timeDifference);
    var timeTill = timeDifference % trainFrequency;
    console.log(timeTill);
    var minutesTillNextTrain = trainFrequency - timeTill;
    console.log(minutesTillNextTrain);
  
    var nextTrainTimeMilitary = moment().add(minutesTillNextTrain, "minutes").format("HH:mm");
    
  //   // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainFrequency),
      $("<td>").text(nextTrainTimeMilitary),
      $("<td>").text(minutesTillNextTrain),    
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });