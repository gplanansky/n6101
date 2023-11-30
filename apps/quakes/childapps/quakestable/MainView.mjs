import Viewport from '../../../../node_modules/neo.mjs/src/container/Viewport.mjs';

/**
 * @class QuakesTable.MainView
 * @extends Neo.container.Viewport
 */
class MainView extends Viewport {
    static config = {

        /**
         * @member {String} className='QuakesTable.MainView'
         * @protected
         */
        className: 'QuakesTable.MainView',
        /**
         * @member {Object} layout={ntype:'fit'}
         */
        layout: {ntype: 'fit'}
    }
}

Neo.applyClassConfig(MainView);

export default MainView;
