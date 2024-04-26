import { DomainData } from '@automattic/data-stores';
import { useMobileBreakpoint } from '@automattic/viewport-react';
import classnames from 'classnames';
import { ReactNode } from 'react';
import {
	DomainsTableProps,
	DomainsTableStateContext,
	useGenerateDomainsTableState,
} from './domains-table';
import { DomainsTableBody } from './domains-table-body';
import { DomainsTableBulkUpdateNotice } from './domains-table-bulk-update-notice';
import { DomainsTableHeader } from './domains-table-header';
import { DomainsTableMobileCards } from './domains-table-mobile-cards';
import { DomainsTableToolbar } from './domains-table-toolbar';
import './style.scss';

export function DomainsTable( props: DomainsTableProps & { footer?: ReactNode } ) {
	const { className, hideCheckbox, footer, useMobileCards, ...allProps } = props;

	const isMobile = useMobileBreakpoint();

	const state = useGenerateDomainsTableState( allProps );

	const { isAllSitesView, domains } = props;

	const showDomainsToolbar =
		isAllSitesView ||
		( ! isAllSitesView &&
			( ( domains as unknown as DomainData[] ) ?? [] ).filter(
				( domain ) => ! domain?.is_subdomain
			).length > 1 );

	return (
		<DomainsTableStateContext.Provider value={ state }>
			<div className={ classnames( className, 'domains-table' ) }>
				<DomainsTableBulkUpdateNotice />
				{ showDomainsToolbar && <DomainsTableToolbar /> }
				{ useMobileCards ?? isMobile ? (
					<DomainsTableMobileCards />
				) : (
					<table
						className={ classnames( `is-${ state.domainsTableColumns.length }-column`, {
							'has-checkbox': state.canSelectAnyDomains && ! hideCheckbox,
						} ) }
					>
						<DomainsTableHeader />
						<DomainsTableBody />
					</table>
				) }
				{ props.footer }
			</div>
		</DomainsTableStateContext.Provider>
	);
}
