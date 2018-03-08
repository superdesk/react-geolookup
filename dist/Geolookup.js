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

var _lodash = require('lodash.debounce');

var _lodash2 = _interopRequireDefault(_lodash);

var _defaults = require('./defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _propTypes = require('./prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _filterInputAttributes = require('./filter-input-attributes');

var _filterInputAttributes2 = _interopRequireDefault(_filterInputAttributes);

var _input = require('./input');

var _input2 = _interopRequireDefault(_input);

var _suggestList = require('./suggest-list');

var _suggestList2 = _interopRequireDefault(_suggestList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global window */

// Escapes special characters in user input for regex
function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

/**
 * Entry point for the Geolookup component
 */

var Geolookup = function (_React$Component) {
    _inherits(Geolookup, _React$Component);

    /**
    * The constructor. Sets the initial state.
    * @param  {Object} props The properties object.
    */
    function Geolookup(props) {
        _classCallCheck(this, Geolookup);

        var _this = _possibleConstructorReturn(this, (Geolookup.__proto__ || Object.getPrototypeOf(Geolookup)).call(this, props));

        _this.state = {
            isSuggestsHidden: true,
            isLoading: false,
            userInput: props.initialValue,
            activeSuggest: null,
            suggests: []
        };

        _this.onInputChange = _this.onInputChange.bind(_this);
        _this.onAfterInputChange = _this.onAfterInputChange.bind(_this);
        _this.onInputFocus = _this.onInputFocus.bind(_this);
        _this.onInputBlur = _this.onInputBlur.bind(_this);
        _this.onButtonClick = _this.onButtonClick.bind(_this);
        _this.onNext = _this.onNext.bind(_this);
        _this.onPrev = _this.onPrev.bind(_this);
        _this.onSelect = _this.onSelect.bind(_this);
        _this.onSuggestMouseDown = _this.onSuggestMouseDown.bind(_this);
        _this.onSuggestMouseOut = _this.onSuggestMouseOut.bind(_this);
        _this.onSuggestNoResults = _this.onSuggestNoResults.bind(_this);
        _this.blur = _this.blur.bind(_this);
        _this.focus = _this.focus.bind(_this);
        _this.update = _this.update.bind(_this);
        _this.clear = _this.clear.bind(_this);
        _this.searchSuggests = _this.searchSuggests.bind(_this);
        _this.updateSuggests = _this.updateSuggests.bind(_this);
        _this.updateActiveSuggest = _this.updateActiveSuggest.bind(_this);
        _this.showSuggests = _this.showSuggests.bind(_this);
        _this.hideSuggests = _this.hideSuggests.bind(_this);
        _this.activateSuggest = _this.activateSuggest.bind(_this);
        _this.selectSuggest = _this.selectSuggest.bind(_this);
        _this.geocodeSuggest = _this.geocodeSuggest.bind(_this);

        if (props.queryDelay) {
            _this.onAfterInputChange = (0, _lodash2.default)(_this.onAfterInputChange, props.queryDelay);
        }

        _this.geocodeProvider = props.geocodeProvider;
        _this.disableAutoLookup = props.disableAutoLookup;
        _this.dom = { input: null };
        return _this;
    }

    /**
    * Change inputValue if prop changes
    * @param {Object} props The new props
    */


    _createClass(Geolookup, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {
            if (this.props.initialValue !== props.initialValue) {
                this.setState({ userInput: props.initialValue });
            }
        }

        /**
        * Called on the client side after component is mounted.
        * Google api sdk object will be obtained and cached as a instance property.
        * Necessary objects of google api will also be determined and saved.
        */

    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            if (typeof window === 'undefined') {
                return;
            }

            // if no geocodeProvider and no onGeocodeSugegst function is
            // set, use google apis
            if (!this.geocodeProvider && typeof this.props.onGeocodeSuggest() === 'undefined') {
                // use google apis
                var googleMaps = this.props.googleMaps || window.google && // eslint-disable-line no-extra-parens
                window.google.maps || this.googleMaps;

                this.googleMaps = googleMaps;
                /* istanbul ignore next */
                if (!googleMaps) {
                    return;
                }
                this.autocompleteService = new googleMaps.places.AutocompleteService();
                this.geocoder = new googleMaps.Geocoder();
            }
        }

        /**
        * When the component will unmount
        */

    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            clearTimeout(this.timer);
        }

        /**
        * When the input changed
        * @param {String} userInput The input value of the user
        */

    }, {
        key: 'onInputChange',
        value: function onInputChange(userInput) {
            this.setState({ userInput: userInput }, this.onAfterInputChange);
        }

        /**
        * On After the input got changed
        */

    }, {
        key: 'onAfterInputChange',
        value: function onAfterInputChange() {
            if (!this.state.isSuggestsHidden && !this.disableAutoLookup) {
                this.showSuggests();
            }
            this.props.onChange(this.state.userInput);
        }

        /**
        * When the input gets focused
        */

    }, {
        key: 'onInputFocus',
        value: function onInputFocus() {
            this.props.onFocus();
            if (!this.disableAutoLookup) {
                this.showSuggests();
            }
        }

        /**
        * When the input gets blurred
        */

    }, {
        key: 'onInputBlur',
        value: function onInputBlur() {
            if (!this.state.ignoreBlur && !this.disableAutoLookup) {
                this.hideSuggests();
            }
        }

        /**
        * When the search button gets clicked
        */

    }, {
        key: 'onButtonClick',
        value: function onButtonClick() {
            if (this.state.isSuggestsHidden && this.disableAutoLookup) {
                this.showSuggests();
            } else {
                this.hideSuggests();
            }
        }
    }, {
        key: 'onNext',
        value: function onNext() {
            this.activateSuggest('next');
        }
    }, {
        key: 'onPrev',
        value: function onPrev() {
            this.activateSuggest('prev');
        }
    }, {
        key: 'onSelect',
        value: function onSelect() {
            this.selectSuggest(this.state.activeSuggest);
        }
    }, {
        key: 'onSuggestMouseDown',
        value: function onSuggestMouseDown() {
            this.setState({ ignoreBlur: true });
        }
    }, {
        key: 'onSuggestMouseOut',
        value: function onSuggestMouseOut() {
            this.setState({ ignoreBlur: false });
        }
    }, {
        key: 'onSuggestNoResults',
        value: function onSuggestNoResults() {
            this.props.onSuggestNoResults(this.state.userInput);
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
        * Update the value of the user input
        * @param {String} userInput the new value of the user input
        */

    }, {
        key: 'update',
        value: function update(userInput) {
            this.setState({ userInput: userInput });
            this.props.onChange(userInput);
        }

        /*
        * Clear the input and close the suggestion pane
        */

    }, {
        key: 'clear',
        value: function clear() {
            this.setState({ userInput: '' }, this.hideSuggests);
        }

        /**
        * Search for new suggests
        */

    }, {
        key: 'searchSuggests',
        value: function searchSuggests() {
            var _this2 = this;

            if (!this.state.userInput) {
                this.updateSuggests();
                return;
            }

            this.setState({ isLoading: true }, function () {
                if (typeof _this2.props.onSuggestsLookup() === 'undefined') {
                    if (_this2.props.geocodeProvider) {
                        // Use props defined geocodeProvider.lookup
                        _this2.props.geocodeProvider.lookup(_this2.state.userInput).then(function (suggestsResults) {
                            _this2.setState({ isLoading: false });
                            _this2.updateSuggests(suggestsResults || [], // can be null
                            function () {
                                if (_this2.props.autoActivateFirstSuggest && !_this2.state.activeSuggest) {
                                    _this2.activateSuggest('next');
                                }
                            });
                        }).catch(function (error) {
                            console.error('geocodeProvider lookup Error: ', error);
                        });
                    } else {
                        // Use Google Places lookup
                        var options = {
                            input: _this2.state.userInput
                        };

                        ['location', 'radius', 'bounds', 'types'].forEach(function (option) {
                            if (_this2.props[option]) {
                                options[option] = _this2.props[option];
                            }
                        });

                        if (_this2.props.country) {
                            options.componentRestrictions = {
                                country: _this2.props.country
                            };
                        }
                        _this2.autocompleteService.getPlacePredictions(options, function (suggestsResults) {
                            _this2.setState({ isLoading: false });
                            _this2.updateSuggests(suggestsResults || [], // can be null
                            function () {
                                if (_this2.props.autoActivateFirstSuggest && !_this2.state.activeSuggest) {
                                    _this2.activateSuggest('next');
                                }
                            });
                        });
                    }
                } else {
                    // Use props defined onSuggestLookup
                    _this2.props.onSuggestsLookup(_this2.state.userInput).then(function (suggestsResults) {
                        _this2.setState({ isLoading: false });
                        _this2.updateSuggests(suggestsResults || [], // can be null
                        function () {
                            if (_this2.props.autoActivateFirstSuggest && !_this2.state.activeSuggest) {
                                _this2.activateSuggest('next');
                            }
                        });
                    }).catch(function (error) {
                        console.error('onSuggestsLookup Search Error: ', error);
                    });
                }
            });
        }

        /**
        * Update the suggests
        * @param {Array} suggestsResults The new google suggests
        * @param {Function} callback Called once the state has been updated
        */

    }, {
        key: 'updateSuggests',
        value: function updateSuggests() {
            var _this3 = this;

            var suggestsResults = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
            var callback = arguments[1];

            var suggests = [],
                regex = new RegExp(escapeRegExp(this.state.userInput), 'gim'),
                skipSuggest = this.props.skipSuggest,
                maxFixtures = 10,
                fixturesSearched = 0,
                activeSuggest = null;

            this.props.fixtures.forEach(function (suggest) {
                if (fixturesSearched >= maxFixtures) {
                    return;
                }

                if (!skipSuggest(suggest) && suggest.label.match(regex)) {
                    fixturesSearched++;

                    suggest.placeId = suggest.label;
                    suggest.isFixture = true;
                    suggests.push(suggest);
                }
            });

            suggestsResults.forEach(function (suggest) {
                if (!skipSuggest(suggest)) {
                    suggests.push({
                        label: _this3.props.getSuggestLabel(suggest),
                        placeId: suggest.place_id,
                        raw: suggest,
                        isFixture: false
                    });
                }
            });

            activeSuggest = this.updateActiveSuggest(suggests);
            this.props.onSuggestResults(suggests);
            this.setState({ suggests: suggests, activeSuggest: activeSuggest }, callback);
        }

        /**
        * Return the new activeSuggest object after suggests have been updated
        * @param {Array} suggests The new list of suggests
        * @return {Object} The new activeSuggest
        **/

    }, {
        key: 'updateActiveSuggest',
        value: function updateActiveSuggest() {
            var suggests = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            var activeSuggest = this.state.activeSuggest;

            if (activeSuggest) {
                var newSuggest = suggests.find(function (listedSuggest) {
                    return activeSuggest.placeId === listedSuggest.placeId && activeSuggest.isFixture === listedSuggest.isFixture;
                });

                activeSuggest = newSuggest || null;
            }

            return activeSuggest;
        }

        /**
        * Show the suggestions
        */

    }, {
        key: 'showSuggests',
        value: function showSuggests() {
            this.searchSuggests();
            this.setState({ isSuggestsHidden: false });
        }

        /**
        * Hide the suggestions
        */

    }, {
        key: 'hideSuggests',
        value: function hideSuggests() {
            var _this4 = this;

            this.props.onBlur(this.state.userInput);
            this.timer = setTimeout(function () {
                _this4.setState({
                    isSuggestsHidden: true,
                    activeSuggest: null
                });
            }, 100);
        }

        /**
        * Activate a new suggest
        * @param {String} direction The direction in which to activate new suggest
        */

    }, {
        key: 'activateSuggest',
        value: function activateSuggest(direction) {
            // eslint-disable-line complexity
            if (this.state.isSuggestsHidden) {
                this.showSuggests();
                return;
            }

            var suggestsCount = this.state.suggests.length - 1,
                next = direction === 'next';
            var newActiveSuggest = null,
                newIndex = 0,
                i = 0;

            for (i; i <= suggestsCount; i++) {
                if (this.state.suggests[i] === this.state.activeSuggest) {
                    newIndex = next ? i + 1 : i - 1;
                }
            }

            if (!this.state.activeSuggest) {
                newIndex = next ? 0 : suggestsCount;
            }

            if (newIndex >= 0 && newIndex <= suggestsCount) {
                newActiveSuggest = this.state.suggests[newIndex];
            }

            this.props.onActivateSuggest(newActiveSuggest);

            this.setState({ activeSuggest: newActiveSuggest });
        }

        /**
        * When an item got selected
        * @param {GeolookupItem} suggest The selected suggest item
        */

    }, {
        key: 'selectSuggest',
        value: function selectSuggest(suggest) {
            if (!suggest) {
                // eslint-disable-next-line no-param-reassign
                suggest = {
                    label: this.state.userInput
                };
            }

            this.setState({
                isSuggestsHidden: true,
                userInput: suggest.label
            });

            if (suggest.location) {
                this.setState({ ignoreBlur: false });
                this.props.onSuggestSelect(suggest);
                return;
            }

            this.geocodeSuggest(suggest);
        }

        /**
        * Geocode a suggest
        * @param  {Object} suggest The suggest
        */

    }, {
        key: 'geocodeSuggest',
        value: function geocodeSuggest(suggest) {
            var _this5 = this;

            if (typeof this.props.onGeocodeSuggest() === 'undefined') {
                if (this.props.geocodeProvider) {
                    // use props defined geocodeProvider
                    this.props.geocodeProvider.geocode(suggest).then(function (geocodedResults) {
                        _this5.props.onSuggestSelect(geocodedResults);
                    });
                } else {
                    // use default google geocode lib
                    this.geocoder.geocode(suggest.placeId && !suggest.isFixture ? { placeId: suggest.placeId } : { address: suggest.label }, function (results, status) {
                        if (status === _this5.googleMaps.GeocoderStatus.OK) {
                            var gmaps = results[0],
                                location = gmaps.geometry.location;

                            suggest.gmaps = gmaps;
                            suggest.location = {
                                lat: location.lat(),
                                lng: location.lng()
                            };
                        }
                        _this5.props.onSuggestSelect(suggest);
                    });
                }
            } else {
                // use props defined geocode function
                var geocodedSuggest = this.props.onGeocodeSuggest(suggest);

                this.props.onSuggestSelect(geocodedSuggest);
            }
        }

        /**
        * Render the view
        * @return {Function} The React element to render
        */

    }, {
        key: 'render',
        value: function render() {
            var _this6 = this;

            var attributes = (0, _filterInputAttributes2.default)(this.props),
                classes = (0, _classnames2.default)('geolookup', this.props.className, { 'geolookup--loading': this.state.isLoading }),
                shouldRenderLabel = this.props.label && attributes.id,
                shouldRenderButton = this.props.disableAutoLookup,
                input = _react2.default.createElement(_input2.default, _extends({ className: this.props.inputClassName,
                ref: function ref(node) {
                    return _this6.dom.input = node;
                },
                value: this.state.userInput,
                ignoreEnter: !this.state.isSuggestsHidden,
                ignoreTab: this.props.ignoreTab,
                style: this.props.style.input,
                onChange: this.onInputChange,
                onFocus: this.onInputFocus,
                onBlur: this.onInputBlur,
                onKeyPress: this.props.onKeyPress,
                onNext: this.onNext,
                onPrev: this.onPrev,
                onSelect: this.onSelect,
                onEscape: this.hideSuggests }, attributes)),
                button = _react2.default.createElement(
                'button',
                { className: this.props.buttonClassName,
                    type: 'button',
                    onClick: this.onButtonClick },
                this.props.buttonText
            ),
                suggestionsList = _react2.default.createElement(_suggestList2.default, { isHidden: this.state.isSuggestsHidden,
                style: this.props.style.suggests,
                suggestItemStyle: this.props.style.suggestItem,
                suggests: this.state.suggests,
                hiddenClassName: this.props.suggestsHiddenClassName,
                suggestItemActiveClassName: this.props.suggestItemActiveClassName,
                activeSuggest: this.state.activeSuggest,
                onSuggestNoResults: this.onSuggestNoResults,
                onSuggestMouseDown: this.onSuggestMouseDown,
                onSuggestMouseOut: this.onSuggestMouseOut,
                onSuggestSelect: this.selectSuggest,
                suggestItemLabelRenderer: this.props.suggestItemLabelRenderer });

            return _react2.default.createElement(
                'div',
                { className: classes },
                _react2.default.createElement(
                    'span',
                    { className: 'geolookup__input-wrapper' },
                    shouldRenderLabel && _react2.default.createElement(
                        'label',
                        { className: 'geolookup__label',
                            htmlFor: attributes.id },
                        this.props.label
                    ),
                    input
                ),
                shouldRenderButton && _react2.default.createElement(
                    'span',
                    { className: 'geolookup__button-wrapper' },
                    button
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'geolookup__suggests-wrapper' },
                    suggestionsList
                )
            );
        }
    }]);

    return Geolookup;
}(_react2.default.Component);

/**
 * Types for the properties
 * @type {Object}
 */


Geolookup.propTypes = _propTypes2.default;

/**
 * Default values for the properties
 * @type {Object}
 */
Geolookup.defaultProps = _defaults2.default;

exports.default = Geolookup;