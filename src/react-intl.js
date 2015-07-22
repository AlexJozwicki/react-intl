import IntlMessageFormat    from 'intl-messageformat';
import IntlRelativeFormat   from 'intl-relativeformat';

import defaultLocale        from './en';

import FormattedDate        from './components/FormattedDate';
import FormattedTime        from './components/FormattedTime';
import FormattedRelative    from './components/FormattedRelative';
import FormattedNumber      from './components/FormattedNumber';
import FormattedMessage     from './components/FormattedMessage';
import FormattedHTMLMessage from './components/FormattedHTMLMessage';

export {
    FormattedDate,
    FormattedTime,
    FormattedRelative,
    FormattedNumber,
    FormattedMessage,
    FormattedHTMLMessage
};

export function __addLocaleData(data) {
    IntlMessageFormat.__addLocaleData(data);
    IntlRelativeFormat.__addLocaleData(data);
}

__addLocaleData(defaultLocale);
