import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isArray } from 'lodash';
import Autocomplete from './../autocomplete/autocomplete.component';

export default class FilterSearch extends Component {
    constructor(props) {
        super(props);

        //init state
        this.state = {
            availableOptions: []
        }

        //class actions binding
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onApply = this.onApply.bind(this);
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
                    availableOptions: appliedFiltersValues
                });
            }
            else {
                this.setState({
                    availableOptions: []
                });
            }
        }
    }

    onSearchChange(type) {
        return (value) => {
            this.setState({ availableOptions: value });
            console.log('Filter search options:', type, value);
        }
    }

    onApply(event) {
        event.preventDefault();
        this.props.onApply(this.props.type, this.state.availableOptions);
    }

    handleInputChange(event) {
        const target = event.target;
        const isChecked = target.type === 'checkbox' && target.checked;
        const value = target.value;
        if (isChecked) {
            this.setState({
                availableOptions: [value]
            });
        }
        else {
            this.setState({
                availableOptions: []
            });
        }
    }

    render() {
        const blank = this.props.blank || '';
        const defaultValues = this.state.availableOptions;
        return (
            <div className="ofb-filters-search">
                <form onSubmit={this.onApply}>
                    <h4>
                        {this.props.text}
                        <button type="submit">Apply</button>
                    </h4>
                    <Autocomplete {...this.props} disabled={this.state.availableOptions.indexOf(blank) !== -1 || this.props.disabled} value={defaultValues} onChange={this.onSearchChange(this.props.type)} />
                    <div className="filter-sep">----- or -----</div>
                    <ul>
                        <li key={'BLANK'}>
                            <label>
                                <input type="checkbox" name={`check-${'BLANK'}`} id={`check-${'BLANK'}`} checked={this.state.availableOptions.indexOf(blank) !== -1} onChange={this.handleInputChange} value={blank} />{'(BLANK)'}
                            </label>
                        </li>
                    </ul>
                </form>
            </div>
        );
    }
}

FilterSearch.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    values: PropTypes.array.isRequired,
    onApply: PropTypes.func.isRequired
}