import { CircularProgressBar } from '@automattic/components';
import { Checklist, type Task } from '@automattic/launchpad';
import { useTranslate } from 'i18n-calypso';
import { JETPACK_MANAGE_ONBOARDING_TOURS_PREFERENCE_NAME } from 'calypso/jetpack-cloud/sections/onboarding-tours/constants';
import { useDispatch, useSelector } from 'calypso/state';
import { recordTracksEvent } from 'calypso/state/analytics/actions';
import { savePreference } from 'calypso/state/preferences/actions';
import { getAllRemotePreferences } from 'calypso/state/preferences/selectors';

import './style.scss';

export default function NextSteps( { onDismiss = () => {} } ) {
	const dispatch = useDispatch();
	const translate = useTranslate();
	const tracksPrefix = 'calypso_jetpack_manage_overview_next_steps';

	const preferences = useSelector( getAllRemotePreferences );

	const checkTourCompletion = ( prefSlug: string ): boolean => {
		if ( preferences && JETPACK_MANAGE_ONBOARDING_TOURS_PREFERENCE_NAME[ prefSlug ] ) {
			return JETPACK_MANAGE_ONBOARDING_TOURS_PREFERENCE_NAME[ prefSlug ] in preferences;
		}
		return false;
	};

	const resetTour = ( prefSlugs: string[] ): void => {
		prefSlugs.forEach( ( slug ) => {
			if ( JETPACK_MANAGE_ONBOARDING_TOURS_PREFERENCE_NAME[ slug ] ) {
				dispatch( savePreference( JETPACK_MANAGE_ONBOARDING_TOURS_PREFERENCE_NAME[ slug ], null ) );
			}
		} );
	};

	const delayedTourReset = ( slug: string | string[] ) => {
		const preferenceName = 'Jetpack_Manage_Preference_Reset_' + slug;
		window.localStorage.setItem( preferenceName, 'true' );
	};

	const tasks: Task[] = [
		{
			calypso_path: '/dashboard?tour=dashboard-walkthrough',
			completed: checkTourCompletion( 'dashboardWalkthrough' ),
			disabled: false,
			actionDispatch: () => {
				dispatch( recordTracksEvent( tracksPrefix + '_get_familiar_click' ) );
				resetTour( [ 'dashboardWalkthrough' ] );
			},
			id: 'get_familiar',
			title: translate( 'Get familiar with the sites management dashboard' ),
			useCalypsoPath: true,
		},
		{
			calypso_path: '/dashboard?tour=add-new-site',
			completed: checkTourCompletion( 'addSiteStep2' ),
			disabled: false,
			actionDispatch: () => {
				delayedTourReset( 'addSiteStep' );
				dispatch( recordTracksEvent( tracksPrefix + '_add_sites_click' ) );
			},
			id: 'add_sites',
			title: translate( 'Learn how to add new sites' ),
			useCalypsoPath: true,
		},
		{
			calypso_path: '/dashboard?tour=enable-monitor',
			completed: checkTourCompletion( 'enableMonitorStep2' ),
			disabled: false,
			actionDispatch: () => {
				delayedTourReset( 'enableMonitor' );
				dispatch( recordTracksEvent( tracksPrefix + '_bulk_editing_click' ) );
			},
			id: 'bulk_editing',
			title: translate( 'Learn bulk editing and enabling downtime monitoring' ),
			useCalypsoPath: true,
		},
		{
			calypso_path: '/plugins/manage?tour=plugin-management',
			completed: checkTourCompletion( 'pluginOverview' ),
			disabled: false,
			actionDispatch: () => {
				dispatch( recordTracksEvent( tracksPrefix + '_plugin_management_click' ) );
				resetTour( [ 'pluginOverview' ] );
			},
			id: 'plugin_management',
			title: translate( 'Explore plugin management' ),
			useCalypsoPath: true,
		},
	];

	const numberOfTasks = tasks.length;
	const completedTasks = tasks.filter( ( task ) => task.completed ).length;

	const isCompleted = completedTasks === numberOfTasks;

	return (
		<div className="next-steps">
			<div className="next-steps__header">
				<h2>{ isCompleted ? translate( '🎉 Congratulations!' ) : translate( 'Next Steps' ) }</h2>
				<CircularProgressBar
					size={ 32 }
					enableDesktopScaling
					numberOfSteps={ numberOfTasks }
					currentStep={ completedTasks }
				/>
			</div>
			{ isCompleted && (
				<p>
					{ translate(
						"Right now there's nothing left for you to do. We'll let you know when anything needs your attention."
					) }{ ' ' }
					<button
						className="dismiss"
						onClick={ () => {
							dispatch( recordTracksEvent( tracksPrefix + '_dismiss_click' ) );
							onDismiss();
						} }
					>
						{ translate( 'Hide' ) }
					</button>
				</p>
			) }
			<Checklist tasks={ tasks } />
		</div>
	);
}
