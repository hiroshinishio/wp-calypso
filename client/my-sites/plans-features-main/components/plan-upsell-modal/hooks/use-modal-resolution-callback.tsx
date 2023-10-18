import { isFreePlan } from '@automattic/calypso-products';
import { useCallback } from '@wordpress/element';
import { DataResponse } from 'calypso/my-sites/plans-grid/types';
import {
	FREE_PLAN_FREE_DOMAIN_DIALOG,
	FREE_PLAN_PAID_DOMAIN_DIALOG,
	ModalType,
	PAID_PLAN_IS_REQUIRED_DIALOG,
} from '..';
type Props = {
	isCustomDomainAllowedOnFreePlan: DataResponse< boolean >;
	isPlanUpsellEnabledOnFreeDomain: DataResponse< boolean >;
};

/**
 * Provides a callback that resolves a ModalType based on a set of predefined parameters
 */
export function useModalResolutionCallback( {
	isCustomDomainAllowedOnFreePlan,
	isPlanUpsellEnabledOnFreeDomain,
}: Props ) {
	return useCallback(
		( currentSelectedPlan?: string | null ): ModalType | null => {
			if ( currentSelectedPlan && isFreePlan( currentSelectedPlan ) ) {
				if ( isPlanUpsellEnabledOnFreeDomain.result ) {
					return FREE_PLAN_FREE_DOMAIN_DIALOG;
				}

				if ( isCustomDomainAllowedOnFreePlan.result ) {
					return FREE_PLAN_PAID_DOMAIN_DIALOG;
				}

				/**
				 * Either this or the above modal to be removed
				 * after experiment 21394-explat-experiment is over
				 */
				return PAID_PLAN_IS_REQUIRED_DIALOG;
			}
			return null;
		},
		[ isCustomDomainAllowedOnFreePlan.result, isPlanUpsellEnabledOnFreeDomain?.result ]
	);
}
