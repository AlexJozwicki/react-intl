import React, { Component } from 'react';
import IntlApi              from './IntlApi';


/**
 * This is a base start for the top-most element of the application, injecting the API as a context.
 */
export default class Intl extends Component {
    constructor( props ) {
        super();
        this.api = new IntlApi( props.locales, props.messages, props.formats );
    }

    static propTypes = {
        locales : React.PropTypes.arrayOf( React.PropTypes.string ).isRequired,
        messages: React.PropTypes.object.isRequired,
        formats : React.PropTypes.object.isRequired,
    };

    getChildContext() {
        return {
            i18n: this.api
        };
    }

    static childContextTypes = {
    	i18n: React.PropTypes.func
    };
}
