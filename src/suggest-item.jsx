import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

/**
 * A single Geolookup item in the list
 * @param {Object} props The component's props
 * @return {JSX} The icon component.
 */
export default class SuggestItem extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    /**
   * When the suggest item got clicked
   * @param {Event} event The click event
   */
    onClick(event) {
        event.preventDefault();
        this.props.onSelect(this.props.suggest);
    }

    /**
   * Render the view
   * @return {Function} The React element to render
   */
    render() {
        const classes = classnames(
            'geolookup__item',
            this.props.className,
            {'geolookup__item--active': this.props.isActive},
            {
                [this.props.activeClassname]: this.props.activeClassname
                    ? this.props.isActive
                    : null
            }
        );

        return (
            <li
                className={classes}
                style={this.props.style}
                onMouseDown={this.props.onMouseDown}
                onMouseOut={this.props.onMouseOut}
                onClick={this.onClick}
            >
                {this.props.suggestItemLabelRenderer(this.props.suggest)}
            </li>
        );
    }
}

/**
 * Types for the properties
 * @type {Object}
 */
SuggestItem.propTypes = {
    isActive: PropTypes.bool,
    className: PropTypes.string,
    activeClassname: PropTypes.string,
    suggest: PropTypes.object,
    onMouseDown: PropTypes.func,
    onMouseOut: PropTypes.func,
    onSelect: PropTypes.func,
    suggestItemLabelRenderer: PropTypes.func,
    style: PropTypes.object
};

/**
 * Default values for the properties
 * @type {Object}
 */
SuggestItem.defaultProps = {
    isActive: false,
    className: '',
    suggest: {},
    onMouseDown: () => { /* no-op */ },
    onMouseOut: () => { /* no-op */ },
    onSelect: () => { /* no-op */ },
    suggestItemLabelRenderer: () => { /* no-op */ }
};
