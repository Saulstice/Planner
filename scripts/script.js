// Adding current date and specifying current hour
var today = Date.today().toString("dddd, MMMM dS, yyyy")
$('#currentDay').text(today);
var now = new Date();
console.log("Today is: " + today);
console.log("Right now is: " + now)


// Calculating how many hours left/past in day
var hoursLeft; 
if(now.toString("tt") == "AM") {
    hoursLeft = 24 - parseInt(now.toString("hh"));
} else{
    hoursLeft = 12 - parseInt(now.toString("hh"));
}

var hoursPast;
if(now.toString("tt") == "AM") {
    hoursPast = parseInt(now.toString("hh"));
} else{
    hoursPast = 12 + parseInt(now.toString("hh"));
}

console.log("Hours left in day: " + hoursLeft);
console.log("Hours Past in day: " + hoursPast);


// create array for hours of the day based on hours past/left
var hours = [];
for(var i =-hoursPast; i < hoursLeft; i++){
    var nownow = new Date();
    hours.push(nownow.addHours(i));
}

// For each hour create a timeblock with hour and save button displayed 
$.each(hours, function (index, value) { 
    var timeSlotDiv = $('<div class="input-group mb-3 row">');
    var timeSlotInput = $('<input type="text" class="form-control" placeholder="Add Event" aria-label="Add Event" aria-describedby="button-addon2">');
    timeSlotInput.attr("number", index);
    var timeSlotAdd = $('<div class="input-group-append">');
    var timeSlotHour = $('<div class="input-group-prepend"></div>')
    var timeSlotSpan = $('<span class="input-group-text hour">')
    timeSlotHour.append(timeSlotSpan);
    timeSlotSpan.text(hours[index].toString("hh tt"));
    var timeSlotButton = $('<button class="btn saveBtn" type="button">Save</button>');
    timeSlotDiv.append(timeSlotInput);
    timeSlotDiv.append(timeSlotAdd);
    timeSlotDiv.append(timeSlotButton);
    timeSlotDiv.prepend(timeSlotHour);
    if(index == hoursPast){
        timeSlotInput.addClass("present");
    }else if(index > hoursPast){
        timeSlotInput.addClass("future");
    }else {
        timeSlotInput.addClass("past");
    }
    $(".container").append(timeSlotDiv);
});

//function to populate planner with previously saved events
function renderSavedEvent() {
    $.each($(".form-control"), function (index, value) { 
        var myNum = $(this).attr("number");
        $(this).val(localStorage.getItem(myNum));
    });
  }

// Create array that will hold text for each saved event
var items = new Array(24);

//When you click save button get index of that timeblock, and save text of items array at that timeblock's index to storage
  $(".saveBtn").on("click", function(event) {
      event.preventDefault();
      var thisNum = parseInt($(this).siblings(".form-control").attr("number"));
      items[thisNum]= $(this).siblings(".form-control").val();
      localStorage.setItem(thisNum, items[thisNum]);
  });

// populate planner with saved events
renderSavedEvent();