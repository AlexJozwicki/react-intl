import IntlMessageFormat    from 'intl-messageformat';
import IntlRelativeFormat   from 'intl-relativeformat';

import defaultLocale        from './en';

export FormattedDate        from './components/FormattedDate';
export FormattedTime        from './components/FormattedTime';
export FormattedRelative    from './components/FormattedRelative';
export FormattedNumber      from './components/FormattedNumber';
export FormattedMessage     from './components/FormattedMessage';
export FormattedHTMLMessage from './components/FormattedHTMLMessage';
export Intl                 from './Intl';

export function __addLocaleData(data) {
    IntlMessageFormat.__addLocaleData(data);
    IntlRelativeFormat.__addLocaleData(data);
}

__addLocaleData(defaultLocale);
