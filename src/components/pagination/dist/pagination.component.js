'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactPaginate = require('react-paginate');

var _reactPaginate2 = _interopRequireDefault(_reactPaginate);

var _lodash = require('lodash');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _pagination = require('./pagination.constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * <Pagination>. 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * options:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      total :- (Number | Required) //for total number of data
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      size :- (Number | Required) //for total number of possible data per page
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      dataSize :- (Number | Required) //for total number of data per page
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      handlePageChange :- (func | optional) //for action on page change
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      handlePageOptionChange :- (func | optional) //for action on page option change
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      pageOptions :- (array | optional) //for provide page options, which helps to change data per page
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *                      ex: [10, 20, 50]
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      pageSummaryText :- (html string | optional) //text to show in the place of page summary
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *                      ex: "Showing <strong>#first_page# to #last_page#</strong> of #total_pages# entries"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Note: this component uses npm's react-paginate, so can pass it's supported props directly.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Pagination = function (_Component) {
    _inherits(Pagination, _Component);

    function Pagination(props) {
        _classCallCheck(this, Pagination);

        //class actions binding
        var _this = _possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).call(this, props));

        _this.getPageSummary = _this.getPageSummary.bind(_this);
        _this.getPageOption = _this.getPageOption.bind(_this);
        _this.handlePageChange = _this.handlePageChange.bind(_this);
        _this.handlePageOptionChange = _this.handlePageOptionChange.bind(_this);

        //default state init
        _this.state = _this.getInitialState(props);
        return _this;
    }

    _createClass(Pagination, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState(this.getInitialState(nextProps));
        }
    }, {
        key: 'getInitialState',
        value: function getInitialState(props) {
            var currentPageNumber = props.forcePage + 1;
            var currentPageSize = props.size;
            var currentFirstPage = currentPageNumber * currentPageSize - currentPageSize + 1;
            var currentLastPage = currentPageNumber * currentPageSize - (currentPageSize - props.dataSize);
            var state = {
                firstPage: currentFirstPage,
                lastPage: currentLastPage,
                totalPages: props.total,
                currentPageOption: currentPageSize
            };
            return state;
        }
    }, {
        key: 'getPageSummary',
        value: function getPageSummary() {
            var firstPage = this.state.firstPage;
            var lastPage = this.state.lastPage;
            var totalPages = this.state.totalPages;
            var pageSummaryText = this.props.pageSummaryText.replace('#first_count#', firstPage).replace('#last_count#', lastPage).replace('#total_counts#', totalPages);
            return _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: pageSummaryText } });
        }
    }, {
        key: 'getPageOption',
        value: function getPageOption(item) {
            var disabled = item > this.props.total;
            return _react2.default.createElement(
                'button',
                { key: item, disabled: disabled, className: (0, _classnames2.default)({ 'selected': item === this.state.currentPageOption, 'disabled': disabled }), onClick: item <= this.props.total && this.handlePageOptionChange.bind(this, item) },
                item
            );
        }
    }, {
        key: 'handlePageOptionChange',
        value: function handlePageOptionChange(item) {
            if (item === this.state.currentPageOption) return;

            this.setState({
                currentPageOption: item
            });

            if ((0, _lodash.isFunction)(this.props.handlePageOptionChange)) {
                this.props.handlePageOptionChange(item);
            }
        }
    }, {
        key: 'handlePageChange',
        value: function handlePageChange(data) {
            if ((0, _lodash.isEmpty)(data)) {
                return;
            }
            if ((0, _lodash.isFunction)(this.props.handlePageChange)) {
                data.size = this.state.currentPageOption;
                this.props.handlePageChange(data);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var pageCount = Math.ceil(this.props.total / this.props.size);
            return this.props.total && pageCount > 1 ? _react2.default.createElement(
                'div',
                { className: 'ofb-pagination' },
                _react2.default.createElement(_reactPaginate2.default, _extends({
                    pageCount: pageCount,
                    pageRangeDisplayed: 5,
                    marginPagesDisplayed: 2
                }, this.props, {
                    onPageChange: this.handlePageChange
                })),
                _react2.default.createElement(
                    'div',
                    { className: 'pagination-page-range' },
                    this.props.pageOptions.map(function (item) {
                        return _this2.getPageOption(item);
                    })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'pagination-page-summary' },
                    this.getPageSummary()
                )
            ) : null;
        }
    }]);

    return Pagination;
}(_react.Component);

exports.default = Pagination;


Pagination.propTypes = {
    total: _propTypes2.default.number.isRequired,
    size: _propTypes2.default.number.isRequired,
    dataSize: _propTypes2.default.number.isRequired,
    forcePage: _propTypes2.default.number,
    handlePageChange: _propTypes2.default.func,
    handlePageOptionChange: _propTypes2.default.func,
    pageOptions: _propTypes2.default.array,
    pageSummaryText: _propTypes2.default.string
};

Pagination.defaultProps = {
    forcePage: 0,
    handlePageChange: null,
    handlePageOptionChange: null,
    pageOptions: _pagination.PAGE_OPTIONS,
    pageSummaryText: _pagination.PAGE_SUMMARY
};
//# sourceMappingURL=pagination.component.js.map