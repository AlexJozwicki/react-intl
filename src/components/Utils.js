export function filterFormatOptions( obj, formatOptions = [], defaults = {} ) {
    return ( formatOptions ).reduce( ( opts, name ) => {
        if( obj.hasOwnProperty( name ) ) {
            opts[name] = obj[name];
        } else if (defaults.hasOwnProperty(name)) {
            opts[name] = defaults[name];
        }

        return opts;
    }, {} );
}
