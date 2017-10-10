import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SORT_TYPES } from './table-list.constants';

export default class SortHeaderCell extends Component {
    constructor(props) {
        super(props);

        // class actions bindings
        this._onSortChange = this._onSortChange.bind(this);
    }

    reverseSortDirection(sortDir) {
        return sortDir ? (sortDir === SORT_TYPES.DESC ? SORT_TYPES.ASC : SORT_TYPES.DESC) : SORT_TYPES.DESC;
    }

    renderSortArrow(sortDir) {
        const tableConfig = this.props.tableConfig;
        const sortIcon = sortDir ? (sortDir === SORT_TYPES.DESC ? ( tableConfig && tableConfig.sortDownIcon ) : ( tableConfig && tableConfig.sortUpIcon )) : '';
        return <span className="sortArrow">{sortIcon}</span>;
    }

    _onSortChange(e) {
        e.preventDefault();
        if (this.props.onSortChange) {
            this.props.onSortChange(
                this.props.columnKey,
                this.reverseSortDirection(this.props.sortDir)
            );
        }
    }

    render() {
        const {sortDir, children} = this.props;
        return (
            <a className="sortEnabled" onClick={this._onSortChange}>
                {children} 
                {this.renderSortArrow(sortDir)}
            </a>
        );
    }
}

SortHeaderCell.propTypes = {
    onSortChange: PropTypes.func,
    sortDir: PropTypes.string,
    sortUpIcon: PropTypes.string,
    sortDownIcon: PropTypes.string
}