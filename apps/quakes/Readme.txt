quakes.table-map-time-plotly

table: Table.mjs
       onclick -> comsole.log : record

map: MapComponent.mjs
     extends src/component/wrapper/GoogleMaps.mjs'
        to reload markers on shared window
     on simple markers,
     MainView markerClick listener -> console.log : record
      
time: TimeCompoent.mjs
      self-contained (does not invoke main/addOn/time-whatever

      note: check out the none-vdom version.
      
      note:  I did another time component with the idea of
      running it as a main addon.  check those out.

In MainView.mjs we import either PlotlyComponent.mjs.vdom  or PlotlyComponent.mjs.novdom
these are the same (or should be) except that one uses vdom cn and the other
does not. The vdom cn may be specifying too specific an id ... should test
with two instances of the chart.

Also one of them I think uses await while the other uses setTimeout.   

PlotlyChartwrapper.mjs does not use vdom, and uses setTimeout.
It can probably eliminated.

plotly: PlotlyComponent.mjs    
        
        hard-wired plot configs,
        onclick 2 handlers:
          PlotlyComponent.mjs listener: parseClick: data
          main/addon/PlotlyChpart.mjs configures plotly library click  handler: console.log plotly_click
       additional handlers --
         not picking up doubleclick.  note that Plotly uses doubleclick to restore zoom,
         perhaps that is the reaons.
           see https://plotly.com/javascript/plotlyjs-events/#double-click-event

plotly: PlotlyChartWrapper.mjs
        does not use vdom
        hard-wired plot configs,
        onclick 2 handlers:
          PlotlyComponent.mjs listener: parseClick: data
          main/addon/PlotlyChpart.mjs configures plotly library click  handler: console.log plotly_click
       additional handlers --
         not picking up doubleclick.  note that Plotly uses doubleclick to restore zoom,
         perhaps that is the reaons.
           see https://plotly.com/javascript/plotlyjs-events/#double-click-event

Also:

MyStore.mjs

  extends src/data/Store.mjs'
  uses Neo.fetch option

  see:  /Users/george/neo/ws/neo-5.10.13/apps/plot/view/MyStore.mjs

  Need to revisit MyStore and the changes to fetch.

