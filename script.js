//    <script src="https://cdn.plot.ly/plotly-2.16.1.min.js"></script>

hamlineCoord = [[[-93.1637176774289, 44.9633693933355],
[-93.1637166745899, 44.9636068082378],
[-93.1638259510017, 44.9636058667381],
[-93.1642887474383, 44.9636020986195],
[-93.1642875870184, 44.9640678779952],
[-93.1670472064697, 44.9640493346361],
[-93.1670535983955, 44.9660156728897],
[-93.1678968687665, 44.9660134464492],
[-93.1679025537774, 44.9664556250093],
[-93.1677531380449, 44.9664562480592],
[-93.1677450536507, 44.9668587192654],
[-93.1670371197845, 44.9668572573513],
[-93.1670558580918, 44.9687523366148],
[-93.1629704661066, 44.9687918852697],
[-93.1607989195329, 44.9685804740049],
[-93.1607960542088, 44.9678134572746],
[-93.1607972017574, 44.9677131035545],
[-93.1623155422094, 44.9676908488288],
[-93.1627401230231, 44.9676873872315],
[-93.1627511967473, 44.967569562307],
[-93.1627386292548, 44.9673035507754],
[-93.1623128593523, 44.9673084515439],
[-93.162207390041, 44.9673096653263],
[-93.1621943556282, 44.9629020420632],
[-93.162516076493, 44.9629026650579],
[-93.1625201501839, 44.9633766869296],
[-93.1635914562844, 44.9633689290027],
[-93.1637176774289, 44.9633693933355]],
[[[-93.1637177845602, 44.96334399118],
[-93.1637176774289, 44.9633693933355],
[-93.1637149575595, 44.9628897413582],
[-93.1640581176166, 44.9628877918327],
[-93.1640578413832, 44.9629958226544],
[-93.1640578315224, 44.9633408362207],
[-93.1637177845602, 44.96334399118]]]]

h1lat = []
h1lon = []
h2lat = []
h2lon = []

for (let i=0;i<hamlineCoord[0].length;i++) {
    h1lon.push(hamlineCoord[0][i][0])
    h1lat.push(hamlineCoord[0][i][1])
}
for (let i=0;i<hamlineCoord[1].length;i++) {
    h2lon.push(hamlineCoord[1][i][0])
    h2lat.push(hamlineCoord[1][i][1])
}

let zoomLevel = 14

if (window.innerWidth < 900) {
    zoomLevel = 13
}


d3.csv('TwinCitiesPollingPlaces.csv', function(error, data) {
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

    let hancock = {}
    hancock['Name'] = [d['Name'][125]]
    hancock['Address'] = [d['Address'][125]]
    hancock['Zip'] = [d['Zip'][125]]
    hancock['lat'] = [d['lat'][125]]
    hancock['lon'] = [d['lon'][125]]
    hancock['Text'] = [d['Text'][125]]


    k = Object.keys(d)

    for (let i=0;i<k.length;i++) {
        o = k[i]
        d[o][125] = d[o][124]

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

    tposOptions = ['top right', 'top left']
    tpos = []
    for (let i=0;i<d['Name'].length;i++) {
        if (i != 125) {
            tpos.push(tposOptions[0])
        } else {
            tpos.push(tposOptions[1])
        }
    }
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
          size: 10,

        },
        text: d['Text'],
        textposition: tpos[0]
    })

    data2.push({
        type: 'scattermapbox',
        mode: 'markers+text',
        hoverinfo: 'none',


        hovertext: hancock['Text'],

        lon: hancock['lon'],
        lat: hancock['lat'],
        marker: {
          color: 'blue',
          reversescale: true,
          opacity: 0.5,
          size: 10,

        },
        text: hancock['Text'],
        textposition: 'top left'
    })

    data3 = []
    data3.push({
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
        textposition: tpos[0]
    })

    data3 = []

    data3.push({
        type: 'scattermapbox',
        mode: 'markers+text',
        hoverinfo: 'none',
        hovertext: '',
        lon: [h1lon[4]],
        lat: [h1lat[3]+.0055],
        z: [20],
        marker: {
            color: 'black',
            reversescale: true,
            opacity: 0,
            size: 10,
        },
        text: 'Hamline University',
        textposition: 'center'
    })

    data2.push( {
        type: 'choroplethmapbox',
        locations: ['MN'],
        coloraxis: 'coloraxis',
        text: 'Hamline University',
        textposition: 'bottom',

        z: [10],
        geojson: {
            type: "Feature",
            id: 'MN',
            geometry: {
                type: "Polygon",
                coordinates: hamlineCoord
            }
        }
    })





    
    layout = {
        title: {
            text: 'Polling Places Near Hamline',
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
          coloraxis: {
            showscale: false,
            colorscale: [
                [0, '#9d2235'],
                [1, '#9d2235']
            ]
        },
        dragmode: 'zoom',
        mapbox: {
          center: {
            lat: h1lat[3]+.0035,
            lon: h1lon[4]
          },

          domain: {
            x: [0, 1],
            y: [0, 1]
          },
          style: 'light',
          zoom: zoomLevel,
          
        },
        width: window.innerWidth-18,
        height: window.innerHeight-18,
        margin: {
          r: 5,
          t: 50,
          b: 5,
          l: 5,
          pad: 0
        },

        paper_bgcolor: '#ffffff',
        plot_bgcolor: '#9d2235',
        showlegend: false,
        modebardisplay: false
     };

     Plotly.setPlotConfig({
        mapboxAccessToken: "pk.eyJ1IjoiYmxyb3NlbmJlcmciLCJhIjoiY2xhMjQ1amkwMDI4eDN3bnlpMW5uOHV2ciJ9.SjZWqAkIvBzadggj9ghVRA"
    })

     Plotly.newPlot("myDiv", data2, layout, {
        showLink: false, 
        displayModeBar: false,
    }, );

    //Plotly.update("myDiv", layout_update={textposition: tpos})

});




