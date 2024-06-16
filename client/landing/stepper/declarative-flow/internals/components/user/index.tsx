import { StepContainer } from '@automattic/onboarding';
import { Button } from '@wordpress/components';
import { useTranslate } from 'i18n-calypso';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import SignupFormSocialFirst from 'calypso/blocks/signup-form/signup-form-social-first';
import FormattedHeader from 'calypso/components/formatted-header';
import { recordTracksEvent } from 'calypso/lib/analytics/tracks';
import { login } from 'calypso/lib/paths';
import { AccountCreateReturn } from 'calypso/lib/signup/api/type';
import WpcomLoginForm from 'calypso/signup/wpcom-login-form';
import { useSelector } from 'calypso/state';
import { fetchCurrentUser } from 'calypso/state/current-user/actions';
import { isUserLoggedIn } from 'calypso/state/current-user/selectors';
import { useHandleSocialResponse } from './handle-social-response';
import './style.scss';
import { useSocialService } from './use-social-service';

const StepContent = ( { flow }: { flow: string } ) => {
	const isLoggedIn = useSelector( isUserLoggedIn );
	const dispatch = useDispatch();
	const translate = useTranslate();
	const {
		handleSocialResponse,
		notice,
		accountCreateResponse,
		storedRedirectToFromBeforeLoggingIn,
	} = useHandleSocialResponse( flow );
	const [ wpAccountCreateResponse, setWpAccountCreateResponse ] = useState< AccountCreateReturn >();
	const { socialService, socialServiceResponse } = useSocialService();
	const response = wpAccountCreateResponse || accountCreateResponse;

	useEffect( () => {
		dispatch( fetchCurrentUser() as unknown as AnyAction );
	}, [ dispatch, isLoggedIn ] );

	const loginLink = login( {
		signupUrl: window.location.pathname + window.location.search,
	} );

	return (
		<>
			<FormattedHeader align="center" headerText={ translate( 'Create your account' ) } brandFont />
			<SignupFormSocialFirst
				step={ {} }
				stepName="user"
				flowName={ flow }
				goToNextStep={ setWpAccountCreateResponse }
				logInUrl={ loginLink }
				handleSocialResponse={ handleSocialResponse }
				socialService={ socialService }
				socialServiceResponse={ socialServiceResponse }
				isReskinned
				redirectToAfterLoginUrl={ window.location.href }
				queryArgs={ {} }
				userEmail=""
				notice={ notice }
				isSocialFirst
			/>
			{ response && 'bearer_token' in response && (
				<WpcomLoginForm
					authorization={ 'Bearer ' + response.bearer_token }
					log={ response.username }
					// We want to go back to the URL that we were at before logging in. Not the current URL.
					redirectTo={ storedRedirectToFromBeforeLoggingIn }
				/>
			) }
		</>
	);
};

const UserStep: React.FC< { flow: string } > = function UserStep( { flow } ) {
	const translate = useTranslate();

	return (
		<StepContainer
			stepName="user"
			isHorizontalLayout={ false }
			isWideLayout={ false }
			isFullLayout
			isLargeSkipLayout={ false }
			hideBack
			stepContent={ <StepContent flow={ flow } /> }
			recordTracksEvent={ recordTracksEvent }
			customizedActionButtons={
				<Button
					className="step-wrapper__navigation-link forward"
					href={ login( {
						signupUrl: window.location.pathname + window.location.search,
					} ) }
					variant="link"
				>
					<span>{ translate( 'Log in' ) }</span>
				</Button>
			}
		/>
	);
};

export default UserStep;
