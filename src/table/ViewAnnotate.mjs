import VDomUtil      from '../../node_modules/neo.mjs/src/util/VDom.mjs';
import View          from '../../node_modules/neo.mjs/src/table/View.mjs';

/**
 * @class Neo.table.View
 * @extends Neo.component.Base
 */
class ViewAnnotate extends View {
    static config = {
        /**
         * @member {String} className='Neo.table.ViewAnnotate'
         * @protected
         */
        className: 'Quakes.view.ViewAnnotate',
        /**
         * @member {String} ntype='table-view-annotate'
         * @protected
         */
        ntype: 'table-view-annotate',
    }

    // construct does not seem to be needed    
    //construct(config) {
    //    super.construct(config);
    //}
    
    /**
     * @param {Object[]} inputData
     */
    createViewData(inputData) {

        let me             = this,
        amountRows, i, inputRecord, recordChangeUpdate, rowIndex;

        if ( ! Array.isArray(inputData) ) {
            if ( inputData?.model?.fields  && inputData.model.fields === this.store.model.fields) {
                recordChangeUpdate = true;
                inputRecord = inputData.record;
                rowIndex  = inputData.index;
                i = inputData.index;
                amountRows = i+1;
                inputData = [inputRecord];
            } else {
                console.log('Error: ViewAnnotate.mjs createViewData expected InputData store rows array or recordChange opts, got: ', inputData);
            }
        } else {
            recordChangeUpdate = false
            amountRows = inputData.length;
            i = 0;
        };

        let  tableContainer = me.parent,
            columns        = tableContainer.items[0].items,
            colCount       = columns.length,
            data           = [],
            vdom           = me.vdom,
            config, colspan, colspanKeys, column, dockLeftMargin, dockRightMargin, id, index, j, record, selectedRows, trCls;

        if (tableContainer.selectionModel.ntype === 'selection-table-rowmodel') {
            selectedRows = tableContainer.selectionModel.items || [];
        }

        for (; i < amountRows; i++) {
            console.log('ViewAnnotate.mjs createViewData i: ', i);
            record = recordChangeUpdate? inputRecord: inputData[i];
            colspan     = record[me.colspanField];
            colspanKeys = colspan && Object.keys(colspan);
            id          = me.getRowId(record, i);

            me.recordVnodeMap[id] = i;


            trCls = me.getTrClass(record, i);

            if ( selectedRows ) {

                if ( record?.annotation?.selected ) {
                    if (! selectedRows?.includes(id) ) {
                        selectedRows.push(id);
                    };
                    trCls.push('neo-selected');
                } else {
                    if (selectedRows?.includes(id) ){
                        // remove id from selectedRows
                        selectedRows = selectedRows.filter(val => val !== id);
                        // alternative can we trust either?
                        // i = selectedRows.length; while (i--) {if (selectedRows[i] === "red") {selectedRows.splice(i,1)} }
                    };
                    trCls = me.getTrClass(record, i);
                }

            }

            data[i] = ({
                tag     : 'tr',
                id,
                cls     : trCls,
                cn      : [],
                tabIndex: '-1'
            });

            dockLeftMargin  = 0;
            dockRightMargin = 0;

            j = 0;

            for (; j < colCount; j++) {
                column = columns[j];
                config = me.applyRendererOutput({column, record, index: i, tableContainer});

                if (column.dock) {
                    config.cls = ['neo-locked', ...config.cls || []];

                    if (column.dock === 'left') {
                        config.style.left = dockLeftMargin + 'px';
                        dockLeftMargin += (column.width + 1); // todo: borders fix
                    }
                }

                if (column.flex) {
                    config.style.width = '100%';
                }

                data[i].cn.push(config);

                if (colspanKeys?.includes(column.dataField)) {
                    j += (colspan[column.dataField] - 1)
                }
            }

            j = 0;

            for (; j < colCount; j++) {
                index  = colCount - j -1;
                column = columns[index];

                if (column.dock === 'right') {
                    data[i].cn[index].style.right = dockRightMargin + 'px';
                    dockRightMargin += (column.width + 1); // todo: borders fix
                }

                if (colspanKeys?.includes(column.dataField)) {
                    j += (colspan[column.dataField] - 1)
                }
            }
        }


        if ( ! recordChangeUpdate ){
           vdom.cn = data;
        } else {
           vdom.cn[rowIndex] = data[rowIndex];;
        }

        Object.assign(tableContainer, {dockLeftMargin, dockRightMargin});

        console.log(`ViewAnnotate.mjs createViewData recordChangeUpdate: ${recordChangeUpdate}, rowIndex: ${rowIndex}`);

        me.promiseUpdate().then(() => {
            if (selectedRows?.length > 0) {
               if ( !recordChangeUpdate ) {
                   console.log('ViewAnnotate.mjs promiseUpdate ! recordChangeUpdate rowIndex', rowIndex);
                   Neo.main.DomAccess.scrollToTableRow({id: selectedRows[0],appName: me.appName});
               } else {
                   console.log('ViewAnnotate.mjs promiseUpdate recordChangeUpdate rowIndex', rowIndex);
                   let rowId = me.getRowId(inputRecord, rowIndex)
                   Neo.main.DomAccess.scrollToTableRow({id: rowId, appName: me.appName});
               };
            };
        })

    }

    /**
     * Gets triggered after changing the value of a record field.
     * E.g. myRecord.foo = 'bar';
     * @param {Object} opts
     * @param {Object[]} opts.fields Each field object contains the keys: name, oldValue, value
     * @param {Neo.data.Model} opts.model The model instance of the changed record
     * @param {Object} opts.record
     */

    onStoreRecordChange(opts) {
        this.createViewData(opts);
    }
}

Neo.applyClassConfig(ViewAnnotate);

export default ViewAnnotate;
