/**
 * How to use: <Filters overflowAfter={overflowAfter} data={data} appliedFilters={appliedFilters} onApply={onApply} />
 * props:   overflowAfter: 3 //(Number | Opptions) :- filter till this number will visible up front and rest will be grouped in 'More', default is 
            
            data: { //(Object | Required)
                category: {
                    text: 'Category', //(String | Optional) :- Label to display for this filter, otherwise will display the key as lable
                    values: [{name: "CAT1", displayName: "Cat1"}, {name: "CAT1", displayName: "Cat1"}] //for 'list' only, //(Array | Optional) :- data to display for 'list' filter
                    type: 'list | range | search | dateRange | month | tree', //(String | Required) :- need to render filter in specific type
                    onSearch: loadOptions, //(Function | Optional) :- this is required when type is 'search', see react-select 'loadOptions' property example to undestand this property handling 
                    order: 1 | 2 | 3 | so on..., //(Number | Optional) :- will decide the order of filters. Otherwise filters will appear in first come first serve order
                    disabled: true | false //(Boolean | Optional) :- if need to disable specific one. default is false
                    isOutsideRange: func //(Function | Optional) :- pass 'isOutsideRange' func of react-dates
                },
            }

            appliedFilters: { //(Object | Required) :- need to mark as applied filter
                category: ["CAT1", "CAT1"] //for 'list' or [1500028302295, 1500028302295] //for 'range' or [{label: 'bar', value: 12345}, {label: 'foo', value: 67890}] //for 'search'
            },

            overflowAfter: 4, //(Number | Optional) :- this is the value which define that after how much filters, the rest filters should gon in more. default is 3

            blank: '', //(String | Optional) :- for blank filter what should be the value. default is ''
            
            onApply: func, //(Function | Optional) :- this will hit after click of 'apply' button, will send two values i.e type and values. example: func(type, values)
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    isUndefined,
    isNull,
    isEmpty,
    isArray,
    isFunction
} from 'lodash';
import {
    FILTERS_TYPES,
    DEFAULT_OVERFLOW_AFTER
} from './filters.constants';
import Dropdown from './../dropdown/dropdown.component';
import FilterList from './filters-list.component';
import FilterDateRange from './filters-date-range.component';
import FilterMonth from './filters-month.component';
import FilterRange from './filters-range.component';
import FilterSearch from './filters-search.component';
import FilterTree from './filters-tree.component';
import './filters.css';

const FILTERS_TYPES_COMPS = {
    [FILTERS_TYPES.list]: FilterList,
    [FILTERS_TYPES.dateRange]: FilterDateRange,
    [FILTERS_TYPES.range]: FilterRange,
    [FILTERS_TYPES.search]: FilterSearch,
    [FILTERS_TYPES.tree]: FilterTree,
    [FILTERS_TYPES.month]: FilterMonth
}

export default class Filters extends Component {
    onApply(type, values) {
        if (isFunction(this.props.onApply)) this.props.onApply(type, values);
    }

    renderFilter(filter, key, text) {
        if (isEmpty(filter) || isUndefined(text) || isNull(text)) {
            console.error('[Filters] Invalid filter passed in config!');
            return null;
        }
        const filterType = filter.type;
        if (isUndefined(filterType) || isNull(filterType) || !FILTERS_TYPES[filterType] || !FILTERS_TYPES_COMPS[filterType]) {
            console.error('[Filters] Invalid filter type passed in config!');
            return null;
        }
        const filterValues = filter.values;
        if (filterType === FILTERS_TYPES.list && (!isArray(filterValues) || !filterValues.length)) {
            console.error('[Filters] Invalid filter values for type list passed in config!');
            return null;
        }
        if (filterType === FILTERS_TYPES.tree && isEmpty(filterValues)) {
            console.error('[Filters] Invalid filter values for type tree passed in config!');
            return null;
        }
        const Filter = FILTERS_TYPES_COMPS[filterType];
        const isDisable = filter.disabled || false;
        const isBlankDisabled = filter.isBlankDisabled || false;
        const isOutsideRange = filter.isOutsideRange || null;
        const isValidDate = filter.isValidDate || null;
        const blank = this.props.blank || '';
        if (isOutsideRange) {
            return <Filter blank={blank} isBlankDisabled={isBlankDisabled} disabled={isDisable} type={key} text={text} values={filterValues} onApply={this.onApply} loadOptions={filter.onSearch} multi={true} isOutsideRange={isOutsideRange} {...this.props} />
        }
        if (isValidDate) {
            return <Filter blank={blank} isBlankDisabled={isBlankDisabled} disabled={isDisable} type={key} text={text} values={filterValues} onApply={this.onApply} loadOptions={filter.onSearch} multi={true} isValidDate={isValidDate} {...this.props} />
        }
        else {
            return <Filter blank={blank} isBlankDisabled={isBlankDisabled} disabled={isDisable} type={key} text={text} values={filterValues} onApply={this.onApply} loadOptions={filter.onSearch} multi={true} {...this.props} />
        }
    }

    renderTopFilter(filters, filtersData) {
        if (!isArray(filters) || !filters.length || isEmpty(filtersData)) {
            console.error('[Filters] Invalid top filters passed!');
            return null;
        }
        return (
            <div className="ofb-top-filters">
                {filters.map((filterKey) => {
                    const filter = filtersData[filterKey];
                    const filterText = filter.text || filterKey;
                    return (
                        <div className="ofb-filter" key={filterKey}>
                            <Dropdown>
                                <span key="dropdownToggle">
                                    {filterText}
                                </span>
                                <div key="dropdownContent">
                                    {this.renderFilter(filter, filterKey, filterText)}
                                </div>
                            </Dropdown>
                        </div>
                    )
                })}
            </div>
        );
    }

    renderOverflowFilter(filters, filtersData) {
        if (!isArray(filters) || !filters.length || isEmpty(filtersData)) {
            console.error('[Filters] Invalid overflow filters passed!');
            return null;
        }
        return (
            <div className="ofb-overflow-filters">
                <Dropdown>
                    <span key="dropdownToggle">
                        More
                    </span>
                    <div key="dropdownContent">
                        <h4>More Filters</h4>
                        <ul className="overflow-nav">
                            {filters.map((filterKey) => {
                                const filter = filtersData[filterKey];
                                const filterText = filter.text || filterKey;
                                return (
                                    <li key={filterKey}>
                                        <Dropdown>
                                            <span key="dropdownToggle">
                                                {filterText}
                                            </span>
                                            <div key="dropdownContent">
                                                {this.renderFilter(filter, filterKey, filterText)}
                                            </div>
                                        </Dropdown>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </Dropdown>
            </div>
        );
    }

    renderFilters() {
        const filtersData = this.props.data;
        if (isEmpty(filtersData)) {
            console.error('[Filters] Invalid data passed in config!');
            return null;
        }
        const filters = Object.keys(filtersData);
        const filterWithOrder = filters.filter((key) => {
            return !isUndefined(filtersData[key].order);
        });
        const sortedFilters = filterWithOrder.sort((_a, _b) => {
            const a = filtersData[_a].order;
            const b = filtersData[_b].order;
            if (a < b)
                return -1;
            if (a > b)
                return 1;
            return 0;
        });
        const restFilters = filters.filter((key) => {
            return isUndefined(filtersData[key].order);
        });
        const totalFilters = sortedFilters.concat(restFilters);
        const overflowAfter = this.props.overflowAfter || DEFAULT_OVERFLOW_AFTER;
        const topFilters = totalFilters.slice(0, overflowAfter);
        const overflowFilters = totalFilters.slice(overflowAfter, totalFilters.length);
        return (
            <div>
                {this.renderTopFilter(topFilters, filtersData)}
                {this.renderOverflowFilter(overflowFilters, filtersData)}
            </div>
        );
    }

    render() {
        return (
            <div className="ofb-filters">
                {this.renderFilters()}
            </div>
        );
    }
}

Filters.propTypes = {
    overflowAfter: PropTypes.number,
    data: PropTypes.object.isRequired,
    appliedFilters: PropTypes.object,
    onApply: PropTypes.func
}

Filters.defaultProps = {
    overflowAfter: 3,
    appliedFilters: null,
    onApply: null,
}