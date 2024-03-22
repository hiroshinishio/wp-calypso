import config from '@automattic/calypso-config';
import {
	InfiniteQueryObserverResult,
	keepPreviousData,
	useInfiniteQuery,
	useQuery,
} from '@tanstack/react-query';
import wpcomRequest from 'wpcom-proxy-request';
import wpcom from 'calypso/lib/wp';
import { SearchOptions } from 'calypso/my-sites/promote-post-i2/components/search-bar';
import { PostQueryResult } from './types';

type BlazablePostsQueryOptions = {
	page?: number;
};

export const getSearchOptionsQueryParams = ( searchOptions: SearchOptions ) => {
	let searchQueryParams = '';

	if ( searchOptions.search ) {
		searchQueryParams += `&title=${ searchOptions.search }`;
	}
	if ( searchOptions.filter ) {
		if ( searchOptions.filter.status && searchOptions.filter.status !== 'all' ) {
			searchQueryParams += `&status=${ searchOptions.filter.status }`;
		}
		if ( searchOptions.filter.postType && searchOptions.filter.postType !== 'all' ) {
			searchQueryParams += `&filter_post_type=${ searchOptions.filter.postType }`;
		}
	}
	if ( searchOptions.order ) {
		searchQueryParams += `&order_by=${ searchOptions.order.orderBy }`;
		searchQueryParams += `&order=${ searchOptions.order.order }`;
	}

	return searchQueryParams;
};

async function queryPosts( siteId: number, queryparams: string ) {
	return await wpcomRequest< Response >( {
		path: `/sites/${ siteId }/blaze/posts?${ queryparams }`,
		apiNamespace: 'wpcom/v2',
	} );

	// return await wpcom.req.get( {
	// 	path: `/sites/${ siteId }/blaze/posts?${ queryparams }`,
	// 	apiNamespace: config.isEnabled( 'is_running_in_jetpack_site' )
	// 		? 'jetpack/v4/blaze-app'
	// 		: 'wpcom/v2',
	// } );
}

export const usePostsQueryStats = ( siteId: number, queryOptions = {} ) => {
	return useQuery( {
		queryKey: [ 'promote-post-posts-stats', siteId ],
		queryFn: async () => {
			const postsResponse = await queryPosts( siteId, `page=1&posts_per_page=1` );
			return {
				total_items: postsResponse?.total_items,
			};
		},
		...queryOptions,
		enabled: !! siteId,
		retryDelay: 3000,
		refetchOnWindowFocus: false,
		meta: {
			persist: false,
		},
	} );
};

const usePostsQueryPaged = (
	siteId: number,
	searchOptions: SearchOptions,
	queryOptions: BlazablePostsQueryOptions = {}
): InfiniteQueryObserverResult< PostQueryResult > => {
	const searchQueryParams = getSearchOptionsQueryParams( searchOptions );
	return useInfiniteQuery( {
		queryKey: [ 'promote-post-posts', siteId, searchQueryParams ],
		queryFn: async ( { pageParam } ) => {
			// Fetch blazable posts
			const postsResponse = await queryPosts( siteId, `page=${ pageParam }${ searchQueryParams }` );

			const { posts, page, total_items, total_pages } = postsResponse;
			const has_more_pages = page < total_pages;

			return {
				posts,
				has_more_pages,
				total_items,
				total_pages,
				page,
			};
		},
		...queryOptions,
		enabled: !! siteId,
		retryDelay: 3000,
		placeholderData: keepPreviousData,
		refetchOnWindowFocus: false,
		meta: {
			persist: false,
		},
		initialPageParam: 1,
		getNextPageParam: ( lastPage ) => {
			if ( lastPage.has_more_pages ) {
				return lastPage.page + 1;
			}
			return undefined;
		},
	} );
};

export default usePostsQueryPaged;
