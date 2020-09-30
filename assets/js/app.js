// Next Steps: Create function to add state abbreviations to bubbles (line 185)

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
// *** How do I tell it which columns to grab? How do I tell it to  grab 2?
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
    // 4. Format the Data - is this necessary? If so see 16.2 Act 04
    // ********************************************************************************


    // ********************************************************************************
    // 5. Create Scales
    // Poverty on x axis and obesity on y axis
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
    // 6. Create Axes
    // I want poverty on x axis and obesity on y axis
    // ********************************************************************************

    // Create two new functions passing the scales in as arguments
    // These will be used to create the chart's axes
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);


    // ********************************************************************************
    // BONUS - Add additional Axes
    // ********************************************************************************

    // 16.3 Activity 04
    //     // Add x-axis
    //   chartGroup.append("g")
    //   .attr("transform", `translate(0, ${height})`)
    //   .call(bottomAxis);

    // // Add y1-axis to the left side of the display
    // chartGroup.append("g")
    //   // Define the color of the axis text
    //   .classed("green", true)
    //   .call(leftAxis);

    // // Add y2-axis to the right side of the display
    // chartGroup.append("g")
    //   // Define the color of the axis text
    //   .classed("blue", true)
    //   .attr("transform", `translate(${width}, 0)`)
    //   .call(rightAxis);

    // // Line generators for each line
    // var line1 = d3.line()
    //   .x(d => xTimeScale(d.date))
    //   .y(d => yLinearScale1(d.dow_index));

    // var line2 = d3.line()
    //   .x(d => xTimeScale(d.date))
    //   .y(d => yLinearScale2(d.smurf_sightings));

    // // Append a path for line1
    // chartGroup.append("path")
    //   .data([smurfData])
    //   .attr("d", line1)
    //   .classed("line green", true);

    // // Append a path for line2
    // chartGroup.append("path")
    //   .data([smurfData])
    //   .attr("d", line2)
    //   .classed("line blue", true);

    // // Append axes titles
    // chartGroup.append("text")
    // .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
    //   .classed("dow-text text", true)
    //   .text("Dow Index");

    // chartGroup.append("text")
    // .attr("transform", `translate(${width / 2}, ${height + margin.top + 37})`)
    //   .classed("smurf-text text", true)
    //   .text("Smurf Sightings");
    // }).catch(function(error) {
    // console.log(error);
    // });


    // ********************************************************************************
    // Step 7: Append the axes to the chartGroup
    // ********************************************************************************

    // Add bottomAxis
    chartGroup.append("g").attr("transform", `translate(0, ${chartHeight})`).call(bottomAxis);

    // Add leftAxis to the left side of the display
    chartGroup.append("g").call(leftAxis);


    // ********************************************************************************
    // Step 8: Set up bubbles and append SVG path?
    // ********************************************************************************

    // Add dots
    chartGroup.append('g')
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
})
    // need function to pass in the state abbreviations !!!
        // might help: https://bl.ocks.org/alokkshukla/3d6be4be0ef9f6977ec6718b2916d168
        // https://bl.ocks.org/officeofjane/a70f4b44013d06b9c0a973f163d8ab7a code below:

    // // labels - running this currently gets rid of bubble chart entirely... ?
    // labels = chartGroup
    //     .append('text')
    //     .attr('dy', function (d) { return d.abbr }; )
    //     // .attr('dy', '.3em')
    //     .style('text-anchor', 'middle')
    //     .style('font-size', 10)
    //     .text(d => d.abbr)


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

// ********************************************************************************
// Multiple Data and Axes
// For reference on properly placing axis titles, see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor
// ********************************************************************************

