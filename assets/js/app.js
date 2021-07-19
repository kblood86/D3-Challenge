// @TODO: YOUR CODE HERE!
// Step 1: Set up our chart
//= ================================
var svgWidth = 960;
var svgHeight = 600;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("assets/data/data.csv").then(function(censusData) {
    // Step 4: Parse the data
    // Format the data and convert to numerical and date values
    // =================================
    // Create a function to parse date and time
    //var parseTime = d3.timeParse("%d-%b");
  
    // Format the data
    censusData.forEach(function(data) {
      data.age = +data.age;
      data.smokes = +data.smokes;
      console.log(data);
    });

    //Scales
    var xLinearScale = d3.scaleLinear()
    .domain([29, d3.max(censusData, d => d.age)])
    .range([0, width]);

    var yLinearScale = d3.scaleLinear()
    .domain([7, d3.max(censusData, d => d.smokes)])
    .range([height, 0]);

    //Axis Function
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    //Append Axes to chart
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    chartGroup.append("g")
        .call(leftAxis);

    //Create circles
    chartGroup.selectAll("circle")
        .data(censusData)
        .enter()
        .append("circle")
        .attr("cx", d=> xLinearScale(d.age))
        .attr("cy", d=> yLinearScale(d.smokes))
        .attr("r", "15")
        .attr("fill", "blue")
        .attr("opacity", ".5")
        .attr("stroke", "black");

    //circle text
    chartGroup.append("g").selectAll('text')
        .data(censusData)
        .enter()
        .append("text")
        .text(d=>d.abbr)
        .attr("x", d=>xLinearScale(d.age))
        .attr("y", d=>yLinearScale(d.smokes))
        .classed(".stateText", true)
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .attr("font-size", "10px")
        

    //tool tip

    //axes labels
        chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("text-anchor", "middle")
        .attr("font-size", "16px")
        .attr("fill", "black")
        .style("font-weight", "bold")
        .text("Age (Median)");

        chartGroup.append("text")
        .attr("y", 0 - ((margin.left / 2) + 2))
        .attr("x", 0 - (height / 2))
        .attr("text-anchor", "middle")
        .attr("font-size", "16px")
        .attr("fill", "black")
        .style("font-weight", "bold")
        .attr("transform", "rotate(-90)")
        .text("Smokers (Percentage)");        
    
}).catch(function(error){
    console.log(error);
});


