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
button.on("click", runEnter);

// Select the form and create the event handler for any keypress (we'll qualify which key in the function)
var form = d3.select("form");
form.on("keypress",runEnter);

// Ian: Another way to be more specific about what you're selecting is to use each individual 'li' class (i.e. each filter independantly)
// var li_filter = d3.selectAll(".filter"); 
// li_filter.on("keypress",runEnter);



// FILTERS: Date, City, State, Country, UFO Shape, and Duration of Sighting
//▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

function runEnter() {
    // Specifying that the key pressed must be the Enter key
    if (d3.event.keyCode == 13 || d3.event.button == 0) {

        // Prevent the page from refreshing
        d3.event.preventDefault();
        
        // DATE ////////////////////////////////////////////////////////////////////////////////////
        
        // Select the input element and get the raw HTML node
        var inputElement = d3.select("#datetime");
    
        // Get the value property of the input element
        var inputValue = inputElement.property("value");
        
        // Create a filtering function for the date of sighting
        if (inputValue !== "") {
            // Log the value to check
            console.log(inputValue);

            // Filter data
            var filteredDate = tableData.filter(sighting => 
                sighting.datetime === inputValue);
            
            // Log the filtered data to check
            console.log(filteredDate);

        } else {
            var filteredDate = tableData;
            // No need to log the unfiltered data
        };

        // CITY ///////////////////////////////////////////////////////////////////////////////////
        
        // Select the input element and get the raw HTML node
        var inputElement = d3.select("#city");
        
        // Get the value property of the input element
        var inputValue = inputElement.property("value");

        // Create a filtering function for the date of sighting
        if (inputValue !== "") {
            // Log the value to check
            console.log(inputValue);

            // Filter data
            var filteredCity = filteredDate.filter(sighting => 
                sighting.city === inputValue.toLowerCase());
                    
            // Log the filtered data to check
            console.log(filteredCity);

        } else {
            var filteredCity = filteredDate;
        };

        // STATE //////////////////////////////////////////////////////////////////////////////////
        
        // Select the input element and get the raw HTML node
        var inputElement = d3.select("#state");
        
        // Get the value property of the input element
        var inputValue = inputElement.property("value");

        // Create a filtering function for the date of sighting
        if (inputValue !== "") {
            // Log the value to check
            console.log(inputValue);

            // Filter data
            var filteredState = filteredCity.filter(sighting => 
                sighting.state === inputValue.toLowerCase());
                    
            // Log the filtered data to check
            console.log(filteredState);

        } else {
            var filteredState = filteredCity;
        };

        // COUNTRY ////////////////////////////////////////////////////////////////////////////////
        
        // Select the input element and get the raw HTML node
        var inputElement = d3.select("#country");
        
        // Get the value property of the input element
        var inputValue = inputElement.property("value");

        // Create a filtering function for the date of sighting
        if (inputValue !== "") {
            // Log the value to check
            console.log(inputValue);

            // Filter data
            var filteredCountry = filteredState.filter(sighting => 
                sighting.country === inputValue.toLowerCase());
                    
            // Log the filtered data to check
            console.log(filteredCountry);

        } else {
            var filteredCountry = filteredState;
        };

        // SHAPE ///////////////////////////////////////////////////////////////////////////////////
        // rectangle // triangle // chevron // teardrop
        // circle, sphere // disk, cylinder // oval, cigar
        // light, flash, fireball, formation
        // other, unknown, changing, cross

        // Use D3 to select the dropdown menu
        var dropdownMenu = d3.selectAll("#selectShape").node();

        // Assign the dropdown menu option to a variable
        var selectedShape = dropdownMenu.value;

        // Create a filtering function for the date of sighting
        if (selectedShape !== "") {
            // Log the value to check
            console.log(selectedShape);

            // Filter data
            var filteredShape = filteredCountry.filter(sighting => 
                sighting.shape === selectedShape.split("|")[0] || 
                sighting.shape === selectedShape.split("|")[1] ||
                sighting.shape === selectedShape.split("|")[2] ||
                sighting.shape === selectedShape.split("|")[3]);
                    
            // Log the filtered data to check
            console.log(filteredShape);

        } else {
            var filteredShape = filteredCountry;
        };

        // DURATION /////////////////////////////////////////////////////////////////////////////////
        
        // Use D3 to select the dropdown menu
        var dropdownMenu = d3.selectAll("#selectDuration").node();

        // Assign the dropdown menu option to a variable
        var selectedDuration = dropdownMenu.value;

        // Create a filtering function for the date of sighting
        if (selectedDuration !== "") {
            // Log the value to check
            console.log(selectedDuration);

            // Filter data
            var filteredDuration = filteredShape.filter(sighting => 
                (typeof(sighting.durationMinutes) == "string" && 
                sighting.durationMinutes.includes(selectedDuration))); 
            
            // Log the filtered data to check
            console.log(filteredDuration);
            console.log("--------------------------------");

        } else {
            var filteredDuration = filteredShape;
            console.log("--------------------------------");
        };
        
        ///////////////////////////////////////////////////////////////////////////////////////////
        
        
        // RELOAD: Load the filtered table
        //▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
        
        // clear the existing data
        tbody.html("");
        
        // Input the data
        filteredDuration.forEach(function(sighting) {

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