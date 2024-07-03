import { keepPreviousData, useQuery } from '@tanstack/react-query';
import apiFetch from '@wordpress/api-fetch';
import wpcomRequest, { canAccessWpcomApis } from 'wpcom-proxy-request';
import { SupportStatus } from '../types';

// Bump me to invalidate the cache.
const VERSION = 2;

interface APIFetchOptions {
	global: boolean;
	path: string;
}

export function useSupportStatus( enabled = true ) {
	return useQuery< SupportStatus, Error >( {
		queryKey: [ 'support-status', VERSION ],
		queryFn: async () =>
			canAccessWpcomApis()
				? await wpcomRequest( {
						path: `help/support-status`,
						apiNamespace: 'wpcom/v2/',
						apiVersion: '2',
				  } )
				: await apiFetch( {
						path: `help-center/support-status`,
						global: true,
				  } as APIFetchOptions ),
		enabled,
		refetchOnWindowFocus: false,
		placeholderData: keepPreviousData,
		staleTime: 120 * 1000, // 2 mins. It has to be short, because the user can change the plan to access support.
	} );
}
