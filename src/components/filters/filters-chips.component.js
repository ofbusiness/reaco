import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isArray, isObject, isEmpty, isString, isFunction } from 'lodash';
import moment from 'moment';
import classnames from 'classnames';

export default class FiltersChips extends Component {
    areChipsAvailable(chips) {
        const self = this;
        if (!isArray(chips) && isObject(chips)) return true;
        else if (isArray(chips) && chips.length) {
            const hasChips = chips.filter((chip) => {
                return self.areChipsAvailable(chip);
            });
            return hasChips.length > 0;
        }
    }

    onClear(key) {
        const availableFilters = this.props.data;
        availableFilters[key] = null;
        if (isFunction(this.props.onClear)) this.props.onClear(availableFilters);
    }

    onClearList(key, index) {
        const availableFilters = this.props.data;
        const filter = availableFilters[key];
        filter.splice(index, 1);
        availableFilters[key] = filter;
        if (isFunction(this.props.onClear)) this.props.onClear(availableFilters);
    }

    parsedValue(value, key, defaultValue) {
        if (this.props.settings[key] && isFunction(this.props.settings[key].transformer)) {
            return this.props.settings[key].transformer(value);
        }
        return decodeURIComponent(defaultValue || value);
    }

    getFilters() {
        const availableFilters = this.props.data;
        const blank = this.props.blank || '';
        return Object.keys(availableFilters).map((key) => {
                const filter = availableFilters[key];
                const settings = this.props.settings[key];
                if (settings.isDisabled) return null;
                const label = settings && settings.text ? <span className="label">{settings.text}:</span> : null;
                let chips = null;
                if (isString(filter) && filter) {
                    const value = this.parsedValue(filter, key);
                    chips = value ? <span key={key} className="chip chip-str">{value}&nbsp;<i className={classnames({'hide': settings && settings.clearable === false})} onClick={this.onClear.bind(this, key)}></i></span> : null;
                }
                else if (isArray(filter)) {
                    chips = filter.map((value, i) => {
                        if (isString(value)) {
                            const _value = this.parsedValue(value, key);
                            return _value ? <span key={key+i} className="chip chip-arr">{_value}&nbsp;<i className={classnames({'hide': settings && settings.clearable === false})} onClick={this.onClearList.bind(this, key, i)}></i></span> : null;
                        }
                        else if (isObject(value) && !isEmpty(value) && !isEmpty(value.label)) {
                            const _value = this.parsedValue(value.label, key);
                            return _value ? <span key={key+i} className="chip chip-obj">{_value}&nbsp;<i className={classnames({'hide': settings && settings.clearable === false})} onClick={this.onClearList.bind(this, key)}></i></span> : null;
                        }
                    })
                }
                else if (isObject(filter) && !isEmpty(filter)) { //date range i.e {endDate: 1231231233123, startDate: 412645641263}
                    if ((!isEmpty(filter.startDate) && !isEmpty(filter.endDate)) || (filter.startDate === blank && filter.endDate === blank)) {
                        const _defaultValue = `${moment(filter.startDate).format('MM/DD/YYYY')} - ${moment(filter.endDate).format('MM/DD/YYYY')}`;
                        const _value = this.parsedValue(filter, key, _defaultValue);
                        chips = _value ? <span key={key} className="chip chip-date">{_value}&nbsp;<i className={classnames({'hide': settings && settings.clearable === false})} onClick={this.onClear.bind(this, key)}></i></span> : null;
                    }
                    if (!isEmpty(filter.min) || !isEmpty(filter.max) || (filter.min === blank && filter.max === blank)) { //value range i.e {min: 1231231233123, max: 412645641263}
                        const _defaultValue = `${filter.min || 0} Cr - ${filter.max || 0} Cr`;
                        const _value = this.parsedValue(filter, key, _defaultValue);
                        chips = _value ? <span key={key} className="chip chip-range">{_value}&nbsp;<i className={classnames({'hide': settings && settings.clearable === false})} onClick={this.onClear.bind(this, key)}></i></span> : null;
                    }
                }
                // render chips
                return this.areChipsAvailable(chips) ? <span key={key} className="chips-group">{label}{chips}</span> : null;
            });
    }

    render() {
        const availableChips = this.getFilters();
        console.log('filter chips', this.props.data);
        return this.areChipsAvailable(availableChips) ? 
                <div className="ofb-chips">
                    {availableChips}
                </div>
            : null;
    }
}

FiltersChips.propTypes = {
    data: PropTypes.object.isRequired,
    settings: PropTypes.object,
    onClear: PropTypes.func,
}

FiltersChips.defaultProps = {
    settings: {},
    onClear: null,
}