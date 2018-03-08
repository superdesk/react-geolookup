import React from 'react'; // eslint-disable-line no-unused-vars
import {expect} from 'chai';
import ReactTestUtils from 'react-dom/test-utils';
import sinon from 'sinon';
import googleStub from './google_stub';
import Geolookup from '../src/Geolookup';

window.google = global.google = googleStub();

describe('Component: Geolookup with Google APIs', () => {
    let component = null,
        onSuggestSelect = null,
        onActivateSuggest = null,
        onSuggestNoResults = null,
        onFocus = null,
        onKeyPress = null,
        onChange = null,
        onBlur = null,
        onSuggestResults = null,
        onSuggestsLookup = null,
        onGeocodeSuggest = null,
        render = (props) => {
            onSuggestSelect = sinon.spy();
            onActivateSuggest = sinon.spy();
            onSuggestNoResults = sinon.spy();
            onChange = sinon.spy();
            onFocus = sinon.spy();
            onKeyPress = sinon.spy();
            onBlur = sinon.spy();
            onSuggestResults = sinon.spy();
            onSuggestsLookup = sinon.spy();
            onGeocodeSuggest = sinon.spy();

            component = ReactTestUtils.renderIntoDocument(
                <Geolookup
                    radius="20"
                    queryDelay={0}
                    onSuggestSelect={onSuggestSelect}
                    onActivateSuggest={onActivateSuggest}
                    onSuggestNoResults={onSuggestNoResults}
                    onChange={onChange}
                    onFocus={onFocus}
                    onKeyPress={onKeyPress}
                    onBlur={onBlur}
                    onSuggestResults={onSuggestResults}
                    onSuggestsLookup={onSuggestsLookup}
                    onGeocodeSuggest={onGeocodeSuggest}
                    style={{
                        input: {
                            borderColor: '#000'
                        },
                        suggests: {
                            borderColor: '#000'
                        },
                        suggestItem: {
                            borderColor: '#000',
                            borderWidth: 1
                        }
                    }}
                    {...props}
                />
            );
        };

    describe('default', () => { // eslint-disable-line max-statements
        beforeEach(() => render());

        it('should have an input field', () => {
            const input = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'geolookup__input'); // eslint-disable-line max-len

            expect(input).to.have.lengthOf(1);
        });

        it('should not show any suggestions when the input is empty', () => {
            const geoLookupInput = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'geolookup__input'); // eslint-disable-line max-len

            ReactTestUtils.Simulate.focus(geoLookupInput);

            const suggestItems = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'geolookup__item'), // eslint-disable-line max-len, one-var
                suggests = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'geolookup__suggests'); // eslint-disable-line max-len

            expect(suggestItems.length).to.equal(0);
            expect(suggests[0].classList.contains('geolookup__suggests--hidden')).to.be.true; // eslint-disable-line no-unused-expressions, max-len
        });

        it('should call `onSuggestSelect` when we type a city name and choose some of the suggestions', () => { // eslint-disable-line max-len
            const geoLookupInput = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'geolookup__input'); // eslint-disable-line max-len

            geoLookupInput.value = 'New';
            ReactTestUtils.Simulate.change(geoLookupInput);
            ReactTestUtils.Simulate.keyDown(geoLookupInput, {
                key: 'keyDown',
                keyCode: 40,
                which: 40
            });
            ReactTestUtils.Simulate.keyDown(geoLookupInput, {
                key: 'keyDown',
                keyCode: 40,
                which: 40
            });
            ReactTestUtils.Simulate.keyDown(geoLookupInput, {
                key: 'keyUp',
                keyCode: 38,
                which: 38
            });
            ReactTestUtils.Simulate.keyDown(geoLookupInput, {
                key: 'Enter',
                keyCode: 13,
                which: 13
            });
            expect(onSuggestSelect.calledOnce).to.be.true; // eslint-disable-line no-unused-expressions, max-len
        });

        it('should call `onSuggestSelect` when we type a city name and click on one of the suggestions', () => { // eslint-disable-line max-len
            const geoLookupInput = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'geolookup__input'); // eslint-disable-line max-len

            geoLookupInput.value = 'New';
            ReactTestUtils.Simulate.change(geoLookupInput);
            ReactTestUtils.Simulate.focus(geoLookupInput);

            const suggestItems = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'geolookup__item'); // eslint-disable-line max-len, one-var

            ReactTestUtils.Simulate.click(suggestItems[0]);
            expect(onSuggestSelect.calledOnce).to.be.true; // eslint-disable-line no-unused-expressions, max-len
        });

        it('should call `onActivateSuggest` when we key down to a suggestion', () => { // eslint-disable-line max-len
            const geoLookupInput = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'geolookup__input'); // eslint-disable-line max-len

            geoLookupInput.value = 'New';
            ReactTestUtils.Simulate.change(geoLookupInput);
            ReactTestUtils.Simulate.focus(geoLookupInput);
            ReactTestUtils.Simulate.keyDown(geoLookupInput, {
                key: 'keyDown',
                keyCode: 40,
                which: 40
            });
            expect(onActivateSuggest.calledOnce).to.be.true; // eslint-disable-line no-unused-expressions, max-len
        });

        it('should call `onFocus` when we focus the input', () => {
            const geoLookupInput = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'geolookup__input'); // eslint-disable-line max-len

            ReactTestUtils.Simulate.focus(geoLookupInput);
            expect(onFocus.calledOnce).to.be.true; // eslint-disable-line no-unused-expressions, max-len
        });

        it('should call `onBlur` when we remove the focus from the input', () => {
            const geoLookupInput = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'geolookup__input'); // eslint-disable-line max-len

            ReactTestUtils.Simulate.focus(geoLookupInput);
            geoLookupInput.value = 'New';
            ReactTestUtils.Simulate.change(geoLookupInput);
            ReactTestUtils.Simulate.blur(geoLookupInput);
            expect(onBlur.withArgs('New').calledOnce).to.be.true; // eslint-disable-line no-unused-expressions, max-len
        });

        it('should call `onChange` when we change the input value', () => {
            const geoLookupInput = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'geolookup__input'); // eslint-disable-line max-len

            geoLookupInput.value = 'New';
            ReactTestUtils.Simulate.change(geoLookupInput);
            expect(onChange.withArgs('New').calledOnce).to.be.true; // eslint-disable-line no-unused-expressions, max-len
        });

        it('should call `onChange` when the update method is called', () => {
            component.update('New');
            expect(onChange.withArgs('New').calledOnce).to.be.true; // eslint-disable-line no-unused-expressions, max-len
        });

        it('should call `onKeyPress` when we key press in the input', () => {
            const geoLookupInput = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'geolookup__input'); // eslint-disable-line max-len

            ReactTestUtils.Simulate.keyPress(geoLookupInput);
            expect(onKeyPress.calledOnce).to.be.true; // eslint-disable-line no-unused-expressions, max-len
        });

        it('should clear the input text when calling `clear`', () => {
            const geoLookupInput = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'geolookup__input'); // eslint-disable-line max-len

            geoLookupInput.value = 'New';
            ReactTestUtils.Simulate.change(geoLookupInput);
            component.clear();
            expect(geoLookupInput.value).to.equal('');
        });

        it('should not change the active suggest while it remains in the list', () => { // eslint-disable-line max-len
            const geoLookupInput = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'geolookup__input'); // eslint-disable-line max-len

            geoLookupInput.value = 'Ne';
            ReactTestUtils.Simulate.change(geoLookupInput);
            ReactTestUtils.Simulate.focus(geoLookupInput);
            ReactTestUtils.Simulate.keyDown(geoLookupInput, {
                key: 'keyDown',
                keyCode: 40,
                which: 40
            });
            geoLookupInput.value = 'New';
            ReactTestUtils.Simulate.change(geoLookupInput);
            ReactTestUtils.Simulate.keyDown(geoLookupInput, {
                key: 'Enter',
                keyCode: 13,
                which: 13
            });
            expect(onSuggestSelect.args[0][0].placeId).to.equal(onActivateSuggest.args[0][0].placeId); // eslint-disable-line max-len
        });

        it('should reset the active suggest when it disappears from the list', () => { // eslint-disable-line max-len
            const geoLookupInput = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'geolookup__input'); // eslint-disable-line max-len

            geoLookupInput.value = 'Ne';
            ReactTestUtils.Simulate.change(geoLookupInput);
            ReactTestUtils.Simulate.keyDown(geoLookupInput, {
                key: 'keyDown',
                keyCode: 40,
                which: 40
            });
            geoLookupInput.value = '';
            ReactTestUtils.Simulate.change(geoLookupInput);
            ReactTestUtils.Simulate.keyDown(geoLookupInput, {
                key: 'Enter',
                keyCode: 13,
                which: 13
            });
            expect(onActivateSuggest.args.length).to.be.equal(0); // eslint-disable-line max-len
        });

        it('should deactivate the active suggest when pressing arrow down on the last suggest', () => { // eslint-disable-line max-len
            const geoLookupInput = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'geolookup__input'); // eslint-disable-line max-len

            geoLookupInput.value = 'Ne';
            ReactTestUtils.Simulate.change(geoLookupInput);

            const geoLookupItems = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'geolookup__item'); // eslint-disable-line max-len, one-var

            for (let i = 0; i < geoLookupItems.length + 1; i++) {
                ReactTestUtils.Simulate.keyDown(geoLookupInput, {
                    key: 'keyDown',
                    keyCode: 40,
                    which: 40
                });
            }

            const activeItems = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'geolookup__item--active'); // eslint-disable-line max-len, one-var

            expect(activeItems.length).to.be.equal(0);
        });

        it('should activate the last suggest in the list when pressing arrow up', () => { // eslint-disable-line max-len
            const geoLookupInput = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'geolookup__input'); // eslint-disable-line max-len

            geoLookupInput.value = 'New';
            ReactTestUtils.Simulate.change(geoLookupInput);
            ReactTestUtils.Simulate.focus(geoLookupInput);
            ReactTestUtils.Simulate.keyDown(geoLookupInput, {
                key: 'keyUp',
                keyCode: 38,
                which: 38
            });

            const allItems = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'geolookup__item'), // eslint-disable-line max-len, one-var
                activeItem = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'geolookup__item--active'); // eslint-disable-line max-len

            expect(activeItem).to.be.equal(allItems[allItems.length - 1]);
        });

        it('should have the focus after calling `focus`', () => {
            component.focus();
            expect(document.activeElement.classList.contains('geolookup__input')).to.be.true; // eslint-disable-line no-unused-expressions, max-len
        });

        it('should not have the focus after calling `blur`', () => {
            component.focus();
            expect(document.activeElement.classList.contains('geolookup__input')).to.be.true; // eslint-disable-line no-unused-expressions, max-len
            component.blur();
            expect(document.activeElement.classList.contains('geolookup__input')).to.be.false; // eslint-disable-line no-unused-expressions, max-len
        });

        it('should add external inline `style` to input component', () => { // eslint-disable-line max-len
            const geoLookupInput = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'geolookup__input'); // eslint-disable-line max-len

            expect(geoLookupInput.style['border-color']).to.be.equal('#000');
        });

        it('should add external inline `style` to suggestList component', () => { // eslint-disable-line max-len
            const geoLookupList = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'geolookup__suggests'); // eslint-disable-line max-len

            expect(geoLookupList.style['border-color']).to.be.equal('#000');
        });

        it('should add external inline `style` to suggestItem component', () => { // eslint-disable-line max-len
            const geoLookupInput = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'geolookup__input'); // eslint-disable-line max-len

            geoLookupInput.value = 'New';
            ReactTestUtils.Simulate.change(geoLookupInput);
            ReactTestUtils.Simulate.focus(geoLookupInput);

            const geoLookupItems = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'geolookup__item'); // eslint-disable-line max-len, one-var

            expect(geoLookupItems[0].style['border-color']).to.be.equal('#000');
        });

        it('should hide the suggestion box when there are no suggestions', () => {
            const geoLookupInput = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'geolookup__input'), // eslint-disable-line max-len
                geoLookupList = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'geolookup__suggests'); // eslint-disable-line max-len

            geoLookupInput.value = 'There is no result for this. Really.';
            ReactTestUtils.Simulate.change(geoLookupInput);

            expect(geoLookupList.classList.contains('geolookup__suggests--hidden')).to.be.true; // eslint-disable-line max-len, no-unused-expressions
        });

        it('should call `onSuggestNoResults` when there are no suggestions', () => {
            const input = component.dom.input,
                geoLookupInput = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'geolookup__input'); // eslint-disable-line max-len

            input.value = 'There is no result for this. Really.';
            ReactTestUtils.Simulate.change(geoLookupInput);
            ReactTestUtils.Simulate.focus(geoLookupInput);

            expect(onSuggestNoResults.calledOnce).to.be.true; // eslint-disable-line max-len, no-unused-expressions
        });

        it('should call onSuggestSelect on enter', () => {
            const geoLookupInput = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'geolookup__input'); // eslint-disable-line max-len

            geoLookupInput.value = 'New';
            ReactTestUtils.Simulate.change(geoLookupInput);
            ReactTestUtils.Simulate.keyDown(geoLookupInput, {
                key: 'Enter',
                keyCode: 13,
                which: 13
            });
            expect(onSuggestSelect.calledOnce).to.be.true; // eslint-disable-line no-unused-expressions, max-len
        });

        it('should call onSuggestSelect on tab', () => {
            const geoLookupInput = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'geolookup__input'); // eslint-disable-line max-len

            geoLookupInput.value = 'New';
            ReactTestUtils.Simulate.change(geoLookupInput);
            ReactTestUtils.Simulate.keyDown(geoLookupInput, {
                key: 'Tab',
                keyCode: 9,
                which: 9
            });
            expect(onSuggestSelect.calledOnce).to.be.true; // eslint-disable-line no-unused-expressions, max-len
        });

        it('should call onSuggestResults when results are recieved', () => {
            const geoLookupInput = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'geolookup__input'); // eslint-disable-line max-len

            geoLookupInput.value = 'New';
            ReactTestUtils.Simulate.change(geoLookupInput);
            ReactTestUtils.Simulate.focus(geoLookupInput);
            expect(onSuggestResults.calledOnce).to.be.true; // eslint-disable-line no-unused-expressions, max-len
        });
    });

    describe('with tab ignored', () => {
        beforeEach(() => render({ignoreTab: true}));

        it('should not call onSuggestSelect on tab', () => {
            const geoLookupInput = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'geolookup__input'); // eslint-disable-line max-len

            geoLookupInput.value = 'New';
            ReactTestUtils.Simulate.keyDown(geoLookupInput, {
                key: 'Tab',
                keyCode: 9,
                which: 9
            });
            expect(onSuggestSelect.calledOnce).to.be.false; // eslint-disable-line no-unused-expressions, max-len
        });
    });

    describe('with suggestItemLabelRenderer', () => {
        const suggestItemLabelRenderer = sinon.spy(), fixtures = [
            {label: 'New York', location: {lat: 40.7033127, lng: -73.979681}},
            {label: 'Rio', location: {lat: -22.066452, lng: -42.9232368}},
            {label: 'Tokyo', location: {lat: 35.673343, lng: 139.710388}}
        ];

        beforeEach(() => render({
            suggestItemLabelRenderer: suggestItemLabelRenderer,
            fixtures: fixtures
        }));

        it('should call suggestItemLabelRendererwhen displaying options', () => {
            const geoLookupInput = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'geolookup__input'); // eslint-disable-line max-len

            geoLookupInput.value = 'New';
            ReactTestUtils.Simulate.change(geoLookupInput);
            ReactTestUtils.Simulate.focus(geoLookupInput);

            const suggestItems = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'geolookup__item'); // eslint-disable-line max-len, one-var

            ReactTestUtils.Simulate.click(suggestItems[0]);
            expect(onSuggestSelect.calledOnce).to.be.true; // eslint-disable-line no-unused-expressions, max-len
        });
    });

    describe('with fixtures', () => {
        const fixtures = [
            {label: 'New York', location: {lat: 40.7033127, lng: -73.979681}},
            {label: 'Rio', location: {lat: -22.066452, lng: -42.9232368}},
            {label: 'Tokyo', location: {lat: 35.673343, lng: 139.710388}}
        ];

        beforeEach(() => render({fixtures}));

        it('should show the fixtures on focus when the input is empty', () => {
            const geoLookupInput = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'geolookup__input'); // eslint-disable-line max-len

            ReactTestUtils.Simulate.focus(geoLookupInput);

            const suggestItems = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'geolookup__item'); // eslint-disable-line max-len, one-var

            expect(suggestItems.length).to.equal(fixtures.length);
        });

        it('should filter the fixtures depending on the user input', () => {
            const geoLookupInput = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'geolookup__input'); // eslint-disable-line max-len

            geoLookupInput.value = 'Rio';
            ReactTestUtils.Simulate.change(geoLookupInput);
            ReactTestUtils.Simulate.focus(geoLookupInput);

            const suggests = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'geolookup__item'); // eslint-disable-line max-len, one-var

            expect(suggests.length).to.be.equal(1);
        });

        it('should fire `onSuggestSelect` when selecting a fixture', () => {
            const geoLookupInput = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'geolookup__input'); // eslint-disable-line max-len

            geoLookupInput.value = 'Rio';
            ReactTestUtils.Simulate.change(geoLookupInput);
            ReactTestUtils.Simulate.keyDown(geoLookupInput, {
                key: 'keyDown',
                keyCode: 40,
                which: 40
            });
            ReactTestUtils.Simulate.keyDown(geoLookupInput, {
                key: 'Enter',
                keyCode: 13,
                which: 13
            });

            expect(onSuggestSelect.calledOnce).to.be.true; // eslint-disable-line no-unused-expressions, max-len
        });

        it('should show the fixtures when pressing arrow up', () => {
            const geoLookupInput = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'geolookup__input'), // eslint-disable-line max-len
                suggest = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'geolookup__suggests'); // eslint-disable-line max-len

            expect(suggest.classList.contains('geolookup__suggests--hidden')).to.be.true; // eslint-disable-line no-unused-expressions, max-len

            ReactTestUtils.Simulate.keyDown(geoLookupInput, {
                key: 'keyUp',
                keyCode: 38,
                which: 38
            });

            expect(suggest.classList.contains('geolookup__suggests--hidden')).to.be.false; // eslint-disable-line no-unused-expressions, max-len
        });
    });

    describe('with autoActivateFirstSuggest enabled', () => {
        const props = {
            autoActivateFirstSuggest: true
        };

        beforeEach(() => render(props));

        it('should not activate a suggest before focus', () => {
            const activeItems = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'geolookup__item--active'); // eslint-disable-line max-len

            expect(activeItems.length).to.be.equal(0);
            expect(onActivateSuggest.called).to.be.false; // eslint-disable-line no-unused-expressions, max-len
        });

        it('should call `onActivateSuggest` when auto-activating the first suggest', () => { // eslint-disable-line max-len
            const geoLookupInput = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'geolookup__input'); // eslint-disable-line max-len

            geoLookupInput.value = 'New';
            ReactTestUtils.Simulate.change(geoLookupInput);
            ReactTestUtils.Simulate.focus(geoLookupInput);

            expect(onActivateSuggest.calledOnce).to.be.true; // eslint-disable-line no-unused-expressions, max-len
        });

        it('should not change the active suggest when it is set already', () => {
            const geoLookupInput = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'geolookup__input'); // eslint-disable-line max-len

            geoLookupInput.value = 'New';
            ReactTestUtils.Simulate.change(geoLookupInput);
            geoLookupInput.value = 'New York';
            ReactTestUtils.Simulate.change(geoLookupInput);
            ReactTestUtils.Simulate.focus(geoLookupInput);

            expect(onActivateSuggest.calledOnce).to.be.true; // eslint-disable-line no-unused-expressions, max-len
        });

        it('should activate a suggest once there is some input', (done) => {
            const geoLookupInput = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'geolookup__input'); // eslint-disable-line max-len

            geoLookupInput.value = 'New';
            ReactTestUtils.Simulate.change(geoLookupInput);
            ReactTestUtils.Simulate.focus(geoLookupInput);

            setImmediate(() => {
                const activeItems = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'geolookup__item--active'); // eslint-disable-line max-len

                expect(activeItems.length).to.be.equal(1);
                done();
            });
        });
    });

    describe('with label and id props', () => {
        const props = {
            id: 'geolookup-id',
            label: 'some label'
        };

        beforeEach(() => render(props));

        it('should render a <label> if the `label` and `id` props were supplied', () => { // eslint-disable-line max-len
            const label = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'label'); // eslint-disable-line max-len

            expect(label).to.not.equal(null);
        });
    });

    describe('without label and id props', () => {
        beforeEach(() => render());

        it('should not render a <label> if no `label` and `id` props were supplied', () => { // eslint-disable-line max-len
            expect(() =>
                ReactTestUtils.findRenderedDOMComponentWithTag(component, 'label')
            ).to.throw(Error);
        });
    });

    describe('with suggestsHiddenClassName and suggestItemActiveClassName', () => { // eslint-disable-line max-len
        const props = {
            suggestsHiddenClassName: 'suggests-hidden-class',
            suggestItemActiveClassName: 'suggest-item-active',
            autoActivateFirstSuggest: true
        };

        beforeEach(() => render(props));

        it('should apply suggestsHiddenClassName when the list is hidden', () => {
            const geoLookupInput = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'geolookup__input'); // eslint-disable-line max-len

            ReactTestUtils.Simulate.focus(geoLookupInput);

            const suggests = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'geolookup__suggests'); // eslint-disable-line max-len, one-var

            expect(suggests[0].classList.contains('suggests-hidden-class')).to.be.true; // eslint-disable-line no-unused-expressions, max-len
            expect(suggests[0].classList.contains('geolookup__suggests--hidden')).to.be.true; // eslint-disable-line no-unused-expressions, max-len
        });

        it('should apply suggestItemActiveClassName when a list item is active', (done) => { // eslint-disable-line max-len
            const geoLookupInput = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'geolookup__input'); // eslint-disable-line max-len

            geoLookupInput.value = 'New';
            ReactTestUtils.Simulate.change(geoLookupInput);
            ReactTestUtils.Simulate.focus(geoLookupInput);

            setImmediate(() => {
                const activeItems = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'suggest-item-active'); // eslint-disable-line max-len

                expect(activeItems.length).to.be.equal(1);
                expect(activeItems[0].classList.contains('geolookup__item--active')).to.be.true; // eslint-disable-line no-unused-expressions, max-len
                done();
            });
        });
    });

    describe('with geocodeProvider', () => {
        let geocodeProviderStub,
            geocodeProvider = {
                geocode: (suggest) => suggest,
                lookup: (userInput) => userInput
            },
            lookupPromise = new Promise(() => [{
                label: 'test',
                placeId: 'test',
                isFixture: false,
                raw: {}
            }]),
            geocodePromise = new Promise(() => ({
                label: 'test',
                placeId: 'test',
                isFixture: false,
                raw: {}
            }));

        beforeEach(() => {
            if (geocodeProviderStub) {
                return; // stubbed only once
            }
            geocodeProviderStub = sinon.stub(geocodeProvider);
            geocodeProviderStub.lookup.returns(lookupPromise);
            geocodeProviderStub.geocode.returns(geocodePromise);
            render({
                disableAutoLookup: true,
                geocodeProvider: geocodeProviderStub
            });
        });

        it('should display the `Search` button when `disableAutoLookup` is true', () => { // eslint-disable-line max-len
            const geoLookupButton = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'geolookup__button'); // eslint-disable-line max-len

            expect(geoLookupButton).to.not.equal(null);
        });

        it('should call `geocodeProvider.lookup` when `onButtonClick` is called', () => { // eslint-disable-line max-len
            const geoLookupInput = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'geolookup__input'), // eslint-disable-line max-len
                geoLookupButton = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'geolookup__button'); // eslint-disable-line max-len

            ReactTestUtils.Simulate.focus(geoLookupInput);
            geoLookupInput.value = 'New';
            ReactTestUtils.Simulate.change(geoLookupInput);
            ReactTestUtils.Simulate.click(geoLookupButton);
            expect(geocodeProviderStub.lookup.calledOnce).to.be.true; // eslint-disable-line no-unused-expressions, max-len
        });

        it('should call `geocodeProvider.geocode` when is selected', () => { // eslint-disable-line max-len
            const geoLookupInput = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'geolookup__input'), // eslint-disable-line max-len
                geoLookupButton = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'geolookup__button'); // eslint-disable-line max-len

            ReactTestUtils.Simulate.focus(geoLookupInput);
            geoLookupInput.value = 'New';
            ReactTestUtils.Simulate.change(geoLookupInput);
            ReactTestUtils.Simulate.click(geoLookupButton);
            ReactTestUtils.Simulate.keyDown(geoLookupInput, {
                key: 'keyDown',
                keyCode: 40,
                which: 40
            });
            ReactTestUtils.Simulate.keyDown(geoLookupInput, {
                key: 'Enter',
                keyCode: 13,
                which: 13
            });
            expect(geocodeProviderStub.geocode.calledOnce).to.be.true; // eslint-disable-line no-unused-expressions, max-len
        });
    });
});
