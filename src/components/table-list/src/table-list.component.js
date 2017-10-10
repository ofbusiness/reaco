/**
 * TableList is component to render data as list
 * ex: <TableList tableConfig={tableConfig} rowsCount={10} total={100} size={10} dataSize={10} />
 *  props: tableConfig: //(Object || Required) it is required and must be in below format
 *          {
 *              sortUpIcon: <i class="material-icons">&#xE5DB;</i>, //(String | Optional) :- sort up arrow, default is null
 *              sortDownIcon: <i class="material-icons">&#xE5DB;</i>, //(String | Optional) :- sort down arrow, default is null
 *              sortByField: 'age', //(String | Optional) :- enable sort for specific by default
 *              sortDirection: 'ASC | DESC', //(String | Optional) :- direction for default enabled sort, default is DESC
 *              sortCallback: func, //(Function | Optional) :- it calls after sort applied,   
 *              total:           
 *              columns: { //(Object | Required) :- columns config
 *                  name: {
 *                      header: 'name', //(String | Required) :- column title
 *                      type: 'link', //(String | Required) :- type of column, i.e link/text/date
 *                      width: 100, //(Number | Optional) :- width of column, default is 100
 *                      sortEnable: true, //(Boolean | Optional) :- if need to enable sort
 *                  },
 *                  age: {
 *                      header: 'age',
 *                      type: 'text',
 *                      width: 100,
 *                  },
 *                  dob: {
 *                      header: 'dob',
 *                      type: 'date',
 *                      dateFormat: 'MM DD YYYY', //if it is date type
 *                      width: 50,
 *                  }
 *              },
 *              data: [{ //(Array | Required) :- array of objects, i.e columns data. Note: keys provided in coumns object must be same in data object
 *                  name: {     
 *                              value: 'foo', //(String | Required) :- value of column
 *                              title: 'this is foo',  //(String | Optional) :- title of column
 *                              url: 'abc.com', //(String | Optional) :- if the type of column is link then it is must.
 *                              action: func //(Function | Optional) :- if the type of column is link then it can be provide.
 *                        },
 *                  age: {
 *                              value: 30,
 *                        }
 *                  dob: {
 *                              value: 2453154423122315423,
 *                        }
 *              },{
 *                  name: {
 *                              value: 'bar',
 *                              url: 'abc.com', //if it is link type
 *                        },
 *                  age: {
 *                              value: 25,
 *                        }
 *                  dob: {
 *                              value: 2453154423122315423,
 *                        }  
 *              }]
 *          }
 * 
 * note: <TableList /> uses npm's 'fixed-data-table-2', 'reaco-pagination' components. so can pass their props directly.
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';
import {
    isUndefined,
    isNull,
    isEmpty,
    isArray,
    isFunction
} from 'lodash';
import './../table-list.css';
import { Table, Column, Cell } from 'fixed-data-table-2';
import {
    CELL_TYPES,
    SORT_TYPES
} from './table-list.constants';
import SortHeaderCell from './table-list-sort.component';
import Pagination from 'reaco-pagination';

const LinkCell = ({rowIndex, data, col, config, ...props}) => {
    return <Cell {...props}>
        <a className="table-list-link table-list-val" title={data[rowIndex][col].title || ''} href={data[rowIndex][col].url} onClick={data[rowIndex][col].action}>{data[rowIndex][col].value || '-'}</a>
    </Cell>
};

const DateCell = ({rowIndex, data, col, config, ...props}) => {
    return <Cell {...props}>
        <span className="table-list-date table-list-val" title={data[rowIndex][col].title || ''}>{data[rowIndex][col].value ? dateFormat(data[rowIndex][col].value, config.columns[col].dateFormat || 'dd mmm yyyy') : '-'}</span>
    </Cell>
};

const TextCell = ({rowIndex, data, col, config, ...props}) => {
    return <Cell {...props}>
        <span className="table-list-text table-list-val" title={data[rowIndex][col].title || ''}>{data[rowIndex][col].value || '-'}</span>
    </Cell>
};

const Cells = {
    [CELL_TYPES.link]: LinkCell,
    [CELL_TYPES.text]: TextCell,
    [CELL_TYPES.date]: DateCell
}

export default class TableList extends Component {
    constructor(props) {
        super(props);

        //class functions bindings
        this.renderColumn = this.renderColumn.bind(this);
        this.getTableConfig = this.getTableConfig.bind(this);
        this.getColumnDataCell = this.getColumnDataCell.bind(this);
        this.getColumnHeaderCell = this.getColumnHeaderCell.bind(this);
        this.getDefaultSortDir = this.getDefaultSortDir.bind(this);
        this.onSortChange = this.onSortChange.bind(this);
    }

    getDefaultSortDir(column, columnName) {
        if (!isEmpty(column) && !isEmpty(columnName) && column.sortEnable) {
            const tableConfig = this.getTableConfig();
            if (columnName === tableConfig.sortByField) {
                return tableConfig.sortDirection || SORT_TYPES.DESC;
            }
        }
        return null;
    }

    getTableConfig() {
        const tableConfig = this.props.tableConfig;
        if (!isEmpty(tableConfig)) {
            return tableConfig;
        }
        return {};
    }

    getColumnsData() {
        const tableConfig = this.getTableConfig();
        if (!isEmpty(tableConfig) && isArray(tableConfig.data)) {
            return tableConfig.data;
        }
        return [];
    }

    getColumnsConfig() {
        const tableConfig = this.getTableConfig();
        return !isEmpty(tableConfig) && !isEmpty(tableConfig.columns) && tableConfig.columns;
    }

    onSortChange(columnKey, sortDir) {
        const tableConfig = this.getTableConfig();
        if (!isEmpty(tableConfig)) {
            const sortCallback = tableConfig.sortCallback;
            if (isFunction(sortCallback)) sortCallback(columnKey, sortDir);
        }
    }

    getColumnHeaderCell(column, columnName) {
        if (isEmpty(column) || isEmpty(columnName)) {
            console.error('[TableList] Invalid column header config passed');
            return null;
        }
        const headerCell = <Cell>{column.header}</Cell>;
        if (column.sortEnable) {
            const sortDir = this.getDefaultSortDir(column, columnName);
            return <SortHeaderCell onSortChange={this.onSortChange} sortDir={sortDir} {...this.props}>{headerCell}</SortHeaderCell>;
        }
        return headerCell;
    }

    getColumnDataCell(column, columnName) {
        if (isEmpty(column) || isEmpty(column.type) || isEmpty(CELL_TYPES[column.type]) || isUndefined(Cells[CELL_TYPES[column.type]]) || isNull(Cells[CELL_TYPES[column.type]])) {
            console.error('[TableList] Invalid column config passed');
            return null;
        }
        const CellType = Cells[CELL_TYPES[column.type]];
        const tableConfig = this.getTableConfig();
        const columnsData = this.getColumnsData();
        if (isEmpty(columnsData)) {
            console.error('[TableList] Invalid data config passed');
            return null;
        }
        return <CellType data={columnsData} col={columnName} config={tableConfig} />;
    }

    renderColumn(column, columnName, index) {
        const headerCell = this.getColumnHeaderCell(column, columnName);
        const dataCell = this.getColumnDataCell(column, columnName);
        const tableConfig = this.getTableConfig();
        if (isNull(headerCell) || isNull(dataCell)) {
            console.error('[TableList] Invalid config passed');
            return null;
        }
        if (tableConfig.columns[columnName].isDisabled) {
            return null;
        }
        return <Column
            columnKey={columnName}
            key={`${columnName}${index}`}
            header={headerCell}
            cell={dataCell}
            width={column.width || 100}
        />
    }

    render() {
        const columns = this.getColumnsConfig();
        if (isEmpty(columns)) {
            console.error('[TableList] Invalid columns config passed');
            return null;
        }
        const defaultRowHeight = 50;
        const defaultHeaderHeight = 50;
        const tableWidth = this.props.width || 1000;
        const tableHeight = this.props.height || 500;
        return (
            <div className="ofb-table-list">
                <Table
                    rowHeight={defaultRowHeight}
                    headerHeight={defaultHeaderHeight}
                    width={tableWidth}
                    height={tableHeight}
                    {...this.props}>
                    {columns && Object.keys(columns).map((key, i) => {
                        return this.renderColumn(columns[key], key, i);
                    })}
                </Table>
                <Pagination {...this.props} />
            </div>
        )
    }
}

TableList.propTypes = {
    tableConfig: PropTypes.object.isRequired
}