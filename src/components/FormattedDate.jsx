import React, { Component } from 'react';
import { filterFormatOptions } from './Utils';


export default class FormattedDate extends Component {
    static contextTypes = {
    	intl: React.PropTypes.object
    };

    static formatOptions : Array< string > = [
        'localeMatcher', 'timeZone', 'hour12', 'formatMatcher', 'weekday',
        'era', 'year', 'month', 'day', 'hour', 'minute', 'second',
        'timeZoneName'
    ];

    static propTypes = {
        format: React.PropTypes.string,
        value : React.PropTypes.any.isRequired
    };

    static defaultProps = {
        tagName: 'span'
    };

    render() {
        const { tagName, value, format } = this.props;

        const defaults = format && this.getNamedFormat('date', format);
        const options  = filterFormatOptions( this.props, FormattedDate.formatOptions, defaults );

        return React.createElement( tagName, { className }, this.context.intl.formatDate(value, options) );
    }
}
