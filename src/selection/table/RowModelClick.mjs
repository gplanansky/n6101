import RowModel    from '../../../node_modules/neo.mjs/src/selection/table/RowModel.mjs';
import VDomUtil    from '../../../node_modules/neo.mjs/src/util/VDom.mjs';

/**
 * @class RowModelClick
 * @extends Neo.selection.RowModel
 */
class RowModelClick extends RowModel {
    static config = {
        /**
         * @member {String} className='Selection.table.RowModelClick'
         * @protected
         */
        className: 'RowModelClick',
    }

    //construct(config) {
    //    super.construct(config);
    //}


    /**
     * @param {Object} data
     */
    onRowClick(data) {
        console.log('RowModelClick onRowClick');
        
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

Neo.applyClassConfig(RowModelClick);

export default RowModelClick;
