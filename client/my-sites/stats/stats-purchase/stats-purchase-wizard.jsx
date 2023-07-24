/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Card, Panel, PanelRow, PanelBody } from '@wordpress/components';
import classNames from 'classnames';
import { useTranslate } from 'i18n-calypso';
import React, { useState } from 'react';
import statsPurchaseBackgroundSVG from 'calypso/assets/images/stats/purchase-background.svg';
import { useSelector } from 'calypso/state';
import getSiteAdminUrl from 'calypso/state/sites/selectors/get-site-admin-url';
import CommercialPurchase from './stats-purchase-commercial';
import PersonalPurchase from './stats-purchase-personal';
import StatsPurchaseSVG from './stats-purchase-svg';
import './styles.scss';

const COMPONENT_CLASS_NAME = 'stats-purchase-wizard';
const SCREEN_TYPE_SELECTION = 0;
const SCREEN_PURCHASE = 1;
const TYPE_PERSONAL = 'Personal';
const TYPE_COMMERCIAL = 'Commercial';

// TODO: Get pricing config from an API
const PRICING_CONFIG = {
	AVERAGE_PRICE_INFO: 6, // used to display how much a users pays on average (below price slider)
};

const TitleNode = ( { label, indicatorNumber, active } ) => {
	return (
		<>
			<div
				className={ classNames( `${ COMPONENT_CLASS_NAME }__card-title-indicator`, {
					active: active,
				} ) }
			>
				{ indicatorNumber }{ ' ' }
			</div>
			{ label }
		</>
	);
};

const ProductCard = ( { siteSlug, siteId, commercialProduct, pwywProduct, redirectUri, from } ) => {
	const commercialPlanPrice = commercialProduct?.cost;
	const maxSliderPrice = commercialProduct.cost;
	const sliderStep = pwywProduct.cost / 2;

	const defaultStartingPrice = commercialPlanPrice * 0.6; // default position for PWYW slider // TODO: replace with AVERAGE_PRICE_INFO when it's dynamic
	const uiEmojiHeartTier = commercialPlanPrice * 0.5; // value when slider emoji is changed to a heart emoji
	const uiImageCelebrationTier = commercialPlanPrice * 0.8; // minimal price that enables image celebration image

	const [ subscriptionValue, setSubscriptionValue ] = useState( defaultStartingPrice );
	const [ wizardStep, setWizardStep ] = useState( SCREEN_TYPE_SELECTION );
	const [ siteType, setSiteType ] = useState( null );
	const translate = useTranslate();
	const adminUrl = useSelector( ( state ) => getSiteAdminUrl( state, siteId ) );

	const personalLabel = translate( 'Personal site' );
	const commercialLabel = translate( 'Commercial site' );
	const selectedTypeLabel = siteType === TYPE_PERSONAL ? personalLabel : commercialLabel;

	const setPersonalSite = () => {
		setSiteType( TYPE_PERSONAL );
		setWizardStep( SCREEN_PURCHASE );
	};

	const setCommercialSite = () => {
		setSubscriptionValue( commercialPlanPrice );
		setSiteType( TYPE_COMMERCIAL );
		setWizardStep( SCREEN_PURCHASE );
	};

	const toggleFirstStep = ( toggleState ) => {
		// Never close on click but allow to open when a type was selected (to change).
		if ( ! siteType || ! toggleState ) {
			return;
		}

		setWizardStep( SCREEN_TYPE_SELECTION );
	};

	// change the plan to commercial on the personal plan confirmation
	const handlePlanSwap = ( e ) => {
		e.preventDefault();
		setCommercialSite();
	};

	const firstStepTitleNode = (
		<TitleNode
			indicatorNumber="1"
			label={
				! siteType
					? translate( 'What site type is %(site)s?', {
							args: {
								site: siteSlug,
							},
					  } )
					: selectedTypeLabel
			}
			active={ wizardStep === SCREEN_TYPE_SELECTION }
		/>
	);

	const secondStepTitleNode = (
		<TitleNode
			indicatorNumber="2"
			label={ translate( 'What is Jetpack Stats worth to you?' ) }
			active={ wizardStep === SCREEN_PURCHASE }
		/>
	);

	return (
		<div className={ COMPONENT_CLASS_NAME }>
			<Card className={ `${ COMPONENT_CLASS_NAME }__card-parent` }>
				<div className={ `${ COMPONENT_CLASS_NAME }__card` }>
					<div className={ `${ COMPONENT_CLASS_NAME }__card-inner--left` }>
						<Panel className={ `${ COMPONENT_CLASS_NAME }__card-panel` } header="Jetpack Stats">
							<PanelBody
								title={ firstStepTitleNode }
								initialOpen
								onToggle={ ( shouldOpen ) => toggleFirstStep( shouldOpen ) }
								opened={ wizardStep === SCREEN_TYPE_SELECTION }
							>
								<PanelRow>
									<div className={ `${ COMPONENT_CLASS_NAME }__card-grid` }>
										<div className={ `${ COMPONENT_CLASS_NAME }__card-grid-header--left` }>
											<h3>{ translate( 'Personal' ) }</h3>
										</div>
										<div className={ `${ COMPONENT_CLASS_NAME }__card-grid-header--right` }>
											<h3>{ translate( 'Commercial' ) }</h3>
										</div>
										<div className={ `${ COMPONENT_CLASS_NAME }__card-grid-body--left` }>
											<p>
												{ translate(
													`A hobby or personal site. You don't attempt to make money from your site in any way.`
												) }
											</p>
										</div>
										<div className={ `${ COMPONENT_CLASS_NAME }__card-grid-body--right` }>
											<p>
												{ translate(
													`A site used for commercial activity. Your site sells or advertises a product or service.`
												) }
											</p>
										</div>
										<div className={ `${ COMPONENT_CLASS_NAME }__card-grid-action--left` }>
											<Button variant="primary" onClick={ setPersonalSite }>
												{ translate( 'Personal site' ) }
											</Button>
										</div>
										<div className={ `${ COMPONENT_CLASS_NAME }__card-grid-action--right` }>
											<Button variant="primary" onClick={ setCommercialSite }>
												{ translate( 'Commercial site' ) }
											</Button>
										</div>
									</div>
								</PanelRow>
							</PanelBody>
							<PanelBody title={ secondStepTitleNode } opened={ wizardStep === SCREEN_PURCHASE }>
								<PanelRow>
									{ siteType === TYPE_PERSONAL ? (
										<PersonalPurchase
											subscriptionValue={ subscriptionValue }
											setSubscriptionValue={ setSubscriptionValue }
											handlePlanSwap={ ( e ) => handlePlanSwap( e ) }
											currencyCode={ pwywProduct?.currency_code }
											siteSlug={ siteSlug }
											sliderSettings={ {
												sliderStep,
												maxSliderPrice,
												uiEmojiHeartTier,
												uiImageCelebrationTier,
											} }
											adminUrl={ adminUrl }
											redirectUri={ redirectUri }
											from={ from }
										/>
									) : (
										<CommercialPurchase
											planValue={ commercialProduct?.cost }
											currencyCode={ commercialProduct?.currency_code }
											siteSlug={ siteSlug }
											commercialProduct={ commercialProduct }
											adminUrl={ adminUrl }
											redirectUri={ redirectUri }
											from={ from }
										/>
									) }
								</PanelRow>
							</PanelBody>
						</Panel>
					</div>
					<div className={ `${ COMPONENT_CLASS_NAME }__card-inner--right` }>
						<StatsPurchaseSVG
							isFree={ subscriptionValue === 0 }
							hasHighlight={ subscriptionValue >= uiImageCelebrationTier }
							extraMessage={ subscriptionValue >= uiImageCelebrationTier }
						/>
						<div className={ `${ COMPONENT_CLASS_NAME }__card-inner--right-background` }>
							<img src={ statsPurchaseBackgroundSVG } alt="Blurred background" />
						</div>
					</div>
				</div>
			</Card>
		</div>
	);
};

const StatsPurchaseWizard = ( {
	siteSlug,
	siteId,
	commercialProduct,
	pwywProduct,
	redirectUri,
	from,
} ) => {
	// redirectTo is a relative URI.
	return (
		<ProductCard
			siteSlug={ siteSlug }
			siteId={ siteId }
			commercialProduct={ commercialProduct }
			pwywProduct={ pwywProduct }
			redirectUri={ redirectUri }
			from={ from }
		/>
	);
};

export { StatsPurchaseWizard as default, COMPONENT_CLASS_NAME, PRICING_CONFIG };
