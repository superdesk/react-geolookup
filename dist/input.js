'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _filterInputAttributes = require('./filter-input-attributes');

var _filterInputAttributes2 = _interopRequireDefault(_filterInputAttributes);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // eslint-disable-line no-unused-vars


/**
 * The input field
 * @param {Object} props The component's props
 * @return {JSX} The icon component.
 */
var Input = function (_React$PureComponent) {
    _inherits(Input, _React$PureComponent);

    function Input(props) {
        _classCallCheck(this, Input);

        var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props));

        _this.dom = { input: null };
        _this.onFocus = _this.onFocus.bind(_this);
        _this.onChange = _this.onChange.bind(_this);
        _this.onBlur = _this.onBlur.bind(_this);
        _this.onKeyPress = _this.onKeyPress.bind(_this);
        _this.onInputKeyDown = _this.onInputKeyDown.bind(_this);
        _this.focus = _this.focus.bind(_this);
        _this.blur = _this.blur.bind(_this);
        return _this;
    }
    /**
    * When the input got changed
    */


    _createClass(Input, [{
        key: 'onChange',
        value: function onChange() {
            this.props.onChange(this.dom.input.value);
        }

        /**
        * When the input got focused
        */

    }, {
        key: 'onFocus',
        value: function onFocus() {
            this.props.onFocus();
        }

        /**
        * When the input loses focus
        */

    }, {
        key: 'onBlur',
        value: function onBlur() {
            this.props.onBlur();
        }

        /**
        * When a key gets pressed in the input
        * @param  {Event} event The keypress event
        */

    }, {
        key: 'onKeyPress',
        value: function onKeyPress(event) {
            this.props.onKeyPress(event);
        }

        /**
        * When a key gets pressed in the input
        * @param  {Event} event The keydown event
        */

    }, {
        key: 'onInputKeyDown',
        value: function onInputKeyDown(event) {
            // eslint-disable-line complexity
            switch (event.which) {
                case 40:
                    // DOWN
                    event.preventDefault();
                    this.props.onNext();
                    break;
                case 38:
                    // UP
                    event.preventDefault();
                    this.props.onPrev();
                    break;
                case 13:
                    // ENTER
                    if (this.props.ignoreEnter) {
                        event.preventDefault();
                    }

                    this.props.onSelect();
                    break;
                case 9:
                    // TAB
                    if (!this.props.ignoreTab) {
                        this.props.onSelect();
                    }
                    break;
                case 27:
                    // ESC
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

    }, {
        key: 'focus',
        value: function focus() {
            this.dom.input.focus();
        }

        /**
        * Blur the input
        */

    }, {
        key: 'blur',
        value: function blur() {
            this.dom.input.blur();
        }

        /**
        * Render the view
        * @return {Function} The React element to render
        */

    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var attributes = (0, _filterInputAttributes2.default)(this.props),
                classes = (0, _classnames2.default)('geolookup__input', this.props.className);

            return _react2.default.createElement('input', _extends({
                className: classes,
                ref: function ref(node) {
                    return _this2.dom.input = node;
                },
                type: 'text',
                autoComplete: 'off'
            }, attributes, {
                value: this.props.value,
                style: this.props.style,
                onKeyDown: this.onInputKeyDown,
                onChange: this.onChange,
                onKeyPress: this.onKeyPress,
                onFocus: this.onFocus,
                onBlur: this.onBlur
            }));
        }
    }]);

    return Input;
}(_react2.default.PureComponent);

/**
 * Types for the properties
 * @type {Object}
 */


Input.propTypes = {
    ignoreTab: _propTypes2.default.bool,
    ignoreEnter: _propTypes2.default.bool,
    className: _propTypes2.default.string,
    style: _propTypes2.default.object,
    value: _propTypes2.default.string,
    suggest: _propTypes2.default.object,
    onKeyDown: _propTypes2.default.func,
    onKeyPress: _propTypes2.default.func,
    onChange: _propTypes2.default.func,
    onFocus: _propTypes2.default.func,
    onBlur: _propTypes2.default.func,
    onNext: _propTypes2.default.func,
    onPrev: _propTypes2.default.func,
    onSelect: _propTypes2.default.func,
    onEscape: _propTypes2.default.func
};

/**
 * Default values for the properties
 * @type {Object}
 */
Input.defaultProps = {
    className: '',
    value: '',
    ignoreTab: false,
    onKeyDown: function onKeyDown() {/* no-op */},
    onKeyPress: function onKeyPress() {/* no-op */},
    onChange: function onChange() {/* no-op */},
    onFocus: function onFocus() {/* no-op */},
    onBlur: function onBlur() {/* no-op */},
    onNext: function onNext() {/* no-op */},
    onPrev: function onPrev() {/* no-op */},
    onSelect: function onSelect() {/* no-op */},
    onEscape: function onEscape() {/* no-op */}
};

exports.default = Input;