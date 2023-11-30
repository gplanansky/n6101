import Base from '../../../node_modules/neo.mjs/src/table/Container.mjs';

class Table extends Base {
    static config = {
        className: 'quakes.view.Table',
        ntype: 'quakes-table',
        columns: [{
            dataField: 'timestamp',
            text: 'Date',
            flex: 1,
            renderer: data => data.value.toLocaleDateString(undefined, {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})
        }, {
            dataField: 'humanReadableLocation',
            text: 'Location',
            flex: 1,
        }, {
            dataField: 'size',
            text: 'Magnitude',
            align: 'right',
            flex: 1,
            renderer: data => data.value.toLocaleString()
        }]
    }
}

Neo.applyClassConfig(Table);
export default Table;
