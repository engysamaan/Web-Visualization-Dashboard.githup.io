function buildMetadata(sample) {
d3.json("/metadata/" + sample).then(function(data) {
  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  //var metadata = sample;
    // Use d3 to select the panel with id of `#sample-metadata`
    var Panel = d3.select("#sample-metadata")
    //var Panel = document.getElementById("#sample-metadata");
    //console.log(metadata) 
    // Use `.html("") to clear any existing metadata
      Panel.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    Object.entries(data).forEach(([key, value]) => {
      Panel.append("h6").text(`${key}: ${value}`)
    });;
    
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
  });
}

function buildCharts(sample) {
d3.json("/samples/" + sample).then(function(data) {
    // @TODO: Use `d3.json` to fetch the sample data for the plots
    var otu_ids = data.otu_ids
    var sample_values = data.sample_values
    var otu_labels = data.otu_labels
    // @TODO: Build a Bubble Chart using the sample data
    
    var Bubble_data = [{
      x: otu_ids,
      y: sample_values,
      type: "scatter",
      mode: "markers",
      text: otu_labels,
      marker: {
        color: otu_ids,
        size: sample_values,
      }

    }]
    var layout = {margin: { t: 0, l: 0 }}

    Plotly.plot("bubble", Bubble_data , layout);

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
    var pie_data =[{
      labels : otu_ids.slice(0,10),
      values : sample_values.slice(0,10),
      hovertext : otu_labels.slice(0,10),
      type : "pie"
    }]
    var layout = {margin: { t: 0, l: 0}}

    Plotly.plot("pie", pie_data, layout);
});
}


function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    //console.log (sampleNames);
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
