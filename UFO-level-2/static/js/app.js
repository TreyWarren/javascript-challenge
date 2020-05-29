// Assign the data from `data.js` to a descriptive variable
var tableData = data;


// INITIAL LOAD: Load the unfiltered table when user first visits page
//▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
// Get a reference to the table body
var tbody = d3.select("tbody");

// Input the data
tableData.forEach(function(sighting) {
  
    // Step 1:  Use d3 to append one table row `tr` for each weather report object
    var row = tbody.append("tr");
    
    // Step 2:  Use `Object.entries` to console.log each sighting's details
    Object.entries(sighting).forEach(function([key, value]) {
      ////console.log(key, value);
      
      // Step 3: Use d3 to append 1 cell per sighting detail (datetime, city, state, etc.)
      var cell = row.append("td");
      
      // Step 4: Use d3 to update each cell's text with said details
      cell.text(value);
    });
});



// EVENTS: Select what actions will register as an event
//▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

// Select the button and create the event handler for a click
var button = d3.select("#filter-btn");
button.on("click", filterData);

// Select the form and create the event handler for any keypress (we'll qualify which key in the function)
var form = d3.select("form");
form.on("keypress", filterData);

// Ian: Another way to be more specific about what you're selecting is to use each individual 'li' class (i.e. each filter independantly)
// var li_filter = d3.selectAll(".filter"); 
// li_filter.on("keypress",filterData);



// FILTERS: Date, City, State, Country, UFO Shape, and Duration of Sighting
//▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

function filterData() {
    // Specifying that the key pressed must be the Enter key
    if (d3.event.keyCode == 13 || d3.event.button == 0) {

        // Prevent the page from refreshing
        d3.event.preventDefault();
        
        // FILTERS //////////////////////////////////////////////////////////////////////////////////
        
        // Select the input element or dropdown menu and get the raw HTML node
        var inputDate = d3.select("#datetime");
        var inputCity = d3.select("#city");
        var inputState = d3.select("#state");
        var inputCountry = d3.select("#country");
        var dropdownShape = d3.selectAll("#selectShape").node();
        var dropdownDuration = d3.selectAll("#selectDuration").node();


        // Get the value property of the input element
        var dateValue = inputDate.property("value");
        var cityValue = inputCity.property("value");
        var stateValue = inputState.property("value");
        var countryValue = inputCountry.property("value");
        var selectedShape = dropdownShape.value;
        var selectedDuration = dropdownDuration.value;
        
        // Apply the conditions for filtering the data and assign it to a variable
        var filteredData = tableData.filter(function(sighting){
            return ((sighting.datetime === dateValue || dateValue == "" ) &&
                    
                    // Match the location value to the lower cased location imput
                    (sighting.city === cityValue.toLowerCase() || cityValue == "") &&
                    (sighting.state === stateValue.toLowerCase() || stateValue == "") &&
                    (sighting.country === countryValue.toLowerCase() || countryValue == "") &&
                    
                    // I have manually grouped the shapes as follows in the HTML file: 
                    // rectangle // triangle // chevron // teardrop 
                    // circle, sphere // disk, cylinder // oval, cigar 
                    // light, flash, fireball, formation 
                    // other, unknown, changing, cross
                    (sighting.shape === selectedShape.split("|")[0] || 
                     sighting.shape === selectedShape.split("|")[1] ||
                     sighting.shape === selectedShape.split("|")[2] ||
                     sighting.shape === selectedShape.split("|")[3] || selectedShape == "") &&
                    
                    // I also decided to group durations into sedonds, minutes, and hour(s)
                    ((typeof(sighting.durationMinutes) == "string" && sighting.durationMinutes.includes(selectedDuration)) || selectedDuration == "")
                    // the only time that this doesn't work is the rare cases where it says something like "half an hour" rather than "30 minutes"
            )
        });
        // Check
        console.log(filteredData);
        
        
        // RELOAD: Load the filtered table
        //▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
        
        // clear the existing data
        tbody.html("");
        
        // Input the data
        filteredData.forEach(function(sighting) {

            // Step 1:  Use d3 to append one table row `tr` for each weather report object
            var row = tbody.append("tr");
            
            // Step 2:  Use `Object.entries` to console.log each sighting's details
            Object.entries(sighting).forEach(function([key, value]) {
            ////console.log(key, value);
            
            // Step 3: Use d3 to append 1 cell per sighting detail (datetime, city, state, etc.)
            var cell = row.append("td");
            
            // Step 4: Use d3 to update each cell's text with said details
            cell.text(value);
            });
        });
    }
};