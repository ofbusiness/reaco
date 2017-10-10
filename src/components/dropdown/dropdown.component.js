/**
 * <Dropdown>
 *  <span key="dropdownToggle">Menu</span>
 *  <p key="dropdownContent">Menu Content</p>
 * </Dropdown>
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { isBoolean } from 'lodash';
import DropdownIcon from './dropdown.icon';
import './dropdown.css';

export default class Dropdown extends Component {
    constructor(props) {
        super(props);

        //class actions binding
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.handleDocumentClick = this.handleDocumentClick.bind(this);

        //init state
        this.state = {
            isToggled: false,
            isOpen: this.props.isOpen
        }
    }

    componentDidMount () {
        if (!this.props.disabled) window.document.body.addEventListener('click', this.handleDocumentClick)
    }

    componentWillUnmount () {
        window.document.body.removeEventListener('click', this.handleDocumentClick)
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }

    handleDocumentClick(evt) {
        if (this.props.disabled) return;
        if (!this.dropdown.contains(evt.target)) {
            this.toggleDropdown(false);
        }
    }

    toggleDropdown(force) {
        if (this.props.disabled) return;
        const isToggled = isBoolean(force) ? force : !this.state.isToggled;
        this.setState({
            isToggled,
            isOpen: isToggled
        });
    }

    getComponent(key) {
        return this.props.children.filter((comp) => {
            return comp.key === key;
        });
    }

    render() {
        return (
            <div className={classnames('dropdown', {'open': this.state.isToggled || this.state.isOpen})} ref={el => this.dropdown = el}>
                <a className="dropdown-toggle" onClick={this.toggleDropdown}>
                    {this.getComponent('dropdownToggle')}
                    <span className="dropdown-icon">
                        <DropdownIcon />
                    </span>
                </a>
                <div className="dropdown-content">
                    {this.getComponent('dropdownContent')}
                </div>
            </div>
        );
    }
}

Dropdown.propTypes = {
    isOpen: PropTypes.bool,
    disabled: PropTypes.bool
}

Dropdown.defaultProps = {
    isOpen: null,
    disabled: false
}