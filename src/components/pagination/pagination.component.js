/**
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import {
    isEmpty,
    isFunction
} from 'lodash';
import classNames from 'classnames';
import './pagination.css';
import { 
    PAGE_OPTIONS, 
    PAGE_SUMMARY 
} from './pagination.constants';

export default class Pagination extends Component {
    constructor(props) {
        super(props);

        //class actions binding
        this.getPageSummary = this.getPageSummary.bind(this);
        this.getPageOption = this.getPageOption.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handlePageOptionChange = this.handlePageOptionChange.bind(this);

        //default state init
        this.state = this.getInitialState(props);
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this.getInitialState(nextProps));
    }

    getInitialState(props) {
        const currentPageNumber = props.forcePage + 1;
        const currentPageSize = props.size;
        const currentFirstPage = ((currentPageNumber * currentPageSize) - currentPageSize) + 1;
        const currentLastPage = (currentPageNumber * currentPageSize) - (currentPageSize - props.dataSize);
        const state = {
            firstPage: currentFirstPage,
            lastPage: currentLastPage,
            totalPages: props.total,
            currentPageOption: currentPageSize
        };
        return state;
    }

    getPageSummary() {
        const firstPage = this.state.firstPage;
        const lastPage = this.state.lastPage;
        const totalPages = this.state.totalPages;
        const pageSummaryText = this.props.pageSummaryText
                                    .replace('#first_count#', firstPage)
                                    .replace('#last_count#', lastPage)
                                    .replace('#total_counts#', totalPages);
        return <div dangerouslySetInnerHTML={{ __html: pageSummaryText }} ></div>;
    }

    getPageOption(item) {
        const disabled = item > this.props.total;
        return <button key={item} disabled={disabled} className={classNames({'selected': item === this.state.currentPageOption, 'disabled': disabled})} onClick={item <= this.props.total && this.handlePageOptionChange.bind(this, item)}>{item}</button>
    }

    handlePageOptionChange(item) {
        if (item === this.state.currentPageOption) return;

        this.setState({
            currentPageOption: item
        })

        if (isFunction(this.props.handlePageOptionChange)) {
            this.props.handlePageOptionChange(item);
        }
    }

    handlePageChange(data) {
        if (isEmpty(data)) {
            return;
        }
        if (isFunction(this.props.handlePageChange)) {
            data.size = this.state.currentPageOption;
            this.props.handlePageChange(data);
        }
    }

    render() {
        const pageCount = Math.ceil(this.props.total / this.props.size);
        return (
            this.props.total && pageCount > 1 ?
                <div className="ofb-pagination">
                    <ReactPaginate 
                        pageCount={pageCount}
                        pageRangeDisplayed={5}
                        marginPagesDisplayed={2}
                        {...this.props}
                        onPageChange={this.handlePageChange}
                    />
                    <div className="pagination-page-range">
                        {this.props.pageOptions.map((item) => {
                            return this.getPageOption(item)
                        })}
                    </div>
                    <div className="pagination-page-summary">
                        {this.getPageSummary()}
                    </div>
                </div>
            : null
        );
    }
}

Pagination.propTypes = {
    total: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    dataSize: PropTypes.number.isRequired,
    forcePage: PropTypes.number,
    handlePageChange: PropTypes.func,
    handlePageOptionChange: PropTypes.func,
    pageOptions: PropTypes.array,
    pageSummaryText: PropTypes.string
}

Pagination.defaultProps = {
    forcePage: 0,
    handlePageChange: null,
    handlePageOptionChange: null,
    pageOptions: PAGE_OPTIONS,
    pageSummaryText: PAGE_SUMMARY
}