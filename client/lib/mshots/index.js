import { addQueryArgs } from '../url';

const noop = () => {};

export async function loadmShotsPreview( options = {} ) {
	const { url = '', maxRetries = 1, retryTimeout = 1000, ...rest } = options;

	if ( ! url ) {
		// TODO translate
		throw new Error( 'You must specify a site URL to be able to generate a preview of the site' );
	}

	const mShotsEndpointUrl = addQueryArgs(
		rest,
		`http://localhost:8000/mshots/v1/${ encodeURIComponent( url ) }`
	);

	for ( let retries = 0; ; retries++ ) {
		const response = await fetch( mShotsEndpointUrl, { method: 'GET' } );
		const contentType = response.ok && response.headers.get( 'Content-Type' );

		// Successfully generated the preview.
		if ( contentType && contentType === 'image/jpeg' ) {
			try {
				const blob = await response.blob();
				return window.URL.createObjectURL( blob );
			} catch ( e ) {
				return mShotsEndpointUrl;
			}
		}

		// First attempt, no retries.
		if ( ! maxRetries || maxRetries < 0 ) {
			throw new Error( `Preview generation failed (no retries).` );
		}

		// Too many attempts.
		if ( retries >= maxRetries ) {
			throw new Error( `Preview generation still failing after ${ maxRetries } retries.` );
		}

		// Unexpected response.
		if ( contentType && contentType !== 'image/gif' ) {
			throw new Error( `Unexpected response while generating preview.` );
		}

		// Wait and retry.
		await new Promise( ( resolve ) => setTimeout( resolve, retryTimeout ) );
	}
}

export function prefetchmShotsPreview( url ) {
	loadmShotsPreview( { url, maxRetries: 0 } ).catch( noop );
}
