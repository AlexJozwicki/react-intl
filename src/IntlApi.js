import IntlMessageFormat    from 'intl-messageformat';
import IntlRelativeFormat   from 'intl-relativeformat';
import createFormatCache    from 'intl-format-cache';


/**
 * Determine if the `date` is valid by checking if it is finite, which is
 * the same way that `Intl.DateTimeFormat#format()` checks.
 * @private
 */
function assertIsDate(date, errMsg) {
    if (!isFinite(date)) {
        throw new TypeError(errMsg);
    }
}


/**
 *
 * This is the Intl API that should be passed as a context throughout the application.
 * Every component from this package uses this.
 *
 */
export default class IntlApi {
    constructor( locales, messages, formats ) {
        this.messages = messages;
        this.formats = formats;
        this.locales = locales;

        this.getNumberFormat    = createFormatCache( Intl.NumberFormat );
        this.getDateTimeFormat  = createFormatCache( Intl.DateTimeFormat );
        this.getMessageFormat   = createFormatCache( IntlMessageFormat );
        this.getRelativeFormat  = createFormatCache( IntlRelativeFormat );
    }

    formatDate( date : string | Date, options : Object ) {
        date = new Date(date);
        assertIsDate(date, 'A date or timestamp must be provided to formatDate()');
        return this._format('date', date, options);
    }

    formatTime( date : string | Date, options ) {
        date = new Date(date);
        assertIsDate(date, 'A date or timestamp must be provided to formatTime()');
        return this._format('time', date, options);
    }

    formatRelative( date : string | Date, options, formatOptions ) {
        date = new Date(date);
        assertIsDate(date, 'A date or timestamp must be provided to formatRelative()');
        return this._format('relative', date, options, formatOptions);
    }

    formatNumber( num : number, options ) {
        return this._format('number', num, options);
    }

    formatMessage( message : string | Function, values ) {
        // When `message` is a function, assume it's an IntlMessageFormat
        // instance's `format()` method passed by reference, and call it. This
        // is possible because its `this` will be pre-bound to the instance.
        if( typeof message === 'function' ) {
            return message( values );
        }

        if( typeof message === 'string' ) {
            message = this.getMessageFormat( message, this.locales, this.formats );
        }

        return message.format(values);
    }

    getMessage( path : string ) : string {
        var messages  = this.messages;
        var pathParts = path.split('.');

        var message;

        try {
            message = pathParts.reduce(function (obj, pathPart) {
                return obj[pathPart];
            }, messages);
        } finally {
            if (message === undefined) {
                console.error('Could not find Intl message: ' + path);
                return path;
            }
        }

        return message;
    }

    getFormat( type: string, format : string | Object ) {
        if( typeof format === 'string' ) {
            return this.getNamedFormat( type, format );
        }
        else {
            return format;
        }
    }

    getNamedFormat( type : string, name : string ) {
        var formats = this.formats;
        var format  = null;

        try {
            format = formats[type][name];
        } finally {
            if (!format) {
                throw new ReferenceError(
                    'No ' + type + ' format named: ' + name
                );
            }
        }

        return format;
    }

    _format(type : string, value, options, formatOptions) {
        var locales = this.locales;

        if (options && typeof options === 'string') {
            options = this.getNamedFormat(type, options);
        }

        switch(type) {
            case 'date':
            case 'time':
                return this.getDateTimeFormat(locales, options).format(value);
            case 'number':
                return this.getNumberFormat(locales, options).format(value);
            case 'relative':
                return this.getRelativeFormat(locales, options).format(value, formatOptions);
            default:
                throw new Error('Unrecognized format type: ' + type);
        }
    }
};
