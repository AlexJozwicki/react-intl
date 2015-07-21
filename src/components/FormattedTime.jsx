import React, { Component } from 'react';
import { filterFormatOptions } from './Utils';


export default class FormattedTime extends Component {
    static contextTypes = {
    	i18n: React.PropTypes.object
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

        const defaults = format && this.context.i18n.getNamedFormat('time', format);
        const options  = filterFormatOptions( this.props, FormattedTime.formatOptions, defaults );

        return React.createElement( tagName, this.props, this.context.i18n.formatTime(value, options) );
    }
}
