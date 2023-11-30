import ComponentBase  from '../../../node_modules/neo.mjs/src/component/Base.mjs';
import VDomUtil       from '../../../node_modules/neo.mjs/src/util/Vdom.mjs';

class ChartjsWrapper extends ComponentBase {
    static config = {
        /**
         * @member {String} className='Quakes.view.ChartjsWrapper'
         * @protected
         */
        className: 'Quakes.view.ChartjsWrapper',
        /**
         * @member {String} ntype='chartjs-chart'
         * @protected
         */
        //ntype: 'chartjs-chart',
        ntype: 'chartjs-component',
        /**
         * @member {Object} chartLayout_=null
         */
        chartLayout_: null,
        //chartLayout_:  { "width": 500, "height": 400},
        /**
         * Stores the chart data
         * @member {Array|null} chartData_=null
         */
        chartData_: null,
        //chartData_:  [{ "y": [3, 2, 3] }],
        /**
         *@member {string} dataPath=''
         **/
        dataPath: '',
        //reference: 'chartjsRef',
        reference: 'chartjs-component-ref',
        _vdom: { tag: 'canvas',
                 id: 'chartjs-id',
                 flag: 'chartjs-flag',
        }

    }        

    construct(config) {
        super.construct(config);

        let me = this;

        me.addDomListeners({
            'chartjs_click'  : me.parseChartjsClick,
            'chartjs_contextmenu'  : me.parseChartjsContextmenu,
            local              : false,
            scope              : me
        })
    }

    async afterSetMounted(value, oldValue) {

        let me = this;
        
        super.afterSetMounted(value, oldValue);
        if (!value) return;

        /**
        if ( ! me.hasBeenMounted ) {
           me.hasBeenMounted = true
        } else {
          return
        };
        **/
      
        let opts = {
                appName : me.appName,
                id      : me.id,
                data    : me.chartData,
                layout  : me.chartLayout
            };

        console.log('ChartjsWrapper.mjs opts: ', opts);
        await me.timeout(500);
        Neo.main.addon.Chartjs.create(opts);

    }

    parseChartjsClick(data) {
        console.log('ChartjsWrapper parseChartjsClick data:',data);
        let me = this;

        /**
        me.fire('chartjsClick', {
            id: me.id,
            data
        })
        **/
    }

    parseChartjsContextmenu(data) {
        console.log('ChartjsChartWrapper parseChartjsContextmenu data:',data);
        let me = this;

        /**
        me.fire('ChartjsContextMenu', {
            id: me.id,
            data
        })
        **/
    }

}

Neo.applyClassConfig(ChartjsWrapper);

export default ChartjsWrapper;

