import { Card, Gridicon } from '@automattic/components';
import { useState } from 'react';
import type { TranslateResult } from 'i18n-calypso';

import './style.scss';

export interface WooExpressMediumPlanFeatureSet {
	illustration: string;
	title: string;
	subtitle: TranslateResult;
	items: {
		title: string;
		subtitle: TranslateResult;
	}[];
	expanded?: boolean;
}

export default function WooExpressMediumFeatureCard( props: WooExpressMediumPlanFeatureSet ) {
	const { illustration, title, subtitle, items } = props;

	const [ expanded, setExpanded ] = useState( !! props.expanded );

	const toggleExpanded = () => {
		setExpanded( ! expanded );
	};

	return (
		<Card className="woo-express-medium-feature-card">
			<button className="woo-express-medium-feature-card__header" onClick={ toggleExpanded }>
				<img
					className="woo-express-medium-feature-card__illustration"
					alt={ title }
					src={ illustration }
				/>
				<div className="woo-express-medium-feature-card__header-text">
					<div className="woo-express-medium-feature-card__title">{ title }</div>
					<div className="woo-express-medium-feature-card__subtitle">{ subtitle }</div>
				</div>
				<div className="woo-express-medium-feature-card__accordion-toggle">
					<Gridicon icon={ expanded ? 'chevron-down' : 'chevron-up' } size={ 16 } />
				</div>
			</button>
			{ expanded && (
				<div className="woo-express-medium-feature-card__items">
					{ items.map( ( item ) => (
						<div key={ item.title } className="woo-express-medium-feature-card__item">
							<div className="woo-express-medium-feature-card__item-icon">
								<Gridicon icon="checkmark" size={ 18 } />
							</div>
							<div className="woo-express-medium-feature-card__item-content">
								<div className="woo-express-medium-feature-card__item-title">{ item.title }</div>
								<div className="woo-express-medium-feature-card__item-subtitle">
									{ item.subtitle }
								</div>
							</div>
						</div>
					) ) }
				</div>
			) }
		</Card>
	);
}
