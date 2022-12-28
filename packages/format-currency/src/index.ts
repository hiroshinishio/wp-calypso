import { doesCurrencyExist, getCurrencyOverride } from './currencies';
import type { CurrencyObject, CurrencyObjectOptions } from './types';

export * from './types';

let defaultLocale: string | undefined = undefined;
const formatterCache = new Map< string, Intl.NumberFormat >();

/**
 * Set a default locale for use by `formatCurrency` and `getCurrencyObject`.
 *
 * Note that this is global and will override any browser locale that is set!
 * Use it with care.
 */
export function setDefaultLocale( locale: string | undefined ): void {
	defaultLocale = locale;
}

function getLocaleFromBrowser() {
	if ( typeof window === 'undefined' ) {
		return 'en';
	}
	if ( window.navigator?.languages?.length > 0 ) {
		return window.navigator.languages[ 0 ];
	}
	return window.navigator?.language ?? 'en';
}

function getFormatterCacheKey( {
	locale,
	currency,
	noDecimals,
}: {
	locale: string;
	currency: string;
	noDecimals: boolean;
} ): string {
	return `currency:${ currency },locale:${ locale },noDecimals:${ noDecimals }`;
}

function isNoDecimals( number: number, options: CurrencyObjectOptions ) {
	if ( options.stripZeros && Number.isInteger( number ) ) {
		return true;
	}
	return false;
}

/**
 * Creating an Intl.NumberFormat is expensive, so this allows caching.
 */
function getCachedFormatter( {
	locale,
	currency,
	noDecimals,
}: {
	locale: string;
	currency: string;
	noDecimals: boolean;
} ): Intl.NumberFormat {
	const cacheKey = getFormatterCacheKey( { locale, currency, noDecimals } );
	if ( formatterCache.has( cacheKey ) ) {
		const formatter = formatterCache.get( cacheKey );
		if ( formatter ) {
			return formatter;
		}
	}

	const formatter = new Intl.NumberFormat( locale, {
		style: 'currency',
		currency,
		// There's an option called `trailingZeroDisplay` but it does not yet work
		// in FF so we have to strip zeros manually.
		...( noDecimals ? { maximumFractionDigits: 0 } : {} ),
	} );

	formatterCache.set( cacheKey, formatter );

	return formatter;
}

function getPrecisionForLocaleAndCurrency( locale: string, currency: string ): number {
	const defaultFormatter = getCachedFormatter( {
		locale,
		currency,
		noDecimals: false,
	} );
	return defaultFormatter.resolvedOptions().maximumFractionDigits;
}

function prepareNumberForFormatting(
	number: number,
	// currencyPrecision here must be the precision of the currency, regardless
	// of what precision is requested for display!
	currencyPrecision: number,
	options: CurrencyObjectOptions
) {
	if ( isNaN( number ) ) {
		// eslint-disable-next-line no-console
		console.warn( 'formatCurrency was called with NaN' );
		number = 0;
	}

	if ( options.isSmallestUnit ) {
		if ( ! Number.isInteger( number ) ) {
			// eslint-disable-next-line no-console
			console.warn(
				'formatCurrency was called with isSmallestUnit and a float which will be rounded',
				number
			);
			number = Math.round( number );
		}
		number = convertPriceForSmallestUnit( number, currencyPrecision );
	}

	return number;
}

function getFormatter(
	number: number,
	code: string,
	options: CurrencyObjectOptions
): Intl.NumberFormat {
	const locale = options.locale ?? defaultLocale ?? getLocaleFromBrowser();

	return getCachedFormatter( {
		locale,
		currency: code,
		noDecimals: isNoDecimals( number, options ),
	} );
}

/**
 * Formats money with a given currency code.
 *
 * The currency will define the properties to use for this formatting, but
 * those properties can be overridden using the options. Be careful when doing
 * this.
 *
 * For currencies that include decimals, this will always return the amount
 * with decimals included, even if those decimals are zeros. To exclude the
 * zeros, use the `stripZeros` option. For example, the function will normally
 * format `10.00` in `USD` as `$10.00` but when this option is true, it will
 * return `$10` instead.
 *
 * Since rounding errors are common in floating point math, sometimes a price
 * is provided as an integer in the smallest unit of a currency (eg: cents in
 * USD or yen in JPY). Set the `isSmallestUnit` to change the function to
 * operate on integer numbers instead. If this option is not set or false, the
 * function will format the amount `1025` in `USD` as `$1,025.00`, but when the
 * option is true, it will return `$10.25` instead.
 *
 * If the number is NaN, it will be treated as 0.
 *
 * If the currency code is not known, this will assume a default currency
 * similar to USD.
 *
 * If `isSmallestUnit` is set and the number is not an integer, it will be
 * rounded to an integer.
 *
 * @param      {number}                   number     number to format; assumed to be a float unless isSmallestUnit is set.
 * @param      {string}                   code       currency code e.g. 'USD'
 * @param      {CurrencyObjectOptions}    options    options object
 * @returns    {string}                  A formatted string.
 */
export function formatCurrency(
	number: number,
	code: string,
	options: CurrencyObjectOptions = {}
): string {
	const locale = options.locale ?? defaultLocale ?? getLocaleFromBrowser();
	if ( ! doesCurrencyExist( code ) ) {
		code = 'USD';
	}
	const currencyOverride = getCurrencyOverride( code );
	const currencyPrecision = getPrecisionForLocaleAndCurrency( locale, code );

	number = prepareNumberForFormatting( number, currencyPrecision, options );
	const formatter = getFormatter( number, code, options );
	const parts = formatter.formatToParts( number );

	return parts.reduce( ( formatted, part ) => {
		switch ( part.type ) {
			case 'currency':
				if ( currencyOverride?.symbol ) {
					return formatted + currencyOverride.symbol;
				}
				return formatted + part.value;
			default:
				return formatted + part.value;
		}
	}, '' );
}

/**
 * Returns a formatted price object.
 *
 * The currency will define the properties to use for this formatting, but
 * those properties can be overridden using the options. Be careful when doing
 * this.
 *
 * For currencies that include decimals, this will always return the amount
 * with decimals included, even if those decimals are zeros. To exclude the
 * zeros, use the `stripZeros` option. For example, the function will normally
 * format `10.00` in `USD` as `$10.00` but when this option is true, it will
 * return `$10` instead.
 *
 * Since rounding errors are common in floating point math, sometimes a price
 * is provided as an integer in the smallest unit of a currency (eg: cents in
 * USD or yen in JPY). Set the `isSmallestUnit` to change the function to
 * operate on integer numbers instead. If this option is not set or false, the
 * function will format the amount `1025` in `USD` as `$1,025.00`, but when the
 * option is true, it will return `$10.25` instead.
 *
 * Note that the `integer` return value of this function is not a number, but a
 * locale-formatted string which may include symbols like spaces, commas, or
 * periods as group separators. Similarly, the `fraction` property is a string
 * that contains the decimal separator.
 *
 * If the number is NaN, it will be treated as 0.
 *
 * If the currency code is not known, this will assume a default currency
 * similar to USD.
 *
 * If `isSmallestUnit` is set and the number is not an integer, it will be
 * rounded to an integer.
 *
 * @param      {number}                   number     number to format; assumed to be a float unless isSmallestUnit is set.
 * @param      {string}                   code       currency code e.g. 'USD'
 * @param      {CurrencyObjectOptions}    options    options object
 * @returns    {?CurrencyObject}          A formatted string e.g. { symbol:'$', integer: '$99', fraction: '.99', sign: '-' }
 */
export function getCurrencyObject(
	number: number,
	code: string,
	options: CurrencyObjectOptions = {}
): CurrencyObject {
	const locale = options.locale ?? defaultLocale ?? getLocaleFromBrowser();
	if ( ! doesCurrencyExist( code ) ) {
		code = 'USD';
	}
	const currencyOverride = getCurrencyOverride( code );
	const currencyPrecision = getPrecisionForLocaleAndCurrency( locale, code );

	number = prepareNumberForFormatting( number, currencyPrecision, options );
	const formatter = getFormatter( number, code, options );
	const parts = formatter.formatToParts( number );

	let sign = '' as CurrencyObject[ 'sign' ];
	let symbol = '$';
	let symbolPosition = 'before' as CurrencyObject[ 'symbolPosition' ];
	let hasAmountBeenSet = false;
	let integer = '';
	let fraction = '';
	parts.forEach( ( part ) => {
		switch ( part.type ) {
			case 'currency':
				symbol = currencyOverride?.symbol ?? part.value;
				if ( hasAmountBeenSet ) {
					symbolPosition = 'after';
				}
				return;
			case 'group':
				integer += part.value;
				hasAmountBeenSet = true;
				return;
			case 'decimal':
				fraction += part.value;
				hasAmountBeenSet = true;
				return;
			case 'integer':
				integer += part.value;
				hasAmountBeenSet = true;
				return;
			case 'fraction':
				fraction += part.value;
				hasAmountBeenSet = true;
				return;
			case 'minusSign':
				sign = '-' as CurrencyObject[ 'sign' ];
				return;
		}
	} );

	return {
		sign,
		symbol,
		symbolPosition,
		integer,
		fraction,
	};
}

function convertPriceForSmallestUnit( price: number, precision: number ): number {
	return price / getSmallestUnitDivisor( precision );
}

function getSmallestUnitDivisor( precision: number ): number {
	return 10 ** precision;
}

export default formatCurrency;
