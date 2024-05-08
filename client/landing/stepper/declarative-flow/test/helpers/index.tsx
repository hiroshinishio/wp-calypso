/**
 * @jest-environment jsdom
 */
import { screen } from '@testing-library/react';
import React, { useEffect } from 'react';
import { MemoryRouter, useNavigate, useLocation } from 'react-router';
import themeReducer from 'calypso/state/themes/reducer';
import { renderWithProvider } from 'calypso/test-helpers/testing-library';
import { FlowRenderer } from '../../internals';
import type { Flow, ProvidedDependencies } from '../../internals/types';

export const getFlowLocation = () => {
	return {
		path: screen.getByTestId( 'pathname' ).textContent,
		search: screen.getByTestId( 'search' ).textContent,
		state: JSON.parse( screen.getByTestId( 'state' ).textContent || '{}' ),
	};
};

export const getAssertionConditionResult = () => {
	return JSON.parse( screen.getByTestId( 'assertionConditionResult' ).textContent || '{}' );
};

const DebugLocation = () => {
	const location = useLocation();

	return (
		<>
			<p data-testid="pathname">{ `${ location.pathname }${ location.search }` }</p>
			<p data-testid="search">{ location.search }</p>
			<p data-testid="state">{ JSON.stringify( location.state ) }</p>
		</>
	);
};

interface RenderFlowParams {
	currentStep?: string;
	dependencies?: ProvidedDependencies;
	currentURL?: string;
	method: 'submit' | 'goBack' | null;
	cancelDestination?: string;
}
/** Utility to render a flow for testing purposes */
export const renderFlow = ( flow: Flow ) => {
	const FakeStepRender = ( { currentStep, dependencies, method } ) => {
		const navigate = useNavigate();
		const fakeNavigate = ( pathname, state ) => navigate( pathname, { state } );
		const flowSteps = flow.useSteps();
		const effectiveStep = currentStep ?? flowSteps[ 0 ].slug;
		const { submit, goBack } = flow.useStepNavigation( effectiveStep, fakeNavigate );
		const assertionConditionResult = flow.useAssertConditions?.() || {};

		flow.useSideEffect?.( effectiveStep, fakeNavigate );

		useEffect( () => {
			switch ( method ) {
				case 'submit':
					submit?.( dependencies );
					break;
				case 'goBack':
					goBack?.();
					break;
			}
		}, [] );

		return (
			<>
				<DebugLocation />
				{ assertionConditionResult && (
					<p data-testid="assertionConditionResult">
						{ JSON.stringify( assertionConditionResult ) }
					</p>
				) }
			</>
		);
	};

	// The Flow>useStepNavigation>submit function needs to be called from inside a component
	const runUseStepNavigation = ( {
		currentURL = '/some-path?siteSlug=example.wordpress.com',
		currentStep,
		dependencies,
		method,
	}: RenderFlowParams ) => {
		renderWithProvider(
			<MemoryRouter initialEntries={ [ currentURL ] }>
				<FakeStepRender
					currentStep={ currentStep }
					dependencies={ dependencies }
					method={ method }
				/>
			</MemoryRouter>,
			{
				initialState: { themes: { queries: [] }, currentUser: { id: 'some-id' } },
				reducers: {
					themes: themeReducer,
				},
			}
		);
	};

	const runUseStepNavigationSubmit = ( params: Omit< RenderFlowParams, 'method' > ) =>
		runUseStepNavigation( { ...params, method: 'submit' } );

	const runUseStepNavigationGoBack = ( params: Omit< RenderFlowParams, 'method' > ) =>
		runUseStepNavigation( { ...params, method: 'goBack' } );

	const runUseAssertionCondition = ( params: Omit< RenderFlowParams, 'method' > ) => {
		runUseStepNavigation( { ...params, method: null } );
		return getAssertionConditionResult();
	};

	return {
		runUseStepNavigationSubmit,
		runUseStepNavigationGoBack,
		runUseAssertionCondition,
	};
};

type FlowWrapperProps = {
	currentURL: string;
	flow: Flow;
	preferredStepIndex?: number;
};

const FlowWrapper = ( { currentURL, flow, preferredStepIndex }: FlowWrapperProps ) => {
	let resolvedURL = currentURL;

	if ( preferredStepIndex ) {
		const steps = flow.useSteps();

		const targetStep = steps[ preferredStepIndex ] ?? steps[ preferredStepIndex - 1 ];
		if ( targetStep ) {
			const url = new URL( currentURL, 'https://example.com' );
			resolvedURL = `${ url.pathname }/${ targetStep.slug }${ url.search }`;
		}
	}

	return (
		<MemoryRouter basename="setup" initialEntries={ [ resolvedURL ] }>
			<FlowRenderer flow={ flow } />
			<DebugLocation />
		</MemoryRouter>
	);
};

type RenderRootProps = {
	currentURL: string;
	preferredStepIndex?: number;
};

export const renderFlowRoot = ( flow: Flow ) => {
	const render = ( {
		currentURL = '/some-path?siteSlug=example.wordpress.com',
		preferredStepIndex,
	}: RenderRootProps ) => {
		renderWithProvider(
			<FlowWrapper
				currentURL={ currentURL }
				flow={ flow }
				preferredStepIndex={ preferredStepIndex }
			/>,
			{
				initialState: { themes: { queries: [] }, currentUser: { id: 'some-id' } },
				reducers: {
					themes: themeReducer,
				},
			}
		);
	};

	return {
		render,
	};
};
