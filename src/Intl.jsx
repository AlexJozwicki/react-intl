import React, { Component } from 'react';
import IntlApi              from './IntlApi';


/**
 * This is a base start for the top-most element of the application, injecting the API as a context.
 */
export default class Intl extends Component {
    constructor( locales, messages, formats ) {
        super();
        this.api = new IntlApi( locales, messages, formats );
    }

    static propTypes = {
        /*locales : React.PropTypes.arrayOf( React.PropTypes.string ).isRequired,
        messages: React.PropTypes.object.isRequired,
        formats : React.PropTypes.object.isRequired,*/
    };

    getChildContext() {
        return {
            intl: this.api
        };
    }

    static childContextTypes = {
    	intl: React.PropTypes.object
    };
}
