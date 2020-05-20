function Plotting(id) {
    // load data from the json file
    d3.json("samples.json").then((data)=> {
        // print the data to console
        console.log(data)
 
        // map the wfrequcny for all values, this will be for the dashboard
        var wfreq = data.metadata.map(d => d.wfreq)
        // print the valuse to console
        console.log(wfreq)
        


        // filter down by the id
        var samples = data.samples.filter(s => s.id.toString() === id)[0];
        
        console.log(samples);
  
        // Getting the top 10 
        var samplevalues = samples.sample_values.slice(0, 10).reverse();
  
        // get only top 10 otu ids for the plot OTU and reversing it. 
        var OTU_top = (samples.otu_ids.slice(0, 10)).reverse();
        
        // get the otu id's to the desired form for the plot
        var OTU_id = OTU_top.map(d => "OTU " + d)
  
        // get the top 10 labels for the plot
        var labels = samples.otu_labels.slice(0, 10);
  
        // create trace variable for the plot
        var trace = {
            x: samplevalues,
            y: OTU_id,
            text: labels,
            // change the color to be whatever you want it ot be
            marker: {
              color: 'rgb(542,224,195)'},
            type:"bar",
            // here you can change h to be v if you want to change the orientation
            orientation: "h",
        };
  
        // create data variable
        var data = [trace];
  
        // create layout variable to set plots layout
        var layout = {
            title: "Test Subject's Top 10 OTUs",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };
  
        // create the bar plot
        Plotly.newPlot("bar", data, layout);
  
        // The bubble chart
        var trace1 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            },
            text: samples.otu_labels
  
        };
  
        // set the layout for the bubble plot
        var layout_b = {
            xaxis:{title: "OTU ID"},
            height: 900,
            width: 1500
        };
  
        // creating data variable 
        var data1 = [trace1];
  
        // create the bubble plot
        Plotly.newPlot("bubble", data1, layout_b); 
  
        // The guage chart
        var url =`samples.json`



      var wash_freq = data.WFREQ;
      console.log(wash_freq);

      var data = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: wash_freq,
        title: { text: "<b>Wash Frequency</b><br><i>Scrubs per week</i>"},
        type: "indicator",
        mode: "gauge+number+range",
        gauge: {
          axis: { range: [0, 10] },
          bar: {color: "darkblue"},
          steps: [
            { range: [0, 1], color: "rgb(204,214,204)" },
            { range: [1, 2], color: "rgb(186,206,186)" },
            { range: [2, 3], color: "rgb(168,199,168)" },
            { range: [3, 4], color: "rgb(150,191,150)" },
            { range: [4, 5], color: "rgb(132,184,132)" },
            { range: [5, 6], color: "rgb(114,176,114)" },
            { range: [6, 7], color: "rgb(96,168,96)" },
            { range: [7, 8], color: "rgb(78,161,78)" },
            { range: [8, 9], color: "rgb(60,153,60)" },
            { range: [9, 10], color: "rgb(42,146,42)" }
          ],
          }
      }
      ];

    var layout = { width: 400, height: 300, margin: { t: 1, b: 1 } };

    Plotly.newPlot('gauge', data, layout);
        
      });
  }  
// create the function to get the necessary data
function datas(id) {
    // read the json file to get data
    d3.json("samples.json").then((data)=> {
        
        // get the metadata info for the demographic panel
        var metadata = data.metadata;

        console.log(metadata)

        // filter meta data info by id
        var result = metadata.filter(meta => meta.id.toString() === id)[0];

        // select demographic panel to put data
        var demographicInfo = d3.select("#sample-metadata");
        
        // empty the demographic info panel each time before getting new id info
        demographicInfo.html("");

        // grab the necessary demographic data data for the id and append the info to the panel
        Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}

// create the function for the change event
function optionChanged(id) {
    Plotting(id);
    datas(id);
}
// create the function for the initial data rendering
function init() {
    // select dropdown menu 
    var dropdown = d3.select("#selDataset");

    // read the data 
    d3.json("samples.json").then((data)=> {
        console.log(data)

        // get the id data to the dropdwown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // call the functions to display the data and the plots to the page
        Plotting(data.names[0]);
        datas(data.names[0]);
    });
}

init();