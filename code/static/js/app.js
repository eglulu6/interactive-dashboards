
/****************** read in json file ***********************/
d3.json("data/samples.json").then((importedData) =>
{
    var samplesData = importedData;
    console.log(samplesData)

    /****************** Make the dropdown of IDs ***********************/
    
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

    /***************** Filter data by selected ID ***************************************/
        
    // load inital patient
    var selectedID = dropdown.property("value");
    console.log(selectedID)
    
    
    //select the dropdown and set an action on event
    dropdown.on("change", handleSelect);

    /************************ Define change event actions *********************/

    //define the actions to take on event
    function handleSelect(event) 
    {
        // capture dropdown value 
        var selectedID = dropdown.property("value");
        console.log(selectedID)

        /***************** filter all data by dropdown value **************/ 

        var filteredIDInfo = samplesData[0].samples.filter(item => item.id === selectedID)
        console.log(filteredIDInfo)

        /***************** slice for top 10 *************************/

        var top10_otu_ids = []
        filteredIDInfo[0].otu_ids.slice(0,10).forEach(element => 
            {
                var substring = top10_otu_ids.push(`OTU ${element}`
            )});
        var top10_sample_values = filteredIDInfo[0].sample_values.slice(0,10);
        var top10_otu_labels = filteredIDInfo[0].otu_labels.slice(0,10);
        var top10_colors = ['rgb(252, 101, 0, .5)', 'rgb(117, 77, 43, .5)', 'rgb(255, 48, 165, .5)', 'rgb(68, 184, 39, .5)', 'rgb(39, 184, 167, .5)', 'rgb(252, 223, 0, .5)', 'rgb(0, 0, 0, .9)', 'rgb(118, 0, 173, .5)', 'rgb(252, 0, 0, .5)', 'rgb(0, 76, 255, .5)']

        console.log(top10_otu_ids)// check slice

        /***************** Ploting h-bar chart **************************/

        var bar_data = 
        [{
            type: 'bar',
            x: top10_sample_values,
            y: top10_otu_ids,
            orientation: 'h',
            text: top10_otu_labels,
            mode: 'markers',
            marker:
            {
                color: all_sample_values,
                colorscale: [[0, 'rgb(23, 212, 30)'], [1, 'rgb(32, 23, 212)']],
                opacity: 0.6,
            }
        }]; // bar_data end

        var bar_layout = 
        {
            yaxis: {autorange: 'reversed'},
            opacity: 0.6,
            title: "Top 10 OTUs"
        }; // bar_layout end

        Plotly.newPlot('bar', bar_data, bar_layout);

        /****************** grab all values for bubble chart ***************/

        var all_otu_ids = filteredIDInfo[0].otu_ids;
        console.log(all_otu_ids);

        var all_otu_ids_txt = []
            filteredIDInfo[0].otu_ids.forEach(element => 
                {
                    var substring = all_otu_ids_txt.push(`OTU ${element}`
                )});
        console.log(all_otu_ids_txt);

        var all_sample_values = filteredIDInfo[0].sample_values;
        console.log(all_sample_values)

        var all_otu_labels = filteredIDInfo[0].otu_labels;
        console.log(all_otu_labels)

        /***************** Ploting bubble chart **************************/  
        
        console.log(all_sample_values)

        var bubble_data = 
        [{
            x: all_otu_ids,
            y: all_sample_values,
            mode: 'markers',
            text: all_otu_labels,
            marker: 
            {
              size: all_sample_values,
              opacity: 0.6,
              color: all_sample_values,
              colorscale: [[0, 'rgb(23, 212, 30)'], [1, 'rgb(32, 23, 212)']]
            }
        }]; // bubble_data end
          
        var bubble_layout = 
          {
            title: 'Sample Values',
            showlegend: false,
            height: 1200,
            width: 1200,
            xaxis: 
            {
                title: all_otu_ids
            },
          }; // bubble_layout end
        Plotly.newPlot('bubble',bubble_data, bubble_layout);

        /***************** creating gauge **************************/

        var filteredMetaInfo = samplesData[0].metadata.filter(item => item.id === parseInt(selectedID))
        let washing = filteredMetaInfo[0].wfreq
        console.log(washing)

        var data = 
        [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: washing,
                title: { text: "Washing Frequency" },
                type: "indicator",
                mode: "gauge+number"
            }
        ];
        
        var layout = 
        { 
            width: 600, 
            height: 500, 
            margin: 
                { 
                    t: 0, 
                    b: 9 
                } 
        };
        Plotly.newPlot('gauge', data, layout);

        /***************** creating demographics table **************************/

        let keys = Object.keys(filteredMetaInfo[0])
        const metadata = d3.select('#sample-metadata')
        
        metadata.html("")

        keys.forEach(key => 
        {
            console.log(key)        
            console.log(filteredMetaInfo[0][key])
            metadata.append('p').text(`${key}: ${filteredMetaInfo[0][key]}`)
        })

    } //handleEvent Function end

/*********************** End Event Actions ***********************************/

})// .then funtion end

/********************************* END ****************************************/
