// ********************************************************************************
// 1. Set up Chart: Define Dimensions and Set Margins
// ********************************************************************************

// Define SVG area dimensions
var svgWidth = 1000;
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


// ********************************************************************************
// 2. Create SVG wrapper, append SVG group to hold chart, shift margins
// ********************************************************************************

// Select body, append SVG, and set dimensions
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Append a group area, then set its margins
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);



// ********************************************************************************
// 3. Import csv data and console log data (obesity and poverty)
// ********************************************************************************

// Load data from data.csv
d3.csv("assets/data/data.csv").then(function (statesData) { // ** where do I close this curly bracket??

    // Print the csv data
    console.log(statesData);


    // ********************************************************************************
    // 4. Parse the Data (from string to integer)
    // ********************************************************************************

    // Format the date and cast the obesity and poverty values to a number
    statesData.forEach(function(data) {
        data.obesity = +data.obesity;
        data.poverty = +data.poverty;
    });


    // ********************************************************************************
    // 4. Create Scales
    // X: Poverty, Y: Obesity
    // ********************************************************************************

    // Configure a time scale with a range between 0 and the chartWidth
    // Set the domain for the xTimeScale function
    // d3.extent returns the an array containing the min and max values for the property specified
    var xLinearScale = d3.scaleLinear()
        .range([0, chartWidth])
        .domain(d3.extent(statesData, data => data.poverty));

    // Configure a linear scale with a range between the chartHeight and 0
    // Set the domain for the xLinearScale function
    var yLinearScale = d3.scaleLinear()
        .range([chartHeight, 0])
        .domain([0, d3.max(statesData, data => data.obesity)]);


    // ********************************************************************************
    // 5. Create Axes and Axis Labels
    // ********************************************************************************

    // Create two new functions passing the scales in as arguments
    // These will be used to create the chart's axes
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Create axis labels
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (chartHeight / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Obesity");

    chartGroup.append("text")
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + margin.top - 10})`)
        .attr("class", "axisText")
        .text("Poverty");

    // ********************************************************************************
    // 6: Append the axes to the chartGroup
    // ********************************************************************************

    // Add bottomAxis
    chartGroup.append("g").attr("transform", `translate(0, ${chartHeight})`).call(bottomAxis);

    // Add leftAxis to the left side of the display
    chartGroup.append("g").call(leftAxis);


    // ********************************************************************************
    // 7: Set up bubbles
    // ********************************************************************************

    // Add dots
    var circlesGroup = chartGroup.selectAll("circle").data(statesData).enter()
 
    circlesGroup.append('g')
        .selectAll("dot")
        .data(statesData)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return xLinearScale(d.poverty); })
        .attr("cy", function (d) { return yLinearScale(d.obesity); })
        .attr("r", 13)
        .attr("text-anchor", "middle").text(function (d) { return (d.abbr); })
        .style("fill", "#69b3a2")
        .style("opacity", "0.7")
        .attr("stroke", "black")

    circlesGroup
        .append("text")
        //We return the abbreviation to .text, which makes the text the abbreviation.
        .text(function (d) {
            return d.abbr;
        })
        //Now place the text using our scale.
        .attr("dx", function (d) {
            return xLinearScale(d['poverty']);
        })
        .attr("dy", function (d) {
            // When the size of the text is the radius, adding a third of the radius to the height pushes it into the middle of the circle.
            return yLinearScale(d['obesity']) + 10 / 2.5;
        })
        .attr("font-size", 15)
        .attr("class", "stateText")
})