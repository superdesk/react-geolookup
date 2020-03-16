import React from 'react';
import ReactDOM from 'react-dom';
import Geolookup from '../../src/Geolookup';

// IMPORTANT: nominatim-browser is only included in dev dependencies
import * as Nominatim from 'nominatim-browser';

class App extends React.Component { // eslint-disable-line
    /**
   * Render the example app
   * @return {Function} React render function
   */
    render() {
        var fixtures = [
            {label: 'New York', location: {lat: 40.7033127, lng: -73.979681}},
            {label: 'Rio', location: {lat: -22.066452, lng: -42.9232368}},
            {label: 'Tokyo', location: {lat: 35.673343, lng: 139.710388}},
        ];

    return ( // eslint-disable-line
            <div>
                <Geolookup
                    inputClassName="geolookup__input--nominatim"
                    disableAutoLookup={true}
                    fixtures={fixtures}
                    onFocus={this.onFocus.bind(this)}
                    onBlur={this.onBlur.bind(this)}
                    onChange={this.onChange.bind(this)}
                    onSuggestsLookup={this.onSuggestsLookup.bind(this)}
                    onGeocodeSuggest={this.onGeocodeSuggest.bind(this)}
                    onSuggestSelect={this.onSuggestSelect.bind(this)}
                    onSuggestResults={this.onSuggestResults.bind(this)}
                    onSuggestNoResults={this.onSuggestNoResults.bind(this)}
                    getSuggestLabel={this.getSuggestLabel.bind(this)}
                    radius="20" />
            </div>
        );
    }

    /**
   * Overrides default suggest lookup routine
   * @param {String} userInput The user input
   * @return {Promise} promise suggest lookup results array
   */
    onSuggestsLookup(userInput) {
        return Nominatim.geocode({
            q: userInput,
            addressdetails: true,
        });
    }

    /**
   * Returns geocoded suggest
   * @param  {Object} suggest The suggest
   * @return {Object} geocoded suggest
   */
    onGeocodeSuggest(suggest) {
        let geocoded = {};

        if (suggest) {
            geocoded.nominatim = suggest.raw || {};
            geocoded.location = {
                lat: suggest.raw ? suggest.raw.lat : '',
                lon: suggest.raw ? suggest.raw.lon : '',
            };
            geocoded.placeId = suggest.placeId;
            geocoded.isFixture = suggest.isFixture;
            geocoded.label = suggest.raw ? suggest.raw.display_name : '';
        }
        return geocoded;
    }

    /**
   * Returns label field value from suggest results
   * @param  {Object} suggest The suggest
   * @return {String} label to use for the suggest
   */
    getSuggestLabel(suggest) {
        return suggest.display_name;
    }

    /**
   * When the input receives focus
   */
    onFocus() {
    console.log('onFocus'); // eslint-disable-line
    }

    /**
   * When the input loses focus
   * @param {String} value The user input
   */
    onBlur(value) {
    console.log('onBlur', value); // eslint-disable-line
    }

    /**
   * When the input got changed
   * @param {String} value The new value
   */
    onChange(value) {
    console.log('input changes to :' + value); // eslint-disable-line
    }

    /**
   * When a suggest got selected
   * @param  {Object} suggest The suggest
   */
    onSuggestSelect(suggest) {
    console.log(suggest); // eslint-disable-line
    }

    /**
   * When there are suggest results
   * @param {Array} suggests The suggestions
   */
    onSuggestResults(suggests) {
    console.log('onSuggestResults :' + suggests); // eslint-disable-line
    }

    /**
   * When there are no suggest results
   * @param {String} userInput The user input
   */
    onSuggestNoResults(userInput) {
    console.log('onSuggestNoResults for :' + userInput); // eslint-disable-line
    }
}

ReactDOM.render(<App />, document.getElementById('app-nominatim')); // eslint-disable-line
