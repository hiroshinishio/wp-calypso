import styled from '@emotion/styled';
import { Modal, TextHighlight, __experimentalHStack as HStack } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Icon, search as inputIcon, chevronLeft as backIcon } from '@wordpress/icons';
import { cleanForSlug } from '@wordpress/url';
import classnames from 'classnames';
import { Command, useCommandState } from 'cmdk';
import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'calypso/state';
import { recordTracksEvent } from 'calypso/state/analytics/actions';
import { getCurrentRoutePattern } from 'calypso/state/selectors/get-current-route-pattern';
import { CommandCallBackParams, useCommandPalette } from './use-command-palette';

import '@wordpress/commands/build-style/style.css';

interface CommandMenuGroupProps
	extends Pick< CommandCallBackParams, 'close' | 'setSearch' | 'setPlaceholderOverride' > {
	search: string;
	selectedCommandName: string;
	setSelectedCommandName: ( name: string ) => void;
	setFooterMessage?: ( message: string ) => void;
}

const StyledCommandsMenuContainer = styled.div( {
	'[cmdk-root] > [cmdk-list]': {
		overflowX: 'hidden',
	},
} );

const BackButton = styled.button( {
	cursor: 'pointer',
} );

const LabelWrapper = styled.div( {
	display: 'flex',
	flexDirection: 'column',
	flex: 1,
	maxWidth: 'calc(100% - 56px)',
	justifyContent: 'center',
} );

const Label = styled.div( {
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
	overflow: 'hidden',
	fontSize: '1em',
	'.commands-command-menu__container [cmdk-item] &': {
		color: 'var(--studio-gray-100)',
	},
	'.commands-command-menu__container [cmdk-item][aria-selected=true] &': {
		color: 'var(--studio-white)',
	},
	'.commands-command-menu__container & mark': {
		fontWeight: 700,
	},
} );

const SubLabel = styled( Label )( {
	opacity: 0.7,
	fontSize: '0.9em',
	'.commands-command-menu__container [cmdk-item] &': {
		color: 'var(--studio-gray-60)',
	},
} );

const StyledCommandsFooter = styled.div( {
	fontSize: '0.75rem',
	paddingTop: '12px',
	paddingLeft: '16px',
	paddingRight: '16px',
	paddingBottom: '12px',
	borderTop: '1px solid var(--studio-gray-5)',
	color: 'var(--studio-gray-50)',
} );

export function CommandMenuGroup( {
	search,
	close,
	setSearch,
	setPlaceholderOverride,
	selectedCommandName,
	setSelectedCommandName,
	setFooterMessage,
}: CommandMenuGroupProps ) {
	const { commands, filterNotice } = useCommandPalette( {
		selectedCommandName,
		setSelectedCommandName,
		search,
	} );

	useEffect( () => {
		setFooterMessage?.( filterNotice ?? '' );
	}, [ setFooterMessage, filterNotice ] );

	if ( ! commands.length ) {
		return null;
	}

	return (
		<Command.Group about="WPCOM">
			{ commands.map( ( command ) => {
				const itemValue = command.searchLabel ?? command.label;
				return (
					<Command.Item
						key={ command.name }
						value={ itemValue }
						onSelect={ () =>
							command.callback( {
								close: () => close( command.name, true ),
								setSearch,
								setPlaceholderOverride,
							} )
						}
						id={ cleanForSlug( itemValue ) }
					>
						<HStack
							alignment="left"
							className={ classnames( 'commands-command-menu__item', {
								'has-icon': command.icon || command.image,
							} ) }
						>
							{ command.icon && <Icon icon={ command.icon } /> }
							{ command.image }
							<LabelWrapper>
								<Label>
									<TextHighlight
										text={ `${ command.label }${ command.siteFunctions ? '…' : '' }` }
										highlight={ search }
									/>
								</Label>

								{ command.subLabel && (
									<SubLabel>
										<TextHighlight text={ command.subLabel } highlight={ search } />
									</SubLabel>
								) }
							</LabelWrapper>
						</HStack>
					</Command.Item>
				);
			} ) }
		</Command.Group>
	);
}

interface CommandInputProps {
	isOpen: boolean;
	search: string;
	setSearch: ( search: string ) => void;
	selectedCommandName: string;
	placeholder?: string;
}

function CommandInput( {
	isOpen,
	search,
	setSearch,
	placeholder,
	selectedCommandName,
}: CommandInputProps ) {
	const commandMenuInput = useRef< HTMLInputElement >( null );
	const itemValue = useCommandState( ( state ) => state.value );
	const itemId = useMemo( () => cleanForSlug( itemValue ), [ itemValue ] );

	useEffect( () => {
		// Focus the command palette input when mounting the modal,
		// or when a command is selected.
		if ( isOpen || selectedCommandName ) {
			commandMenuInput.current?.focus();
		}
	}, [ isOpen, selectedCommandName ] );

	return (
		<Command.Input
			ref={ commandMenuInput }
			value={ search }
			onValueChange={ setSearch }
			placeholder={ placeholder || __( 'Search for commands' ) }
			aria-activedescendant={ itemId }
		/>
	);
}

const CommandPalette = () => {
	const [ placeHolderOverride, setPlaceholderOverride ] = useState( '' );
	const [ search, setSearch ] = useState( '' );
	const [ selectedCommandName, setSelectedCommandName ] = useState( '' );
	const [ isOpen, setIsOpen ] = useState( false );
	const [ footerMessage, setFooterMessage ] = useState( '' );
	const currentRoute = useSelector( ( state: object ) => getCurrentRoutePattern( state ) );
	const dispatch = useDispatch();
	const open = useCallback( () => {
		setIsOpen( true );
		dispatch(
			recordTracksEvent( 'calypso_hosting_command_palette_open', {
				current_route: currentRoute,
			} )
		);
	}, [ dispatch, currentRoute ] );
	const close = useCallback< CommandMenuGroupProps[ 'close' ] >(
		( commandName = '', isExecuted = false ) => {
			dispatch(
				recordTracksEvent( 'calypso_hosting_command_palette_close', {
					// For nested commands the command.name would be the siteId
					// For root commands the selectedCommandName would be empty
					command: selectedCommandName || commandName,
					current_route: currentRoute,
					search_text: search,
					is_executed: isExecuted,
				} )
			);
			setIsOpen( false );
		},
		[ currentRoute, dispatch, search, selectedCommandName ]
	);
	const toggle = useCallback( () => ( isOpen ? close() : open() ), [ isOpen, close, open ] );

	const commandListRef = useRef< HTMLDivElement >( null );

	useEffect( () => {
		if ( commandListRef.current !== null ) {
			commandListRef.current.scrollTop = 0;
		}
	}, [ selectedCommandName ] );

	// Cmd+K shortcut
	useEffect( () => {
		const down = ( e: KeyboardEvent ) => {
			if ( e.key === 'k' && ( e.metaKey || e.ctrlKey ) ) {
				e.preventDefault();
				toggle();
			}
		};

		document.addEventListener( 'keydown', down );
		return () => document.removeEventListener( 'keydown', down );
	}, [ toggle ] );

	const reset = () => {
		setPlaceholderOverride( '' );
		setSearch( '' );
		setSelectedCommandName( '' );
	};
	const closeAndReset = () => {
		reset();
		close();
	};

	const goBackToRootCommands = ( fromKeyboard: boolean ) => {
		dispatch(
			recordTracksEvent( 'calypso_hosting_command_palette_back_to_root', {
				command: selectedCommandName,
				current_route: currentRoute,
				search_text: search,
				from_keyboard: fromKeyboard,
			} )
		);
		reset();
	};

	if ( ! isOpen ) {
		return false;
	}

	const onKeyDown = ( event: React.KeyboardEvent< HTMLInputElement > ) => {
		if (
			// Ignore keydowns from IMEs
			event.nativeEvent.isComposing ||
			// Workaround for Mac Safari where the final Enter/Backspace of an IME composition
			// is `isComposing=false`, even though it's technically still part of the composition.
			// These can only be detected by keyCode.
			event.keyCode === 229
		) {
			event.preventDefault();
		}
		if (
			selectedCommandName &&
			( event.key === 'Escape' || ( event.key === 'Backspace' && ! search ) )
		) {
			event.preventDefault();
			goBackToRootCommands( true );
		}
	};

	const isLoading = false;

	return (
		<Modal
			className="commands-command-menu"
			overlayClassName="commands-command-menu__overlay"
			onRequestClose={ closeAndReset }
			__experimentalHideHeader
		>
			<StyledCommandsMenuContainer className="commands-command-menu__container">
				<Command label={ __( 'Command palette' ) } onKeyDown={ onKeyDown }>
					<div className="commands-command-menu__header">
						{ selectedCommandName ? (
							<BackButton
								type="button"
								onClick={ () => goBackToRootCommands( false ) }
								aria-label={ __( 'Go back to the previous screen' ) }
							>
								<Icon icon={ backIcon } />
							</BackButton>
						) : (
							<Icon icon={ inputIcon } />
						) }
						<CommandInput
							selectedCommandName={ selectedCommandName }
							search={ search }
							setSearch={ setSearch }
							isOpen={ isOpen }
							placeholder={ placeHolderOverride }
						/>
					</div>
					<Command.List ref={ commandListRef }>
						{ search && ! isLoading && (
							<Command.Empty>{ __( 'No results found.' ) }</Command.Empty>
						) }
						<CommandMenuGroup
							search={ search }
							close={ ( commandName, isExecuted ) => {
								close( commandName, isExecuted );
								reset();
							} }
							setSearch={ setSearch }
							setPlaceholderOverride={ setPlaceholderOverride }
							selectedCommandName={ selectedCommandName }
							setSelectedCommandName={ setSelectedCommandName }
							setFooterMessage={ setFooterMessage }
						/>
					</Command.List>
				</Command>
				{ footerMessage && <StyledCommandsFooter>{ footerMessage }</StyledCommandsFooter> }
			</StyledCommandsMenuContainer>
		</Modal>
	);
};

export default CommandPalette;
