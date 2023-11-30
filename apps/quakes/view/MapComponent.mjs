import Viewport            from '../../../node_modules/neo.mjs/src/container/Viewport.mjs';
import ViewModel           from './MainViewModel.mjs';
import GoogleMapsComponent from '../../../node_modules/neo.mjs/src/component/wrapper/GoogleMaps.mjs';

class MapComponent extends GoogleMapsComponent {
    static config = {
        className: 'Quakes.view.MapComponent',
        autoMount: true,
        //controller: { module: controller},
        model: { module: ViewModel},
        items: [{
            module: GoogleMapsComponent,
            bind: {markerStore: 'stores.earthquakes'},
            listeners: {
                markerClick: data => {
                    console.log(data.data.record); 
                }
            },
            flex: 1,
            center: {
                lat: 64.8014187,
                lng: -18.3096357
            },
            zoom: 6,
        }]
    };

    afterSetMounted(value, oldValue) {
        let me = this;

        if (value === false && oldValue !== undefined) {
            me.removeMap();
        }

        super.afterSetMounted(value, oldValue);

        if (value) {
            let opts = {
                appName          : me.appName,
                center           : me.center,
                fullscreenControl: me.fullscreenControl,
                id               : me.id,
                mapOptions       : me.mapOptions,
                maxZoom          : me.maxZoom,
                minZoom          : me.minZoom,
                zoom             : me.zoom,
                zoomControl      : me.zoomControl
            };

            setTimeout(() => {
                Neo.main.addon.GoogleMaps.create(opts).then(() => {
                    me.mapCreated = true;
                    me.onComponentMounted()
                })
            }, 50)
        }
    }

    onComponentMounted() {
        let me = this;
        
        console.log('MapComponent.mjs onComponentMounted invoking onMarkerStoreLoad(), "this": ', this);
        console.log('MapComponent.mjs onComponentMounted invoking onMarkerStoreLoad(), "appName"": ', this.appName);

    //    if ( this?.appName === "QuakesMap" ) {
        if ( this?.mapCreated ) {
            me.onMarkerStoreLoad();
        }
    }


}

Neo.applyClassConfig(MapComponent);

export default MapComponent;
