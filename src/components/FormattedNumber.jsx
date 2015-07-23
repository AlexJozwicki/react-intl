import React, { Component } from 'react';
import { filterFormatOptions } from './Utils';


export default class FormattedNumber extends Component {
    static contextTypes = {
    	intl: React.PropTypes.object
    };

    static formatOptions : Array< string > = [
        'localeMatcher', 'style', 'currency', 'currencyDisplay',
        'useGrouping', 'minimumIntegerDigits', 'minimumFractionDigits',
        'maximumFractionDigits', 'minimumSignificantDigits',
        'maximumSignificantDigits'
    ];

    static propTypes = {
        format  : React.PropTypes.oneOfType([
          React.PropTypes.string,
          React.PropTypes.object
        ]),
        value : React.PropTypes.any.isRequired
    };

    static defaultProps = {
        tagName: 'span'
    };

    render() {
        const { tagName, value, format, className } = this.props;
        const defaults = format && this.context.intl.getFormat( 'number', format );
        const options  = filterFormatOptions( this.props, FormattedNumber.formatOptions, defaults );

        return React.createElement( tagName, { className }, this.context.intl.formatNumber( value, options ) );
    }
}
