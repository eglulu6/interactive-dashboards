// Fetch data from JSON file referred to as importedData
d3.json("../../../data/samples.json").then((importedData) =>
{
    var samplesData = importedData;
    console.log(samplesData)

/****************** Make the dropdown of IDs***********************/
    
    // identify dropdown box in html file
    var dropdown = d3.select("#selDataset")
    
    // define array of IDs for filter function later
    peopleID = samplesData[0].names
    console.log(peopleID)

    // add dropdown options
    peopleID.forEach(element => 
        {
            dropdown.append('option').text(element)
        });

/*****************Filter data by selected ID***************************************/
        
    //select the dropdown and set an action on event
    dropdown.on("change", handleSelect);

/************************Define change event actions*********************/
    //define the actions to take on event
    function handleSelect(event) 
    {
        // capture dropdown value 
        var selectedID = dropdown.property("value");
        console.log(selectedID)

        /*****************filter all data by dropdown value**************/ 
        var filteredIDInfo = samplesData[0].samples.filter(item => item.id === selectedID)
        console.log(filteredIDInfo)

        /*****************slice for top 10*************************/
        var top10_otu_ids = []
        filteredIDInfo[0].otu_ids.slice(0,10).forEach(element => 
            {
                var substring = top10_otu_ids.push(`OTU ${element}`
            )});
        var top10_sample_values = filteredIDInfo[0].sample_values.slice(0,10);
        var top10_otu_labels = filteredIDInfo[0].otu_labels.slice(0,10);
        var color = [rgb(252, 101, 0), rgb(), rgb(), rgb(68, 184, 39), rgb(39, 184, 167), rgb(252, 223, 0),rgb(), rgb(), rgb(252, 0, 0), rgb(0, 76, 255)]
        
// copied code for auto gen RGB colors
        // function getRandomRgb() 
        // {
        //     var num = Math.round(0xffffff * Math.random());
        //     var r = num >> 16;
        //     var g = num >> 8 & 255;
        //     var b = num & 255;
        //     return 'rgb(' + r + ', ' + g + ', ' + b + ')';
        //   }
        // for (var i = 0; i < 10; i++) 
        // {
        //     console.log(getRandomRgb());
        // }

        console.log(top10_otu_ids)// check slice

        /*****************Ploting h-bar chart**************************/

        var bar_data = 
        [{
            type: 'bar',
            x: top10_sample_values,
            y: top10_otu_ids,
            orientation: 'h',
            text: top10_otu_labels,
            mode: 'markers'
        }]; 

        var bar_layout = 
        {
            yaxis: {autorange: 'reversed'}
        };
        Plotly.newPlot('bar', bar_data, bar_layout);

        /*****************Ploting bubble chart**************************/
        var bubble_data = 
        [{
            x: top10_otu_ids,
            y: top10_sample_values,
            mode: 'markers',
            text: top10_otu_labels,
            marker: 
            {
              size: top10_sample_values,
              color: top10_otu_ids
            }
        }];
          
        var bubble_layout = 
          {
            title: 'Marker Size',
            showlegend: false,
            height: 600,
            width: 1200,
            xaxis: {title: top10_otu_ids},
            opacity: 0.6
          };
          
        Plotly.newPlot('bubble',bubble_data, bubble_layout);
    } //handleEvent Function end


})



        // // create a list to hold mini dicts for each corresponding values in otu_ids, sample_values, otu_labels
        // var samples_list = [] //#944 === 28 array values
        // for (let index = 0; index < filteredIDInfo[0].sample_values.length; index++) 
        //     // const element = array[index];
        //     {
        //         samples_list.push({'otu_ids': filteredIDInfo[0].otu_ids[index], 'sample_values': filteredIDInfo[0].sample_values[index], 'otu_labels': filteredIDInfo[0].otu_labels[index] });
        //     }
        //     console.log(samples_list)

        

        // // sort filteredIDInfo by teh sample_value field in descending order
        // // var sample_values = filteredIDInfo[0].sample_value
        // samples_list.sort((first , second) => 
        // {
        //     // sorting in descending order
        //     return second.sample_values - first.sample_values;
        // }); // sort funciton End
        // console.log(samples_list);

