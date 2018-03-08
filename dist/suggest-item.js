'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A single Geolookup item in the list
 * @param {Object} props The component's props
 * @return {JSX} The icon component.
 */
var SuggestItem = function (_React$PureComponent) {
    _inherits(SuggestItem, _React$PureComponent);

    function SuggestItem(props) {
        _classCallCheck(this, SuggestItem);

        var _this = _possibleConstructorReturn(this, (SuggestItem.__proto__ || Object.getPrototypeOf(SuggestItem)).call(this, props));

        _this.onClick = _this.onClick.bind(_this);
        return _this;
    }

    /**
    * When the suggest item got clicked
    * @param {Event} event The click event
    */


    _createClass(SuggestItem, [{
        key: 'onClick',
        value: function onClick(event) {
            event.preventDefault();
            this.props.onSelect(this.props.suggest);
        }

        /**
        * Render the view
        * @return {Function} The React element to render
        */

    }, {
        key: 'render',
        value: function render() {
            var classes = (0, _classnames3.default)('geolookup__item', this.props.className, { 'geolookup__item--active': this.props.isActive }, _defineProperty({}, this.props.activeClassname, this.props.activeClassname ? this.props.isActive : null));

            return _react2.default.createElement(
                'li',
                {
                    className: classes,
                    style: this.props.style,
                    onMouseDown: this.props.onMouseDown,
                    onMouseOut: this.props.onMouseOut,
                    onClick: this.onClick
                },
                this.props.suggestItemLabelRenderer(this.props.suggest)
            );
        }
    }]);

    return SuggestItem;
}(_react2.default.PureComponent);

/**
 * Types for the properties
 * @type {Object}
 */


exports.default = SuggestItem;
SuggestItem.propTypes = {
    isActive: _propTypes2.default.bool,
    className: _propTypes2.default.string,
    activeClassname: _propTypes2.default.string,
    suggest: _propTypes2.default.object,
    onMouseDown: _propTypes2.default.func,
    onMouseOut: _propTypes2.default.func,
    onSelect: _propTypes2.default.func,
    suggestItemLabelRenderer: _propTypes2.default.func,
    style: _propTypes2.default.object
};

/**
 * Default values for the properties
 * @type {Object}
 */
SuggestItem.defaultProps = {
    isActive: false,
    className: '',
    suggest: {},
    onMouseDown: function onMouseDown() {/* no-op */},
    onMouseOut: function onMouseOut() {/* no-op */},
    onSelect: function onSelect() {/* no-op */},
    suggestItemLabelRenderer: function suggestItemLabelRenderer() {/* no-op */}
};