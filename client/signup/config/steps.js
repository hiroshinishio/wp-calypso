import {
	addAddOnsToCart,
	addPlanToCart,
	addWithThemePlanToCart,
	createAccount,
	createSite,
	createWpForTeamsSite,
	createSiteOrDomain,
	createSiteWithCart,
	setThemeOnSite,
	setOptionsOnSite,
	setStoreFeatures,
	setIntentOnSite,
	addDomainToCart,
	launchSiteApi,
	isPlanFulfilled,
	isAddOnsFulfilled,
	maybeAddStorageAddonToCart,
	isDomainFulfilled,
	maybeRemoveStepForUserlessCheckout,
	createSiteAndAddDIFMToCart,
	excludeStepIfEmailVerified,
	submitWebsiteContent,
	excludeStepIfProfileComplete,
	excludeSegmentSurveyStepIfInactive,
} from 'calypso/lib/signup/step-actions';
import { generateSteps } from './steps-pure';

export default generateSteps( {
	addAddOnsToCart,
	addPlanToCart,
	addWithThemePlanToCart,
	createAccount,
	createSite,
	createWpForTeamsSite,
	createSiteOrDomain,
	createSiteWithCart,
	setThemeOnSite,
	setOptionsOnSite,
	setStoreFeatures,
	setIntentOnSite,
	addDomainToCart,
	launchSiteApi,
	isPlanFulfilled,
	isAddOnsFulfilled,
	maybeAddStorageAddonToCart,
	isDomainFulfilled,
	maybeRemoveStepForUserlessCheckout,
	createSiteAndAddDIFMToCart,
	excludeStepIfEmailVerified,
	excludeStepIfProfileComplete,
	submitWebsiteContent,
	excludeSegmentSurveyStepIfInactive,
} );
