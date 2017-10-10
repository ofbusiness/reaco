import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isArray, isEmpty } from 'lodash';
import moment from 'moment';
import DatePickerWrapper from './../date-picker/date-picker.component';

export default class FilterRange extends Component {
    constructor(props) {
        super(props);

        //init state
        this.state = {
            availableDate: null,
        }

        //class actions binding
        this.onApply = this.onApply.bind(this);
        this.onDatesChange = this.onDatesChange.bind(this);
        this.getAvilableDate = this.getAvilableDate.bind(this);
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
            if (!isEmpty(appliedFiltersValues) && moment.isMoment(appliedFiltersValues.startDate)) {
                const date = appliedFiltersValues.startDate;
                const formatedDate = moment(date.format('YYYY-MM'));
                this.setState({
                    availableDate: formatedDate
                });
            }
            else if (appliedFiltersValues && appliedFiltersValues.startDate === blank) {
                this.setState({
                    availableDate: blank
                });
            }
            else {
                this.setState({
                    availableDate: null
                });
            }
        }
    }

    getAvilableDate() {
        const blank = this.props.blank || '';
        if (!isEmpty(this.state.availableDate) || this.state.availableDate === blank) {
            return this.state.availableDate;
        }
        return null;
    }

    onDatesChange(date) {
        console.log('filters date range:', this.props.type, date);
        this.setState({
            availableDate: date
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
        const blank = this.props.blank || '';
        event.preventDefault();
        const date = this.getAvilableDate();
        const startDate = date ? moment(date.format('YYYY-MM')) : blank;
        const endDate = date ? moment(startDate).endOf('month') : blank;
        if (isEmpty(date) && date !== blank) {
            return;
        }
        this.props.onApply(this.props.type, {startDate, endDate});
    }

    render() {
        const blank = this.props.blank || '';
        const date = this.getAvilableDate();
        return (
            <div className="ofb-filters-month">
                <form onSubmit={this.onApply}>
                    <h4>
                        {this.props.text}
                        <button type="submit">Apply</button>
                    </h4>
                    <DatePickerWrapper dateFormat="MMM YYYY" timeFormat={false} value={date} onChange={this.onDatesChange} {...this.props} inputProps={{disabled: this.state.availableDate === blank || this.props.disabled}} />
                    <div className="filter-sep">----- or -----</div>
                    <ul>
                        <li key={'BLANK'}>
                            <label>
                                <input disabled={this.props.isBlankDisabled} type="checkbox" name={`check-${'BLANK'}`} id={`check-${'BLANK'}`} checked={this.state.availableDate === blank} onChange={this.handleInputChange} value={blank} />{'(BLANK)'}
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