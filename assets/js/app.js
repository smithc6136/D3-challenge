// in csv MOE stands for Margin of Error?

// ********************************************************************************
// Define Dimensions and Set Margins
// ********************************************************************************

// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 500;

// Define chart's margins as an object
var margin = {
    top: 60,
    right: 60,
    bottom: 60,
    left: 60
}

// Define dimensions of chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Select body, append SVG, and set dimensions
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Append a group area, then set its margins
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// ********************************************************************************
// Load csv data and console log data (obesity and povert)
// *** How do I tell it which columns to grab? How do I tell it to  grab 2?
// ********************************************************************************

// Load data from data.csv
d3.csv("../data/data.csv").then(function (obesityData) { // ** where do I close this curly bracket??

    // Print the obesityData (*** how would it know what to grab? ***)
    console.log(obesityData);

    // ********************************************************************************
    // Create axes for chart 
    // I want poverty on x axis and obesity on y axis
    // ********************************************************************************

    // Configure a time scale with a range between 0 and the chartWidth
    // Set the domain for the xTimeScale function
    // d3.extent returns the an array containing the min and max values for the property specified
    var xTimeScale = d3.scaleTime()
        .range([0, chartWidth])
        .domain(d3.extent(obesityData, data => data.date));

    // Configure a linear scale with a range between the chartHeight and 0
    // Set the domain for the xLinearScale function
    var yLinearScale = d3.scaleLinear()
        .range([chartHeight, 0])
        .domain([0, d3.max(milesData, data => data.miles)]);

    // Create two new functions passing the scales in as arguments
    // These will be used to create the chart's axes
    var bottomAxis = d3.axisBottom(xTimeScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // ********************************************************************************
    // Add bubbles
    // ********************************************************************************

    // Add a scale for bubble size
    var z = d3.scaleLinear()
        .domain([0, 20])
        .range([0, 30]);

    // Add dots
    svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d.poverty); })
        .attr("cy", function (d) { return y(d.obesity); })
        // is this what includes state abbreviation?
        .attr("r", function (d) { return z(d.abbr); })
        .style("fill", "#69b3a2")
        .style("opacity", "0.7")
        .attr("stroke", "black")
})

    // ********************************************************************************
    // Add tooltip 
    // Code below from 16.3 Activity 07
    // ********************************************************************************

//         // Step 1: Append tooltip div
//         var toolTip = d3.select("body")
//         .append("div")
//         .classed("tooltip", true);
  
//       // Step 2: Create "mouseover" event listener to display tooltip
//       circlesGroup.on("mouseover", function(d) {
//         toolTip.style("display", "block")
//             .html(
//               `<strong>${dateFormatter(d.date)}<strong><hr>${d.medals}
//           medal(s) won`)
//             .style("left", d3.event.pageX + "px")
//             .style("top", d3.event.pageY + "px");
//       })
//         // Step 3: Create "mouseout" event listener to hide tooltip
//         .on("mouseout", function() {
//           toolTip.style("display", "none");
//         });
  
//     }).catch(function(error) {
//       console.log(error);
//     });
//   }
  
//   // When the browser loads, makeResponsive() is called.
//   makeResponsive();
  
//   // When the browser window is resized, makeResponsive() is called.
//   d3.select(window).on("resize", makeResponsive);
  