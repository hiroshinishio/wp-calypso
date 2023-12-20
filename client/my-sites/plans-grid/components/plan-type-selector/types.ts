import { UrlFriendlyTermType, type PlanSlug } from '@automattic/calypso-products';
import { type TranslateResult } from 'i18n-calypso';
import { type UsePricingMetaForGridPlans } from '../../hooks/npm-ready/data-store/use-grid-plans';

export type PlanTypeSelectorProps = {
	kind: 'interval';
	basePlansPath?: string | null;
	intervalType: UrlFriendlyTermType;
	customerType: string;
	withDiscount?: string;
	siteSlug?: string | null;
	selectedPlan?: string;
	selectedFeature?: string;
	showBiennialToggle?: boolean;
	isInSignup: boolean;
	plans: PlanSlug[];
	eligibleForWpcomMonthlyPlans?: boolean;
	isPlansInsideStepper: boolean;
	hideDiscountLabel?: boolean;
	redirectTo?: string | null;
	isStepperUpgradeFlow: boolean;
	currentSitePlanSlug?: PlanSlug | null;
	usePricingMetaForGridPlans: UsePricingMetaForGridPlans;
	recordTracksEvent?: ( eventName: string, eventProperties: Record< string, unknown > ) => void;
	isStuck?: boolean;
	/**
	 * Whether to render the selector along with a title if passed.
	 */
	title?: TranslateResult;
};
export type IntervalTypeProps = Pick<
	PlanTypeSelectorProps,
	| 'intervalType'
	| 'plans'
	| 'isInSignup'
	| 'eligibleForWpcomMonthlyPlans'
	| 'isPlansInsideStepper'
	| 'hideDiscountLabel'
	| 'redirectTo'
	| 'showBiennialToggle'
	| 'selectedPlan'
	| 'selectedFeature'
	| 'currentSitePlanSlug'
	| 'usePricingMetaForGridPlans'
	| 'title'
	| 'isStuck'
>;

export type SupportedUrlFriendlyTermType = Extract<
	UrlFriendlyTermType,
	'yearly' | '2yearly' | '3yearly' | 'monthly'
>;
