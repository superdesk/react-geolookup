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
  onActivateSuggest: function onActivateSuggest() {},
  onGeocodeSuggest: function onGeocodeSuggest() {},
  onSuggestsLookup: function onSuggestsLookup() {},
  onSuggestSelect: function onSuggestSelect() {},
  onSuggestResults: function onSuggestResults() {},
  onSuggestNoResults: function onSuggestNoResults() {},
  onFocus: function onFocus() {},
  onBlur: function onBlur() {},
  onChange: function onChange() {},
  skipSuggest: function skipSuggest() {},
  showSuggests: function showSuggests() {},
  getSuggestLabel: function getSuggestLabel(suggest) {
    return suggest.description;
  },
  autoActivateFirstSuggest: false,
  style: {
    'input': {},
    'suggests': {},
    'suggestItem': {}
  },
  ignoreTab: false
};