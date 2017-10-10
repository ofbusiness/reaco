import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    isEmpty,
} from 'lodash';

export default class FilterList extends Component {
    constructor(props) {
        super(props);

        //class actions binding
        this.onApply = this.onApply.bind(this);
        this.getAvilableRange = this.getAvilableRange.bind(this);
        this.handleRangeChange = this.handleRangeChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        //init state
        this.state = {
            availableRange: {},
        }
    }

    onApply(event) {
        const blank = this.props.blank || '';
        event.preventDefault();
        const availableRange = this.state.availableRange;
        this.props.onApply(this.props.type, availableRange === blank ? { min: blank, max: blank } : this.state.availableRange);
    }

    componentWillMount() {
        this.fetchAppliedFilters();
    }

    componentWillReceiveProps() {
        this.fetchAppliedFilters();
    }

    fetchAppliedFilters() {
        const blank = this.props.blank || '';
        const appliedFilters = this.props.appliedFilters;
        if (!isEmpty(appliedFilters)) {
            const appliedFiltersValues = appliedFilters[this.props.type];
            if (!isEmpty(appliedFiltersValues)) {
                this.setState({
                    availableRange: (appliedFiltersValues.min === blank && appliedFiltersValues.max === blank) ? blank : { min: appliedFiltersValues.min || blank, max: appliedFiltersValues.max || blank }
                });
            }
            else {
                this.setState({
                    availableRange: {}
                });
            }
        }
    }

    getAvilableRange() {
        const blank = this.props.blank || '';
        if (!isEmpty(this.state.availableRange)) {
            const min = this.state.availableRange.min;
            const max = this.state.availableRange.max;
            return { min, max };
        }
        return { min: blank, max: blank };
    }

    handleRangeChange() {
        const availableRange = this.state.availableRange;
        const min = this.min.value;
        const max = this.max.value;
        availableRange.min = min;
        availableRange.max = max;
        this.setState({
            availableRange
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const isChecked = target.type === 'checkbox' && target.checked;
        const value = target.value;
        if (isChecked) {
            this.setState({
                availableRange: value
            });
        }
        else {
            this.setState({
                availableRange: {}
            });
        }
    }

    render() {
        const blank = this.props.blank || '';
        const { min, max } = this.getAvilableRange();
        return (
            <div className="ofb-filters-amount">
                <form onSubmit={this.onApply}>
                    <h4>
                        {this.props.text}
                        <button type="submit">Apply</button>
                    </h4>
                    <div className="range-inputs">
                        <input type="number" disabled={this.state.availableRange === blank || this.props.disabled} ref={(el) => this.min = el} name={`${this.props.type}-range-min`} onChange={this.handleRangeChange} placeholder="Min" value={min} min={0} max={max} />
                        <input type="number" disabled={this.state.availableRange === blank || this.props.disabled} ref={(el) => this.max = el} name={`${this.props.type}-range-max`} onChange={this.handleRangeChange} placeholder="Max" value={max} min={min} />
                    </div>
                    <div className="filter-sep">----- or -----</div>
                    <ul>
                        <li key={'BLANK'}>
                            <label>
                                <input type="checkbox" name={`check-${'BLANK'}`} id={`check-${'BLANK'}`} checked={this.state.availableRange === blank} onChange={this.handleInputChange} value={blank} />{'(BLANK)'}
                            </label>
                        </li>
                    </ul>
                </form>
            </div>
        );
    }
}

FilterList.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onApply: PropTypes.func.isRequired
}