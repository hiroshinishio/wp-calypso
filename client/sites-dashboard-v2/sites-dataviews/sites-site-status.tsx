import { Button } from '@automattic/components';
import {
	SITE_EXCERPT_REQUEST_FIELDS,
	SITE_EXCERPT_REQUEST_OPTIONS,
	useSiteLaunchStatusLabel,
} from '@automattic/sites';
import styled from '@emotion/styled';
import { useQueryClient } from '@tanstack/react-query';
import { Spinner } from '@wordpress/components';
import { useI18n } from '@wordpress/react-i18n';
import { useDispatch as useReduxDispatch } from 'react-redux';
import { USE_SITE_EXCERPTS_QUERY_KEY } from 'calypso/data/sites/use-site-excerpts-query';
import { SiteLaunchNag } from 'calypso/sites-dashboard/components/sites-site-launch-nag';
import TransferNoticeWrapper from 'calypso/sites-dashboard/components/sites-transfer-notice-wrapper';
import { WithAtomicTransfer } from 'calypso/sites-dashboard/components/with-atomic-transfer';
import useRestoreSiteMutation from 'calypso/sites-dashboard/hooks/use-restore-site-mutation';
import { MEDIA_QUERIES } from 'calypso/sites-dashboard/utils';
import { useSelector } from 'calypso/state';
import { errorNotice, successNotice } from 'calypso/state/notices/actions';
import isDIFMLiteInProgress from 'calypso/state/selectors/is-difm-lite-in-progress';
import type { SiteExcerptData } from '@automattic/sites';

const BadgeDIFM = styled.span`
	color: var( --studio-gray-100 );
	white-space: break-spaces;
`;

const DeletedStatus = styled.div`
	display: inline-flex;
	flex-direction: column;
	align-items: center;
	span {
		color: var( --color-error );
	}
	button {
		padding: 4px;
	}
	${ MEDIA_QUERIES.small } {
		span {
			display: none;
		}
	}
`;

const RestoreButton = styled( Button )`
	color: var( --color-link ) !important;
	font-size: 12px;
	text-decoration: underline;
`;

interface SiteStatusProps {
	site: SiteExcerptData;
}

export const SiteStatus = ( { site }: SiteStatusProps ) => {
	const { __ } = useI18n();
	const queryClient = useQueryClient();
	const reduxDispatch = useReduxDispatch();

	const translatedStatus = useSiteLaunchStatusLabel( site );
	const isDIFMInProgress = useSelector( ( state ) => isDIFMLiteInProgress( state, site.ID ) );

	const { mutate: restoreSite, isPending: isRestoring } = useRestoreSiteMutation( {
		onSuccess() {
			queryClient.invalidateQueries( {
				queryKey: [
					USE_SITE_EXCERPTS_QUERY_KEY,
					SITE_EXCERPT_REQUEST_FIELDS,
					SITE_EXCERPT_REQUEST_OPTIONS,
					[],
					'all',
				],
			} );
			queryClient.invalidateQueries( {
				queryKey: [
					USE_SITE_EXCERPTS_QUERY_KEY,
					SITE_EXCERPT_REQUEST_FIELDS,
					SITE_EXCERPT_REQUEST_OPTIONS,
					[],
					'deleted',
				],
			} );
			reduxDispatch(
				successNotice( __( 'The site has been restored.' ), {
					duration: 3000,
				} )
			);
		},
		onError: ( error ) => {
			if ( error.status === 403 ) {
				reduxDispatch(
					errorNotice( __( 'Only an administrator can restore a deleted site.' ), {
						duration: 5000,
					} )
				);
			} else {
				reduxDispatch(
					errorNotice( __( 'We were unable to restore the site.' ), { duration: 5000 } )
				);
			}
		},
	} );

	const handleRestoreSite = () => {
		restoreSite( site.ID );
	};

	const renderDeletedContent = () => {
		if ( isRestoring ) {
			return <Spinner />;
			// `is_wpcom_staging_site` is false for deleted staging
			// sites so need to check the slug
		} else if ( ! site.slug.startsWith( 'staging-' ) ) {
			return (
				<RestoreButton borderless onClick={ handleRestoreSite }>
					{ __( 'Restore' ) }
				</RestoreButton>
			);
		}
	};

	if ( site.is_deleted ) {
		return (
			<DeletedStatus>
				<span>{ __( 'Deleted' ) }</span>
				{ renderDeletedContent() }
			</DeletedStatus>
		);
	}

	return (
		<WithAtomicTransfer site={ site }>
			{ ( result ) =>
				result.wasTransferring ? (
					<TransferNoticeWrapper { ...result } />
				) : (
					<>
						<div>
							{ translatedStatus }
							<SiteLaunchNag site={ site } />
						</div>
						{ isDIFMInProgress && (
							<BadgeDIFM className="site__badge">{ __( 'Express Service' ) }</BadgeDIFM>
						) }
					</>
				)
			}
		</WithAtomicTransfer>
	);
};
