import NeoStore        from '../../../node_modules/neo.mjs/src/data/Store.mjs';

class MyStore extends NeoStore {

    static config = {
        className: 'Quakes.view.MyStore',
        ntype: 'mystore',
        useFetch: true
    }

    load(opts={}) {
        let me     = this,
            params = {page: me.currentPage, pageSize: me.pageSize, ...opts.params};

        if (me.remoteFilter) {
            params.filters = me.exportFilters();
        }

        if (me.remoteSort) {
            params.sorters = me.exportSorters();
        }

        if (me.api) {
            let apiArray = me.api.read.split('.'),
                fn       = apiArray.pop(),
                service  = Neo.ns(apiArray.join('.'));

            if (!service) {
                console.log('Api is not defined', this);
            } else {
                service[fn](params).then(response => {
                    response = Neo.ns(me.responseRoot, false, response);

                    if (response.success) {
                        me.totalCount = response.totalCount;
                        me.data       = Neo.ns(me.responseRoot, false, response); // fires the load event
                    }
                });
            }
        } else {
            opts.url ??= me.url;
            
            if ( ! this.useFetch ) {  // use default of NeoXhr
            
                Neo.Xhr.promiseJson(opts).catch(err => {
                    console.log('in xhr Error for Neo.Xhr.request', err, me.id);
                }).then(data => {
                    me.data = Neo.ns(me.responseRoot, false, data.json) || data.json;
                    // we do not need to fire a load event => onCollectionMutate()
                }).catch(err=> {
                    console.log('Error in Store.load', err, me.id);
                })

            } else {

              console.log('gpDebug yo MyStore.mjs: using Neo.Fetch.get(', opts, ')');
               
               Neo.Fetch.get(opts).
               catch(err => {
                   console.log('MyStore Neo.Fetch err: ',err);
                   Neo.Main.alert({message: err}); 
               }).
               then(response => {
                   console.log('MyStore: Neo.Fetch.get(opts) response: response', response);
                   //me.data = Neo.ns(me.responseRoot, false, response.json) || response.data.results;
                   me.data = response.results;
                   console.log('MyStore: Neo.Fetch.get(opts) me.data: ', me.data );
                   // we do not need to fire a load event => onCollectionMutate()
                }).
                catch(err=> {
                    console.log(`Error in MyStore fetch download from ${me.url}:`, err, me.id);
                })
            }
        }

        super.load(opts={});
    }

}

Neo.applyClassConfig(MyStore);

export default MyStore;
