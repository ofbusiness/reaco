'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Cells;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dateformat = require('dateformat');

var _dateformat2 = _interopRequireDefault(_dateformat);

var _lodash = require('lodash');

var _fixedDataTable = require('fixed-data-table-2');

var _tableList = require('./table-list.constants');

var _tableListSort = require('./table-list-sort.component');

var _tableListSort2 = _interopRequireDefault(_tableListSort);

var _reacoPagination = require('reaco-pagination');

var _reacoPagination2 = _interopRequireDefault(_reacoPagination);

var _tableList2 = require('./table-list');

var _tableList3 = _interopRequireDefault(_tableList2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
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

/* style */


var LinkCell = function LinkCell(_ref) {
    var rowIndex = _ref.rowIndex,
        data = _ref.data,
        col = _ref.col,
        config = _ref.config,
        props = _objectWithoutProperties(_ref, ['rowIndex', 'data', 'col', 'config']);

    return _react2.default.createElement(
        _fixedDataTable.Cell,
        props,
        _react2.default.createElement(
            'a',
            { className: 'table-list-link table-list-val', title: data[rowIndex][col].title || '', href: data[rowIndex][col].url, onClick: data[rowIndex][col].action },
            data[rowIndex][col].value || '-'
        )
    );
};

var DateCell = function DateCell(_ref2) {
    var rowIndex = _ref2.rowIndex,
        data = _ref2.data,
        col = _ref2.col,
        config = _ref2.config,
        props = _objectWithoutProperties(_ref2, ['rowIndex', 'data', 'col', 'config']);

    return _react2.default.createElement(
        _fixedDataTable.Cell,
        props,
        _react2.default.createElement(
            'span',
            { className: 'table-list-date table-list-val', title: data[rowIndex][col].title || '' },
            data[rowIndex][col].value ? (0, _dateformat2.default)(data[rowIndex][col].value, config.columns[col].dateFormat || 'dd mmm yyyy') : '-'
        )
    );
};

var TextCell = function TextCell(_ref3) {
    var rowIndex = _ref3.rowIndex,
        data = _ref3.data,
        col = _ref3.col,
        config = _ref3.config,
        props = _objectWithoutProperties(_ref3, ['rowIndex', 'data', 'col', 'config']);

    return _react2.default.createElement(
        _fixedDataTable.Cell,
        props,
        _react2.default.createElement(
            'span',
            { className: 'table-list-text table-list-val', title: data[rowIndex][col].title || '' },
            data[rowIndex][col].value || '-'
        )
    );
};

var Cells = (_Cells = {}, _defineProperty(_Cells, _tableList.CELL_TYPES.link, LinkCell), _defineProperty(_Cells, _tableList.CELL_TYPES.text, TextCell), _defineProperty(_Cells, _tableList.CELL_TYPES.date, DateCell), _Cells);

var TableList = function (_Component) {
    _inherits(TableList, _Component);

    function TableList(props) {
        _classCallCheck(this, TableList);

        //class functions bindings
        var _this = _possibleConstructorReturn(this, (TableList.__proto__ || Object.getPrototypeOf(TableList)).call(this, props));

        _this.renderColumn = _this.renderColumn.bind(_this);
        _this.getTableConfig = _this.getTableConfig.bind(_this);
        _this.getColumnDataCell = _this.getColumnDataCell.bind(_this);
        _this.getColumnHeaderCell = _this.getColumnHeaderCell.bind(_this);
        _this.getDefaultSortDir = _this.getDefaultSortDir.bind(_this);
        _this.onSortChange = _this.onSortChange.bind(_this);
        return _this;
    }

    _createClass(TableList, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (!document.getElementsByTagName('head')[0].querySelector('style[id="react-table-list"]')) {
                var tag = document.createElement('style');
                tag.id = 'react-table-list';
                tag.innerHTML = _tableList3.default;
                document.getElementsByTagName('head')[0].appendChild(tag);
            }
        }
    }, {
        key: 'getDefaultSortDir',
        value: function getDefaultSortDir(column, columnName) {
            if (!(0, _lodash.isEmpty)(column) && !(0, _lodash.isEmpty)(columnName) && column.sortEnable) {
                var tableConfig = this.getTableConfig();
                if (columnName === tableConfig.sortByField) {
                    return tableConfig.sortDirection || _tableList.SORT_TYPES.DESC;
                }
            }
            return null;
        }
    }, {
        key: 'getTableConfig',
        value: function getTableConfig() {
            var tableConfig = this.props.tableConfig;
            if (!(0, _lodash.isEmpty)(tableConfig)) {
                return tableConfig;
            }
            return {};
        }
    }, {
        key: 'getColumnsData',
        value: function getColumnsData() {
            var tableConfig = this.getTableConfig();
            if (!(0, _lodash.isEmpty)(tableConfig) && (0, _lodash.isArray)(tableConfig.data)) {
                return tableConfig.data;
            }
            return [];
        }
    }, {
        key: 'getColumnsConfig',
        value: function getColumnsConfig() {
            var tableConfig = this.getTableConfig();
            return !(0, _lodash.isEmpty)(tableConfig) && !(0, _lodash.isEmpty)(tableConfig.columns) && tableConfig.columns;
        }
    }, {
        key: 'onSortChange',
        value: function onSortChange(columnKey, sortDir) {
            var tableConfig = this.getTableConfig();
            if (!(0, _lodash.isEmpty)(tableConfig)) {
                var sortCallback = tableConfig.sortCallback;
                if ((0, _lodash.isFunction)(sortCallback)) sortCallback(columnKey, sortDir);
            }
        }
    }, {
        key: 'getColumnHeaderCell',
        value: function getColumnHeaderCell(column, columnName) {
            if ((0, _lodash.isEmpty)(column) || (0, _lodash.isEmpty)(columnName)) {
                console.error('[TableList] Invalid column header config passed');
                return null;
            }
            var headerCell = _react2.default.createElement(
                _fixedDataTable.Cell,
                null,
                column.header
            );
            if (column.sortEnable) {
                var sortDir = this.getDefaultSortDir(column, columnName);
                return _react2.default.createElement(
                    _tableListSort2.default,
                    _extends({ onSortChange: this.onSortChange, sortDir: sortDir }, this.props),
                    headerCell
                );
            }
            return headerCell;
        }
    }, {
        key: 'getColumnDataCell',
        value: function getColumnDataCell(column, columnName) {
            if ((0, _lodash.isEmpty)(column) || (0, _lodash.isEmpty)(column.type) || (0, _lodash.isEmpty)(_tableList.CELL_TYPES[column.type]) || (0, _lodash.isUndefined)(Cells[_tableList.CELL_TYPES[column.type]]) || (0, _lodash.isNull)(Cells[_tableList.CELL_TYPES[column.type]])) {
                console.error('[TableList] Invalid column config passed');
                return null;
            }
            var CellType = Cells[_tableList.CELL_TYPES[column.type]];
            var tableConfig = this.getTableConfig();
            var columnsData = this.getColumnsData();
            if ((0, _lodash.isEmpty)(columnsData)) {
                console.error('[TableList] Invalid data config passed');
                return null;
            }
            return _react2.default.createElement(CellType, { data: columnsData, col: columnName, config: tableConfig });
        }
    }, {
        key: 'renderColumn',
        value: function renderColumn(column, columnName, index) {
            var headerCell = this.getColumnHeaderCell(column, columnName);
            var dataCell = this.getColumnDataCell(column, columnName);
            var tableConfig = this.getTableConfig();
            if ((0, _lodash.isNull)(headerCell) || (0, _lodash.isNull)(dataCell)) {
                console.error('[TableList] Invalid config passed');
                return null;
            }
            if (tableConfig.columns[columnName].isDisabled) {
                return null;
            }
            return _react2.default.createElement(_fixedDataTable.Column, {
                columnKey: columnName,
                key: '' + columnName + index,
                header: headerCell,
                cell: dataCell,
                width: column.width || 100
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var columns = this.getColumnsConfig();
            if ((0, _lodash.isEmpty)(columns)) {
                console.error('[TableList] Invalid columns config passed');
                return null;
            }
            var defaultRowHeight = 50;
            var defaultHeaderHeight = 50;
            var tableWidth = this.props.width || 1000;
            var tableHeight = this.props.height || 500;
            return _react2.default.createElement(
                'div',
                { className: 'ofb-table-list' },
                _react2.default.createElement(
                    _fixedDataTable.Table,
                    _extends({
                        rowHeight: defaultRowHeight,
                        headerHeight: defaultHeaderHeight,
                        width: tableWidth,
                        height: tableHeight
                    }, this.props),
                    columns && Object.keys(columns).map(function (key, i) {
                        return _this2.renderColumn(columns[key], key, i);
                    })
                ),
                _react2.default.createElement(_reacoPagination2.default, this.props)
            );
        }
    }]);

    return TableList;
}(_react.Component);

exports.default = TableList;


TableList.propTypes = {
    tableConfig: _propTypes2.default.object.isRequired
};
//# sourceMappingURL=table-list.component.js.map