import {
	PLAN_FREE,
	PRODUCT_1GB_SPACE,
	type PlanSlug,
	isWpcomEnterpriseGridPlan,
	isFreePlan,
	isFreeHostingTrial,
	getPlanPath,
} from '@automattic/calypso-products';
import page from '@automattic/calypso-router';
import { WpcomPlansUI } from '@automattic/data-stores';
import { useSelect } from '@wordpress/data';
import { useMemo, useCallback } from '@wordpress/element';
import { recordTracksEvent } from 'calypso/lib/analytics/tracks'; //TODO: move this out
import { getPlanCartItem } from 'calypso/lib/cart-values/cart-items';
import { addQueryArgs } from 'calypso/lib/url';
import type { GridPlan, PlanActions } from '@automattic/plans-grid-next';
import type { MinimalRequestCartProduct } from '@automattic/shopping-cart';

function useUpgradeHandler(
	gridPlans: GridPlan[],
	sitePlanSlug?: PlanSlug | null,
	flowName?: string | null,
	siteSlug?: string | null,
	withDiscount?: string,
	planActionCallback?: ( planSlug: PlanSlug ) => void,
	cartHandler?: ( cartItems?: MinimalRequestCartProduct[] | null ) => void
) {
	// TODO:
	// - clickedPlanSlug can likely be removed
	// - those `recordTracksEvent` should be moved out
	const processCartItems = useCallback(
		( cartItems?: MinimalRequestCartProduct[] | null, clickedPlanSlug?: PlanSlug ) => {
			if ( isWpcomEnterpriseGridPlan( clickedPlanSlug ?? '' ) ) {
				recordTracksEvent( 'calypso_plan_step_enterprise_click', { flow: flowName } );
				window.open( 'https://wpvip.com/wordpress-vip-agile-content-platform', '_blank' );
				return;
			}
			const cartItemForPlan = getPlanCartItem( cartItems );
			const planSlug = clickedPlanSlug ?? PLAN_FREE;

			if ( isFreePlan( planSlug ) ) {
				recordTracksEvent( 'calypso_signup_free_plan_click' );
			}

			const earlyReturn = planActionCallback?.( planSlug );

			if ( earlyReturn ) {
				return;
			}

			const cartItemForStorageAddOn = cartItems?.find(
				( items ) => items.product_slug === PRODUCT_1GB_SPACE
			);

			if ( cartItemForStorageAddOn?.extra ) {
				recordTracksEvent( 'calypso_signup_storage_add_on_upgrade_click', {
					add_on_slug: cartItemForStorageAddOn.extra.feature_slug,
				} );
			}

			if ( cartHandler ) {
				cartHandler( cartItems );
				return;
			}

			const planPath = cartItemForPlan?.product_slug
				? getPlanPath( cartItemForPlan.product_slug )
				: '';

			const checkoutUrl = cartItemForStorageAddOn
				? `/checkout/${ siteSlug }/${ planPath },${ cartItemForStorageAddOn.product_slug }:-q-${ cartItemForStorageAddOn.quantity }`
				: `/checkout/${ siteSlug }/${ planPath }`;

			const checkoutUrlWithArgs = addQueryArgs(
				{ ...( withDiscount && { coupon: withDiscount } ) },
				checkoutUrl
			);

			page( checkoutUrlWithArgs );
		},
		[ flowName, siteSlug, withDiscount, planActionCallback, cartHandler ]
	);

	const selectedStorageOptions = useSelect( ( select ) => {
		return select( WpcomPlansUI.store ).getSelectedStorageOptions();
	}, [] );

	// TODO:
	// `gridPlans` can likely be decoupled from here
	const addSelectedPlanAndStorageAddon = useCallback(
		( planSlug: PlanSlug ) => {
			const selectedStorageOption = selectedStorageOptions?.[ planSlug ];
			const { cartItemForPlan, storageAddOnsForPlan } =
				gridPlans.find( ( gridPlan ) => gridPlan.planSlug === planSlug ) ?? {};
			const storageAddOn = storageAddOnsForPlan?.find( ( addOn ) => {
				return selectedStorageOption && addOn
					? addOn.featureSlugs?.includes( selectedStorageOption )
					: false;
			} );
			const storageAddOnCartItem = storageAddOn &&
				! storageAddOn.purchased && {
					product_slug: storageAddOn.productSlug,
					quantity: storageAddOn.quantity,
					volume: 1,
					extra: { feature_slug: selectedStorageOption },
				};

			if ( cartItemForPlan ) {
				processCartItems?.(
					[ cartItemForPlan, ...( storageAddOnCartItem ? [ storageAddOnCartItem ] : [] ) ],
					planSlug
				);
				return;
			}

			if ( isFreeHostingTrial( planSlug ) ) {
				const cartItemForPlan = { product_slug: planSlug };
				processCartItems?.( [ cartItemForPlan ], planSlug );
				return;
			}
			processCartItems?.( null, planSlug );
		},
		[ gridPlans, processCartItems, selectedStorageOptions ]
	);

	return useCallback(
		( gridPlan: GridPlan ) => {
			const { planSlug, freeTrialPlanSlug } = gridPlan;

			return ( isFreeTrialPlan?: boolean ) => {
				const upgradePlan = isFreeTrialPlan && freeTrialPlanSlug ? freeTrialPlanSlug : planSlug;

				if ( ! isFreePlan( planSlug ) ) {
					recordTracksEvent?.( 'calypso_plan_features_upgrade_click', {
						current_plan: sitePlanSlug,
						upgrading_to: upgradePlan,
						saw_free_trial_offer: !! freeTrialPlanSlug,
					} );
				}
				addSelectedPlanAndStorageAddon?.( upgradePlan );
			};
		},
		[ sitePlanSlug, addSelectedPlanAndStorageAddon ]
	);
}

function usePlanActions(
	gridPlans: GridPlan[],
	sitePlanSlug?: PlanSlug | null,
	flowName?: string | null,
	siteSlug?: string | null,
	withDiscount?: string,
	planActionCallback?: ( planSlug: PlanSlug ) => void,
	cartHandler?: ( cartItems?: MinimalRequestCartProduct[] | null ) => void
): PlanActions {
	const upgradeHandler = useUpgradeHandler(
		gridPlans,
		sitePlanSlug,
		flowName,
		siteSlug,
		withDiscount,
		planActionCallback,
		cartHandler
	);

	return useMemo( () => {
		return gridPlans.reduce( ( acc, gridPlan ) => {
			return {
				...acc,
				[ gridPlan.planSlug ]: upgradeHandler( gridPlan ),
			};
		}, {} );
	}, [ gridPlans ] );
}

export default usePlanActions;
