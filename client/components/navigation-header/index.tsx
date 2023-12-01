import styled from '@emotion/styled';
import classnames from 'classnames';
import React, { ReactNode } from 'react';
import Breadcrumb, { Item as TBreadcrumbItem } from 'calypso/components/breadcrumb';
import ScreenOptionsTab from 'calypso/components/screen-options-tab';
import FormattedHeader from '../formatted-header';

import './style.scss';

const Container = styled.div`
	.main.is-wide-layout & {
		max-width: 1040px;
		margin: auto;
	}

	.stats &,
	.stats__email-detail & {
		max-width: 1224px;
		margin: auto;
	}
`;

interface Props {
	id?: string;
	className?: string;
	children?: ReactNode;
	navigationItems?: TBreadcrumbItem[];
	mobileItem?: TBreadcrumbItem;
	compactBreadcrumb?: boolean;
	title?: string | ReactNode;
	subtitle?: string | ReactNode;
	screenReader?: string | ReactNode;
	screenOptionsTab?: string;
}

const NavigationHeader = React.forwardRef< HTMLElement, Props >( ( props, ref ) => {
	const {
		id,
		className,
		children,
		navigationItems = [],
		mobileItem,
		compactBreadcrumb,
		title,
		subtitle,
		screenReader,
		screenOptionsTab,
	} = props;

	const screenSwitcher = screenOptionsTab && <ScreenOptionsTab wpAdminPath={ screenOptionsTab } />;

	return (
		<header
			id={ id }
			className={ classnames( className, 'navigation-header', {
				'navigation-header__screen-options-tab': screenSwitcher && children,
			} ) }
			ref={ ref }
		>
			<Container>
				<div className="navigation-header__main">
					{ screenSwitcher }
					<Breadcrumb
						items={ navigationItems }
						mobileItem={ mobileItem }
						compact={ compactBreadcrumb }
						hideWhenOnlyOneLevel
					/>
					{ navigationItems.length < 2 && (
						<FormattedHeader
							align="left"
							headerText={ title }
							subHeaderText={ subtitle }
							tooltipText={ subtitle }
							screenReader={ screenReader }
						/>
					) }
					<div className="navigation-header__actions">{ children }</div>
				</div>
			</Container>
		</header>
	);
} );

NavigationHeader.defaultProps = {
	id: '',
	className: '',
};

export default NavigationHeader;
