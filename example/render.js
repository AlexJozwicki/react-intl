import { Intl } from 'react-intl-es6';
import ContainerComponent from './src/components';


const i18n = {
  locales: ["en-US"],
  messages: {
    SHORT: "{product} cost {price, number, usd} if ordered by {deadline, date, medium}",
    LONG: "{product} cost {price, number, usd} (or {price, number, eur}) if ordered by {deadline, date, medium}",
    LONG_WITH_HTML: "{product} cost <b>{price, number, usd}</b> (<i>or {price, number, eur}</i>) if ordered by {deadline, date, medium}"
  }
};


class App extends Intl {
    constructor() {
        super( i18n.locales, i18n.messages );
    }

    render() {
        return (
            <ContainerComponent />
        );
    }
}

console.log( React.renderToString( <App/> ) );
