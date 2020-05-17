
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


// Date Filter
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
    
    // Select the input element and get the raw HTML node
    var inputElement = d3.select("#datetime");
  
    // Get the value property of the input element
    var inputValue = inputElement.property("value");
    
    // Log the value to check
    console.log(inputValue);
    
    // Create a filtering function for the date of sighting
    if (inputValue !== "") {
        var filteredData = tableData.filter(sighting => sighting.datetime === inputValue);
    } else {
        var filteredData = tableData;
    };
    
    // Log the value to check
    console.log(filteredData);
  
    // clear the existing data
    tbody.html("");
    
    // Input the data
    filteredData.forEach(function(sighting) {

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
