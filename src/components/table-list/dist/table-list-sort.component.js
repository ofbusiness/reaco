'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _tableList = require('./table-list.constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SortHeaderCell = function (_Component) {
    _inherits(SortHeaderCell, _Component);

    function SortHeaderCell(props) {
        _classCallCheck(this, SortHeaderCell);

        // class actions bindings
        var _this = _possibleConstructorReturn(this, (SortHeaderCell.__proto__ || Object.getPrototypeOf(SortHeaderCell)).call(this, props));

        _this._onSortChange = _this._onSortChange.bind(_this);
        return _this;
    }

    _createClass(SortHeaderCell, [{
        key: 'reverseSortDirection',
        value: function reverseSortDirection(sortDir) {
            return sortDir ? sortDir === _tableList.SORT_TYPES.DESC ? _tableList.SORT_TYPES.ASC : _tableList.SORT_TYPES.DESC : _tableList.SORT_TYPES.DESC;
        }
    }, {
        key: 'renderSortArrow',
        value: function renderSortArrow(sortDir) {
            var tableConfig = this.props.tableConfig;
            var sortIcon = sortDir ? sortDir === _tableList.SORT_TYPES.DESC ? tableConfig && tableConfig.sortDownIcon : tableConfig && tableConfig.sortUpIcon : '';
            return _react2.default.createElement(
                'span',
                { className: 'sortArrow' },
                sortIcon
            );
        }
    }, {
        key: '_onSortChange',
        value: function _onSortChange(e) {
            e.preventDefault();
            if (this.props.onSortChange) {
                this.props.onSortChange(this.props.columnKey, this.reverseSortDirection(this.props.sortDir));
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                sortDir = _props.sortDir,
                children = _props.children;

            return _react2.default.createElement(
                'a',
                { className: 'sortEnabled', onClick: this._onSortChange },
                children,
                this.renderSortArrow(sortDir)
            );
        }
    }]);

    return SortHeaderCell;
}(_react.Component);

exports.default = SortHeaderCell;


SortHeaderCell.propTypes = {
    onSortChange: _propTypes2.default.func,
    sortDir: _propTypes2.default.string,
    sortUpIcon: _propTypes2.default.string,
    sortDownIcon: _propTypes2.default.string
};
//# sourceMappingURL=table-list-sort.component.js.map