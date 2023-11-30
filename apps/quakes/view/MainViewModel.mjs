import Base from '../../../node_modules/neo.mjs/src/model/Component.mjs';
import Store from './MyStore.mjs';

class MainViewModel extends Base {
    static config = {
        className: 'quakes.view.MainViewModel',
        data: {
            plotconf: {
                "data": [{ "y": [0, 3, 1, 4] }],
                "layout": { "width": 500, "height": 400}
            },
        },
        stores: {
            earthquakes: {
                module: Store,
                model: {
                    fields: [{
                        name: 'humanReadableLocation'
                    }, {
                        name: 'size',
                        ntype: 'data-field-float',
                    }, {
                        name: 'timestamp',
                        type: 'Date'
                    }, {
                        name: 'title',
                        calculate: (data, field, item) => item.humanReadableLocation
                    }, {
                        name: 'position',
                        calculate: (data, field, item) => ({ lat: item.latitude, lng: item.longitude })
                    }]
                },
                url: 'https://apis.is/earthquake/is',  //good url
                //url: 'https://apis.is/earthquake/isX',   //bad url
                //url: 'https://nytimes.com',   //bad url
                //url: 'https://nameless-tundra-27404.herokuapp.com/go/', //bad url
                responseRoot: 'results',
                ajaxAPI: 'neoFetch',
                //ajaxAPI: 'fetch',
                autoLoad: true
            }
        }
    }
}

Neo.applyClassConfig(MainViewModel);
export default MainViewModel;
