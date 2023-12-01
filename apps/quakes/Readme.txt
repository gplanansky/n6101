quakes.table-map-time-plotly-chartjs

Neo Mjs demo, of 5 components  table, map, time,  plotly, chartjs,
that move to a separate shared worker window screen.

It demos both the shared window mechanism, and shows some new p.o.c.
components, including  Neo wraps for plotly.js and chartjs.   

And, a Neo Store extension that will optionally use fetch instead of Xhr.
Plus, how to use the workspace src/main/adddon dir to hold your
custom addons.   That workspace source dir is also a convenient place 
to put other reused components.

That shared windows aspect of this demo Tdistills the Neo Shared Covid
app and other Neo examples to a repetitive template "compoment slot" 
patterns in MainView.mjs, corresponding handlers that deal with popup 
window creation and destruction MainViewController.mjs, 
and a matched set of childapps/popup-app-dirs.

Mainview.mjs

     5 items, each being  a component slot with nested containers and reference names, including a button & handler name for creating a separate popup window.

I used a container hierarchy that I thought would allow some flexibility. The layout (flex spec) is primitive.  It might better be done with a TabContainer.
     
MainviewController.mjs

     5 button handlers that invoke Neo's createPopupWindow.

     onAppConnect method that matches the component to the new popup window
        note the logic that disappears the button from the popup window
        incarnation of the component.

     onAppDisconnect method to handle killing the popup window

5 childapps/componentname/{index.html,app.mjs,neo-config.json,MainView.mjs}

  these apply to the popup window, and correspond to the 5 urls used.

  Note that the orginal app has the appname Quakes, and the respective popup windows
  have their own names  QuakesMap, QuakesTable, etc. .  You have to get all that naming
  right.

  You also have to get the slightly different paths, compared to the main app 
  neo-config.json file, used in the childapps neo-config.json files, right.
 
In MainView.mjs, I used a container hierarchy that I thought would allow some
flexibility.  

table: Table.mjs
     vanilla Neo table
     displays Iceland earthquake data records, record -> row, from the store
     onclick -> comsole.log: record for that row

map: MapComponent.mjs
     extends src/component/wrapper/GoogleMaps.mjs
     displays Iceland earthquake data from the store as map markers        
     sticks with default markers
     onclick -> markerClick listener -> console.log : record for that marker
     logic to load markers on initial component load, and reload markers for 
        the shared worker window
      
time: TimeCompoent.mjs
     self-contained novel neo component, does not invoke main/addOn/time-whatever
     useful to test the shared window setup

plotly chart:  

    PlotlyComponent.mjs 
    Neo p.o.c. of Plotly.js chart library call.

    calls Neo.main.addon.PlotlyChart.newPlot(plotconf) in
    src/main/addon/PlotlyChart.mjs . Actually in 
     workspace/src/main/addon/PlotlyChart.mjs, per neo-config.mjs.

    note:  Neo.main.addon.PlotlyChart.newPlot(plotconf) 
    plotconf includes  appName  field value, needed by
    Neo to id the worker involved.   This value changes
    for the shared window.
         
    PlotlyChart.mjs  -- Neo p.o.c. wrapper for Plotly.js
    Work in progress! 
        
    hard-wired plot configs,
    onclick 2 handlers:
        PlotlyComponent.mjs listener: parseClick: data
        main/addon/PlotlyChart.mjs configures plotly library click  handler:
            console.log plotly_click
        additional handlers --
            not picking up doubleclick. Plotly uses doubleclick to restore zoom,
         perhaps that is the reason.
           see https://plotly.com/javascript/plotlyjs-events/#double-click-event

     PlotlyChart.mjs  -- Neo p.o.c. wrapper for Plotly.js
         work in progress! 

chartjs chart:

   Work in Progress! an initial poc with ChartjsWrapper.mjs and an addon Chartjs.mjs.
   the chart data are hardwired.
   this currently uses a vanilla shared worked window

Also:

MyStore.mjs

  extends src/data/Store.mjs to optionally usesfetch instead of Xhr.

