import { recordTracksEvent } from '@automattic/calypso-analytics';
import { localizeUrl } from '@automattic/i18n-utils';
import { useI18n } from '@wordpress/react-i18n';
import { Purchase } from 'calypso/lib/purchases/types';

type Props = {
	newlyTransferredDomains: Purchase[] | undefined;
	placeHolderCount: number;
};

export const CompleteDomainsTransferred = ( {
	newlyTransferredDomains,
	placeHolderCount,
}: Props ) => {
	const { __ } = useI18n();

	const handleUserClick = ( destination: string ) => {
		recordTracksEvent( 'calypso_domain_transfer_complete_click', {
			destination,
		} );
	};

	return (
		<>
			<div className="domain-complete-summary">
				<ul className="domain-complete-list">
					{ newlyTransferredDomains
						? newlyTransferredDomains.map( ( { meta, domain }, key ) => {
								return (
									<li className="domain-complete-list-item" key={ key }>
										<h2>{ meta }</h2>
										<a
											href={ `/domains/manage/all/${ meta }/transfer/in/${ domain }` }
											className="components-button is-secondary"
											onClick={ () =>
												handleUserClick( `/domains/manage/all/${ meta }/transfer/in/${ domain }` )
											}
										>
											{ __( 'Manage domain' ) }
										</a>
									</li>
								);
						  } )
						: [ ...Array( placeHolderCount ) ].map( ( data, key ) => {
								return (
									<li className="domain-complete-list-item" key={ key }>
										<p className="loading-placeholder"></p>
										<button className="components-button loading-placeholder"></button>
									</li>
								);
						  } ) }
				</ul>
			</div>
			<div className="domain-complete-tips">
				<div className="domain-complete-tips-items">
					<div>
						<h2> { __( 'Dive into domain essentials' ) }</h2>
						<p>
							{ __(
								"Unlock the domain world's secrets. Dive into our comprehensive resource to learn the basics of domains, from registration to management."
							) }
						</p>
						<a
							href={ localizeUrl( 'https://wordpress.com/support/domains/' ) }
							onClick={ () =>
								handleUserClick( localizeUrl( 'https://wordpress.com/support/domains/' ) )
							}
						>
							{ __( 'Master the domain basics' ) }
						</a>
					</div>
					<div>
						<h2> { __( 'Move your sites too' ) }</h2>
						<p>
							{ __(
								'Why stop at the domain? Check out our step-by-step guides to bring your existing site to WordPress.com.'
							) }
						</p>
						<a
							href={ localizeUrl( 'https://wordpress.com/support/moving-a-blog/' ) }
							onClick={ () =>
								handleUserClick( localizeUrl( 'https://wordpress.com/support/moving-a-blog/' ) )
							}
						>
							{ __( 'Learn more about site transfers' ) }
						</a>
					</div>
				</div>
			</div>
		</>
	);
};
