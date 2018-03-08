'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/* istanbul ignore next */
/**
 * Default values
 */
exports.default = {
    fixtures: [],
    initialValue: '',
    placeholder: 'Search places',
    disabled: false,
    className: '',
    inputClassName: '',
    buttonClassName: 'geolookup__button',
    buttonText: 'Search',
    location: null,
    radius: null,
    bounds: null,
    country: null,
    types: null,
    queryDelay: 250,
    googleMaps: null,
    geocodeProvider: null,
    disableAutoLookup: false,
    onActivateSuggest: function onActivateSuggest() {/* no-op */},
    onGeocodeSuggest: function onGeocodeSuggest() {/* no-op */},
    onSuggestsLookup: function onSuggestsLookup() {/* no-op */},
    onSuggestSelect: function onSuggestSelect() {/* no-op */},
    onSuggestResults: function onSuggestResults() {/* no-op */},
    onSuggestNoResults: function onSuggestNoResults() {/* no-op */},
    onFocus: function onFocus() {/* no-op */},
    onBlur: function onBlur() {/* no-op */},
    onChange: function onChange() {/* no-op */},
    skipSuggest: function skipSuggest() {/* no-op */},
    showSuggests: function showSuggests() {/* no-op */},
    getSuggestLabel: function getSuggestLabel(suggest) {
        return suggest.description;
    },
    autoActivateFirstSuggest: false,
    style: {
        input: {},
        suggests: {},
        suggestItem: {}
    },
    ignoreTab: false,
    suggestItemLabelRenderer: function suggestItemLabelRenderer(suggest) {
        return suggest.label;
    }
};