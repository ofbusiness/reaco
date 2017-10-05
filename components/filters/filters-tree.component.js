import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    isEmpty,
    isArray,
    isObject
} from 'lodash';

export default class FilterTree extends Component {
    constructor(props) {
        super(props);

        //class actions binding
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onApply = this.onApply.bind(this);

        //init state
        this.state = {
            appliedFilters: [],
        }
    }

    componentWillMount() {
        const self = this;
        this.setState({
            appliedFilters: self.fetchAppliedFilters(),
        });
    }

    componentWillReceiveProps() {
        const self = this;
        this.setState({
            appliedFilters: self.fetchAppliedFilters(),
        });
    }

    fetchAppliedFilters() {
        const appliedFilters = this.props.appliedFilters;
        if (!isEmpty(appliedFilters)) {
            const appliedFiltersValues = appliedFilters[this.props.type];
            if (isArray(appliedFiltersValues)) {
                return appliedFiltersValues;
            }
            else {
                return [];
            }
        }
    }

    onApply(event) {
        event.preventDefault();
        this.props.onApply(this.props.type, this.state.appliedFilters);
    }

    handleInputCheck(tree, value, isChecked) {
        const blank = this.props.blank || '';
        const inputs = tree ? tree.getElementsByTagName('input') : [];
        let appliedFilters = this.state.appliedFilters;
        const updateAppliedFilters = (isChecked, value) => {
            if (isChecked && (appliedFilters.indexOf(value) === -1 || value === blank) && (value.toUpperCase() === value)) {
                if (value === blank) {
                    appliedFilters = [value];
                }
                else {
                    appliedFilters.push(value);
                }
            }
            else if (!isChecked) {
                const inputIndex = appliedFilters.indexOf(value);
                if (inputIndex !== -1) appliedFilters.splice(inputIndex, 1);
            }
        }
        if (inputs.length) {
            for (let i = 0; i < inputs.length; i++) {
                const _value = inputs[i].value;
                inputs[i].checked = !!isChecked;
                updateAppliedFilters(isChecked, _value);
            }
        }
        else {
            updateAppliedFilters(isChecked, value);
        }
        return appliedFilters;
    }

    handleInputChange(event) {
        const target = event.target;
        const isChecked = target.type === 'checkbox' && target.checked;
        const value = target.value;
        const tree = document.getElementById(`tree-${this.props.type}-${value}`);
        const appliedFilters = this.handleInputCheck(tree, value, isChecked);
        this.setState({
            appliedFilters
        });
    }

    isLeafChecked(item) {
        const blank = this.props.blank || '';
        const appliedFilters = this.state.appliedFilters;
        if (appliedFilters.indexOf(blank) !== -1) return false;
        if (!isArray(appliedFilters)) return;
        if (appliedFilters.indexOf(item) !== -1) return true;
        else {
            const tree = document.getElementById(`tree-${this.props.type}-${item}`);
            if (tree) {
                const inputs = tree.getElementsByTagName('input');
                let checked = 0;
                if (inputs.length) {
                    for (let i = 0; i < inputs.length; i++) {
                        if (inputs[i].checked) checked++;
                    }
                }
                return checked && checked === inputs.length;
            }
        }
    }

    renderTree(treeMap) {
        const blank = this.props.blank || '';
        return Object.keys(treeMap).map(key => {
            return (
                <li key={key}>
                    <label>
                        <input disabled={this.state.appliedFilters.indexOf(blank) !== -1 || this.props.disabled} type="checkbox" name={`check-${key}`} id={`check-${key}`} checked={this.isLeafChecked(key)} onChange={this.handleInputChange} value={key} />{treeMap[key].displayName || treeMap[key]}
                    </label>
                    {!isEmpty(treeMap[key].values) ?
                        <ul id={`tree-${this.props.type}-${key}`}>
                            {this.renderTree(treeMap[key].values)}
                        </ul>
                    : null}
                </li>
            );
        });
    }

    render() {
        const blank = this.props.blank || '';
        const treeMap = this.props.values;
        console.log('trer filter', this.props.type, treeMap);
        return (
            <div className="ofb-filters-list">
                <form onSubmit={this.onApply}>
                    <h4>
                        <label>
                            <input disabled={this.state.appliedFilters.indexOf(blank) !== -1 || this.props.disabled} type="checkbox" name="check-list" id="check-list" onChange={this.handleInputChange} checked={this.isLeafChecked('all')} value="all" />
                            {this.props.text}
                        </label>
                        <button type="submit">Apply</button>
                    </h4>
                    <ul id={`tree-${this.props.type}-all`}>
                        {this.renderTree(treeMap)}
                    </ul>
                    <ul>
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

FilterTree.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    values: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
    onApply: PropTypes.func.isRequired
}

FilterTree.defaultProps = {
    disabled: false
}