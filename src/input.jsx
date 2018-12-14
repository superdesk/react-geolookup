import React from 'react'; // eslint-disable-line no-unused-vars
import classnames from 'classnames';

import filterInputAttributes from './filter-input-attributes';
import PropTypes from 'prop-types';
import shallowCompare from 'react-addons-shallow-compare';

/**
 * The input field
 * @param {Object} props The component's props
 * @return {JSX} The icon component.
 */
class Input extends React.PureComponent {
    constructor(props) {
        super(props);
        this.dom = {input: null};
        this.onFocus = this.onFocus.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.onInputKeyDown = this.onInputKeyDown.bind(this);
        this.focus = this.focus.bind(this);
        this.blur = this.blur.bind(this);
    }
    /**
   * When the input got changed
   */
    onChange() {
        this.props.onChange(this.dom.input.value);
    }

    /**
   * When the input got focused
   */
    onFocus() {
        this.props.onFocus();
    }

    /**
   * When the input loses focus
   */
    onBlur() {
        this.props.onBlur();
    }

    /**
   * When a key gets pressed in the input
   * @param  {Event} event The keypress event
   */
    onKeyPress(event) {
        this.props.onKeyPress(event);
    }

    /**
   * When a key gets pressed in the input
   * @param  {Event} event The keydown event
   */
    onInputKeyDown(event) {
    // eslint-disable-line complexity
        switch (event.which) {
        case 40: // DOWN
            event.preventDefault();
            this.props.onNext();
            break;
        case 38: // UP
            event.preventDefault();
            this.props.onPrev();
            break;
        case 13: // ENTER
            if (this.props.ignoreEnter) {
                event.preventDefault();
            }

            this.props.onSelect();
            break;
        case 9: // TAB
            if (!this.props.ignoreTab) {
                this.props.onSelect();
            }
            break;
        case 27: // ESC
            this.props.onEscape();
            break;
            /* istanbul ignore next */
        default:
            break;
        }
    }

    /**
   * Focus the input
   */
    focus() {
        this.dom.input.focus();
    }

    /**
   * Blur the input
   */
    blur() {
        this.dom.input.blur();
    }

    /**
   * Render the view
   * @return {Function} The React element to render
   */
    render() {
        const attributes = filterInputAttributes(this.props),
            classes = classnames('geolookup__input', this.props.className);

        return (
            <input
                className={classes}
                ref={(node) => this.dom.input = node}
                type="text"
                autoComplete="off"
                {...attributes}
                value={this.props.value}
                style={this.props.style}
                onKeyDown={this.onInputKeyDown}
                onChange={this.onChange}
                onKeyPress={this.onKeyPress}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
            />
        );
    }
}

/**
 * Types for the properties
 * @type {Object}
 */
Input.propTypes = {
    ignoreTab: PropTypes.bool,
    ignoreEnter: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
    value: PropTypes.string,
    suggest: PropTypes.object,
    onKeyDown: PropTypes.func,
    onKeyPress: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onNext: PropTypes.func,
    onPrev: PropTypes.func,
    onSelect: PropTypes.func,
    onEscape: PropTypes.func,
};

/**
 * Default values for the properties
 * @type {Object}
 */
Input.defaultProps = {
    className: '',
    value: '',
    ignoreTab: false,
    onKeyDown: () => { /* no-op */ },
    onKeyPress: () => { /* no-op */ },
    onChange: () => { /* no-op */ },
    onFocus: () => { /* no-op */ },
    onBlur: () => { /* no-op */ },
    onNext: () => { /* no-op */ },
    onPrev: () => { /* no-op */ },
    onSelect: () => { /* no-op */ },
    onEscape: () => { /* no-op */ }
};

export default Input;
