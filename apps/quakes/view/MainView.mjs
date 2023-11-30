import Viewport           from "../../../node_modules/neo.mjs/src/container/Viewport.mjs";
import Container          from "../../../node_modules/neo.mjs/src/container/Base.mjs";
import Table              from "./Table.mjs";
import ViewModel          from './MainViewModel.mjs';
import MapComponent       from './MapComponent.mjs';
//import MapComponent       from '../../../node_modules/neo.mjs/src/component/wrapper/GoogleMaps.mjs';
import PlotlyComponent    from './PlotlyComponent.mjs';
import ChartjsWrapper     from './ChartjsWrapper.mjs';
import TimeComponent      from './TimeComponent.mjs';
import MainViewController from './MainViewController.mjs';

class MainView extends Viewport {

    static config = {
        className: "Quakes.view.MainView",
        autoMount: true,
        controller: { module: MainViewController},
        model: { module: ViewModel},
        layout: {ntype: 'flexbox', align: 'stretch'},
        items: [{
            module: Container,
            reference: 'mainview-tableslotRef',
            flex: '0 0 1',
            items: [{
                module: Container,
                reference: 'mainview-tablecontainerRef',
                width: '650px',
                items: [{
                    ntype: 'button',
                    reference: 'tablewindow-maximizebuttonRef',
                    handler: 'onTableWindowMaximizeButtonClick',
                    iconCls: 'far fa-window-maximize',
                    text: 'Separate Window',
                    height: '25px'
                }, {
                    module: Container,
                    reference: 'mainview-tableRef',
                    items: [{
                        html: '<h1>Table</h1>',
                        style: { textAlign: 'center' },
                        height: '75px'
                    }, {
                        module: Table,
                        bind: {store: 'stores.earthquakes'},
                        listeners: {
                            select: (data) => {
                                console.log(data.record);
                            }
                        }
                    }]
                }],
            }]
        }, {
            module: Container,
            reference: 'mainview-mapslotRef',
            flex: '0 0 1',
            items: [{
                module: Container,
                reference: 'mainview-mapcontainerRef',
                width: '650px',
                items: [{
                    ntype: 'button',
                    reference: 'mapwindow-maximizebuttonRef',
                    handler: 'onMapWindowMaximizeButtonClick',
                    iconCls: 'far fa-window-maximize',
                    text: 'Separate Window',
                    height: '25px'
                }, {
                    module: Container,
                    reference: 'mainview-mapRef',
                    items: [{
                        html: '<h1>Map</h1>',
                        style: { textAlign: 'center' },
                        height: '75px'
                    }, {
                        module: MapComponent,
                        flex: 1,
                        bind: {markerStore: 'stores.earthquakes'},
                        listeners: {
                            markerClick: data => {
                                console.log(data.data.record); 
                            }
                        },
                        center: {
                            lat: 64.8014187,
                            lng: -18.3096357
                        },
                        zoom: 6,
                    }]
                }],
            }]
        }, {
            module: Container,
            reference: 'mainview-timeslotRef',
            flex: '0 0 1',
            items: [{
                module: Container,
                reference: 'mainview-timecontainerRef',
                layout: {ntype: 'vbox'},
                width: 200,
                height: 200,
                items: [{
                    ntype  : 'button',
                    reference: 'timewindow-maximizebuttonRef',
                    handler: 'onTimeWindowMaximizeButtonClick',
                    iconCls: 'far fa-window-maximize',
                    text: 'seperate window',
                    height: '25px'
                    
                }, {
                    module: Container,
                    reference: 'mainview-timeRef',
                    items: [{
                        html: '<h1>Time</h1>',
                        style: { textAlign: 'center'},
                        height: '75px'
                    }, {
                        module: TimeComponent,
                        //reference: 'do not set, it overrides that in TimeComponent!',
                        timeRun: false 
                    }]
                }],
            }]
        }, {
            module: Container,
            reference: 'mainview-chartslotRef',
            flex: '0 0 1',
            items: [{
                module: Container,
                reference: 'mainview-chartcontainerRef',
                layout: {ntype: 'vbox'},
                //width: 650,
                width: 500,
                items: [{
                    ntype  : 'button',
                    reference: 'chartwindow-maximizebuttonRef',
                    handler: 'onChartWindowMaximizeButtonClick',
                    iconCls: 'far fa-window-maximize',
                    text: 'seperate window',
                    height: '25px'
                    
                }, {
                    module: Container,
                    reference: 'mainview-chartRef',
                    items: [{
                        html: '<h1>Chart</h1>',
                        style: { textAlign: 'center'},
                        height: '75px'
                    }, {
                        module: PlotlyComponent,
                        //html: 'site of Plotly',
                        //reference: 'do not set, it overrides that in the module',
                    }]
                }],
            }]
        }, {
            module: Container,
            reference: 'mainview-chartjsslotRef',
            flex: '0 0 1',
            items: [{
                module: Container,
                reference: 'mainview-chartjscontainerRef',
                layout: {ntype: 'vbox'},
                //width: 650,
                width: 400,
                height: 300,
                items: [{
                    ntype  : 'button',
                    reference: 'chartjswindow-maximizebuttonRef',
                    handler: 'onChartjsWindowMaximizeButtonClick',
                    iconCls: 'far fa-window-maximize',
                    text: 'seperate window',
                    height: '25px'
                    
                }, {
                    module: Container,
                    reference: 'mainview-chartjsRef',
                    items: [{
                        html: '<h1>Chartjs</h1>',
                        style: { textAlign: 'center'},
                        height: '75px'
                    }, {
                        module: ChartjsWrapper
                        //html: 'site of Chartjs',
                        //reference: 'do not set, it overrides that in the module',
                    }]
                }],
            }]


        }],
    };

}

Neo.applyClassConfig(MainView);

export default MainView;
