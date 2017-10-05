import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    isEmpty,
    isArray,
} from 'lodash';

export default class FilterList extends Component {
    constructor(props) {
        super(props);

        //class actions binding
        this.handleAllChange = this.handleAllChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onApply = this.onApply.bind(this);

        //init state
        this.state = {
            appliedFilters: []
        }
    }

    componentWillMount() {
        this.fetchAppliedFilters();
    }

    componentWillReceiveProps() {
        this.fetchAppliedFilters();
    }

    fetchAppliedFilters() {
        const appliedFilters = this.props.appliedFilters;
        if (!isEmpty(appliedFilters)) {
            const appliedFiltersValues = appliedFilters[this.props.type];
            if (isArray(appliedFiltersValues)) {
                this.setState({
                    appliedFilters: appliedFiltersValues
                })
            }
            else {
                this.setState({
                    appliedFilters: []
                })
            }
        }
    }

    onApply(event) {
        event.preventDefault();
        this.props.onApply(this.props.type, this.state.appliedFilters);
    }

    handleAllChange(event) {
        const target = event.target;
        const isChecked = target.type === 'checkbox' && target.checked;
        let appliedFilters = [];
        if (isChecked) appliedFilters = this.props.values.map((value) => { return value.name; });
        this.setState({
            appliedFilters
        });
    }

    handleInputChange(event) {
        const blank = this.props.blank || '';
        const target = event.target;
        const isChecked = target.type === 'checkbox' && target.checked;
        const value = target.value;
        let appliedFilters = this.state.appliedFilters;
        if (isChecked) {
            if (value === blank) {
                appliedFilters = [value];
            }
            else {
                appliedFilters.push(value);
            }
        }
        else {
            const valueIndex = appliedFilters.indexOf(value);
            appliedFilters.splice(valueIndex, 1);
        }
        this.setState({
            appliedFilters
        });
    }

    render() {
        const blank = this.props.blank || '';
        return (
            <div className="ofb-filters-list">
                <form onSubmit={this.onApply}>
                    <h4>
                        <label>
                            <input disabled={this.state.appliedFilters.indexOf(blank) !== -1 || this.props.disabled} type="checkbox" name="check-list" id="check-list" onChange={this.handleAllChange} checked={this.props.values.length > 0 && this.state.appliedFilters.length === this.props.values.length} />
                            {this.props.text}
                        </label>
                        <button type="submit">Apply</button>
                    </h4>
                    <ul>
                        {this.props.values.map((value, key) => {
                            return (
                                <li key={key}>
                                    <label>
                                        <input disabled={this.state.appliedFilters.indexOf(blank) !== -1 || this.props.disabled} type="checkbox" name={`check-${key}`} id={`check-${key}`} checked={this.state.appliedFilters.indexOf(value.name) !== -1} onChange={this.handleInputChange} value={value.name} />{value.displayName}
                                    </label>
                                </li>
                            );
                        })}
                        <li className="filter-sep">----- or -----</li>
                        <li key={'BLANK'}>
                            <label>
                                <input type="checkbox" name={`check-${'BLANK'}`} id={`check-${'BLANK'}`} checked={this.state.appliedFilters.indexOf(blank) !== -1} onChange={this.handleInputChange} value={blank} />{'(BLANK)'}
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
    values: PropTypes.array.isRequired,
    onApply: PropTypes.func.isRequired
}