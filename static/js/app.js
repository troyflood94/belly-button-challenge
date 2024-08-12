// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    // Access the metadata array from the JSON data
    let metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number
    let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    let result = resultArray[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    let metadataPanel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    metadataPanel.html("");
    console.log(metadataPanel)
    // Inside a loop, append new tags for each key-value in the filtered metadata
    //split every result by key and value, apply uppercase to 
    Object.entries(result).forEach(([key, value]) => {
      metadataPanel.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}
buildMetadata(943);


//function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let sampleField=data.samples;

    // Filter the samples for the object with the desired sample number
    let sampleArray=sampleField.filter(sampObj=>sampObj.id==sample);

    //grab just the first result and use this singular result rathet than passing arrays.  The function accepts a single object so without this it 
    let result = sampleArray[0];

    // Get the otu_ids, otu_labels, and sample_values
    let otuArray=result.otu_ids;
    let labelArray=result.otu_labels;
    let svArray=result.sample_values;

    // Build a Bubble Chart
    let bubbleTrace = {
      x: otuArray,
      y: svArray,
      text: labelArray,
      mode: 'markers',
      marker: {
        size: svArray,
        color: otuArray,
        colorscale: 'Earth' 
      }
    };
    let bubbleLayout = {
      title: 'Bacteria Culture Per Sample',
      xaxis: { title: 'OTU ID' },
      yaxis: { title: 'Sample Values' },
      hovermode: 'closest' 
    };

    // Render the Bubble Chart
    Plotly.newPlot('bubble', [bubbleTrace], bubbleLayout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks

    let yticks = otuArray.map(otu_id => `OTU ${otu_id}`);

    let topOtuIds = otuArray.slice(0, 10).reverse();
    let topLabels = labelArray.slice(0, 10).reverse();
    let topSvArray = svArray.slice(0, 10).reverse();
    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    let barTrace = {
      x: topSvArray,
      y: yticks.slice(0, 10).reverse(), // slice and reverse input data
      text: topLabels,
      type: 'bar',
      orientation: 'h' // Horizontally oriented
    };
    let barLayout = {
      title: 'Top 10 OTUs',
      xaxis: { title: 'Sample Values' },
      yaxis: { title: 'OTU IDs' }
    };
    // Render the Bar Chart
    Plotly.newPlot('bar', [barTrace], barLayout);
  });
}
buildCharts(940);

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field


    // Use d3 to select the dropdown with id of `#selDataset`


    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.


    // Get the first sample from the list


    // Build charts and metadata panel with the first sample

  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected

}

// Initialize the dashboard
init();
