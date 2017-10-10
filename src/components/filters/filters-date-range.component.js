import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isArray, isEmpty } from 'lodash';
import DateRangePickerWrapper from './../date-range/date-range.component';

export default class FilterRange extends Component {
    constructor(props) {
        super(props);

        //init state
        this.state = {
            availableDates: null,
        }

        //class actions binding
        this.onApply = this.onApply.bind(this);
        this.onDatesChange = this.onDatesChange.bind(this);
        this.getAvilableDates = this.getAvilableDates.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
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
                    availableDates: (appliedFiltersValues.startDate === blank && appliedFiltersValues.endDate === blank) ? blank : { startDate: appliedFiltersValues.startDate, endDate: appliedFiltersValues.endDate }
                });
            }
            else {
                this.setState({
                    availableDates: null
                });
            }
        }
    }

    getAvilableDates() {
        const blank = this.props.blank || '';
        if (!isEmpty(this.state.availableDates) || this.state.availableDates === blank) {
            const startDate = this.state.availableDates ? this.state.availableDates.startDate : blank;
            const endDate = this.state.availableDates ? this.state.availableDates.endDate : blank;
            return { startDate, endDate };
        }
        return { startDate: this.props.initialStartDate, endDate: this.props.initialEndDate };
    }

    onDatesChange(date) {
        console.log('filters date range:', this.props.type, date);
        this.setState({
            availableDates: date
        })
    }

    handleInputChange(event) {
        const target = event.target;
        const isChecked = target.type === 'checkbox' && target.checked;
        const value = target.value;
        if (isChecked) {
            this.onDatesChange(value);
        }
        else {
            this.onDatesChange(null);
        }
    }

    onApply(event) {
        event.preventDefault();
        const {startDate, endDate} = this.getAvilableDates();
        if ((!isEmpty(startDate) && isEmpty(endDate)) || (!isEmpty(endDate) && isEmpty(startDate))) {
            return;
        }
        this.props.onApply(this.props.type, {startDate, endDate});
    }

    render() {
        const blank = this.props.blank || '';
        const { startDate, endDate } = this.getAvilableDates();
        return (
            <div className="ofb-filters-range">
                <form onSubmit={this.onApply}>
                    <h4>
                        {this.props.text}
                        <button type="submit">Apply</button>
                    </h4>
                    <DateRangePickerWrapper onDatesChange={this.onDatesChange} startDate={startDate} endDate={endDate} {...this.props} disabled={this.state.availableDates === blank || this.props.disabled} />
                    <div className="filter-sep">----- or -----</div>
                    <ul>
                        <li key={'BLANK'}>
                            <label>
                                <input disabled={this.props.isBlankDisabled} type="checkbox" name={`check-${'BLANK'}`} id={`check-${'BLANK'}`} checked={this.state.availableDates === blank} onChange={this.handleInputChange} value={blank} />{'(BLANK)'}
                            </label>
                        </li>
                    </ul>
                </form>
            </div>
        );
    }
}

FilterRange.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onApply: PropTypes.func.isRequired,
}