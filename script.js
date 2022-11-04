//    <script src="https://cdn.plot.ly/plotly-2.16.1.min.js"></script>


d3.csv('RamseyPollingPlaces.csv', function(error, data) {
    d = {}

    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
      }
    d['Name'] = unpack(data, 'Name')
    d['Address'] = unpack(data, 'Address')
    d['Zip'] = unpack(data, 'Zip')
    d['lat'] = unpack(data, 'lat')
    d['lon'] = unpack(data, 'lon')
    d['Text'] = []

    for (let i=0;i<d['Name'].length;i++) {
        d['Text'].push(d['Name'][i] + '<br>'+d['Address'][i] + ' ' + d['Zip'][i])
    }

    graphing = []

    for (let i=0;i<d['Name'].length;i++) {
        var result = {
            type: 'scattermapbox',
            name: d['Name'][i] + ' -- ' + d['Address'][i],
            lon: d['lon'][i],
            lat: d['lat'][i],
            mode: 'markers+lines'
        };
        graphing.push(result)
    }

    data2 = []

    data2.push({
        type: 'scattermapbox',
        mode: 'markers+text',
        hoverinfo: 'none',


        hovertext: d['Text'],

        lon: d['lon'],
        lat: d['lat'],
        marker: {
          color: 'blue',
          reversescale: true,
          opacity: 0.5,
          size: 15,

        },
        text: d['Text'],
        textposition: 'bottom right',
    })

    
    layout = {
        title: {
            text: 'Ramsey County Polling Places',
            font: {
                family: 'Open Sans, Sans-serif',
                size: 25,
                color: 'black',
                align: 'left'
              },
 
            yanchor: 'middle'
        },
        font: {
            family: 'Helvetica',
            size: 12,
            color: '#2222aa'
          },
        dragmode: 'zoom',
        mapbox: {
          center: {
            lat: d['lat'][128],
            lon: d['lon'][128]
          },

          domain: {
            x: [0, 1],
            y: [0, 1]
          },
          style: 'light',
          zoom: 14,
          
        },
        margin: {
          r: 5,
          t: 50,
          b: 5,
          l: 5,
          pad: 0
        },
        xaxis: {
            linecolor: 'black',
            linewidth: 2,
            mirror: true
          },
          yaxis: {
            linecolor: 'black',
            linewidth: 2,
            mirror: true
          },
        paper_bgcolor: '#ffffff',
        plot_bgcolor: '#9d2235',
        showlegend: false,
        modebardisplay: false
     };

     Plotly.setPlotConfig({
        mapboxAccessToken: "pk.eyJ1IjoiYmxyb3NlbmJlcmciLCJhIjoiY2xhMjQ1amkwMDI4eDN3bnlpMW5uOHV2ciJ9.SjZWqAkIvBzadggj9ghVRA"
    })

     Plotly.newPlot("myDiv", data2, layout, {showLink: false, displayModeBar: false});

});




