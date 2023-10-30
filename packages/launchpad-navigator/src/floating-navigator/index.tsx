import { LaunchpadNavigator } from '@automattic/data-stores';
import { DefaultWiredLaunchpad } from '@automattic/launchpad';
import { Modal } from '@wordpress/components';
import { select } from '@wordpress/data';
import { useTranslate } from 'i18n-calypso';

import './style.scss';

type ToggleLaunchpadIsVisible = ( shouldBeVisible: boolean ) => void;

export type FloatingNavigatorProps = {
	siteSlug: string | null;
	toggleLaunchpadIsVisible?: ToggleLaunchpadIsVisible;
};

const FloatingNavigator = ( { siteSlug, toggleLaunchpadIsVisible }: FloatingNavigatorProps ) => {
	const launchpadContext = 'launchpad-navigator';
	const translate = useTranslate();
	const checklistSlug = select( LaunchpadNavigator.store ).getActiveChecklistSlug() || null;

	if ( ! checklistSlug ) {
		return null;
	}

	const setLaunchpadIsVisible = toggleLaunchpadIsVisible || ( () => {} );

	return (
		<Modal
			title={ translate( 'Next steps for your site' ) }
			className="launchpad-navigator__floating-navigator"
			onRequestClose={ () => setLaunchpadIsVisible( false ) }
		>
			<DefaultWiredLaunchpad
				siteSlug={ siteSlug }
				checklistSlug={ checklistSlug }
				launchpadContext={ launchpadContext }
			/>
		</Modal>
	);
};

export default FloatingNavigator;
