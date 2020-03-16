import React from 'react'; // eslint-disable-line no-unused-vars
import classnames from 'classnames';
import SuggestItem from './suggest-item';
import PropTypes from 'prop-types';

/**
 * The list with suggestions. Either from an API or provided as fixture
 * @param {Object} props The component's props
 * @return {JSX} The icon component.
 */
export default class SuggestList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.isHidden = this.isHidden.bind(this);
    }
    /**
   * Whether or not it is hidden
   * @return {Boolean} Hidden or not?
   */
    isHidden() {
        return this.props.isHidden || this.props.suggests.length === 0;
    }

    /**
   * There are new properties available for the list
   * @param {Object} nextProps The new properties
   */
    componentWillReceiveProps(nextProps) {
        if (nextProps.suggests !== this.props.suggests) {
            if (nextProps.suggests.length === 0) {
                this.props.onSuggestNoResults();
            }
        }
    }

    /**
   * Render the view
   * @return {Function} The React element to render
   */
    render() {
        const classes = classnames(
            'geolookup__suggests',
            {'geolookup__suggests--hidden': this.isHidden()},
            {
                [this.props.hiddenClassName]: this.props.hiddenClassName
                    ? this.isHidden()
                    : null,
            }
        );

        return (
            <ul className={classes} style={this.props.style}>
                {this.props.suggests.map((suggest) => {
                    const isActive =
            this.props.activeSuggest &&
            suggest.placeId === this.props.activeSuggest.placeId;

                    return (
                        <SuggestItem
                            key={suggest.placeId}
                            className={suggest.className}
                            suggest={suggest}
                            style={this.props.suggestItemStyle}
                            isActive={isActive}
                            activeClassname={this.props.suggestItemActiveClassName}
                            onMouseDown={this.props.onSuggestMouseDown}
                            onMouseOut={this.props.onSuggestMouseOut}
                            onSelect={this.props.onSuggestSelect}
                            suggestItemLabelRenderer={this.props.suggestItemLabelRenderer}
                        />
                    );
                })}
            </ul>
        );
    }
}

/**
 * Types for the properties
 * @type {Object}
 */
SuggestList.propTypes = {
    isHidden: PropTypes.bool,
    suggests: PropTypes.array,
    suggestItemStyle: PropTypes.object,
    style: PropTypes.object,
    activeSuggest: PropTypes.object,
    hiddenClassName: PropTypes.string,
    suggestItemActiveClassName: PropTypes.string,
    onSuggestNoResults: PropTypes.func,
    suggestItemLabelRenderer: PropTypes.func,
    onSuggestMouseDown: PropTypes.func,
    onSuggestMouseOut: PropTypes.func,
    onSuggestSelect: PropTypes.func,
};

/**
 * Default values for the properties
 * @type {Object}
 */
SuggestList.defaultProps = {
    isHidden: true,
    suggests: [],
    onSuggestNoResults: () => { /* no-op */ },
    suggestItemLabelRenderer: () => { /* no-op */ },
    onSuggestMouseDown: () => { /* no-op */ },
    onSuggestMouseOut: () => { /* no-op */ },
    onSuggestSelect: () => { /* no-op */ },
};
