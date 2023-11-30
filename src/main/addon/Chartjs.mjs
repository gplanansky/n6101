import Base       from '../../../node_modules/neo.mjs/src/core/Base.mjs';
import DomAccess  from '../../../node_modules/neo.mjs/src/main/DomAccess.mjs';
import DomEvents  from '../../../node_modules/neo.mjs/src/main/DomEvents.mjs';
import Observable from '../../../node_modules/neo.mjs/src/core/Observable.mjs';

/**
 * @class Neo.main.addon.Chartjs
 * @extends Neo.core.Base
 * @singleton
 */
class Chartjs extends Base {

    static config = {
        /**
         * @member {String} className='Neo.main.addon.Chartjs'
         * @protected
         */
        className: 'Neo.main.addon.Chartjs',
        apiLoaded: false,
        automount: false,
        chartCreated: false,
        /**
         * Remote method access for other workers
         * @member {Object} remote={app: [//...]}
         * @protected
         */
        remote: {
            app: [
                'create',
                'sayChartjs'
            ]
        },
        /**
         * @member {String} chartjsPath='https://cdn.plot.ly/plotly-2.24.2.min.js'
         * @protected
         */
        chartjsPath: 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.js',
        //chartjsPath: '../../node_modules/plotly.js-dist/plotly.js',
        /**
         * @member {Boolean} singleton=true
         * @protected
         */
        singleton: true,
        chartConfig: {
            type: "line",
            data: {
                labels: [0, 1, 2, 3],
                datasets: [{
                    label: "y values",
                    data: [0, 3, 2, 4],
                }],
            },
            options: {},
        },
    }

    charts = {}

    /**
     * @param {Object} config
     */
    construct(config) {
        super.construct(config);
        this.loadApi();
    }

    async loadApi() {
        let me = this;
        await DomAccess.loadScript(me.chartjsPath);
        me.apiLoaded = true;
        console.log('addon/Chartjs.mjs API loaded path ', me.chartjsPath);
    }

    /**
     * chartjs demo return
     */
     sayChartjs(){
         return 'Chartjs rocks!'
     }


    /**
     * @param {Object} opts
     * @param {String} opts.id
     * @param {Object} opts.layout
     * @param {Object} opts.data
     */
    create(opts) {
        let me = this,
            chart,
            ctx;

        ctx = DomAccess.getElement(opts.id);

        //opts = me.chartConfig;
        let chartjsOpts = me.chartConfig;

        console.log(`addon/Chartjs.mjs opts.id: ${opts.id}, ctx: `, ctx);
        
        if ( ! me.apiLoaded ) {
            setTimeout( () => {
                console.log(`addon/Chartjs.mjs YES setTimeout before Chartjs.newChart`);
                //chart = new Chart(ctx, opts);
                chart = new Chart(ctx, chartjsOpts);
           }, 500);
        } else {
            console.log(`addon/Chartjs.mjs NO setTimeout before Chartjs.newChart`);
            //chart = new Chart(ctx, opts);
            chart = new Chart(ctx, chartjsOpts);
        };

        console.log('addon/Chartjs.mjs chart: ', chart);

        //me.fire('chartCreated', id);
    }

    /**
    (async () => {
        chart = await new Chart(id, opts);
        console.log(`addon/Chartjs.mjs THEN ${id} create new Plot chart: `, chart);
    })();
    **/

}

let instance = Neo.applyClassConfig(Chartjs);

export default instance;
