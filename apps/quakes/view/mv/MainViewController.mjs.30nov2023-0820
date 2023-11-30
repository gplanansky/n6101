import ComponentController from '../../../node_modules/neo.mjs/src/controller/Component.mjs';
import NeoArray            from '../../../node_modules/neo.mjs/src/util/Array.mjs';

/**
 * @class Quakes.view.MainViewController
 * @extends Neo.controller.Component
 */
class MainViewController extends ComponentController {
    static config = {
        /**
         * @member {String} className='Quakes.view.MainViewController'
         * @protected
         */
        className: 'Quakes.view.MainViewController',
        /**
         * @member {String} ntype='mainview-controller'
         * @protected
         */
        ntype: 'mainview-controller',
        /**
         * @member {String[]} connectedApps=[]
         */
        connectedApps: [],
        /**
         * @member {Object[]|null} data=null
         */
        data: null,


    }

    /**
     * @param {String} containerReference
     * @param {String} url
     * @param {String} windowName
     */
    createPopupWindow(containerReference, url, windowName) {
        let me = this;

        Neo.Main.getWindowData().then(winData => {
            me.component.getDomRect(me.getReference(containerReference).id).then(data => {
                let {height, left, top, width} = data;

                height -= 50; // popup header in Chrome
                left   += winData.screenLeft;
                top    += (winData.outerHeight - winData.innerHeight + winData.screenTop);

                Neo.Main.windowOpen({
                    //url           : `../${url}/index.html`,
                    //url           : `./${url}/index.html`,
                    url           : `${url}/index.html`,
                    windowFeatures: `height=${height},left=${left},top=${top},width=${width}`,
                    windowName
                });
            });
        });
    }

    /**
     * @param {String} [appName]
     * @returns {Neo.component.Base}
     */
    getMainView(appName) {
        if (!appName || appName === 'Quakes') {
            return this.component;
        }

        return Neo.apps[appName].mainView;
    }

    /**
     * @param {Object} data
     * @param {String} data.appName
     */
    onAppConnect(data) {
        let me   = this,
            maximizeButton,
            name = data.appName,
            parentView, style, view;

        console.log('onAppConnect', name);

        switch (name) {
            case 'QuakesMap':
                view = me.getReference('mainview-mapcontainerRef');
                parentView = Neo.getComponent(view.parentId);
                //parentView.storeReferences();

                maximizeButton = me.getReference('mapwindow-maximizebuttonRef');
                style = maximizeButton.style || {display: 'none'};
                style.display = 'none';
                maximizeButton.style = style;

                break;

            case 'QuakesTable':
                view = me.getReference('mainview-tablecontainerRef');
                parentView = Neo.getComponent(view.parentId);
                //parentView.storeReferences();

                maximizeButton = me.getReference('tablewindow-maximizebuttonRef');
                style = maximizeButton.style || {display: 'none'};
                style.display = 'none';
                maximizeButton.style = style;

                break;
            case 'QuakesTime':
                view = me.getReference('mainview-timecontainerRef');
                parentView = Neo.getComponent(view.parentId);
                //parentView.storeReferences();

                maximizeButton = me.getReference('timewindow-maximizebuttonRef');
                style = maximizeButton.style || {display: 'none'};
                style.display = 'none';
                maximizeButton.style = style;

                break;
            case 'QuakesChart':
                view = me.getReference('mainview-chartcontainerRef');
                parentView = Neo.getComponent(view.parentId);
                //parentView.storeReferences();

                maximizeButton = me.getReference('chartwindow-maximizebuttonRef');
                style = maximizeButton.style || {display: 'none'};
                style.display = 'none';
                maximizeButton.style = style;
                
                break;
            case 'QuakesChartjs':
                view = me.getReference('mainview-chartjscontainerRef');
                parentView = Neo.getComponent(view.parentId);
                //parentView.storeReferences();

                maximizeButton = me.getReference('chartjswindow-maximizebuttonRef');
                style = maximizeButton.style || {display: 'none'};
                style.display = 'none';
                maximizeButton.style = style;
                
                break;
                
        }

        if (view) {
            NeoArray.add(me.connectedApps, name);

            parentView.remove(view, false);

            Neo.apps[name].on('render', () => {
                setTimeout(() => {
                    me.getMainView(name).add(view);
                }, 100);
            });

        }
    }

    /**
     * @param {Object} data
     * @param {String} data.appName
     */
    onAppDisconnect(data) {
        let me         = this,
            name       = data.appName,
            parentView = me.getMainView(name),
            view       = parentView.items[0],
            index, style, maximizeButton;

        console.log('onAppDisconnect', name);

        switch (name) {
            case 'Quakes':
                Neo.Main.windowClose({
                    names: me.connectedApps,
                });
                break;
            case 'QuakesMap':                                
            case 'QuakesTable':                
            case 'QuakesTime':
            case 'QuakesChart':
            case 'QuakesChartjs':
                view = parentView.items[0];
                break;
        }

        if (view) {
            NeoArray.remove(me.connectedApps, name);

            parentView.remove(view, false);

            switch (name) {
                case 'QuakesMap':
                    maximizeButton = me.getReference('mapwindow-maximizebuttonRef');
                    style = maximizeButton.style || {display: 'none'};
                    style.display = null;
                    maximizeButton.style = style;

                    me.getReference('mainview-mapslotRef').add(view);
                    break;

                case 'QuakesTable':
                    maximizeButton = me.getReference('tablewindow-maximizebuttonRef');
                    style = maximizeButton.style || {display: 'none'};
                    style.display = null;
                    maximizeButton.style = style;

                    me.getReference('mainview-tableslotRef').add(view);
                    break;

                case 'QuakesTime':
                    maximizeButton = me.getReference('timewindow-maximizebuttonRef');
                    style = maximizeButton.style || {display: 'none'};
                    style.display = null;
                    maximizeButton.style = style;

                    me.getReference('mainview-timeslotRef').add(view);
                    break;
                case 'QuakesChart':
                    maximizeButton = me.getReference('chartwindow-maximizebuttonRef');
                    style = maximizeButton.style || {display: 'none'};
                    style.display = null;
                    maximizeButton.style = style;

                    me.getReference('mainview-chartslotRef').add(view);
                    break;
                case 'QuakesChartjs':
                    maximizeButton = me.getReference('chartjswindow-maximizebuttonRef');
                    style = maximizeButton.style || {display: 'none'};
                    style.display = null;
                    maximizeButton.style = style;

                    me.getReference('mainview-chartjsslotRef').add(view);
                    break;

            }

            Neo.apps[name].destroy();
        }
    }


    /**
     *
     */
    onComponentConstructed() {
        super.onComponentConstructed();

    }

    /**
     *
     */
    onConstructed() {
        super.onConstructed();

        let me = this;

        Neo.currentWorker.on({
            connect   : me.onAppConnect,
            disconnect: me.onAppDisconnect,
            scope     : me
        });

        me.component.on('mounted', me.onMainViewMounted, me);
    }


    /**
     *
     */
    onMainViewMounted() {
        let me = this;
    }

    /**
     * @param {Object} data
     */

    onMapWindowMaximizeButtonClick(data) {
        console.log('MainViewController on MapWindowMaximizeButtonClick(data) data: ', data);
        this.createPopupWindow('mainview-mapcontainerRef', 'childapps/quakesmap', 'QuakesMap');
    }

    onTableWindowMaximizeButtonClick(data) {
        console.log('MainViewController on TableWindowMaximizeButtonClick(data) data: ', data);
        this.createPopupWindow('mainview-tablecontainerRef', 'childapps/quakestable', 'QuakesTable');
    }
    
    onTimeWindowMaximizeButtonClick(data) {
        console.log('MainViewController on TimeWindowMaximizeButtonClick(data) data: ', data);
        this.createPopupWindow('mainview-timecontainerRef', 'childapps/quakestime', 'QuakesTime');
    }


    onChartWindowMaximizeButtonClick(data) {
        console.log('MainViewController on ChartWindowMaximizeButtonClick(data) data: ', data);
        this.createPopupWindow('mainview-chartcontainerRef', 'childapps/quakeschart', 'QuakesChart');
    }

    onChartjsWindowMaximizeButtonClick(data) {
        console.log('MainViewController on ChartjsWindowMaximizeButtonClick(data) data: ', data);
        this.createPopupWindow('mainview-chartjscontainerRef', 'childapps/quakeschartjs', 'QuakesChartjs');
    }

}

Neo.applyClassConfig(MainViewController);

export default MainViewController;
