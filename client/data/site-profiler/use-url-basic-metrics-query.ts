import { useQuery } from '@tanstack/react-query';
import { UrlBasicMetricsQueryResponse } from 'calypso/data/site-profiler/types';
import wp from 'calypso/lib/wp';

export const useUrlBasicMetricsQuery = ( url: string | null ) => {
	return useQuery( {
		queryKey: [ 'url-', url ],
		queryFn: (): Promise< UrlBasicMetricsQueryResponse > =>
			wp.req.get( {
				path: '/site-profiler/metrics/basic?url=' + encodeURIComponent( url ?? '' ),
				apiNamespace: 'wpcom/v2',
			} ),
		meta: {
			persist: false,
		},
		enabled: !! url,
		retry: false,
		refetchOnWindowFocus: false,
	} );
};
