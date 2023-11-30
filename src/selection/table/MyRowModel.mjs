import RowModel    from '../../../node_modules/neo.mjs/src/selection/table/RowModel.mjs';
import VDomUtil from '../../../node_modules/neo.mjs/src/util/VDom.mjs';

/**
 * @class MyRowModel
 * @extends Neo.selection.table.RowModel
 */
class MyRowModel extends RowModel {
    static config = {
        /**
         * @member {String} className='Neo.selection.table.RowModel'
         * @protected
         */
        className: 'MyRowModel',
        /**
         * @member {String} ntype='selection-table-rowmodel'
         * @protected
         */
        //ntype: 'selection-table-rowmodel',
        /**
         * @member {String} cls='selection-rowmodel'
         * @protected
         */
        //cls: 'neo-selection-rowmodel'
    }


    /**
     * @param {Object} data
     */
    onRowClick(data) {
        let me   = this,
            node = RowModel.getRowNode(data.path),
            id   = node?.id,
            view = me.view,
            isSelected, record;
            
        if (! id) { return };
        
        record = view.store.getAt(VDomUtil.findVdomChild(view.vdom, id).index);

        if (data.altKey) {
            view.fire('altSelect', {data, record})
        } else if (data.ctrlKey ) {
            view.fire('ctrlSelect', {data, record})
        } else if (data.metaKey ) {
            view.fire('metaSelect', {data, record})
        } else if (data.shiftKey ) {
            console.log('MyRowModel.mjs onRowClick shiftkey');
            view.fire('shiftSelect', {data, record})            
        } else {
            me.toggleSelection(id);
            isSelected = me.isSelected(id);

            !isSelected && view.onDeselect?.(record);

            view.fire(isSelected ? 'select' : 'deselect', {
                record
            });
        }

    }
}

Neo.applyClassConfig(MyRowModel);

export default MyRowModel;
