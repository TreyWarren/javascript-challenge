/** check out the data keys
data = [{
    datetime:           "1/1/2010",
    city:               "benton",
    state:              "ar",
    country:            "us",
    shape:              "circle",
    durationMinutes:    "5 mins.",
    comments:           "4 bright green circles high in the sky going in circles then one bright green light at my front door."
    }, { }, { }]
**/

// Assign the data from `data.js` to a descriptive variable
var tableData = data;

// Initial table load
//▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
// Get a reference to the table body
var tbody = d3.select("tbody");

// Input the data
tableData.forEach(function(sighting) {
  
    // Step 1:  Use d3 to append one table row `tr` for each weather report object (no data yet)
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


// FILTERS //////////////////////////////////////////////////////////////
//▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

// Select the button
var button = d3.select("#filter-btn");

// Select the form
var form = d3.select("form");

// Create event handlers 
button.on("click", runEnter);
form.on("submit",runEnter);

// Complete the event handler function for the form
function runEnter() {

    // Prevent the page from refreshing
    d3.event.preventDefault();
    
    // DATE //////////////////////////////////////////////////////////
    
    // Select the input element and get the raw HTML node
    var inputElement = d3.select("#datetime");
  
    // Get the value property of the input element
    var inputValue = inputElement.property("value");
    
    // Create a filtering function for the date of sighting
    if (inputValue !== "") {
        // Log the value to check
        console.log(inputValue);

        // Filter data
        var filteredDate = tableData.filter(sighting => sighting.datetime === inputValue);
        
        // Log the filtered data to check
        console.log(filteredDate);

    } else {
        var filteredDate = tableData;
        // No need to log the unfiltered data
    };

    // CITY //////////////////////////////////////////////////////////
    
    // Select the input element and get the raw HTML node
    var inputElement = d3.select("#city");
    
    // Get the value property of the input element
    var inputValue = inputElement.property("value");

    // Create a filtering function for the date of sighting
    if (inputValue !== "") {
        // Log the value to check
        console.log(inputValue);

        // Filter data
        var filteredCity = filteredDate.filter(sighting => sighting.city === inputValue.toLowerCase());
                
        // Log the filtered data to check
        console.log(filteredCity);

    } else {
        var filteredCity = filteredDate;
    };

    // STATE //////////////////////////////////////////////////////////
    
    // Select the input element and get the raw HTML node
    var inputElement = d3.select("#state");
    
    // Get the value property of the input element
    var inputValue = inputElement.property("value");

    // Create a filtering function for the date of sighting
    if (inputValue !== "") {
        // Log the value to check
        console.log(inputValue);

        // Filter data
        var filteredState = filteredCity.filter(sighting => sighting.state === inputValue.toLowerCase());
                
        // Log the filtered data to check
        console.log(filteredState);

    } else {
        var filteredState = filteredCity;
    };

    // COUNTRY //////////////////////////////////////////////////////////
    
    // Select the input element and get the raw HTML node
    var inputElement = d3.select("#country");
    
    // Get the value property of the input element
    var inputValue = inputElement.property("value");

    // Create a filtering function for the date of sighting
    if (inputValue !== "") {
        // Log the value to check
        console.log(inputValue);

        // Filter data
        var filteredCountry = filteredState.filter(sighting => sighting.country === inputValue.toLowerCase());
                
        // Log the filtered data to check
        console.log(filteredCountry);

    } else {
        var filteredCountry = filteredState;
    };

    // SHAPE //////////////////////////////////////////////////////////
    // "circle, light, triangle, unknown, fireball, formation, other, sphere, disk, chevron, rectangle, cross, flash, changing, oval, cigar, teardrop, cylinder"

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

    // DURATION //////////////////////////////////////////////////////////
    
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.selectAll("#selectDuration").node();

    // Assign the dropdown menu option to a variable
    var selectedDuration = dropdownMenu.value;

    // Create a filtering function for the date of sighting
    if (selectedDuration !== "") {
        // Log the value to check
        console.log(selectedDuration);

        // Filter data                              // tried adding '=== true' as well and it didn't work
        var filteredDuration = filteredShape.filter(sighting => 
            (typeof(sighting.durationMinutes) == "string" && sighting.durationMinutes.includes(selectedDuration))); 
        
        // Log the filtered data to check
        console.log(filteredDuration);
        console.log("--------------------------------");

    } else {
        var filteredDuration = filteredShape;
        console.log("--------------------------------");
    };
    
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////

    // clear the existing data
    tbody.html("");
    
    // Input the data
    filteredDuration.forEach(function(sighting) {

        // Step 1:  Use d3 to append one table row `tr` for each weather report object (no data yet)
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
};
